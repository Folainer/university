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
        void addError(string& message, string& name);
        void addError(string message, string name);
        bool findError(string errorMessage, string name);

        int getLexicalErrorCount(string& lexerName);
        int getSyntaxErrorCount(string& lexerName);
        int getErrors(string& name);

        void outputLexicalErrors(string lexerName);
        void outputSyntaxErrors(string lexerName);
        void outputErrors(string name);

    private:
        map<string, vector<Error>> _lexicalErrors;
        map<string, vector<Error>> _syntaxErrors;
        map<string, vector<string>> _errors;

};
#endif