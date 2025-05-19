#ifndef ADDRESSCONVERTER_HPP
#define ADDRESSCONVERTER_HPP

#include <string>
#include <sstream>
#include <iomanip>

#include "ErrorManager.hpp"
#include "Global.hpp"
#include "CsvReader.hpp"

using namespace std;

class VirtualAddress {
    public:
    VirtualAddress(string addressValue, string name);

    int segmentIndex;
    int pageIndex;
    int displacement;
};

class AddressConverter {
    public:
    AddressConverter(string filename, string name);
    string convert(string addressValue);

    private:
    string _filename;
    string _name;
};

#endif