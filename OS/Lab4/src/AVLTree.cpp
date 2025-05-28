#include "AVLTree.hpp"

int AVLTree::getHeight(AVLNode* node) {
    return node ? node->height : 0;
}

int AVLTree::getBalance(AVLNode* node) {
    return node ? getHeight(node->left) - getHeight(node->right) : 0;
}

void AVLTree::updateHeight(AVLNode* node) {
    node->height = max(getHeight(node->left), getHeight(node->right)) + 1;
}

AVLNode* AVLTree::rightRotate(AVLNode* A) {
    AVLNode* B = A->left;
    AVLNode* T2 = B->right;

    B->right = A;
    A->left = T2;

    updateHeight(A);
    updateHeight(B);

    return B;
}

AVLNode* AVLTree::leftRotate(AVLNode* A) {
    AVLNode* B = A->right;
    AVLNode* T2 = B->left;

    B->left = A;
    A->right = T2;

    updateHeight(A);
    updateHeight(B);

    return B;
}

AVLNode* AVLTree::insertNode(AVLNode* node, const FileInfo& file) {
    if (!node) {
        node = new AVLNode(file);
    }

    if (file < node->file) {
        node->left = insertNode(node->left, file);
    } else if (file > node->file) {
        node->right = insertNode(node->right, file);
    } else {
        // duplicated found
        return node;
    }

    updateHeight(node);

    int balance = getBalance(node);

    //Left left case
    if (balance > 1 && file < node->file) {
        return rightRotate(node);
    }

    //Right right case
    if (balance < -1 && file > node->file) {
        return leftRotate(node);
    }

    //Left right case
    if (balance > 1 && file > node->file) {
        node->left = leftRotate(node->left);
        return rightRotate(node);
    }
    
    //Right left case
    if (balance < -1 && file < node->file) {
        node->right = rightRotate(node->right);
        return leftRotate(node);
    }

    return node;
}

AVLNode* AVLTree::minValueNode(AVLNode* node) {
    AVLNode* currentNode = node;

    while (currentNode->left) {
        currentNode = currentNode->left;
    }

    return currentNode;
}

AVLNode* AVLTree::deleteNode(AVLNode* node, const string& id) {
    if (!node) {
        return node;
    }

    if (node->file > id) {
        node->left = deleteNode(node->left, id);
    } else if (node->file < id) {
        node->right = deleteNode(node->right, id);
    } else {
        if (!node->left || !node->right) {
            AVLNode* temp = node->left ? node->left : node->right;
            delete node;
            return temp;
        }

        AVLNode* temp = minValueNode(node->right);
        node->file = temp->file;
        node->right = deleteNode(node->right, temp->file.identifier);
    }

    updateHeight(node);
    int balance = getBalance(node);

    if (balance > 1 && getBalance(node->left) >= 0) {
        return rightRotate(node);
    }

    if (balance > 1 && getBalance(node->left) < 0) {
        node->left = leftRotate(node->left);
        return rightRotate(node);
    }

    if (balance < -1 && getBalance(node->right) <= 0) {
        return leftRotate(node);
    }

    if (balance < -1 && getBalance(node->right) > 0) {
        node->right = rightRotate(node->right);
        return leftRotate(node);
    }

    return node;
}

AVLNode* AVLTree::search(AVLNode* node, const string& id) {
    if (!node || node->file == id) {
        return node;
    }

    if (node->file > id) {
        return search(node->left, id);
    } else {
        return search(node->right, id);
    }
}

void AVLTree::printTreeRecursion(AVLNode* node, const string& prefix = "", bool isLeft = true, bool isRoot = true) {
    if (!node) {
        return;
    }

    cout << prefix;

    if (!isRoot) {
        cout << (isLeft ? "|-" : "*-");
    }

    cout << node->file.identifier << '\n';

    string newPrefix = prefix;

    if (!isRoot) {
        newPrefix += (isLeft ? "| " : "  ");
    }

    bool hasLeft = node->left != nullptr;
    bool hasRight = node->right != nullptr;
    
    if (hasLeft || hasRight) {
        if (node->left) {
            printTreeRecursion(node->left, newPrefix, true, false);
        }
        if (node->right) {
            printTreeRecursion(node->right, newPrefix, false, false);
        }
    }
}

void AVLTree::printFilesRecursion(AVLNode* node) {
    if (!node) {
        return;
    }

    printFilesRecursion(node->left);

    printFile(node->file);

    printFilesRecursion(node->right);
}
//---- public

AVLTree::AVLTree() : _root(nullptr) {}

void AVLTree::insert(const FileInfo& file) {
    if (isValidIdentifier(file.identifier)) {
        if (find(file.identifier)) {
            cout << "The same identifier used" << endl;
            return;
        }
        _root = insertNode(_root, file);
        cout << "The file was inserted into a tree" << endl;
    } else {
        cout << "Invalid format for identifier. Please use this format: \\w\\w\\d" << endl;
    }
}

void AVLTree::remove(const string& id) {
    if (isValidIdentifier(id)) {
        if (!find(id)) {
            cout << "There are no such identifier" << endl;
            return;
        }
        _root = deleteNode(_root, id);
        cout << "The file was removed from a tree" << endl;
    } else {
        cout << "Invalid format for identifier. Please use this format: \\w\\w\\d" << endl;
    }
}

FileInfo* AVLTree::find(const string& id) {
    AVLNode* result = search(_root, id);

    if (result) {
        return &result->file;
    } else {
        return nullptr;
    }
}

void AVLTree::printFile(FileInfo& file) {
    cout << left << setw(6) << file.identifier <<  file.timestamp << right << setw(8) << file.filesize << 'B' << endl;
}


void AVLTree::printTree() {
    if (!_root) {
        cout << "AVL tree is empty!" << endl;
        return;
    }

    cout << "AVL tree structure:\n";
    printTreeRecursion(_root);
    cout << '\n';
}

void AVLTree::printFiles() {
    if (!_root) {
        cout << "The tree is empty!" << endl;
        return;
    }
    cout << left << setw(6) << "ID" << left << setw(19) << "Data and time" << " Filesize" << endl;
    printFilesRecursion(_root);
}