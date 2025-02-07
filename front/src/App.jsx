import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useContext } from 'react';
import { AuthContext } from './contexts/AuthContexts';
import Login from './pages/Login';
import Erro404 from './pages/Erro404';
import Home from './pages/Home';
import Registrar from './pages/Registrar';
import Perfil from './pages/Perfil';
import ProdutoSaibaMais from './pages/ProdutoSaibaMais';
import Sobre from './pages/Sobre';
import Suporte from './pages/Suporte';
import PerguntasFrequentes from './pages/PerguntasFrequentes';
import Carrinho from './pages/Carrinho';

function App(){
  const { usuario } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>
        {!usuario.logado ? (
          <>
          <Route path='/registrar' element={<Registrar />}/>
          <Route path="/login" element={<Login />}/>
          </>
          
        ) : (
          <>
          <Route path="/perfil" element={<Perfil />}/>
          </>
        )}
        <Route path="/" element={<Home />}/>
        <Route path="/produto/:codigo/:name" element={<ProdutoSaibaMais />}/>
        <Route path='*' element={<Erro404 />} />
        <Route path='/sobre' element={<Sobre />} />
        <Route path='/suporte' element={<Suporte /> } />
        <Route path='/perguntas-frequentes' element={<PerguntasFrequentes />} />
        <Route path='/carrinho' element={<Carrinho />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;