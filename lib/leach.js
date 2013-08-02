// 转换为目标类型
var Converter = {
  'number': function (val) {
    return parseInt(val, 10);
  },
  'float': function (val) {
    return parseFloat(val);
  }
};

// 验证转换后的值
var Validator = {
  'number': function (val) {
    return !isNaN(val);
  },
  'float': function (val) {
    return !isNaN(val);
  }
};

// 萃取
module.exports = function (schema, input, opts) {
  opts = opts || {};
  var ret = {};
  for (var key in input) {
    // 只调定义
    if (schema.hasOwnProperty(key)) {
      var rule = schema[key];
      var type = rule.type;
      // 根据类型转换
      var convert;
      if (opts.converter && opts.converter[type]) {
        convert = opts.converter[type];
      } else {
        convert = Converter[type];
      }
      if (!convert) {
        throw new Error('Convert for type "' + type + '" is not exist');
      }
      var converted = convert(input[key]);
      // 检测转换后的值是否有效
      var validate;
      if (opts.validator && opts.validator[type]) {
        validate = opts.validator[type];
      } else {
        validate = Validator[type];
      }
      if (!validate) {
        throw new Error('Validate for type "' + type + '" is not exist');
      }
      if (validate(converted)) {
        // 验证值是否符合值区间
        if (!rule.check || rule.check(converted)) {
          ret[key] = converted;
        }
      }
    } else {
      throw new Error('Unsupported key: ' + key);
    }
  }
  return ret;
};
