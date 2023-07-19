import React, {Component} from 'react';
import { Modal, Button, Row, Col, Form, Image } from 'react-bootstrap';

export class AddSpiceModal extends Component{
    
    constructor(props){
        super(props);
        this.state={spcs:[]};
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleFileSelected=this.handleFileSelected.bind(this);
    }

    photo = "AnonSpice.png";
    imagesrc = process.env.REACT_APP_API_PHOTOS+this.photo;

    handleSubmit(event){

        event.preventDefault();
        fetch(process.env.REACT_APP_API+'spices',{
            method:'POST',
            credentials:'include',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                Name:event.target.Name.value,
                Description:event.target.Description.value,
                Photo:this.photo
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
        },
        (error)=>{
            alert('Failed');
        })
    }

    handleFileSelected(event){

        event.preventDefault();
        this.photo=event.target.files[0].name;
        const formData = new FormData();
        formData.append(
            "myFile",
            event.target.files[0],
            event.target.files[0].name
        );

        fetch(process.env.REACT_APP_API+'spices/savefile',{
            method:'POST',
            credentials:'include',
            body:formData
        })
        .then(res=>res.json())
        .then((result)=>{
            this.imagesrc=process.env.REACT_APP_API_PHOTOS+result;
        },
        (error)=>{
            alert('Failed')
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
                            Add Spice
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

                                <Form.Group controlId="Description">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control type="text" name="Description" required placeholder="Description"/>
                                </Form.Group>

                                <Form.Group>
                                    <Button variant="primary" type="submit">
                                        Add Spice
                                    </Button>
                                </Form.Group>
                                </Form>
                            </Col>
                            <Col>
                                <Image width="200px" height="200px" src={this.imagesrc} />
                                <input onChange={this.handleFileSelected} type="File"/>
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