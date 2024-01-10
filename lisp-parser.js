// Returns a number in case of the value being a number
// If not returns the string
function toNumberOrString(value) {
    return isNaN(Number(value)) ? value : Number(value);
  }

// This function parses a string
// In case it is found a '(' or ')' it is returned the value parsed and the previous index
// If the current characetr is an space it is returned the value parsed and the current index
// Else the iteration progresses and stores the characters in the value variable
function parseValue(string, startIndex) {
    var value = '';
    for (var index = startIndex; index < string.length; index++) {
        let currCharacter = string[index];
        if (currCharacter === '(' || currCharacter === ')') {
            return [toNumberOrString(value), index - 1];
        } else if (currCharacter === ' ') {
            return [toNumberOrString(value), index];
        } else {
            value += currCharacter;
        }
    }
    return [value, string.length];
}

// This functions receives a string and an index
// When iterating the string
// If the value of the current index is '(' it defines the begining of an array
// And recursivally the parse funtion is called again from the next index
// If the value of the current index is ')' it defines the end of an array
// And recursivally the parse funtion is called again from the next index
// Else we parse the remaining string if the current character is not empty
function parseInput(lispCode, startIndex) {
    var syntaxTree = [];
    for (var index = startIndex; index < lispCode.length; index++) {
        let currCharacter = lispCode[index];
        if (currCharacter === '(') {
            let [newArray, newIndex] = parseInput(lispCode, index + 1);
            index = newIndex;
            syntaxTree.push(newArray);
        }
        else if (currCharacter === ')') {
            return [syntaxTree, index + 1];
        } 
        else if (currCharacter !== ' ') {
            let [newValue, newIndex] = parseValue(lispCode, index);
            index = newIndex;
            syntaxTree.push(newValue);
        }
    }
    return [syntaxTree, lispCode.length];
}

// This function receives a non empty String as input that represents a Lisp code
// And returns an abstract syntax tree
// If the first and last character of the string is not ( or ) the function
// Returns null
function parse(lispCode) {
    if (lispCode[0] !== '(' || lispCode[lispCode.length-1] ==! ')') {
        return null;
    } else{
        return parseInput(lispCode, 1)[0];
    }
}

console.log(parse('(first (list 1 (+ 2 3) 9))'));
//["first",["list",1,["+",2,3],9]]
