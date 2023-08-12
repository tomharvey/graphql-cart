import { util } from '@aws-appsync/utils'

export function request(ctx) {
    const cookieId = ctx.args.cookieId
	return {
		version: '2018-05-29',
		operation: 'PutItem',
		key: {
            PK: {'S': `COOKIE#${cookieId}`},
            SK: {'S': "CART"},
        },

		attributeValues: {
			createdAt: util.dynamodb.toDynamoDB(ctx.args.createdAt),
            cookieId: util.dynamodb.toDynamoDB(ctx.args.cookieId),
		},
	}
}

export function response(ctx) {
	return ctx.result
}
