// classes are a syntactic sugar for the prototype-based inheritance

class User {
	constructor(firstName, lastName) {
		this.firstName = firstName
		this.lastName = lastName
	}

	// getter and setter are not methods, they are properties
	get fullName() {
		// getter
		return `${this.firstName} ${this.lastName}`
	}

	set fullName(value) {
		// setter
		[this.firstName, this.lastName] = value.split(' ') // array destructuring
	}
}

let user = new User('John', 'Doe')
console.log(user.fullName) // John Doe     // getter is called
console.log(user.firstName) // John
console.log(user.lastName) // Doe

user.fullName = 'Jack Sparrow' // setter is called
console.log(user.fullName) // Jack Sparrow
console.log(user.firstName) // Jack
console.log(user.lastName) // Sparrow

// ---- Computed property names

// we can use square brackets in any method to create it a computed property name

let variableName = 'hello'
class Car {
	constructor(name) {
		this.name = name
	}

	[variableName]() {
		// computed property name   // the value of variableName is used as the method name
		return this.name
	}
}

let car = new Car('BMW')
console.log(car.hello()) // BMW

// ---- 'this' binding issue

class Button {
	constructor(value) {
		this.value = value
	}

	click() {
		console.log(this.value)
		return this.value
	}
}

let button = new Button('play')

console.log(button.click()) // play

setTimeout(button.click, 1000) // undefined    // 'this' is lost here because setTimeout runs asynchrounously so the context is lost

// we can fix this by using bind
setTimeout(button.click.bind(button), 1000) // play

// or by using arrow function   // arrow functions don't have their own 'this', they use the 'this' of the outer function
setTimeout(() => button.click(), 1000) // play

// Also we can add this arrow style function in class definition - which will act as class field
class Button2 {
	constructor(value) {
		this.value = value
	}

	click = () => {
		// this is a class field
		console.log(this.value)
		return this.value
	}
}

let button2 = new Button2('pause')
console.log(button2.click()) // pause
setTimeout(button2.click, 1000) // pause
