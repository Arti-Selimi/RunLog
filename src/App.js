import './styles/App.scss';
import { Navbar } from './Navbar';
import { Options } from './Options';
import { Login } from './Auth/Login';

function App() {
  return (
    <div className="container">
      <Navbar />
      <Login />
      {/* <Options /> */}
    </div>
  );
}

export default App;