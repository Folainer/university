#ifndef CODEGENERATOR_HPP
#define CODEGENERATOR_HPP

#include <string>
#include <fstream>
#include <iomanip>
#include <map>
#include <sstream>
#include <algorithm> 
#include <cctype>    

#include "../DataManagement/Tree.hpp"
#include "../DataManagement/Global.hpp"
#include "Utilities.hpp"
#include "ErrorManager.hpp"

class CodeGenerator {
    public:
    CodeGenerator(InformationTables& informationTables, ErrorManager& errorManager, string filename);
    ~CodeGenerator();
    void run(Tree* tree);

    private:
    fstream _file;
    Tree* _tree;
    map<int, bool> _labels;
    InformationTables& _it;
    ErrorManager& _em;

    void block(Tree* tree);
    void statement(Tree* tree);

    void printAssemblyInsertion(Tree* tree);
};

#endif