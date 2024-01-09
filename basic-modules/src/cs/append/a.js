exports.ms = "I am ms!"; // 挂载了 ms
module.exports.game = "I am game!";  // 增量挂载了 game
module.exports = { // 复写整个 exports, 现在只存在新的 game
  game: "I am new game!"
}
