import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export class ControlPanel extends Component
{
    
    render(){
        return(
            <div >
                <h3>Meniu:</h3>
                <div className="meniuDiv">
                <Link to="/admintag" className="btn btn-primary">Tags</Link>
                </div>
                <div className="meniuDiv">
                <Link to="/adminrecipes" className="btn btn-primary">Recipes</Link>
                </div>
                <div className="meniuDiv">
                <Link to="/adminspice" className="btn btn-primary">Spices</Link>
                </div>
            </div>
        )
    }
}