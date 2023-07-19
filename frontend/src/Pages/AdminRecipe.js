import React, {Component} from 'react';
import { Table, Image, Button, ButtonToolbar} from 'react-bootstrap';
import { AddIngredientModal } from '../Modals/AddIngredientModal';
import { AddStepModal } from '../Modals/AddStepModal';
import { EditIngredient } from '../Modals/EditIngredient';
import {EditStep} from '../Modals/EditStep';
import { EditRecipeModal } from '../Modals/EditRecipe';
import { AddRecipeTagModal } from '../Modals/AddRecipeTagModal';

export class AdminRecipe extends Component
{
    constructor(props){
        super(props)
        this.state={addIngredientModalShow:false, addStepModalShow:false, editIngredientModalShow:false, editStepModalShow:false, editRecipeModalShow:false, addRecipeTagModalShow:false}
    }

    deleteComment(ID){
        if(window.confirm('Are you sure?'))
        {
            fetch(process.env.REACT_APP_API_DELETECOMMENT+ID,{
                method:'DELETE',
                header:{'Accept':'application/json','Content-Type':'application/json'}
            })
        }
    }

    deleteIngredient(ID){
        if(window.confirm('Are you sure?'))
        {
            fetch(process.env.REACT_APP_API_DELETEINGREDIENT+ID,{
                method:'DELETE',
                header:{'Accept':'application/json','Content-Type':'application/json'}
            })
        }
    }

    deleteStep(ID){
        if(window.confirm('Are you sure?'))
        {
            fetch(process.env.REACT_APP_API_DELETESTEP+ID,{
                method:'DELETE',
                header:{'Accept':'application/json','Content-Type':'application/json'}
            })
        }
    }

    deleteTag(tagID, rspID){
        if(window.confirm('Do you want to delete tag?'))
        {
            fetch(process.env.REACT_APP_API_TAGDELETE+rspID+'/'+tagID,{
                method:'DELETE',
                header:{'Accept':'application/json','Content-Type':'application/json'}
            })
        }
    }

    render(){
        const{state} = this.props.location
        const{ingid, ingname, stpid, stpvideo, stpdescription, stptimer, rspid, rspdescription, rspphoto, rsptitle} =this.state
        let addIngredientModalClose =()=>this.setState({addIngredientModalShow:false});
        let addStepModalClose =()=>this.setState({addStepModalShow:false});
        let editIngredientModalClose =()=>this.setState({editIngredientModalShow:false});
        let editStepModalClose =()=>this.setState({editStepModalShow:false});
        let editRecipeModalClose =()=>this.setState({editRecipeModalShow:false});
        let addRecipeTagModalClose =()=>this.setState({addRecipeTagModalShow:false});
        return(
            <div>
                <h3>Reteta</h3>

            <div>
                <Image src={process.env.REACT_APP_API_PHOTOS+state.photo} width="200px" height="200px"/>
            </div>

            <h4>Basics:</h4>
            <Table className="mt-4" bordered size="sm">
            <thead className="intrariTabel">
                        <tr>
                            <th>ID</th>
                            <th>Titlu</th>
                            <th>Descriere</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody className="intrariTabel">
                    <tr key={state.id}>
                                <td>{state.id}</td>
                                <td>{state.title}</td>
                                <td>{state.description}</td>
                                <td>
                                    <ButtonToolbar>
                                        <Button className="mr-2" variant="info"
                                         onClick={()=>this.setState({editRecipeModalShow:true, rspid:state.id, rsptitle:state.title, rspdescription:state.description, rspphoto:state.photo})}>
                                            Edit
                                        </Button>
                                        <EditRecipeModal show={this.state.editRecipeModalShow} onHide={editRecipeModalClose} id={rspid} title={rsptitle} description={rspdescription} photo={rspphoto}/>
                                    </ButtonToolbar>
                                </td>
                    </tr>
                    </tbody>
            </Table>
            <div>
            <Table bordered>
                    <tbody className="tagList">
                        {state.tags.map(tag=>
                        <tr key = {tag.id} >
                                <td>
                                    <div className="divRecipe" >
                                    <Button className="btn-warning" onClick={() => this.deleteTag(tag.name, 14)}>{tag.name}</Button>
                                    </div>
                                </td>
                        </tr>)}
                    </tbody>
            </Table>
            <ButtonToolbar>
            <Button className="mr-2"
             onClick={()=>this.setState({addRecipeTagModalShow:true, recipeid:state.id})}>
                 Add Tag
            </Button>
            <AddRecipeTagModal show={this.state.addRecipeTagModalShow} onHide={addRecipeTagModalClose} recipeid={state.id}/>
            </ButtonToolbar>
            </div>
                <div>
                    <h4>Ingredients:</h4>
                    <Table className="mt-4" bordered>
                    <thead className="intrariTabel">
                        <tr>
                            <th>Nume</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody className="intrariTabel">
                    {state.ingredients.map(ing=>
                        <tr key = {ing.id} >
                                <td>
                                   {ing.name}
                                </td>
                                <td>
                                    <ButtonToolbar>
                                    <Button className="mr-2" variant="danger"
                                    onClick={() =>this.deleteIngredient(ing.id)}>
                                            Delete
                                        </Button>
                                        <Button className="mr-2" variant="info"
                                        onClick={()=>this.setState({editIngredientModalShow:true, ingid:ing.id, ingname:ing.name})}>
                                            Edit
                                        </Button>
                                        <EditIngredient show={this.state.editIngredientModalShow} onHide={editIngredientModalClose} id={ingid} name={ingname}/>
                                    </ButtonToolbar>
                                </td>
                        </tr>)}
                    </tbody>
                    </Table>
                    <Button variant="primary"
                    onClick={()=>this.setState({addIngredientModalShow:true, recipeid:state.id})}>
                        Add Ingredient
                    </Button>
                    <AddIngredientModal show={this.state.addIngredientModalShow} onHide={addIngredientModalClose} recipeid={state.id}/>
                </div>
                <div>
                    <h4>Steps</h4>
                    <Table className="mt-4" bordered>
                    <thead className="intrariTabel">
                        <tr>
                            <th>Time</th>
                            <th>Description</th>
                            <th>Video</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody className="intrariTabel">
                    {state.steps.map(stp=>
                        <tr key = {stp.id} >
                                <td>
                                   {stp.timer}
                                </td>
                                <td>
                                   {stp.description}
                                </td>
                                <td>
                                   {stp.video}
                                </td>
                                <td>
                                    <ButtonToolbar>
                                    <Button className="mr-2" variant="danger"
                                    onClick={() =>this.deleteStep(stp.id)}>
                                            Delete
                                        </Button>
                                        <Button className="mr-2" variant="info"
                                        onClick={()=>this.setState({editStepModalShow:true, stpid:stp.id, stpvideo:stp.video, stpdescription:stp.description, stptimer:stp.timer})}>
                                            Edit
                                        </Button>

                                        <EditStep show={this.state.editStepModalShow} onHide={editStepModalClose} id={stpid} video={stpvideo} timer={stptimer} description={stpdescription}/>
                                    </ButtonToolbar>
                                </td>
                        </tr>)}
                    </tbody>
                    </Table>
                    <Button variant="primary" onClick={()=>this.setState({addStepModalShow:true, recipeid:state.id})}>
                        Add Step
                    </Button>
                    <AddStepModal show={this.state.addStepModalShow} onHide={addStepModalClose} recipeid={state.id}/>
                </div>
                <div>
                        <h4>Comments</h4>
                        <Table className="mt-4" bordered>
                    <thead className="intrariTabel">
                        <tr>
                            <th>ID</th>
                            <th>Nume</th>
                            <th>Comentariu</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody className="intrariTabel">
                    {state.comments.map(cmmt=>
                        <tr key = {cmmt.id} >
                                <td>
                                    {cmmt.id}
                                </td>
                                <td>
                                   {cmmt.name}
                                </td>
                                <td>
                                   {cmmt.text}
                                </td>
                                <td>
                                    <ButtonToolbar>
                                    <Button className="mr-2" variant="danger" 
                                    onClick={() =>this.deleteComment(cmmt.id)}>
                                            Delete
                                        </Button>
                                    </ButtonToolbar>
                                </td>
                        </tr>)}
                    </tbody>
                    </Table>
                </div>
            </div>
        )
    }



}