export default {
    "name": "TestService",
    "description": "test test ",
    "webHook": {
        "url": "testUrl",
        "method": "POST"
    },
    "environments": [
        {
            "name": "prod",
            "config": {
                "data": "{ \n    \"message\": \"prod config\"\n}",
                "type": "JSON"
            }
        },
        {
            "name": "test",
            "config": {
                "data": "{ \n    \"message\": \"test config\"\n}",
                "type": "JSON"
            }
        },
        {
            "name": "wierd",
            "config": {
                "data": "names:\n    - hen\n    - eyal\n    - ron",
                "type": "YAML"
            }
        }
    ]
}
