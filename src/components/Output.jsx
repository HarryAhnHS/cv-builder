import '../styles/Output.css'

function Output({form}) {
    return (
        <>
            <div className="output">
                <button id="download">Download</button>
                <div className="deliverable-output">
                    Name: {form.personal.name}
                    Job: {form.personal.job}
                    Email: {form.personal.email}
                    Phone: {form.personal.phone}
                    Location: {form.personal.location}
                </div>
            </div>
        </>
    )
}

export default Output;