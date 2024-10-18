import Node from "./Node.js";

export default class Tree {
    #root = new Node();

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
            console.log(array);
        }
        const midPoint = Math.floor((array.length - 1) / 2);
        currentNode.value = array[midPoint];
        currentNode.leftNode = new Node();
        currentNode.leftNode = this.buildTree(array.slice(0, midPoint));
        currentNode.rightNode = new Node();
        currentNode.rightNode = this.buildTree(array.slice(midPoint + 1));
        return currentNode;
    }
}
