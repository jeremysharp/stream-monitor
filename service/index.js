const config = require('../config')
const { getIcecastStatus } = require('../common/getters')
const schedule = require('node-schedule')
const Influx = require('influx')

const { stations } = config

const influx = new Influx.InfluxDB(config.influxConfig)

const savePoints = async (station) => {
  const fields = await getIcecastStatus(station)
  delete fields.checkMounts
  influx.writePoints([
    {
      measurement: 'stats',
      tags: { station: station.stationName },
      fields
    }
  ])
}

const processEndpoints = async () => {
  for (let i = 0; i < stations.length; i++) {
    savePoints(stations[i])
  }
}

schedule.scheduleJob('0 * * * * *', processEndpoints)
