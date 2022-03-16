// const { hasSubscribers } = require('diagnostics_channel')
const express = require('express')
const path = require('path')
// const http = require('http')
// const WebSocket = require('ws')
const hbs = require('hbs')
const cookiePaser = require('cookie-parser')
const { sessions } = require('./sessions')
const { checkAuth } = require('./src/middlewares/checkAuth')

const server = express()

const { db } = require('./Data')

const PORT = 3000
// const server = http.createServer(app)
// const map = new Map()

server.set('view engine', 'hbs')
server.set('views', path.join(process.env.PWD, 'src', 'views'))
hbs.registerPartials(path.join(process.env.PWD, 'src', 'views', 'partials'))
// учит сервер принимать данные из пользовательской формы
server.use(express.json())
server.use(express.static('public'))
server.use(express.urlencoded({ extended: true })) // expree принимает данные из формы
server.use(cookiePaser())
server.use((req, res, next) => {
  const sidFromUser = req.cookies.sid

  const currentSession = sessions[sidFromUser]
  if (currentSession) {
    const currentUser = db.users.find((user) => user.email === currentSession.email)
    res.locals.name = currentUser.name
    res.locals.email = currentUser.email
  }
  // console.log(res.locals)
  next()
})

server.get('/', (req, res) => {
  res.render('main')
})

server.delete('/fetch', (req, res) => {
  console.log('123', req.body, req.sessions)
  res.sendStatus(204)
})

// server.get('/secret', checkAuth, (req, res) => {
//   res.render('inst')
// })
server.get('/auth/signup', (req, res) => {
  res.render('signUp')
})

server.post('/auth/signup', (req, res) => {
  const { name, email, password } = req.body

  db.users.push({
    name,
    email,
    password,
  })
  const sid = Date.now()
  sessions[sid] = {
    email,
  }
  res.cookie('sid', sid, {
    httpOnly: true,
    maxAge: 4e4,
  })
  res.redirect('/instagram')
})

server.get('/auth/signin', (req, res) => {
  res.render('signIn')
})

server.post('/auth/signin', (req, res) => {
  const { email, password } = req.body

  const currentUser = db.users.find((user) => user.email === email)

  if (currentUser) {
    if (currentUser.password === password) {
      const sid = Date.now()
      sessions[sid] = {
        email,
      }
      res.cookie('sid', sid, {
        httpOnly: true,
        maxAge: 4e4,
      })
      return res.redirect('/instagram')
    }
  }
  return res.redirect('/auth/signin')
})

server.get('/auth/signout', (req, res) => {
  const sidFromUserCookie = req.cookies.sid
  delete sessions[sidFromUserCookie]

  res.clearCookie('sid')
  res.redirect('/')
})

server.get('/instagram', checkAuth, (req, res) => {
  const usersQuery = req.query

  let postsForRender = db.posts
  if (usersQuery.reverse === 'true' && usersQuery.limit === undefined) {
    postsForRender = db.posts.reverse()
  } else if (usersQuery.limit !== undefined
    && Number.isNaN(+usersQuery.limit) === false && usersQuery.reverse === undefined) {
    postsForRender = db.posts.slice(0, usersQuery.limit)
  } else if (usersQuery.reverse === 'true' && usersQuery.limit !== undefined && Number.isNaN(+usersQuery.limit) === false) {
    postsForRender = db.posts.slice(0, usersQuery.limit).reverse()
  }
  res.render('inst', { listOfPosts: postsForRender })
})

server.post('/postbook', (req, res) => {
  const authorId = sessions[req.cookies.sid].email // Сохранияем id автора по ключу (id поста) в сессию
  const pid = Date.now()
  sessions[pid] = {
    authorId,
  }
  const dataFromForm = req.body
  db.posts.push(dataFromForm)
  res.redirect('/instagram')
})
server.get('*', (req, res) => {
  res.send('<h1>404</h1>')
})

server.listen(PORT, () => {
  console.log(`Server has been started on port: ${PORT}`)
})
