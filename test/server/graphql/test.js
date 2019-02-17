import { makeExecutableSchema } from 'graphql-tools';
import { graphql } from 'graphql';
import chai from "chai";
import ManagerMock from './mocks';
import typeDefs from '../../../server/schemas';
import resolvers from '../../../server/resolvers';
const expect = chai.expect;

const allServicesTestCase = {
    id: 'Full service list test case',
    query: `
      query {
        service {
            id
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
                    "id": "6",
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
                    "id": "66",
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

describe('Schema', () => {
    const cases = [allServicesTestCase]
    const schema = makeExecutableSchema({
        typeDefs,
        resolvers
    })

    cases.forEach(obj => {
        const { id, query, variables, context, expected } = obj
        it(`query: ${id}`, async () => {
            const result = await graphql(schema, query, null, context, variables)
            expect(result).to.deep.equal(expected)
        })
    })
})