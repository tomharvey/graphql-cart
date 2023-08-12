import { util } from '@aws-appsync/utils'

export function request(ctx) {
	return {
		version: '2017-02-28',
		operation: 'Query',
		query: {
			expression: 'PK = :pk',
			expressionValues: {
				':pk': util.dynamodb.toDynamoDB(ctx.args.PK),
			},
		},
	}
}

export function response(ctx) {
	const cartActions = []
	let PK, SK, type

	for (let item of ctx.result.items) {
		if (item.type === 'cart') {
			PK = item['PK']
			SK = item['SK']
			type = item['type']
		}
		if (item.type === 'cartAction') {
			cartActions.push(item)
		}
	}

	return {
		PK,
		SK,
		cartActions,
		type,
	}
}
