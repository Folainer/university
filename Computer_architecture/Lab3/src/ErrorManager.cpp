#include "ErrorManager.hpp"

void ErrorManager::addLexicalError(int row, int column, const string& message, string& lexerName) {
    _lexicalErrors[lexerName].push_back(Error({message, row, column}));
}

void ErrorManager::addSyntaxError(int row, int column, const string& message, string& lexerName) {
    _syntaxErrors[lexerName].push_back(Error({message, row, column}));
}

int ErrorManager::getLexicalErrorCount(string& lexerName) {
    return _lexicalErrors[lexerName].size();
}

int ErrorManager::getSyntaxErrorCount(string& lexerName) {
    return _syntaxErrors[lexerName].size();
}

void ErrorManager::outputLexicalErrors(string lexerName) {
    auto lexicalErr = _lexicalErrors[lexerName];

    if (lexicalErr.size() == 0) {
        cout << "There are no lexical errors for " << lexerName << " lexer" << endl;
        return;
    }
    
    cout << "There are lexical errors for " << lexerName << " lexer:" << endl;
    for (auto err : lexicalErr) {
        cout << "\t" << err.row << ':' << err.col << ": " << err.message << endl;
    }
}

void ErrorManager::outputSyntaxErrors(string lexerName) {
    auto syntaxErr = _syntaxErrors[lexerName];

    if (syntaxErr.size() == 0) {
        cout << "There are no syntax errors for " << lexerName << " parser" << endl;
        return;
    }
    
    cout << "There are syntax errors for " << lexerName << " parser:" << endl;
    for (auto err : syntaxErr) {
        cout << "\t" << err.row << ':' << err.col << ": " << err.message << endl;
    }
}