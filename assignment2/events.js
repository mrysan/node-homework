const EventEmitter = require("events");
const emitter = new EventEmitter();

emitter.on("time", (message) => {
  console.log(`Time Received: ${message}`);
  setInterval(() => {
    const time = new Date().toLocaleTimeString("en-US", {
      timeZone: "America/Los_Angeles",
    });

    console.log(`current time: ${time}`);
  }, 5000);
});

emitter.emit(
  "time",
  new Date().toLocaleTimeString("en-US", {
    timeZone: "America/Los_Angeles",
  }),
);

module.exports = emitter;
