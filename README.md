# Adaptaviz

### 🇫🇷

Adaptaviz est un outil d'aide à la décision.

Il permet d'estimer sur une parcelle qu'elles seront les cultures, légumes, céréales, légumineuses les plus adaptés au climat future.

Il se base sur trois projections climatiques par scénario d'émission de gaz à effet de serre, associer aux phénotypes des végétaux. Et ainsi pouvoir en sortir quelles sont les zones à risque et les nouvelles zones favorables d'une culture.

Le preneur de décision aura la possibilité de savoir s'il pourra maintenir ses cultures à l'avenir ou pouvoir anticiper ses changements de récolte.

### 🇺🇸

Adaptaviz is a decision support tool.

It allows to estimate on a plot of land which crops, vegetables, cereals, legumes will be the most adapted to the future climate.

It is based on three climate projections by greenhouse gas emission scenario, associated with plant phenotypes. And thus to be able to get out of it which are the zones at risk and the new favorable zones of a culture.

The decision maker will be able to know if he will be able to maintain his crops in the future or to anticipate his changes of harvest.


[Score calculations algorithms](https://github.com/owalid/adaptaviz/tree/main/score)


[Data used for the scores calculations](https://github.com/owalid/adaptaviz/tree/main/score/data_ref)


[Data used in the website](https://github.com/owalid/adaptaviz/tree/main/static/data)

## Build Setup

####  With node

```bash
# install dependencies
$ yarn

# serve with hot reload at localhost:3000
$ yarn dev
```

####  With docker

```bash
# Create volume
$ docker create volume adaptaviz_node_modules

# Build and run app
$ docker compose up
```
