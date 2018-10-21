import * as React from "react";

import "./DirectoryTree.css";

function getPadding(level) {
  return { paddingLeft: 0.5 * level + "em" };
}

export function DirectoryTree({ tree, onFileClick, onDirectoryClick }) {
  if (!tree.children) {
    return (
      <div
        className="file-name hover"
        style={getPadding(tree.level)}
        key={tree.name}
        onClick={() => onFileClick(tree)}
      >
        {tree.name}
      </div>
    );
  }

  return (
    <div className="directory">
      <div
        className={`directory-name hover ${tree.toggled && "toggled"}`}
        style={getPadding(tree.level)}
        onClick={() => onDirectoryClick(tree.path)}
      >
        {tree.name}
      </div>

      {tree.toggled && (
        <div className="directory-inner">
          {tree.children.map((child, index) => (
            <DirectoryTree
              tree={child}
              key={index}
              onFileClick={onFileClick}
              onDirectoryClick={onDirectoryClick}
            />
          ))}
        </div>
      )}
    </div>
  );
}
