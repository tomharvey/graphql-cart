export function request(ctx) {
	const pk = "COOKIE#" + ctx.args.cookieId
	return {
		version: '2017-02-28',
		operation: 'Query',
		query: {
			expression: 'PK = :pk',
			expressionValues: {
				':pk': {'S': pk},
			},
		},
	}
}

export function response(ctx) {
	const cartEvents = []
	let cookieId
	let createdAt

	for (let item of ctx.result.items) {
		const itemClassType = item['SK'].split("#")[0]
		if (itemClassType === 'CART') {
			cookieId = item['cookieId']
			createdAt = item['createdAt']
		}
		if (itemClassType === 'CARTEVENT') {
			cartEvents.push(item)
		}
	}

	return {
		cookieId,
		createdAt,
		cartEvents,
	}
}
