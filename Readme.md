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
    console.log(error, response.statusCode)
})
```

#### Unit testing test/test.js

## License

  MIT
