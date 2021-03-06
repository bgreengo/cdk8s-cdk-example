import * as cdk8s from 'cdk8s';
import { AlbIngressController, AwsLoadBalancerController } from 'cdk8s-aws-alb-ingress-controller';
import * as constructs from 'constructs';

export interface MyChartV2Props {
  readonly clusterName: string;
}

export class MyChartV2 extends cdk8s.Chart {
  readonly deploymentName: string;
  readonly deploymentNameSpace: string;
  constructor(scope: constructs.Construct, id: string, props: MyChartV2Props) {
    super(scope, id);
    const alb = new AwsLoadBalancerController(this, 'alb', {
      clusterName: props.clusterName,
      createServiceAccount: false,
    });
    this.deploymentName = alb.deploymentName;
    this.deploymentNameSpace = alb.namespace;
  }
}

export interface MyChartV1Props {
  readonly clusterName: string;
  readonly replicas: number;
}

export class MyChartV1 extends cdk8s.Chart {
  readonly deploymentName: string;
  readonly deploymentNameSpace: string;
  constructor(scope: constructs.Construct, id: string, props: MyChartV1Props) {
    super(scope, id);
    const alb = new AlbIngressController(this, 'alb', {
      clusterName: props.clusterName,
      replicas: props.replicas,
    });
    this.deploymentName = alb.deploymentName;
    this.deploymentNameSpace = alb.namespace;
  }
}