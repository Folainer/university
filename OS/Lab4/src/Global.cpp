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