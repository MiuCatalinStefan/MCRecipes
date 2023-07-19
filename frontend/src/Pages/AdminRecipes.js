import React, {Component} from 'react';
import { Button, ButtonToolbar, Table } from 'react-bootstrap';
import SearchBox from './SearchBox';
import { AddRecipeModal } from '../Modals/AddRecipeModal';


export class AdminRecipes extends Component{

    constructor(props){
        super(props);
        this.state={rsps:[], addModalShow:false, searchField:''}
    }

    refreshList(){
        fetch(process.env.REACT_APP_API+'recipes', {credentials:'include'})
        .then(response => response.json())
        .then(data=>{
            this.setState({rsps:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }

    deleteRecipe(ID){
        if(window.confirm('Are you sure?'))
        {
            fetch(process.env.REACT_APP_API+'recipes/'+ID,{
                method:'DELETE',
                header:{'Accept':'application/json','Content-Type':'application/json'}
            })
        }
    }

    render(){
        const {rsps, searchField} = this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        const filteredRecipes = rsps.filter(rsp => (
            rsp.title.toLowerCase().includes(searchField.toLowerCase())
        ))

        return(
            <div>
                <h3>Retete:</h3>
                <SearchBox placeholder={"Cauta o Reteta..." }  handleChange={(e) => this.setState({searchField:e.target.value})}/>
                <Table className="mt-4" bordered hover size="sm">
                    <thead className="intrariTabel">
                        <tr>
                            <th>ID</th>
                            <th>Titlu</th>
                            <th>Descriere</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody className="intrariTabel">
                        {filteredRecipes.map(rsp=>
                            <tr key={rsp.id}>
                                <td>{rsp.id}</td>
                                <td>{rsp.title}</td>
                                <td>{rsp.description}</td>
                                <td>
                                    <ButtonToolbar>
                                        <Button className="mr-2" variant="info" onClick={()=>this.props.history.push({
                                            pathname:'/adminrecipe',
                                            state: rsp
                                        })}>
                                            Edit
                                        </Button>

                                        <Button className="mr-2" variant="danger" onClick={()=>this.deleteRecipe(rsp.id)}>
                                            Delete
                                        </Button>
                                    </ButtonToolbar>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
                <ButtonToolbar>
                    <Button variant="primary" onClick={()=>this.setState({addModalShow:true})}>
                        Add Recipe
                    </Button>
                    <AddRecipeModal show={this.state.addModalShow} onHide={addModalClose}/>
                </ButtonToolbar>
            </div>
        )
    }
}