import { SerialPort } from "serialport";
import { ReadlineParser } from "@serialport/parser-readline";
import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

const port = new SerialPort({
  path: "/dev/tty.usbmodem1101", // change this
  baudRate: 115200
});

const parser = port.pipe(new ReadlineParser({ delimiter: "\n" }));

parser.on("data", (line) => {
  try {
    const data = JSON.parse(line);

    wss.clients.forEach((client) => {
      if (client.readyState === 1) {
        client.send(JSON.stringify(data));
      }
    });
  } catch (e) {
    console.log("bad:", line);
  }
});

console.log("WebSocket running on ws://localhost:8080");




/*import { SerialPort } from "serialport";
import { ReadlineParser } from "@serialport/parser-readline";

let latest = {
  heartRate: 0,
  spo2: 0
};

const port = new SerialPort({
  path: "/dev/tty.usbmodem1101",
  baudRate: 115200
});


const parser = port.pipe(new ReadlineParser({ delimiter: "\n" }));

// 3. Send Arduino data to browser
parser.on("data", (line) => {
  try {
    const data = JSON.parse(line);

    wss.clients.forEach((client) => {
      if (client.readyState === 1) {
        client.send(JSON.stringify(data));
      }
    });
  } catch (e) {
    console.log("bad data:", line);
  }
});

console.log("Server running on ws://localhost:8080");

/*const parser = port.pipe(new ReadlineParser({ delimiter: "\n" }));

parser.on("data", (line) => {
  try {
    latest = JSON.parse(line);
  } catch (e) {
    console.log("raw:", line);
  }
});

import express from "express";
const app = express();


app.get("/data", (req, res) => {
  res.json(latest);
});

app.listen(3000);
*/
