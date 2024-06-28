const { Command } = require('commander');

const program = new Command();

program.option('--mode <mode>', 'Entorno de trabajo', 'dev');

program.parse();

const enviroment = program.opts().mode;

module.exports = enviroment;