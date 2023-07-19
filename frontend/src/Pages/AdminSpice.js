import React, {Component} from 'react';
import {Button, ButtonToolbar, Table} from 'react-bootstrap';
import {AddSpiceModal} from '../Modals/AddSpiceModal';
import { EditSpiceModal } from '../Modals/EditSpiceModal';
import SearchBox from './SearchBox';

export class AdminSpice extends Component{

    constructor(props){
        super(props);
        this.state={spcs:[], addModalShow:false, editModalShow:false, searchField:''}
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

    deleteSpice(ID){
        if(window.confirm('Are you sure?'))
        {
            fetch(process.env.REACT_APP_API+'spices/'+ID,{
                method:'DELETE',
                header:{'Accept':'application/json','Content-Type':'application/json'}
            })
        }
    }

    render(){
        const {spcs, id, name, description, photo, searchField} = this.state;

        const filteredSpices = spcs.filter(spc => (
            spc.name.toLowerCase().includes(searchField.toLowerCase())
        ))

        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});

        return(
            <div>
                 <h3>Condimente:</h3>
                <SearchBox placeholder={"Cauta un condiment..." }  handleChange={(e) => this.setState({searchField:e.target.value})}/>
                <Table className="mt-4" bordered hover size="sm">
                    <thead className="intrariTabel">
                        <tr>
                            <th>ID</th>
                            <th>Nume</th>
                            <th>Descriere</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody className="intrariTabel">
                        {filteredSpices.map(spc=>
                            <tr key={spc.id}>
                                <td>{spc.id}</td>
                                <td>{spc.name}</td>
                                <td>{spc.description}</td>
                                <td>
                                    <ButtonToolbar>

                                        <Button className="mr-2" variant="info" onClick={
                                            ()=>this.setState({editModalShow:true, id:spc.id, name:spc.name, description:spc.description, photo: spc.photo})
                                        }>
                                            Edit
                                        </Button>


                                        <Button className="mr-2" variant="danger"
                                        onClick={()=>this.deleteSpice(spc.id)}>
                                            Delete
                                        </Button>

                                        <EditSpiceModal show={this.state.editModalShow} onHide={editModalClose} id={id} name={name} description={description} photo={photo} />

                                    </ButtonToolbar>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
                <ButtonToolbar>
                    <Button variant="primary"
                    onClick={()=>this.setState({addModalShow:true})}>
                        Add Spice
                    </Button>

                    <AddSpiceModal show={this.state.addModalShow} onHide={addModalClose}/>
                </ButtonToolbar>
            </div>
        )
    }
}