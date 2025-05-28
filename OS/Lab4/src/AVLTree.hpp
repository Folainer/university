#ifndef AVLTREE_HPP
#define AVLTREE_HPP

#include <vector>
#include <random>
#include <iostream>

#include "Global.hpp"

using namespace std;


class AVLTree {
    public:
    AVLTree();

    void insert(const FileInfo& file);
    void remove(const string& file);
    FileInfo* find(const string& id);
    void printFile(FileInfo& file);
    void printTree();
    void printFiles();
    
    private:
    AVLNode* _root;
    
    int getHeight(AVLNode* node);
    int getBalance(AVLNode* node);
    void updateHeight(AVLNode* node);
    
    AVLNode* rightRotate(AVLNode* A);
    AVLNode* leftRotate(AVLNode* A);
    
    AVLNode* insertNode(AVLNode* node, const FileInfo& file);
    AVLNode* deleteNode(AVLNode* node, const string& id);
    
    AVLNode* search(AVLNode* node, const string& id);
    
    AVLNode* minValueNode(AVLNode * node);
    
    // void printTreeRecursion(AVLNode* node, int depth);
    void printTreeRecursion(AVLNode* node, const string& prefix, bool isLeft, bool isRoot);
    void printFilesRecursion(AVLNode* node);
};

#endif