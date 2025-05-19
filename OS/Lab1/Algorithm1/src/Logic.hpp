#ifndef LOGIC__HPP
#define LOGIC__HPP

#include <vector>
#include <iostream>

using namespace std;

typedef struct
{
    int id;
    int arrivalTime;
    int expectedExecutionTime;
    int startTime;
    int endTime;
    int waitingTime;
} ProcessType;

class Scheduling
{
    public:
    Scheduling(vector<ProcessType> &processes);

    void print();

    private:
    float _executionRate;
    float _averageWaitingTime;
    float _averageExecutionTime;
    void calculate();
    vector<ProcessType> &_processes;
};

#endif