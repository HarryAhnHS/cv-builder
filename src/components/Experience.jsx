import uuid from "react-uuid";
import {useState} from "react";

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
        onDataChange("educations", updatedExperienceList);
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
            <div className="experienceField">
                <label htmlFor="expCompanyName">Company Name:
                    <input
                        name="expCompanyName"
                        type="text"
                        value={formData.expCompanyName}
                        onChange = {(e) => handleInputChange(e)}
                    />
                </label>
                <label htmlFor="expPosition">Position:
                    <input
                        name="expPosition"
                        type="text"
                        value={formData.expPosition}
                        onChange = {(e) => handleInputChange(e)}
                    />
                </label>
                <label htmlFor="expLocation">Location:
                    <input
                        name="expLocation"
                        type="text"
                        value={formData.expLocation}
                        onChange = {(e) => handleInputChange(e)}
                    />
                </label>
                <label htmlFor="expDescription">Description:
                    <input
                        name="expDescription"
                        type="text"
                        value={formData.expDescription}
                        onChange = {(e) => handleInputChange(e)}
                    />
                </label>
                <label htmlFor="expStartDate">Start Date:
                    <input
                        name="expStartDate"
                        type="date"
                        value={formData.expStartDate}
                        onChange = {(e) => handleInputChange(e)}
                    />
                </label>
                <label htmlFor="expEndDate">End Date:
                    <input
                        name="expEndDate"
                        type="date"
                        value={formData.expEndDate}
                        onChange = {(e) => handleInputChange(e)}
                    />
                </label>
                    <button id="cancel" onClick={handleCancel}>Cancel</button>
                    <button id="save" onClick={handleSave}>Save</button>
                </div> 
            : 
                // Display Mode
                <div>
                    {experienceList.map((entry) => {
                            return (
                            <div key={entry.uuid}>
                                <div>
                                    - {entry.expCompanyName}
                                </div>
                                <button id="edit-entry" onClick={() => editExperienceEntry(entry.uuid)}>
                                    Edit entry
                                </button>
                                <button id="delete-entry" onClick={() => deleteExperienceEntry(entry.uuid)}>
                                    Delete entry
                                </button>
                            </div>
                            )
                    })}
                    <button id="new-entry" onClick={handleNewExperienceEntry}>
                        Add new +
                    </button>
                </div>
            }
        </>
    )
}

export default Experience;