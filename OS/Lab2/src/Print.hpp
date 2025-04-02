#ifndef PRINT_HPP
#define PRINT_HPP

#include <iostream>
#include <string>
#include <unordered_map>
#include <map>
#include <iomanip>
#include <limits>

#include "global.hpp"

using namespace std;

class Print {
    private:

    static int getCoinKey(string value);

    public:
    static void out(string message);
    static void out(int number);
    static void mapOut(int coin);
    static void coinAutomataStatus(map<int, int> &coinStorage, string message);
    static int input(string message);
};

#endif