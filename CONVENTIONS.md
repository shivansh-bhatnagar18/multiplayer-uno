# Code Style and Conventions

## Naming Conventions
- Class names and React component names should be in PascalCase.
- Variable names and other function names should be in camelCase.
- Variables should be declared as constants (`const`) whenever possible, unless there is a specific need for them to be mutable.

## Comments
- Long comments should be broken into multiple lines to avoid excessive width and improve readability.
- Inline comments should be kept to a minimum.
- Comments should be used to explain complex logic and provide motivation behind it, but unnecessary and self-explanatory comments should be avoided to prevent codebase bloat.


## For React Components
- Use functional components with hooks insteaad of class based components.
- Avoid copy pasting code. If you find yourself copying and pasting code, consider refactoring it into a reusable component or function. Use array methods like `map`, `filter`, and `reduce` to avoid duplicating code.


## Commit Message Guidelines
- Use meaningful commit messages that describe the changes made in the commit.
- Please do only one thing in a single commit. If you are fixing a bug and refactoring some code, make two separate commits.
- If you make tweaks to existing code to fit your implementation, do it in a separate commit.
- Commit messages should be of the format:
    ```
    <area_of_code>: <short_description>
    
    <detailed_description>

    Fixes: #<issue_number> (omit this if there is no issue associated with the commit)
    ```
    Some examples:
    ```
    server: Add endpoint to fetch user data.

    This commit adds a new endpoint to the server that allows clients to fetch user data.
    ```

## Other Important Points
- Use meaningful and descriptive names for variables, functions, and classes to enhance code readability.
- Follow consistent indentation and formatting throughout the codebase (will be enforced by ESLint).
- Use proper spacing and line breaks to improve code readability.
- Avoid unnecessary code duplication and strive for code reusability.
- Write clear and concise documentation for public APIs and important functions.

Remember to review and adhere to these conventions to maintain a clean and consistent codebase.
