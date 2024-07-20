import '../styles/Loader.css'

import Personal from './Personal';
import Education from './Education';
import Experience from './Experience';
import Skills from './Skills';
import NewCategory from './NewCategory';

function Loader() {
    return (
        <>
            <div className="loader">
                <h1>Add your information</h1>
                <Personal />
                <Education />
                <Experience />
                <Skills />
                <NewCategory />
            </div>
        </>
    )
}

export default Loader;