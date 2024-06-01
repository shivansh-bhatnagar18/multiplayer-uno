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

Given that you have already forked the repository and set it up locally:

1. **Find an Issue to Work On**:
   - Look for issues labeled `help wanted` or `good first issue` if you are a first-time contributor.

2. **Comment on the Issue**:
   - Before starting work on an issue, comment on the issue to let others know that you are working on it. This helps prevent duplicate work. Once the issue is assigned to you, you can start working on it. 

   If you are not able to make progress on an issue in 4 days, you will be unassigned from the issue and it will be available for others to work on.

5. **Create a Branch**:
   - Create a new branch for your fix from the `main` branch. Use a descriptive name for your branch:
   It is crucial to fetch from upstream before creating a branch. This ensures that your branch is created from the latest changes in the main branch.

     ```bash
     git fetch upstream
     git checkout -b <your branch name> upstream/main
     ```

6. **Implement Your Fix**:
   - Make the necessary changes to fix the issue. Follow the existing code style and conventions. Please refer to the code style and conventions in [CONVENTIONS.md](CONVENTIONS.md).

7. **Test Your Changes**:
   - Thoroughly test your changes manually to ensure they work as intended and do not introduce any new bugs.
   - You can write unit tests for backend changes whenever required. Your changes should not cause existing tests to fail.
   - Adhere to the eslint suggestions and use prettier to format code before committing. 
   Running `npm run fix-format` in both the frontend and the backend will format all the files using prettier.


8. **Commit Your Changes**:
   - Please refer to the commit message guidelines in [CONVENTIONS.md](CONVENTIONS.md#commit-message-guidelines) for writing meaningful commit messages.

9. **Push Your Changes**:
   - Push your branch to your forked repository:

     ```bash
     git push origin fix/issue-#123
     ```

10. **Open a Pull Request**:
    - Open a pull request (PR) against the `main` branch of the original repository. Provide a clear description of your changes and reference the issue number you are fixing. Fill the self review checklist. You should only solve one issue in one PR.

11. **Address Review Comments**:
      - If maintainers suggests changes to your code, make the necessary updates and push the changes to your branch. The fix/changes should not be in a separate commit - rather the original commit must be modified force-pushed to the branch. If merge conflicts arise, use `git rebase` to resolve them. See the section on [editing commit history](#editing-commit-history) for more details.

<!-- todo: add details about modifying pull requests following a review.-->

## Points to remember during contribution

- Editing commit history and rebasing are very valuable tools for keeping the commit history clean and easy to understand. Please familiarize yourself with these concepts before contributing. In any case, the seniors will be there to help you out.
- Before starting work, run `git fetch upstream` and then `git rebase upstream/master`, to rebase your branch on top of the main branch. This will help you avoid merge conflicts, and sync your branch with the main branch.
<<<<<<< HEAD
- Addressing reviews on existing PRs is as important as creating new PRs. Please be responsive to the feedback and make the necessary updates.
<<<<<<< HEAD
=======
=======
- Addressing reviews on existing PRs is more important than creating new PRs. Please be responsive to the feedback and make the necessary updates.
>>>>>>> upstream/master
- Create a new branch for each issue you are working on. This will help you keep your changes isolated and make it easier to manage multiple PRs. The branch should be created from upstream/master, and only after fetching the latest changes from the main branch from upstream first.

## How to make a good Pull Request
- Make sure your PR is solving only one issue. If you are solving multiple issues, create separate PRs for each issue.
- Make sure your PR is up-to-date with the main branch. If there are any conflicts, resolve them before opening the PR.
- See [code review](#code-review) section for more details on how to address review comments.
- Write a coherent pull request description linking to the issue you are solving and the approach and notable decisions you made while solving the issue.
- The Pull Request should pass all the checks before it can be merged. The checks include:
  - ESLint checks (There should be no eslint errors at least in the files you have modified.)
  - Prettier checks
  - Unit tests 

## Common Git Operations you may need to perform

During contribution, you will often need to rewrite commit history or sync your branch with the main branch. 
Here is how you should do it:

### Syncing your branch with the main branch
If there have been updates to the upstream/master branch after you created your branch, you should sync your branch with the main branch. This will help you avoid merge conflicts and keep your branch up-to-date.

```bash
git fetch upstream
git rebase upstream/main
```
Rebasing your branch on top of the main branch will apply your changes on top of the latest changes in the main branch.
It would be equivalent to merging the main branch into your branch, but it keeps the commit history clean. The commit history will reflect that your changes were made on top of the latest changes in the main branch.

If any merge conflicts occur, you will need to resolve them manually. Code editors (like VSCode) have built-in tools to help you resolve merge conflicts. After resolving the conflicts, you can continue the rebase process by running `git rebase --continue`. 

Now the local copy of the branch is synced with upstream/main. You need to force push these changes to origin, since the commit history has been rewritten.

```bash
git push --force
```

### Editing commit history
A maintainer might ask you to edit your commit history, for example, change the variable name, add/remove lines, change commit message, drop commits etc. The changes should not be made as a separate commit, rather you should edit the original commit with the changes. You can do this using an interactive rebase.

Lets take the case where I want to merge 4 commits through a PR. The maintainer has asked me to change some variable names I had made through the 2nd commit. I am also asked to rename the commit message of the 3rd commit. 

```bash
git rebase -i HEAD~4
```

The `-i` represents interactive mode, i.e, after each commit, git will pause and ask you what you want to do with the commit. `HEAD~4` means that I want to rebase the last 4 commits.

After running the command, you will see a list of commits in your default text editor. It will look something like this:

```bash

pick 1a2b3c4d This is the commit message of Commit 1
pick 5e6f7g8h Added variables in index.js.
pick 9i0j1k2l Updeted README.md
pick 3m4n5o6p Commit msg 4

```
To drop a commit, you can simply delete the line corresponding to that commit. To edit a commit, you can replace `pick` with `edit` in front of the commit you want to edit.

Since we wish to edit the 2nd and 3rd commit, we will change the file to look like this:

```bash

pick 1a2b3c4d This is the commit message of Commit 1
edit 5e6f7g8h Added variables in index.js.
edit 9i0j1k2l Updeted README.md
pick 3m4n5o6p Commit msg 4

```
Save the changes and exit.

After saving the changes, git will then apply the 2nd commit and pause. You can now make the necessary changes to the code, and then stage the changes (Using `git add .`). You then incorporate the changes to the 2nd commit using `git commit --amend`. The editor opens, asking for commit meessage. You can change the commit message if needed at this needed.


#### "Uncommitting" a commit
When you choose to edit the 2nd commit, git pauses **after** applying the second commit. You might wish to uncommit all the changes made in the 2nd commit. In that case, you run `git reset HEAD~1`. This will uncommit the changes made in the 2nd commit, but keep the changes in the working directory. You can then make the necessary changes and commit them again. The `git reset` command can be used to uncommit any number of commits. For example, `git reset HEAD~2` will uncommit the last 2 commits. Note that after doing this operation, there would be no way to distinguish the changes made in the two commits. This command can be used outside of an interactive rebase as well.

After making the changes, you can continue the rebase process by running `git rebase --continue`. Git will then apply the 3rd commit and pause again. You can then change the commit message using `git commit --amend`. After making the changes, you can continue the rebase process by running `git rebase --continue`.

When there are no more commits left, the rebase process will be complete.

After all the commits have been applied, you can push the changes to your branch using `git push --force`. This will overwrite the commits in the remote branch in your forked repository with the changes you just made locally.

#### Tip
VSCode provides a helpful UI to perform these operations. You can set the default text editor for Git to VSCode by running the following command:

```bash
git config --global core.editor "code --wait"
```
This will open VSCode whenever you run a command that requires a text editor, like `git rebase -i HEAD~4`, `git commit --amend`, etc.

>>>>>>> upstream/master

## Code Review

All contributions go through a code review process to ensure the quality and maintainability of the codebase. During the review, maintainers may provide feedback or request changes to your code. Please be responsive to the feedback and make the necessary updates. There may be multiple rounds of review before your changes are approved.

When you open a pull request, you can request a review from the maintainers. You can also request a review after making changes in response to feedback. The requested reviewer may then review the PR themselves or delegate it to another maintainer. When requesting a review, make sure that your PR doesn't have merge conflicts. If it does, resolve the conflicts before requesting a review.

Your PR will be merged only after the maintainers approve it. Different areas of codebase are handled by different maintainers.

## Code of Conduct

Please note that this project is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating in this project, you agree to abide by its terms.

## Questions

If you have any questions about the project or how to contribute, feel free to reach out to us on discord or DM on whatsapp.

## Judgement Criteria

Do not worry about the points scored during contributing. Feel free to make mistakes, but be open to acknowledge and fix them. The main goal is to learn and grow together. Depending on your enthusiasm, dedication and contribution, you will be judged in the end of CSOC.

The main purpose for this whole activity is to get you acquainted with the open source contribution workflow. We cannot replicate the exact workflow of a real open source project due to the time constraints, but we have tried to cover the most important aspects of it (related to git, code review, etc.).

---
