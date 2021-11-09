const axios = require('axios')
const xml = require('xml2js')

const getIcecastJson = async (station) => {
  const { username, password, baseUrl } = station
  const token = Buffer.from(`${username}:${password}`, 'utf8').toString(
    'base64'
  )
  const AXIOS_CONFIG = {
    headers: {
      Authorization: `Basic ${token}`
    }
  }
  const response = await axios.get(`${baseUrl}/admin/`, AXIOS_CONFIG)
  const { icestats } = await xml.parseStringPromise(response.data)

  return icestats
}

const getIcecastStatus = async (station) => {
  const { stationName, checkMounts } = station
  const icestats = await getIcecastJson(station)
  const { listeners, outgoing_kbitrate, source } = icestats
  const check = checkMounts.map((m) => ({
    name: m.name,
    online:
      source.filter((s) => m.mounts.includes(s['$'].mount)).length ===
      m.mounts.length
  }))
  return {
    listeners,
    kbs: outgoing_kbitrate,
    checkMounts: check,
    nowPlaying: getTitleFromJson(icestats)
  }
}

const getTitleFromJson = (json) => {
  return json.source[0]?.title[0] ? json.source[0].title[0] : ''
}

module.exports = { getIcecastStatus, getIcecastJson, getTitleFromJson }
