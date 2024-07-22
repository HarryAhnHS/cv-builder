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
                        <div className={`output-head-main ${!form.personal.avatar 
                                    ? 'condensed' 
                                    : null}`}>
                            <div className="output-head-title">
                                <h1>{form.personal.personalName}</h1>
                                <p>{form.personal.personalJob}</p>
                            </div>
                            <div className=
                                "output-head-details">
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

                    <div className='output-body'>
                        
                        {form.bio != "" 
                        ?
                            <div className="output-body-section bio">
                                <h1 className="output-body-title">About me:</h1> 
                                <p className="output-bio">
                                    {form.bio}
                                </p>
                            </div>
                        : 
                        null}
                        
                        <div className="output-body-section educations">
                            {form.educations.length > 0 ? <h1 className="output-body-title">Education:</h1> : null}
                            {form.educations.map((entry) => {
                                return (
                                    <div className="output-entry education" key={entry.uuid}>
                                        {(entry.educationStartDate != "" && entry.educationStartDate) || (entry.educationEndDate != "" && entry.educationEndDate)
                                        ?
                                            <div className="output-entry-head education">
                                                <div className="output-entry-dates start education">{entry.educationStartDate}</div>
                                                <div className="output-entry-dates end education">
                                                    {entry.educationStartDate != "" && entry.educationEndDate != "" && entry.educationStartDate && entry.educationEndDate
                                                    ? <p>-&nbsp;</p>
                                                    : null}
                                                    {entry.educationEndDate}
                                                </div>
                                            </div>
                                        :
                                            null
                                        }
                                        <div className="output-entry-mid education">
                                            <div className="output-entry-title">
                                                <h1>{entry.educationName}</h1>
                                                <p>{entry.educationLocation}</p>
                                            </div>
                                            <h5>{entry.educationDegree}</h5>
                                            <p>{entry.educationDescription}</p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                        <div className="output-body-section experiences">
                        {form.experiences.length > 0 ? <h1 className="output-body-title">Experience:</h1> : null}
                            {form.experiences.map((entry) => {
                                return (
                                    <div className="output-entry experience" key={entry.uuid}>
                                        {(entry.expStartDate != "" && entry.expStartDate) || (entry.expEndDate != "" && entry.expEndDate)
                                        ?
                                            <div className="output-entry-head experience">
                                                <div className="output-entry-dates start experience">{entry.expStartDate}</div>
                                                <div className="output-entry-dates end experience">
                                                    {entry.expStartDate != "" && entry.expEndDate != "" && entry.expStartDate && entry.expEndDate  
                                                    ? <p>-&nbsp;</p>
                                                    : null}
                                                    {entry.expEndDate}
                                                </div>
                                            </div>
                                        :
                                            null
                                        }
                                        <div className="output-entry-mid experience">
                                            <div className="output-entry-title">
                                                <h1>{entry.expCompanyName}</h1>
                                                <p>{entry.expLocation}</p>
                                            </div>
                                            <h5>{entry.expPosition}</h5>
                                            <p>{entry.expDescription}</p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                        {form.categories.map((category) => {
                            return (<div className="output-body-section category" key={category.uuid}>
                                {category.categoryItems.length > 0 ? <h1 className="output-body-title">{category.categoryTitle}</h1> : null}
                                {category.categoryItems.map((item) => {
                                    return (
                                        <div className="output-entry category-item" key={item.uuid}>
                                            {(item.StartDate != "" && item.StartDate) || (item.EndDate != "" && item.EndDate)
                                            ?
                                                <div className="output-entry-head category-item">
                                                    <div className="output-entry-dates start category-item">{item.StartDate}</div>
                                                    <div className="output-entry-dates end category-item">
                                                        {item.StartDate != "" && item.EndDate != "" && item.StartDate && item.EndDate 
                                                        ? <p>-&nbsp;</p>
                                                        : null}
                                                        {item.EndDate}
                                                    </div>
                                                </div>
                                            :
                                                null
                                            }
                                            <div className="output-entry-mid category-item">
                                                <div className="output-entry-title">
                                                    <h1>{item.Title}</h1>
                                                    <p>{item.Location}</p>
                                                </div>
                                                <p>{item.Description}</p>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>)
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Output;