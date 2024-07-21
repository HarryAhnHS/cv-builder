import {useState} from "react"

function Personal({onDataChange}) {
    // State to keep track of local changes
    const [personalData, setPersonalData] = useState({
        personalName: '',
        personalJob: '',
        personalEmail: '',
        personalPhone: '',
        personalLocation: ''
    })

    function handleInputChange(e) {
        const {name, value} = e.target;
        const updatedPersonalData = {
            ... personalData, 
            [name]: value
        }

        setPersonalData(updatedPersonalData);
        onDataChange("personal", updatedPersonalData);
    }

    return (
        <>
            <div className="form-inputs personal">
                <label htmlFor="personalName">Name:
                    <input
                        name="personalName"
                        type="text"
                        value = {personalData.name}
                        onChange = {handleInputChange}
                    />
                </label>
                <label htmlFor="personalJob">Job:
                    <input
                        name="personalJob"
                        type="text"
                        value = {personalData.job}
                        onChange = {handleInputChange}
                    />
                </label>
                <label htmlFor="personalEmail">Email:
                    <input
                        name="personalEmail"
                        type="email"
                        value = {personalData.email}
                        onChange = {handleInputChange}
                    />
                </label>
                <label htmlFor="personalPhone">Phone:
                    <input
                        name="personalPhone"
                        type="number"
                        value = {personalData.phone}
                        onChange = {handleInputChange}
                    />
                </label>
                <label htmlFor="personalLocation">Location:
                    <input
                        name="personalLocation"
                        type="text"
                        value = {personalData.location}
                        onChange = {handleInputChange}
                    />
                </label>
            </div>
        </>
    )
}

export default Personal;