import React, {Component} from "react";
import { Modal, Button, Row, Col, Form, Image } from 'react-bootstrap';

export class EditStep extends Component{
    constructor(props)
    {
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    handleSubmit(event){

        event.preventDefault();
        fetch(process.env.REACT_APP_API_UPDATESTEP+this.props.id,{
            method:'PUT',
            credentials:'include',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                Video:event.target.Video.value,
                Timer:event.target.Timer.value,
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
            <div className="container">
                <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>

                    <Modal.Header className="modalHeader">
                        <Modal.Title id="contained-modal-title-vcenter">
                            Edit Step
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body className="modalBody">
                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                <Form.Group controlId="Video">
                                    <Form.Label>Video</Form.Label>
                                    <Form.Control type="text" name="Video" defaultValue={this.props.video} required/>
                                </Form.Group>
                                <Form.Group controlId="Timer">
                                    <Form.Label>Timer</Form.Label>
                                    <Form.Control type="text" name="Timer" defaultValue={this.props.timer} required/>
                                </Form.Group>
                                <Form.Group controlId="Description">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control type="text" name="Description" defaultValue={this.props.description} required/>
                                </Form.Group>
                                <Form.Group>
                                    <Button variant="primary" type="submit">
                                        Edit Step
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
        )}
}