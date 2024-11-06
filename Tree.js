import Node from "./Node.js";

export default class Tree {
    #root = null;

    constructor (array) {
        this.buildTree(array);
    }

    get root() {
        return this.#root;
    }

    sortAndRemoveDuplicates(array) {
            const set = new Set(array);
            return Array.from(set).sort((a, b) => a - b);
    }

    buildTree(array) {
        if (!array.length) return null;

        let currentNode = new Node();
        if (this.#root === null) {
            array = this.sortAndRemoveDuplicates(array);
            this.#root = new Node();
            currentNode = this.#root;
        }
        const midPoint = Math.floor((array.length - 1) / 2);
        currentNode.value = array[midPoint];
        currentNode.leftNode = new Node();
        currentNode.leftNode = this.buildTree(array.slice(0, midPoint));
        currentNode.rightNode = new Node();
        currentNode.rightNode = this.buildTree(array.slice(midPoint + 1));
        return currentNode;
    }

    prettyPrint(node = this.#root, prefix = "", isLeft = true) {
        if (node === null) {
            return;
        }
        if (node.rightNode !== null) {
            this.prettyPrint(node.rightNode, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
        if (node.leftNode !== null) {
            this.prettyPrint(node.leftNode, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
    }

    insert(value) {
        let currentNode = this.#root;
        let prevNode = null;
        while (currentNode) {
            prevNode = currentNode;
            if (value < currentNode.value) {
                currentNode = currentNode.leftNode;
            } else if (value > currentNode.value) {
                currentNode = currentNode.rightNode;
            } else return;
        }
        if (prevNode) {
            const newNode = new Node(value);
            value < prevNode.value ? prevNode.leftNode = newNode : prevNode.rightNode = newNode;
        }
    }

    deleteItem(value) {
        let currentNode = this.#root;
        let targetNode = null;
        let parentNode = null;
        while (currentNode) {
            if (value === currentNode.value) {
                targetNode = currentNode;
                break;
            }
            parentNode = currentNode;
            value < currentNode.value ? currentNode = currentNode.leftNode : currentNode = currentNode.rightNode;
        }
        if (targetNode) {
            if (!targetNode.leftNode && !targetNode.rightNode) {
                if (targetNode === this.#root) {
                    this.#root = new Node();
                } else {
                    targetNode.value > parentNode.value ? parentNode.rightNode = null : parentNode.leftNode = null;
                }
            } else if (!targetNode.leftNode) {
                if (targetNode === this.#root) {
                    this.#root = targetNode.rightNode;
                } else {
                    targetNode.value > parentNode.value ? parentNode.rightNode = targetNode.rightNode : parentNode.leftNode = targetNode.rightNode;
                }
            } else if (!targetNode.rightNode) {
                if (targetNode === this.#root) {
                    this.#root = targetNode.leftNode;
                } else {
                    targetNode.value > parentNode.value ? parentNode.rightNode = targetNode.leftNode : parentNode.leftNode = targetNode.leftNode;
                }
            } else {
                // parentNode is not used here, so no need to check for #root
                // Search for inorder successor
                let successorValue = null;
                currentNode = currentNode.rightNode;
                while (currentNode) {
                    successorValue = currentNode.value;
                    currentNode = currentNode.leftNode;
                }
                // Delete node with a single child
                this.deleteItem(successorValue);
                targetNode.value = successorValue;
            }
        }
    }

    find(value) {
        let currentNode = this.#root;
        let prevNode = null;
        while (currentNode) {
            if (currentNode.value === value) return currentNode;

            prevNode = currentNode;
            if (value < currentNode.value) {
                currentNode = currentNode.leftNode;
            } else {
                currentNode = currentNode.rightNode;
            }
        }
        return null;
    }

    // Recursion
    levelOrder(callback, queue = [], currentNode = this.#root) {
        if (currentNode === null) return;
        callback(currentNode);
        queue.push(currentNode.leftNode);
        queue.push(currentNode.rightNode);
        while (queue.length) {
            this.levelOrder(callback, queue, queue.shift());
        }
    }

    // // Iteration
    // levelOrder(callback) {
    //     const queue = [this.#root];
    //     while (queue.length) {
    //         const currentNode = queue.shift();
    //         if (currentNode !== null) {
    //             callback(currentNode);
    //             queue.push(currentNode.leftNode);
    //             queue.push(currentNode.rightNode);
    //         }
    //     }
    // }

    inOrder(callback, currentNode = this.#root) {
        if (currentNode === null) return;
        this.inOrder(callback, currentNode.leftNode);
        callback(currentNode);
        this.inOrder(callback, currentNode.rightNode);
    }

    preOrder(callback, currentNode = this.#root) {
        if (currentNode === null) return;
        callback(currentNode);
        this.preOrder(callback, currentNode.leftNode);
        this.preOrder(callback, currentNode.rightNode);
    }

    postOrder(callback, currentNode = this.#root) {
        if (currentNode === null) return;
        this.postOrder(callback, currentNode.leftNode);
        this.postOrder(callback, currentNode.rightNode);
        callback(currentNode);
    }

    height(node) {
        if (node === null) return -1;   // Will be called on a leaf node's subtree and incremented, -1 + 1 = 0
        const leftHeight = this.height(node.leftNode);
        const rightHeight = this.height(node.rightNode);
        return Math.max(leftHeight, rightHeight) + 1;
    }

    depth(node) {
        let currentNode = this.#root;
        let prevNode = null;
        let depth = 0;
        while (currentNode) {
            prevNode = currentNode;
            if (node.value < currentNode.value) {
                currentNode = currentNode.leftNode;
            } else if (node.value > currentNode.value) {
                currentNode = currentNode.rightNode;
            } else return depth;
            ++depth;
        }
    }

    isBalanced(node = this.#root) {
        if (node === null) return true;
        const leftHeight = this.height(node.leftNode);
        const rightHeight = this.height(node.rightNode);
        if (Math.abs(leftHeight - rightHeight) > 1) return false;
        return this.isBalanced(node.leftNode) && this.isBalanced(node.rightNode);
    }

    rebalance() {
        if (this.isBalanced()) return;
        const array = [];
        this.inOrder((elem) => array.push(elem.value));
        this.#root = this.buildTree(array);
    }
}
