import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // Implement node event listeners here
      on('task', {
        log(message) {
          console.log(message);
          return null;
        },
        // Mock authentication
        setLocalStorage({ key, value }) {
          console.log(`Setting localStorage: ${key} = ${value}`);
          return null;
        },
        // Mock video service API calls
        mockVideoService(action) {
          console.log(`Mocking video service: ${action}`);
          switch (action) {
            case 'fetchVideos':
              return [
                {
                  id: '1',
                  title: 'Test Video 1',
                  description: 'Test description 1',
                  youtube_url: 'https://youtube.com/watch?v=test1',
                  thumbnail_url: 'https://i.ytimg.com/vi/test1/default.jpg',
                  tags: 'test,video'
                },
                {
                  id: '2',
                  title: 'Test Video 2',
                  description: 'Test description 2',
                  youtube_url: 'https://youtube.com/watch?v=test2',
                  thumbnail_url: 'https://i.ytimg.com/vi/test2/default.jpg',
                  tags: 'test,example'
                }
              ];
            default:
              return null;
          }
        }
      });

      // Set up different environments
      const environment = process.env.NODE_ENV || 'development';
      
      // Base configuration for all environments
      config.baseUrl = 'http://localhost:5173';
      
      // Environment-specific configurations
      if (environment === 'production') {
        config.baseUrl = 'https://yourapp-production.com';
      } else if (environment === 'staging') {
        config.baseUrl = 'https://yourapp-staging.com';
      }

      return config;
    },
    
    baseUrl: 'http://localhost:5173',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    viewportWidth: 1280,
    viewportHeight: 720,
    
    // Configure default behaviors
    defaultCommandTimeout: 5000,
    
    // Custom environment variables for tests
    env: {
      apiUrl: 'http://localhost:8000/api',
      languages: ['en', 'ru', 'es', 'fr', 'uk']
    }
  },

  component: {
    devServer: {
      framework: 'react',
      bundler: 'webpack'
    },
    specPattern: 'src/**/*.cy.{js,jsx,ts,tsx}',
    // Fixed version - removing the dev-server:start event handler
    setupNodeEvents(on, config) {
      // Using only supported event handlers
      on('task', {
        log(message) {
          console.log(`Component test log: ${message}`);
          return null;
        }
      });

      return config;
    }
  },

  // Global configuration
  video: false,
  screenshotOnRunFailure: true,
  screenshotsFolder: 'cypress/screenshots',
  videosFolder: 'cypress/videos',
  downloadsFolder: 'cypress/downloads',
  fixturesFolder: 'cypress/fixtures',
  trashAssetsBeforeRuns: true,
  retries: {
    runMode: 1,
    openMode: 0
  },

  // Enable experimental features that might help with React testing
  experimentalModifyObstructiveThirdPartyCode: true
});