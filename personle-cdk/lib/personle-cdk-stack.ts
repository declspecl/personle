import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as ddb from "aws-cdk-lib/aws-dynamodb";
import { Stack, StackProps } from "aws-cdk-lib";
import * as apigw from "@aws-cdk/aws-apigatewayv2-alpha";
import * as integrations from "@aws-cdk/aws-apigatewayv2-integrations-alpha";
import * as lambda from "aws-cdk-lib/aws-lambda";
import { execFileSync } from "child_process";

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

		execFileSync("npm", ["run", "package"], {
			cwd: "../personle-lambda",
			stdio: "inherit"
		});
		const personleLambda = new lambda.Function(this, "PersonleLambda", {
            functionName: "PersonleLambda",
			runtime: new lambda.Runtime("nodejs22.x"),
			handler: "dist/main.handler",
			code: lambda.Code.fromAsset("../personle-lambda/function.zip")
		});
		userGameDataTable.grantReadWriteData(personleLambda);
		dailyPersonasBucket.grantReadWrite(personleLambda);

		const httpApi = new apigw.HttpApi(this, "PersonleHttpApi", {
            apiName: "PersonleHttpApi",
			corsPreflight: {
				allowOrigins: ["*"],
				allowMethods: [apigw.CorsHttpMethod.GET, apigw.CorsHttpMethod.POST],
				allowHeaders: ["*"]
			}
		});

		httpApi.addRoutes({
			path: "/api/daily-guesses",
			methods: [apigw.HttpMethod.GET, apigw.HttpMethod.POST],
			integration: new integrations.HttpLambdaIntegration("PersonleLambdaIntegration", personleLambda)
		});
	}
}
