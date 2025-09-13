1) What is the difference between var, let, and const?
   var: Avoid var (old style).
   let: Use let when value will change.
   const: Use const when value stays fixed.

2) What is the difference between map(), forEach(), and filter()?
      forEach() → loops through an array, performs an action, returns nothing.
      map() → loops through an array and returns a new array with modified values.
      filter() → loops through an array and returns a new array with only matching items.

3) What are arrow functions in ES6?
    Arrow function is a short and concise way of writing functions in JavaScript (coming in ES6).
   
4) How does destructuring assignment work in ES6?
   "Destructuring in ES6 helps take values from arrays or objects and put them into variables easily."

Array destructring:
const colors = ["red", "green", "blue"];
const [first, second, third] = colors;

console.log(first);  // red
console.log(second); // green
console.log(third);  // blue


Object destructring:
const person = { name: "Rana", age: 30 };
const { name, age } = person;

console.log(name); // Rana
console.log(age);  // 30


**5) Explain template literals in ES6. How are they different from string concatenation?**

Strings written with backticks `.

Can put variables inside with ${}.

Can write multiple lines easily.

Example:
const name = "Rana";
const age = 25;

const greeting = `Hi, I am ${name} and I am ${age} years old.`;
console.log(greeting);

// Multiline
const message = `Line 1
Line 2`;
console.log(message);

  

      
   
   
