# friends-fec
Front End Capstone Project for Team Friends

## Frequently used Git Commands
When working on a current branch and main branch has been updated:
  1. make changes, add changes, commit changes on current branch
  2. switch to main branch and git pull origin main
  3. go back to current branch
  4. git merge main
  5. fix conflicts by running git diff main <current branch> or git status and go into conflicting files
For Code Review:
  1. clone repo into new space
  2. make new branch
  3. git pull origin <code review branch> into new branch
  4. npm run client-dev
  5. test if code works in localhost:3000 (CHECK CONSOLE TOO)
    a. if yes —> approve
    b. if not —> comment

## Getting Started

Run `npm install` and to get dependencies.

Run the development server with `npm run client-dev`, and open browse to
`http://localhost:3000` to see the rendered app!


## Contributing Changes

For now, CSS files should go in `client/dist`, and all the front-end javascript
edits should be made in `client/src`. In the future, we'll be able to put CSS
files in `client/src` and have webpack bundle them :)
