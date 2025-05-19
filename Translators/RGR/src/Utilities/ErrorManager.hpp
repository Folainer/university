#include <string>
#include <vector>
#include "../ViewStream.hpp"

#ifndef ERRORMANAGER_HPP
#define ERRORMANAGER_HPP

using namespace std;

class ErrorManager
{
    public:
    ErrorManager(ViewStream& vs);
    void addProgramError(string errorMessage);
    void addCompilingError(string errorMessage);

    void output();

    private:
    ViewStream _vs;
    vector<string> _programErrorMessages;
    vector<string> _compilingErrorMessages;
};

#endif