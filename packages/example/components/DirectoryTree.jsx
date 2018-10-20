import * as React from "react";

import "./DirectoryTree.css";

export function DirectoryTree({ tree, onFileClick }) {
  if (!tree.children) {
    return (
      <div
        className="file-name hover"
        key={tree.name}
        onClick={() => {
          onFileClick(tree);
        }}
      >
        {tree.name}
      </div>
    );
  }

  return (
    <div className="directory">
      <span className="directory-name hover">{tree.name}</span>
      <div className="directory-inner">
        {tree.children.map((child, index) => (
          <DirectoryTree tree={child} key={index} onFileClick={onFileClick} />
        ))}
      </div>
    </div>
  );
}
