# Forkify: A Recipe App with Vanilla JS - MVC

Forkify is a recipe application built entirely with vanilla JavaScript! This project served as a deep dive into building a complex web application from scratch, while implementing best practices and exploring various functionalities.

## Project Overview:

Forkify allows users to:

- Browse recipes fetched from a third-party API.
- Search for specific recipes.
- View detailed recipe information with servings adjustments.
- Bookmark recipes for later reference.
- (Bonus!) Upload recipes to a remote API (work in progress).

## Technical Highlights:

- **MVC Architecture:** Built with a clear separation of concerns (Model, View, Controller) for maintainability.
- **Modern JavaScript:** Utilizes promises, async/await, and ES6 modules for a clean and efficient codebase.
- **Event-Driven:** Responds to user interactions like "load" and "hashchange" events for dynamic recipe display.
- **Modular Design:** Leverages a configuration file and the Publisher-Subscriber pattern for better organization.
- **Robust Error Handling:** Centralized error management in the controller ensures a smooth user experience.
- **Advanced Features:** Implements search, pagination, servings manipulation, bookmarking with local storage persistence, and a DOM update algorithm (for efficiency improvements).

## Live Demo:

Check out the live version of Forkify in action: [Forkify Live Demo](https://forkify-refaat.netlify.app/)

## Current Bugs:

There's a known issue with the bookmarking functionality where unmarking a specific recipe might affect a different one. This is due to state management and will be addressed in a future update.

## TODO:

- **Function Documentation:** Comprehensive documentation for all functions will be added using JSDoc or a similar tool.

## Inspiration:

This project was heavily influenced by the valuable learnings from Jonas Schmedtmann's JavaScript Mastercourse.

## Learning Outcomes:

This project provided a valuable hands-on experience in building a feature-rich web application with vanilla JavaScript. Key takeaways include:

- Understanding the importance of MVC architecture for web app development.
- Mastering modern JavaScript features for cleaner and more efficient code.
- Implementing robust event handling and user interaction patterns.
- Leveraging design patterns and modularity for better code organization.
- Building a comprehensive error handling strategy.
- Implementing advanced features like search, pagination, and data manipulation.

Feel free to explore the codebase and learn more about the inner workings of Forkify!