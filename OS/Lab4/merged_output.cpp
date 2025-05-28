// App.cpp
#include <iostream>

#include "Controller.hpp"

using namespace std;

int main() {
    Controller controler;

    controler.run();

    return 0;
}


// AVLTree.cpp
#include "AVLTree.hpp"

int AVLTree::getHeight(AVLNode* node) {
    return node ? node->height : 0;
}

int AVLTree::getBalance(AVLNode* node) {
    return node ? getHeight(node->left) - getHeight(node->right) : 0;
}

void AVLTree::updateHeight(AVLNode* node) {
    node->height = max(getHeight(node->left), getHeight(node->right)) + 1;
}

AVLNode* AVLTree::rightRotate(AVLNode* A) {
    AVLNode* B = A->left;
    AVLNode* T2 = B->right;

    B->right = A;
    A->left = T2;

    updateHeight(A);
    updateHeight(B);

    return B;
}

AVLNode* AVLTree::leftRotate(AVLNode* A) {
    AVLNode* B = A->right;
    AVLNode* T2 = B->left;

    B->left = A;
    A->right = T2;

    updateHeight(A);
    updateHeight(B);

    return B;
}

AVLNode* AVLTree::insertNode(AVLNode* node, const FileInfo& file) {
    if (!node) {
        node = new AVLNode(file);
    }

    if (file < node->file) {
        node->left = insertNode(node->left, file);
    } else if (file > node->file) {
        node->right = insertNode(node->right, file);
    } else {
        // duplicated found
        return node;
    }

    updateHeight(node);

    int balance = getBalance(node);

    //Left left case
    if (balance > 1 && file < node->file) {
        return rightRotate(node);
    }

    //Right right case
    if (balance < -1 && file > node->file) {
        return leftRotate(node);
    }

    //Left right case
    if (balance > 1 && file > node->file) {
        node->left = leftRotate(node->left);
        return rightRotate(node);
    }
    
    //Right left case
    if (balance < -1 && file < node->file) {
        node->right = rightRotate(node->right);
        return leftRotate(node);
    }

    return node;
}

AVLNode* AVLTree::minValueNode(AVLNode* node) {
    AVLNode* currentNode = node;

    while (currentNode->left) {
        currentNode = currentNode->left;
    }

    return currentNode;
}

AVLNode* AVLTree::deleteNode(AVLNode* node, const string& id) {
    if (!node) {
        return node;
    }

    if (node->file > id) {
        node->left = deleteNode(node->left, id);
    } else if (node->file < id) {
        node->right = deleteNode(node->right, id);
    } else {
        if (!node->left || !node->right) {
            AVLNode* temp = node->left ? node->left : node->right;
            delete node;
            return temp;
        }

        AVLNode* temp = minValueNode(node->right);
        node->file = temp->file;
        node->right = deleteNode(node->right, temp->file.identifier);
    }

    updateHeight(node);
    int balance = getBalance(node);

    if (balance > 1 && getBalance(node->left) >= 0) {
        return rightRotate(node);
    }

    if (balance > 1 && getBalance(node->left) < 0) {
        node->left = leftRotate(node->left);
        return rightRotate(node);
    }

    if (balance < -1 && getBalance(node->right) <= 0) {
        return leftRotate(node);
    }

    if (balance < -1 && getBalance(node->right) > 0) {
        node->right = rightRotate(node->right);
        return leftRotate(node);
    }

    return node;
}

AVLNode* AVLTree::search(AVLNode* node, const string& id) {
    if (!node || node->file == id) {
        return node;
    }

    if (node->file > id) {
        return search(node->left, id);
    } else {
        return search(node->right, id);
    }
}

void AVLTree::printTreeRecursion(AVLNode* node, const string& prefix = "", bool isLeft = true, bool isRoot = true) {
    if (!node) {
        return;
    }

    cout << prefix;

    if (!isRoot) {
        cout << (isLeft ? "|-" : "*-");
    }

    cout << node->file.identifier << '\n';

    string newPrefix = prefix;

    if (!isRoot) {
        newPrefix += (isLeft ? "| " : "  ");
    }

    bool hasLeft = node->left != nullptr;
    bool hasRight = node->right != nullptr;
    
    if (hasLeft || hasRight) {
        if (node->left) {
            printTreeRecursion(node->left, newPrefix, true, false);
        }
        if (node->right) {
            printTreeRecursion(node->right, newPrefix, false, false);
        }
    }
}

void AVLTree::printFilesRecursion(AVLNode* node) {
    if (!node) {
        return;
    }

    printFilesRecursion(node->left);

    printFile(node->file);

    printFilesRecursion(node->right);
}
//---- public

AVLTree::AVLTree() : _root(nullptr) {}

void AVLTree::insert(const FileInfo& file) {
    if (isValidIdentifier(file.identifier)) {
        if (find(file.identifier)) {
            cout << "The same identifier used" << endl;
            return;
        }
        _root = insertNode(_root, file);
        cout << "The file was inserted into a tree" << endl;
    } else {
        cout << "Invalid format for identifier. Please use this format: \\w\\w\\d" << endl;
    }
}

void AVLTree::remove(const string& id) {
    if (isValidIdentifier(id)) {
        if (!find(id)) {
            cout << "There are no such identifier" << endl;
            return;
        }
        _root = deleteNode(_root, id);
        cout << "The file was removed from a tree" << endl;
    } else {
        cout << "Invalid format for identifier. Please use this format: \\w\\w\\d" << endl;
    }
}

FileInfo* AVLTree::find(const string& id) {
    AVLNode* result = search(_root, id);

    if (result) {
        return &result->file;
    } else {
        return nullptr;
    }
}

void AVLTree::printFile(FileInfo& file) {
    cout << left << setw(6) << file.identifier <<  file.timestamp << right << setw(8) << file.filesize << 'B' << endl;
}


void AVLTree::printTree() {
    if (!_root) {
        cout << "AVL tree is empty!" << endl;
        return;
    }

    cout << "AVL tree structure:\n";
    printTreeRecursion(_root);
    cout << '\n';
}

void AVLTree::printFiles() {
    if (!_root) {
        cout << "The tree is empty!" << endl;
        return;
    }
    cout << left << setw(6) << "ID" << left << setw(19) << "Data and time" << " Filesize" << endl;
    printFilesRecursion(_root);
}


// AVLTree.hpp
#ifndef AVLTREE_HPP
#define AVLTREE_HPP

#include <vector>
#include <random>
#include <iostream>

#include "Global.hpp"

using namespace std;


class AVLTree {
    public:
    AVLTree();

    void insert(const FileInfo& file);
    void remove(const string& file);
    FileInfo* find(const string& id);
    void printFile(FileInfo& file);
    void printTree();
    void printFiles();
    
    private:
    AVLNode* _root;
    
    int getHeight(AVLNode* node);
    int getBalance(AVLNode* node);
    void updateHeight(AVLNode* node);
    
    AVLNode* rightRotate(AVLNode* A);
    AVLNode* leftRotate(AVLNode* A);
    
    AVLNode* insertNode(AVLNode* node, const FileInfo& file);
    AVLNode* deleteNode(AVLNode* node, const string& id);
    
    AVLNode* search(AVLNode* node, const string& id);
    
    AVLNode* minValueNode(AVLNode * node);
    
    // void printTreeRecursion(AVLNode* node, int depth);
    void printTreeRecursion(AVLNode* node, const string& prefix, bool isLeft, bool isRoot);
    void printFilesRecursion(AVLNode* node);
};

#endif


// Controller.cpp
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



// Controller.hpp
#ifndef CONTROLLER_HPP
#define CONTROLLER_HPP

#include <iostream>
#include <string>
#include <sstream>
#include <vector>
#include <iomanip>
#include <cstdlib>

#include "AVLTree.hpp"

using namespace std;

class Controller {
    public:
    Controller();
    void run();

    private:
    void help();
    void file(const string& id);

    AVLTree _tree;
};

#endif


// Global.cpp
#include "Global.hpp"

bool FileInfo::operator<(const FileInfo& other) const {
    return this->identifier < other.identifier;
}

bool FileInfo::operator>(const FileInfo& other) const {
    return this->identifier > other.identifier;
}

bool FileInfo::operator==(const FileInfo& other) const {
    return this->identifier == other.identifier;
}

bool FileInfo::operator!=(const FileInfo& other) const {
    return this->identifier != other.identifier;
}

bool FileInfo::operator<(const string& other) const {
    return this->identifier < other;
}

bool FileInfo::operator>(const string& other) const {
    return this->identifier > other;
}

bool FileInfo::operator==(const string& other) const {
    return this->identifier == other;
}

bool FileInfo::operator!=(const string& other) const {
    return this->identifier != other;
}

AVLNode::AVLNode(const FileInfo& f) : file(f), left(nullptr), right(nullptr), height(1) {}

unsigned seed = chrono::system_clock::now().time_since_epoch().count();

default_random_engine generator(seed);

bool isValidIdentifier(const string& id) {
    return id.size() == 3 &&
        isalpha(id[0]) &&
        isalpha(id[1]) &&
        isdigit(id[2]);
}

string getCurrentTime() {
    auto now = chrono::system_clock::now();
    time_t nowTime = chrono::system_clock::to_time_t(now);

    time_t utcPlus2 = nowTime + (3 * 3600);

    tm* utcPlus2Tm = gmtime(&utcPlus2);

    ostringstream oss;
    oss << put_time(utcPlus2Tm, "%Y-%m-%d %H:%M:%S");
    return oss.str();
}


// Global.hpp
#ifndef GLOBAL_HPP
#define GLOBAL_HPP

#include <random>
#include <chrono>
#include <string>
#include <iomanip>
#include <sstream>

using namespace std;

struct FileInfo {
    string identifier;
    int filesize;
    string timestamp;

    bool operator<(const FileInfo& other) const;
    bool operator>(const FileInfo& other) const;
    bool operator==(const FileInfo& other) const;
    bool operator!=(const FileInfo& other) const;
    bool operator<(const string& other) const;
    bool operator>(const string& other) const;
    bool operator==(const string& other) const;
    bool operator!=(const string& other) const;
};

struct AVLNode {
    FileInfo file;
    AVLNode* left;
    AVLNode* right;
    int height;

    AVLNode(const FileInfo& file);
};

bool isValidIdentifier(const string& id);

string getCurrentTime();

extern default_random_engine generator;

#endif


