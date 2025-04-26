#ifndef MODEL_HPP
#define MODEL_HPP

#include <vector>
#include <random>
#include <iostream>

#include "Global.hpp"

using namespace std;

typedef struct {
    int id;
    bool isLoaded;
    int memoryAddress;
    int size;
} Process;

class Model {
    public:
    Model();
    void init(int processCount, int memorySize);
    vector<Process>* getProcesses();
    bool load(int index);
    bool unload(int index);

    private:
    int findProcessById(int pid);
    int findIndexForLoad(int processSize);
    void compression();

    int _memorySize;
    int _insertionMemory;
    vector<Process> _processes;
};

#endif