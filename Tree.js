import Node from "./Node.js";

export default class Tree {
    #root = new Node();

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
        if (!this.#root.value) {
            array = this.sortAndRemoveDuplicates(array);
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

    prettyPrint(node, prefix = "", isLeft = true) {
        if (node.value === null) {
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
}
