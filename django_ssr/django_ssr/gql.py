import requests
import json

def remove_spaces(string):
    return string.lstrip().rstrip()

def to_graphql(string):
    string_as_array = [remove_spaces(x) for x in string.splitlines()
                       if remove_spaces(x)]
    return "\n".join(string_as_array) + "\n"


class GraphQLClient:
    def __init__(self, endpoint):
        self.endpoint = endpoint
        self.token = None

    def execute(self, query, variables=None, operationName=None):
        return self._send(query, variables, operationName)

    def inject_token(self, token):
        self.token = token

    def _send(self, query, variables, operationName):
        data = {'query': to_graphql(query),
                'operationName': operationName,
                'variables': variables}
        headers = {'Accept': 'application/json',
                   'Content-Type': 'application/json'}
        if self.token is not None:
            headers['Authorization'] = 'Bearer %s' % self.token
        req = requests.post(
            self.endpoint, data=json.dumps(data), headers=headers)
        req.raise_for_status()
        return req.json()
