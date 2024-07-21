import {useState} from 'react';
import '../styles/Content.css';

import Loader from './Loader';
import Output from './Output';

function Content() {
    // Init States
    
    const [form, setForm] = useState({
        personal: {},
        educations: [],
        experiences: [],
        categories: []
    });

    console.log(form)

    return (
        <>
            <section className="content">
                <Loader setForm = {setForm} />
                <Output form = {form}/>
            </section> 
        </>
    )
}

export default Content;
