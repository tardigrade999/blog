import * as cdk from '@aws-cdk/core'
import * as ec2 from "@aws-cdk/aws-ec2"
import * as iam from "@aws-cdk/aws-iam"
import * as s3assets from "@aws-cdk/aws-s3-assets"
import * as keypair from "cdk-ec2-key-pair"
import * as path from "path"
import { generateKeyPair } from 'crypto';

export class InfraStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const vpc = new ec2.Vpc(this, 'MainVpc', {
        maxAzs: 2,
        subnetConfiguration: [
            {
                cidrMask: 24,
                name: 'public-subnet',
                subnetType: ec2.SubnetType.PUBLIC
            },
        ]
    })

    const key = new generateKeyPair.KeyPair(this, "KeyPair", {
        name: "cdk-keypair",
        description: "Key Pair created with CDK Deployment",
    });
    key.grantReadOnPublicKey;

    const securityGroup = new ec2.SecurityGroup(this, "SecurityGroup", {
        vpc,
        description: "Allow SSH (TCP port 22) and HTTP (TCP port 80) in",
        allowAllOutbound: true,
    })

    // Allow SSH access on port tcp/22
    securityGroup.addIngressRule(
        ec2.Peer.anyIpv4(),
        ec2.Port.tcp(22),
        "Allow SSH Access",
    )

    // Allow HTTP access on port tcp/80
    securityGroup.addIngressRule(
        ec2.Peer.anyIpv4(),
        ec2.Port.tcp(80),
        "Allow HTTP Access",
    )

    // Allow HTTPS access on port tcp/443
    securityGroup.addIngressRule(
        ec2.Peer.anyIpv4(),
        ec2.Port.tcp(443),
        "Allow HTTPS Access",
    )

    // IAM role to allow access to other AWS services
    const role = new iam.Role(this, "ec2Role", {
        assumedBy: new iam.ServicePrincipal("ec2.amazonaws.com"),
    });

    // IAM policy attachment to allow access to
    role.addManagedPolicy(
        iam.ManagedPolicy.fromAwsManagedPolicyName(("AmazonSSMManagedInstanceCore"))
    );

    // Look up the AMI Id for the Amazon Linux 2 Image with CPU Type X86_64
    const ami = new ec2.AmazonLinuxImage({
        generation: ec2.AmazonLinuxGeneration.AMAZON_LINUX_2,
        cpuType: ec2.AmazonLinuxCpuType.X86_64,
    });

    // Create the EC2 Instance using the Security Group, AMI, and KeyPair defined
    const ec2Instance = new ec2.Instance(this, "Instance", {
        vpc,
        instanceType: ec2.InstanceType.of(
            ec2.InstanceClass.T2,
            ec2.InstanceSize.MICRO,
        ),
        machineImage: ami,
        securityGroup: securityGroup,
        keyName: key.keyPairName,
        role: role,
    })
  }
}
