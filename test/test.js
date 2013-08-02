var should = require('should');
var leach = require('../');

describe('leach', function () {
  it('should ok', function () {
    var schema = {
      'hehe': {
        type: 'number'
      },
      'nvshen': {
        type: 'number'
      }
    };
    var input = {
      'hehe': '1000'
    };
    var output = leach(schema, input);
    output.should.eql({'hehe': 1000});
  });

  it('should throw exception for unsupported key', function () {
    var schema = {
      'hehe': {
        type: 'number'
      }
    };
    var input = {
      'hehe': '1000',
      'nvshen': 'hehe'
    };
    (function () {
      var output = leach(schema, input);
    }).should.throw('Unsupported key: nvshen');
  });

  it('should ok when invalid value', function () {
    var schema = {
      'hehe': {
        type: 'number'
      }
    };
    var input = {
      'hehe': 'invalid'
    };
    var output = leach(schema, input);
    output.should.eql({});
  });

  it('should ok with float', function () {
    var schema = {
      'hehe': {
        type: 'float'
      }
    };
    var input = {
      'hehe': '0.123'
    };
    var output = leach(schema, input);
    output.should.eql({hehe: 0.123});
  });

  it('should ok when invalid float', function () {
    var schema = {
      'hehe': {
        type: 'float'
      }
    };
    var input = {
      'hehe': 'hehe.123'
    };
    var output = leach(schema, input);
    output.should.eql({});
  });

  it('should ok with check', function () {
    var schema = {
      'hehe': {
        type: 'number',
        check: function (input) {
          return [1, 2, 3, 4].indexOf(input) !== -1;
        }
      }
    };
    var input = {
      'hehe': '1000'
    };
    var output = leach(schema, input);
    output.should.eql({});
    var input = {
      'hehe': '1'
    };
    var output = leach(schema, input);
    output.should.eql({'hehe': 1});
  });

  it('should ok with custom type', function () {
    var schema = {
      'hehe': {
        type: 'custom'
      }
    };
    var input = {
      'hehe': '1000'
    };

    var output = leach(schema, input, {
      converter: {
        'custom': function (input) {
          return {value: input};
        }
      },
      validator: {
        'custom': function (input) {
          return input && ('value' in input);
        }
      }
    });
    output.should.eql({hehe: {value: '1000'}});
  });

  it('should get convert error with custom type', function () {
    var schema = {
      'hehe': {
        type: 'custom',
        check: function (input) {
          return [1, 2, 3, 4].indexOf(input) !== -1;
        }
      }
    };
    var input = {
      'hehe': '1000'
    };

    (function(){
      leach(schema, input);
    }).should.throw('Convert for type "custom" is not exist');
  });

  it('should get validator error with custom type', function () {
    var schema = {
      'hehe': {
        type: 'custom'
      }
    };
    var input = {
      'hehe': '1000'
    };

    (function(){
      leach(schema, input, {
        converter: {
          custom: function (input) {
            return {value: input};
          }
        }
      });
    }).should.throw('Validate for type "custom" is not exist');
  });

  it('should ok multi keys', function () {
    var schema = {
      'hehe': {
        type: 'number'
      },
      'nvshen': {
        type: 'float'
      }
    };
    var input = {
      'hehe': '1000',
      'nvshen': '23432'
    };
    var output = leach(schema, input);
    output.should.eql({'hehe': 1000, 'nvshen': 23432});
  });
});
