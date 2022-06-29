import Homepage from "./pages/Home";
import Forms from "./pages/Forms";
import configureStore from "./store";
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from "react-router-dom";
export const store = configureStore()

function App() {
  return (
    <div className="App">
      <Provider store={store}>

        <BrowserRouter>

          <Routes>
            
            <Route path="/" element={<Homepage />}></Route>
            <Route path="/forms" element={<Forms />}></Route>

          </Routes>

        </BrowserRouter>

      </Provider>

    </div>
  );
}

export default App;
