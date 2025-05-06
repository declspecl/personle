import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as s3 from "aws-cdk-lib/aws-s3";
import { execFileSync } from "child_process";
import * as ddb from "aws-cdk-lib/aws-dynamodb";
import { Stack, StackProps } from "aws-cdk-lib";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as apigw from "@aws-cdk/aws-apigatewayv2-alpha";
import * as integrations from "@aws-cdk/aws-apigatewayv2-integrations-alpha";

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

		if (!process.env.HASHING_SECRET_KEY) {
			throw new Error("HASHING_SECRET_KEY environment variable is not set");
		}
		execFileSync("npm", ["run", "package"], {
			cwd: "../personle-lambda",
			stdio: "inherit"
		});
		const personleLambda = new lambda.Function(this, "PersonleLambda", {
            functionName: "PersonleLambda",
			runtime: new lambda.Runtime("nodejs22.x"),
			handler: "dist/main.handler",
			code: lambda.Code.fromAsset("../personle-lambda/function.zip"),
			environment: {
				HASHING_SECRET_KEY: process.env.HASHING_SECRET_KEY
			}
		});
		userGameDataTable.grantReadWriteData(personleLambda);
		dailyPersonasBucket.grantReadWrite(personleLambda);

		const httpApi = new apigw.HttpApi(this, "PersonleHttpApi", {
            apiName: "PersonleHttpApi",
			corsPreflight: {
				allowOrigins: ["https://www.personle.app", "https://personle.app", "http://localhost:5173"],
				allowMethods: [apigw.CorsHttpMethod.GET, apigw.CorsHttpMethod.POST],
				allowHeaders: ["Content-Type"],
				allowCredentials: true
			}
		});

		httpApi.addRoutes({
			path: "/api/daily-guesses",
			methods: [apigw.HttpMethod.GET, apigw.HttpMethod.POST],
			integration: new integrations.HttpLambdaIntegration("PersonleLambdaIntegration", personleLambda)
		});
	}
}
