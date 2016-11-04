const assert = require('assert')
const Validator = require('jsonschema').Validator

let validator
describe('Basic test', () => {
  before(() => {
    validator = new Validator()
  })

  it('Enum should works', () => {
    const schema = {
      "enum": ["1", "2"]
    }
    const res = validator.validate("2", schema)
    console.log(res.errors);
    assert.equal(0, res.errors.length)
  })
})
