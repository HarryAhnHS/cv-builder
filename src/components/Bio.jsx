import {useState} from "react"

function Bio({onDataChange}) {
    // State to keep track of local changes
    const [bioData, setBioData] = useState("");


    function handleInputChange(e) {
        const updatedBioData = e.target.value;

        setBioData(updatedBioData);
        onDataChange("bio", updatedBioData);
    }

    return (
        <>
            <div className="form-inputs bio">
                <label className="form-input-textarea" htmlFor="bio">Introduce yourself:
                    <textarea
                        type="textarea"
                        value = {bioData}
                        onChange = {handleInputChange}
                    />
                </label>
            </div>
        </>
    )
}

export default Bio;