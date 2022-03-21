from aws_lambda_powertools.event_handler import APIGatewayHttpResolver

from myhelper.colors import get_random_color

app = APIGatewayHttpResolver()


# main lambdas entry point
def lambda_handler(event, context):
    return app.resolve(event, context)


@app.get('/random-code')
def random_code_view():
    color = get_random_color()

    return color
