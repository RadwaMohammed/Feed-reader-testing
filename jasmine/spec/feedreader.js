
/* $() function to ensure they don't run until the DOM is ready.*/
$(function() {
    /* Suite about the RSS feeds definitions, the allFeeds variable*/
    describe('RSS Feeds', function() {
        /* Tests to make sure that the allFeeds variable has been defined 
         * and that it is not empty. 
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Test to ensures each feed has a URL defined
         * and that the URL is not empty.
         */
        it('each feed has URL defined', function() {
            // Loop through each feed
            for(const feed of allFeeds) {
                // Check each feed has URL
                expect(feed.url).toBeDefined();
                // Check each feed's URL is not empty
                expect(feed.url.length).not.toBe(0);
            }
         });


        /* Test to ensures each feed has a name defined
         * and that the name is not empty.
         */
        it('each feed has name defined', function() {
            // Loop through each feed
            for(const feed of allFeeds) {
                // Check each feed has name
                expect(feed.name).toBeDefined();
                // Check each feed's name is not empty
                expect(feed.name.length).not.toBe(0);
            }
         });
    });



    /* Suite about 'The menu' */
    describe('The menu', function() {
        /* Test to ensure the menu element is
         * hidden by default. 
         */
         it('is hidden by default', function() {
            /*Check body contain 'menu-hidden' class to ensure the menu element is
            * hidden by default
            */
            expect(document.body.classList.contains('menu-hidden')).toBe(true);
         });


         /* Test yo ensure the menu changes
          * visibility when the menu icon is clicked.
          */
          it('toggle the menu visibility on click', function() {
            // Menu icon
            const menuIcon = document.querySelector('.menu-icon-link');
           // Click the menu icon
            menuIcon.click();
            // Show the menu
            expect(document.body.classList.contains('menu-hidden')).toBe(false);
            // Click again the menu icon
            menuIcon.click();
            // Hide the menu
            expect(document.body.classList.contains('menu-hidden')).toBe(true);
          });
    }); 



    /* Suite about 'Initial Entries' */
    describe('Initial Entries', function() {
        /* Test to ensure there is at least
         * a single (.entry) element within the (.feed) container.
         */
        const feedContainer = document.querySelector('.feed');
        let entries ;
        // Use of asynchronous loadFeed()
        beforeEach(function(done) {
            loadFeed(0, function(){
                entries = feedContainer.querySelectorAll('.entry'); 
                done();
            });
        });
        // Check loadFeed returns one feed at least
        it('feed container has one entry at least', function() {
            expect(entries.length > 0).toBe(true);
        });
    });
    


    /* Suite about 'New Feed Selection' */
    describe('New Feed Selection', function() {
        /* Test to ensure when a new feed is loaded*/
        let previousFeed, currentFeed;
        const feedContainer = document.querySelector('.feed');
        // Use of asynchronous loadFeed()
        beforeEach(function(done) {
            loadFeed(0, function() {
                // Feed contents (old)
                previousFeed = feedContainer.innerHTML;
                loadFeed(1, function() {
                    // Feed contents (new)
                    currentFeed = feedContainer.innerHTML;
                    done();
                });
            });
        });
        // Check new feed is loaded
        it('new feed is loaded', function() {
            // Compare the new feed's contents (currentFeed) with the old one
            expect(previousFeed).not.toBe(currentFeed); // old and new feed is not same
        });
    });
}());