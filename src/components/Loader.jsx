import '../styles/Loader.css'

import Personal from './Personal';
// import Education from './Education';
import Experience from './Experience';
import Skills from './Skills';
import NewCategory from './NewCategory';


function Loader({setForm}) {

    // function handleFormField(section, data) {
    //     setForm((prev) => {
    //         return {...prev, 
            
    //         [section]: data,
    //         }   
    //     })
    // }

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
                <Personal onDataChange = {handleFormField(setForm)}/>
                {/* <Education form = {form} setForm = {setForm}/> */}
                <Experience onDataChange = {handleFormField(setForm)}/>
                <Skills onDataChange = {handleFormField(setForm)}/>
                <NewCategory onDataChange = {handleFormField(setForm)}/>
            </div>
        </>
    )
}

export default Loader;