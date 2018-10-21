import * as React from "react";
import * as ReactDOM from "react-dom";

import { App } from "./components/App";

import { configure, BFSRequire } from "browserfs";
import { basename, join } from "path";

import "./style.css";

function configureFS(config) {
  const options = Object.entries(config).reduce((acc, [key, value]) => {
    return {
      ...acc,
      [key]: {
        fs: "ZipFS",
        options: {
          zipData: Buffer.from(value)
        }
      }
    };
  }, {});

  return new Promise((resolve, reject) => {
    configure(
      {
        fs: "MountableFileSystem",
        options
      },
      e => {
        if (e) {
          return reject(e);
        }

        const fs = BFSRequire("fs");

        resolve(fs);
      }
    );
  });
}

function fetchZIP(url) {
  return fetch(url).then(res => res.arrayBuffer());
}

function directoryTree(fs, path, level = 0) {
  return {
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

Promise.all([fetchZIP("./self.zip")])
  .then(([self]) => configureFS({ "/": self }))
  .then(fs => {
    const tree = directoryTree(fs, "/");

    ReactDOM.render(
      <App tree={tree} readFile={path => fs.readFileSync(path, "utf-8")} />,
      document.querySelector("#app")
    );
  });
