#ifndef CSVREADER_HPP
#define CSVREADER_HPP

#include <string>
#include <sstream>
#include <fstream>
#include <vector>

#include "Global.hpp"

using namespace std;

class Segment {
    public:
    int index;
    string pageAddress;
    int pageCount;

    bool operator==(const Segment& other) const;
    // auto operator<=>(const Segment&) const = default; 
};


class Page {
    public:
    int index;
    bool presence;
    int frameNumber;

    bool operator==(const Page& other) const;
};

class CsvReader {
    public:
    CsvReader(string filename, string name);
    ~CsvReader();

    Segment* getSegment(int segmentIndex);
    Page* getPage(int pageIndex);

    private:
    fstream _file;
    string _name;

    vector<string> parseLine();
    // void readLin
};

#endif