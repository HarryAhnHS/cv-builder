import '../styles/Loader.css'

import Bio from './Loader/Bio';
import Personal from './Loader/Personal';
import Education from './Loader/Education';
import Experience from './Loader/Experience';
import Categories from './Loader/Categories';
import Styles from './Loader/Styles';

import Accordion from 'react-bootstrap/Accordion';


function Loader({setForm, setTheme}) {

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
                    
                <div className="loader-box">
                    <h2 className="loader-title">Customize</h2>
                    <Styles setTheme={setTheme}/>
                </div>
            </div>
        </>
    )
}

export default Loader;