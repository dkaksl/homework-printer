import "./App.css";

import { Main } from "./views/main";
import { Menu } from "./components/menu";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Menu />
        <Main selected="Addition" />
      </header>
    </div>
  );
}

export default App;
