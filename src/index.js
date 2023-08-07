const { ESLint } = require('eslint');
const engine = new ESLint({
    fix: true, // fix 为 true/false,标识是否开启了 自动修复
    overrideConfig: {
        parser: "@babel/eslint-parser",
        rules: {
            'semi': ['error', 'never'],
            'auto-optional-chain': ['error'] // 配置进rules中
        }
    },
    rulePaths: [__dirname],// rulePath：哪里作为根目录去找 rule
    useEslintrc: false
});

async function main() {
    const results = await engine.lintText(`
        function handleRes(data){
            const res = data.a.b.c + data.e.f.g;
        }
    `)
    // 可以打印results看一下，原生的打印十分不方便看
    // eslint内置了一些formatter，格式化一下再打印
    const formatter = await engine.loadFormatter('stylish');
    // 如果有错误信息可以 console 下面的resultText,来看error信息
    // const resultText = formatter.format(results);
    console.log(results[0]);
}

main();