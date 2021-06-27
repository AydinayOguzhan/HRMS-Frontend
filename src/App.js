import './App.css';
import 'semantic-ui-css/semantic.min.css'
import MainDashboard from './layouts/MainDashboard';
import { ToastContainer } from 'react-toastify';


function App() {
  return (
    <div className="App">
      <ToastContainer position="bottom-right"/>
      <MainDashboard/>
    </div>

  );
}

export default App;
