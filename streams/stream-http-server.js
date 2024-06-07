import http from 'node:http';
import { Transform } from 'node:stream';


class InverseNumberStream extends Transform {
  _transform(chunck, encoding, callback) {
    const transformed = Number(chunck.toString()) * - 1
    console.log(transformed)
    callback(null, Buffer.from(String(transformed)))
  }
}

const server = http.createServer(async (req, res) => {
  const buffers = []

  for await (const chunck of req) {
    buffers.push(chunck);
  }

  const fullStreamContent = Buffer.concat(buffers).toString();

  return res.end(fullStreamContent);


});

server.listen(3333);