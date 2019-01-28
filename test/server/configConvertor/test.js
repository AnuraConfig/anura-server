import assert from "assert"

import convertJSON from "../../../server/configConvertor/convertJSON"
//import convertYAML from "../../../server/configConvertor/convertYAML"
//import convertText from "../../../server/configConvertor/convertText"

describe('convertJSON', () => {
    describe('#isValid()', () => {
        it('should return true when json is valid', function () {
            const res = convertJSON.isValid(JSON.stringify({ "test": 6 }))
            assert.equal(res, true)
        });
        it('should return false when json is not valid', function () {
            const res = convertJSON.isValid(`{ "test": 6 `)
            assert.equal(res, false)
        });
    });
    describe('#getObject()', () => {
        it('should return json object', function () {
            const obj = { "test": 6 }
            const res = convertJSON.getObject(JSON.stringify(obj))
            assert.deepEqual(res, obj)
        });
    });

});
