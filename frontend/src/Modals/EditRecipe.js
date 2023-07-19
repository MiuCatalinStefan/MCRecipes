import React, {Component} from 'react';
import { Modal, Button, Row, Col, Form, Image } from 'react-bootstrap';

export class EditRecipeModal extends Component{
    
    constructor(props){
        super(props);
        this.state={spcs:[]};
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleFileSelected=this.handleFileSelected.bind(this);
    }

    photo = "AnonRecipe.png";
    imagesrc = process.env.REACT_APP_API_PHOTOS+this.photo;

    handleSubmit(event){
        console.log(this.props.id)
        console.log(event.target.title.value)
        console.log(event.target.description.value)
        console.log(this.photo)
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'recipes/'+this.props.id,{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                Title:event.target.title.value,
                Description:event.target.description.value,
                Photo:this.photo
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
        },
        (error)=>{
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

        fetch(process.env.REACT_APP_API+'recipes/savefile',{
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
                            Edit Recipe
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body className="modalBody">
                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                <Form.Group controlId="title">
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control type="text" name="title" defaultValue={this.props.title} required/>
                                </Form.Group>

                                <Form.Group controlId="description">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control type="text" name="description" defaultValue={this.props.description} required/>
                                </Form.Group>

                                <Form.Group>
                                    <Button variant="primary" type="submit">
                                        Edit Recipe
                                    </Button>
                                </Form.Group>
                                </Form>
                            </Col>
                            <Col>
                                <Image width="200px" height="200px" src={process.env.REACT_APP_API_PHOTOS+this.props.photo} />
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