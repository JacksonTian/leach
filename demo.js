var Rule = function (type, valid) {
  this.type = type;
  this.valid = valid;
};

var Converter = {
  'number': function (val) {
    return parseInt(val, 10);
  },
  'float': function (val) {
    return parseFloat(val);
  }
};

var Validater = {
  'number': function (val) {
    return !isNaN(val);
  },
  'float': function (val) {
    return !isNaN(val);
  }
};

var validate = function (scheme, input) {
  var ret = {};
  for (var key in input) {
    if (scheme.hasOwnProperty(key)) {
      var rule = scheme[key];
      var type = rule.type;
      // 根据类型转换
      var converted = Converter[type](input[key]);
      // 检测转换后的值是否有效
      if (Validater[type](converted)) {
        ret[key] = converted;
      }
    }
  }
};