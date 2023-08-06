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
		;[this.firstName, this.lastName] = value.split(' ') // array destructuring
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

// ---- Private and protected properties and methods

// private properties and methods are not supported yet, but we can use a convention to make them private
// we can use '_' before the property name to make it private

class CoffeeMachine {
	_waterAmount = 0 // private property

	set waterAmount(value) {
		if (value < 0) throw new Error('Negative water')
		this._waterAmount = value
	}

	get waterAmount() {
		return this._waterAmount
	}

	constructor(power) {
		this._power = power
	}
}

let coffeeMachine = new CoffeeMachine(100)
coffeeMachine.waterAmount = 10
console.log(coffeeMachine.waterAmount) // 10
// coffeeMachine.waterAmount = -10 // Error: Negative water
// coffeeMachine._waterAmount = -20 // we can still access and modify the private property, but it is a bad practice

// ---- Extending a class

// we can extend a class using 'extends' keyword and call the parent constructor using 'super' keyword
// the prototype chain is maintained automatically by the JS engine for us when we extend a class from another class We don't need to set the prototype manually
class Shape {
	constructor(name) {
		this.name = name
	}

	displayShape() {
		return `Shape ${this.name}`
	}
}

class Circle extends Shape {
	// if we don't define a constructor, then the parent constructor is called automatically
	// constructor(...args) {
	// 	super(...args)
	// }

	// if we define a constructor, then we need to call the parent constructor explicitly
	constructor(name, radius) {
		super(name) // call the parent constructor	// super() must be called before using 'this'
		this.radius = radius
	}

	displayCircle() {
		return `Circle ${this.name} with radius ${this.radius}`
	}
}

let circle = new Circle('circle1', 10)
let circle2 = new Circle('circle2', 20)
console.log(circle.displayShape()) // Shape circle1
console.log(circle.displayCircle()) // Circle circle1 with radius 10

console.log(circle instanceof Circle) // true	// circle is an instance of Circle
console.log(circle instanceof Shape) // true	// Circle is derived from Shape
console.log(circle instanceof Object) // true	// all classes are derived from Object

for (let key in circle) {
	console.log(key) // name, radius 	// the methods are not enumerable by default
}

// ---- Static properties and methods

// static properties and methods are not available on the instances, they are available on the class itself
// we can access static properties and methods using the class name
// static properties and methods are used to store the data that is shared by all the instances of the class

class Shape2 {
	constructor(name, area) {
		this.name = name
		this.area = area
	}

	static areEqual(shape1, shape2) {
		return shape1.name === shape2.name && shape1.area === shape2.area
	}

	static staticProperty = 'static property'
}

let shape1 = new Shape2('shape1', 10)
let shape2 = new Shape2('shape1', 10)
console.log(Shape2.areEqual(shape1, shape2)) // true
console.log(Shape2.staticProperty) // static property	// static properties are rarely used

for (let key in Shape2) {
	console.log(key) // staticProperty 	// the static properties are enumerable by default	// static methods are not enumerable by default
}

for (let key in shape1) {
	console.log(key) // name, area 	// the methods are not enumerable by default  // static properties and methods are not available on the instances
}

// ---- # Private properties and methods (New)
// we can use '#' before the property name to make it private

class CoffeeMachine2 {
	#waterAmount = 0 // private property	// only the methods of the class can access this property

	set waterAmount(value) {
		if (value < 0) throw new Error('Negative water')
		this.#waterAmount = value
	}

	get waterAmount() {
		return this.#waterAmount
	}

	constructor(power) {
		this._power = power
	}

	displayWaterAmount() {
		return this.#waterAmount
	}
}

let coffeeMachine2 = new CoffeeMachine2(100)
coffeeMachine2.waterAmount = 10
console.log(coffeeMachine2.waterAmount) // 10
// coffeeMachine2.waterAmount = -10 // Error: Negative water
// coffeeMachine2.#waterAmount = -20 // Error: Cannot access private property
