const assert = require('assert')
const Validator = require('jsonschema').Validator
const config = require('./UCCconfig')

let validator
describe('UCC', () => {
  before(() => {
    validator = new Validator()
  })

  it('uccTest', () => {
    const schema = {
        "additionalProperties": false,
        "properties": {
            "meta": {"$ref": "#/definitions/metaSchema"},
            "pages": {"$ref": "#/definitions/pagesSchema"}

        },
        "required": ["meta", "pages"],
        "type": "object",
        "definitions": {
            "metaSchema": {
                "type": "object",
                "properties": {
                    "displayName": {"type": "string"},
                    "name": {"type": "string"},
                    "restRoot": {"type": "string"},
                    "uccVersion": {"type": "string"},
                    "version": {"type": "string"}
                },
                "additionalProperties": false,
                "required": [
                    "displayName",
                    "name",
                    "restRoot",
                    "uccVersion",
                    "version"
                ]
            },
            "pagesSchema": {
              "additionalProperties": false,
              "properties": {
                  "configuration": {"$ref": "#/definitions/configurationSchema"},
                  "inputs": {"$ref": "#/definitions/inputsSchema"}
              },
            },
            "configurationSchema": {

            },
            "inputsSchema": {

            }
        }
    }
    const res = validator.validate(config, schema)
    assert.equal(0, res.errors.length)
  })
})
