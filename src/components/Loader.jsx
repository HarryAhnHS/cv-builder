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
                <div className="content-loader-box">
                    <h4>Personal Information</h4>
                    <Personal onDataChange = {handleFormField(setForm)}/>
                </div>
                <div className="content-loader-box">
                    <h4>Education</h4>
                    <Education onDataChange = {handleFormField(setForm)}/> 
                </div>
                <div className="content-loader-box">
                    <h4>Experience</h4>
                    <Experience onDataChange = {handleFormField(setForm)}/>
                </div>
                <div className="content-loader-box">
                    <h4>More Information</h4>
                    <Categories onDataChange = {handleFormField(setForm)}/>
                </div>
            </div>
        </>
    )
}

export default Loader;