//FCFS algorithm
#include <iostream>
#include "Logic.hpp"

using namespace std;

int main()
{
    int n;
    vector<ProcessType> processes;
    cout << "Pleasre write down how many processes you want to run: ";
    cin >> n;
    for (int i = 0; i < n; i++) {
        cout << "Please write arrival time and expected time execution for " << i + 1 << " process: ";
        ProcessType p;
        cin >> p.arrivalTime >> p.expectedExecutionTime;
        p.id = i + 1;
        processes.push_back(p);
    }

    Scheduling s(processes);
    s.print();
    
    return 0;
}