# friends-fec

Front End Capstone Project for Team Friends

## Getting Started

Run `npm install` and to get dependencies.

Run the development server with `npm run client-dev`, and open browse to
`http://localhost:3000` to see the rendered app!


## Contributing Changes

Make sure to create a `config.js` file in the root directory! It will need to
have your GitHub API key added. E.g. `API: "<your key here>"`. Import this into
your component for use with axios :)

For now, CSS files should go in `client/dist`, and all the front-end javascript
edits should be made in `client/src`. In the future, we'll be able to put CSS
files in `client/src` and have webpack bundle them :)

### Frequently Used Git commands


#### When working on a current branch (`current`) and `main` branch has been updated:

1. Make your changes. `git add`, then `git commit` on your current branch.
2. Switch to main branch (`git checkout` or `git switch`) to main branch
  - Run `git pull origin main`
3. Switch back to your current branch
4. Run `git merge main`
5. Fix any conflicts by running `git diff main <branch name>` or `git status`
  - Edit the conflictng files
6. If necessary `git add` fixed conflicts and `git commit` to finish the merge!

#### Code Review

1. Clone this repo into a new space
2. Create a new branch (`git branch <new branch name>`)
3. Run `git pull origin <name of branch to review>`
4. Run `npm install` inside the cloned folder
5. Run `npm run client-dev` to start the dev server
6. If test code works (browse to `http://localhost:3000`) Remember to check the web console for errors! 
  - No errors -> Approve the request
  - Errors? -> Add comments requesting any changes.
