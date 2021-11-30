
import '../App.css';
import Header from '../Component/Header';
import Footer from '../Component/Footer';
import Content from '../Component/blog/Content';
import Menu from '../Component/Menu';
import New from '../Component/blog/New';
import { Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
function App() {
  return (
    <div >
      <div className="header">
        <Header />
      </div>
      <div className="row">
        <div className="menu col-md-2">
          <Menu />
        </div>
        <div className="content col-md-10">
          <Routes>
            <Route path="/" element={<Content />} />
            <Route path="/New" element={<New />} />
            <Route path="/edit/:id" element={<New />} />
          </Routes>
        </div>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}

export default App;
