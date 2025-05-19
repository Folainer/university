#include <map>
#include <string>

#ifndef GLOBAL_HPP
#define GLOBAL_HPP

using namespace std;

extern int SYMBOL_CATEGORIES[];

extern map<short, string> TOKEN_MAP;

extern map<int, string> PARAM_REG_MAP;

enum tokensType {
    NUMBER,
    KEYWORD,
    IDENTIFIER,
    SEPARATOR,
    ASSEMBLY_INSERTION,
    KEYWORD_OR_IDENDIFIER,
    END_OF_FILE
};

enum category {
    WHITESPACE,
    CONSTANT_START,
    IDENTIFIER_OR_KEYWORD_START,
    UNIQUE_SEPARATORS,
    AMBIGUES_SEPARATORS,
    PROHIBITED_CHARACTER
};

enum state {
    CNS,
    IDN,
    BCAI,
    COM,
    AI,
    ECOM,
    EAI,
    OUT
};



#endif

