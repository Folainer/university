#include "Global.hpp"

unsigned seed = chrono::system_clock::now().time_since_epoch().count();

default_random_engine generator(seed);