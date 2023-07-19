import React, {Component} from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';

export class AddStepModal extends Component{
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();
        var timer = parseFloat(event.target.Timer.value);
        fetch(process.env.REACT_APP_API_STEP+this.props.recipeid,{
            method:'POST',
            credentials:'include',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                Video:event.target.Video.value,
                Timer:timer,
                Description:event.target.Description.value
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
                            Add Step
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body className="modalBody">
                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                <Form.Group controlId="Video">
                                    <Form.Label>Video</Form.Label>
                                    <Form.Control type="text" name="Video" required placeholder="Video ID"/>
                                </Form.Group>

                                <Form.Group controlId="Timer">
                                    <Form.Label>Timer</Form.Label>
                                    <Form.Control type="text" name="Timer" required placeholder="Timer"/>
                                </Form.Group>

                                <Form.Group controlId="Description">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control type="text" name="Description" required placeholder="Description"/>
                                </Form.Group>

                                <Form.Group>
                                    <Button variant="primary" type="submit" onClick={this.props.onHide}>
                                        Add Step
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
