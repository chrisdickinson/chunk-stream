# chunk-stream

like [block-stream](http://npm.im/block-stream), but works with browserify's buffers.

```javascript

var chunks = require('chunk-stream')
  , fs = require('fs')

fs.createReadStream('/usr/share/dict/words')
  .pipe(chunks(512))
  .pipe(somethingThatExpects512ByteChunks())

```

## API

#### chunks(size[, type=Buffer]) -> [through](http://npm.im/through) stream

only emit blocks of `size` bytes.
create instances of `type` (defaults to `Buffer`). `type` must support:

* `new type(byte size)`
* `streamInput.prototype.copy(type instance, target offset, start, end)`

## License

MIT
