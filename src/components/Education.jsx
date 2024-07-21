import uuid from "react-uuid";
import {useState} from "react";

function Education({onDataChange}) {

    // Collective entries
    const [educationList, setEducationList] = useState([]);

    // Individual entry
    const [educationEntryData, setEducationEntryData] = useState({
        schoolName: '',
        degree: '',
        startDate: '',
        endDate: '',
        uuid: uuid(),
        visible: true
    })

    // Create new education entry - append a default education entry into list's state
    function handleNewEducationEntry() {
        // Add new education item in default state
        const updatedEducationList = [
            ...educationList,
            {
                schoolName: '',
                degree: '',
                startDate: '',
                endDate: '',
                uuid: uuid(),
                visible: true
            }
        ]
        setEducationList(updatedEducationList);
    }

    // Update any education entry - make changes to local entry item and collective list -> then push updated list to onDataChange
    function handleInputChange(e, uuidToChange) {
        const {name, value} = e.target;
        // local store updated entry 
        const updatedEducationEntry =  {
            ...educationEntryData,
            [name]: value,
        }

        // local store updated educationList based on updated entry
        const updatedEducationList = [...educationList].map((entry) => (entry.uuid === uuidToChange) ? updatedEducationEntry : entry)

        setEducationEntryData(updatedEducationEntry);
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
                                value={entry.degree}
                                onChange = {(e) => handleInputChange(e, entry.uuid)}
                            />
                        </label>
                        <label htmlFor="endDate">Program End Date:
                            <input
                                name="endDate"
                                type="date"
                                value={entry.degree}
                                onChange = {(e) => handleInputChange(e, entry.uuid)}
                            />
                        </label>
                    </div>
                    )
                })}

                <button id="new-education" onClick={handleNewEducationEntry}>
                    Add new +
                </button>
            </div>
        </>
    )
}

export default Education;