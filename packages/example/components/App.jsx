import * as React from "react";

import { DirectoryTree } from "./DirectoryTree";
import { updateTree } from "../tree";

const toggle = tree => ({
  ...tree,
  toggled: !tree.toggled
});

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      source: "",
      tree: this.props.tree
    };
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
              this.setState({
                tree: updateTree(tree, path, toggle)
              })
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
