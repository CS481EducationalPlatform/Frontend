describe('Modify Page', () => {
  beforeEach(() => {
    // Mock localStorage
    cy.window().then((win) => {
      win.localStorage.setItem('username', 'TestUser');
      win.localStorage.setItem('isLoggedIn', 'true');
      win.localStorage.setItem('access_token', 'fake-token');
      win.localStorage.setItem('id_token', 'fake-id-token');
    });

    // Correct intercept - match the endpoint used in your fetchVideos function
    cy.intercept('GET', '**/youtube/videos', {
      statusCode: 200,
      body: {
        videos: [
          {
            id: 1,
            title: 'Test Video 1',
            description: 'This is a test video description',
            youtube_url: 'https://www.youtube.com/watch?v=E4WlUXrJgy4',
            thumbnail_url: 'https://i.ytimg.com/vi/E4WlUXrJgy4/default.jpg',
            tags: 'test,video,cypress'
          },
          {
            id: 2,
            title: 'Test Video 2',
            description: 'Another test video description',
            youtube_url: 'https://www.youtube.com/watch?v=EShUeudtaFg',
            thumbnail_url: 'https://i.ytimg.com/vi/EShUeudtaFg/default.jpg',
            tags: 'test,another,cypress'
          }
        ]
      }
    }).as('getVideos');

    // Visit the modify page
    cy.visit('/modify');
    cy.wait('@getVideos');
    // Add an additional wait to ensure the component is fully rendered
    cy.wait(1000);
  });

  it('loads the modify page', () => {
    cy.contains('YouTube Video Manager').should('be.visible');
  });

  it('displays welcome message with username', () => {
    // Enhanced debugging
    cy.log('Current URL: ' + window.location.href);
    
    // Log the entire body HTML to see what's actually rendering
    cy.get('body').then($body => {
      cy.log('Body HTML: ' + $body.html());
    });
    
    // Check if the modify-page container is present first
    //cy.get('[data-cy=modify-page]').should('exist')
    cy.get('.modify-page').should('exist');
    
    // Then try the specific data-cy attribute with increased timeout
    //cy.get('[data-cy=welcome-message]', { timeout: 10000 }).should('contain', 'Welcome TestUser!');
    cy.get('.welcome-message', { timeout: 10000 }).should('contain', 'Welcome TestUser!');
  });

  it('displays the video list when videos are loaded', () => {
    // Check if the list container exists first
    cy.get('.list-container').should('exist');
    
    // Then check for video items
    //cy.get('[data-cy=video-item]', { timeout: 10000 }).should('have.length', 2);
    cy.get('.video-item', { timeout: 10000 }).should('have.length', 2);
    //cy.get('[data-cy=video-title]').first().should('contain', 'Test Video 1');
    cy.get('.video-title').first().should('contain', 'Test Video 1');
  });

  /*
  it('opens update modal when edit button is clicked', () => {
    cy.get('[data-cy=edit-button]').first().click();
    cy.get('[data-cy=update-modal]', { timeout: 5000 }).should('be.visible');
    cy.get('[data-cy=title-input]').should('have.value', 'Test Video 1');
  });

  it('opens delete modal when delete button is clicked', () => {
    cy.get('[data-cy=delete-button]').first().click();
    cy.get('[data-cy=delete-modal]', { timeout: 5000 }).should('be.visible');
    cy.get('[data-cy=delete-confirmation]').should('contain', 'Test Video 1');
  });

  it('navigates to upload page when upload button is clicked', () => {
    cy.get('[data-cy=upload-button]', { timeout: 5000 }).click();
    cy.url().should('include', '/upload');
  });

  it('logs out when logout button is clicked', () => {
    cy.get('[data-cy=logout-button]', { timeout: 5000 }).click();
    
    // Verify localStorage items are removed
    cy.window().then((win) => {
      expect(win.localStorage.getItem('isLoggedIn')).to.be.null;
      expect(win.localStorage.getItem('username')).to.be.null;
      expect(win.localStorage.getItem('access_token')).to.be.null;
      expect(win.localStorage.getItem('id_token')).to.be.null;
    });
    
    cy.url().should('include', '/login');
  });

  it('updates a video successfully', () => {
    // Mock the update video API call
    cy.intercept('PUT', '**//*youtube/videos/**', {
      statusCode: 200,
      body: { message: 'Video updated successfully', status: 200 }
    }).as('updateVideo');
    
    cy.get('[data-cy=edit-button]', { timeout: 5000 }).first().click();
    cy.get('[data-cy=title-input]').clear().type('Updated Video Title');
    cy.get('[data-cy=description-input]').clear().type('Updated description');
    cy.get('[data-cy=submit-button]').click();
    
    cy.wait('@updateVideo');
    cy.get('[data-cy=success-message]', { timeout: 5000 }).should('contain', 'Video updated successfully');
  });

  it('deletes a video successfully', () => {
    // Mock the delete video API call
    cy.intercept('DELETE', '**//*youtube/videos/**', {
      statusCode: 200,
      body: { message: 'Video deleted successfully', status: 200 }
    }).as('deleteVideo');
    
    cy.get('[data-cy=delete-button]', { timeout: 5000 }).first().click();
    cy.get('[data-cy=confirm-delete-button]').click();
    
    cy.wait('@deleteVideo');
    cy.get('[data-cy=success-message]', { timeout: 5000 }).should('contain', 'Video deleted successfully');
  });

  it('handles error when updating video fails', () => {
    // Mock the update video API call with an error
    cy.intercept('PUT', '**//*youtube/videos/**', {
      statusCode: 500,
      body: { message: 'Server error occurred', status: 500 }
    }).as('updateVideoError');
    
    cy.get('[data-cy=edit-button]', { timeout: 5000 }).first().click();
    cy.get('[data-cy=title-input]').clear().type('Updated Video Title');
    cy.get('[data-cy=submit-button]').click();
    
    cy.wait('@updateVideoError');
    cy.get('[data-cy=error-result]', { timeout: 5000 }).should('contain', 'Server error occurred');
  });

  */

  it('shows empty state when no videos are available', () => {
    // Override the mock to return empty array
    cy.intercept('GET', '**/youtube/videos', {
      statusCode: 200,
      body: {
        videos: []
      }
    }).as('getEmptyVideos');
    
    // Reload the page
    cy.visit('/modify');
    cy.wait('@getEmptyVideos');
    
    // Check for no-videos message with increased timeout
    //cy.get('[data-cy=no-videos-message]', { timeout: 10000 }).should('be.visible');
    cy.get('.no-videos-text', { timeout: 10000 }).should('be.visible');
    //cy.get('[data-cy=no-videos-message]').should('contain', 'No Videos Found.');
    cy.get('.no-videos-text').should('contain', 'No Videos Found.');
  });
});