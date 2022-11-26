#!/usr/bin/env node
import {displayInfo} from "../utils/display-info.js";
import parseArgumentsIntoOptions from "../utils/parse-args.js"
import promptForMissingOptions from "../utils/prompt-questions.js";
import Traceroute from "nodejs-traceroute";

const ls = (destination) => {
  const IpAddresses = [];
  const returnTravelTimes = [];
  let invalidIps = 0;
  try {
    // it extends events.EventEmitter to listen and emit custom events like below pid, destination, hop
    // based on platform it uses either Traceroute for linux based and Tracert for WIn32
    const tracer = new Traceroute();
    tracer
        .on("pid", (pid) => {})
        .on("destination", (destination) => {})
        .on("hop", (hop) => {
          const {ip, rtt1} = hop;
          if (ip !== undefined && ip !== "" && ip.includes(".") && ip.split(".").length === 4) {
            IpAddresses.push(ip);
          }
          if (rtt1 !== undefined && rtt1 !== "" && rtt1 !== "*") {
            returnTravelTimes.push(rtt1.split(' ')[0]);
          } else {
            invalidIps++;
          }
        })
        .on("close", (code) => {
          console.log(`Total hops travelled: ${IpAddresses.length+invalidIps}`);
          console.log(`Total Invalid Ips Found: ${invalidIps}`);
          console.log(`Fastest hop return time travel: ${Math.min(...returnTravelTimes)} ms`);
          console.log(`Slowest hop return time travel: ${Math.max(...returnTravelTimes)} ms`);
          console.log("----")
          console.log(IpAddresses)
          console.log("----")
          console.log(returnTravelTimes)
          console.log("----")
          console.log(`close: code ${code}`);
        });

    tracer.trace(destination);
  } catch (ex) {
    console.log(ex);
  }
};

const options = parseArgumentsIntoOptions(process.argv)
console.log(options)
const anwsers = await promptForMissingOptions(options)
console.log(anwsers)
//  displayInfo(process.argv.slice(2));
