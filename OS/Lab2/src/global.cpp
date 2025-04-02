#include "global.hpp"

atomic<bool> newCoinExchanging(false);
atomic<bool> newCoinInserting(false);

atomic<int> coinSlot(COINS::EMPTY);
atomic<int> coinExchange(0);

mt19937 rng(chrono::steady_clock::now().time_since_epoch().count());

unordered_map<int, string> _coinMap = {
    { COINS::ONE, string("1 kopecks")},
    { COINS::TWO, string("2 kopecks")},
    { COINS::FIVE, string("5 kopecks")},
    { COINS::TEN, string("10 kopecks")},
    { COINS::TWENTY_FIVE, string("25 kopecks")},
    { COINS::FIFTY, string("50 kopecks")},
    { COINS::HRYVNIA, string("1 hryvnia")}
};

unordered_map<string, int> _coinNameToCoinCodeMap = {
    { string("1"), COINS::ONE},
    { string("2"), COINS::TWO},
    { string("5"), COINS::FIVE},
    { string("10"), COINS::TEN},
    { string("25"), COINS::TWENTY_FIVE},
    { string("50"), COINS::FIFTY},
    { string("100"), COINS::HRYVNIA},
};

unordered_map<int, int> _coinCodeToCoinValueMap = {
    { COINS::ONE, 1},
    { COINS::TWO, 2},
    { COINS::FIVE, 5},
    { COINS::TEN, 10},
    { COINS::TWENTY_FIVE, 25},
    { COINS::FIFTY, 50},
    { COINS::HRYVNIA, 50},
};

int getRandom(int min, int max) {
    uniform_int_distribution<int> dist(min, max);
    return dist(rng);
}