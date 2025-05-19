#include "Print.hpp"

void Print::out(string message) {
    cout << message;
}

void Print::out(int number) {
    cout << number;
}

void Print::mapOut(int coin) {
    cout << _coinMap[coin];
}

void Print::coinAutomataStatus(map<int, int> &coinStorage, string message) {
    cout << message << endl;
    for (auto &coinSlot : coinStorage) {
        cout << setw(2) << "" << coinSlot.second << " x " << _coinMap[coinSlot.first] << endl;
    }
}

int Print::input(string message) {
    string inputString;
    cout << message;
    while (true) {
        cin >> inputString;
        try {
            int value = getCoinKey(inputString);
            stoi(inputString);
            if (value >= 0 && value <= 5) {
                return value;
            }
            cout << "Incorrect input, please enter again: ";
        }
        catch(...)
        {
            cout << "Incorrect input, please enter again: ";
        }
    }
}

int Print::getCoinKey(string value) {
    if (_coinNameToCoinCodeMap.count(value)) {
        return _coinNameToCoinCodeMap[value];
    }
    return -1;
}