import '../styles/Output.css'

function Output({form}) {
    return (
        <>
            <div className="output">
                <button id="download">Download</button>
                <div className="deliverable-output">
                    Name: {form.personal.personalName}
                    Job: {form.personal.personalJob}
                    Email: {form.personal.personalEmail}
                    Phone: {form.personal.personalPhone}
                    Location: {form.personal.personalLocation}
                </div>
            </div>
        </>
    )
}

export default Output;