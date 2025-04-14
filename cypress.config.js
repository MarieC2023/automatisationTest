const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'kyx97t',
  env: {
    apiUrl: "http://localhost:8081",
    username: "test2@test.fr",
    password: "testtest",
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },

    baseUrl: "http://localhost:8080/",

    defaultCommandTimeout: 5000,
    video: true,
    videosFolder: "cypress/videos", 
    screenshotOnRunFailure: true, 
    screenshotsFolder: "cypress/screenshots",
  },
});
