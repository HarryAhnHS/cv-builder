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
                                    School: {entry.educationName}
                                    Degree: {entry.educationDegree}
                                    Start Date: {entry.educationStartDate}
                                    End Date: {entry.educationEndDate}
                                </div>
                            )
                        })}
                    </div>
                    <div className="experiences">
                        {form.experiences.length > 0 && form.experiences.map((entry) => {
                            return (
                                <div className="experienceEntry" key={entry.uuid}>
                                    Company: {entry.expCompanyName}
                                    Position: {entry.expPosition}
                                    Location: {entry.expLocation}
                                    Description: {entry.expDescription}
                                    Start Date: {entry.expStartDate}
                                    End Date: {entry.expEndDate}
                                </div>
                            )
                        })}
                    </div>
                    <div className="categories">
                        {form.categories.length > 0 && form.categories.map((entry) => {
                            return (
                                <div className="categoryEntry" key={entry.uuid}>
                                    Category Name: {entry.categoryTitle}
                                    <ul>
                                    {entry.categoryItems.map((item) => {
                                        return (
                                            <li key={item.uuid} className="categoryItem">{item.value}</li>
                                        )
                                    })}
                                    </ul>
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