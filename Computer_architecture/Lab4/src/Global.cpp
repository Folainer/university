#include "Global.hpp"

#include <sstream>
#include <iomanip>

int symbol_categories[127] = {
    PROHIBITED_CHARACTER, PROHIBITED_CHARACTER, PROHIBITED_CHARACTER, PROHIBITED_CHARACTER,
    PROHIBITED_CHARACTER, PROHIBITED_CHARACTER, 
    PROHIBITED_CHARACTER, 
    PROHIBITED_CHARACTER,
    PROHIBITED_CHARACTER,   
    WHITESPACE, 
    WHITESPACE, 
    WHITESPACE, 
    WHITESPACE, 
    WHITESPACE, 
    PROHIBITED_CHARACTER, 
    PROHIBITED_CHARACTER, 
    PROHIBITED_CHARACTER,
    PROHIBITED_CHARACTER, 
    PROHIBITED_CHARACTER, 
    PROHIBITED_CHARACTER, 
    PROHIBITED_CHARACTER,
    PROHIBITED_CHARACTER, 
    PROHIBITED_CHARACTER, 
    PROHIBITED_CHARACTER,
    PROHIBITED_CHARACTER,
    PROHIBITED_CHARACTER,
    PROHIBITED_CHARACTER,
    PROHIBITED_CHARACTER,
    PROHIBITED_CHARACTER,
    PROHIBITED_CHARACTER,
    PROHIBITED_CHARACTER,
    PROHIBITED_CHARACTER,
    WHITESPACE,
    PROHIBITED_CHARACTER,
    PROHIBITED_CHARACTER,
    PROHIBITED_CHARACTER,
    PROHIBITED_CHARACTER,
    PROHIBITED_CHARACTER,
    PROHIBITED_CHARACTER,
    PROHIBITED_CHARACTER,
    PROHIBITED_CHARACTER,
    PROHIBITED_CHARACTER,
    PROHIBITED_CHARACTER,
    PROHIBITED_CHARACTER,
    PROHIBITED_CHARACTER,
    PROHIBITED_CHARACTER,
    PROHIBITED_CHARACTER,
    PROHIBITED_CHARACTER,
    HEX_DIGIT,
    HEX_DIGIT,
    HEX_DIGIT,
    HEX_DIGIT,
    HEX_DIGIT,
    HEX_DIGIT,
    HEX_DIGIT,
    HEX_DIGIT,
    HEX_DIGIT,
    HEX_DIGIT,
    PROHIBITED_CHARACTER,
    PROHIBITED_CHARACTER,
    PROHIBITED_CHARACTER,
    PROHIBITED_CHARACTER,
    PROHIBITED_CHARACTER,
    PROHIBITED_CHARACTER,
    PROHIBITED_CHARACTER,
    HEX_DIGIT,
    HEX_DIGIT,
    HEX_DIGIT,
    HEX_DIGIT,
    HEX_DIGIT,
    HEX_DIGIT,
    PROHIBITED_CHARACTER,
    PROHIBITED_CHARACTER,
    PROHIBITED_CHARACTER,
    PROHIBITED_CHARACTER,
    PROHIBITED_CHARACTER,
    PROHIBITED_CHARACTER,
    PROHIBITED_CHARACTER,
    PROHIBITED_CHARACTER,
    PROHIBITED_CHARACTER,
    PROHIBITED_CHARACTER,
    PROHIBITED_CHARACTER,
    PROHIBITED_CHARACTER,
    PROHIBITED_CHARACTER,
    PROHIBITED_CHARACTER,
    PROHIBITED_CHARACTER,
    PROHIBITED_CHARACTER,
    PROHIBITED_CHARACTER,
    PROHIBITED_CHARACTER,
    PROHIBITED_CHARACTER,
    PROHIBITED_CHARACTER,
    PROHIBITED_CHARACTER,
    PROHIBITED_CHARACTER,
    PROHIBITED_CHARACTER,
    PROHIBITED_CHARACTER,
    PROHIBITED_CHARACTER,
    PROHIBITED_CHARACTER,
    HEX_DIGIT,
    HEX_DIGIT,
    HEX_DIGIT,
    HEX_DIGIT,
    HEX_DIGIT,
    HEX_DIGIT,
    PROHIBITED_CHARACTER,
    PROHIBITED_CHARACTER,
    PROHIBITED_CHARACTER,
    PROHIBITED_CHARACTER,
    PROHIBITED_CHARACTER,
    PROHIBITED_CHARACTER,
    PROHIBITED_CHARACTER,
    PROHIBITED_CHARACTER,
    PROHIBITED_CHARACTER,
    PROHIBITED_CHARACTER,
    PROHIBITED_CHARACTER,
    PROHIBITED_CHARACTER,
    PROHIBITED_CHARACTER,
    PROHIBITED_CHARACTER,
    PROHIBITED_CHARACTER,
    PROHIBITED_CHARACTER,
    PROHIBITED_CHARACTER,
    PROHIBITED_CHARACTER,
    PROHIBITED_CHARACTER,
    PROHIBITED_CHARACTER,
    PROHIBITED_CHARACTER,
    PROHIBITED_CHARACTER,
    PROHIBITED_CHARACTER,
    PROHIBITED_CHARACTER,
};

ErrorManager errorManager;

unordered_map<int, string> registerMap = {
    {0b000, "R0"},
    {0b001, "R1"},
    {0b010, "R2"},
    {0b011, "R3"},
    {0b100, "R4"},
    {0b101, "R5"},
    {0b110, "R6"},
    {0b111, "R7"}

};

unordered_map<string, int> machineCodeMap = {
    {"1A", MOVREGREG},
    {"1B", MOVADDR},
    {"1C", MOVREGLIT16},
    {"01", ADDREGREG},
    {"02", ADDREGADDR},
    {"95", JGADDR},
    {"94", JGSHIFT},
    {"80", CMP}
};

string mapRegister(int value) {
    if (registerMap.count(value) > 0) {
        return registerMap[value];
    }

    return "";
}

int mapMachineCode(string value) {
    if (machineCodeMap.count(value) > 0) {
        return machineCodeMap[value];
    }

    return PROHIBITED;
}


string mapAddress(string hexAddress) {
    if (hexAddress.size() != 8) {
        return "";
    }

    stringstream ss;

    ss << "[0x" << hexAddress << ']';

    return ss.str();
}

string mapValue(string hexValue) {
    if (hexValue.size() != 4) {
        return "";
    }

    int value;
    stringstream ss;

    ss << hex << hexValue;

    ss >> value;

    return to_string(value);
}

string mapShift(string shiftValue) {
    if (shiftValue.size() != 2) {
        return "";
    }

    stringstream ss;

    ss << hex << shiftValue;

    int value;

    ss >> value;

    if (value > 127) {
        value = -(256 - value);
    }

    return to_string(value);
}

void createFile(const string& filename, const string& content) {
    ofstream file(filename);

    file << content;

    file.close();
}

void removeFile(const string& filename) {
    if (remove(filename.c_str()) != 0) {
        cerr << "Error removing file: " << filename << endl;
    } else {
        cout << "File '" << filename << "' removed successfully!" << endl;
    }
}

bool isNumber(const std::string& str) {
    return !str.empty() && all_of(str.begin(), str.end(), ::isdigit);
}

bool isHex(const string& str) {
    regex hexRegex("^(0[xX])?[0-9a-fA-F]+$");
    return std::regex_match(str, hexRegex);
}