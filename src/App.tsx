import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import HeaderComponent from "./components/headerComponent/headerComponent";
import ListPostComponent from "./components/listPostComponent/listPostComponent";

function App() {
  return (
    <div>
      <Router>
        <Toaster
          toastOptions={{
            style: {
              zIndex: 5,
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
