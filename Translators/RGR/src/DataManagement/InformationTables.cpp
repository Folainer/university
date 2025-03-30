#include "InformationTables.hpp"

InformationTables::InformationTables(ViewStream& vs) :
_nextNumberInOneCharacterSeperatorTable(0),
_nextNumberInMultiCharacterSeperatorTable(301),
_nextNumberInKeywordTable(601),
_nextNumberInConstantTable(1001),
_nextNumberInIdentifierTable(1000001),
_nextNumberInAssemblyInsertionTable(2000001),
_vs(vs),
_currentTokenIndex(0)
{
    initializeTables();
    // We can estimate size of file and reserve size for optimization
    _tokenTable.reserve(100000);
}

ViewStream& InformationTables::getViewStream() {
    return _vs;
}

void InformationTables::initializeTables() {
    initializeOneCharacterSeparatorTable();
    initializeMultiCharecterSeparatorTable();
    initializeKeywordTable();
}

void InformationTables::initializeOneCharacterSeparatorTable() {
    _oneCharacterSeparatorTable[";"] = 0;
    _oneCharacterSeparatorTable[","] = 1;
    _oneCharacterSeparatorTable["("] = 2;
    _oneCharacterSeparatorTable[")"] = 3;
    _oneCharacterSeparatorTable[":"] = 4;
    _nextNumberInOneCharacterSeperatorTable = 5;
}

void InformationTables::initializeMultiCharecterSeparatorTable() {
    _multiCharecterSeparatorTable["(*"] = _nextNumberInMultiCharacterSeperatorTable++;
    _multiCharecterSeparatorTable["*)"] = _nextNumberInMultiCharacterSeperatorTable++;
    _multiCharecterSeparatorTable["($"] = _nextNumberInMultiCharacterSeperatorTable++;
    _multiCharecterSeparatorTable["$)"] = _nextNumberInMultiCharacterSeperatorTable++;
}

void InformationTables::initializeKeywordTable() {
    _keywordTable["PROCEDURE"] = _nextNumberInKeywordTable++;
    _keywordTable["BEGIN"] = _nextNumberInKeywordTable++;
    _keywordTable["END"] = _nextNumberInKeywordTable++;
    _keywordTable["LABEL"] = _nextNumberInKeywordTable++;
    _keywordTable["GOTO"] = _nextNumberInKeywordTable++;
    _keywordTable["RETURN"] = _nextNumberInKeywordTable++;
}

void InformationTables::outputAllTables() {
    if (_oneCharacterSeparatorTable.size() > 0) {
        outputOneCharacterSeparatorTable();
        _vs << '\n';
    }
    if (_multiCharecterSeparatorTable.size() > 0) {
        outputMultiCharecterSeparatorTable();
        _vs << '\n';
    }
    if (_keywordTable.size() > 0) {
        outputKeywordTable();
        _vs << '\n';
    }
    if (_constantTable.size() > 0) {
        outputConstantTable();
        _vs << '\n';
    }
    if (_identifierTable.size() > 0) {
        outputIdentifierTable();
        _vs << '\n';
    }
    if (_asssemblyInsertionTable.size() > 0) {
        outputAssemblyInsertionTable();
        _vs << '\n';
    }
    if (_tokenTable.size() > 0) {
        outputTokenTable();
        _vs << '\n';
    }
}

void InformationTables::outputTokenTable() {
    _vs << "Token table\n";
    _vs << "Type      Code      Row       Col\n";
    for (const auto& pair : _tokenTable) {
        // string str = this->token_map[pair.code];
        _vs << Utilities::getLeftString(pair.type, 10);
        _vs << Utilities::getLeftString(pair.code, 10);
        _vs << Utilities::getLeftString(pair.row, 10);
        _vs << Utilities::getLeftString(pair.col, 10) << '\n';
    }
}

void InformationTables::outputOneCharacterSeparatorTable() {
    _vs << "Onecharacter separator table:\n";
    for (const auto& pair : _oneCharacterSeparatorTable) {
        _vs << pair.first << " -> " << pair.second << '\n';
    }
}

void InformationTables::outputMultiCharecterSeparatorTable() {
    _vs << "Multicharacter separator table:\n";
    for (const auto& pair : _multiCharecterSeparatorTable) {
        _vs << pair.first << " -> " << pair.second << '\n';
    }
}

void InformationTables::outputKeywordTable() {
    _vs << "Keyword table:\n";
    for (const auto& pair : _keywordTable) {
        _vs << pair.first << " -> " << pair.second << '\n';
    }
}

void InformationTables::outputConstantTable() {
    _vs << "Constant table:\n";
    for (const auto& pair : _constantTable) {
        _vs << pair.first << " -> " << pair.second << '\n';
    }
}

void InformationTables::outputIdentifierTable() {
    _vs << "Identifier table:\n";
    for (const auto& pair : _identifierTable) {
        _vs << pair.first << " -> " << pair.second << '\n';
    }
}

void InformationTables::outputAssemblyInsertionTable() {
    _vs << "Assembly insertion\n";
    for (const auto& pair : _asssemblyInsertionTable) {
        _vs << pair.first << " -> " << pair.second << '\n';
    }
}

void InformationTables::addToken(Token token) {
    _tokenTable.push_back(token);
} 


void InformationTables::prosessToken(short tokenType, string tokenName, int row, int col) {
    int code;
    switch (tokenType) {
        case NUMBER:
            code = _constantTable[tokenName];
            addToken(Token({NUMBER, code, row, col}));
            break;
        case KEYWORD:
            code = _keywordTable[tokenName];
            addToken(Token({KEYWORD, code, row, col}));
            break;
        case IDENTIFIER:
            code = _identifierTable[tokenName];
            addToken(Token({IDENTIFIER, code, row, col}));
            break;
        case SEPARATOR:
            code = _oneCharacterSeparatorTable[tokenName];
            addToken(Token({SEPARATOR, code, row, col}));
            break;
        case ASSEMBLY_INSERTION:
            string trimedTokenName = Utilities::trim(tokenName);

            addAssemblyInsertion(trimedTokenName);

            code = _asssemblyInsertionTable[trimedTokenName];
            addToken(Token({ASSEMBLY_INSERTION, code, row, col}));
            break;
    }
}

void InformationTables::addConstant(string constantValue) {
    if (!_constantTable.count(constantValue)) {
        _constantTable[constantValue] = _nextNumberInConstantTable++;
    }
}

void InformationTables::addIdentifier(string identifierValue) {
    if (!_identifierTable.count(identifierValue)) {
        _identifierTable[identifierValue] = _nextNumberInIdentifierTable++;
    }
}

void InformationTables::addAssemblyInsertion(string assemblyInsertion) {
    string trimedTokenName = Utilities::trim(assemblyInsertion);

    if (!_asssemblyInsertionTable.count(trimedTokenName)) {
        _asssemblyInsertionTable[assemblyInsertion] = _nextNumberInAssemblyInsertionTable++;
    }
}

bool InformationTables::isKeyword(string token) {
    auto it = _keywordTable.find(token);

    if (it != _keywordTable.end()) {
        return true;
    } else {
        return false;
    }
}


Token InformationTables::getNextToken() {
    if (_tokenTable.size() - 1 >= (size_t)_currentTokenIndex) {
        return _tokenTable[_currentTokenIndex++];
    } else {
        return Token({END_OF_FILE, 0, 0, 0});
    }
}

string InformationTables::getTokenValue(int tokenCode) const {
    map<string, int> currentTokenTable;
    if (tokenCode < 300) {
        currentTokenTable = _oneCharacterSeparatorTable;
    } else if (tokenCode < 600) {
        currentTokenTable = _multiCharecterSeparatorTable;
    } else if (tokenCode < 1000) {
        currentTokenTable = _keywordTable;
    } else if (tokenCode < 1000000) {
        currentTokenTable = _constantTable;
    } else if (tokenCode < 2000000) {
        currentTokenTable = _identifierTable;
    } else {
        currentTokenTable = _asssemblyInsertionTable;
    }

    for (const auto& pair : currentTokenTable) {
        if (pair.second == tokenCode) {
            return pair.first;
        }
    }

    return "Unknown token";
}