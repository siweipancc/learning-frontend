## TypeScript 的编译器及配置

编译器内容, 只需集中关注配置, [见](https://www.typescriptlang.org/docs/handbook/modules/guides/choosing-compiler-options.html)


### NodeJS 环境

要点:

1. package.json 
   1. `"type": "module"`: 使用模块化标准特性
   2. `@types/node`: Types 文件
   3. `"ts-node"`: 可选即时 run 代码, IntelliJ IDEA 可以使用插件 [Run Configuration for TypeScript](https://plugins.jetbrains.com/plugin/10841-run-configuration-for-typescript)
2. tsconfig.json
   1. `"module": "NodeNext"` : Node 语义是 Node10,  截至 2024/01 , NodeNext 语义是 Node16 (兼容 NodeJS v12,官方建议值)

```json

{
  "private": true,
  "devDependencies": {
    "typescript": "~5.3.3",
    "@types/node": "~20.10.0",
    "ts-node": "~10.9.2"
  },
  "type": "module" 
}

```

```json
{
  "compileOnSave": true,
  "compilerOptions": {
    "alwaysStrict": true,
    "pretty": true,
    "sourceMap": true,
    "experimentalDecorators": true,
    "incremental": true,
    "target": "ES2022",
    "newLine": "lf",
    "moduleResolution": "NodeNext",
    "module": "NodeNext"
  }
}

```

### 标准化框架(或者 Bundler)

要点:

1. tsconfig.json
   1. `"moduleResolution": "Bundler"` : 取决于框架与打包方式, 比如 Angular 使用 node 同时 `customConditions` 失效(不配置), 见 [项目内配置](src/purees/tsconfig.json)
   2. `module": "esnext"`: 标准化库
   3. `"customConditions": ["module"]`: 对应 package.json `"type": "module"`, [见](https://www.typescriptlang.org/tsconfig#customConditions)
   4. `"verbatimModuleSyntax": true`: 官方推荐
   5. `"noEmit": true`: 兼容各种打包工具, [见](https://www.typescriptlang.org/tsconfig#noEmit)

```json

{
  "compileOnSave": true,
  "compilerOptions": {
    "alwaysStrict": true,
    "pretty": true,
    "declaration": false,
    "sourceMap": true,
    "experimentalDecorators": true,
    "incremental": true,
    "target": "ES2022",
    "newLine": "lf",

    "customConditions": [
      "module"
    ],
    "module": "esnext",
    "moduleResolution": "Bundler",
    "esModuleInterop": true,
    "noEmit": true,
    "allowImportingTsExtensions": true,
    "allowArbitraryExtensions": true,
    "verbatimModuleSyntax": true
  }
}
```