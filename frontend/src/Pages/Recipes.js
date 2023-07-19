import React, {Component} from 'react';
import { Table, Image, Button} from 'react-bootstrap';
import SearchBox from './SearchBox';


export class Recipes extends Component{

    constructor(props){
        super(props);
        this.state={rsps:[], tags:[], searchField:''}
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
        fetch(process.env.REACT_APP_API+'tags', {credentials:'include'})
        .then(response => response.json())
        .then(data=>{
            this.setState({tags:data});
        });

    }

    componentDidUpdate(){
        this.refreshList();
    }

    render(){

        const {rsps, searchField} = this.state;

        const filteredRecipes = rsps.filter(rsp => (
            rsp.title.toLowerCase().includes(searchField.toLowerCase())
        ))

        return(
            <div>
                <h3>Retete:</h3>
                <SearchBox placeholder={"Cauta o Reteta..." }  handleChange={(e) => this.setState({searchField:e.target.value})}/>
                <tbody className="tagList">
                        {this.state.tags.map(tag=>
                        <tr key = {tag.id} >
                                <td>
                                    <div className="divRecipe" >
                                    <Button className="btn-warning" onClick={() => this.props.history.push({
                                        pathname: '/tagsearch',
                                        state:tag
                                    })}>{tag.name}</Button>
                                    </div>
                                </td>
                        </tr>)}
                    </tbody>
                <Table className="mt-4" hover bordered >
                    <tbody>
                        {filteredRecipes.map(rsp=>
                        <tr key = {rsp.id} >
                                <td className="tds" onClick={()=>this.props.history.push({
                                    pathname: '/Recipe',
                                    state: rsp
                                })}  >
                                    <div className="recipeInfo" >
                                    <div>
                                        <Image src={process.env.REACT_APP_API_PHOTOS+rsp.photo} width="100px" height="100px"/>
                                    </div>
                                    <p className="recipeTitle">{rsp.title}</p>
                                    </div>
                                    <div>
                                        <p className="recipeDescription">{rsp.description}</p>
                                    </div>
                                </td>
                        </tr>)}
                    </tbody>
                </Table>
            </div>
        )
    }
}