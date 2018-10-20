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

        output.on("close", function() {
          console.log(`${zipName}: ${archive.pointer()}`);
        });

        archive.pipe(output);

        const finalOptions = {
          ...options,
          cwd: path.join(package.pkgdir, options.cwd),
        };

        archive.glob(glob, finalOptions);
        archive.finalize();
      }
    });
  });
};
