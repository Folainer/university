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