import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import HeaderComponent from "./components/headerComponent";
import ListPostComponent from "./components/listPostComponent";

function App() {
  return (
    <div>
      <Router>
        <Toaster
          toastOptions={{
            style: {
              zIndex: 20,
            },
          }}
          position="top-right"
          reverseOrder={false}
        />
        <HeaderComponent />
        <ListPostComponent />
      </Router>
    </div>
  );
}

export default App;
