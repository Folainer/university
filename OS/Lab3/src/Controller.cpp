#include "Controller.hpp"

Controller::Controller() : _model(Model()) {
    _model.init(15, 4000);
}

void Controller::run() {
    while (true)
    {
        cout << "Enter your next command: ";
        string commandString;
        getline(cin, commandString);

        istringstream ss(commandString);

        vector<string> command;
        string token;

        while (ss >> token) {
            command.push_back(token);
        }

        try {
            if (command.size() <= 0 || command.size() > 2) {
                throw "prohibited";
            }
            
            string commandName = command[0];
            if (command.size() == 1) {
                if (commandName == "h") {
                    help();
                } else if (commandName == "m") {
                    memoryStatus();
                } else if (commandName == "p") {
                    processStatus();
                } else if (commandName == "e") {
                    exit(0);
                } else {
                    throw "prohibited";
                }
            } else {
                if (commandName == "l") {
                    loadProcess(stoi(command[1]));
                } else if (commandName == "u") {
                    unloadProcess(stoi(command[1]));
                } else {
                    throw "prohibited";
                }
            }
        } catch(...) {
            cout << "Incorect command, for getting info, please type h" << endl;
        }

        // cout << "You: " << commandString << endl;
    }
}


void Controller::help() {
    int indent = 12;
    cout << "Information about available commands:" << endl;
    cout << left << setw(indent) << "h" << "Shows information about available commands" << endl;
    cout << left << setw(indent) << "l <index>" << "Attempt for loading an unloaded process" << endl;
    cout << left << setw(indent) << "u <index>" << "Attempt for unloading an loaded process" << endl;
    cout << left << setw(indent) << "m" << "Shows information about memory allocation" << endl;
    cout << left << setw(indent) << "p" << "Shows information about status of all processes" << endl;
    cout << left << setw(indent) << "e" << "Exits" << endl;
}


void Controller::memoryStatus() {
    vector<Process> *processes = _model.getProcesses();

    bool isAnyProcessLoaded = false;

    for (auto process : *processes) {
        if (process.isLoaded) {
            isAnyProcessLoaded = true;
        }
    }

    if (isAnyProcessLoaded) {
        cout << setw(5) << left << "PID" << setw(30) << left << "Memory address" << endl;
    } else {
        cout << "There are no process running now" << endl;
    }

    for (auto process : *processes) {
        if (process.isLoaded) {
            ostringstream ss;
            ss << process.memoryAddress << ':' << process.memoryAddress + process.size;

            cout << setw(5) << left << process.id << setw(30) << left << ss.str() << endl;
        }
    }
}


void Controller::processStatus() {
    vector<Process> *processes = _model.getProcesses();
    cout << setw(5) << "PID" << setw(10) << "isLoaded"<< setw(15) << "Memory address"  << setw(10) << "Size" << endl;

    for (auto process : *processes) {
        cout << setw(5) << process.id << setw(10) << boolalpha << process.isLoaded << setw(15) << process.memoryAddress << setw(10) << process.size << endl;
    }
}


void Controller::loadProcess(int index) {
    bool isLoaded = _model.load(index);

    if (isLoaded) {
        cout << "Load process executed successfully" << endl; 
    } else {
        cout << "Load process failed" << endl;
    }
}


void Controller::unloadProcess(int index) {
    bool isLoaded = _model.unload(index);

    if (isLoaded) {
        cout << "Unload process executed successfully" << endl; 
    } else {
        cout << "Unload process failed" << endl;
    }
}