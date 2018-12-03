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
        },
        {
            name: "other service",
            discretion: "some  otuer discretion for your services",
            id: "123",
            environments: [
                {
                    name: "production",
                    configs: [
                        {
                            version: 1,
                            data: JSON.stringify({
                                url: "out234erUrl1.com",
                            })
                        },
                        {
                            version: 2,
                            data: JSON.stringify({
                                url: "ou434terUrl.com",
                            })
                        }]
                },
                {
                    name: "test",
                    configs: [{
                        version: 1,
                        data: JSON.stringify({
                            url: "somn34eUrl.com",
                        })
                    }]
                }
            ]
        },
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
        },
        {
            name: "hen other service",
            discretion: "some  otuer discretion for your services",
            id: "123",
            environments: [
                {
                    name: "production",
                    configs: [
                        {
                            version: 1,
                            data: JSON.stringify({
                                url: "out234erUrl1.com",
                            })
                        },
                        {
                            version: 2,
                            data: JSON.stringify({
                                url: "ou434terUrl.com",
                            })
                        }]
                },
                {
                    name: "test",
                    configs: [{
                        version: 1,
                        data: JSON.stringify({
                            url: "somn34eUrl.com",
                        })
                    }]
                }
            ]
        }
    ]
}