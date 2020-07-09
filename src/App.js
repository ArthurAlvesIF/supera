import React from 'react';
import logo from './logo.svg';
import './App.css';
import Teste from './components/teste';
import ResponsiveDrawer from './components/dashboard';
import Planos from './components/planos/planos';
import EditarPlano from './components/planos/editarPlano';
import AddPlano from './components/planos/addPlano';
import AddUsuario from './components/usuarios/addUsuario';
import {BrowserRouter as Router, 
  Route,
Switch,
Redirect} from 'react-router-dom';

import Usuarios from './components/usuarios/usuarios';
import EditarUsuario from './components/usuarios/editarUsuario';
import AddMateria from './components/materias/addMateria';
import Materias from './components/materias/materias';
import EditarMateria from './components/materias/editarMaterias';

import AddConteudo from './components/conteudos/addConteudos';
import Conteudos from './components/conteudos/conteudos';
import EditarConteudos from './components/conteudos/editarConteudos';

import AddAtividades from './components/atividades/addAtividades';
import Atividades from './components/atividades/atividades';
import EditarAtividades from './components/atividades/editarAtividades';
import AddMetodo from './components/metodos/addMetodos';
import Metodos from './components/metodos/metodos';
import EditarMetodo from './components/metodos/editarMetodo';
import Login from './components/login';
const logado = () =>{
   return localStorage.getItem("logado") !== null;

}
function App() {
  console.log(logado());
  return (
    <Router>
        <Switch>

        <Route exact path={"/login"} component ={Login}/>

        <PrivateRoute exact path = {"/"}><ResponsiveDrawer/></PrivateRoute>
        
        <PrivateRoute exact path={"/planos"}><Planos/></PrivateRoute>
        <PrivateRoute exact path={"/planos/editar/:id"} > <EditarPlano/></PrivateRoute>
        <PrivateRoute exact path={"/planos/adicionar"} ><AddPlano/></PrivateRoute>
        
        <PrivateRoute exact path={"/usuarios/adicionar"} ><AddUsuario/> </PrivateRoute>
        <PrivateRoute exact path={"/usuarios/editar/:id"}><EditarUsuario/></PrivateRoute>
        <PrivateRoute exact path={"/usuarios"}><Usuarios/></PrivateRoute>
        
        <PrivateRoute exact path ={"/materias/adicionar"}><AddMateria/></PrivateRoute>
        <PrivateRoute exact path ={"/materias"}><Materias/></PrivateRoute>
        <PrivateRoute exact path ={"/materias/editar/:id"} ><EditarMateria/></PrivateRoute>

        <PrivateRoute exact path ={"/conteudos/adicionar"}><AddConteudo/></PrivateRoute>
        <PrivateRoute exact path ={"/conteudos"}><Conteudos/></PrivateRoute>
        <PrivateRoute exact path ={"/conteudos/editar/:id"} ><EditarConteudos/></PrivateRoute>

        <PrivateRoute exact path={"/atividades/adicionar"}> <AddAtividades/></PrivateRoute>
        <PrivateRoute exact path={"/atividades"} ><Atividades/></PrivateRoute>
        <PrivateRoute exact path={"/atividades/editar/:id"}><EditarAtividades/></PrivateRoute>

        <PrivateRoute exact path={"/metodos"}><Metodos/></PrivateRoute>
        <PrivateRoute exact path={"/metodos/adicionar"}><AddMetodo/></PrivateRoute>
        <PrivateRoute exact path={"/metodos/editar/:id"}><EditarMetodo/></PrivateRoute>
        
        
        
        
        

        
        </Switch>
    </Router>
  );
    
};

function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        logado() ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
};

export default App;
