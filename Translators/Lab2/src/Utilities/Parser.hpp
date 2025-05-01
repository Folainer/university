#ifndef PARSER_HPP
#define PARSER_HPP

#include "../DataManagement/InformationTables.hpp"
#include "../DataManagement/Tree.hpp"
#include "../Utilities/ErrorManager.hpp"
#include "../Utilities/Utilities.hpp"
#include "../DataManagement/Global.hpp"

class Parser {
    public:
    enum TokenValue {
        SEMICOLON = 0,
        COMMA = 1,
        LEFT_PARENTHESIS = 2,
        RIGHT_PARENTHESIS = 3,
        COLON = 4,
        COMMENT_START = 301,
        COMMENT_END = 302,
        ASSEMBLY_INSERTION_START = 303,
        ASSEMBLY_INSERTION_END = 304,
        PROCEDURE = 601,
        BEGIN = 602,
        END = 603,
        LABEL = 604,
        GOTO = 605,
        RETURN = 606,
    };

    Parser(InformationTables& informationTables, ErrorManager& errorManager, string filepath);
    void parse();
    Tree* getRoot() const;

    private:
    InformationTables &_informationTables;
    ViewStream &_vs;
    ErrorManager &_em;
    string _filepath;
    Token _currentToken;
    Tree* _root;

    void eat(short type, string message);
    void eatType(short type, string message);

    Tree* program();
    Tree* procedureIndetifier();
    Tree* block();
    Tree* statementsList();
    Tree* statement();
    Tree* parametersList();
    Tree* labelDeclarations();
};

#endif