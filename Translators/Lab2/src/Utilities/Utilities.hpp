#include <string>
#include <sstream>
#include <iostream>
#include <iomanip>
#include <algorithm>
#include "../DataManagement/Global.hpp"

#ifndef UTILITIES_HPP
#define UTILITIES_HPP

using namespace std;

class Utilities {
    public:
    static string getLeftString(int value, int width);
    static string getLeftString(string value, int width);
    static string getErrorMessage(string filename, int row, int col, string errorMessage, string problemPart);
    static string trim(const string& str);
};

#endif