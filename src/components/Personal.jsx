function Personal({form, handleForm}) {

    function handleNameChange(e) {
        handleForm({...form, personal: {...form.personal, name:e.target.value}});
    }

    function handleJobChange(e) {
        handleForm({...form, personal: {...form.personal, job:e.target.value}});
    }

    function handleEmailChange(e) {
        handleForm({...form, personal: {...form.personal, email:e.target.value}});
    }

    function handlePhoneChange(e) {
        handleForm({...form, personal: {...form.personal, phone:e.target.value}});
    }

    function handleLocationChange(e) {
        handleForm({...form, personal: {...form.personal, location:e.target.value}});
    }

    return (
        <>
            <div className="input-box">
                <h4>Personal</h4>
                <label htmlFor="name">Name:
                    <input
                        id="name"
                        type="text"
                        value = {form.personal.name}
                        onChange = {handleNameChange}
                    />
                </label>
                <label htmlFor="job">Job:
                    <input
                        id="job"
                        type="text"
                        value = {form.personal.job}
                        onChange = {handleJobChange}
                    />
                </label>
                <label htmlFor="email">Email:
                    <input
                        id="email"
                        type="email"
                        value = {form.personal.email}
                        onChange = {handleEmailChange}
                    />
                </label>
                <label htmlFor="phone">Phone:
                    <input
                        id="phone"
                        type="number"
                        value = {form.personal.phone}
                        onChange = {handlePhoneChange}
                    />
                </label>
                <label htmlFor="location">Location:
                    <input
                        id="location"
                        type="text"
                        value = {form.personal.location}
                        onChange = {handleLocationChange}
                    />
                </label>
            </div>
        </>
    )
}

export default Personal;