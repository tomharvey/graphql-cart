import { Template } from 'aws-cdk-lib/assertions';
import * as cdk from 'aws-cdk-lib';
import * as AppsyncCdk from '../lib/cart-stack';

test('Testing Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new AppsyncCdk.AppsyncCdkStack(app, 'MyTestStack');
    // THEN
    Template.fromStack(stack).hasResource("AWS::DynamoDB::Table", {})

});
