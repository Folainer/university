#include "Model.hpp"

Model::Model () : _memorySize(0), _insertionMemory(0) {}


void Model::init(int processCount, int memorySize) {
    uniform_int_distribution<int> distribution(1, 100);

    for (int i = 0; i < processCount; i++) {
        _processes.push_back({
            i + 1,
            false,
            -1,
            distribution(generator) * 10
        });
    }

    _memorySize = memorySize;
}

vector<Process>* Model::getProcesses() {
    return &_processes;
}

bool Model::load(int index) {
    int processIndex = findProcessById(index);

    if (processIndex == -1) {
        return false;
    }

    auto proc = _processes[processIndex];    
    
    if (proc.isLoaded) {
        return false;
    }
    
    
    int processSize = proc.size;
    
    int insertIndex = findIndexForLoad(processSize);
    
    // cout << '[' << insertIndex << ']' << endl;

    if (insertIndex == -1) {
        compression();
    }

    insertIndex = findIndexForLoad(processSize);

    if (insertIndex == -1) {
        return false;
    }

    Process processBuf =  _processes[processIndex];
    processBuf.isLoaded = true;
    processBuf.memoryAddress = _insertionMemory;

    for (int i = processIndex; i > insertIndex; --i) {
        _processes[i] = _processes[i - 1];
    }

    _processes[insertIndex] = processBuf;
    
    return true;
}

bool Model::unload(int index) {
    int processIndex = findProcessById(index);
    
    if (processIndex == -1) {
        return false;
    }
    
    auto proc = _processes[processIndex];    
    
    if (!proc.isLoaded) {
        return false;
    }

    int insertIndex = _processes.size() - 1;
    for (int i = 0; i < (int)_processes.size(); i++) {
        if (!_processes[i].isLoaded) {
            insertIndex = i;
            break;
        }
    }
    // cout << '[' << insertIndex << ']' << endl;

    Process processBuf = _processes[processIndex];
    processBuf.isLoaded = false;
    processBuf.memoryAddress = -1;

    if (processIndex < insertIndex) {
        for (int i = processIndex; i < insertIndex; i++) {
            _processes[i] = _processes[i + 1];
        }
        _processes[insertIndex - 1] = processBuf;
    } else {
        _processes[processIndex] = processBuf;
    }

    return true;
}


//---------private----------

int Model::findProcessById(int pid) {
    int index = 0;
    for (auto process : _processes) {
        if (process.id == pid) {
            return index;
        }
        index++;
    }
    return -1;
}


int Model::findIndexForLoad(int processSize) {
    int startAddress = 0;
    _insertionMemory = 0;

    int loadedProcesses = 0;
    for (size_t i = 0; i < _processes.size(); ++i) {
        if (_processes[i].isLoaded) {
            if (startAddress + processSize <= _processes[i].memoryAddress) {
                return i;
            } else {
                startAddress = _processes[i].memoryAddress + _processes[i].size;
                _insertionMemory = startAddress;
            }
            loadedProcesses++;
        } 
    }

    if (startAddress + processSize <= _memorySize) {
        return loadedProcesses;
    } 

    return -1;
}


void Model::compression() {
    int currentAddress = 0;

    for (auto &proc : _processes) {
        if (proc.isLoaded) {
            proc.memoryAddress = currentAddress;
            currentAddress += proc.size;
        }
    }
}