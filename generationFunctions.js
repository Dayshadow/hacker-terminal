
const genData = {
    conditionArr: ["Boolean(false + true + true - false)", "!false", "(true && true)", "(false || true)", "1", "('f' + 'a' + 'l' + 's' + 'e')", "Boolean(1)", "(1 / 2 + 1 / 2)", "(2 - 1)", "(0 + 1)", "(4>>2)", "Number(true)", "3 ** (4 + true) - 243", "Math.pow(true, false) - 1", "(Math.pow(5 + 5, 3) + Math.pow(9, 3) - Math.pow(6 + 6, 3) - Math.pow(1, 3))", "(32768 - 32768)", "(0 + 0)", "Number(false)"],
    varArr: ["foo", "bar", "tmp", "operand", "counter", "i", "j", "k", "index", "idNumber", "_FSXlmp", "wsCross", "dotProduct", "res", "product", "dx", "dy", "x", "y", "adasba", "_fsDONE", "wNcEG", "argLength", "tmpFieldDx", "cInt", "functionCount", "varCount"],
    funcNameArr: ["doStuff", "runCheck", "handleData", "update", "findFirst", "hack", "bruteForce", "changeVars", "handle", "addComplexity", "manipulateVerticies", "recurse", "permutate", "alter", "runCalculations", "calculate"],
    lineTemplates: ["/v = typeof /v;", "/v = /f;", "/v = /f * /v + /f;", "/v = () => {return /v * 2};", "/v = 69", "/f.replace('/e/g', String(/v));"]
}



const generateFunctionCall = (vars) => {
    let argAmount = Math.floor(Math.random() * 4 + 2);
    let args = ""; // String that holds the text between the parenthesis (ex. "foo, bar, bing, bazz")
    let argArr = []; // Used for the return
    let varArr = vars; // Makes a temporary copy of the main variable name array

    for (let i = 0; i < argAmount; i++) {
        let randArg = randomItem(varArr);
        varArr = varArr.filter((elt) => { return elt !== randArg }); // Removes the chosen argument name to prevent duplicates
        args += randArg;
        argArr = argArr.concat(randArg);
        if (i !== argAmount - 1) args += ", ";
    }

    return { text: randomItem(genData.funcNameArr) + "(" + args + ")", args: argArr };
}

const generateLine = (vars) => {
    let line = randomItem(genData.lineTemplates); // Picks a random line template from the array ("/v" for variable name, "/f for function name)

    varCount = getIndicesOf("/v", line).length; // A slightly tacky way of checking how many times "/v" occurs in the line 
    functionCount = getIndicesOf("/f", line).length; // Same as above but for "/f";

    // Replace all of the standins with what they represent
    for (let i = 0; i < varCount; i++) {
        line = line.replace("/v", randomItem(vars));
    }
    for (let i = 0; i < functionCount; i++) {
        line = line.replace("/f", generateFunctionCall(vars).text);
    }

    return line;
}

const generateIfStatement = (vars) => {
    let ret = "";
    ret += "if (" + randomItem(genData.conditionArr) + ") {" + "\n";
    for (let i = 0; i < Math.random()*3; i++) {
        ret += "    " + generateLine(vars) + "\n";
    }
    return ret + "}";
}

const generateFunction = () => {
    let ret = "";
    let generators = [generateLine, generateIfStatement, generateLine];
    let funcData = generateFunctionCall(genData.varArr);
    ret += "function " + funcData.text + " {" + "\n";
    for (let i = 0; i < Math.random() * 20; i++) {
        ret += indent(randomItem(generators)(funcData.args)) + "\n";
    }
    ret += "    return " + randomItem(funcData.args) + ";" + "\n";
    return ret + "}"
}