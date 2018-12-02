export default function (obj, args) {
    return [
        {
            name: "service name",
            discretion: "some discretion for your services",
            id: "123465",
            environments: [
                {
                    name: "production",
                    configs: [
                        {
                            version: 1,
                            data: JSON.stringify({
                                url: "outerUrl1.com",
                            })
                        },
                        {
                            version: 2,
                            data: JSON.stringify({
                                url: "outerUrl.com",
                            })
                        }]
                },
                {
                    name: "test",
                    configs: [{
                        version: 1,
                        data: JSON.stringify({
                            url: "somneUrl.com",
                        })
                    }]
                }
            ]
        }
    ]
}