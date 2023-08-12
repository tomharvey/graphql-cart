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

export class AppsyncCdkStack extends Stack {
	constructor(scope: Construct, id: string, props?: StackProps) {
		super(scope, id, props)

		// DynamoDB Table
		const DDBTable = new Table(this, 'MDDBTable', {
			partitionKey: { name: 'PK', type: AttributeType.STRING },
			sortKey: { name: 'SK', type: AttributeType.STRING },
			billingMode: BillingMode.PAY_PER_REQUEST,
			removalPolicy: RemovalPolicy.DESTROY,
		})

		// AppSync GraphQL API
		const AppSyncApi = new GraphqlApi(this, 'AppSyncApi', {
			name: 'SingleTableApiCDK',
			schema: SchemaFile.fromAsset(join(__dirname, 'schema.graphql')),
		})

		// AppSync Data Source -> DynamoDB table
		const DDBDataSource = AppSyncApi.addDynamoDbDataSource(
			'DDBDataSource',
			DDBTable
		)

		const getCartFunc = new AppsyncFunction(
			this,
			'getCart',
			{
				name: 'getCart',
				api: AppSyncApi,
				dataSource: DDBDataSource,
				code: Code.fromAsset(
					join(__dirname, '/mappings/Query.getCart.js')
				),
				runtime: FunctionRuntime.JS_1_0_0,
			}
		)

		const createCartActionFunc = new AppsyncFunction(this, 'createCartAction', {
			name: 'createCartAction',
			api: AppSyncApi,
			dataSource: DDBDataSource,
			code: Code.fromAsset(join(__dirname, '/mappings/Mutation.createCartAction.js')),
			runtime: FunctionRuntime.JS_1_0_0,
		})

		const passthrough = InlineCode.fromInline(`
        // The before step
        export function request(...args) {
          console.log(args);
          return {}
        }

        // The after step
        export function response(ctx) {
          return ctx.prev.result
        }
    `)

		const cartResolver = new Resolver(
			this,
			'cartResolver',
			{
				api: AppSyncApi,
				typeName: 'Query',
				fieldName: 'getCart',
				runtime: FunctionRuntime.JS_1_0_0,
				pipelineConfig: [getCartFunc],
				code: passthrough,
			}
		)
		const createCartResolver = new Resolver(this, 'createCartResolver', {
			api: AppSyncApi,
			typeName: 'Mutation',
			fieldName: 'createCart',
			runtime: FunctionRuntime.JS_1_0_0,
			pipelineConfig: [createCartActionFunc],
			code: passthrough,
		})

		const createCartActionResolver = new Resolver(this, 'createCartActionResolver', {
			api: AppSyncApi,
			typeName: 'Mutation',
			fieldName: 'createCartAction',
			runtime: FunctionRuntime.JS_1_0_0,
			pipelineConfig: [createCartActionFunc],
			code: passthrough,
		})
	}
}
