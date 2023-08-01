let animal = {
	eats: true,
	walk: function () {
		return 'Animal walk'
	},
}
let dog = { barks: true }

// __proto__ is a getter/setter for the [[Prototype]] internal property of objects

dog.__proto__ = animal // make animal as a prototype of dog object and dog object will inherit all the properties of animal object
console.log(dog.barks) // true
console.log(dog.eats) // true
console.log(dog.walk()) // Animal walk  // dog object can access the walk() method of animal object
console.log(dog.__proto__ === animal) // true   // dog object's prototype is animal object
console.log(animal.__proto__ === Object.prototype) // true  // animal object's prototype is Object.prototype

// __proto__ is not used now a days, and recommended way is to use Object.setPrototypeOf() and Object.getPrototypeOf() methods
// Object.setPrototypeOf(obj, prototype) is a setter for the [[Prototype]] internal property of objects
// Object.getPrototypeOf(obj) is a getter for the [[Prototype]] internal property of objects

// Object.setPrototypeOf(dog, animal) // animal object will be set as a prototype of dog object

let puppy = {
	play: true,
	walk: function () {
		// overriding the walk() method of animal object
		return 'Puppy walk' // we can not change the methods or properties of parent object, but we can override them
	},
}

// make animal and dog as a prototype of puppy object and puppy object will inherit all the properties of animal and dog object

// Object.setPrototypeOf(bacteria, dog)
puppy.__proto__ = dog
console.log(puppy.barks) // true
console.log(puppy.eats) // true
console.log(puppy.walk()) // Bacteria walk  // bacteria object can access the walk() method of animal object

// We can see that it's a chain of prototypes: puppy inherits from dog, dog inherits from animal, and animal inherits from Object.prototype.

// Object.prototype is the last link in this prototype chain. It is the root of all objects. It points to null, and acts as the final link in the prototype chain.
console.log(Object.getPrototypeOf(Object.prototype)) // null
console.log(Object.prototype.__proto__) // null

for (let key in puppy) {
	// for..in loop iterates over inherited properties too
	console.log(key) // play, barks, eats, walk
}

// Object.keys(obj) returns only own keys of an object (without inherited ones).
console.log(Object.keys(puppy)) // [ 'play', 'walk' ]
// Object.values(obj) returns only own values of an object (without inherited ones).
console.log(Object.values(puppy)) // [ true, [Function: walk] ]
