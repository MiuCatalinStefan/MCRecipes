import './App.css';
import {Footer} from './Pages/Footer'
import Home from './Pages/Home';
import { Recipes } from './Pages/Recipes';
import {Spices} from './Pages/Spices';
import Navigation from'./Pages/Navigation';
import {Recipe} from './Pages/Recipe';
import {TagSearch} from './Pages/TagSearch';
import {AdminSpice} from './Pages/AdminSpice';
import {AdminTag} from './Pages/AdminTag';
import { AdminRecipes } from './Pages/AdminRecipes';
import { AdminRecipe } from './Pages/AdminRecipe';
import { ControlPanel } from './Pages/ControlPanel';
import { LoginPage } from './Pages/LoginPage';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import { useEffect, useState} from 'react';
import AuthRouteCP from './AuthRouteCP';


//Rulare: set HTTPS=true&&npm start 

function App() {

  const [isAdmin, userIsAdmin] = useState('');

  useEffect(()=>{
      (
          async () => {
             const response = await fetch('https://localhost:5001/api/users/user',{
                  headers:{'Accept':'application/json', 'Content-Type':'application/json'},
                  credentials:'include',
                  
                });

                 const content = await response.json();
                  userIsAdmin(content.name);
                
          }
      )();
  });

 
  console.log(isAdmin)
  return (
    <div>
    <div>
    <BrowserRouter className="browser">
    <div className="container-fluid">

      <Navigation name={isAdmin} setName={userIsAdmin}/>

      <Switch>
        <Route path='/' component={Home} exact/>
        <Route path='/recipes' component={Recipes} exact/>
        <Route path='/spices' component={Spices} exact/>
        <Route path='/recipe' component={Recipe} exact/>
        <Route path='/tagsearch' component={TagSearch} exact/>
        <AuthRouteCP path='/adminspice' component={AdminSpice} name={isAdmin}/>
        <AuthRouteCP path='/admintag' component={AdminTag} name={isAdmin}/>
        <AuthRouteCP path='/adminrecipes' component={AdminRecipes} name={isAdmin}/>
        <AuthRouteCP path='/adminrecipe' component={AdminRecipe} name={isAdmin}/>
        <AuthRouteCP path='/controlpanel' component={ControlPanel} name={isAdmin}/>
        
        <Route path="/login" component={LoginPage} exact/>
      </Switch>

    </div>
    </BrowserRouter>
    </div>
    <div>
    <Footer/>
    </div>
    
    </div>
  );
}

export default App;
