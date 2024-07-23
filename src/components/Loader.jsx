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

function Loader({setForm, theme, setTheme}) {

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
            <div className="loader col-sm-12 col-md-6" style={{backgroundColor: '#FFFFFF'}}>
                    <div className='d-flex mb-2'>
                        <div className="fs-3 fw-normal p-2 flex-grow-1">Fill content</div>
                        <div className="d-flex align-items-center justify-content-center">
                            <Button variant="primary" size="sm" className='align-middle' onClick={handleShow}>
                                Customize
                            </Button>
                        </div>
                        
                    </div>

                <Modal show={showModal} onHide={handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Customize your resume</Modal.Title>
                    </Modal.Header>
                    <Modal.Body><Styles theme={theme} setTheme={setTheme}/></Modal.Body>
                </Modal>


                <Accordion defaultActiveKey="0">
                    <Accordion.Item style={{borderRadius: 0}} eventKey="0">
                            <Accordion.Header>
                                <div className="fs-4 fw-light">Personal Information</div>
                            </Accordion.Header>
                            <Accordion.Body>
                                <Personal onDataChange = {handleFormField(setForm)}/>
                            </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>
                            <div className="fs-4 fw-light">Biography</div>
                        </Accordion.Header>
                        <Accordion.Body>
                            <Bio onDataChange = {handleFormField(setForm)}/>
                        </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="2">
                        <Accordion.Header>
                            <div className="fs-4 fw-light">Education</div>
                        </Accordion.Header>
                        <Accordion.Body>
                            <Education onDataChange = {handleFormField(setForm)}/> 
                        </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="3"> 
                        <Accordion.Header>
                            <div className="fs-4 fw-light">Experience</div>
                        </Accordion.Header>
                        <Accordion.Body>
                            <Experience onDataChange = {handleFormField(setForm)}/>
                        </Accordion.Body>
                    </Accordion.Item>

                    <Categories onDataChange = {handleFormField(setForm)}/>
                </Accordion>
            </div>
    )
}

export default Loader;