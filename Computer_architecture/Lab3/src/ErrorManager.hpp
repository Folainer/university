#ifndef ERRORMANAGER_HPP
#define ERRORMANAGER_HPP

#include <iostream>
#include <vector>
#include <map>

using namespace std;

typedef struct {
    string message;
    int row;
    int col;
} Error;

class ErrorManager {
    public:
        void addLexicalError(int row, int column, const string& message, string& lexerName);
        void addSyntaxError(int row, int column, const string& message, string& lexerName);

        int getLexicalErrorCount(string& lexerName);
        int getSyntaxErrorCount(string& lexerName);

        void outputLexicalErrors(string lexerName);
        void outputSyntaxErrors(string lexerName);

    private:
        map<string, vector<Error>> _lexicalErrors;
        map<string, vector<Error>> _syntaxErrors;

};
#endif