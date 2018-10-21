import * as React from "react";

import { DirectoryTree } from "./DirectoryTree";

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      source: "",
      tree: this.props.tree
    };
  }

  updateTree(path, tree) {
    if (path === "/" || path === "") {
      return { ...tree, toggled: !tree.toggled };
    }

    console.log(path);

    const target = path.split("/")[1];
    const targetChild = tree.children.find(child => child.name === target);
    const nextPath = path.slice(target.length + 1);

    const newChildren = tree.children.map(
      child =>
        child.name === target ? this.updateTree(nextPath, targetChild) : child
    );

    return { ...tree, children: newChildren };
  }

  render() {
    const { readFile } = this.props;
    const { source, tree } = this.state;

    return (
      <div className="container">
        <div className="full-height" style={{ width: "25%" }}>
          <DirectoryTree
            tree={tree}
            onFileClick={file => {
              console.log(file);
              this.setState({ source: readFile(file.path) });
            }}
            onDirectoryClick={path =>
              this.setState({ tree: this.updateTree(path, tree) })
            }
          />
        </div>
        <div className="full-width full-height">
          <textarea
            value={source}
            readOnly
            className="textarea full-width full-height"
          />
        </div>
      </div>
    );
  }
}
