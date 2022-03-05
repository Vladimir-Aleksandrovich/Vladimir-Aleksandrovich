const express = require('express')
const path = require('path')
const { db } = require('./Data')

const app = express()

const PORT = 3000

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'src'))

// учит сервер принимать данные из пользовательской формы

app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  const usersQuery = req.query
  // console.log(usersQuery)
  let postsForRender = db.posts
  if (usersQuery.reverse === 'true' && usersQuery.limit === undefined) {
    postsForRender = db.posts.reverse()
  } else if (usersQuery.limit !== undefined
    && Number.isNaN(+usersQuery.limit) === false && usersQuery.reverse === undefined) {
    postsForRender = db.posts.slice(0, usersQuery.limit)
  } else if (usersQuery.reverse === 'true' && usersQuery.limit !== undefined && Number.isNaN(+usersQuery.limit) === false) {
    postsForRender = db.posts.slice(0, usersQuery.limit).reverse()
  }
  console.log(usersQuery)
  res.render('main', { listOfPosts: postsForRender })
})
app.post('/addressbook', (req, res) => {
  const dataFromForm = req.body
  db.posts.push(dataFromForm)
  res.redirect('/')
})
app.get('*', (req, res) => {
  res.send('<h1>404</h1>')
})
app.listen(PORT, () => {
  console.log(`Server has been started on port: ${PORT}`)
})
