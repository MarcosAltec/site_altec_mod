import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Cabecalho from "./components/Cabecalho";
import Login from './pages/Login';
import Erro404 from './pages/Erro404';
import { useContext } from 'react';
import { AuthContext } from './contexts/AuthContexts';
import Home from './pages/Home';
import Registrar from './pages/Registrar';

function App(){
  const { usuario } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>
        {}
        <Route path="/" element={<Cabecalho />}/>
        <Route path="/home" element={<Home />}/>
        <Route path='/registrar' element={<Registrar />}/>
        <Route path="/login" element={<Login />}/>
        <Route path='*' element={<Erro404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;