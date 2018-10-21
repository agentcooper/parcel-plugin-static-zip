import { basename, join } from "path";

export function directoryTree(fs, path, level = 0) {
  return {
    path,
    level,
    name: basename(path) || ".",
    toggled: level < 2,
    children: fs.readdirSync(path).map(fileName => {
      const filePath = join(path, fileName);

      if (fs.lstatSync(filePath).isDirectory()) {
        return directoryTree(fs, filePath, level + 1);
      }

      return { name: fileName, path: filePath, level: level + 1 };
    })
  };
}

function splitPath(path) {
  if (path === "/") {
    return [];
  }
  return path.slice(1).split("/");
}

function updateTreeHelper(tree, pathArr, callback) {
  if (pathArr.length < 1) {
    return callback(tree);
  }

  const [first, ...rest] = pathArr;

  return {
    ...tree,
    children: tree.children.map(
      child =>
        child.name === first ? updateTreeHelper(child, rest, callback) : child
    )
  };
}

export function updateTree(tree, path, callback) {
  return updateTreeHelper(tree, splitPath(path), callback);
}
