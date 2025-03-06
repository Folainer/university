#include <algorithm>
#include <iomanip>
#include "Logic.hpp"

Scheduling::Scheduling(vector<ProcessType> &processes) : _executionRate(0), _averageWaitingTime(0), _averageExecutionTime(0), _processes(processes) {
    sort(_processes.begin(), _processes.end(), [](const ProcessType pa, const ProcessType pb) {
        return pa.arrivalTime < pb.arrivalTime;
    });
    calculate();
}

void Scheduling::print() {
    cout << "---------------------------------------------------------------------------------------" << endl;
    cout << "| PID | Arrival time | Expected execution time | Start time | End time | Waiting time |" << endl;
    cout << "---------------------------------------------------------------------------------------" << endl;
    for (const auto &p : _processes) {
        cout << "| " << setw(3) << p.id;
        cout << " | " << setw(12) << p.arrivalTime;
        cout << " | " << setw(23) << p.expectedExecutionTime;
        cout << " | " << setw(10) << p.startTime;
        cout << " | " << setw(8) << p.endTime;
        cout << " | " << setw(12) << p.waitingTime;
        cout << " |\n";
    }
    cout << "---------------------------------------------------------------------------------------" << endl;
    cout << "Process execution rate is " << _executionRate * 100 << "%" << endl;
    cout << "Averaging waiting time is " << _averageWaitingTime << endl;
    cout << "Avargaging execution time is " << _averageExecutionTime << endl;
}

void Scheduling::calculate() {
    int currentTime = 0;
    int n = _processes.size();


    for (int i = 0; i < n; i++) {
        if (currentTime < _processes[i].arrivalTime) {
            currentTime = _processes[i].arrivalTime;
        }
        _processes[i].startTime = currentTime;
        _processes[i].endTime = currentTime + _processes[i].expectedExecutionTime;
        _processes[i].waitingTime = _processes[i].startTime - _processes[i].arrivalTime;
        
        currentTime = _processes[i].endTime;

        _executionRate += (float)(_processes[i].expectedExecutionTime) / (_processes[i].expectedExecutionTime +  _processes[i].waitingTime);
        _averageWaitingTime += _processes[i].waitingTime;
        _averageExecutionTime += _processes[i].endTime - _processes[i].startTime;
    }

    _executionRate /= (float)n;
    _averageWaitingTime /= (float)n;
    _averageExecutionTime /= (float)n;
}