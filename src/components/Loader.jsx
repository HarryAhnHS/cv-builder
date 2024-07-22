import '../styles/Loader.css'

import Bio from './Bio';
import Personal from './Personal';
import Education from './Education';
import Experience from './Experience';
import Categories from './Categories';

import Styles from './Styles';


function Loader({setForm, setTheme}) {

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
                    <h2 className="loader-title">Personal Bio</h2>
                    <Bio onDataChange = {handleFormField(setForm)}/>
                </div>
                <div className="loader-box">
                    <h2 className="loader-title">Education</h2>
                    <Education onDataChange = {handleFormField(setForm)}/> 
                </div>
                <div className="loader-box">
                    <h2 className="loader-title">Experience</h2>
                    <Experience onDataChange = {handleFormField(setForm)}/>
                </div>
                
                <Categories onDataChange = {handleFormField(setForm)}/>
                
                <div className="loader-box">
                    <h2 className="loader-title">Customize</h2>
                    <Styles setTheme={setTheme}/>
                </div>
            </div>
        </>
    )
}

export default Loader;