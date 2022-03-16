// const { application, response } = require('express')
// const { json } = require('express/lib/response')

// const { request } = require("express")

// const res = require("express/lib/response")

const $deletePostBtn = document.querySelector('[data-delete]')
if ($deletePostBtn) {
  $deletePostBtn.addEventListener('click', () => {
    fetch('/fetch', {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ name: request.body.email }),
    })
      .then((response) => { console.log({ response }) })
  })
}
