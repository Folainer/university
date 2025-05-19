// Coin notifier

#include "coinNotifier.hpp"

void coinNotifier() {
    while (true) {
        if (!newCoinExchanging && coinSlot.load() == COINS::EMPTY) {
            newCoinInserting.store(true);

            coinSlot.store(getRandom(0, 6));
            Print::out(string("You tried to insert from your pocket "));
            Print::mapOut(coinSlot.load());
            Print::out(string(" into an exchange automata\n\n"));

            coinExchange.store(Print::input("Please choose a coin which you want to recieve: "));

            Print::out("The coin for exchange and coin which desired to recieved from automata is saved and we wait until the automata will react\n\n");

            newCoinInserting.store(false);
        }
    }
}