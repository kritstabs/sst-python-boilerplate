import requests
import typing

API = 'https://random-data-api.com/api/color/random_color'


def get_random_color() -> typing.Dict:
    response = requests.get(API)

    return response.json()
