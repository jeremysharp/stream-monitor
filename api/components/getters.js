const axios = require('axios')
const xml = require('xml2js')
const username = 'admin'
const password = 'speedXleopard1666!'
const token = Buffer.from(`${username}:${password}`, 'utf8').toString('base64')
const SERVER = 'https://stream.kennetradio.com'
const CHECK_MOUNTS = [
  { name: 'main', mounts: ['/128.mp3', '/64.aac'] },
  { name: 'backup', mounts: ['/backup128.mp3', '/backup64.aac'] }
]
const AXIOS_CONFIG = {
  headers: {
    Authorization: `Basic ${token}`
  }
}

const getIcecastJson = async () => {
  const response = await axios.get(`${SERVER}/admin/`, AXIOS_CONFIG)
  const { icestats } = await xml.parseStringPromise(response.data)

  return icestats
}

const getIcecastStatus = async () => {
  const response = await axios.get(`${SERVER}/admin/`, AXIOS_CONFIG)
  const { icestats } = await xml.parseStringPromise(response.data)
  const { listeners, outgoing_kbitrate, source } = icestats
  const checkMounts = CHECK_MOUNTS.map((m) => ({
    name: m.name,
    online:
      source.filter((s) => m.mounts.includes(s['$'].mount)).length ===
      m.mounts.length
  }))
  return {
    listeners,
    kbs: outgoing_kbitrate,
    checkMounts
  }
}
module.exports = { getIcecastStatus, getIcecastJson }
