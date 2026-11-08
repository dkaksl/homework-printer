import { useState } from 'react'
import './App.css'
import 'flag-icons'
import './i18n/config'
import Menu from './components/menu'
import GameMenu from './components/game/menu'
import { Editor } from './editor/Editor'
import { PrintedSheets } from './editor/PrintedSheets'

function App() {
  const [view, setView] = useState('editor')
  return (
    <div className="app">
      <header>
        <Menu selected={view} navigationHandler={setView} />
      </header>
      <div className={`content content-${view}`}>
        {view === 'game' ? <GameMenu /> : view === 'printed' ? <PrintedSheets /> : <Editor />}
      </div>
    </div>
  )
}

export default App
