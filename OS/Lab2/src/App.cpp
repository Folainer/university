#include <iostream>
#include <thread>

#include "global.hpp"
#include "coinNotifier.hpp"
#include "coinAutomata.hpp"

using namespace std;

int main()
{
    unsigned seed = chrono::steady_clock::now().time_since_epoch().count();
    srand(seed);

    thread A(coinNotifier);
    thread B(coinAutomata);

    A.join();
    B.join();
    return 0;
}