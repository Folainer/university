#ifndef TREE_HPP
#define TREE_HPP

using namespace std;

#include <list>
#include <string>
#include "InformationTables.hpp"

class Tree {
    protected: 
    Tree* _parent;
    InformationTables& _informationTables;
    ViewStream& _vs;

    public:
    virtual ~Tree();
    Tree(InformationTables& informationTables);

    void setParent(Tree* parent);
    Tree *getParent() const;

    virtual bool isNode() const;

    virtual void add(Tree* child);
    virtual void remove(Tree* child);

    virtual void clearMemory();

    virtual void print(int indent = 0) const = 0;

    virtual string getName() const = 0;
};

class Node : public Tree {
    public: 
    Node(InformationTables& informationTables, string nodeName);
    bool isNode() const override;
    void add(Tree* child) override;
    void remove(Tree* child) override;
    void clearMemory() override;

    void print(int indent = 0) const override;

    virtual string getName() const override;

    list<Tree*> getChildren();

    protected:
    list<Tree*> _children;
    string _nodeName;
};

class Leaf : public Tree {
    private:
    Token _token;

    public:
    Leaf(InformationTables& InformationTables, Token token);

    virtual string getName() const override;

    Token getToken() const;

    void print(int indent = 0) const override;
};

#endif