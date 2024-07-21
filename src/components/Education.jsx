import uuid from "react-uuid";
import {useState} from "react";

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
                <div className="form education">
                    <div className="form-inputs education">
                        <label htmlFor="educationName">School Name:
                            <input
                                name="educationName"
                                type="text"
                                value={formData.educationName}
                                onChange = {(e) => handleInputChange(e)}
                            />
                        </label>
                        <label htmlFor="educationDegree">Degree:
                            <input
                                name="educationDegree"
                                type="text"
                                value={formData.educationDegree}
                                onChange = {(e) => handleInputChange(e)}
                            />
                        </label>
                        <label htmlFor="educationStartDate">Start Date:
                            <input
                                name="educationStartDate"
                                type="date"
                                value={formData.educationStartDate}
                                onChange = {(e) => handleInputChange(e)}
                            />
                        </label>
                        <label htmlFor="educationEndDate">End Date:
                            <input
                                name="educationEndDate"
                                type="date"
                                value={formData.educationEndDate}
                                onChange = {(e) => handleInputChange(e)}
                            />
                        </label>
                    </div>

                    <div className="form-controls education">
                        <button id="cancel" onClick={handleCancel}>Cancel</button>
                        <button id="save" onClick={handleSave}>Save</button>
                    </div>
                </div> 
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
                                        Edit entry
                                    </button>
                                    <button id="delete-entry" onClick={() => deleteEducationEntry(entry.uuid)}>
                                        Delete entry
                                    </button>
                                </div>
                            </div>
                            )
                    })}
                    <button id="new-entry" onClick={handleNewEducationEntry}>
                        Add new +
                    </button>
                </div>
            }
        </>
    )
}

export default Education;