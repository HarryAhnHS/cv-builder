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
                        <div className={`output-head-main ${form.personal.personalBio == "" && !form.personal.avatar 
                                    ? 'condensed' 
                                    : null}`}>
                            <div className="output-head-title">
                                <h1>{form.personal.personalName}</h1>
                                <p>{form.personal.personalJob}</p>
                            </div>
                            <div className=
                                "output-head-details">
                                <div className="detail">
                                    <p className="detail-label">E:&nbsp;</p>
                                    <p className="detail-content">{form.personal.personalEmail}</p>
                                </div>
                                <div className="detail">
                                    <p className="detail-label">P:&nbsp;</p>
                                    <p className="detail-content">{form.personal.personalPhone}</p>
                                </div>
                                <div className="detail">
                                    <p className="detail-label">L:&nbsp;</p>
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

                    <div className='output-body'>
                        <div className="output-body-section educations">
                            {form.educations.length > 0 ? <h1 className="output-body-title">Education:</h1> : null}
                            {form.educations.map((entry) => {
                                return (
                                    <div className="output-entry education" key={entry.uuid}>
                                        <div className="output-entry-head education">
                                            <h1>{entry.educationName}</h1>
                                            <h5>{entry.educationDegree}</h5>
                                            <p>{entry.educationDescription}</p>
                                        </div>
                                        {entry.educationStartDate != "" 
                                        ? <div className="output-entry-date education">{entry.educationStartDate}&nbsp;-&nbsp;{entry.educationEndDate}</div>
                                        : null}
                                    </div>
                                )
                            })}
                        </div>

                        <div className="output-body-section experiences">
                        {form.experiences.length > 0 ? <h1 className="output-body-title">Experience:</h1> : null}
                            {form.experiences.map((entry) => {
                                return (
                                    <div className="output-entry experience" key={entry.uuid}>
                                        <div className="output-entry-head experience">
                                            <h1>{entry.expCompanyName}</h1>
                                            <p>{entry.expLocation}</p>
                                            <h5>{entry.expPosition}</h5>
                                            <p>{entry.educationDescription}</p>
                                        </div>
                                        {entry.educationStartDate != "" 
                                        ? <div className="output-entry-date experience">{entry.expStartDate}&nbsp;-&nbsp;{entry.expEndDate}</div>
                                        : null}
                                    </div>
                                )
                            })}
                        </div>
                    </div>


                    
                    <div className="output-body-section categories">
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