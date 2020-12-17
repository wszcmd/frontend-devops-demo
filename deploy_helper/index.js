const { program } = require("commander");

program
  .command("deploy")
  .option("-cp ")
  .action(require("./actions/deploy-simple"));

program.parse(process.argv); 