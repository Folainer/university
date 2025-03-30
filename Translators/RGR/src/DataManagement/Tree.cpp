#include "Tree.hpp"

Tree::~Tree() {}

Tree::Tree(InformationTables& informationTables) : 
    _parent(nullptr), 
    _informationTables(informationTables),
    _vs(_informationTables.getViewStream()) {}

void Tree::setParent(Tree* parent) {
    _parent = parent;
}

Tree* Tree::getParent() const {
    return _parent;
}

bool Tree::isNode() const {
    return false;
}

void Tree::add(Tree*) {}

void Tree::remove(Tree*) {}

void Tree::clearMemory() {}

// Node class implementation

Node::Node(InformationTables& informationTables, string nodeName) : Tree(informationTables), _nodeName(move(nodeName)) {}

bool Node::isNode() const {
    return true;
}  

void Node::add(Tree* child) {
    if (!child) {
        return;
    }
    _children.push_back(child);
    child->setParent(this);
}

void Node::remove(Tree* child) {
    if (!child) {
        return;
    }

    _children.remove(child);
    child->setParent(nullptr);
}

void Node::clearMemory() {
    for (auto child : _children) {
        child->clearMemory();
        delete child;
    }
    _children.clear();
}

void Node::print(int indent) const {
    for (int i = 0; i < indent; ++i) {
        _vs << " ";
    }
    _vs << _nodeName << '\n';
    for (const auto& child : _children) {
        child->print(indent + 2);
    }
}

// Leaf class implementation

Leaf::Leaf(InformationTables& informationTables, Token token) : Tree(informationTables), _token(token) {}

void Leaf::print(int indent) const {
    for (int i = 0; i < indent; ++i) {
        _vs << " ";
    }
    _vs << _informationTables.getTokenValue(_token.code) << '\n';
}