#ifndef LOGIC__HPP
#define LOGIC__HPP

#include <vector>
#include <queue>

using namespace std;

typedef struct
{
    int id;
    int arrivalTime;
    int burstTime;
    int executionTime;
    int startTime;
    int endTime;
    int waitingTime;
    int remainingTime;
    bool isStarted;
} ProcessType;

class Scheduling {
    public: 
    Scheduling(int timeQuantum, vector<ProcessType> &ps);
    void print();
    
    private:
    void calculate();
    int _timeQuantum;
    queue<ProcessType> _ps;
    vector<ProcessType> _fps;
    float _averageExecutionTime;
    float _averageWaitingTime;
};

#endif