export default function () {
    return [
        {
            service: "service name",
            environment: "production",
            version: 1,
            data: JSON.stringify({
                url: "somneUrl.com",
            })
        },
        {
            service: "service name",
            environment: "test",
            version: 1,
            data: JSON.stringify({
                url: "outerUrl.com",
            })
        }
    ]
}