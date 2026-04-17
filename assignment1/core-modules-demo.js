const os = require("os");
const path = require("path");
const fs = require("fs");

const sampleFilesDir = path.join(__dirname, "sample-files");
if (!fs.existsSync(sampleFilesDir)) {
  fs.mkdirSync(sampleFilesDir, { recursive: true });
}

// OS module
console.log(`Platform: ${os.platform()}`);
console.log(`CPU: ${os.cpus()[0].model}`);
console.log(`Total Memory: ${os.totalmem()}`);

// Path module
console.log(`Joined path: ${path.join(__dirname, "testing-files")}`);
// fs.promises API
async function createDemoFile() {
  try {
    await fs.promises.writeFile(
      path.join(__dirname, "/sample-files/demo.txt"),
      "Hello from fs.promises!",
    );
  } catch (err) {
    console.log(err);
  }
}
createDemoFile();

async function readFile() {
  try {
    const data = await fs.promises.readFile(
      path.join(__dirname, "/sample-files/demo.txt"),
      "utf8",
    );
    console.log(`fs.promises read: ${data}`);
  } catch (err) {
    console.log(err);
  }
}

readFile();

// create large file
async function createLargeFile() {
  try {
    let content = "";
    for (let i = 0; i < 100; i++) {
      content += `Chunk of data ${i}\n`;
    }

    await fs.promises.writeFile(
      path.join(__dirname, "/sample-files/largefile.txt"),
      content,
    );
  } catch (err) {
    console.log(err);
  }
}
createLargeFile().then(readLargeFile());

// Streams for large files- log first 40 chars of each chunk

function readLargeFile() {
  const readStream = fs.createReadStream(
    path.join(__dirname, "sample-files/largefile.txt"),
    { encoding: "utf8", highWaterMark: 1024 },
  );
  // read 40 characters at a time
  readStream.on("data", (chunk) =>
    console.log(`Read chunk: ${chunk.slice(0, 40)}`),
  );

  readStream.on("end", () => {
    console.log("Finished reading large file with streams");
  });
}
