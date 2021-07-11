// runs Cypress tests using Cypress Node module API
// https://on.cypress.io/module-api

const cypress = require('cypress')
const _ = require('lodash')

const tag = 'retry-run'
let record

let runOptions = {
  tag,
  quiet: true,
  config: {}
}
let retryCount = 3
const retryInstance = retryCount

const cypressRun = async (runOptions) => {
  process.env.CI ? (runOptions.record = true) : (runOptions.record = false)

  const cyRun = async (runOptions) => {
    await cypress
      .run(runOptions)
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

        if (failedSpecs.length) {
          retryCount--

          if (retryCount) {
            let retryNo = retryInstance - retryCount
            runOptions.tag = `${runOptions.tag}-retry-#${retryNo}`
            runOptions.config.testFiles = failedSpecs

            console.log('retry===', `${tag}-retry#${retryNo}`, runOptions)

            _.delay(cypressRun, 1000, runOptions)
          }
        }

        process.exitCode = exitCode
      })
      .catch((err) => {
        console.error(err.message)
        process.exit(1)
      })
  }
  cyRun(runOptions)
}

cypressRun(runOptions)
