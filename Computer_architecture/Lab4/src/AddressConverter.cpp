#include "AddressConverter.hpp"

VirtualAddress::VirtualAddress(string addressValue, string name) {
    if (addressValue.size() != 8) {
        errorManager.addError("Incorrect address", name);
    }

    int number;

    if (isHex(addressValue)) {
        number = stoi(addressValue, nullptr, 16);
    } else {
        errorManager.addError("Address is not in hex string", name);
    }

    displacement = number & 0x7FF; // 11 right bits
    pageIndex = (number & 0x1FF800) >> 11; // 10 middle bits 
    segmentIndex = (number & 0xFFE00000) >> 21; // 11 left bits
}

AddressConverter::AddressConverter(string filename, string name) : _filename(filename), _name(name) {}

string AddressConverter::convert(string addressValue) {
    VirtualAddress va(addressValue, _name);

    if (errorManager.getErrors(_name) != 0) {
        return "";
    }

    CsvReader csv(_filename, _name);
    Segment* segment = csv.getSegment(va.segmentIndex);

    if (!segment) {
        errorManager.addError("Segment fault", _name);
        return "";
    }

    CsvReader csvPage(segment->pageAddress, _name);
    Page* page = csvPage.getPage(va.pageIndex);

    if (!page) {
        errorManager.addError("Page fault", _name);
        delete segment; 
        return "";
    }

    if (page->index >= segment->pageCount) {
        errorManager.addError("Page index is bigger than its segment", _name);
        delete segment; 
        delete page;    
        return "";
    }

    if (!page->presence) {
        errorManager.addError("Page is not in RAM", _name);
        delete segment; 
        delete page;    
        return "";
    }

    stringstream ss;

    ss <<  setw(8) << setfill('0') << hex << uppercase << ((page->frameNumber << 11) + va.displacement);
    delete segment; 
    delete page;    
    
    return ss.str();
}