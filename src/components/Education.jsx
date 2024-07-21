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
                schoolName: '',
                degree: '',
                startDate: '',
                endDate: '',
                uuid: uuid(),
                visible: true
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

    console.log(educationList);

    return (
        <>
            <div className="input-box education">
                <h4>Education</h4>

                {educationList.length > 0 && 
                educationList.map((entry) => {
                    return (
                    <div className="educationField" key={entry.uuid}>
                        <label htmlFor="schoolName">School Name:
                            <input
                                name="schoolName"
                                type="text"
                                value={entry.schoolName}
                                onChange = {(e) => handleInputChange(e, entry.uuid)}
                            />
                        </label>
                        <label htmlFor="degree">Degree:
                            <input
                                name="degree"
                                type="text"
                                value={entry.degree}
                                onChange = {(e) => handleInputChange(e, entry.uuid)}
                            />
                        </label>
                        <label htmlFor="startDate">Program Start Date:
                            <input
                                name="startDate"
                                type="date"
                                value={entry.startDate}
                                onChange = {(e) => handleInputChange(e, entry.uuid)}
                            />
                        </label>
                        <label htmlFor="endDate">Program End Date:
                            <input
                                name="endDate"
                                type="date"
                                value={entry.endDate}
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
            </div>
        </>
    )
}

export default Education;