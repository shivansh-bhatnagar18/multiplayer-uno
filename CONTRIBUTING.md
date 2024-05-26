
---

# Contributing to Multiplayer UNO Game

Thank you for your interest in contributing to the Multiplayer UNO Game project! Contributions include bug reports, feature requests, and code changes. This document outlines the guidelines for contributing to the project.

## How to Contribute

### Reporting Bugs

If you encounter a bug in the codebase, please open an issue on the GitHub repository. When reporting a bug, please include:

- A clear and descriptive title.
- Steps to reproduce the bug.
- Expected behavior.
- Actual behavior.
- Any error messages or screenshots, if applicable.

Maintainers will approve the issue and add relevant labels to indicate that its ready to be worked on.

### Fixing Issues

1. **Find an Issue to Work On**:
   - Look for issues labeled `help wanted` or `good first issue` if you are a first-time contributor.

2. **Comment on the Issue**:
   - Before starting work on an issue, comment on the issue to let others know that you are working on it. This helps prevent duplicate work.

3. **Fork the Repository**:
   - Fork the repository to your own GitHub account by clicking the "Fork" button on the top right of the repository page.

4. **Clone Your Fork**:
   - Clone your fork to your local machine:

     ```bash
     git clone https://github.com/yourusername/multiplayer-uno.git
     cd multiplayer-uno
     ```

5. **Create a Branch**:
   - Create a new branch for your fix from the `main` branch. Use a descriptive name for your branch:

     ```bash
     git checkout -b fix/issue-#123
     ```

6. **Implement Your Fix**:
   - Make the necessary changes to fix the issue. Follow the existing code style and conventions. Please refer to the code style and conventions in [CONVENTIONS.md](CONVENTIONS.md).

7. **Test Your Changes**:
   - Thoroughly test your changes to ensure they work as intended and do not introduce any new bugs.

8. **Commit Your Changes**:
   - Please refer to the commit message guidelines in [CONVENTIONS.md](CONVENTIONS.md) for writing meaningful commit messages.

9. **Push Your Changes**:
   - Push your branch to your forked repository:

     ```bash
     git push origin fix/issue-#123
     ```

10. **Open a Pull Request**:
    - Open a pull request (PR) against the `main` branch of the original repository. Provide a clear description of your changes and reference the issue number you are fixing. Fill the self review checklist.

11. **Address Review Comments**:
      - If maintainers request changes to your code, make the necessary updates and push the changes to your branch. The fix/changes should not be in a separate commit - rather the original commit must be modified force-pushed to the branch. If merge conflicts arise, use `git rebase` to resolve them. 

<!-- todo: add details about modifying pull requests following a review.-->

## Points to remember during contribution

- Editing commit history and rebasing are very valuable tools for keeping the commit history clean and easy to understand. Please familiarize yourself with these concepts before contributing. In any case, the seniors will be there to help you out.
- Before starting work, run `git fetch upstream` and then `git rebase upstream/master`, to rebase your branch on top of the main branch. This will help you avoid merge conflicts, and sync your branch with the main branch.
- Addressing reviews on existing PRs is as important as creating new PRs. Please be responsive to the feedback and make the necessary updates.

## Code Review

All contributions go through a code review process to ensure the quality and maintainability of the codebase. During the review, maintainers may provide feedback or request changes to your code. Please be responsive to the feedback and make the necessary updates. There may be multiple rounds of review before your changes are approved.

## Code of Conduct

Please note that this project is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating in this project, you agree to abide by its terms.

## Questions

If you have any questions about the project or how to contribute, feel free to reach out to us on discord or DM on whatsapp.

## Judgement Criteria

Do not worry about the points scored during contributing. Feel free to make mistakes, but be open to acknowledge and fix them. The main goal is to learn and grow together. Depending on your enthusiasm, dedication and contribution, you will be judged in the end of CSOC.

---
