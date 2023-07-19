import React, {Component, useState} from 'react';
import { Table, Image } from 'react-bootstrap';
import SearchBox from './SearchBox';

export class Spices extends Component{

    constructor(props){
        super(props);
        this.state={spcs:[], searchField:''}
    }


    refreshList(){
        fetch(process.env.REACT_APP_API+'spices', {credentials:'include'})
        .then(response => response.json())
        .then(data=>{
            this.setState({spcs:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }


   


    render(){

        const {spcs, searchField} = this.state;

        const filteredSpices = spcs.filter(spc => (
            spc.name.toLowerCase().includes(searchField.toLowerCase())
        ))

        return(
            <div>
                <h3>Condiment-o-Dex:</h3>
                <SearchBox placeholder={"Cauta un condiment..." }  handleChange={(e) => this.setState({searchField:e.target.value})}/>
                <Table className="mt-4" bordered >
                    <tbody>
                        {filteredSpices.map(spc=>
                        <tr key = {spc.id}>
                            <div className="InfoSpiceDiv">
                                <div>
                                    <Image src={process.env.REACT_APP_API_PHOTOS+spc.photo} width="200px" height="200px"/>
                                </div>
                                <p className="SpiceInfo">{spc.name}</p>
                            </div>
                            <div>
                                <p className="SpiceInfo">{spc.description}</p>
                            </div>
                        </tr>)}
                    </tbody>
                </Table>
            </div>
        )
    }
}