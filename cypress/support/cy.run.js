// runs Cypress tests using Cypress Node module API
// https://on.cypress.io/module-api

const cypress = require('cypress')
const _ = require('lodash')

let options = {
  quiet: true,
  tag: 'retry-run',
  config: {}
}
let retryCount = 3

const runCypress = async (options) => {
  process.env.CI ? (options.record = true) : (options.record = false)

  const cyRun = async (options) => {
    await cypress
      .run(options)
      .then((result) => {
        let exitCode = 0
        let failedSpecs = []

        if (result.runs)
          if (result.runs.length > 0) {
            for (let i = 0; i < result.runs.length; i++) {
              for (let j = 0; j < result.runs[i].tests.length; j++) {
                if (result.runs[i].tests[j].state === 'failed') {
                  failedSpecs.push(result.runs[i].spec.name)

                  exitCode++
                }
              }
            }
          }

        options.config.testFiles = failedSpecs

        retryCount--
        console.log('retry===', retryCount, options)
        if (retryCount) {
          _.delay(runCypress, 50000, options)
        }

        process.exitCode = exitCode
      })
      .catch((err) => {
        console.error(err.message)
        process.exit(1)
      })
  }
  cyRun(options)
}

runCypress(options)
