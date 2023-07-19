import {Component} from 'react';
import { Modal, Button, Row, Col, Form, FormLabel } from 'react-bootstrap';

export class AddRecipeTagModal extends Component{
    constructor(props){
        super(props);
        this.state={tags:[]};
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        fetch(process.env.REACT_APP_API+'tags', {credentials:'include'})
        .then(response => response.json())
        .then(data=>{
            this.setState({tags:data});
        });
    }


    handleSubmit(event){
        event.preventDefault();
        console.log(event.target.Tag.value);
        fetch(process.env.REACT_APP_API_TAGS+this.props.recipeid+'/'+event.target.Tag.value,{
            method:'POST',
            credentials:'include',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
        },
        (error)=>{
        })
    }

    render(){
        return(
            <div className="Container">
                <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                 <Modal.Header className="modalHeader">
                        <Modal.Title id="contained-modal-title-vcenter">
                            Add Tag
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body className="modalBody">
                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                <Form.Group controlId="Tag">
                                    <FormLabel>Tag</FormLabel>
                                    <Form.Control as="select">
                                        {this.state.tags.map(tag=>
                                            <option key={tag.TagID}>{tag.name}</option>
                                        )}
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group>
                                    <Button variant="primary" type="submit" onClick={this.props.onHide}>
                                        Add Tag
                                    </Button>
                                </Form.Group>
                                </Form>
                            </Col>
                        </Row> 
                    </Modal.Body>  

                      <Modal.Footer>
                        <Button variant="danger" onClick={this.props.onHide}>Close</Button>
                    </Modal.Footer>
 
                </Modal>
            </div>
        )
    }
}