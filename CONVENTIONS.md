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
- Use functional components with hooks instead of class based components.
- Component names here should be in PascalCase.
- Avoid copy pasting code. If you find yourself copying and pasting code, consider refactoring it into a reusable component or function. Use array methods like `map`, `filter`, and `reduce` to avoid duplicating code.
- Try to use tailwind for css styling as much as possible. If you need to write custom css, use CSS modules. Avoid using global styles, unless they actually need to be global.


## Commit Message Guidelines
- Use meaningful commit messages that describe the changes made in the commit.
- Please do only one thing in a single commit. If you are fixing a bug and refactoring some code, make two separate commits.
- If you make tweaks to existing code to fit your implementation, do it in a separate commit.
- Your commits would be more readable if each line is limited to around 72 characters. Break long lines into multiple lines if necessary.
- Commit messages should be of the format:
    ```
    <area_of_code>: <short_description>
    
    <detailed_description, preferably in points>

    Fixes: #<issue_number> (omit this if there is no issue associated with the commit)
    ```
    Some examples:
    ```
    server: Add endpoint to fetch user data.

    This commit adds a new endpoint to the server that allows clients to fetch user data.
    We fetch the user data from MongoDB and return it as a JSON response, filtering out
    sensitive information.

    Fixes #28626
    ```

    ```
    client: Refactor user profile component.

    This commit refactors the user profile component to improve code readability and maintainability. 

    ```

## Other Important Points
- Use meaningful and descriptive names for variables, functions, and classes to enhance code readability.
- Follow consistent indentation and formatting throughout the codebase (will be enforced by ESLint and prettier).
- Use proper spacing and line breaks to improve code readability.
- All the global variables should be declared above the functions in the respective file.
- Avoid unnecessary code duplication and strive for code reusability.
- Write clear and concise documentation for public APIs and important functions. Do not over-document trivial functions.
- We are using TypeScript in a very lenient and flexible setting. The project can have both JS and TS files, and one of the goals would be to convert all files to TS eventually. Where you are not using types.
- Try to keep the use of external dependencies to a minimum. This is because the purpose of project is first to learn and then to build. So, we will try to build as much as possible from scratch. That way there are more issues to work on.

Remember to review and adhere to these conventions to maintain a clean and consistent codebase.
