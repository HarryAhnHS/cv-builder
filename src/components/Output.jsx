import '../styles/Output.css'

function Output({form, theme}) {
    console.log("Rendering output with form:", form);
    console.log("Rendering output with theme:", theme);



    return (
        <>
            <div className="output">
                <button id="download">Download</button>
                <div className="deliverable-output">
                    <div className="output-head">
                        <div className='output-head-main'>
                            <div className="output-head-title">
                                <h1>{form.personal.personalName}</h1>
                                <p>{form.personal.personalJob}</p>
                            </div>
                            <div className="output-head-details">
                                <div className="detail">
                                    <p className="detail-label">Email:&nbsp;</p>
                                    <p className="detail-content">{form.personal.personalEmail}</p>
                                </div>
                                <div className="detail">
                                    <p className="detail-label">Phone:&nbsp;</p>
                                    <p className="detail-content">{form.personal.personalPhone}</p>
                                </div>
                                <div className="detail">
                                    <p className="detail-label">Location:&nbsp;</p>
                                    <p className="detail-content">{form.personal.personalLocation}</p>
                                </div>
                            </div>
                        </div>
                        
                            {form.personal.avatar 
                            ? 
                                <div className="output-head-avatar">
                                    <img src={form.personal.avatar}/>
                                </div> 
                            : 
                                null
                            }
                        
            

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