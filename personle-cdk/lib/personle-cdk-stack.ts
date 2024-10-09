import * as ddb from "aws-cdk-lib/aws-dynamodb";
import { Construct } from "constructs";
import { Stack, StackProps } from "aws-cdk-lib";

export class PersonleCdkStack extends Stack {
	constructor(scope: Construct, id: string, props?: StackProps) {
		super(scope, id, props);

		const userGameDataTable = new ddb.Table(this, "UserGameData", {
			tableName: "UserGameData",
			partitionKey: {
				name: "userSessionId",
				type: ddb.AttributeType.STRING
			},
			sortKey: {
				name: "sk",
				type: ddb.AttributeType.STRING
			}
		});
	}
}
