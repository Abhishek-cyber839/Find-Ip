import chalk from "chalk";
import boxen from "boxen";

// https://www.npmjs.com/package/figlet
// use figlet or any other package to display cli name in ascii style
const displayInfo = (args) => {
  console.log(boxen(chalk.blue("Tracing your route......"), {padding: 1, borderColor: "green", dimBorder: true}));
};

export {
  displayInfo,
};
