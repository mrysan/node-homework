const fs = require("fs");
const path = require("path");

// Write a sample file for demonstration
// sync so that it is created before the async functions run!
const sampleDir = path.join(__dirname, "/sample-files/sample.txt");
fs.writeFileSync(sampleDir, "Hello, async world!");

// 1. Callback style
try {
  fs.readFile(sampleDir, "utf8", (err, data) => {
    if (err) {
      throw new Error(err.message);
    }
    console.log(`Callback read: ${data}`);
  });
} catch (err) {
  console.log(err);
}

// Callback hell example (test and leave it in comments):

// function readSamplePromise() {
//   return new Promise((resolve, reject) => {
//     fs.readFile("sample.txt", "utf8", (err, data) => {
//       if (err) {
//         reject(err);
//         return;
//       }
//       resolve(`Callback Hell read: ${data}`);
//     });
//   });
// }

// const read = async function readSample() {
//   const result = await readSamplePromise();
//   return result;
// };

// read
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// 2. Promise style

const readFileWithPromise = new Promise((resolve, reject) => {
  fs.readFile(sampleDir, "utf8", (err, data) => {
    if (err) {
      reject(err);
      return;
    }
    resolve(`Promise read: ${data}`);
  });
});

try {
  readFileWithPromise
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
} catch (err) {
  console.log(err);
}

// 3. Async/Await style

const readFileWithAwait = async () => {
  try {
    const readFile = await new Promise((resolve, reject) => {
      fs.readFile(sampleDir, "utf8", (err, data) => {
        return err ? reject(err) : resolve(`Async/Await read: ${data}`);
      });
    });

    console.log(readFile);
  } catch (err) {
    console.log(err);
  }
};

readFileWithAwait();
