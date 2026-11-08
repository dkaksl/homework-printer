import { useState } from 'react'
import './App.css'
import 'flag-icons'
import './i18n/config'
import Menu from './components/menu'
import GameMenu from './components/game/menu'
import { Editor } from './editor/Editor'

function App() {
  const [view, setView] = useState('editor')
  return (
    <div className="app">
      <header>
        <Menu selected={view} navigationHandler={setView} />
      </header>
      <div className={`content content-${view}`}>
        {view === 'game' ? <GameMenu /> : <Editor />}
      </div>
    </div>
  )
}

export default App
