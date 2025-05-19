#ifndef GLOBAL_HPP
#define GLOBAL_HPP

#include <string>
#include <unordered_map>
#include <fstream>
#include <algorithm>
#include <cctype>
#include <regex>

#include "ErrorManager.hpp"

using namespace std;

typedef struct {
    string value;
    int row;
    int column;
} Token;

enum SymbolCategory {
    WHITESPACE,
    HEX_DIGIT,
    PROHIBITED_CHARACTER,
};

enum CommandNames {
    MOVREGREG,
    MOVADDR,
    MOVREGADDR,
    MOVADDRREG,
    MOVREGLIT16,
    ADDREGREG,
    ADDREGADDR,
    JGADDR,
    JGSHIFT,
    CMP,
    PROHIBITED
};

enum ParseType {
    ASM,
    CODE_ASM
};

extern int symbol_categories[127];

extern ErrorManager errorManager;

string mapRegister(int value);

int mapMachineCode(string value);

string mapAddress(string hexAddress);

string mapValue(string hexValue);

string mapShift(string shiftValue);

void createFile(const string& filename, const string& content);
void removeFile(const string& filename);

bool isNumber(const string& str);

bool isHex(const string& str);

#endif