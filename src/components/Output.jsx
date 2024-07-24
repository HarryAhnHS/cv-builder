import '../styles/Output.css'

function Output({form, theme}) {
    console.log("Rendering output with form:", form);
    console.log("Rendering output with theme:", theme);

    function getFont() {
        let fontNames = ['Raleway', 'Lora', 'Quicksand']
        return fontNames[theme.font - 1];
    }

    function getTextColorBasedOnBGColor() {
        const color = theme.color.slice(1);
        var r = parseInt(color.substring(0, 2), 16); // hexToR
        var g = parseInt(color.substring(2, 4), 16); // hexToG
        var b = parseInt(color.substring(4, 6), 16); // hexToB
        var uicolors = [r / 255, g / 255, b / 255];
        var c = uicolors.map((col) => {
            if (col <= 0.03928) {
            return col / 12.92;
            }
            return Math.pow((col + 0.055) / 1.055, 2.4);
        });
        var L = (0.2126 * c[0]) + (0.7152 * c[1]) + (0.0722 * c[2]);
        return (L > 0.179) ? '#000000' : '#FFFFFF';
    }


    return (
            <div className="output col-sm-12 col-md-6 d-flex flex-column">
                <div className='m-2 align-self-end'>
                    <button className='btn btn-primary'>Download</button>
                </div>
                <div className='m-2 d-flex justify-content-center'>
                    <div 
                        className='deliverable-output g-0 p-0 flex-fill' 
                        style={
                            {
                                fontFamily: `${getFont()}, serif`
                            }
                        }
                    >
                        <div className="d-flex"
                            style={
                                {
                                    backgroundColor: `${theme.color}`,
                                    color: getTextColorBasedOnBGColor(),
                                    padding: '3cqw',
                                }
                            }
                        >
                            <div 
                                className={`flex-fill ${!form.personal.avatar 
                                        ? 'd-flex justify-content-between' 
                                        : 'd-flex flex-column'}`}
                            >
                                <div className="output-head-title">
                                    <h1 className="m-0" style={{fontSize: '6cqw'}}>{form.personal.personalName}</h1>
                                    <p className="m-0"  style={{fontSize: '3cqw'}}>{form.personal.personalJob}</p>
                                </div>
                                <div className=
                                    "output-head-details" style={{fontSize: '2cqw'}}>
                                    <div className="d-flex">
                                        <p className="detail-label my-1">Email:&nbsp;</p>
                                        <p className="detail-content my-1">{form.personal.personalEmail}</p>
                                    </div>
                                    <div className="d-flex">
                                        <p className="detail-label my-1">Phone:&nbsp;</p>
                                        <p className="detail-content my-1">{form.personal.personalPhone}</p>
                                    </div>
                                    <div className="d-flex">
                                        <p className="detail-label my-1">Location:&nbsp;</p>
                                        <p className="detail-content my-1">{form.personal.personalLocation}</p>
                                    </div>
                                </div>
                            </div>
                            
                                {form.personal.avatar 
                                ? 
                                    <div className="col-md-4 w-25">
                                        <img src={form.personal.avatar} style={{
                                            width: '100%',
                                            aspectRatio: '1/1.1',
                                            objectFit: 'cover',
                                        }}/>
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
            </div>
    )
}

export default Output;