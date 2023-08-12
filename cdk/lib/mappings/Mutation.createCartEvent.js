import { util } from '@aws-appsync/utils'

export function request(ctx) {
	const cookieId = ctx.args.cookieId
	const createdAt = ctx.args.createdAt
	return {
		version: '2018-05-29',
		operation: 'PutItem',
		key: {
			PK: {'S': `COOKIE#${cookieId}`},
			SK: {'S': `CARTEVENT#${createdAt}`}
		},

		attributeValues: {
			action: util.dynamodb.toDynamoDB(ctx.args.action),
			cookieId: util.dynamodb.toDynamoDB(ctx.args.cookieId),
			createdAt: util.dynamodb.toDynamoDB(ctx.args.createdAt),
			photoId: util.dynamodb.toDynamoDB(ctx.args.photoId),
			productId: util.dynamodb.toDynamoDB(ctx.args.productId),
			quantity: util.dynamodb.toDynamoDB(ctx.args.quantity),
		},
	}
}

export function response(ctx) {
	return ctx.result
}
