import http from 'node:http';
import { json } from './middlewares/json.js';
import { routes } from './routes.js';

//

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  await json(req, res);


  const route = routes.find(route => {
    console.log(route.method)
    console.log(route.path)
    console.log(url);
    return route.method === method && route.path.test(url);
  })

  console.log(route)

  if(route) {
    const routeParams = req.url.match(route.path);
    console.log(routeParams)
    return route.handler(req, res);
  }



  return res.end('Hello test')
});

server.listen(3333);