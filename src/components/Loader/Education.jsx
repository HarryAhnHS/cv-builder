import uuid from "react-uuid";
import {useState} from "react";

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function Education({onDataChange}) {

    const [editId, setEditId] = useState(null);
    const [educationList, setEducationList] = useState([]);
    const [formData, setFormData] = useState({});

    // Create new education entry - append a default education entry into list's state
    function handleNewEducationEntry() {
        const defaultEntry = {
            educationName: '',
            educationDegree: '',
            educationStartDate: '',
            educationEndDate: '',
            educationLocation: '',
            educationDescription: '',
            uuid: uuid(),
        };
        // Add new entry in default state
        const updatedEducationList = [
            ...educationList, defaultEntry
        ]
        setEducationList(updatedEducationList);
        onDataChange("educations", updatedEducationList); // Propagate up to Content.jsx to make changes

        setFormData(defaultEntry);
        setEditId(defaultEntry.uuid);
    }

    function deleteEducationEntry(uuidToDelete) {
        const updatedEducationList = [...educationList].filter((entry) => entry.uuid !== uuidToDelete);

        setEducationList(updatedEducationList);
        onDataChange("educations", updatedEducationList);
    }

    function editEducationEntry(uuidToEdit) {
        const entryToEdit = educationList.find((entry) => entry.uuid === uuidToEdit);
        setFormData(entryToEdit);
        setEditId(uuidToEdit);
    }

    // FORM STUFF
    function handleInputChange(e) {
        const {name, value} = e.target;

        const updatedEducationEntry =  {
            ...formData,
            [name]: value,
        };
        
        setFormData(updatedEducationEntry);
    }

    function handleCancel() {
        setEditId(null);
        setFormData({});
    }

    function handleSave() {
        const updatedEducationList = [...educationList].map((edu) => {
            return (edu.uuid === editId)
            ? {
                ...formData,
                educationEndDate: formData.educationEndDate === "" ? "Present" : formData.educationEndDate
            }
            : edu;
        })

        setEducationList(updatedEducationList);
        onDataChange("educations", updatedEducationList);

        setEditId(null);
        setFormData({});
    }

    return (
            // Edit Mode
        <>
            {editId 
            ? 
                <Form>
                    <Form.Group className="mb-3" controlId="educationName">
                        <Form.Label>School Name</Form.Label>
                        <Form.Control type="text" placeholder="University of Southern California" 
                            name="educationName"
                            value = {formData.educationName}
                            onChange = {(e) => handleInputChange(e)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="educationDegree">
                        <Form.Label>Degree</Form.Label>
                        <Form.Control type="text" placeholder="Bachelor of Science in Computer Science" 
                            name="educationDegree"
                            value = {formData.educationDegree}
                            onChange = {(e) => handleInputChange(e)}
                        />
                    </Form.Group>

                    <div className="row">
                        <Form.Group className="mb-3 col-md-6" controlId="educationStartDate">
                            <Form.Label>Start Date</Form.Label>
                            <Form.Control type="month" placeholder="" 
                                name="educationStartDate"
                                value = {formData.educationStartDate}
                                onChange = {(e) => handleInputChange(e)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3 col-md-6" controlId="educationEndDate">
                            <Form.Label>End <span className="text-muted fw-light justify-self-end mx-1" style={{fontSize:'0.7rem'}}>Empty if present</span></Form.Label>
                            <Form.Control type="month" placeholder="" 
                                name="educationEndDate"
                                value = {formData.educationEndDate}
                                onChange = {(e) => handleInputChange(e)}
                            />
                        </Form.Group>
                    </div>
                    

                    <Form.Group className="mb-3" controlId="educationLocation">
                        <Form.Label>Location</Form.Label>
                        <Form.Control type="text" placeholder="Los Angeles, California" 
                            name="educationLocation"
                            value = {formData.educationLocation}
                            onChange = {(e) => handleInputChange(e)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="educationDescription">
                        <Form.Label>Add a description</Form.Label>
                        <Form.Control as="textarea" rows={3} 
                            name="educationDescription"
                            type="textarea" 
                            placeholder="Activities, societies, awards..."
                            value={formData.educationDescription} 
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <div className="form-controls category w-100 d-flex justify-content-end">
                        <Button className="mx-1" variant="primary" onClick={handleSave} active>
                            Save
                        </Button>{' '}
                        <Button className="mx-1" variant="secondary" onClick={handleCancel} active>
                            Cancel
                        </Button>
                    </div>
                </Form>
            : 
                // Display Mode
                <div className="list educations">
                    <div className="rounded border px-2" style={{borderColor: 'lightgray'}}>
                        {educationList.map((entry) => {
                                return (
                                <div className="d-flex py-2 px-1" key={entry.uuid}>
                                    <div className="flex-fill d-flex align-items-center">
                                        {entry.educationName}
                                    </div>
                                    <button className="btn btn-sm btn-outline-danger fs-6 m-1" id="edit-entry" onClick={() => editEducationEntry(entry.uuid)}>
                                        Edit
                                    </button>
                                    <button className="btn btn-sm btn-outline-danger fs-6 m-1" id="delete-entry" onClick={() => deleteEducationEntry(entry.uuid)}>
                                        Delete
                                    </button>
                                </div>
                                )
                        })}
                    </div>
                    <div className="d-grid mt-3">
                        <Button variant="outline-primary" onClick={handleNewEducationEntry}>
                            Add new education
                        </Button>
                    </div>
                </div>
            }
        </>
    )
}

export default Education;