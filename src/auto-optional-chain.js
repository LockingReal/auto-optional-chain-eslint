module.exports = {
    meta: {
        docs: {
            description: "自动添加可选链"
        },
        fixable: true
    },
    create(context) {
        // 节点替换的思路可以在这个地址里去看：https://astexplorer.net/
        const sourceCode = context.getSourceCode();
        return {
            MemberExpression(node) {
                const tokens = sourceCode.getTokens(node);
                // 在启动node类型的debug时，比如我想查看tokens，可以在下一句打断点
                const dotToken = tokens.at(-2);
                if (dotToken.value === '?.') {
                    return;
                }
                context.report({
                    node,
                    loc: dotToken.loc,
                    message: '应当用可选链',
                    fix: fixer => {
                        return fixer.insertTextBefore(dotToken, '?')
                    }
                })
            }
        }
    }
}