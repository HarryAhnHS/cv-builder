import '../styles/Loader.css'

import {useState} from 'react';

import Bio from './Loader/Bio';
import Personal from './Loader/Personal';
import Education from './Loader/Education';
import Experience from './Loader/Experience';
import Categories from './Loader/Categories';
import Styles from './Loader/Styles';

import Accordion from 'react-bootstrap/Accordion';
import Modal from  'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function Loader({setForm, setTheme}) {

    const [showModal, setShowModal] = useState(false);
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    const handleFormField = (setForm) => (section, data) => {
        setForm((prev) => {
            return {...prev, 
            [section]: data,
            }   
        })
    };

    return (
        <>
            
            <div className="loader">
                <h1>Add your information</h1>
                <Button variant="primary" onClick={handleShow}>
                    Customize styling
                </Button>

                <Modal show={showModal} onHide={handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Customize your resume</Modal.Title>
                    </Modal.Header>
                    <Modal.Body><Styles setTheme={setTheme}/></Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                    </Modal.Footer>
                </Modal>


                <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="0">
                            <Accordion.Header>Personal Information
                            </Accordion.Header>
                            <Accordion.Body>
                                <Personal onDataChange = {handleFormField(setForm)}/>
                            </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Personal Bio
                        </Accordion.Header>
                        <Accordion.Body>
                            <Bio onDataChange = {handleFormField(setForm)}/>
                        </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="2">
                        <Accordion.Header>Education
                        </Accordion.Header>
                        <Accordion.Body>
                            <Education onDataChange = {handleFormField(setForm)}/> 
                        </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="3"> 
                        <Accordion.Header>Experience
                        </Accordion.Header>
                        <Accordion.Body>
                            <Experience onDataChange = {handleFormField(setForm)}/>
                        </Accordion.Body>
                    </Accordion.Item>

                    <Categories onDataChange = {handleFormField(setForm)}/>
                </Accordion>
            </div>
        </>
    )
}

export default Loader;