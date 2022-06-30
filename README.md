# find-dotenv-file

find-dotenv-file is a simple function that traverses the process.mainModule.paths attempting to locate a `.env` file.

Works best with [dotenv]( https://github.com/motdotla/dotenv) by [motdotla]( https://github.com/motdotla).

## Why do I need this helper function?

Maybe you don’t? You probably don’t. In fact, I probably don’t… but here we are. With a `.env` file in your project’s root directory and the ubiquitous `dotenv` module you’re probably all set.

When set-up correctly, you’re already ready to `node app.js` or `npm start` from your project’s root directory… but what if you want to `node foo.js` in some other `my-project/bar/` directory?

`dotenv` uses `process.cwd()` to get the expected root directory to search for the `.env` file. When in a directory other than project root (and therefore without your `.env` file) you won’t be able to load and use your `.env` variables (easily, nor dynamically).

```bash
# let's assume you have my-project/.env but are working in my-project/lib/
node foo.js
# won’t load your .env variables
```

`dotenv` has the ability to specify a path other than your current working directory with: `.config({ path: ‘/foo/bar/.env’ })` which overrides the `process.cwd()` default. This, however, creates three challenges:
1. Requires you to specify the absolute path to your `.env` file (which can be long and subject to typos and copypasta errors).
2. Requires you to remember which project/path you’re in (which if you’re switching projects a lot is no easy task).
3. Requires you to manually update this path if your project folder moves, etc.

I want the best of both worlds:
1. Dynamically know which path and project I’m in
2. Allow me to call `node foo.js` from any project subdirectory

Enter `find-dotenv-file`

## Install

```bash
# npm 5.0.0+ saves be default, otherwise add ` --save`
npm install find-dotenv-file
```

## Usage

This helper function assumes you already have a `.env` file in the root directory of your project, as well as `dotenv` already set-up and working.

```bash
# my-project/.env
FOO="bar"
```

BEFORE you require and configure `dotenv` you need to require `find-dotenv-file` (also, we need to configure dotenv with our helper function `findDotEnvFile()`).

```javascript
require(‘find-dotenv-file’)
require(‘dotenv’).config({ path: findDotEnvFile() })
```

That’s it! You’re all set.

## FAQ

### Why?

See above. But mostly because I could. Well… I couldn’t, but I wanted to test and learn.

### How does it work?

`findDotEnvFile()` looks in all the same paths as [node_modules]( https://nodejs.org/api/modules.html#loading-from-node_modules-folders). It get the paths list from `process.mainModule.paths` and tests each path for a `.env` file. It then returns the space-escaped absolute path to the `.env` file.

### What about multiple .env files?

That's a great question... and I'm not sure. I haven't tested this on multiple `.env` files as I have no use for that setup. I assume the helper function would return the "left-most" `.env` file it could find... in other words, an `.env` file in `/Users/foo/.env` would likely return if found even if you wanted `/Users/foo/my-project/.env` -- use at your own risk!
