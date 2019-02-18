import { makeExecutableSchema } from 'graphql-tools';
import { graphql } from 'graphql';
import chai from "chai";
import ManagerMock from './mocks';
import typeDefs from '../../../server/schemas';
import resolvers from '../../../server/resolvers';
const expect = chai.expect;

const newServiceTestCase = {
    id: 'New service',
    query: `
    mutation AddService($service:InputService!){
        newService(service:$service){
          success,
          error
        }
      }
    `,
    variables: {
        service: {
            name: "name6",
            description: "description6",
            environments: [{
                    name: "env1",
                    config: {
                        data: "data1",
                        type: "JSON"
                    }
                },
                {
                    name: "env2",
                    config: {
                        data: "data2",
                        type: "YAML"
                    }
                }
            ]
        }
    },

    // Injecting the
    context: {
        dataSources: new ManagerMock()
    },

    // Expected result
    expected: {
        data: {
            newService: {
                error: null,
                success: true
            }
        }
    }
}


describe('Schema mutation', () => {
    const cases = [newServiceTestCase]
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