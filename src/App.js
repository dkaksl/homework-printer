import "./App.css";

import { Main } from "./views/main";
import { Menu } from "./components/menu";

function App() {
  return (
    <div className="App">
      <header>
        <Menu />
      </header>
      <Main selected="Subtraction" />
    </div>
  );
}

export default App;
