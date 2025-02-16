#include <fstream>
#include <iostream>
#include <string>
#include <sstream>
#include "DataManagement/Global.hpp"
#include "ViewStream.hpp"
#include "DataManagement/InformationTables.hpp"
#include "Utilities/ErrorManager.hpp"

#ifndef CONTROLLER_HPP
#define CONTROLLER_HPP

using namespace std;

class Controller {
    public: 
    Controller(string filepath, ViewStream vs);
    void run(string);

    private:
    ViewStream _vs;
    InformationTables _it;
    ErrorManager _em;
};

#endif