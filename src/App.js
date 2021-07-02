import './App.css';
import 'semantic-ui-css/semantic.min.css'
import MainDashboard from './layouts/MainDashboard';
import { ToastContainer } from 'react-toastify';
import { Container } from "semantic-ui-react"
import Navi from './layouts/Navi';

function App() {
  return (
    <div className="App">
      <ToastContainer position="bottom-right" />
      <Navi/>
      <Container>
        <MainDashboard />
      </Container>
    </div>

  );
}

export default App;
