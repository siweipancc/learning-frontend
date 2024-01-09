## JavaScript 的模块基础

模块基础内容, 集中关注运行细节与语言设计, 然后是, 经常 debug

### ECMAScript(ESM)

自 [v12](https://262.ecma-international.org/12.0/) 起在现代浏览器和 Node.js 中受支持, 使用专用的 **import** 和 **export
** 语法

```javascript
// es/a.js
let src = "Source";
export {src};
export default "Game Over";

// es/b.js
import {src} from './a.js';
import a from './a.js';

console.assert(src === 'Source');
console.assert(a === 'Game Over');


// es/index.html
<script src="./b.js" type="module"></script>
```

注:

1. 在 **node** 执行会得到一个错误： SyntaxError: Cannot use import statement outside a module
2. 花括号包围的 `export {src}` 导出一个名为 src 的对象, 花括号包围 `import {src}` 表示导入名为 src 的对象
3. `export default` 导出一个名为 default 的对象, 没有花括号包围 `import a` 表示导入名为 default 的对象

#### 额外的代码扩展

请适时地 **debug** 以验证以上的规则

```javascript
// es/append/a.js
let src = "Source";
export {src};
export default "Game Over";

// es/append/b.js
import {src} from './a.js';
import a from './a.js';

console.assert(src === 'Source');
console.assert(a === 'Game Over');

// es/append/index.html
<script src="./b.js" type="module"></script>
```

### CommonJS

最初在 Node.js 中提供的模块系统, 使用名为 exports 和 require 的纯 JavaScript 对象和函数, **没有规范**。

```javascript
// cs/a.js
exports.ms = "I am ms!";
module.exports.game = "I am game!";
// exports.ms = "I am dd!";
// cs/b.js
const ms = module.require("./a");
console.log(ms); // { ms: 'I am ms!', game: 'I am game!' }
console.assert(require("./a").game === "I am game!")
```

注:

1. 在 **html** 执行会得到一个错误： Uncaught ReferenceError: require is not defined
2. 存在一个 `NodeJS.Module` 对象 module (指向当前 b.js)
3. `require` 是一个本地函数 实际为调用 `NodeJS.Require` 的构造器, 返回一个 `NodeJS.Module` 的本地实例 `ms`
4. 存在一个本地 exports 对象(是 `NodeJS.Module` 的 exports 引用)
5. a.js 实际上就是一个 module, 同样的 b.js 也是一个 module
6. 模块依赖值修改会**扩散**
7. `require` 语法是**同步**的 (返回一个非异步对象)
8. 扩展名可以命名为 b**.cjs** 以声明该文件是一个 CommonJS 模块 , [见](https://nodejs.org/api/esm.html#enabling)

#### 额外的代码扩展

请适时地 **debug** 以验证以上的规则

```javascript
// cs/append/a.js
exports.ms = "I am ms!"; // 挂载了 ms
module.exports.game = "I am game!"; // 增量挂载了 game
module.exports = { // 复写整个 exports, 现在只存在新的 game
    game: "I am new game!"
}

// cs/append/b.js
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


// append/c.js
const mm = module.require("./a");
const m2 = require("./b")
console.assert(m2.edit === mm) // 值影响扩散

```

