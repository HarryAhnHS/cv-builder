import {useState, useRef} from "react"

function Personal({onDataChange}) {
    // State to keep track of local changes
    const [personalData, setPersonalData] = useState({
        personalName: '',
        personalJob: '',
        personalEmail: '',
        personalPhone: '',
        personalLocation: '',
        personalBio: '',
        avatar:'',
    })

    const fileRef = useRef()

    function handleInputChange(e) {
        const {name, value} = e.target;
        const updatedPersonalData = {
            ... personalData, 
            [name]: value
        }

        setPersonalData(updatedPersonalData);
        onDataChange("personal", updatedPersonalData);
    }

    function handleProfilePhoto(e) {
        if (e.target.files &&  e.target.files.length) {
            const updatedPersonalData = {
                ...personalData,
                avatar: URL.createObjectURL(e.target.files[0]),
            }
            setPersonalData(updatedPersonalData);
            onDataChange("personal", updatedPersonalData);
        }
    }

    function resetProfilePhoto() {
        fileRef.current.value = "";

        const updatedPersonalData = {
            ...personalData,
            avatar: null,
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
                        type="tel"
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
                <label htmlFor="personalBio">Profile bio:
                    <input
                        name="personalBio"
                        type="text"
                        value = {personalData.bio}
                        onChange = {handleInputChange}
                    />
                </label>
                <div className="form-inputs-avatar">
                    <label htmlFor="avatar">Upload a profile picture:
                        <input ref={fileRef} onChange={(e) => handleProfilePhoto(e)} type="file" id="avatar" name="avatar" accept="image/png, image/jpeg" />
                    </label>
                    <button id="remove-avatar" onClick= {resetProfilePhoto}>Reset Avatar</button>
                </div>
            </div>
        </>
    )
}

export default Personal;