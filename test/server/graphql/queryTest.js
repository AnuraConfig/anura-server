import { makeExecutableSchema } from 'graphql-tools';
import { graphql } from 'graphql';
import chai from "chai";
import ManagerMock from './mocks';
import typeDefs from '../../../server/schemas';
import resolvers from '../../../server/resolvers';
const expect = chai.expect;

const allServicesTestCase = {
    id: 'Full service list',
    query: `
      query {
        service {
            name
            description
            environments {
              name,
              configs {
                version,
                data,
                type
              }
            }
        }
      }
    `,
    variables: {},

    // Injecting the
    context: {
        dataSources: new ManagerMock()
    },

    // Expected result
    expected: {
        data: {
            service: [{
                    "name": "name6",
                    "description": "desc6",
                    "environments": [{
                        "name": "env",
                        "configs": [{
                            'version': 1,
                            'data': '{}',
                            'type': 'json'
                        }]
                    }]
                },
                {
                    "name": "name66",
                    "description": null,
                    "environments": [{
                        "name": "env2",
                        "configs": [{
                            'version': 2,
                            'data': '{a}',
                            'type': 'json'
                        }]
                    }]
                }
            ]
        }
    }
}

const getConfigsTestCase = {
    id: 'get Configs',
    query: `
    query Env($serviceName: String, $envName: String){
        getConfigs(serviceName: $serviceName, environment: $envName, raw: true){
        name
        configs {
          data
          type
          version
        }
      }
    }
    `,
    variables: {serviceName: '6', envName: 'env6'},

    // Injecting the
    context: {
        dataSources: new ManagerMock()
    },

    // Expected result
    expected: {
        data: {
            "getConfigs": {
                "name": "env6",
                "configs": [{
                    'version': 0,
                    'data': '{test}',
                    'type': 'YAML'
                }]
            }
        }
    }
}


describe('Schema query', () => {
    const cases = [allServicesTestCase, getConfigsTestCase]
    const schema = makeExecutableSchema({
        typeDefs,
        resolvers
    })

    cases.forEach(obj => {
        const { id, query, variables, context, expected } = obj
        it(id, async () => {
            const result = await graphql(schema, query, null, context, variables)
            expect(result).to.deep.equal(expected)
        })
    })
})