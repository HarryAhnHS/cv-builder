import '../styles/Loader.css'

import Personal from './Personal';
import Education from './Education';
import Experience from './Experience';
import Categories from './Categories';


function Loader({setForm}) {

    const handleFormField = (setForm) => (section, data) => {
        setForm((prev) => {
            return {...prev, 
            
            [section]: data,
            }   
        })
    };

    return (
        <>
            <div className="loader">
                <h1>Add your information</h1>
                <div className="loader-box">
                    <h2 className="loader-title">Personal Information</h2>
                    <Personal onDataChange = {handleFormField(setForm)}/>
                </div>
                <div className="loader-box">
                    <h2 className="loader-title">Education</h2>
                    <Education onDataChange = {handleFormField(setForm)}/> 
                </div>
                <div className="loader-box">
                    <h2 className="loader-title">Experience</h2>
                    <Experience onDataChange = {handleFormField(setForm)}/>
                </div>
                <div className="loader-box">
                    <h2 className="loader-title">More Information</h2>
                    <Categories onDataChange = {handleFormField(setForm)}/>
                </div>
            </div>
        </>
    )
}

export default Loader;