import { useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import Welcome from './components/Welcome'
import MetaDisplay from './components/MetaDisplay'
import Footer from './components/Footer'
import getMeta from './components/getMeta'

function App() {
  const [meta, setMeta] = useState(null)

  async function getInfo(event) {
    event.preventDefault()
    const response = await getMeta()
    setMeta(response)
  }

  return (
    <div className="App">
      <header className="App-header">
        {meta ? <MetaDisplay meta={meta} /> : <Welcome />}
        <Form onSubmit={getInfo}>
          <Button variant="primary" size="lg" onClick={getInfo}>
            Get Stream Info
          </Button>
        </Form>
      </header>
      <Footer />
    </div>
  )
}

export default App
