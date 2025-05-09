#include <iostream>
#include <sstream>
#include <string>

#include "Global.hpp"
#include "Lexer.hpp"
#include "Parser.hpp"

using namespace std;

int main() {
    string parserName = "Main";
    // Lexer lexer(lexerName, stringstream("1A\np2\t1A  12"));
    // Lexer lexer(lexerName, fstream("input1.txt"));

    // cout << lexer.nextToken().value << endl;
    // cout << lexer.nextToken().value << endl;
    // cout << lexer.nextToken().value << endl;
    // cout << lexer.nextToken().value << endl;

    // errorManager.outputLexicalErrors(lexerName);

    fstream input("input1.txt");
    fstream output("output1.txt", ios::out);

    Parser parser(parserName, move(output), move(input));

    parser.parse(CODE_ASM);

    errorManager.outputLexicalErrors(parserName);
    cout << endl;
    errorManager.outputSyntaxErrors(parserName);

    return 0;
}