#include <string>
#include <map>
#include <vector>
#include <iomanip>
#include <iostream>
#include "../ViewStream.hpp"
#include "../Utilities/Utilities.hpp"
#include "Global.hpp"

#ifndef INFORMATAIONTABLES_HPP
#define INFORMATAIONTABLES_HPP

using namespace std;

typedef struct {
    short type;
    int code;
    int row;
    int col;
} Token;


class InformationTables {
    public:
    InformationTables(ViewStream& vs);
    void initializeTables();

    void outputOneCharacterSeparatorTable();
    void outputMultiCharecterSeparatorTable();
    void outputKeywordTable();
    void outputConstantTable();
    void outputIdentifierTable();
    void outputTokenTable();
    void outputAssemblyInsertionTable();
    void outputAllTables();

    bool isKeyword(string token);
    
    void addConstant(string constantValue);
    void addIdentifier(string identifierValue);
    void addAssemblyInsertion(string assemblyInsertion);

    void prosessToken(short tokenType, string tokenName, int row, int col);

    private:
    map<string, int> _oneCharacterSeparatorTable;
    map<string, int> _multiCharecterSeparatorTable;
    map<string, int> _keywordTable;
    map<string, int> _constantTable;
    map<string, int> _identifierTable;
    map<string, int> _asssemblyInsertionTable;

    int _nextNumberInOneCharacterSeperatorTable;
    int _nextNumberInMultiCharacterSeperatorTable;
    int _nextNumberInKeywordTable;
    int _nextNumberInConstantTable;
    int _nextNumberInIdentifierTable;
    int _nextNumberInAssemblyInsertionTable;

    ViewStream _vs;

    vector<Token> _tokenTable;

    void initializeOneCharacterSeparatorTable();
    void initializeMultiCharecterSeparatorTable();
    void initializeKeywordTable();

    void addToken(Token token);
};

#endif