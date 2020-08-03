const Compiler = require('./Compiler');
class MyPlugin {
    constructor(){}
    apply(compiler){
        console.trace();
        var reg = /eval\(\"("([^\\\"]*(\\.)?)*")|('([^\\\']*(\\.)?)*')|(\/{2,}.*?(\r|\n))|(\/\*(\n|.)*?\*\/)|(\/\*\*\*\*\*\*\/)\"\)/g
        compiler.hooks.emit.tap('CodeBeautify', (compilation)=> {
            Object.keys(compilation.assets).forEach((data)=> {
                let content = compilation.assets[data].source() // 欲处理的文本
                // console.log('content', content);
                content = content.replace(reg, function (word) { // 去除注释后的文本
                    // console.log('word', word)
                    return /^\/{2,}/.test(word) || /^\/\*!/.test(word) || /^\/\*{3,}\//.test(word) ? "" : word;
                });
                compilation.assets[data] = {
                    source(){
                        return content
                    },
                    size(){
                        return content.length
                    }
                }
            })
        })

        // compiler.hooks.break.tap("WarningLampPlugin", ()=> console.log('WarningLampPlugin'));
        // compiler.hooks.accelerate.tap("LoggerPlugin", newSpeed => console.log(`Accelerating to ${newSpeed}`));
        // compiler.hooks.calculateRoutes.tapAsync("calculateRoutes tapAsync", (source, target, routesList, callback) => {
        //     setTimeout(() => {
        //         console.log(`tapAsync to ${source}${target}${routesList}`)
        //         callback();
        //     }, 2000)
        // });
    }
}

module.exports = MyPlugin;
