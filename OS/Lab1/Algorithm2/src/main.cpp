#include <iostream>
#include <vector>

#include "Logic.hpp"

using namespace std;

int main() {
    int n, timeQuantum;
    vector<ProcessType> ps;
    
    cout << "Enter process count: ";
    cin >> n;
    cout << "Enter time quantum: ";
    cin >> timeQuantum;

    for (int i = 0; i < n; i++) {
        ProcessType p;
        p.id = i + 1;
        cout << '\t' << i + 1 << ")\n";
        cout << "\tEnter arrival time: ";
        cin >> p.arrivalTime;
        cout << "\tEnter burst time: ";
        cin >> p.burstTime;
        cout << '\n';
        ps.push_back(p);
    }

    Scheduling s(timeQuantum, ps);
    s.print();
    return 0;
}