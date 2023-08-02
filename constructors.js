let usr = {
	name: 'John',
}

// now using a constructor function
function User(name) {
	this.name = name
}

console.log(User) // [Function: User]

let user = new User('Jack')

console.log(usr) // { name: 'John' }
console.log(user) // User { name: 'Jack' }    // User is the constructor function

// Steps when a new function is created and called with 'new' keyword
// 1. .prototype property is automatically created (on User) and assigned an object (empty object) [Step 1 happens before constructor call when function User was defined]
// 2. constructor method is assigned to this prototype, and that is User function itself
// 3. .prototype property's object is assigned to created instance's __proto__ property [Step 3 happens when 'let user = new User('Jack')' is called]

console.log(User.prototype.constructor === User) // true	// User.prototype.constructor is the constructor function itself

console.log(user.__proto__ === User.prototype) // true	// User.prototype is the prototype of the user object

// benefit of using constructor function is that we can create many objects with same properties and methods
// and we can also change the properties of the constructor function and all the objects will be updated

// adding a method to the constructor function
User.prototype.sayHi = function () {
	return `Hi, ${this.name}`
}

console.log(user.sayHi()) // Hi, Jack

let user2 = new User('Jill')
console.log(user2.sayHi()) // Hi, Jill

// Another example
User.prototype.reverseName = function () {
	return this.name.split('').reverse().join('')
}

console.log(user.reverseName()) // kcaJ
console.log(user2.reverseName()) // lliJ

// We can replace the prototype completely, but that is not recommended
let animal = {
	eats: true,
	walks: function () {
		return `Animal walks`
	},
}

function Dog() {
	this.barks = true
}

let dog1 = new Dog()
console.log(dog1.barks) // true
console.log(dog1.eats) // undefined

Dog.prototype = animal // replacing the prototype completely  // not recommended

let dog = new Dog()
console.log(dog.barks) // true	// because it directly exists on the dog instance itself and not on the prototype
console.log(dog.eats) // true
console.log(dog.walks()) // Animal walks

// ----

let person = { name: 'x' } //	this is the shorthand method to create an object. person ---> Object.prototype ---> null	// person inherits from Object.prototype
let person1 = new Object({ name: 'y' }) //	actually this happens internally	Object constructor function is called with new keyword and the object is created.
console.log(Object.prototype.constructor === Object) //	true
// and the Object constructor has all the methods like toString(), hasOwnProperty(), etc.	//	so person inherits all these methods

// if we want to create an empty object, we can use Object.create(null)	//	{} ---> null	//	{} inherits from null
// that is why we can use Object.create(null) to create an empty object without inheriting from Object.prototype
// example
let obj = Object.create(null)
console.log(obj) //	{}	//	empty object
console.log(obj.toString) //	undefined	//	because it does not inherit from Object.prototype

// same goes for arrays
let arr = new Array(1, 2, 3) //	actually this happens internally	Array constructor function is called with new keyword and the object is created.
console.log(Array.prototype.constructor === Array) //	true
// and the Array constructor has all the methods like push(), map(), 'slice' etc.	//	so arr inherits all these methods
console.log(arr) //	[ 1, 2, 3 ]
arr.push(4)
console.log(arr) //	[ 1, 2, 3, 4 ]

// sane goes for functions
function fx() {
	console.log('Fx')
}

console.log(Function.prototype === fx.__proto__) //	true
// so fx inherits all the methods of Function.prototype like call(), apply(), bind(), etc.

// same goes for date
let date = new Date()
console.log(Date.prototype.constructor === Date) //	true
// so date inherits all the methods of Date.prototype like toDateString(), toTimeString(), etc.

// same goes for strings, numbers, booleans, regex, errors, promises etc.

// Primitives do not have methods, but if we try to access a method on a primitive, it will be converted to an object and then the method will be called
let str = 'Hello'
console.log(str.toUpperCase()) //	HELLO
console.log(str.__proto__ === String.prototype) //	true
console.log(str.__proto__.__proto__ === Object.prototype) //	true

// OR
// let str1 = new String('Hello')
'hello'.toLowerCase() //	"hello"	//	this is because Javascript automatically converts the string to an object and then calls the method
// same as new String("hello").toLowerCase()

// same goes for numbers
let num = 10
console.log(num.toFixed(2)) //	10.00
console.log(num.__proto__ === Number.prototype) //	true
console.log(num.__proto__.__proto__ === Object.prototype) //	true

// and so on for booleans, regex, errors, promises etc.
