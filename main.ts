import { Construct } from 'constructs';
import { App, Chart } from 'cdk8s';

export class MyChart extends Chart {
  constructor(scope: Construct, name: string) {
    super(scope, name);

    // define resources here

  }
}

const app = new App();
new MyChart(app, 'try-cdk8s-typescript');
app.synth();