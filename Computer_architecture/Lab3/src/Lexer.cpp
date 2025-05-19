#include "Lexer.hpp"
#include <fstream>

Lexer::Lexer(string lexerName, fstream&& fs) : _fs(new fstream(move(fs))), _ss(nullptr), _row(1), _column(1), _lexerName(lexerName) {}

Lexer::Lexer(string lexerName, stringstream&& ss) : _fs(nullptr), _ss(new stringstream(move(ss))), _row(1), _column(1), _lexerName(lexerName) {}

Lexer::~Lexer() {
    if (_fs) {
        _fs->close();
        delete _fs;
    }
    if (_ss) {
        _ss->clear();
        delete _ss;
    }
}


Token Lexer::nextToken() {
    int lexicalSymbol = 0;
    char symbol;
    stringstream ss;

    while (lexicalSymbol < 2) {
        symbol = nextSymbol();
        if (symbol == '\0') {
            if (lexicalSymbol == 0) {
                return Token{"", _row, _column};
            } else {
                errorManager.addLexicalError(_row, _column + lexicalSymbol, string("Unexpected end"), _lexerName);
                break;
            }
        }
        switch (symbol_categories[(short)symbol]) {
            case HEX_DIGIT:
                ss << (char)toupper(symbol);
                lexicalSymbol++;
                _column += 1;
                break;
            case WHITESPACE:
                // cout << "Whitespace" << endl;
                // cout << (int)symbol << endl;
                if (symbol == '\n') {
                    // cout << _row << endl;
                    _row += 1;
                    // cout << _row << endl;
                    _column = 1;
                } else if (symbol == '\t') {
                    _column += 4;
                } else {
                    _column++;
                }
                break;
            // case PROHIBITED_CHARACTER:
            //     if (symbol == '\0') {
            //         return Token{"", _row, _column};
            //     } else {
            //         Token token = {ss.str(), _row, _column};
            //         ss.str("");
            //         return token;
            //     }
            // default:
            //     if (symbol == '\0') {
            //         return Token{"", _row, _column};
            //     } else {
            //         ss << symbol;
            //         _column++;
            //         symbol = nextSymbol();
            //     }
            //     break;
            default:
                string str = ss.str();
                errorManager.addLexicalError(_row, _column - (int)str.size(), string("Used prohibitied character: ") + symbol, _lexerName);
                return Token{"", _row, _column - (int)str.size()};
        }
    }

    return Token{ss.str(), _row, _column - 2};
}


//Private

char Lexer::nextSymbol() {
    char symbol = '\0';
    if (_fs) {
        _fs->get(symbol);
        if (_fs->fail()) {
            return '\0'; 
        } else if (symbol == EOF) {
            return '\0';
        }
    } else if (_ss) {
        _ss->get(symbol);
        if (_ss->fail()) {
            return '\0'; 
        }
    }
    return symbol;
}