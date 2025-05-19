#include "CodeGenerator.hpp"

CodeGenerator::CodeGenerator(InformationTables& informationTables, ErrorManager& errorManager, string filename) : _file(fstream(filename, std::ios::out)), _it(informationTables), _em(errorManager) {}

CodeGenerator::~CodeGenerator() {
    _file.close();
}

void CodeGenerator::run(Tree* tree) {
    try {
        _tree = tree;
        if (tree->isNode()) {
            auto programChildren = dynamic_cast<Node*>(tree)->getChildren();
            for (Tree* child : programChildren) {
                // cout << child->getName() << endl;
                if (child->getName() == "<PROCEDURE_IDENTIFIER>") {
                    auto ch = dynamic_cast<Node*>(child)->getChildren();
                    _file << ch.front()->getName() << ":\n";
                    _file << setw(4) << ' ' << left << setw(10) << "push" << "rbp" << endl;
                    _file << setw(4) << ' ' << left << setw(10) << "mov" << "rbp, rsp" << endl;
                } else if (child->getName() == "<PARAMETERS_LIST>") {
                    auto ch = dynamic_cast<Node*>(child)->getChildren();
    
                    int i = 0;
                    for (Tree* param : ch) {
                        // auto paramLeaf = dynamic_cast<Leaf*>(param);
    
                        // Token token = paramLeaf->getToken();
                        _file << setw(4) << ' ' << left << setw(10) << "mov" << "DWORD PTR [rbp-" << 20 + 4*i << "], " << PARAM_REG_MAP[i] << endl;
                        i++;
                    }
                } else if (child->getName() == "<BLOCK>") {
                    block(child);
                }
            }
            _file << setw(4) << ' ' << left << setw(10) << "pop" << "rbp" << endl;
            _file << setw(4) << ' ' << left << setw(10) << "ret" << endl;
        }

        for (auto label : _labels) {
            if (!label.second) {
                stringstream ss;
                ss << "Semantic error: Unused declared label: " <<  label.first;
                throw runtime_error(ss.str());
            }
        }

    }
    catch (const runtime_error& e) {
        _em.addProgramError(e.what());
        // cout << "[]" << endl;
    }
}

void CodeGenerator::block(Tree* tree) {
    if (tree->isNode()) {
        auto blockChildren = dynamic_cast<Node*>(tree)->getChildren();
        for (Tree* child : blockChildren) {
            if (child->getName() == "<LABEL_DECLARATIONS>") {
                auto labels = dynamic_cast<Node*>(child)->getChildren();
                
                for (auto label : labels) {
                    auto labelLeaf = dynamic_cast<Leaf*>(label);
                    string labelStr =  _it.getTokenValue(labelLeaf->getToken().code);
                    _labels[stoi(labelStr)] = false;
                }
            } else if (child->getName() == "<STATEMENTS_LIST>") {
                auto statements = dynamic_cast<Node*>(child)->getChildren();
                
                for (auto state : statements) {
                    if (state->getName() == "<STATEMENT>") {
                        statement(state);
                    }
                }
            }
        }
    }
}


void CodeGenerator::statement(Tree* tree) {
    auto statementChildren = dynamic_cast<Node*>(tree)->getChildren();

    if (statementChildren.front()->getName() == "RETURN") {
        _file << setw(4) << ' ' << left << setw(10) << "pop" << "rbp" << endl;
        _file << setw(4) << ' ' << left << setw(10) << "ret" << endl;
    } else if (statementChildren.front()->getName() == "<ASSEMBLY_INSERTION>") {
        auto assemblyInsertionNode = dynamic_cast<Node*>(statementChildren.front());

        printAssemblyInsertion(assemblyInsertionNode->getChildren().front());
    } else if (statementChildren.front()->getName() == "<STATEMENT_WITH_LABEL>") {
        auto statementList = dynamic_cast<Node*>(statementChildren.front())->getChildren();

        int i = 0;
        for (auto labelStatement : statementList) {
            if (i == 0) {
                Leaf* labelSatementLeaf = dynamic_cast<Leaf*>(labelStatement);

                int labelValue = stoi(_it.getTokenValue(labelSatementLeaf->getToken().code));

                if (_labels.count(labelValue) != 0) {
                    _labels[labelValue] = true;
                    _file << setw(2) << ' ' << labelValue << ':' << endl;
                } else {
                    stringstream ss;
                    ss << "Semantic error: Used undeclared label: " <<  labelValue;
                    throw runtime_error(ss.str());
                }
            } else if (i == 1) {
                statement(labelStatement);
            }
            i++;
        }
    } else if (statementChildren.front()->getName() == "GOTO") {
        if (statementChildren.size() >= 2) {
            auto it = statementChildren.begin();
            ++it;
            auto gotoNumberLeaf = dynamic_cast<Leaf*>(*it);
            _file << setw(4) << ' ' << left << setw(10) << "jump" << _it.getTokenValue(gotoNumberLeaf->getToken().code) << endl;
        }
    }
}


void CodeGenerator::printAssemblyInsertion(Tree* tree) {
    Leaf* leaf = dynamic_cast<Leaf*>(tree);
    istringstream ss(_it.getTokenValue(leaf->getToken().code));
    string line;

    while (getline(ss, line)) {
        transform(line.begin(), line.end(), line.begin(),
                   [](unsigned char c) { return std::tolower(c); });
        _file << setw(4) << ' ' << left << setw(10) << Utilities::trim(line) << endl;
    }
}