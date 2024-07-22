import {useState} from 'react';
import '../styles/Content.css';

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
        color: '#C5D6D8',
    })

    console.log(form)

    return (
        <>
            <section className="content">
                <Loader setForm = {setForm} setTheme = {setTheme}/>
                <Output form = {form} theme = {theme}/>
            </section> 
        </>
    )
}

export default Content;
