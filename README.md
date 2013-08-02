# leach [![Build Status](https://secure.travis-ci.org/JacksonTian/leach.png?branch=master)](http://travis-ci.org/JacksonTian/leach) [![Coverage Status](https://coveralls.io/repos/JacksonTian/leach/badge.png)](https://coveralls.io/r/JacksonTian/leach)

## 步骤：

1. 选出需要的字段
2. 检查字段的类型是否正确，如果不对，尝试转换为目标类型
3. 检测值是否符合目标类型
4. 检测值是否在范围中
5. 上述条件任意一条不符合，就舍弃该字段
6. 得到最终值

## 设计思路：

1. Schema
2. 验证方法

## 使用
### Installation

```bash
$ npm install leach
```

### Demo

```js
var schema = {
  'hehe': {
    type: 'number',
    check: function (input) {
      return [1, 2, 3, 4].indexOf(input) !== -1;
    }
  }
};

leach(schema, {'hehe': '1000'});
// => {} 数据不在范围中
leach(schema, {'hehe': '3'});
// => {hehe: 3} 转换为正确的类型且数据在区间中
```

#### 自定义类型

```js
var schema = {
  'hehe': {
    type: 'string',
    check: function (input) {
      return ['hello', 'world'];
    }
  }
};

var opts = {
  converter: { // 数据转换
    'string': function (input) {
      return String(input);
    }
  },
  validator: { // 验证转换后的数据
    'string': function (input) {
      return Object.prototype.toString.call(input) == '[object String]';
    }
  }
};

leach(schema, {hehe: 'hehe'});
// => {} 数据不在范围中
leach(schema, {hehe: new String('hello')});
// => {hehe: 'hello'} 转换为正确的类型且数据在区间中
```

## License
The MIT license
