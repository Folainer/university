#define CATCH_CONFIG_MAIN
#include "catch.hpp"

#include <sstream>
#include <vector>

#include "../src/Global.hpp" 
#include "../src/Lexer.hpp"
#include "../src/Parser.hpp"
#include "../src/CsvReader.hpp"
#include "../src/AddressConverter.hpp"

using namespace std;

// TEST_CASE("Lexer nextToken true test") {
//     Lexer lexer(stringstream("1A\n12\t1A  12"));

//     SECTION("First token") {
//         Token token = lexer.nextToken();
//         REQUIRE(token.value == string("1A"));
//         REQUIRE(token.row == 1);
//         REQUIRE(token.column == 1);
//     }
//     SECTION("Second token") {
//         Token token = lexer.nextToken();
//         REQUIRE(token.value == "12");
//         REQUIRE(token.row == 2);
//         REQUIRE(token.column == 1);
//     }
//     SECTION("Third token") {
//         Token token = lexer.nextToken();
//         REQUIRE(token.value == "1A");
//         REQUIRE(token.row == 2);
//         REQUIRE(token.column == 7);
//     }
//     SECTION("Fourth token") {
//         Token token = lexer.nextToken();
//         REQUIRE(token.value == "12");
//         REQUIRE(token.row == 2);
//         REQUIRE(token.column == 11);
//     }
// }

TEST_CASE("Symbol category test") {
    
    REQUIRE(symbol_categories['\t'] == WHITESPACE);
    REQUIRE(symbol_categories['\n'] == WHITESPACE);
    REQUIRE(symbol_categories[11] == WHITESPACE);
    REQUIRE(symbol_categories[12] == WHITESPACE);
    REQUIRE(symbol_categories[13] == WHITESPACE);
    REQUIRE(symbol_categories[' '] == WHITESPACE);
    
    REQUIRE(symbol_categories['0'] == HEX_DIGIT);
    REQUIRE(symbol_categories['1'] == HEX_DIGIT);
    REQUIRE(symbol_categories['2'] == HEX_DIGIT);
    REQUIRE(symbol_categories['3'] == HEX_DIGIT);
    REQUIRE(symbol_categories['4'] == HEX_DIGIT);
    REQUIRE(symbol_categories['5'] == HEX_DIGIT);
    REQUIRE(symbol_categories['6'] == HEX_DIGIT);
    REQUIRE(symbol_categories['7'] == HEX_DIGIT);
    REQUIRE(symbol_categories['8'] == HEX_DIGIT);
    REQUIRE(symbol_categories['9'] == HEX_DIGIT);
    REQUIRE(symbol_categories['A'] == HEX_DIGIT);
    REQUIRE(symbol_categories['B'] == HEX_DIGIT);
    REQUIRE(symbol_categories['C'] == HEX_DIGIT);
    REQUIRE(symbol_categories['D'] == HEX_DIGIT);
    REQUIRE(symbol_categories['E'] == HEX_DIGIT);
    REQUIRE(symbol_categories['F'] == HEX_DIGIT);
    REQUIRE(symbol_categories['a'] == HEX_DIGIT);
    REQUIRE(symbol_categories['b'] == HEX_DIGIT);
    REQUIRE(symbol_categories['c'] == HEX_DIGIT);
    REQUIRE(symbol_categories['d'] == HEX_DIGIT);
    REQUIRE(symbol_categories['e'] == HEX_DIGIT);
    REQUIRE(symbol_categories['f'] == HEX_DIGIT);
}

TEST_CASE("Error manager test") {
    
    string lexerName = "test1";

    REQUIRE(errorManager.getLexicalErrorCount(lexerName) == 0);
    errorManager.addLexicalError(1, 2, "Something wrong", lexerName);
    REQUIRE(errorManager.getLexicalErrorCount(lexerName) == 1);

    REQUIRE(errorManager.getSyntaxErrorCount(lexerName) == 0);
    errorManager.addSyntaxError(1, 2, "Something wrong again", lexerName);
    REQUIRE(errorManager.getSyntaxErrorCount(lexerName) == 1);
}

TEST_CASE("Register map test") {
    REQUIRE(mapRegister(0b001) == "R1");
    REQUIRE(mapRegister(0b101) == "R5");
    REQUIRE(mapRegister(0b1001) == "");
}

TEST_CASE("Machine code test") {
    REQUIRE(mapMachineCode("01") == ADDREGREG);
    REQUIRE(mapMachineCode("10") == PROHIBITED);
}


TEST_CASE("Address map test") {
    REQUIRE(mapAddress("00AD0043") == "[0x00AD0043]");
    REQUIRE(mapAddress("00AD00") == "");
}

TEST_CASE("Value map test") {
    REQUIRE(mapValue("3344") == "13124");
    REQUIRE(mapValue("334") == "");
}

TEST_CASE("Shift map test") {
    REQUIRE(mapShift("FA") == "-6");
    REQUIRE(mapShift("0A") == "10");
    REQUIRE(mapShift("FAA") == "");
}


TEST_CASE("Lexer token sequence true test") {
    string lexerName = "test2";
    Lexer lexer(lexerName, stringstream("1A\n12\t1A  12"));

    // First token
    Token token1 = lexer.nextToken();
    REQUIRE(token1.value == "1A");
    REQUIRE(token1.row == 1);
    REQUIRE(token1.column == 1);
    
    // Second token
    Token token2 = lexer.nextToken();
    REQUIRE(token2.value == "12");
    REQUIRE(token2.row == 2);
    REQUIRE(token2.column == 1);
    
    // Third token
    Token token3 = lexer.nextToken();
    REQUIRE(token3.value == "1A");
    REQUIRE(token3.row == 2);
    REQUIRE(token3.column == 7);
    
    // Fourth token
    Token token4 = lexer.nextToken();
    REQUIRE(token4.value == "12");
    REQUIRE(token4.row == 2);
    REQUIRE(token4.column == 11);
}

TEST_CASE("Lexer token file test") {
    string lexerName = "file1";
    Lexer lexer(lexerName, fstream("input1.txt"));
    REQUIRE(lexer.nextToken().value == "1A");
}

TEST_CASE("Lexer token sequence false test") {
    string lexerName = "test3";
    Lexer lexer(lexerName, stringstream("1A\n1G\t1A  12"));

    // First token
    Token token1 = lexer.nextToken();
    REQUIRE(token1.value == "1A");
    REQUIRE(token1.row == 1);
    REQUIRE(token1.column == 1);

    // Second token
    Token token2 = lexer.nextToken();
    REQUIRE(token2.value == "");
    REQUIRE(token2.row == 2);
    REQUIRE(token2.column == 1);
}

TEST_CASE("Paser prohibited command") {
    string lexerName = "test4";
    
    stringstream input("13\t77");
    stringstream output("");

    Parser parser(lexerName, move(output), move(input));

    parser.parse(ASM);

    REQUIRE(errorManager.getSyntaxErrorCount(lexerName) == 1);
}

TEST_CASE("Parser phohibited register") {
    string lexerName = "test5";

    stringstream input("1A\nF1");
    stringstream output("");

    Parser parser(lexerName, move(output), move(input));

    parser.parse(ASM);

    REQUIRE(errorManager.getSyntaxErrorCount(lexerName) == 1);
}

TEST_CASE("Parser MovRegReg true test1") {
    string lexerName = "test6";

    stringstream input("1A\t77");
    stringstream output("");

    Parser parser(lexerName, move(output), move(input));

    parser.parse(ASM);

    REQUIRE(parser.getssout() == "MOV R7, R7\n");
}

// TEST_CASE("Parser MovRegAddr true test1") {
//     string lexerName = "test7";

//     stringstream input("1B  02 00010432");
//     stringstream output("");

//     Parser parser(lexerName, move(output), move(input));

//     parser.parse(ASM);

//     REQUIRE(parser.getssout() == "MOV R2, [0x00010432]\n");
// }

TEST_CASE("Parser MovRegAddr false test1") {
    string lexerName = "test8";

    stringstream input("1B  22 00010432");
    stringstream output("");

    Parser parser(lexerName, move(output), move(input));

    parser.parse(ASM);

    REQUIRE(errorManager.getSyntaxErrorCount(lexerName) == 1);
}

TEST_CASE("Parser AddRegReg true test1") {
    string lexerName = "test9";

    stringstream input("01 72");
    stringstream output("");

    Parser parser(lexerName, move(output), move(input));

    parser.parse(ASM);

    REQUIRE(parser.getssout() == "ADD R7, R2\n");
}

TEST_CASE("Parser AddRegAddr true test1") {
    string lexerName = "test10";

    stringstream input("02 01 00400072");
    stringstream output("");

    Parser parser(lexerName, move(output), move(input));

    parser.parse(ASM);

    REQUIRE(parser.getssout() == "ADD R1, [0x0025D072]\n");
}

TEST_CASE("Parser AddRegAddr false test1") {
    string lexerName = "test11";

    stringstream input("02 81 00001234");
    stringstream output("");

    Parser parser(lexerName, move(output), move(input));

    parser.parse(ASM);

    REQUIRE(errorManager.getSyntaxErrorCount(lexerName) == 1);
}

TEST_CASE("Parser JgAddr true test1") {
    string lexerName = "test12";

    stringstream input("95 00400042");
    stringstream output("");

    Parser parser(lexerName, move(output), move(input));

    parser.parse(ASM);

    REQUIRE(parser.getssout() == "JG [0x0025D042]\n");
}

// TEST_CASE("Parser JgAddr false test1") {
//     string lexerName = "test13";

//     stringstream input("95 ff00aab");
//     stringstream output("");

//     Parser parser(lexerName, move(output), move(input));

//     parser.parse(ASM);

//     REQUIRE(errorManager.getSyntaxErrorCount(lexerName) == 1);
// }

TEST_CASE("Parser JgShift true test1") {
    string lexerName = "test14";

    stringstream input("94 BA");
    stringstream output("");

    Parser parser(lexerName, move(output), move(input));

    parser.parse(ASM);

    REQUIRE(parser.getssout() == "JG -70\n");
}

TEST_CASE("Parser Cmp true test1") {
    string lexerName = "test16";

    stringstream input("80 12");
    stringstream output("");

    Parser parser(lexerName, move(output), move(input));

    parser.parse(ASM);

    REQUIRE(parser.getssout() == "CMP R1, R2\n");
}

TEST_CASE("Parser Cmp false test1") {
    string lexerName = "test17";

    stringstream input("80 82");
    stringstream output("");

    Parser parser(lexerName, move(output), move(input));

    parser.parse(ASM);

    REQUIRE(errorManager.getSyntaxErrorCount(lexerName) == 1);
}

TEST_CASE("Parser MovRegLit16 true test1") {
    string lexerName = "test18";

    stringstream input("1c 86 0011");
    stringstream output("");

    Parser parser(lexerName, move(output), move(input));

    parser.parse(ASM);

    REQUIRE(parser.getssout() == "MOV R6, 17\n");
}

TEST_CASE("Parser MovRegLit16 false test1") {
    string lexerName = "test19";

    stringstream input("1c 96 0011");
    stringstream output("");

    Parser parser(lexerName, move(output), move(input));

    parser.parse(ASM);

    REQUIRE(errorManager.getSyntaxErrorCount(lexerName) == 1);
}

TEST_CASE("CsvReader true test") {
    Segment s{0, "tests/segment0_test_temp1.csv", 10};

    string filename = "address_test_temp1.csv";
    
    createFile(filename, "0,tests/segment0_test_temp1.csv,10");

    CsvReader csv(filename, "test20");

    Segment *rs = csv.getSegment(0);

    // REQUIRE(s == *rs);
    // REQUIRE((s.index == rs->index && s.pageAddress == rs->pageAddress && s.pageNumber == rs->pageNumber));
    REQUIRE(s.index == rs->index);
    REQUIRE(s.pageAddress == rs->pageAddress);
    REQUIRE(s.pageCount == rs->pageCount);

    removeFile(filename);

    // csv.
}

TEST_CASE("Find error test") {
    string name = "test21";

    errorManager.addError(string("Something wrong"), name);
    errorManager.addError(string("Something wrong1"), name);

    REQUIRE(errorManager.findError("Something wrong", name));
    REQUIRE(!errorManager.findError("Something wrong2", name));
}

TEST_CASE("Address converter test1") {
    VirtualAddress va(string("320343"), string("test22"));

    REQUIRE(errorManager.findError("Incorrect address", "test22"));
}

TEST_CASE("Address converter test2") {
    VirtualAddress va(string("32034n3f"), string("test23"));

    REQUIRE(errorManager.findError("Address is not in hex string", "test23"));
}

TEST_CASE("Address converter test3") {
    VirtualAddress va(string("1C070E0"), string("test24"));

    REQUIRE(va.displacement == 224);
    REQUIRE(va.pageIndex == 14);
    REQUIRE(va.segmentIndex == 14);
}

TEST_CASE("Addres converter test4 (segment fault)") {
    string filename = "tests/address_test.csv";
    string name = "test25";
    // createFile(filename, "0,tests/segment0_test_temp2.csv,10\n1,tests/segment1_test_temp2.csv,10");

    AddressConverter ac(filename, name);
    ac.convert("0000030E"); // segment index = 0
    
    REQUIRE(!errorManager.findError("Segment fault", name));
    
    ac.convert("1120030E"); 
    
    REQUIRE(errorManager.findError("Segment fault", name));
    
    // removeFile(filename);
}

TEST_CASE("Get page test") {
    string name = "test26";
    string aFilename = "tests/address_test.csv";

    CsvReader csv(aFilename, name);

    Segment* segment = csv.getSegment(0);

    CsvReader pageCsv(segment->pageAddress, name);
    Page* page = pageCsv.getPage(2);

    REQUIRE(!page->presence);
    REQUIRE(page->frameNumber == 0x0);
}

TEST_CASE("Address converter test5 (page fault)") {
    string filename = "tests/address_test.csv";
    string name = "test27";
    
    AddressConverter ac(filename, name);
    
    REQUIRE(!errorManager.findError("Page fault", name));
    ac.convert("00003818");
    REQUIRE(errorManager.findError("Page fault", name));
}

// TEST_CASE("Address converter test5 (page is not RAM)") {
//     string filename = "tests/address_test.csv";
//     string name = "test28";

//     AddressConverter ac(filename, name);

//     REQUIRE(!errorManager.findError("Page is not in RAM", name));
//     ac.convert("00003818");
//     REQUIRE(errorManager.findError("Page is not in RAM", name));
// }


TEST_CASE("Address converter test5 (page index is big)") {
    string filename = "tests/address_test.csv";
    string name = "test29";

    AddressConverter ac(filename, name);

    REQUIRE(!errorManager.findError("Page index is bigger than its segment", name));
    ac.convert("00005818");
    REQUIRE(errorManager.findError("Page index is bigger than its segment", name));
}