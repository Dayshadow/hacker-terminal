
var genData = {
    trueArr: ["Boolean(false + true + true - false)", "!false", "(true && true)", "(false || true)", "1", "('f' + 'a' + 'l' + 's' + 'e')", "Boolean(1)", "(1 / 2 + 1 / 2)", "(2 - 1)", "(0 + 1)", "(4>>2)", "Number(true)"],
    falseArr: ["3 ** (4 + true) - 243", "Math.pow(true, false) - 1", "(Math.pow(5 + 5, 3) + Math.pow(9, 3) - Math.pow(6 + 6, 3) - Math.pow(1, 3))", "(32768 - 32768)", "(0 + 0)", "Number(false)"],
    varArr: ["foo", "bar", "tmp", "operand", "counter", "i", "j", "k", "index", "idNumber", "_FSXlmp", "wsCross", "dotProduct", "res", "product", "dx", "dy", "x", "y", "adasba", "_fsDONE", "wNcEG", "argLength", "tmpFieldDx", "cInt", "functionCount", "varCount"],
    funcNameArr: ["doStuff", "runCheck", "handleData", "update", "findFirst", "hack", "bruteForce", "changeVars", "handle", "addComplexity", "manipulateVerticies", "recurse", "permutate", "alter", "runCalculations", "calculate"],
    lineArr: ["return /v;", "let /v = /f;", "/v = /f * /v + /f;", "() => {return /v * 2};", "let /v = 69", "/f.replace('/e/g', String(/v));"]
}



const generateFunctionCall = () => {
    let argAmount = Math.floor(Math.random() * 5);
    let args = "";
    let argArr = [];
    let varArr = genData.varArr;

    for (let i = 0; i < argAmount; i++) {
        let randArg = randomItem(varArr);
        varArr.filter((elt) => { elt !== randArg });
        args += randArg;
        argArr = argArr.concat(randArg);
        if (i !== argAmount - 1) args += ", ";
    }

    return { text: randomItem(genData.funcNameArr) + "(" + args + ")", args: argArr };
}

const generateLine = (vars) => {
    //return randomItem(genData.lineArr).replace(/\/v/g, randomItem(vars)).replace(/\/f/g, generateFunctionCall().text)
    let line = randomItem(genData.lineArr);
    varCount = getIndicesOf("/v", line).length;
    functionCount = getIndicesOf("/f", line).length;
    for (let i = 0; i < varCount; i++) {
        line = line.replace("/v", randomItem(vars));
    }
    for (let i = 0; i < functionCount; i++) {
        line = line.replace("/f", generateFunctionCall().text);
    }
    return line;
}