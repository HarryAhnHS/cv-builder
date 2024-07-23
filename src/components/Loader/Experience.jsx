import uuid from "react-uuid";
import {useState} from "react";

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function Experience({onDataChange}) {

    const [editId, setEditId] = useState(null);
    const [experienceList, setExperienceList] = useState([]);
    const [formData, setFormData] = useState({});

    // Create new education entry - append a default education entry into list's state
    function handleNewExperienceEntry() {
        const defaultEntry = {
            expCompanyName: '',
            expPosition: '',
            expLocation: '',
            expDescription: '',
            expStartDate: '',
            expEndDate: '',
            uuid: uuid(),
        };
        // Add new entry in default state
        const updatedExperienceList = [
            ...experienceList, defaultEntry
        ]
        setExperienceList(updatedExperienceList);
        onDataChange("experiences", updatedExperienceList); // Propagate up to Content.jsx to make changes

        setFormData(defaultEntry);
        setEditId(defaultEntry.uuid);
    }

    function deleteExperienceEntry(uuidToDelete) {
        const updatedExperienceList = [...experienceList].filter((entry) => entry.uuid !== uuidToDelete);

        setExperienceList(updatedExperienceList);
        onDataChange("experiences", updatedExperienceList);
    }

    function editExperienceEntry(uuidToEdit) {
        const entryToEdit = experienceList.find((entry) => entry.uuid === uuidToEdit);
        setFormData(entryToEdit);
        setEditId(uuidToEdit);
    }

    // FORM STUFF
    function handleInputChange(e) {
        const {name, value} = e.target;

        const updatedExperienceEntry =  {
            ...formData,
            [name]: value,
        };
        
        setFormData(updatedExperienceEntry);
    }

    function handleCancel() {
        setEditId(null);
        setFormData({});
    }

    function handleSave() {
        const updatedExperienceList = [...experienceList].map((exp) => {
            return exp.uuid === editId ? formData : exp;
        })

        setExperienceList(updatedExperienceList);
        onDataChange("experiences", updatedExperienceList);

        setEditId(null);
        setFormData({});
    }

    return (
            // Edit Mode
        <>
            {editId 
            ? 
            <Form>
                <Form.Group className="mb-3" controlId="expCompanyName">
                    <Form.Label>Company</Form.Label>
                    <Form.Control type="text" placeholder="Google" 
                        name="expCompanyName"
                        value = {formData.expCompanyName}
                        onChange = {(e) => handleInputChange(e)}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="expPosition">
                    <Form.Label>Position</Form.Label>
                    <Form.Control type="text" placeholder="Software Engineer Intern" 
                        name="expPosition"
                        value = {formData.expPosition}
                        onChange = {(e) => handleInputChange(e)}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="expStartDate">
                    <Form.Label>Start Date</Form.Label>
                    <Form.Control type="month" placeholder="" 
                        name="expStartDate"
                        value = {formData.expStartDate}
                        onChange = {(e) => handleInputChange(e)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="expEndDate">
                    <Form.Label>End Date</Form.Label>
                    <Form.Control type="month" placeholder="" 
                        name="expEndDate"
                        value = {formData.expEndDate}
                        onChange = {(e) => handleInputChange(e)}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="expLocation">
                    <Form.Label>Location</Form.Label>
                    <Form.Control type="text" placeholder="Mountain View, California" 
                        name="expLocation"
                        value = {formData.expLocation}
                        onChange = {(e) => handleInputChange(e)}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="expDescription">
                    <Form.Label>Add a description</Form.Label>
                    <Form.Control as="textarea" rows={3} 
                        name="expDescription"
                        type="textarea" 
                        value={formData.expDescription} 
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <div className="form-controls experience">
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
                <div className="list experience">
                    {experienceList.map((entry) => {
                            return (
                            <div className="entry experience" key={entry.uuid}>
                                <div className="entry-summary experience">
                                    - {entry.expCompanyName}
                                </div>
                                <div className="entry-controls experience">
                                    <button id="edit-entry" onClick={() => editExperienceEntry(entry.uuid)}>
                                        Edit entry
                                    </button>
                                    <button id="delete-entry" onClick={() => deleteExperienceEntry(entry.uuid)}>
                                        Delete entry
                                    </button>
                                </div>
                            </div>
                            )
                    })}
                    <div className="d-grid">
                        <Button variant="outline-primary" onClick={handleNewExperienceEntry}>
                            Add new experience
                        </Button>
                    </div>
                </div>
            }
        </>
    )
}

export default Experience;