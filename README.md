# GOATENNIS

A very simple API to get info about some of the greatest tennis players of all time (even if we all know the real GOAT is Federer).

`GET /players` returns the list of players orderd by id in ascendant order
`GET /players/<id>` returns a specific player

## Install

```
  git clone https://github.com/PCreations/goatennis.git
  cd goatennis
  yarn install
```

## Running locally

`cp .env.dist .env` then edit the `.env` to add the local port to which you want the local server to listen on, then run `yarn start`

## Testing online

The project is deployed on firebase cloud functions. The api is accessible at this url : https://us-central1-goatennis-16345.cloudfunctions.net/api/

## Tests

`yarn test`
