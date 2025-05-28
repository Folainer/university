#ifndef CONTROLLER_HPP
#define CONTROLLER_HPP

#include <iostream>
#include <string>
#include <sstream>
#include <vector>
#include <iomanip>
#include <cstdlib>

#include "AVLTree.hpp"

using namespace std;

class Controller {
    public:
    Controller();
    void run();

    private:
    void help();
    void file(const string& id);

    AVLTree _tree;
};

#endif