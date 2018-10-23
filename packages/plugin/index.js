const path = require("path");
const fs = require("fs");
const archiver = require("archiver");

const PLUGIN_NAME = "parcel-plugin-static-zip";

module.exports = bundler => {
  bundler.on("bundled", bundle => {
    const bundleDir = path.dirname(bundle.name);

    bundler.mainBundle.entryAsset.getPackage().then(package => {
      if (!package[PLUGIN_NAME]) {
        return;
      }

      for (const [zipName, { glob, options }] of Object.entries(
        package[PLUGIN_NAME],
      )) {
        const output = fs.createWriteStream(path.join(bundleDir, zipName));
        const archive = archiver("zip", {
          zlib: { level: 9 },
        });

        archive.on("error", function(err) {
          throw err;
        });

        archive.on("warning", function(err) {
          if (err.code === "ENOENT") {
            console.warn(err);
          } else {
            throw err;
          }
        });

        output.on("close", function() {
          console.log(`${zipName}: ${archive.pointer()}`);
        });

        archive.pipe(output);

        const finalOptions = {
          ...options,
          cwd: path.join(
            bundler.mainBundle.entryAsset.options.rootDir,
            options.cwd,
          ),
        };

        archive.glob(glob, finalOptions);
        archive.finalize();
      }
    });
  });
};
