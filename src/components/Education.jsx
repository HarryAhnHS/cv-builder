import uuid from "react-uuid";
import {useState} from "react";

function Education({onDataChange}) {

    // List of all entries
    const [educationList, setEducationList] = useState([]);

    // Create new education entry - append a default education entry into list's state
    function handleNewEducationEntry() {
        // Add new entry in default state
        const updatedEducationList = [
            ...educationList,{
                educationName: '',
                educationDegree: '',
                educationStartDate: '',
                educationEndDate: '',
                uuid: uuid(),
                visible: true,
                edit: true,
            }
        ]

        setEducationList(updatedEducationList);

        onDataChange("educations", updatedEducationList); // Propagate up to Content.jsx to make changes
    }

    function deleteEducationEntry(uuidToDelete) {
        const updatedEducationList = [...educationList].filter((entry) => entry.uuid !== uuidToDelete);

        setEducationList(updatedEducationList);

        onDataChange("educations", updatedEducationList);
    }

    // Update any education entry - make changes to local entry item and collective list -> then push updated list to onDataChange
    function handleInputChange(e, uuidToChange) {
        const {name, value} = e.target;
        //l Local state update entry - find entry with uuid to change
        const updatedEducationEntry =  {
            ...[...educationList].find((entry) => (entry.uuid === uuidToChange)),
            [name]: value,
        };

        // Local state update educationList based on updated entry
        const updatedEducationList = [...educationList].map((entry) => (entry.uuid === uuidToChange) ? updatedEducationEntry : entry)

        setEducationList(updatedEducationList);

        onDataChange("educations", updatedEducationList); // Propagate up to Content.jsx to make changes
    }

    return (
        <>
            {educationList.length > 0 && 
            educationList.map((entry) => {
                return (
                <div className="educationField" key={entry.uuid}>
                    <label htmlFor="educationName">School Name:
                        <input
                            name="educationName"
                            type="text"
                            value={entry.educationName}
                            onChange = {(e) => handleInputChange(e, entry.uuid)}
                        />
                    </label>
                    <label htmlFor="educationDegree">Degree:
                        <input
                            name="educationDegree"
                            type="text"
                            value={entry.educationDegree}
                            onChange = {(e) => handleInputChange(e, entry.uuid)}
                        />
                    </label>
                    <label htmlFor="educationStartDate">Start Date:
                        <input
                            name="educationStartDate"
                            type="date"
                            value={entry.educationStartDate}
                            onChange = {(e) => handleInputChange(e, entry.uuid)}
                        />
                    </label>
                    <label htmlFor="educationEndDate">End Date:
                        <input
                            name="educationEndDate"
                            type="date"
                            value={entry.educationEndDate}
                            onChange = {(e) => handleInputChange(e, entry.uuid)}
                        />
                    </label>
                    <button id="delete-entry" onClick={() => deleteEducationEntry(entry.uuid)}>
                        Delete entry
                    </button>
                </div>
                )
            })}

            <button id="new-entry" onClick={handleNewEducationEntry}>
                Add new +
            </button>
        </>
    )
}

export default Education;