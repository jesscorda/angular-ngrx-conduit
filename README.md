# RealWorld Conduit Angular App with NgRx

## About

This project is an Angular application that uses NgRx to manage state for building the frontend of the RealWorld Conduit app. The RealWorld Conduit app is a Medium-like clone where users can sign up, sign in, create articles, like articles, and follow other users.

## Features

- **User Authentication:** Sign up, sign in, and sign out.
- **User Profiles:** View and edit user profiles, follow and unfollow users.
- **Articles:** Create, edit, delete, and view articles.
- **Comments:** Add and delete comments on articles.
- **Favorites:** Mark articles as favorites.
- **State Management:** Uses NgRx for managing application state.

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine.

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/angular-ngrx-realworld-app.git
    ```

2. Navigate to the project directory:

    ```bash
    cd angular-ngrx-realworld-app
    ```

3. Install the dependencies:

    ```bash
    npm install
    ```

### Running the Application

1. Start the development server:

    ```bash
    ng serve
    ```

2. Open your browser and navigate to `http://localhost:4200`.

## Using NgRx

NgRx is used for managing the state of the application. Here are the main parts:

- **Actions:** Define what events can happen in the application (e.g., load articles, login user).
- **Reducers:** Specify how the application's state changes in response to actions.
- **Effects:** Handle side effects like API calls.
- **Selectors:** Retrieve slices of state from the store.
