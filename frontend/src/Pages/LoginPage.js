import React from 'react';
import { Component } from 'react';
import Login from './Login';

export class LoginPage extends Component
{
    constructor(props)
    {
        super(props);
    }
   render(){
 
       return(
           <div>
               <Login/>
           </div>
       )
   }
}