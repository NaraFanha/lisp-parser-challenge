# lisp-parser-challenge

### Task
Write code that takes some Lisp code and returns an abstract syntax tree. The AST should represent the structure of the code and the meaning of each token. For example, if your code is given **"(first (list 1 (+ 2 3) 9))"**, it could return a nested array like **["first", ["list", 1, ["+", 2, 3], 9]]**.

### Solution
Taking into account we will receive a **string** and assuming the string will **never be empty**. The solution consists in calling the parse function recursivally and creating multiple arrays, where the begining of each array is represented by '(' and the end by ')'. In case it is found a number it is converted to a number while if not is considered a string. This is done until the index of the iteration is the length of the string.
