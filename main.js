import Tree from "./Tree.js";

function generateRandomNumber(min = 0, max = 99) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function generateRandomArray(length = 10, min = 0, max = 99) {
    return Array.from({ length: length }, () => generateRandomNumber(min, max));
}

// const tree = new Tree();
// const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
// tree.buildTree(array);
// tree.prettyPrint(tree.root);
// tree.insert(11);
// tree.prettyPrint(tree.root);
// tree.deleteItem(3);
// tree.prettyPrint(tree.root);
// tree.prettyPrint(tree.find(67));
// console.log('Level order:');
// tree.levelOrder(console.log);
// console.log('Inorder:');
// tree.inOrder(console.log);
// console.log('Preorder:');
// tree.preOrder(console.log);
// console.log('Postorder:');
// tree.postOrder(console.log);
// tree.prettyPrint(tree.find(67));
// console.log('Height:');
// console.log(tree.height(tree.find(67)));
// tree.prettyPrint(tree.root);
// console.log('Depth:');
// console.log(tree.depth(tree.find(6345)));
// console.log(tree.isBalanced());
// tree.rebalance();
// tree.prettyPrint(tree.root);

const tree = new Tree(generateRandomArray(13));
tree.prettyPrint();

console.log(`Balanced: ${tree.isBalanced()}`);
console.log('Level order:');
tree.levelOrder(console.log);
console.log('Preorder:');
tree.preOrder(console.log);
console.log('Inorder:');
tree.inOrder(console.log);
console.log('Postorder:');
tree.postOrder(console.log);

console.log('Inserting 5 random nodes...');
tree.insert(generateRandomNumber(101, 999));
tree.insert(generateRandomNumber(101, 999));
tree.insert(generateRandomNumber(101, 999));
tree.insert(generateRandomNumber(101, 999));
tree.insert(generateRandomNumber(101, 999));

tree.prettyPrint();
console.log(`Balanced: ${tree.isBalanced()}`);
if (!tree.isBalanced()) {
    console.log('Rebalancing tree...');
    tree.rebalance();
    tree.prettyPrint();
    console.log(`Balanced: ${tree.isBalanced()}`);
}

console.log('Level order:');
tree.levelOrder(console.log);
console.log('Preorder:');
tree.preOrder(console.log);
console.log('Inorder:');
tree.inOrder(console.log);
console.log('Postorder:');
tree.postOrder(console.log);
