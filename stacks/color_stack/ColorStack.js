import * as sst from '@serverless-stack/resources'
import { PythonLayerVersion } from '@aws-cdk/aws-lambda-python-alpha'
import { Runtime } from 'aws-cdk-lib/aws-lambda'

export default class ColorStack extends sst.Stack {
  constructor(scope, id, props) {
    super(scope, id, props)

    const myLayer = new PythonLayerVersion(this, 'MyLayer', {
      entry: 'layers/myhelper/src/',
      compatibleRuntimes: [Runtime.PYTHON_3_9],
    })

    const api = new sst.Api(this, 'Api', {
      routes: {
        // $default - catch all route
        $default: {
          function: {
            srcPath: 'stacks/color_stack/lambdas/color_api/',
            handler: 'handler.lambda_handler',
            timeout: 10,
            runtime: 'python3.9',
            // do not attach lambda layer when `sst start` because locally SST runs all lambda functions in nodejs
            // and nodejs is not compatible with PythonLayerVersion
            layers: !process.env.IS_LOCAL ? [myLayer] : [],
          },
        },
      },
    })

    // Show the endpoint in the output
    this.addOutputs({
      ApiEndpoint: api.url,
    })
  }
}
