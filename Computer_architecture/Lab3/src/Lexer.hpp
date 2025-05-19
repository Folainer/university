#ifndef LEXER_HPP
#define LEXER_HPP

#include <iostream>
#include <fstream>
#include <sstream>
#include <string>

#include "Global.hpp"

using namespace std;

class Lexer {
    public:
        Lexer(string lexerName, fstream&& fs);
        Lexer(string lexerName, stringstream&& ss);
        ~Lexer();

        Token nextToken();

    private:
        fstream* _fs;
        stringstream* _ss;

        int _row;
        int _column;

        string _lexerName;

        char nextSymbol();
};

#endif