function sum(a, b) {
	if (a > 0 && b > 0) {
		return [null, a + b] // [error, result]
	} else {
		return ['a and b must be positive', null] // [error, result]
	}
}

let sumAsync = (a, b, cb) => setTimeout(() => cb(...sum(a, b)), 1000) // cb(error, result)	... will spread the array

sumAsync(-1, 2, function (error, result) {
	if (error) {
		console.log({ error }) // {error: 'a and b must be positive'}
	} else {
		console.log({ result })
	}
})

// ---- callback hell OR pyramid of doom -----  // the code is not readable
sumAsync(1, 2, function (error, result) {
	if (error) {
		console.log({ error })
	} else {
		sumAsync(result, 3, function (error, result) {
			if (error) {
				console.log({ error })
			} else {
				sumAsync(result, 4, function (error, result) {
					if (error) {
						console.log({ error })
					} else {
						console.log({ result }) // { result: 10 }     // 1 + 2 + 3 + 4    // takes 3 seconds
					}
				})
			}
		})
	}
})

// ---- Promise ---- // the code is readable
//  Promise is an object that may produce a single value some time in the future: either a resolved value, or a reason that it’s not resolved (e.g., a network error occurred).
//  A promise may be in one of 3 possible states: fulfilled, rejected, or pending.
//  Promise users can attach callbacks to handle the fulfilled value or the reason for rejection.

// Promise are based on Publish–subscribe pattern

// Example: Youtube video release notification
// 1. Publisher: Youtube channel
// 2. Subscriber: User who subscribed to the channel
// 3. Event: Video release
// 4. Event Handler: User who subscribed to the channel will get notified when the video is released

// Example: Promise
// 1. Publisher/Provider: Promise
// 2. Subscriber/Consumer: then() and catch()
// 3. Event: resolve() and reject()
// 4. Event Handler: then() and catch()

let promise = new Promise(function (resolve, reject) {
	// async task is inside this function
	// resolve() and reject() are two functions provided by JS
	// resolve(data) is called when the async task is completed successfully
	// reject(error) is called when the async task is failed
})

// promise.then(successCallback).catch(errorCallback)   // successCallback is called when resolve() is called and errorCallback is called when reject() is called

// promise is an object that has two methods: then() and catch() and a property: state
// the promise instance is returned as soon as the promise is created with state: pending
// then() is a listener for the resolve event and is called when the promise is resolved with state: fulfilled
// catch() is a listener for the reject event and is called when the promise is rejected with state: rejected

// Example: Promise (previous example)
function sum(a, b) {
	if (a > 0 && b > 0) {
		return [null, a + b] // [error, result]
	} else {
		return ['a and b must be positive', null] // [error, result]
	}
}

let asyncFx = (a, b) =>
	new Promise((resolve, reject) => {
		setTimeout(() => {
			let [error, result] = sum(a, b)
			if (error) {
				reject(error)
			} else {
				resolve(result)
			}
		}, 2000)
	})

let p = asyncFx(1, 2) // p is a promise instance with state: pending

// after 2 seconds, the promise is resolved with state: fulfilled
p.then(function (data) {
	console.log({ data }) // { data: 3 }
	// asyncFx(data, 10).then()	// this will become same as callback hell problem // this is an anti-pattern	// nested promise is an anti-pattern	// use promise chaining instead
	return asyncFx(data, 10) // return a promise instance	// this will be resolved after 2 seconds	// recommended	// this will only go one level deep and not become callback hell
})
	.then(function (data) {
		console.log({ data }) // { data: 13 }
		return asyncFx(data, 20)
	})
	.then(function (data) {
		console.log({ data }) // { data: 33 }
		return asyncFx(data, 40)
	})
	.then(function (data) {
		console.log({ data }) // { data: 73 }
	})
	.catch(function (error) {
		// this catch() will handle the error from any of the promise in the chain	// this catch() will only be called when any of the promise in the chain is rejected	// this catch() is common for all the promises in the chain
		console.log({ error })
	})
	.finally(function () {
		// this finally() will always be called at the end of the promise chain whether the promise is resolved or rejected
		console.log('finally')
	})

// ---- Promise API ----
// Promise is a constructor function
// Promise has some static methods (methods that are called on the constructor function itself) and some instance methods (methods that are called on the promise instance)

//

// Promise.all()	// takes an array of promises and returns a promise instance
// Example: Promise.all()
{
	let pa = Promise.all([asyncFx(1, 3), asyncFx(5, 9), asyncFx(11, 14)]) // pa is a promise instance with state: pending	// the promise is resolved after the last promise is resolved	// the promise is rejected if any of the promise is rejected
	// pa will execute all the promises in parallel and will wait for all the promises to be resolved or any of the promise to be rejected
	// when the promise is resolved, the data is an array of results from all the promises
	pa.then(function (data) {
		console.log({ data }) // { data: [4, 14, 25] }	// data is an array of results
	}).catch(function (error) {
		console.log({ error }) // this will not be called
	})
}

// Example: Promise.all() with reject
{
	let pa = Promise.all([asyncFx(1, 3), asyncFx(-5, 9), asyncFx(11, 14)]) // pa is a promise instance with state: pending

	pa.then(function (data) {
		console.log({ data }) // this will not be called
	}).catch(function (error) {
		console.log({ error }) // { error: 'a and b must be positive' }	// error is the first error in the array of promises
	})
}

// Promise.allSettled()	// takes an array of promises and returns a promise instance	// this is similar to Promise.all() but it will not reject the promise if any of the promise is rejected	// this will always resolve the promise	// this will return an array of objects with status and value properties	// status is either fulfilled or rejected	// value is the result or error
// Example: Promise.allSettled()
{
	let pa = Promise.allSettled([asyncFx(1, 3), asyncFx(-5, 9), asyncFx(11, 14)]) // pa is a promise instance with state: pending

	pa.then(function (data) {
		console.log({ data }) // { data: [ { status: 'fulfilled', value: 4 }, { status: 'rejected', reason: 'a and b must be positive' }, { status: 'fulfilled', value: 25 } ] }
	}).catch(function (error) {
		console.log({ error }) // this will not be called
	})
}

// Promise.race()	// takes an array of promises and returns a promise instance // this gives the first result whether resolved or rejected	// this will resolve the promise as soon as any of the promise is resolved	// this will reject the promise as soon as any of the promise is rejected

// Promise.any()	// takes an array of promises and returns a promise instance // this gives the first resolve result	// this will resolve the promise as soon as any of the promise is resolved	// this will reject the promise only when all the promises are rejected
// Example Promise.any()
{
	let pa = Promise.any([asyncFx(1, -3), asyncFx(-5, 9), asyncFx(11, 14)]) // pa is a promise instance with state: pending

	pa.then(function (data) {
		console.log({ data }) // { data: 25 }	// this will give the first resolve result
	}).catch(function (error) {
		console.log({ error }) // this will not be called
	})
}

// Promise.resolve()	// takes a value and returns a promise instance	// this will resolve the promise with the value passed	// this is useful when we want to return a promise instance from a function that returns a value
// Example: Promise.resolve()
// let p = Promise.resolve(10)	// p is a promise instance with state: fulfilled	// p.then() will be called immediately

// Promise.reject()	// takes a value and returns a promise instance	// this will reject the promise with the value passed	// this is also useful when we want to return a promise instance from a function that returns an error
// Example: Promise.reject()
// let p = Promise.reject(10)	// p is a promise instance with state: rejected	// p.catch() will be called immediately

// ---- async/await ----
// async/await is a syntactic sugar for promise
// async keyword makes every function return a promise
// await keyword makes the function wait for the promise to be resolved or rejected

// Example: async/await
{
	async function add(a, b) {
		return a + b
	}
	let p = add(1, 2) // p is a promise instance with state: pending	// p.then() will be called immediately
	p.then(function (data) {
		console.log({ data }) // { data: 3 }
	}).catch(function (error) {
		console.log({ error }) // this will not be called
	})
}

// Example: async/await with promise
{
	async function test() {
		// we can see the code is much cleaner than promise chain
		let data = await asyncFx(1, 3) // this will wait for the promise to be resolved or rejected	// this will return the result of the promise
		console.log({ data }) // { data: 4 }
		data = await asyncFx(data, 5) // this will wait for the promise to be resolved or rejected	// this will return the result of the promise
		console.log({ data }) // { data: 9 }
		data = await asyncFx(data, -5) // this will wait for the promise to be resolved or rejected	// this will return the result of the promise
		console.log({ data }) // this will not be called

		// if we want to catch the error, we can use try/catch

		// we can use every promise method with async/await

		// await Promise.all(), await Promise.race() etc.

		// this will wait for every consequent promise to be resolved or rejected before moving to the next line

		// so if we want to run the promises in parallel, we can use Promise.all()

		// await Promise.all([asyncFx(1, 3), asyncFx(5, 9), asyncFx(11, 14)])	// this will run the promises in parallel
	}

	test()
}

// Example: async/await with promise and try/catch
{
	async function test() {
		try {
			let data = await asyncFx(1, 3) // this will wait for the promise to be resolved or rejected	// this will return the result of the promise
			console.log({ data }) // { data: 4 }
			data = await asyncFx(data, 5) // this will wait for the promise to be resolved or rejected	// this will return the result of the promise
			console.log({ data }) // { data: 9 }
			data = await asyncFx(data, -5) // this will wait for the promise to be resolved or rejected	// this will return the result of the promise
			console.log({ data }) // this will not be called
		} catch (error) {
			// this will catch the error of the first rejected promise	// if we want to catch the error of every promise, we can use try/catch inside the function	// we can also use Promise.allSettled() to catch every error
			console.log({ error }) // { error: 'a and b must be positive' }
		}
	}

	test()
}
