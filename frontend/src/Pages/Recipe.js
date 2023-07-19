import React, {Component} from 'react';
import { Table, Image, Button} from 'react-bootstrap';
import Timer from './Timer';
import {AddCommentModal} from '../Modals/AddCommentModal';
import YoutubeEmbed from './Video';
import Step from './Step';


export class Recipe extends Component
{
    constructor(props){

        super(props)
        this.state={
            addModalShow:false,
        }
    }


    render(){
        const{state} = this.props.location
        let addModalClose=()=>this.setState({addModalShow:false})

        return(
        <div >
            <div className="upDiv">
            <div>
            <Image src={process.env.REACT_APP_API_PHOTOS+state.photo} width="200px" height="200px"/>
            </div>
            <div>
                <h3>{state.title}</h3>
                <p>{state.description}</p>
            </div>
            </div>
            <Table bordered>
                    <tbody className="tagList">
                        {state.tags.map(tag=>
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
            </Table>
          
            <p>Ingrediente:</p>
            <Table borderless>
                    <tbody>
                        {state.ingredients.map(ing=>
                        <tr key = {ing.id} >
                                <td>
                                    <div >
                                    <p className="pInfo">{ing.name}</p>
                                    </div>
                                </td>
                        </tr>)}
                    </tbody>
            </Table>
            <div className="downDiv">
            <Table className="mt-4" bordered >
                    <tbody>
                        {state.steps.map(stp=>
                        <tr key = {stp.id}>
                                <Step timer={stp.timer} video={stp.video} description={stp.description}/>
                        </tr>)}
                    </tbody>
            </Table>
            </div >
            <div className="commTable" >
                    <tbody >
                        {state.comments.map(cmmt=>
                        <tr key = {cmmt.id} >
                                <td className="tdComms">
                                    <p className="pInfo">{cmmt.name} :   </p>
                                    <p className="pInfoTxt">{cmmt.text}</p>
                                </td>
                        </tr>
                        )}
                    </tbody>
            </div>
            <div>
                <Button variant="outline-warning" size="lg" onClick={()=>this.setState({addModalShow:true, recipeid:state.id})}>Adauga un Comentariu</Button>
                <AddCommentModal show={this.state.addModalShow} onHide={addModalClose} recipeid={state.id}/>
            </div>
        </div>)
    }


}