import '../styles/Loader.css'

import Bio from './Loader/Bio';
import Personal from './Loader/Personal';
import Education from './Loader/Education';
import Experience from './Loader/Experience';
import Categories from './Loader/Categories';


import Accordion from 'react-bootstrap/Accordion';

function Loader({setForm}) {

    const handleFormField = (setForm) => (section, data) => {
        setForm((prev) => {
            return {...prev, 
            [section]: data,
            }   
        })
    };

    return (            
            <div className="loader col-sm-12 col-md-6 order-2 order-md-1" style={{backgroundColor: '#FFFFFF'}}>
                <div className='mx-3'>
                    <div className="fs-5 fw-light py-4 flex-grow-1">Tailor to yourself. Everything is <span className='fw-bold text-primary'>optional</span></div>
                </div>


                <Accordion>
                    <Accordion.Item style={{borderRadius: 0}} eventKey="0">
                            <Accordion.Header>
                                <div className="fs-4 fw-lighter">Personal Information</div>
                            </Accordion.Header>
                            <Accordion.Body>
                                <Personal onDataChange = {handleFormField(setForm)}/>
                            </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>
                            <div className="fs-4 fw-lighter">Biography</div>
                        </Accordion.Header>
                        <Accordion.Body>
                            <Bio onDataChange = {handleFormField(setForm)}/>
                        </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="2">
                        <Accordion.Header>
                            <div className="fs-4 fw-lighter">Education</div>
                        </Accordion.Header>
                        <Accordion.Body>
                            <Education onDataChange = {handleFormField(setForm)}/> 
                        </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="3"> 
                        <Accordion.Header>
                            <div className="fs-4 fw-lighter">Experience</div>
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