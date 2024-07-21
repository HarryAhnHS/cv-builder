import uuid from "react-uuid";
import {useState} from "react";

function Experience({onDataChange}) {

    // List of all entries
    const [experienceList, setExperienceList] = useState([]);

    // Create new entry - append a default entry into list's state
    function handleNewExperienceEntry() {
        // Add new entry in default state
        const updatedExperienceList = [
            ...experienceList, {
                expCompanyName: '',
                expPosition: '',
                expLocation: '',
                expDescription: '',
                expStartDate: '',
                expEndDate: '',
                uuid: uuid(),
                visible: true
            }
        ]
        setExperienceList(updatedExperienceList);

        onDataChange("experiences", updatedExperienceList); // Propagate up to Content.jsx to make changes
    }

    function deleteExperienceEntry(uuidToDelete) {
        const updatedExperienceList = [...experienceList].filter((entry) => entry.uuid !== uuidToDelete);

        setExperienceList(updatedExperienceList);

        onDataChange("experiences", updatedExperienceList);
    }

    // Update any entry - make changes to local entry item and collective list -> then push updated list to onDataChange
    function handleInputChange(e, uuidToChange) {
        const {name, value} = e.target;
        //l Local state update entry - find entry with uuid to change
        const updatedExperienceEntry =  {
            ...[...experienceList].find((entry) => (entry.uuid === uuidToChange)),
            [name]: value,
        };

        // Local state update based on updated entry
        const updatedExperienceList = [...experienceList].map(
            (entry) => (entry.uuid === uuidToChange) ? updatedExperienceEntry : entry
        );

        setExperienceList(updatedExperienceList);

        onDataChange("experiences", updatedExperienceList); // Propagate up to Content.jsx to make changes
    }

    return (
        <>
            {experienceList.length > 0 && 
            experienceList.map((entry) => {
                return (
                <div className="experienceField" key={entry.uuid}>
                    <label htmlFor="expCompanyName">Company Name:
                        <input
                            name="expCompanyName"
                            type="text"
                            value={entry.expCompanyName}
                            onChange = {(e) => handleInputChange(e, entry.uuid)}
                        />
                    </label>
                    <label htmlFor="expPosition">Position:
                        <input
                            name="expPosition"
                            type="text"
                            value={entry.expPosition}
                            onChange = {(e) => handleInputChange(e, entry.uuid)}
                        />
                    </label>
                    <label htmlFor="expLocation">Location:
                        <input
                            name="expLocation"
                            type="text"
                            value={entry.expLocation}
                            onChange = {(e) => handleInputChange(e, entry.uuid)}
                        />
                    </label>
                    <label htmlFor="expDescription">Description:
                        <input
                            name="expDescription"
                            type="text"
                            value={entry.expDescription}
                            onChange = {(e) => handleInputChange(e, entry.uuid)}
                        />
                    </label>
                    <label htmlFor="expStartDate">Start Date:
                        <input
                            name="expStartDate"
                            type="date"
                            value={entry.expStartDate}
                            onChange = {(e) => handleInputChange(e, entry.uuid)}
                        />
                    </label>
                    <label htmlFor="expEndDate">End Date:
                        <input
                            name="expEndDate"
                            type="date"
                            value={entry.expEndDate}
                            onChange = {(e) => handleInputChange(e, entry.uuid)}
                        />
                    </label>
                    <button id="delete-entry" onClick={() => deleteExperienceEntry(entry.uuid)}>
                        Delete entry
                    </button>
                </div>
                )
            })}

            <button id="new-entry" onClick={handleNewExperienceEntry}>
                Add new +
            </button>
        </>
    )
}

export default Experience;