#ifndef GLOBAL_HPP
#define GLOBAL_HPP

#include <atomic>
#include <random>
#include <chrono>
#include <unordered_map>

using namespace std;

enum COINS {
    ONE,
    TWO,
    FIVE,
    TEN,
    TWENTY_FIVE,
    FIFTY,
    HRYVNIA,
    EMPTY
};

extern atomic<bool> newCoinExchanging;
extern atomic<bool> newCoinInserting;

extern atomic<int> coinSlot;
extern atomic<int> coinExchange;

extern mt19937 rng;

extern unordered_map<int, string> _coinMap;
extern unordered_map<string, int> _coinNameToCoinCodeMap;
extern unordered_map<int, int> _coinCodeToCoinValueMap;

int getRandom(int min, int max);


#endif