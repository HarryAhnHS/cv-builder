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
            return edu.uuid === editId ? formData : edu;
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
                        <Form.Control type="text" placeholder="Harvard University" 
                            name="educationName"
                            value = {formData.educationName}
                            onChange = {(e) => handleInputChange(e)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="educationDegree">
                        <Form.Label>Degree</Form.Label>
                        <Form.Control type="text" placeholder="BS in Computer Science" 
                            name="educationDegree"
                            value = {formData.educationDegree}
                            onChange = {(e) => handleInputChange(e)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="educationStartDate">
                        <Form.Label>Start Date</Form.Label>
                        <Form.Control type="month" placeholder="" 
                            name="educationStartDate"
                            value = {formData.educationStartDate}
                            onChange = {(e) => handleInputChange(e)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="educationEndDate">
                        <Form.Label>End Date</Form.Label>
                        <Form.Control type="month" placeholder="" 
                            name="educationEndDate"
                            value = {formData.educationEndDate}
                            onChange = {(e) => handleInputChange(e)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="educationLocation">
                        <Form.Label>Location</Form.Label>
                        <Form.Control type="text" placeholder="Boston, Massachusetts" 
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
                            value={formData.educationDescription} 
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <div className="form-controls education">
                        <Button variant="primary" onClick={handleSave} active>
                            Save
                        </Button>{' '}
                        <Button variant="secondary" onClick={handleCancel} active>
                            Cancel
                        </Button>
                    </div>
                </Form>
            : 
                // Display Mode
                <div className="list educations">
                    {educationList.map((entry) => {
                            return (
                            <div className="entry education" key={entry.uuid}>
                                <div className="entry-summary education">
                                    {entry.educationName}
                                </div>
                                <div className="entry-controls education">
                                    <button id="edit-entry" onClick={() => editEducationEntry(entry.uuid)}>
                                        Edit
                                    </button>
                                    <button id="delete-entry" onClick={() => deleteEducationEntry(entry.uuid)}>
                                        Delete
                                    </button>
                                </div>
                            </div>
                            )
                    })}
                    <div className="d-grid gap-2">
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