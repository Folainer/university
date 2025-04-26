#ifndef CONTROLLER_HPP
#define CONTROLLER_HPP

#include <iostream>
#include <string>
#include <sstream>
#include <vector>
#include <iomanip>
#include <cstdlib>

#include "Model.hpp"

using namespace std;

class Controller {
    public:
    Controller();
    void run();

    private:
    void help();
    void memoryStatus();
    void processStatus();
    void loadProcess(int index);
    void unloadProcess(int index);

    Model _model;
};

#endif