function Personal({form, handleForm}) {

    function handlePersonalNameChange(e) {
        handleForm({...form, personal: {...form.personal, name:e.target.value}});
    }

    function handlePersonalJobChange(e) {
        handleForm({...form, personal: {...form.personal, job:e.target.value}});
    }

    function handlePersonalEmailChange(e) {
        handleForm({...form, personal: {...form.personal, email:e.target.value}});
    }

    function handlePersonalPhoneChange(e) {
        handleForm({...form, personal: {...form.personal, phone:e.target.value}});
    }

    function handlePersonalLocationChange(e) {
        handleForm({...form, personal: {...form.personal, location:e.target.value}});
    }

    return (
        <>
            <div className="input-box">
                <h4>Personal</h4>
                <label htmlFor="personalName">Name:
                    <input
                        id="personalName"
                        type="text"
                        value = {form.personal.name}
                        onChange = {handlePersonalNameChange}
                    />
                </label>
                <label htmlFor="personalJob">Job:
                    <input
                        id="personalJob"
                        type="text"
                        value = {form.personal.job}
                        onChange = {handlePersonalJobChange}
                    />
                </label>
                <label htmlFor="personalEmail">Email:
                    <input
                        id="personalEmail"
                        type="email"
                        value = {form.personal.email}
                        onChange = {handlePersonalEmailChange}
                    />
                </label>
                <label htmlFor="personalPhone">Phone:
                    <input
                        id="personalPhone"
                        type="number"
                        value = {form.personal.phone}
                        onChange = {handlePersonalPhoneChange}
                    />
                </label>
                <label htmlFor="personalLocation">Location:
                    <input
                        id="personalLocation"
                        type="text"
                        value = {form.personal.location}
                        onChange = {handlePersonalLocationChange}
                    />
                </label>
            </div>
        </>
    )
}

export default Personal;