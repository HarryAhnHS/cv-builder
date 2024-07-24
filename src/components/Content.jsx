import {useState} from 'react';
// import '../styles/Content.css';

import Loader from './Loader';
import Output from './Output';

function Content() {
    // Init States
    
    const [form, setForm] = useState({
        bio: "",
        personal: {},
        educations: [],
        experiences: [],
        categories: []
    });

    const [theme, setTheme] = useState({
        font: 1,
        color: '#007bff',
    })

    console.log(form)

    return (
        <>
            <section className="container-fluid">
                <div className='row'>
                    <Loader setForm = {setForm}/>
                    <Output form = {form} theme = {theme} setTheme = {setTheme}/>
                </div>
            </section> 
        </>
    )
}

export default Content;
