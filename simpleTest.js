const assert = require('assert')
const Validator = require('jsonschema').Validator

let validator
describe('Basic test', () => {
  before(() => {
    validator = new Validator()
  })

  it('Should works in simplest situation', () => {
    const schema = {"type": "number"}
    const res = validator.validate(10, schema)
    assert.equal(0, res.errors.length)
  })

  it('should return -1 when the value is not present', () => {
    const schema = {"type": "number"}
    const res = validator.validate("10", schema)
    assert.equal(true, res.errors.length > 0)
  })

  it('restrictions like exclusiveMinimum should work', () => {
    const schema = {"type": "number", "exclusiveMinimum": true, "minimum": 0}
    const res = validator.validate(0, schema)
    assert.equal(true, res.errors.length > 0)
  })

  it('simple object should be supported', () => {
    const schema = {
      "title": "Product",
      "description": "A product from Acme's catalog",
      "type": "object",
      "properties": {
          "id": {
              "description": "The unique identifier for a product",
              "type": "integer"
          },
          "name": {
              "description": "Name of the product",
              "type": "string"
          }
      },
      "required": ["id", "name"]
    }
    const obj = {
      id: 1,
      name: "Hello David"
    }
    const res = validator.validate(obj, schema)
    assert.equal(0, res.errors.length)
  })
})
