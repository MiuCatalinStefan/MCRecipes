import React, {Component} from 'react';
import {Button, ButtonToolbar, Table} from 'react-bootstrap';
import {AddTagModal} from '../Modals/AddTagModal';
import {EditTagModal} from '../Modals/EditTagModel';
import SearchBox from './SearchBox';

export class AdminTag extends Component
{
    constructor(props)
    {
        super(props);
        this.state={tags:[], addModalShow:false, editModalShow:false, searchField:''}
    }

    refreshList(){
        fetch(process.env.REACT_APP_API+'tags', {credentials:'include'})
        .then(response => response.json())
        .then(data=>{
            this.setState({tags:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }

    deleteTags(ID){
        if(window.confirm('Are you sure?'))
        {
            fetch(process.env.REACT_APP_API+'tags/'+ID,{
                method:'DELETE',
                header:{'Accept':'application/json','Content-Type':'application/json'}
            })
        }
    }

    render(){

        const {tags, tagid, name, searchField} = this.state;

        const filteredTags = tags.filter(tag => (
            tag.name.toLowerCase().includes(searchField.toLowerCase())
        ))

        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return(
        <div>
            <h3>Taguri:</h3>
            <SearchBox placeholder={"Cauta un tag..." }  handleChange={(e) => this.setState({searchField:e.target.value})}/>
            <Table className="mt-4" bordered hover size="sm">
            <thead className="intrariTabel">
                       <tr>
                           <th>ID</th>
                           <th>Nume</th>
                           <th>Options</th>
                       </tr>
                   </thead>

                   <tbody className="intrariTabel">
                       {filteredTags.map(tag=>
                           <tr key={tag.tagID}>
                               <td>{tag.tagID}</td>
                               <td>{tag.name}</td>
                               <td>
                                   <Button className="mr-2" variant="info"
                                   onClick={()=>this.setState({editModalShow:true, tagid:tag.tagID, name:tag.name})}>
                                       Edit
                                   </Button>
                                   <Button className="mr-2" variant="danger"
                                   onClick={()=>this.deleteTags(tag.tagID)}>
                                       Delete
                                   </Button>
                                   <EditTagModal show={this.state.editModalShow} onHide={editModalClose} tagid={tagid} name={name}/>
                               </td>
                           </tr>)}
                   </tbody>

                <ButtonToolbar>
                    <Button variant="primary"
                    onClick={()=>this.setState({addModalShow:true})}>
                        Add Tag
                    </Button>
                    <AddTagModal show={this.state.addModalShow} onHide={addModalClose}/>
                </ButtonToolbar>
            </Table>
       </div>
        )
    }
}