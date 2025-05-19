#include "ErrorManager.hpp"

ErrorManager::ErrorManager(ViewStream& vs) : _vs(vs) {}

void ErrorManager::addProgramError(string errorMessage) {
    this->_programErrorMessages.push_back(errorMessage);
}

void ErrorManager::addCompilingError(string errorMessage) {
    this->_compilingErrorMessages.push_back(errorMessage);
}

void ErrorManager::output() {
    if (_compilingErrorMessages.size() > 0 || _programErrorMessages.size() > 0) {
        _vs << "There are " << to_string(_compilingErrorMessages.size() + _programErrorMessages.size()) << " errors in the program:\n";
        for (auto& err : _programErrorMessages) {
            _vs << err << '\n';
        }
        for (auto& err : _compilingErrorMessages) {
            _vs << err << '\n';
        }
    } else {
        _vs << "There are no errors in a program.\n";
    }
}