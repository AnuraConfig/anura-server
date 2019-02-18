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
      query {
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
        }
    }
}


describe('Schema', () => {
    const cases = [newServiceTestCase]
    const schema = makeExecutableSchema({
        typeDefs,
        resolvers
    })

    cases.forEach(obj => {
        const { id, query, variables, context, expected } = obj
        it(`mutation: ${id}`, async () => {
            const result = await graphql(schema, query, null, context, variables)
            expect(result).to.deep.equal(expected)
        })
    })
})