import { Construct } from 'constructs';
import { App, Chart } from 'cdk8s';
// imported constructs
import { Deployment, Service, IntOrString, Namespace } from './imports/k8s';

export class MyChart extends Chart {
  constructor(scope: Construct, name: string) {
    super(scope, name);

    // define resources here
    const hellolabel = { app: 'try-cdk8s-typescript'};

    //const helloworldnamespace =
    new Namespace(this, 'namespace-helloworld', {
    });

    //const myservice = 
    new Service(this, 'myservice', {
      spec: {
        type: 'LoadBalancer',
        ports: [{ port: 80, targetPort: IntOrString.fromNumber(8080)}],
        selector: hellolabel,
      }
    });

    // const mydeployment =
    new Deployment(this, 'mydeployment', {
      spec: {
        replicas: 2,
        selector: {
          matchLabels: hellolabel
        },
        template: {
          metadata: { labels: hellolabel },
          spec: {
            containers: [
              {
                name: 'hello-kubernetes',
                image: 'paulbouwer/hello-kubernetes:1.7',
                ports: [{ containerPort: 8080 }]
              }
            ]
          }
        }
      }
    });

  }
}

const app = new App();
new MyChart(app, 'try-cdk8s-typescript');
app.synth();
