#ifndef PARSER_HPP
#define PARSER_HPP

#include <fstream>
#include <sstream>
#include <map>
#include <iomanip>

#include "Global.hpp"
#include "Lexer.hpp"
#include "AddressConverter.hpp"

using namespace std;

class Parser {
    public:
    Parser(string parserName, stringstream &&ssout, stringstream &&ssin);
    Parser(string parserName, fstream &&fsout, fstream &&fsin);
    ~Parser();

    void parse(int parseType);

    string getssout();
    // string getfsout();

    private:
    string _parserName;
    fstream* _fsout;
    stringstream* _ssout;
    Lexer *_lexer;
    Token _currentToken;
    stringstream _machineCodeStream;
    stringstream _assemblyCodeStream;

    void printLine(int parseType);

    void parseMovRegReg();
    void parseMovAddr();
    void parseMovRegLit16();

    void parseAddRegReg();
    void parseAddRegAddr();

    void parseJgAddr();
    void parseJgShift();

    void parseCmp();
};

#endif