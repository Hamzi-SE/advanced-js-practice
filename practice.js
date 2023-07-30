for (let i = 0; i < 5; i++) {
	setTimeout(() => {
		console.log(i)
	}, 1000)
} // 0 1 2 3 4

for (var i = 0; i < 5; i++) {
	setTimeout(() => {
		console.log(i)
	}, 1000)
} // 5 5 5 5 5 because var is not block scoped and the value of i is 5 when the loop ends

let set = new Set(['143', '42692'])

console.log(set)

let array = Array.from(set)

Array.from(array)

console.log(...array.entries())

console.log(Object.fromEntries(array.entries()))

console.log(Object.entries(Object.fromEntries(array.entries())))

let object = {
	a: 'abc',
	b: 'bc',
	c: 'cd',
	a: 'abc',
}

let arr = ['abc', 'bc', 'cd', 'abc']

console.log(Object.fromEntries(arr.entries()))

console.log(Object.entries(object))

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

console.log(...m.keys())
console.log(...m.values())
console.log(...m.entries())

let m2 = new Map(m.entries())
console.log(m)
console.log(m2)
console.log(m == m2)
console.log(m.get(person) === m2.get(person))

console.log([...m.keys()])
console.log([...m.values()])
console.log([...m.entries()])

let objArr = ['a', 'b', 'c', 'd', 'e']

let obj = Object.fromEntries(objArr.entries())
console.log(obj)
console.log(Object.entries(obj))

let s = new Set(['abc', 'bc', 'cd', 'abc'])
s.add('xyz')

console.log(s)

console.log(...s.keys())
console.log(...s.values())
console.log(...s.entries())

let weakMap = new WeakMap()
weakMap.set(person, 'as')
console.log(weakMap.get(person))
person = null
console.log(weakMap.get(person))

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
console.log(generator.next())
console.log(generator.next())
console.log(generator.next())
// --> We can use the spread operator to get all the values of the generator (until the last yield and
// under the hood it uses the next() method so we get undefined value after the last yield)
console.log([...generator])
console.log(generator.next())
console.log(generator.next())

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
console.log(createId(id))
console.log(id.next())
console.log(createId(id))
console.log(createId(id))
// OR we can use the generator directly
console.log(id.next().value)
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
console.log(x.next())
console.log(x.next())
console.log(x.next())
console.log(x.next())
console.log(x.next())

function* multiRange() {
	yield* range(0, 2) // yield* is means yield all the values of the generator
	yield* range(10, 12)
	yield* range(100, 102)
}

let multiGenerator = multiRange()
console.log([...multiGenerator])

// Generator can also take inputs	(we can pass the input to the next() method)
function* generatorWithInput() {
	let input = yield 1
	if (input === 1) {
		console.log('1 was passed')
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
