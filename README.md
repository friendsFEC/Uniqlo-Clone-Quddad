<div align="center">
  <img src="./client/dist/img/app/quddad_Logo.png" style="height: 60px; width: 60px"/>
  <h1>Quddad Retail Page</h1>
</div>

## Tech Stack

**Client:** React, CSS

**Server:** Node, Express

## Getting Started

Run `npm install` and to get dependencies.

Run the development server with `npm run client-dev`, and open browse to
`http://localhost:3000` to see the rendered app!


## Contributing Changes

Make sure to create a `config.js` file in the root directory! It will need to
have your GitHub API key added. E.g. `API: "<your key here>"`. Import this into
your component for use with axios :)

CSS files should go in `client/dist`, and all the front-end javascript
edits should be made in `client/src`.

### Running and Creating Tests

We are using `jest` and the React testing library. You can contribute tests
by placing `<your test name>.test.js` inside `client/src/components/tests`.

Run tests using `npm test`

Some links for the testing technology:
* [Jest](https://jestjs.io/docs/getting-started)
* [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
* [NPM docs](https://www.npmjs.com/package/@testing-library/react)


### Running the Linter

The AirBnB style guide has been installed. You can run the linter against
the whole project by running `npm run lint` (this will lint everyone's work,
and may generate more output than you can action).

You can alos lint an individual file using
`npx eslint --ext .jsx clint/src/<path to your file>`


## Authors

- [@goksuokar](https://www.github.com/octokatherine)
- [@stolinator](https://github.com/orgs/friendsFEC/people/stolinator)
- [@jamesemerson](https://github.com/orgs/friendsFEC/people/jamesEmerson112)
- [@nicolastiennguyen](https://github.com/orgs/friendsFEC/people/nicolastiennguyen)
