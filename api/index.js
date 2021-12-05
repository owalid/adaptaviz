/* eslint-disable dot-notation */
import express from 'express'
import helmet from 'helmet'
import { cloneDeep, findIndex } from 'lodash'
import cors from 'cors'
import smallRegions from './data/small-regions'
import scores from './data/scores'

// Create express instance
const app = express()

// Require API routes
app.use(cors())
app.use(express.json());
app.use(helmet())

app.post('/get-geojson', (req, res) => {
  console.log(req.body)
  // eslint-disable-next-line no-unused-vars
  const {scenario, horizon, specie, scoreType, anomaly} = req.body
  console.log(scenario, horizon, specie, scoreType, anomaly)
  const smallRegionsClone = cloneDeep(smallRegions);
  const scoresClone = cloneDeep(scores)

  scoresClone.forEach(scoreElmt => {
    if (scoreElmt['Scenario'] === scenario
        && scoreElmt['Horizon'] === horizon
        && scoreElmt['Espece'] === specie) {
      const currentCodePra = scoreElmt.code_pra
      const currentIndex = findIndex(smallRegionsClone.features, (o) => o.properties.code_pra === currentCodePra)
      if (currentIndex !== -1) {
        smallRegionsClone.features[currentIndex].score = scoreElmt[scoreType]
      }
    }
  })
  return res.json({data: smallRegionsClone})
})

// Export express app
module.exports = app

// Start standalone server if directly running
if (require.main === module) {
  const port = process.env.PORT || 3001
  // db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`API server listening on port ${port}`)
  })
  // })
}