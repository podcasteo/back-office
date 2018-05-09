export default function (err, req, res, next) { // eslint-disable-line no-unused-vars
  console.log(err) // eslint-disable-line

  return res.status(500).sendFile('src/server/views/error.html', {
    root: process.cwd(),
  })
}
