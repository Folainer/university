#include "ViewStream.hpp"

ViewStream& ViewStream::operator<<(string data) {
        cout << data;
        return *this;
}

ViewStream& ViewStream::operator<<(const char data) {
        cout << data;
        return *this;
}

ViewStream& ViewStream::operator<<(int data) {
        cout << data;
        return *this;
}

// template <typename T>
// ViewStream& ViewStream::operator<<(T data) {
//     cout << data;
//     return *this;
// }

// template ViewStream& ViewStream::operator<<(ostream& data);
// template ViewStream& ViewStream::operator<<(istream& data);
// template ViewStream& ViewStream::operator<<(ofstream& data);
// template ViewStream& ViewStream::operator<<(ifstream& data);