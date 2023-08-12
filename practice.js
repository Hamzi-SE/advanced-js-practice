for (let i = 0; i < 5; i++) {
	setTimeout(() => {
		console.log(i) // 0, 1, 2, 3, 4
	}, 1000)
} // 0 1 2 3 4

for (var i = 0; i < 5; i++) {
	setTimeout(() => {
		console.log(i) // 5, 5, 5, 5, 5
	}, 1000)
} // 5 5 5 5 5 because var is not block scoped and the value of i is 5 when the loop ends

let set = new Set(['143', '42692'])

console.log(set) // Set(2) {"143", "42692"}

let array = Array.from(set)

Array.from(array)

console.log(...array.entries()) // [0, "143"] [1, "42692"]

console.log(Object.fromEntries(array.entries())) // {0: "143", 1: "42692"}

console.log(Object.entries(Object.fromEntries(array.entries()))) // [["0", "143"], ["1", "42692"]]

let object = {
	a: 'abc',
	b: 'bc',
	c: 'cd',
	a: 'abc',
}

let arr = ['abc', 'bc', 'cd', 'abc']

console.log(Object.fromEntries(arr.entries())) // {0: "abc", 1: "bc", 2: "cd"}

console.log(Object.entries(object)) // [["a", "abc"], ["b", "bc"], ["c", "cd"]]

let person = {
	name: 'Hamza',
}

let personAccount = {
	balance: 100000,
}

let m = new Map()

m.set('1', 'str1')
m.set(1, 'num')
m.set(true, 'boolean')
m.set(person, personAccount)

console.log(...m.keys()) // 1 1 true {name: "Hamza"}
console.log(...m.values()) // str1 num boolean {balance: 100000}
console.log(...m.entries()) // ["1", "str1"] [1, "num"] [true, "boolean"] [{name: "Hamza"}, {balance: 100000}]

let m2 = new Map(m.entries())
console.log(m) // Map(4) {"1" => "str1", 1 => "num", true => "boolean", {name: "Hamza"} => {balance: 100000}}
console.log(m2) // Map(4) {"1" => "str1", 1 => "num", true => "boolean", {name: "Hamza"} => {balance: 100000}}
console.log(m == m2) // false
console.log(m.get(person) === m2.get(person)) // true

console.log([...m.keys()]) // ["1", 1, true, {name: "Hamza"}]
console.log([...m.values()]) // ["str1", "num", "boolean", {balance: 100000}]
console.log([...m.entries()]) // [["1", "str1"], [1, "num"], [true, "boolean"], [{name: "Hamza"}, {balance: 100000}]]

let objArr = ['a', 'b', 'c', 'd', 'e']

let obj = Object.fromEntries(objArr.entries())
console.log(obj) // {0: "a", 1: "b", 2: "c", 3: "d", 4: "e"}
console.log(Object.entries(obj)) // [["0", "a"], ["1", "b"], ["2", "c"], ["3", "d"], ["4", "e"]]

let s = new Set(['abc', 'bc', 'cd', 'abc'])
s.add('xyz')

console.log(s) // Set(4) {"abc", "bc", "cd", "xyz"}

console.log(...s.keys()) // abc bc cd xyz
console.log(...s.values()) // abc bc cd xyz
console.log(...s.entries()) // ["abc", "abc"] ["bc", "bc"] ["cd", "cd"] ["xyz", "xyz"]

let weakMap = new WeakMap()
weakMap.set(person, 'as')
console.log(weakMap.get(person)) // as
person = null
console.log(weakMap.get(person)) // undefined

// Generators --> Easy way to create iterator and iterable
function* generatorFunction() {
	yield 1
	yield 'asd'
	yield 3
	yield 'xyz'
	yield 4
}

let generator = generatorFunction()
// --> We can use for of loop to iterate over the generator's yield values
console.log(generator.next()) // {value: 1, done: false}
console.log(generator.next()) // {value: "asd", done: false}
console.log(generator.next()) // {value: 3, done: false}
// --> We can use the spread operator to get all the values of the generator (until the last yield and
// under the hood it uses the next() method so we get undefined value after the last yield)
console.log([...generator]) // ['xyz', 4]
console.log(generator.next()) // {value: undefined, done: true}
console.log(generator.next()) // {value: undefined, done: true}

// Real world example --> Infinite id generator
function* idGenerator() {
	let id = 0
	while (true) {
		yield id // yield is like return but it doesn't stop the function
		id++ // we can also use return but it will stop the function and return the value and done will be true (But the last 'value' will be lost and it will not be returned in the loop)
	}
}

function createId(it) {
	return it.next().value
}

let id = idGenerator()
console.log(createId(id)) // 0
console.log(id.next()) // {value: 1, done: false}
console.log(createId(id)) // 2
console.log(createId(id)) // 3
// OR we can use the generator directly
console.log(id.next().value) // 4
// -------------------------------------------- //

// A little hack :)
// console.log([...id]) // infinite loop

// Generator - composition (yield*)
// Combine multiple generators into one is called generator composition

function* range(start, end) {
	for (let value = start; value <= end; value++) {
		yield value
	}
}

let x = range(10, 13)
console.log(x.next()) // {value: 10, done: false}
console.log(x.next()) // {value: 11, done: false}
console.log(x.next()) // {value: 12, done: false}
console.log(x.next()) // {value: 13, done: false}
console.log(x.next()) // {value: undefined, done: true}

function* multiRange() {
	yield* range(0, 2) // yield* is means yield all the values of the generator
	yield* range(10, 12)
	yield* range(100, 102)
}

let multiGenerator = multiRange()
console.log([...multiGenerator]) // [0, 1, 2, 10, 11, 12, 100, 101, 102]

// Generator can also take inputs	(we can pass the input to the next() method)
function* generatorWithInput() {
	let input = yield 1
	if (input === 1) {
		console.log('1 was passed') // 1 was passed
	}
	console.log(input)
	let input2 = yield 2
	console.log(input2)
	let input3 = yield 3
	console.log(input3)
}

let generator2 = generatorWithInput()
let r1 = generator2.next() // we can't pass the input to the first next() method because it doesn't have any yield
let r2 = generator2.next(r1.value)
let r3 = generator2.next(r2.value)
generator2.next(r3.value)

// ---- Async Iterator ---- //
// Async iterator is an object that implements the AsyncIterator protocol by having a next() method that returns a Promise for an object with the following structure:
{
	let range = {
		start: 0,
		end: 5,
		[Symbol.asyncIterator]() {
			let that = this // we can't use this keyword inside the async function so we have to store it in a variable
			let i = this.start
			return {
				next: async function () {
					await new Promise(resolve => setTimeout(resolve, 1000))
					return { value: i, done: i++ > that.end }
				},
			}
		},
	}

	;(async function () {
		// IIFE	// async function is used to use await keyword
		for await (let value of range) {
			// for await of loop is used to iterate over async data
			console.log(value) // 0 1 2 3 4 5
		}
	})()
}

// ---- Async Generator ---- //
// Async generator is a function that returns an Async Iterator
{
	let range = {
		start: 0,
		end: 5,
		async *[Symbol.asyncIterator]() {
			for (let i = this.start; i <= this.end; i++) {
				await new Promise(resolve => setTimeout(resolve, 1000))
				yield i
			}
		},
	}

	;(async function () {
		// IIFE	// async function is used to use await keyword
		for await (let value of range) {
			// for await of loop is used to iterate over async data
			console.log(value) // 0 1 2 3 4 5
		}
	})()
}
