import React, {Component, useEffect, useState} from 'react';
import {NavLink} from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import Logo from "../Photos/Logo.png";


const Navigation = (props) => {

    const logout = async()=>{
        await fetch('https://localhost:5001/api/users/logout',{
          method:'POST',
          headers:{'Accept':'application/json', 'Content-Type':'application/json'},
          credentials:'include',
        });

        props.setName('');
    }


    let menu;
    if(props.name === 'Administrator'){
        menu = (
        <Navbar className="navbar " expand="lr">
            <a className="navbar-brand text-white" href="/">
                <img src={Logo} alt="MC Recipes" width="70px" height="70px"></img>
            </a>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="navbar-nav">
                <Nav variant="pills">
                    <Nav.Item>
                    <NavLink className="text-white" to="/">
                        Acasa
                    </NavLink>
                    </Nav.Item>

                    <Nav.Item>
                    <NavLink className="text-white" to="/Recipes">
                        Retete
                    </NavLink>
                    </Nav.Item>

                    <Nav.Item>
                    <NavLink className="text-white" to="/Spices">
                        Condiment-o-dex
                    </NavLink>
                    </Nav.Item>

                    <Nav.Item>
                    <NavLink className="text-white" to="/controlpanel">
                        ControlPanel
                    </NavLink>
                    </Nav.Item>

                    <Nav.Item>
                    <NavLink className="text-white" to="/login" onClick={logout}>
                        LogOut
                    </NavLink>
                    </Nav.Item>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
        
        )
    }else{
        menu = (
            <Navbar className="navbar " expand="lr">
            <a className="navbar-brand text-white" href="/">
                <img src={Logo} alt="MC Recipes" width="70px" height="70px"></img>
            </a>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="navbar-nav">
                <Nav variant="pills">
                    <Nav.Item>
                    <NavLink className="text-white" to="/">
                        Acasa
                    </NavLink>
                    </Nav.Item>

                    <Nav.Item>
                    <NavLink className="text-white" to="/Recipes">
                        Retete
                    </NavLink>
                    </Nav.Item>

                    <Nav.Item>
                    <NavLink className="text-white" to="/Spices">
                        Condiment-o-dex
                    </NavLink>
                    </Nav.Item>

                   

                </Nav>
            </Navbar.Collapse>
        </Navbar>
        )
    }

        return(
            <div className="browserDiv">
                {menu}
            </div>
        )
    };

export default Navigation;