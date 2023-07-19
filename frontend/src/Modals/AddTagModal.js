import React, {Component} from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';

export class AddTagModal extends Component
{
    constructor(props){
        super(props);
        this.state={tags:[]}
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'tags',
        {
            method:'POST',
            credentials:'include',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                Name:event.target.Name.value
            })
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
                                <Form.Group controlId="Name">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" name="Name" required placeholder="Name"/>
                                </Form.Group>

                                <Form.Group>
                                    <Button variant="primary" type="submit">
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