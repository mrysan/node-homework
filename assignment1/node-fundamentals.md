# Node.js Fundamentals

## What is Node.js?

Node.js is a C++ application that allows javascript to run in a local or server environment, freeing
javascript from being used outside of the browser. It does not have a GUI, so it is used through
a command line terminal.

## How does Node.js differ from running JavaScript in the browser?

Node.js Differs from JS in the browser by having access to local file systems, having the ability to store secrets such as
API keys (thus being able to access databases securely), and having access to modules and NPM. Furthermore,
Node.js does not have any DOM or Window object, instead using it's own custom global objects.

## What is the V8 engine, and how does Node use it?

V8 engine is the Javascript engine that powers Node.js. The V8 engine provides a runtime (environment that executes code) that
is used on a server, provides various APIs such as OS and networking functionality, and manages memory (garbage collection).

## What are some key use cases for Node.js?

Some key uses cases for Node.js are using Node.js as backend and middleware for websites, routing, creating APIs and
handling API requests, accessing DBs and handling log in/authentication logic, and a plethora of server side projects.

## Explain the difference between CommonJS and ES Modules. Give a code example of each.

CJS and ESM are two different standards of interacting with modules in javascript.

ESM uses 'import' and 'from' statements (import {add, multiply} from 'math') to import modules, and
exports modules via the 'export' statement (export default {add, multiply}).

CJS differns in that it uses a require statement for importing modules (const {add, multiply} = require('math')),
and exports modules via the module.exports statement (module.exports = {add, multiply}).

**CommonJS (default in Node.js):**

```js
const {getRandomName} = require("superheroNames");

const createSuperhero(){
    return `your super hero name is: ${getRandomName()}`
}
module.exports = {createSupergero}

```

**ES Modules (supported in modern Node.js):**

```js
import { getRandomName } from "superheroNames";

export function createSuperhero() {
  return `your super hero name is: ${getRandomName()}`;
}
```
