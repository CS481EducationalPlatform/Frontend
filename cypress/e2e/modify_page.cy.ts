describe('Modify Page', () => {
    beforeEach(() => {
      // Mock localStorage
      cy.window().then((win) => {
        win.localStorage.setItem('username', 'TestUser');
        win.localStorage.setItem('isLoggedIn', 'true');
        win.localStorage.setItem('access_token', 'fake-token');
        win.localStorage.setItem('id_token', 'fake-id-token');
      });
  
      // Mock API response for fetchVideos
      cy.intercept('GET', '**/videos', {
        statusCode: 200,
        body: [
          {
            id: 1,
            title: 'Test Video 1',
            description: 'This is a test video description',
            youtube_url: 'https://youtube.com/watch?v=123456',
            thumbnail_url: 'https://i.ytimg.com/vi/123456/default.jpg',
            tags: 'test,video,cypress'
          },
          {
            id: 2,
            title: 'Test Video 2',
            description: 'Another test video description',
            youtube_url: 'https://youtube.com/watch?v=789012',
            thumbnail_url: 'https://i.ytimg.com/vi/789012/default.jpg',
            tags: 'test,another,cypress'
          }
        ]
      }).as('getVideos');
  
      // Visit the modify page
      cy.visit('/modify');
      cy.wait('@getVideos');
    });
  
    it('displays welcome message with username', () => {
      cy.log('Current URL: ' + window.location.href);
      cy.get('body').then($body => {
        cy.log('Body HTML: ' + $body.html());
      });
      cy.get('[data-cy=welcome-message]').should('contain', 'Welcome TestUser!');
    });
  
    it('displays the video list when videos are loaded', () => {
      cy.get('[data-cy=video-item]').should('have.length', 2);
      cy.get('[data-cy=video-item]').first().find('[data-cy=video-title]').should('contain', 'Test Video 1');
    });
  
    it('opens update modal when edit button is clicked', () => {
      cy.get('[data-cy=edit-button]').first().click();
      cy.get('[data-cy=update-modal]').should('be.visible');
      cy.get('[data-cy=title-input]').should('have.value', 'Test Video 1');
    });
  
    it('opens delete modal when delete button is clicked', () => {
      cy.get('[data-cy=delete-button]').first().click();
      cy.get('[data-cy=delete-modal]').should('be.visible');
      cy.get('[data-cy=delete-confirmation]').should('contain', 'Test Video 1');
    });
  
    it('navigates to upload page when upload button is clicked', () => {
      cy.get('[data-cy=upload-button]').click();
      cy.url().should('include', '/upload');
    });
  
    it('logs out when logout button is clicked', () => {
      cy.intercept('POST', '**/logout').as('logout');
      
      cy.get('[data-cy=logout-button]').click();
      
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
      cy.intercept('PUT', '**/api/videos/*', {
        statusCode: 200,
        body: { message: 'Video updated successfully' }
      }).as('updateVideo');
      
      cy.get('[data-cy=edit-button]').first().click();
      cy.get('[data-cy=title-input]').clear().type('Updated Video Title');
      cy.get('[data-cy=description-input]').clear().type('Updated description');
      cy.get('[data-cy=submit-button]').click();
      
      cy.wait('@updateVideo');
      cy.get('[data-cy=success-message]').should('contain', 'Video updated successfully');
    });
  
    it('deletes a video successfully', () => {
      // Mock the delete video API call
      cy.intercept('DELETE', '**/api/videos/*', {
        statusCode: 200,
        body: { message: 'Video deleted successfully' }
      }).as('deleteVideo');
      
      cy.get('[data-cy=delete-button]').first().click();
      cy.get('[data-cy=confirm-delete-button]').click();
      
      cy.wait('@deleteVideo');
      cy.get('[data-cy=success-message]').should('contain', 'Video deleted successfully');
    });
  
    it('handles error when updating video fails', () => {
      // Mock the update video API call with an error
      cy.intercept('PUT', '**/api/videos/*', {
        statusCode: 500,
        body: { message: 'Server error occurred' }
      }).as('updateVideoError');
      
      cy.get('[data-cy=edit-button]').first().click();
      cy.get('[data-cy=title-input]').clear().type('Updated Video Title');
      cy.get('[data-cy=submit-button]').click();
      
      cy.wait('@updateVideoError');
      cy.get('[data-cy=error-result]').should('contain', 'Server error occurred');
    });
  
    it('shows empty state when no videos are available', () => {
      // Override the mock to return empty array
      cy.intercept('GET', '**/api/videos', {
        statusCode: 200,
        body: []
      }).as('getEmptyVideos');
      
      // Reload the page
      cy.visit('/modify');
      cy.wait('@getEmptyVideos');
      
      cy.get('[data-cy=no-videos-message]').should('be.visible');
      cy.get('[data-cy=no-videos-message]').should('contain', 'No Videos Found.');
    });
});