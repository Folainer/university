#include "CsvReader.hpp"

bool Segment::operator==(const Segment& other) const {
    return index == other.index && 
               pageAddress == other.pageAddress && 
               pageCount == other.pageCount;
}

bool Page::operator==(const Page& other) const {
    return index == other.index && 
                presence == other.presence &&
                frameNumber == other.frameNumber;
}

CsvReader::CsvReader(string filename, string name) : _name(name) {
    _file.open(filename);
}
    
CsvReader::~CsvReader() {
    if (_file.is_open()) { 
        _file.close();
    }
}

Segment* CsvReader::getSegment(int segmentIndex) {
    if (!_file.is_open()) {
        errorManager.addError(string("File is not open"), _name);
        return nullptr;
    }

    _file.clear(); 
    _file.seekg(0);

    Segment* s;
    while (!_file.eof()) {
        vector<string> parsedLine = parseLine();

        if (_file.eof() && parsedLine.empty()) {
            break;
        }

        if (parsedLine.size() != 3) {
            errorManager.addError(string("The csv file is corrupted"), _name);
            break;
        } 

        if (!isNumber(parsedLine[0]) || !isNumber(parsedLine[2])) {
            errorManager.addError(string("Used unexpected value. Expected number"), _name);
            break;
        }

        s = new Segment({stoi(parsedLine[0]), parsedLine[1], stoi(parsedLine[2])});

        if (s->index == segmentIndex) {
            return s;
        }

        delete s;
        s = nullptr;
    }

    return nullptr;
}

Page* CsvReader::getPage(int pageIndex) {
    if (!_file.is_open()) {
        errorManager.addError(string("File is not open"), _name);
        return nullptr;
    }

    _file.clear(); 
    _file.seekg(0);

    Page* page;

    while (!_file.eof()) {
        vector<string> parsedLine = parseLine();

        if (_file.eof() && parsedLine.empty()) {
            break;
        }

        if (parsedLine.size() != 3) {
            errorManager.addError(string("The csv file is corrupted"), _name);
            break;
        }

        bool presence;

        if (parsedLine[1] == "true") {
            presence = true;
        } else if (parsedLine[1] == "false") {
            presence = false;
        } else {
            errorManager.addError(string("Used unexpected value. Expected number"), _name);
            break;
        }

        if (!isNumber(parsedLine[0]) || !isHex(parsedLine[2])) {
            errorManager.addError(string("Used unexpected value. Expected number"), _name);
            break;
        }

        page = new Page({stoi(parsedLine[0]), presence, stoi(parsedLine[2], nullptr, 16)});

        if (page->index == pageIndex) {
            return page;
        }

        delete page;
        page = nullptr;
    }

    return nullptr;
}

vector<string> CsvReader::parseLine() {
    string line;
    getline(_file, line);
    stringstream ss(line);
    char symbol;

    stringstream input;

    vector<string> res;
    
    for (size_t i = 0; i < ss.str().length(); i++) {
        ss >> symbol;

        if (symbol == ',') {
            res.push_back(input.str());
            input.str("");
            continue;
        }

        input << symbol;

    }

    res.push_back(input.str());

    return res;
}