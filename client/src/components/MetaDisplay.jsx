import styles from '../css/Meta.module.css'

function DisplayMeta({ meta }) {
  return meta === 'none' ? (
    <div>Couldn't get Stream info. Sorry!</div>
  ) : (
    <div>
      {meta.checkMounts.map((m) => {
        return (
          <p
            className={`${styles.status} ${
              m.online ? styles.online : styles.offline
            }`}
          >
            {m.name} - {m.online ? 'ONLINE' : 'OFFLINE'}
          </p>
        )
      })}
      <p className={styles.item}>
        <span className={styles.field}>Current Listeners</span>
        <br />
        <span className={styles.big}>{meta.listeners}</span>
      </p>
      <p className={styles.item}>
        <span className={styles.field}>Now Playing</span>
        <br />
        {meta.nowPlaying}
      </p>
      <p className={styles.item}>
        <span className={styles.field}>Current Throughput</span>
        <br />
        {meta.kbs} Kb/s
      </p>
      <p className={styles.item}>
        <span className={styles.field}>Data fetched at</span>
        <br />
        {new Date().toLocaleString()}
      </p>
    </div>
  )
}

export default DisplayMeta
