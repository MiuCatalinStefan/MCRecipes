import React, {Component} from 'react';
import { Table, Image} from 'react-bootstrap';

export class TagSearch extends Component
{
    render(){
        const{state} = this.props.location
        return(
            <div>
                <h3>Retete cu proprietatea: {state.name}</h3>
                <Table className="mt-4" hover bordered>
                    <tbody>
                        {state.recipes.map(rsp =>
                        <tr key = {rsp.id}>
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
                        </tr>
                        )}
                    </tbody>
                </Table>
            </div>

        )
    }
}