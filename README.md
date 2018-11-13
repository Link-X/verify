# js 优雅验证条件

开发操作步骤 <br/>
 yarn install <br/>
 yarn start



## 用法
 ```JavaScript
 <script src="dist/main.js"></script>
 var obj = {
     number: 1,
     string: 'str',
     array: [1, 2, 3],
     object: {a: 1},
     date: '2018-10-10 08:08'
  }
  var rule = [
     number: [
        { required: true, message: '请输入number' }
     ],
     string: [
         { required: true, type: 'number' message: '请输入string' }
     ],
     array: [
         { message: '请输入array' },
         { min: 0, max: 3, message: '最小为0，最大为3' }
     ],
     object: [
         { required: false,  message: '请选择obj', validator: judgeObj }
     ],
     date: [
         { required: true, message: '请输入正确的时间' }
     ]
  ]

 var judgeObj (val, cb)  {
      console.log(val)
      if (val.a > 1) {
          cb()
      } esle {
          cb(new Error('不通过'))
      }
  }
 var main = new verify();

 main.init(obj, rule);

 main.validate((e) => {
     if (e.result) {
         alert('succes')
         return
     }
     alert('err')
     console.log(e.key + 'err')
 })

 ```