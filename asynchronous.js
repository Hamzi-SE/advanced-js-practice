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

asyncFx(1, 2) // returns a promise // state: pending // async task is started	// 2 seconds	// resolve(3)
	.then(result => asyncFx(result, 3)) // returns a promise // state: pending // async task is started	// 2 seconds	// resolve(6)
	.then(result => asyncFx(result, 4)) // returns a promise // state: pending // async task is started	// 2 seconds	// resolve(10)
	.then(result => console.log({ result })) // returns a promise // state: pending // async task is started	// 2 seconds	// resolve(10)
	.catch(error => console.log({ error })) // returns a promise // state: pending // async task is started	// 2 seconds	// resolve(10)
