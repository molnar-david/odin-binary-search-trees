export default class Node {
    #value = null;
    #leftNode = null;
    #rightNode = null;

    constructor(value = null, leftNode = null, rightNode = null) {
        this.#value = value;
        this.#leftNode = leftNode;
        this.#rightNode = rightNode;
    }

    get value() {
        return this.#value;
    }

    get leftNode() {
        return this.#leftNode;
    }

    get rightNode() {
        return this.#rightNode;
    }

    set value(value) {
        this.#value = value;
    }

    set leftNode(node) {
        this.#leftNode = node;
    }

    set rightNode(node) {
        this.#rightNode = node;
    }
}
