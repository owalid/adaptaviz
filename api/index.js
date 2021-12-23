/* eslint-disable dot-notation */
import express from 'express'
import helmet from 'helmet'
import { cloneDeep, findIndex } from 'lodash'
import cors from 'cors'
import smallRegions from '../static/data/small-regions'
import scoresWithAnomaly1 from '../static/data/scores-with-anomaly-1'
import scoresWithAnomaly2 from '../static/data/scores-with-anomaly-2'
import scoresWithoutAnomaly1 from '../static/data/scores-without-anomaly-1'
import scoresWithoutAnomaly2 from '../static/data/scores-without-anomaly-2'

// Create express instance
const app = express()

// Require API routes
app.use(cors())
app.use(express.json());
app.use(helmet())

app.post('/get-geojson', (req, res) => {
  const {scenario, horizon, specie, scoreType, anomaly} = req.body

  const smallRegionsClone = cloneDeep(smallRegions)
  const scoresClone = (anomaly)
      ? [...scoresWithAnomaly1, ...scoresWithAnomaly2]
      : [...scoresWithoutAnomaly1 , ...scoresWithoutAnomaly2]
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