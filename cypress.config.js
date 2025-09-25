import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'https://the-internet.herokuapp.com',
    supportFile: 'cypress/support/e2e.js',
    setupNodeEvents(on, config) {
      // place for reporters / tasks if needed
      return config
    },
    retries: { runMode: 2, openMode: 0 },
    defaultCommandTimeout: 8000,
    pageLoadTimeout: 60000,
  },
  reporter: 'junit',
  reporterOptions: {
    mochaFile: 'results/junit-[hash].xml',
    toConsole: true,
  },
})
