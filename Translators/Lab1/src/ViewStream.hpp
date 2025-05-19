#include <sstream>
#include <iostream>
#include <string>

#ifndef VIEWSTEAM_HPP
#define VIEWSTEAM_HPP

using namespace std;

class ViewStream {
    public:
    // std::ostringstream buffer;

    ViewStream& operator<<(string data);
    ViewStream& operator<<(const char data); 
    ViewStream& operator<<(int data);

    // template <typename T>
    // ViewStream& operator<<(T data);
};

#endif