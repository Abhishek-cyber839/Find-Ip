import chalk from "chalk";
import boxen from "boxen";

const displayInfo = (args) => {
  console.log(boxen(chalk.blue("Tracing your route......"), {padding: 1, borderColor: "green", dimBorder: true}));
};

export {
  displayInfo,
};
