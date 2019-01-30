import assert from "assert"

import convertJSON from "../../../server/configConvertor/convertJSON"
import convertText from "../../../server/configConvertor/convertText"
import convertYAML from "../../../server/configConvertor/convertYAML"

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

describe('convertText', () => {
    describe('#isValid()', () => {
        it('should return true when getting string', function () {
            const res = convertText.isValid("some config ")
            assert.equal(res, true)
        });
        it('should return false when getting anything other then plain text', function () {
            const res = convertText.isValid({ "test": 6 })
            assert.equal(res, false)
        });
    });
    describe('#getObject()', () => {
        it('should return the text', function () {
            const obj = "text"
            const res = convertText.getObject("text")
            assert.deepEqual(res, obj)
        });
    });

});


describe('convertYAML', () => {
    describe('#isValid()', () => {
        it('should return true when YAML is valid', function () {
            const res = convertYAML.isValid(`
            config: 6
            yes:
                no: what
                yes: true
            `)
            assert.equal(res, true)
        });
        it('should return false when YAML is not valid', function () {
            const res = convertYAML.isValid('asd   212::ASd ')
            assert.equal(res, false)
        });
    });
    describe('#getObject()', () => {
        it('should return json object from YAML', function () {
            const obj = { "test": 6 }
            const res = convertYAML.getObject(JSON.stringify(obj))
            assert.deepEqual(res, obj)
        });
    });

});