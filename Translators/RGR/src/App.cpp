#include "DataManagement/Global.hpp"
#include "Controller.hpp"
#include "ViewStream.hpp"
#include <string>

int main() {
    ViewStream vs;
    Controller("J:/Repositories/University/Translators/RGR/bin/syntax3f.sig", vs);
    return 0;
}