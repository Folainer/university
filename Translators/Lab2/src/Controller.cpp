#include "Controller.hpp"
#include "Utilities/Parser.hpp"
#include "Utilities/CodeGenerator.hpp"

Controller::Controller(string filepath, ViewStream vs) : 
_vs(vs),
_it(InformationTables(vs)),
_em(ErrorManager(vs))
{
    this->run(filepath);

    // _it.outputAllTables();

    Parser parser(_it, _em, filepath);
    parser.parse();
    Tree* root = parser.getRoot();
    if (root) {
        // root->print();
    }
    
    CodeGenerator cg(_it, _em, "output.asm");
    
    cg.run(root);

    _em.output();
}

void Controller::run(string filepath) {
    ifstream inputFile(filepath);
    ostringstream buffer;

    try {
        if (inputFile.is_open()) {
            char symbol;
            int currentRow = 1;
            int currentCol = 1;
            bool isReadingAllowed = true;
            bool isLoopActive;
            while (!isReadingAllowed || inputFile.get(symbol)) {
                if (inputFile.eof()) {
                    break;
                }
                isReadingAllowed = true;
                switch (SYMBOL_CATEGORIES[(short)symbol]) {
                    case WHITESPACE:
                        switch (symbol)
                        {
                            case '\n':
                                currentCol = 1;
                                currentRow++;
                                break;
                            case '\t':
                                currentCol += 4;
                                break;
                            default:
                                currentCol++;
                                break;
                        }
                        break;
                    case CONSTANT_START:
                        do {
                        buffer << symbol;
                        } while (inputFile.get(symbol) && SYMBOL_CATEGORIES[(short)symbol] == CONSTANT_START);
                        _it.addConstant(buffer.str());
                        _it.prosessToken(NUMBER, buffer.str(), currentRow, currentCol);
                        currentCol += buffer.str().length();
                        buffer.str("");
                        isReadingAllowed = false;
                        break;
                    case IDENTIFIER_OR_KEYWORD_START:
                        do {
                            buffer << symbol;

                        } while (inputFile.get(symbol) && (SYMBOL_CATEGORIES[(short)symbol] == CONSTANT_START || SYMBOL_CATEGORIES[(short)symbol] == IDENTIFIER_OR_KEYWORD_START));
                        if (_it.isKeyword(buffer.str())) {
                            _it.prosessToken(KEYWORD, buffer.str(), currentRow, currentCol);
                        } else {
                            _it.addIdentifier(buffer.str());
                            _it.prosessToken(IDENTIFIER, buffer.str(), currentRow, currentCol);
                        }
                        currentCol += buffer.str().length();
                        buffer.str("");
                        isReadingAllowed = false;
                        break;
                    case UNIQUE_SEPARATORS:
                        buffer << symbol;
                        _it.prosessToken(SEPARATOR, buffer.str(), currentRow, currentCol);
                        buffer.str("");
                        currentCol++;
                        break;
                    case AMBIGUES_SEPARATORS:
                        buffer << symbol;
                        inputFile.get(symbol);
                        currentCol++;
                        short state;
                        isLoopActive = true;
                        int startRow;
                        int startCol;
                        switch (symbol) {
                            case '*':
                                buffer.str("");
                                state = COM;
                                while (isLoopActive) {
                                    if (!inputFile.get(symbol)) {
                                        throw Utilities::getErrorMessage(filepath, currentRow, currentCol, "Not closed commentary", "");
                                    }

                                    switch (symbol) {
                                        case '\t':
                                            currentCol += 4;
                                            break;
                                        case '\n':
                                            currentCol = 1;
                                            currentRow++;
                                            break;
                                        default:
                                            currentCol++;
                                    }
                                    switch (state) {
                                        case COM:
                                            if (symbol == '*') {
                                                state = ECOM;
                                            }
                                            break;
                                        case ECOM:
                                            if (symbol == ')') {
                                                isLoopActive = false;
                                            } else {
                                                state = COM;
                                            }
                                    }
                                }
                                break;
                            case '$':
                                buffer.str("");
                                state = AI;
                                startRow = currentRow;
                                startCol = currentCol + 1;
                                while (isLoopActive) {
                                    if (!inputFile.get(symbol)) {
                                        throw Utilities::getErrorMessage(filepath, currentRow, currentCol, "Not closed assembly insertion", "");
                                    }

                                    switch (symbol) {
                                        case '\t':
                                            currentCol += 4;
                                            break;
                                        case '\n':
                                            currentCol = 1;
                                            currentRow++;
                                            break;
                                        default:
                                            currentCol++;
                                    }
                                    bool isDollarMissed = false;
                                    switch (state) {
                                        case AI:
                                            if (symbol == '$') {
                                                state = EAI;
                                                isDollarMissed = true;
                                            } else {
                                                buffer << symbol;
                                            }
                                            break;
                                        case EAI:
                                            if (symbol == ')') {
                                                isLoopActive = false;
                                                _it.prosessToken(ASSEMBLY_INSERTION, buffer.str(), startRow, startCol);
                                                buffer.str("");

                                            } else {
                                                state = AI;
                                                if (isDollarMissed) {
                                                    buffer << '$';
                                                    isDollarMissed = false;
                                                }
                                                if (symbol == '$') {
                                                    isDollarMissed = true;
                                                    state = EAI;
                                                } else {
                                                    buffer << symbol;
                                                }
                                            }
                                    }
                                }
                                break;
                            default:
                                _it.prosessToken(SEPARATOR, buffer.str(), currentRow, currentCol - 1);
                                buffer.str("");
                                // currentCol++;
                                isReadingAllowed = false;
                                break;
                        }
                        break;
                    
                    case PROHIBITED_CHARACTER:
                    default:
                        _em.addCompilingError(Utilities::getErrorMessage(filepath, currentRow, currentCol, "Used prohibited character:", string(1, (char)symbol)));
                        currentCol++;
                        break;
                }
            }
        } else {
            throw string("Reading file error");
        }
    } catch (string erorrMessage) {
        _em.addProgramError(erorrMessage);
    }
}