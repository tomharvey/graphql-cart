import { util } from '@aws-appsync/utils'

export function request(ctx) {
	return {
		version: '2018-05-29',
		operation: 'PutItem',
		key: {
			PK: util.dynamodb.toDynamoDB(ctx.args.PK),
			SK: util.dynamodb.toDynamoDB(ctx.args.SK),
		},

		attributeValues: {
			action: util.dynamodb.toDynamoDB(ctx.args.action),
			photoId: util.dynamodb.toDynamoDB(ctx.args.photoId),
			productId: util.dynamodb.toDynamoDB(ctx.args.productId),
			quantity: util.dynamodb.toDynamoDB(ctx.args.quantity),
			time: util.dynamodb.toDynamoDB(ctx.args.time),
			type: util.dynamodb.toDynamoDB(ctx.args.type),
		},
	}
}

export function response(ctx) {
	return ctx.result
}
