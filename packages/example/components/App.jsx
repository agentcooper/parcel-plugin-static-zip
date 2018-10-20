import * as React from "react";

import { DirectoryTree } from "./DirectoryTree";

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      source: "",
    };
  }

  render() {
    const { tree, readFile } = this.props;
    const { source } = this.state;

    return (
      <div className="container">
        <div className="full-height" style={{ width: "25%" }}>
          <DirectoryTree
            tree={tree}
            onFileClick={file => {
              console.log(file);
              this.setState({ source: readFile(file.path) });
            }}
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
