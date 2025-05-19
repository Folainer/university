#include "DataManagement/Global.hpp"
#include "Controller.hpp"
#include "ViewStream.hpp"
#include <string>

int main() {
    ViewStream vs;
    Controller("J:/Repositories/University/Translators/Lab2/bin/semantic2t.s", vs);
    return 0;
}