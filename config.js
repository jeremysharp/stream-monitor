const Influx = require('influx')

module.exports = {
  influxConfig: {
    host: '192.168.1.5',
    database: 'streamdata',
    schema: [
      {
        measurement: 'stats',
        fields: {
          listeners: Influx.FieldType.INTEGER,
          kbs: Influx.FieldType.INTEGER,
          nowPlaying: Influx.FieldType.STRING
        },
        tags: ['station']
      }
    ]
  },
  stations: [
    {
      stationName: 'kennet',
      baseUrl: 'https://stream.kennetradio.com',
      username: 'admin',
      password: 'speedXleopard1666!',
      checkMounts: [
        { name: 'main', mounts: ['/128.mp3', '/64.aac'] },
        { name: 'backup', mounts: ['/backup128.mp3', '/backup64.aac'] }
      ]
    }
  ]
}
