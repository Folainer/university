#include "Utilities.hpp"

string Utilities::getLeftString(int value, int width) {
    return getLeftString(to_string(value), width);
}


string Utilities::getLeftString(string str, int width) {
    ostringstream ss;
    ss << left << setw(width) << str;
    return ss.str();
}

string Utilities::getErrorMessage(string filename, int row, int col, string errorMessage, string problemPart) {
    ostringstream ss;
    if (row != -1) {
        ss << filename << ':' << row << ':' << col << ": error: " << errorMessage << ' ' << problemPart;
    } else {
        ss << filename << ": error: " << errorMessage << ' ' << problemPart;
    }
    return ss.str();
}

string Utilities::trim(const string& str) {
    if (str.empty()) return str;

    size_t start = str.find_first_not_of(" \t\n\r");
    if (start == string::npos) return ""; 

    size_t end = str.find_last_not_of(" \t\n\r");

    return str.substr(start, end - start + 1);
}