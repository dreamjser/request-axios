// server.js
import jsonServer  from 'json-server'
import cors from 'cors'
const server = jsonServer.create()
const router = jsonServer.router('./json_server/db.json')
const middlewares = jsonServer.defaults()


server.use(middlewares)
server.use('/api', router)
server.use(
  cors({
    origin: true,
    credentials: true,
    preflightContinue: false,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
)
server.options("*", cors())

router.render = (req, res) => {
  res.jsonp({
    errorCode: '0',
    errorMsg: 'success',
    data: res.locals.data
  })
}

server.listen(4003, () => {
  console.log('JSON Server is running')
})
