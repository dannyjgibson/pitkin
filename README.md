# Pitkin -- Unsurveilled Journalism Tools
Pitkin is a project for LMU's CSMI 402 class, colloquially known as the "Senior Project"

Pitkin itself is a web-app built on a Node and Express server.

The goal of Pitkin is to provide anonymous and unsurveilled tools for writers.

Writers can search, write and save their work, publish their work, read articles.

## Running Pitkin
Pitkin is intended to be hosted as a [Tor Hidden Service](https://www.torproject.org/docs/hidden-services.html.en), for optimal end-user security. However, what you've found in this repo is currently set up to just run on `localhost:3000` for demoing purposes. 

Once you clone the code. Open up terminal and run `mongod` to get your monogo instance running.

In a separate terminal window, run `node server/server.js`.

Pitkin is now running on your machine's `localhost:3000`

### Running as Tor Hidden Service
When the app is up on a Tor circuit, it can be found at this onion address: [drrnw33iylgclylb.onion](https://drrnw33iylgclylb.onion). You can point a Tor-enabled browser there and experience all the Pitkin fun you know and love.
