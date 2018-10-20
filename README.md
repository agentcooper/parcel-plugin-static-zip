# parcel-plugin-static-zip

https://agentcooper.github.io/parcel-plugin-static-zip/

Provide archived local directory in the static build. Useful for [BrowserFS](https://github.com/jvilk/BrowserFS).

## Install

```
npm install parcel-plugin-static-zip --save-dev
```

## How to use

Add config to your `package.json`:

```
"parcel-plugin-static-zip": {
  "self.zip": {
    "glob": "**",
    "options": {
      "cwd": "../../",
      "ignore": [
        "**/node_modules/**",
        "**/dist/**"
      ]
    }
  }
},
```

Whenever Parcel builds the project, `self.zip` will be available in the `dist`.
