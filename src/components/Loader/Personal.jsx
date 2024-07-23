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

    const fileRef = useRef()

    function handleInputChange(e) {
        const {name, value} = e.target;
        const updatedPersonalData = {
            ... personalData, 
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
            avatar: null,
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
                    value = {personalData.name}
                    onChange = {handleInputChange}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="personalJob">
                <Form.Label>Job</Form.Label>
                <Form.Control type="text" placeholder="Software Engineer" 
                    name="personalJob"
                    value = {personalData.job}
                    onChange = {handleInputChange}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="personalEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="name@example.com" 
                    name="personalEmail"
                    value = {personalData.email}
                    onChange = {handleInputChange}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="personalPhone">
                <Form.Label>Phone</Form.Label>
                <Form.Control type="tel" placeholder="123456789" 
                    name="personalPhone"
                    value = {personalData.phone}
                    onChange = {handleInputChange}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="personalLocation">
                <Form.Label>Location</Form.Label>
                <Form.Control type="text" placeholder="Los Angeles, California" 
                    name="personalLocation"
                    value = {personalData.location}
                    onChange = {handleInputChange}
                />
            </Form.Group>

            <Form.Group controlId="avatar" className="mb-3">
                <Form.Label>Upload a profile photo</Form.Label>
                <Form.Control type="file" 
                    ref={fileRef} 
                    onChange={(e) => handleProfilePhoto(e)} 
                    name="avatar" 
                    accept="image/png, image/jpeg"
                />
                <Button as="input" size="sm" type="reset" value="Reset" onClick= {resetProfilePhoto}/>
            </Form.Group> 

        </Form>     
{/*         
                <div className="form-inputs-avatar">
                    <label htmlFor="avatar">Upload a profile picture:
                        <input ref={fileRef} onChange={(e) => handleProfilePhoto(e)} type="file" id="avatar" name="avatar" accept="image/png, image/jpeg" />
                    </label>
                    <button id="remove-avatar" onClick= {resetProfilePhoto}>Reset Avatar</button>
                </div>
            </div> */}
        </>
    )
}

export default Personal;