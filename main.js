import Tree from "./Tree.js";

const tree = new Tree();
const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
tree.buildTree(array);
tree.prettyPrint(tree.root);
tree.insert(11);
tree.prettyPrint(tree.root);
tree.deleteItem(3);
tree.prettyPrint(tree.root);
tree.prettyPrint(tree.find(67));
tree.levelOrder(console.log);
