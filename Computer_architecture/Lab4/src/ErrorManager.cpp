#include "ErrorManager.hpp"

void ErrorManager::addLexicalError(int row, int column, const string& message, string& lexerName) {
    _lexicalErrors[lexerName].push_back(Error({message, row, column}));
}

void ErrorManager::addSyntaxError(int row, int column, const string& message, string& lexerName) {
    _syntaxErrors[lexerName].push_back(Error({message, row, column}));
}

void ErrorManager::addError(string& message, string& name) {
    _errors[name].push_back(message);
} 

void ErrorManager::addError(string message, string name) {
    _errors[name].push_back(message);
}

bool ErrorManager::findError(string errorMessage, string name) {
    for (auto err : _errors[name]) {
        if (err == errorMessage) {
            return true;
        }
    }

    return false;
}

int ErrorManager::getLexicalErrorCount(string& lexerName) {
    return _lexicalErrors[lexerName].size();
}

int ErrorManager::getSyntaxErrorCount(string& lexerName) {
    return _syntaxErrors[lexerName].size();
}

int ErrorManager::getErrors(string& name) {
    return _errors[name].size();
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

void ErrorManager::outputErrors(string name) {
    auto errors = _errors[name];

    if (errors.size() == 0) {
        cout << "There are no errors for " << name << " namespace" << endl;
        return;
    }
    
    cout << "There are errors for " << name << " namespace:" << endl;
    for (auto err : errors) {
        cout << "\t" << err << endl;
    }
}