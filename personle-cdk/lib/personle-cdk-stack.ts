import { Construct } from "constructs";
import * as cdk from "aws-cdk-lib";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as ddb from "aws-cdk-lib/aws-dynamodb";
import { Stack, StackProps } from "aws-cdk-lib";

export class PersonleCdkStack extends Stack {
	constructor(scope: Construct, id: string, props?: StackProps) {
		super(scope, id, props);

		const userGameDataTable = new ddb.Table(this, "UserGameData", {
			tableName: "UserGameData",
			partitionKey: {
				name: "pk",
				type: ddb.AttributeType.STRING
			},
			sortKey: {
				name: "sk",
				type: ddb.AttributeType.STRING
			},
			billingMode: ddb.BillingMode.PAY_PER_REQUEST,
			removalPolicy: cdk.RemovalPolicy.DESTROY
		});

		const dailyPersonasBucket = new s3.Bucket(this, "DailyPersonas", {
			bucketName: "daily-personas",
			encryption: s3.BucketEncryption.S3_MANAGED,
			accessControl: s3.BucketAccessControl.PRIVATE,
			removalPolicy: cdk.RemovalPolicy.DESTROY,
			autoDeleteObjects: true
		});
	}
}
