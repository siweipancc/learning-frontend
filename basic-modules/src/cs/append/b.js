const mm = module.require("./a");

console.assert(mm.ms === undefined)
console.assert(require("./a").game === "I am new game!")

/**
 * 1. 这里导入了 a.js 作为 r1 模块
 * 2. 这里赋予了 r1.ms
 * 3. 重新导入了 a.js 作为 r11 模块
 * 4. r1 与 r11 是内存一致的
 */
let r1 = require("./a");
r1.ms = 'follow me';
console.assert(r1.ms === 'follow me')
let r11 = require("./a");
console.assert(r1 === r11)
module.exports.edit = r11
