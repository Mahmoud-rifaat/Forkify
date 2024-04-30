# Forkify

0) Using parcel as our module bundler.

1) Fetching data from a third-party API using the Fetch API, handling Async operation using ES6 features (promises and Async Await).

2) Rendering content by directly inserting it into the DOM.

3) Importing static resources using "import" and using relative paths.

4) Adding Polyfills for ES6 features.

5) Listening for Load and "hashchange" events on the window object, and reading the recipe id from the hash.

6) Refactoring code by separating Model (for business logic and API usage), View (for generating markup and rendering), Controller (for Controlling data flow between the first two and handling events).

7) Adding configuration file and helpers module.

8) Implementing the Publisher-Subscriber Pattern to move Event Handlers into view, creating a method(publisher) to add event handlers(subscriber) on events, and calling it from the controller.

9) Propagating errors to the controllers by re-throwing the error in the catch block, to centralize the error handling in one place.

10) Implementing Error and success messages in the presentation logic.

11) Implementing search mechanism using the publisher-subscriber pattern.

12) Creating a parent View class for all the views to inherit.

13) Implementing Pagination from scratch on data in global state.