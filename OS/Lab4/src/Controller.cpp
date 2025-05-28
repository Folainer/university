#include "Controller.hpp"

Controller::Controller() : _tree(AVLTree()) {}

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
            if (command.size() <= 0 || command.size() > 3) {
                throw "prohibited";
            }
            
            string commandName = command[0];
            if (command.size() == 1) {
                if (commandName == "h") {
                    help();
                } else if (commandName == "e") {
                    exit(0);
                } else if (commandName == "t") {
                    _tree.printTree();
                } else if (commandName == "p") {
                    _tree.printFiles();
                } else {
                    throw "prohibited";
                }
            } else if (command.size() == 2) {
                if (commandName == "i") {
                    _tree.insert({command[1], 10, getCurrentTime()});
                }  else if (commandName == "d") {
                    _tree.remove(command[1]);
                }  else if (commandName == "f") {
                    file(command[1]);
                } else {
                    throw "prohibited";
                }
            } else {
                if (commandName == "i") {
                    _tree.insert({command[1], stoi(command[2]), getCurrentTime()});
                }
            }
        } catch(...) {
            cout << "Incorect command, for getting info, please type h" << endl;
        }
    }
}


void Controller::help() {
    int indent = 20;
    cout << "Information about available commands:" << endl;
    cout << left << setw(indent) << "h" << "Shows information about available commands" << endl;
    cout << left << setw(indent) << "i <name> [filesize]" << "Inserting new file to the tree" << endl;
    cout << left << setw(indent) << "d <name>" << "Deleting a file from the tree" << endl;
    cout << left << setw(indent) << "f <id>" << "Finding a file from the tree" << endl;
    cout << left << setw(indent) << "t" << "Printing the whole tree" << endl;
    cout << left << setw(indent) << "p" << "Printing the whole files from tree" << endl;
    cout << left << setw(indent) << "e" << "Exits" << endl;
}


void Controller::file(const string& id) {
    FileInfo* file = _tree.find(id);
    if (file) {
        cout << "The file is found:" << endl;
        _tree.printFile(*file);
    } else {
        cout << "The file doesn't exist or format is not \\w\\w\\d" << endl;
    }
}
