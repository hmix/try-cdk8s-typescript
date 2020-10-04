import { Construct } from 'constructs';
import { App, Chart } from 'cdk8s';
import { WebService } from './lib/web-service';

export class MyChart extends Chart {
  constructor(scope: Construct, ns: string) {
    super(scope, ns);

    new WebService(this, 'hello', {
      image: 'paulbouwer/hello-kubernetes:1.7',
      replicas: 10
    });

    new WebService(this, 'ghost', {
      image: 'ghost',
      containerPort: 4666
    });

  }
}

const app = new App();
new MyChart(app, 'try-cdk8s-typescript');
app.synth();
