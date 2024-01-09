const ms = module.require("./a");
console.log(ms); // { ms: 'I am ms!', game: 'I am game!' }
console.assert(require("./a").game === "I am game!")


