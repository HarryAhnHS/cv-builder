import {useState, useRef} from "react"

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function Personal({onDataChange}) {
    // State to keep track of local changes
    const [personalData, setPersonalData] = useState({
        personalName: '',
        personalJob: '',
        personalEmail: '',
        personalPhone: '',
        personalLocation: '',
        avatar:'',
    })

    const fileRef = useRef();

    function handleInputChange(e) {
        const {name, value} = e.target;
        const updatedPersonalData = {
            ...personalData, 
            [name]: value
        }

        setPersonalData(updatedPersonalData);
        onDataChange("personal", updatedPersonalData);
    }

    function handleProfilePhoto(e) {
        if (e.target.files &&  e.target.files.length) {
            const updatedPersonalData = {
                ...personalData,
                avatar: URL.createObjectURL(e.target.files[0]),
            }
            setPersonalData(updatedPersonalData);
            onDataChange("personal", updatedPersonalData);
        }
    }

    function resetProfilePhoto() {
        fileRef.current.value = "";

        const updatedPersonalData = {
            ...personalData,
            avatar: '',
        }
        setPersonalData(updatedPersonalData);
        onDataChange("personal", updatedPersonalData);
    }

    return (
        <>
        <Form>
            <Form.Group className="mb-3" controlId="personalName">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="John Doe" 
                    name="personalName"
                    value = {personalData.personalName}
                    onChange = {(e) => handleInputChange(e)}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="personalJob">
                <Form.Label>Job</Form.Label>
                <Form.Control type="text" placeholder="Software Engineer" 
                    name="personalJob"
                    value = {personalData.personalJob}
                    onChange = {(e) => handleInputChange(e)}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="personalEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="name@example.com" 
                    name="personalEmail"
                    value = {personalData.personalEmail}
                    onChange = {(e) => handleInputChange(e)}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="personalPhone">
                <Form.Label>Phone</Form.Label>
                <Form.Control type="tel" placeholder="+1 123 456 7890" 
                    name="personalPhone"
                    value = {personalData.personalPhone}
                    onChange = {(e) => handleInputChange(e)}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="personalLocation">
                <Form.Label>Location</Form.Label>
                <Form.Control type="text" placeholder="Los Angeles, California" 
                    name="personalLocation"
                    value = {personalData.personalLocation}
                    onChange = {(e) => handleInputChange(e)}
                />
            </Form.Group>

            <Form.Group controlId="avatar" className="mb-3">
                <Form.Label>Upload a profile photo</Form.Label>
                <div className="d-flex justify-content-center">
                    <Form.Control type="file" 
                        ref={fileRef} 
                        onChange={(e) => handleProfilePhoto(e)} 
                        name="avatar" 
                        accept="image/png, image/jpeg"
                        className="flex-fill"
                    />
                    <Button as="input" size="sm" variant="outline-secondary" value="Reset Photo" onClick= {resetProfilePhoto} readOnly/>
                </div>
                
            </Form.Group> 

        </Form>            
        </>
    )
}

export default Personal;