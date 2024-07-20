import '../styles/Content.css';

import Loader from './Loader';
import Output from './Output';

function Content() {
    return (
        <>
            <section className="content">
                <Loader />
                <Output />
            </section> 
        </>
    )
}

export default Content;