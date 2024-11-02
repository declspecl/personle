#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { PersonleCdkStack } from "../lib/personle-cdk-stack";
import { PersonleEc2Stack } from "../lib/personle-ec2";

const app = new cdk.App();
new PersonleCdkStack(app, "PersonleCdkStack", {
	env: { region: "us-east-2" }
});
new PersonleEc2Stack(app, "PersonleEc2Stack", {
	env: { region: "us-east-2" }
});
