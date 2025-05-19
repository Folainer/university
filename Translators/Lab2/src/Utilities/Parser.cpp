#include "Parser.hpp"

Parser::Parser(InformationTables& informationTables, ErrorManager& em, string filepath) : _informationTables(informationTables), _vs(_informationTables.getViewStream()), _em(em), _filepath(filepath), _currentToken(_informationTables.getNextToken()), _root(nullptr) {}

Tree* Parser::getRoot() const {
    return _root;
}

void Parser::eat(short type, string message = "undefined") {
    if (_currentToken.code != type || _currentToken.type == END_OF_FILE) {
        stringstream ss;
        if (_currentToken.type == END_OF_FILE) {
            ss << Utilities::getErrorMessage(_filepath, -1, -1, "In", message) << " part of syntax was end of file without next token:" <<  _informationTables.getTokenValue(_currentToken.code);
            throw runtime_error(ss.str());
        }
        ss << Utilities::getErrorMessage(_filepath, _currentToken.row, _currentToken.col, "In", message) << " part of syntax was used prohibited token " <<  _informationTables.getTokenValue(_currentToken.code) << " or nessasary token was missed";
        throw runtime_error(ss.str());
    }
    _currentToken = _informationTables.getNextToken();
}

void Parser::eatType(short type, string message = "undefined") {
    if (_currentToken.type != type) {
        stringstream ss;
        ss << Utilities::getErrorMessage(_filepath, _currentToken.row, _currentToken.col, "In", message) << " part of syntax was used prohibited token " <<  _informationTables.getTokenValue(_currentToken.code) << " or nessasary token was missed";
        throw runtime_error(ss.str());
    }
    _currentToken = _informationTables.getNextToken();
}

void Parser::parse() {
    try {
        Tree* tree = program();
        // Token token = _informationTables.getNextToken();
        // Tree * root = new Node(_informationTables, "root");
        // Tree* leaf1  = new Leaf(_informationTables, token);
        // root->add(leaf1);
        // Tree* leaf2  = new Leaf(_informationTables, _informationTables.getNextToken());
        // root->add(leaf2);
        // Tree* leaf3  = new Leaf(_informationTables, _informationTables.getNextToken());
        // root->add(leaf3);
        // root->print();

        // root->clearMemory();
        // delete root;

        _root = tree;
    }
    catch (const exception& e) {
        _em.addProgramError(e.what());
        if (_root) {
            _root->clearMemory();
            delete _root;
            _root = nullptr;
        }
    }
    catch (...) {
        _em.addProgramError("Unknown error occurred in parser.");
        if (_root) {
            _root->clearMemory();
            delete _root;
            _root = nullptr;
        }
    }

}

Tree* Parser::program() {
    Tree* root = new Node(_informationTables, "<PROGRAM>");

    eat(PROCEDURE, "PROGRAM");
    
    root->add(procedureIndetifier());

    if (_currentToken.code == LEFT_PARENTHESIS) {
        eat(LEFT_PARENTHESIS, "PARAMETER_LIST");
        root->add(parametersList());
        eat(RIGHT_PARENTHESIS, "PARAMETER_LIST");
    }

    eat(SEMICOLON, "PROGRAM");

    root->add(block());

    eat(SEMICOLON, "PROGRAM");
    
    return root;
}

Tree* Parser::procedureIndetifier() {
    Tree* node = new Node(_informationTables, "<PROCEDURE_IDENTIFIER>");
    node->add(new Leaf(_informationTables, _currentToken));
    eatType(IDENTIFIER);
    return node;
}

Tree* Parser::block() {
    Tree* node = new Node(_informationTables, "<BLOCK>");
    
    if (_currentToken.code == LABEL) {
        node->add(labelDeclarations());
    }
    
    eat(BEGIN, "BLOCK");

    node->add(statementsList());

    eat(END, "BLOCK");

    return node;
}

Tree* Parser::statementsList() {
    Tree* node = new Node(_informationTables, "<STATEMENTS_LIST>");
    while (_currentToken.code != END) {
        node->add(statement());
    }

    return node;
}

Tree* Parser::statement() {
    Tree* node = new Node(_informationTables, "<STATEMENT>");

    switch (_currentToken.code) {
        case GOTO:
            {
                Tree* gotoNode = new Node(_informationTables, "GOTO");
                node->add(gotoNode);
                eat(GOTO, "GOTO");
                node->add(new Leaf(_informationTables, _currentToken));
                eatType(NUMBER, "GOTO");
                eat(SEMICOLON, "GOTO");
                break;
            }

        case RETURN:
            node->add(new Leaf(_informationTables, _currentToken));
            eat(RETURN, "RETURN");
            eat(SEMICOLON, "RETURN");
            break;
        
        default:
            {
                if (_currentToken.type == NUMBER) {
                    Tree* statementNode = new Node(_informationTables, "<STATEMENT_WITH_LABEL>");
                    node->add(statementNode);

                    statementNode->add(new Leaf(_informationTables, _currentToken));
                    eatType(NUMBER, "STATEMENT_WITH_LABEL");
                    eat(COLON, "STATEMENT_WITH_LABEL");
                    statementNode->add(statement());
                } else if (_currentToken.type == ASSEMBLY_INSERTION) {
                    Tree* assemblyInsertionNode = new Node(_informationTables, "<ASSEMBLY_INSERTION>");
                    node->add(assemblyInsertionNode);
                    assemblyInsertionNode->add(new Leaf(_informationTables, _currentToken));
                    eatType(ASSEMBLY_INSERTION, "ASSEMBLY_INSERTION");

                } else {
                    throw runtime_error(Utilities::getErrorMessage(_filepath, _currentToken.row, _currentToken.col, "In STATEMENT part of program is unexpected token or nessasary was missed:", _informationTables.getTokenValue(_currentToken.code)));
                }
            }
    }
    return node;
}

Tree* Parser::parametersList() {
    Tree* node = new Node(_informationTables, "<PARAMETERS_LIST>");
    node->add(new Leaf(_informationTables, _currentToken));
    eatType(IDENTIFIER, "PARAMETERS_LIST");

    while (_currentToken.code == COMMA) {
        eat(COMMA, "PARAMETERS_LIST");
        node->add(new Leaf(_informationTables, _currentToken));
        eatType(IDENTIFIER, "PARAMETERS_LIST");
    }

    return node;
}

Tree* Parser::labelDeclarations() {
    Tree* node = new Node(_informationTables, "<LABEL_DECLARATIONS>");
    eat(LABEL, "LABEL_DECLARATIONS");

    node->add(new Leaf(_informationTables, _currentToken));
    eatType(NUMBER, "LABEL_DECLARATIONS");

    while (_currentToken.code == COMMA) {
        eat(COMMA, "LABEL_DECLARATIONS");
        node->add(new Leaf(_informationTables, _currentToken));
        eatType(NUMBER, "LABEL_DECLARATIONS");
    }

    eat(SEMICOLON, "LABEL_DECLARATIONS");

    return node;
}