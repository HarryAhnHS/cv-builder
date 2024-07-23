import {useState} from "react"

import Form from 'react-bootstrap/Form';

function Bio({onDataChange}) {
    // State to keep track of local changes
    const [bioData, setBioData] = useState("");


    function handleInputChange(e) {
        const updatedBioData = e.target.value;

        setBioData(updatedBioData);
        onDataChange("bio", updatedBioData);
    }

    return (
        <>

            <Form>
                <Form.Group className="mb-3" controlId="bioBio">
                    <Form.Label>Introduce yourself</Form.Label>
                    <Form.Control as="textarea" rows={3} 
                        type="textarea" 
                        value={bioData} 
                        onChange={handleInputChange}
                    />
                </Form.Group>
            </Form>
        </>
    )
}

export default Bio;