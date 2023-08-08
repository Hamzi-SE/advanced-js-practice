function sum(a, b) {
	if (a > 0 && b > 0) {
		return [null, a + b] // [error, result]
	} else {
		return ['a and b must be positive', null] // [error, result]
	}
}

let sumAsync = (a, b, cb) => setTimeout(() => cb(...sum(a, b)), 1000) // cb(error, result)

sumAsync(-1, 2, function (error, result) {
	if (error) {
		console.log({ error }) // {error: 'a and b must be positive'}
	} else {
		console.log({ result })
	}
})

// ---- callback hell ----  the
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
