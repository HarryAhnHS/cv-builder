import uuid from "react-uuid";
// import {useState} from "react";

function Education({form, handleForm}) {
    function handleNewEducationEntry() {
        // Add new education item in default state
        handleForm({...form, educations: [...form.educations, {
            schoolName: '',
            degree: '',
            startDate: '',
            endDate: '',
            uuid: uuid(),
            visible: true
        }]
        })
    }

    function handleInputChange(e, uuidToChange) {
        const {name, value} = e.target;
        let updatedForm;

        form.educations.forEach((entry) => {
            if (entry.uuid == uuidToChange) {
                updatedForm = {...form, educations: [...form.educations, 
                    {...entry, 
                    [name] : value}
                ]}
            }
        })
        handleForm(updatedForm);
    }

    console.log(form.educations);

    return (
        <>
            <div className="input-box">
                <h4>Education</h4>

                {form.educations.length > 0 ? form.educations.map((entry) => {
                    <div className="educationField" key={entry.uuid}>
                        <label htmlFor="schoolName">School Name:
                            <input
                                name="schoolName"
                                type="text"
                                value={form.educations.find((edu) => edu.uuid == entry.uuid).schoolName}
                                onChange = {handleInputChange}
                            />
                        </label>
                        <label htmlFor="degree">Degree:
                            <input
                                name="degree"
                                type="text"
                                value={form.educations.find((edu) => edu.uuid == entry.uuid).degree}
                                onChange = {handleInputChange}
                            />
                        </label>
                        <label htmlFor="startDate">Program Start Date:
                            <input
                                name="startDate"
                                type="date"
                                value={form.educations.find((edu) => edu.uuid == entry.uuid).startDate}
                                onChange = {handleInputChange}
                            />
                        </label>
                        <label htmlFor="endDate">Program End Date:
                            <input
                                name="endDate"
                                type="date"
                                value={form.educations.find((edu) => edu.uuid == entry.uuid).endDate}
                                onChange = {handleInputChange}
                            />
                        </label>
                    </div>
                }) : null}

                <button id="new-education" onClick={handleNewEducationEntry}>
                    Add new
                </button>
            </div>
        </>
    )
}

export default Education;