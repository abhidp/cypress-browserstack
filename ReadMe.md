- clone the repo
- `npm install`
- `npm run cy:open` to open Cypress locally
- enter `username` and `access_key` in `browserstack.json`
- `npm run bs:run` to run tests in BrowserStack

Locally:

- All specs pass

Browserstack:

- `name.spec.ts` fails because BrowserStack cannot recognize `CYPRESS_` environment variables

Env vars can be set using the `CYPRESS_` prefix as mentioned in this doc : https://docs.cypress.io/guides/guides/environment-variables#Option-3-CYPRESS_
