# lightco


#### this package is my for learning npm and nodejs, pull request is welcome


useage:
node with optional --harmony_destructuring
```js

var fs = require('fs')
var request = require('request')
var lightco = require('lightco')

lightco.run(function* ($) {
    var [error, data] = yield fs.readFile('index.js', 'utf8', $)
    if (error)
        throw error
    console.log(data)

    var [error, response, body] = yield request('http://www.baidu.com', $)
    if (error)
        throw error
    console.log(response.statusCode)

    var [error, data] = yield query(true)
    if (error)
        throw error
    console.log(data)
})
```

#### 0.1.6 support promise
    when onRejected was invoked, the first argument error must be a Error
    when onFulfilled was invoked, the first argument must be a null, the second argument must be a data

#### Unit testing test/test.js

## License

  MIT
