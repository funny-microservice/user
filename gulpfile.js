const gulp = require('gulp')
const { ESLint } = require('eslint')
const { spawn } = require('child_process')
const sources = [
  'index.js',
  'server.js',
  'ecosystem.config.js',
  'routes/**/*.js',
  'models/**/*.js',
  // 'test/**/*.js',
  'gulpfile.js'
]
let node

gulp.task('lint', async () => {
  (async function () {
    const eslint = new ESLint()
    const results = await eslint.lintFiles(sources)
    const formatter = await eslint.loadFormatter('stylish')
    const resultText = formatter.format(results)
    console.log(resultText)
  })().catch((error) => {
    process.exitCode = 1
    console.error(error)
  })
})
gulp.task('server', async () => {
  // ref: https://gist.github.com/webdesserts/5632955
  if (node) node.kill()
  node = spawn('node', ['index.js'], { stdio: 'inherit' })
  node.on('close', function (code) {
    if (code === 8) {
      console.log('Error detected, waiting for changes...')
    }
  })
})

gulp.task('default', (done) => {
  console.log('\n------------- gulp task start -------------\n')
  gulp.series('lint', 'server')((cb) => {
    done(cb)
    console.log('\n------------- gulp task end -------------\n')
  })
  gulp.watch(sources, function reload (done) {
    console.log('\n------------- gulp task reload start -------------\n')
    gulp.series('lint', 'server')((cb) => {
      done(cb)
      console.log('\n------------- gulp task reload end -------------\n')
    })
  })
})

// clean up if an error goes unhandled.
process.on('exit', () => {
  if (node) node.kill()
})