# coin-cluster
An order book aggregator for crypto-currency exchanges highlighting market trends and arbitrage opportunities. Aggregates order books for the BTC-ETH, BTC-LTC, and BTC-DOGE markets using the following exchanges: Bittrex, Poloniex, HitBTC, and Bitstamp (Bitstamp does not have BTC-DOGE market).

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

[Node.js] (https://nodejs.org/en/)

### Installing

1. Clone the repo.

2. Install node packages. 

```
npm install
```

3. Clone the [React client app](https://github.com/emcooper/coin-cluster-client)

4. Install node packages on the client app. 

```
npm install
```

5. In the client app, change websocket endpoint to local host.

src/App.js line:8 
```
-const endpoint = "https://coin-cluster-backend.herokuapp.com/"
+const endpoint = "http://127.0.0.1:8080"
```

6. Start the websocket server
```
npm start
```

7. Start the client server
```
npm start
```

The client application should open in your browser automatically.


## Running the tests

```
mocha test
```

## Deployment

### To deploy the server-side app:
```
heroku create app-name
git push heroku master
```

Change the client side endpoint to the heroku url.

src/App.js line:8 
```
-const endpoint = "http://127.0.0.1:8080"
+const endpoint = "https://app-name.herokuapp.com/"

```

### To deploy the react client:

#### Step 1: Replace `homepage` to `package.json`

Open your `package.json` and replace the `homepage` field with your own github repo address:

```js
  "homepage": "https://myusername.github.io/my-app",
```

#### Step 2: Deploy the site by running `npm run deploy`

Then run:

```sh
npm run deploy
```

#### Step 3: Ensure your project’s settings use `gh-pages`

Finally, make sure **GitHub Pages** option in your GitHub project settings is set to use the `gh-pages` branch:

<img src="http://i.imgur.com/HUjEr9l.png" width="500" alt="gh-pages branch setting">


## Built With

Server-side Websocket App
* [Node.js](https://nodejs.org/en/) 
* [Express](https://expressjs.com/) 

Client-side React App
* [React](https://reactjs.org/) 
* [Bootstrap](http://getbootstrap.com/) 

## Contributing


When contributing to this repository, please first discuss the change you wish to make via issue,
email, or any other method with the owners of this repository before making a change. 

Please note we have a code of conduct, please follow it in all your interactions with the project.

### Pull Request Process

1. Ensure any install or build dependencies are removed before the end of the layer when doing a 
   build.
2. Update the README.md with details of changes to the interface, this includes new environment 
   variables, exposed ports, useful file locations and container parameters.
3. You may not merge your pull request, please allow the owner of the repository to merge any pull requests.

### Code of Conduct

#### Our Pledge

In the interest of fostering an open and welcoming environment, we as
contributors and maintainers pledge to making participation in our project and
our community a harassment-free experience for everyone, regardless of age, body
size, disability, ethnicity, gender identity and expression, level of experience,
nationality, personal appearance, race, religion, or sexual identity and
orientation.

#### Our Standards

Examples of behavior that contributes to creating a positive environment
include:

* Using welcoming and inclusive language
* Being respectful of differing viewpoints and experiences
* Gracefully accepting constructive criticism
* Focusing on what is best for the community
* Showing empathy towards other community members

Examples of unacceptable behavior by participants include:

* The use of sexualized language or imagery and unwelcome sexual attention or
advances
* Trolling, insulting/derogatory comments, and personal or political attacks
* Public or private harassment
* Publishing others' private information, such as a physical or electronic
  address, without explicit permission
* Other conduct which could reasonably be considered inappropriate in a
  professional setting

#### Our Responsibilities

Project maintainers are responsible for clarifying the standards of acceptable
behavior and are expected to take appropriate and fair corrective action in
response to any instances of unacceptable behavior.

Project maintainers have the right and responsibility to remove, edit, or
reject comments, commits, code, wiki edits, issues, and other contributions
that are not aligned to this Code of Conduct, or to ban temporarily or
permanently any contributor for other behaviors that they deem inappropriate,
threatening, offensive, or harmful.

#### Scope

This Code of Conduct applies both within project spaces and in public spaces
when an individual is representing the project or its community. Examples of
representing a project or community include using an official project e-mail
address, posting via an official social media account, or acting as an appointed
representative at an online or offline event. Representation of a project may be
further defined and clarified by project maintainers.

#### Enforcement

Instances of abusive, harassing, or otherwise unacceptable behavior may be
reported by contacting the project owner at ellencooper74@gmail.com. All
complaints will be reviewed and investigated and will result in a response that
is deemed necessary and appropriate to the circumstances. The project team is
obligated to maintain confidentiality with regard to the reporter of an incident.
Further details of specific enforcement policies may be posted separately.

Project maintainers who do not follow or enforce the Code of Conduct in good
faith may face temporary or permanent repercussions as determined by other
members of the project's leadership.

#### Attribution

This Code of Conduct is adapted from the [Contributor Covenant][homepage], version 1.4,
available at [http://contributor-covenant.org/version/1/4][version]

[homepage]: http://contributor-covenant.org
[version]: http://contributor-covenant.org/version/1/4/


## Authors

* **Ellen Cooper** - [emcooper](https://github.com/emcooper)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

