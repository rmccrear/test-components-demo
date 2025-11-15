import { useState } from 'react'
import "sakura.css"
import './App.css'

import HelloWorld from './components/HelloWorld'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Hello There</h1>
      <HelloWorld />
    </>
  )
}

export default App
