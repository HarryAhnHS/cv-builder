import '../styles/Output.css'

function Output({form}) {
    // console.log("Rendering output with form:", form);
    return (
        <>
            <div className="output">
                <button id="download">Download</button>
                <div className="deliverable-output">
                    <div className="personal">
                        Name: {form.personal.personalName}
                        Job: {form.personal.personalJob}
                        Email: {form.personal.personalEmail}
                        Phone: {form.personal.personalPhone}
                        Location: {form.personal.personalLocation}
                    </div>
                    <div className="educations">
                        {form.educations.length > 0 && form.educations.map((entry) => {
                            return (
                                <div className="educationEntry" key={entry.uuid}>
                                    School: {entry.schoolName}
                                    Degree: {entry.degree}
                                    Start Date: {entry.startDate}
                                    End Date: {entry.endDate}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Output;