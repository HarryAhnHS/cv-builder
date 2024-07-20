import '../styles/Loader.css'

import Personal from './Personal';
import Education from './Education';
import Experience from './Experience';
import Skills from './Skills';
import NewCategory from './NewCategory';

function Loader({form, handleForm}) {

    return (
        <>
            <div className="loader">
                <h1>Add your information</h1>
                <Personal form = {form} handleForm = {handleForm}/>
                <Education form = {form} handleForm = {handleForm}/>
                <Experience form = {form} handleForm = {handleForm}/>
                <Skills form = {form} handleForm = {handleForm}/>
                <NewCategory form = {form} handleForm = {handleForm}/>
            </div>
        </>
    )
}

export default Loader;