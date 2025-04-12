#include "Parser.hpp"

Parser::Parser(string parserName, stringstream &&ssout, stringstream &&ssin) : 
    _parserName(parserName), 
    _fsout(nullptr), 
    _ssout(new stringstream(move(ssout))), 
    _lexer(new Lexer(parserName, move(ssin))) {
}

Parser::Parser(string parserName, fstream &&fsout, fstream &&fsin) : 
    _parserName(parserName), 
    _fsout(new fstream(move(fsout))), 
    _ssout(nullptr), 
    _lexer(new Lexer(parserName, move(fsin))) {
}

Parser::~Parser() {
    if (_fsout) {
        _fsout->close();
        delete _fsout;
    }
    if (_ssout) {
        _ssout->clear();
        delete _ssout;
    }
}

string Parser::getssout() {
    if (_ssout) {
        return _ssout->str();
    }
    return "";
}

void Parser::printLine(int parseType) {
    if (_fsout) {
        if (parseType == ASM) {
            *_fsout << _assemblyCodeStream.str() << endl;
        } else {
            *_fsout << setw(18) << left << _machineCodeStream.str() << _assemblyCodeStream.str() << endl;
        }
    }
    if (_ssout) {
        if (parseType == ASM) {
            *_ssout << _assemblyCodeStream.str() << endl;
        } else {
            *_ssout << setw(18) << left << _machineCodeStream.str() << _assemblyCodeStream.str() << endl;
        }
    }
    _assemblyCodeStream.str("");
    _machineCodeStream.str("");
}

void Parser::parse(int parseType) {
    _currentToken = _lexer->nextToken();

    while (_currentToken.value != "" && errorManager.getSyntaxErrorCount(_parserName) == 0 && errorManager.getLexicalErrorCount(_parserName) == 0) {
        int prevTokenValue = mapMachineCode(_currentToken.value);
        if (prevTokenValue != PROHIBITED) {
            _machineCodeStream << _currentToken.value;
            _currentToken = _lexer->nextToken();
        }
        
        switch (prevTokenValue) {
            case MOVREGREG:
                _assemblyCodeStream << "MOV";
                parseMovRegReg();
                break;
            case MOVADDR:
                _assemblyCodeStream << "MOV";
                parseMovAddr();
                break;
            case ADDREGREG:
                _assemblyCodeStream << "ADD";
                parseAddRegReg();
                break;
            case ADDREGADDR:
                _assemblyCodeStream << "ADD";
                parseAddRegAddr();
                break;
            case JGADDR:
                _assemblyCodeStream << "JG";
                parseJgAddr();
                break;
            case JGSHIFT:
                _assemblyCodeStream << "JG";
                parseJgShift();
                break;
            case CMP:
                _assemblyCodeStream << "CMP";
                parseCmp();
                break;
            case MOVREGLIT16:
                _assemblyCodeStream << "MOV";
                parseMovRegLit16();
                break;
            default:
                // cout << _currentToken.value << endl;
                errorManager.addSyntaxError(_currentToken.row, _currentToken.column, "Prohibited command", _parserName);
                _machineCodeStream.str("");
                _assemblyCodeStream.str("");
                break;
        }
        if (errorManager.getSyntaxErrorCount(_parserName) == 0) {
            printLine(parseType);
        }
    }
}

void Parser::parseMovRegReg() {
    stringstream ss;
    ss << hex << _currentToken.value;

    int value;
    ss >> value;

    int reg1 = (value & 0b11110000) >> 4;
    int reg2 = value & 0b00001111;

    string regStr1 = mapRegister(reg1);
    string regStr2 = mapRegister(reg2);

    if (regStr1 == "" || regStr2 == "") {
        errorManager.addSyntaxError(_currentToken.row, _currentToken.column, "Invalid register", _parserName);
        return;
    }

    _machineCodeStream << ' ' << _currentToken.value;
    _assemblyCodeStream << ' ' << regStr1 << ", " << regStr2;

    _currentToken = _lexer->nextToken();
}

void Parser::parseMovAddr() {
    stringstream ss;
    ss << hex << _currentToken.value;

    int value;
    ss >> value;

    bool isAddressFirst = false;

    int reg = value & 0b00001111;

    if ((value & 0b00010000) != 0) {
        isAddressFirst = true;
    } 

    string regStr = mapRegister(reg);

    if (regStr == "") {
        errorManager.addSyntaxError(_currentToken.row, _currentToken.column, "Invalid register", _parserName);
        return;
    } else if ((value & 0b11100000) != 0) {
        errorManager.addSyntaxError(_currentToken.row, _currentToken.column, "Invalid code expression", _parserName);
        return;
    }

    _machineCodeStream << ' ' << _currentToken.value << ' ';
    _assemblyCodeStream << ' ';

    int row = _currentToken.row;
    int col = _currentToken.column;

    stringstream address;

    for (int i = 0; i < 4; i++) {
        _currentToken = _lexer->nextToken();
        address << _currentToken.value;
    }

    string addressString = mapAddress(address.str());

    if (addressString == "") {
        errorManager.addSyntaxError(row, col, "Invalid address", _parserName);
        return;
    }
    
    if (isAddressFirst) {
        _assemblyCodeStream << addressString << ", " << regStr;
        _machineCodeStream << address.str();
    } else {
        _assemblyCodeStream << regStr << ", " << addressString;
        _machineCodeStream << address.str();
    }

    _currentToken = _lexer->nextToken();
}

void Parser::parseAddRegReg() {
    stringstream ss;
    ss << hex << _currentToken.value;

    int value;
    ss >> value;

    int reg1 = (value & 0b11110000) >> 4;
    int reg2 = value & 0b00001111;

    string regStr1 = mapRegister(reg1);
    string regStr2 = mapRegister(reg2);

    if (regStr1 == "" || regStr2 == "") {
        errorManager.addSyntaxError(_currentToken.row, _currentToken.column, "Invalid register", _parserName);
        return;
    }

    _machineCodeStream << ' ' << _currentToken.value;
    _assemblyCodeStream << ' ' << regStr1 << ", " << regStr2;

    _currentToken = _lexer->nextToken();
}

void Parser::parseAddRegAddr() {
    stringstream ss;
    ss << hex << _currentToken.value;

    int value;
    ss >> value;

    int reg = value & 0b00001111;

    string regStr = mapRegister(reg);

    if (regStr == "") {
        errorManager.addSyntaxError(_currentToken.row, _currentToken.column, "Invalid register", _parserName);
        return;
    } else if ((value & 0b11110000) != 0) {
        errorManager.addSyntaxError(_currentToken.row, _currentToken.column, "Invalid code expression", _parserName);
        return;
    }

    _machineCodeStream << ' ' << _currentToken.value << ' ';
    _assemblyCodeStream << ' ';

    int row = _currentToken.row;
    int col = _currentToken.column;

    stringstream address;

    for (int i = 0; i < 4; i++) {
        _currentToken = _lexer->nextToken();
        address << _currentToken.value;
    }

    string addressString = mapAddress(address.str());

    if (addressString == "") {
        errorManager.addSyntaxError(row, col, "Invalid address", _parserName);
        return;
    }

    _assemblyCodeStream << regStr << ", " << addressString;
    _machineCodeStream << address.str();

    _currentToken = _lexer->nextToken();
}

void Parser::parseJgAddr() {
    int row = _currentToken.row;
    int col = _currentToken.column;

    stringstream address;

    address << _currentToken.value;
    for (int i = 0; i < 3; i++) {
        _currentToken = _lexer->nextToken();
        address << _currentToken.value;
    }

    string addressString = mapAddress(address.str());

    if (addressString == "") {
        errorManager.addSyntaxError(row, col, "Invalid address", _parserName);
        return;
    }

    _machineCodeStream << ' ' << _currentToken.value << ' ' << address.str();
    _assemblyCodeStream << ' ' << addressString;

    _currentToken = _lexer->nextToken();
}

void Parser::parseJgShift() {
    string shiftStr = mapShift(_currentToken.value);

    if (shiftStr == "") {
        errorManager.addSyntaxError(_currentToken.row, _currentToken.column, "Invalid shift", _parserName);
        return;
    }

    _machineCodeStream << ' ' << _currentToken.value;
    _assemblyCodeStream << ' ' << shiftStr;

    _currentToken = _lexer->nextToken();
}

void Parser::parseCmp() {
    stringstream ss;
    ss << hex << _currentToken.value;

    int value;
    ss >> value;

    int reg1 = (value & 0b11110000) >> 4;
    int reg2 = value & 0b00001111;

    string regStr1 = mapRegister(reg1);
    string regStr2 = mapRegister(reg2);

    if (regStr1 == "" || regStr2 == "") {
        errorManager.addSyntaxError(_currentToken.row, _currentToken.column, "Invalid register", _parserName);
        return;
    }

    _machineCodeStream << ' ' << _currentToken.value;
    _assemblyCodeStream << ' ' << regStr1 << ", " << regStr2;

    _currentToken = _lexer->nextToken();
}

void Parser::parseMovRegLit16() {
    stringstream ss;
    ss << hex << _currentToken.value;

    int value;
    ss >> value;

    int reg = value & 0b00001111;

    string regStr = mapRegister(reg);

    if (regStr == "") {
        errorManager.addSyntaxError(_currentToken.row, _currentToken.column, "Invalid register", _parserName);
        return;
    } else if ((value & 0b11110000) != 0b10000000) {
        errorManager.addSyntaxError(_currentToken.row, _currentToken.column, "Invalid code expression", _parserName);
        return;
    }

    _machineCodeStream << ' ' << _currentToken.value << ' ';
    _assemblyCodeStream << ' ';

    int row = _currentToken.row;
    int col = _currentToken.column;

    stringstream lit16;

    for (int i = 0; i < 2; i++) {
        _currentToken = _lexer->nextToken();
        lit16 << _currentToken.value;
    }

    string lit16Str = mapValue(lit16.str());

    if (lit16Str == "") {
        errorManager.addSyntaxError(row, col, "Invalid imdediate value", _parserName);
        return;
    }

    _assemblyCodeStream << regStr << ", " << lit16Str;
    _machineCodeStream << lit16.str();

    _currentToken = _lexer->nextToken();
}