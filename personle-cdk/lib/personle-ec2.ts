import * as cdk from "aws-cdk-lib";
import { configDotenv } from "dotenv";
import { Construct } from "constructs";
import * as iam from "aws-cdk-lib/aws-iam";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import { Stack, StackProps } from "aws-cdk-lib";

export class PersonleEc2Stack extends Stack {
	constructor(scope: Construct, id: string, props?: StackProps) {
		configDotenv({ path: ".env.local" });

		super(scope, id, {
			...props,
			env: {
				account: process.env.AWS_ACCOUNT_ID,
				region: process.env.AWS_ACCOUNT_REGION
			}
		});

		const defaultVpc = ec2.Vpc.fromLookup(this, "VPC", { isDefault: true });

		const role = new iam.Role(this, "personle-ec2-role", {
			assumedBy: new iam.ServicePrincipal("ec2.amazonaws.com")
		});

		const securityGroup = new ec2.SecurityGroup(this, "personle-sg", {
			vpc: defaultVpc,
			allowAllOutbound: true,
			securityGroupName: "personle-sg"
		});
		securityGroup.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(22));
		securityGroup.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(80));
		securityGroup.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(443));

		const keyPair = ec2.KeyPair.fromKeyPairName(this, "personle-ec2-keypair", "personle-ec2-keypair");

		const instance = new ec2.Instance(this, "personle-ec2-instance", {
			vpc: defaultVpc,
			role: role,
			securityGroup: securityGroup,
			instanceName: "personle-ec2-instance",
			instanceType: ec2.InstanceType.of(ec2.InstanceClass.T2, ec2.InstanceSize.MICRO),
			machineImage: ec2.MachineImage.latestAmazonLinux2023(),
			keyPair: keyPair
		});

		new cdk.CfnOutput(this, "personle-ec2-output", {
			value: instance.instancePublicIp
		});
	}
}
