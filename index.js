var through = require('through')
  , Buffer = require('buffer').Buffer
  , min = Math.min

module.exports = chunked

function chunked(size, type) {
  type = type || Buffer

  var stream = through(write, end)
    , buffered_bytes = 0
    , buffer = []
    , chunk = new type(size)
    , offset = 0

  return stream

  function write(input) {
    buffer[buffer.length] = input
    buffered_bytes += input.length

    if(buffered_bytes < size) {
      return 
    }

    output()
  }

  function end() {
    if(buffer.length) {
      output()
    }
    stream.queue(null)
  }

  function output() {
    var idx = 0
      , end

    while(buffered_bytes >= size && idx < buffer.length) {
      if(!buffer[idx].length) {
        ++idx
        continue
      }

      end = min(size, buffer[idx].length)

      buffer[idx].copy(chunk, offset, 0, end)
      buffered_bytes -= end - offset
      offset = end

      buffer[idx] = buffer[idx].slice(end)

      if(offset === size) {
        stream.queue(chunk)
        offset = 0
        chunk = new type(size)
      }
    }

    buffer = buffer.slice(idx)

  }
}
