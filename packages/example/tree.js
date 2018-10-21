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
  if (path === "/") return [];
  if (typeof path === "string") return path.slice(1).split("/");
  return path;
}

export function updateTree(path, tree) {
  const pathArr = splitPath(path);

  if (pathArr.length < 1) {
    return { ...tree, toggled: !tree.toggled };
  }

  const [first, ...rest] = pathArr;
  const targetChild = tree.children.find(child => child.name === first);

  return {
    ...tree,
    children: tree.children.map(
      child => (child.name === first ? updateTree(rest, targetChild) : child)
    )
  };
}
