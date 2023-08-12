import { RemovalPolicy, Stack, StackProps } from 'aws-cdk-lib'
import { Construct } from 'constructs'
import { Table, BillingMode, AttributeType } from 'aws-cdk-lib/aws-dynamodb'
import {
	AppsyncFunction,
	Code,
	FunctionRuntime,
	GraphqlApi,
	InlineCode,
	Resolver,
	SchemaFile,
} from 'aws-cdk-lib/aws-appsync'
import { join } from 'path'

export class CartStack extends Stack {
	constructor(scope: Construct, id: string, props?: StackProps) {
		super(scope, id, props)

		// DynamoDB Table
		const dyanamoDbTable = new Table(this, 'Table', {
			partitionKey: { name: 'PK', type: AttributeType.STRING },
			sortKey: { name: 'SK', type: AttributeType.STRING },
			billingMode: BillingMode.PAY_PER_REQUEST,
			removalPolicy: RemovalPolicy.DESTROY,
		})

		// AppSync GraphQL API
		const AppSyncApi = new GraphqlApi(this, 'AppSyncApi', {
			name: 'CartApi',
			schema: SchemaFile.fromAsset(join(__dirname, 'schema.graphql')),
		})

		// AppSync Data Source -> DynamoDB table
		const DDBDataSource = AppSyncApi.addDynamoDbDataSource(
			'DDBDataSource',
			dyanamoDbTable
		)

		// const passthrough = InlineCode.fromInline(`
		// 	// The before step
		// 	export function request(...args) {
		// 	console.log(args);
		// 	return {}
		// 	}

		// 	// The after step
		// 	export function response(ctx) {
		// 	return ctx.prev.result
		// 	}
		// `)

		const getCartFunc = new AppsyncFunction(this, 'getCart', {
			name: 'getCart',
			api: AppSyncApi,
			dataSource: DDBDataSource,
			code: Code.fromAsset(
				join(__dirname, '/mappings/Query.getCart.js')
			),
			runtime: FunctionRuntime.JS_1_0_0,
		})
		new Resolver(this, 'getCartResolver', {
			api: AppSyncApi,
			typeName: 'Query',
			fieldName: 'getCart',
			pipelineConfig: [getCartFunc],
			runtime: FunctionRuntime.JS_1_0_0,
			code: Code.fromAsset(
				join(__dirname, '/mappings/Resolver.passthrough.js')
			),
		})

		const createCartFunc = new AppsyncFunction(this, 'createCartFunc', {
			name: 'createCart',
			api: AppSyncApi,
			dataSource: DDBDataSource,
			code: Code.fromAsset(join(__dirname, '/mappings/Mutation.createCart.js')),
			runtime: FunctionRuntime.JS_1_0_0,
		})
		new Resolver(this, 'createCartResolver', {
			api: AppSyncApi,
			typeName: 'Mutation',
			fieldName: 'createCart',
			pipelineConfig: [createCartFunc],
			runtime: FunctionRuntime.JS_1_0_0,
			code: Code.fromAsset(
				join(__dirname, '/mappings/Resolver.passthrough.js')
			),
		})

		const createCartEventFunc = new AppsyncFunction(this, 'createCartEventFunc', {
			name: 'createCartEvent',
			api: AppSyncApi,
			dataSource: DDBDataSource,
			code: Code.fromAsset(join(__dirname, '/mappings/Mutation.createCartEvent.js')),
			runtime: FunctionRuntime.JS_1_0_0,
		})
		new Resolver(this, 'createCartEventResolver', {
			api: AppSyncApi,
			typeName: 'Mutation',
			fieldName: 'createCartEvent',
			pipelineConfig: [createCartEventFunc],
			runtime: FunctionRuntime.JS_1_0_0,
			code: Code.fromAsset(
				join(__dirname, '/mappings/Resolver.passthrough.js')
			),
		})
	}
}
