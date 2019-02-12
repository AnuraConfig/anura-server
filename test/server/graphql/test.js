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
          }
      }
    `,
    variables: { },

    // Injecting the mock movie server with canned responses
    context: { dataSources: new ManagerMock() },

    // Expected result
    expected: { data: {service: [{id: '6'}]}}
}

describe('Schema', () => {
    const cases = [allServicesTestCase]
    const schema = makeExecutableSchema({ typeDefs, resolvers })

    cases.forEach(obj => {
        const { id, query, variables, context, expected } = obj
        it(`query: ${id}`, async () => {
            const result = await graphql(schema, query, null, context, variables)
            expect(result).to.deep.equal(expected)
        })
    })
})