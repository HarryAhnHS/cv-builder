import {useState} from 'react';
import '../styles/Content.css';

import Loader from './Loader';
import Output from './Output';

function Content() {
    // Init States
    
    const [form, setForm] = useState({
        personal: {
            name: '',
            job: '',
            email: '',
            phone: '',
            location: ''
        },
        educations: [],
        experiences: [{}],
        skills: [{}],
        categories: [{}]
    });

    function handleForm(data) {
        setForm(data);
    }

    return (
        <>
            <section className="content">
                <Loader form = {form} handleForm = {handleForm} />
                <Output form = {form}/>
            </section> 
        </>
    )
}

export default Content;
