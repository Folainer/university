#include <algorithm>
#include <iostream>
#include <iomanip>
#include <fstream>

#include "Logic.hpp"

Scheduling::Scheduling(int timeQuantum, vector<ProcessType> &ps) 
: _timeQuantum(timeQuantum),
_ps(), _fps(), _averageExecutionTime(0), _averageWaitingTime(0)
{
    sort(ps.begin(), ps.end(), [](const ProcessType pa, const ProcessType pb) {
        return pa.arrivalTime < pb.arrivalTime;
    });

    for (auto p: ps) {
        p.remainingTime = p.burstTime;
        p.isStarted = false;
        _ps.push(p);
    }

    calculate();
}

void Scheduling::calculate() {
    int currentTime = _ps.front().arrivalTime;
    ofstream file("output.txt");

    if (!file) {
        cerr << "Error opening file!" << endl;
        return;
    }

    while (_ps.size() > 0) {
        auto p = _ps.front();
        _ps.pop();

        file << setw(4) << setfill('0') << right << currentTime << ": P" << p.id << endl;

        if (!p.isStarted) {
            p.isStarted = true;
            p.startTime = currentTime;
        }

        if (p.remainingTime > _timeQuantum) {
            currentTime += _timeQuantum;
            p.remainingTime -= _timeQuantum;
            _ps.push(p);
        } else {
            currentTime += p.remainingTime;
            p.endTime = currentTime;
            p.remainingTime = 0;
            p.executionTime = p.endTime - p.arrivalTime;
            p.waitingTime = p.executionTime - p.burstTime;
            _fps.push_back(p);
        }
    }

    file.close();

    sort(_fps.begin(), _fps.end(), [](const ProcessType pa, const ProcessType pb) {
        return pa.arrivalTime < pb.arrivalTime;
    });

    for (const auto& p : _fps) {
        _averageExecutionTime += p.executionTime;
        _averageWaitingTime += p.waitingTime;
    }
    _averageExecutionTime /= _fps.size();
    _averageWaitingTime /= _fps.size();
}

void Scheduling::print() {

    if (_fps.size() > 0) {
        cout << "-------------------------------------------------------------------------------------------" << endl;
        cout << "| PID | Arrival time | Burst time | Execution time | Start time | End time | Waiting time |" << endl;
        cout << "-------------------------------------------------------------------------------------------" << endl;
    }

    for (const auto& p: _fps) {
        cout << "| " << setw(3) << p.id << " | ";
        cout << setw(12) << p.arrivalTime << " | ";
        cout << setw(10) << p.burstTime << " | ";
        cout << setw(14) << p.executionTime << " | ";
        cout << setw(10) << p.startTime << " | ";
        cout << setw(8) << p.endTime << " | ";
        cout << setw(12) << p.waitingTime << " |" << endl;
    }

    if (_fps.size() > 0) {
        cout << "-------------------------------------------------------------------------------------------" << endl;
        cout << "Average execution time: " << _averageExecutionTime << endl;
        cout << "Avergage waiting time: " << _averageWaitingTime << endl;
    }
}