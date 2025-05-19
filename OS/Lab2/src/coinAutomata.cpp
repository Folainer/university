// Coin automata

#include "coinAutomata.hpp"

map<int, int> coinStorage = {
    {COINS::ONE, 0},
    {COINS::TWO, 0},
    {COINS::FIVE, 0},
    {COINS::TEN, 0},
    {COINS::TWENTY_FIVE, 0},
    {COINS::FIFTY, 0},
    {COINS::HRYVNIA, 0}
};

void randomlyFillStorage() {
    for (auto &coinSlot : coinStorage) {
        coinSlot.second = rand() % 50;
    }

    coinStorage[COINS::HRYVNIA] = 0;
}

void coinAutomata() {
    randomlyFillStorage();

    while (true) {
        if (!newCoinInserting && coinSlot.load() != COINS::EMPTY) {
            newCoinExchanging.store(true);
            
            Print::coinAutomataStatus(coinStorage, string("Current status of the automata coin strorage before exchanging:"));

            int forExchangeCoinValue = _coinCodeToCoinValueMap[coinSlot.load()];
            int fromExchangeCoinValue = _coinCodeToCoinValueMap[coinExchange.load()];

            if (forExchangeCoinValue % fromExchangeCoinValue != 0) {
                Print::out("Exchange error: your coin can not be exchanged because you chose unsutable coin for exchange. The automata returns your coin\n\n");
                coinSlot.store(COINS::EMPTY);
                newCoinExchanging.store(false);
                continue;
            }

            int exchangeCoinCount = forExchangeCoinValue / fromExchangeCoinValue;

            if (coinStorage[coinSlot] < exchangeCoinCount) {
                Print::out("Exchange error: the automata doesn't have enough coins to complete your exchange. The automata returns your coin\n\n");
                coinSlot.store(COINS::EMPTY);
                newCoinExchanging.store(false);
                continue;
            }

            coinStorage[coinExchange] -= exchangeCoinCount;
            coinStorage[coinSlot]++;
            coinSlot = COINS::EMPTY;

            Print::out("\nExchange was ended successfully. Lucky for you!\n\n");

            Print::coinAutomataStatus(coinStorage, string("Current status of the automata coin strorage after exchanging:"));

            Print::out("\n");

            newCoinExchanging.store(false);
        }
    }
}