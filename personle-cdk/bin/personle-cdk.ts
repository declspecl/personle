#!/usr/bin/env node

import * as cdk from "aws-cdk-lib";
import { PersonleCdkStack } from "../lib/personle-cdk-stack";
import { configDotenv } from "dotenv";

configDotenv({ path: ".env.local" });

const app = new cdk.App();
new PersonleCdkStack(app, "PersonleCdkStack", {
	env: { region: "us-east-2" }
});
