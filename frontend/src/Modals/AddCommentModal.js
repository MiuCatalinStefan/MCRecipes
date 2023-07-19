import React, {Component} from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';

export class AddCommentModal extends Component{
    constructor(props){
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API_COMMENT+this.props.recipeid,{
            method:'POST',
            credentials:'include',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                Name:event.target.Name.value,
                Text:event.target.Text.value
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
                    <p>{this.props.ID}</p>
                    <Modal.Header className="modalHeader"closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Adauga un Comentariu
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="modalBody">
                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="Name">
                                        <Form.Label>Nume:</Form.Label>
                                        <Form.Control type="text" name="Name" required/>
                                    </Form.Group>

                                    <Form.Group controlId="Text">
                                        <Form.Label>Comentariu:</Form.Label>
                                        <Form.Control type="text" name="Text" required/>
                                    </Form.Group>

                                    <Form.Group>
                                        <Button variant="primary" type="submit" onClick={this.props.onHide}>
                                            Adauga un Comentariu
                                        </Button>
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>
                    </Modal.Body>

                </Modal>
            </div>
        )
    }
}