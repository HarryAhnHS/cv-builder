import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons';

function Footer() {
    return (
        <>
            <section className="footer">
                <div className="py-3 d-flex justify-content-center align-items-center">
                    Brought to you by @HarryAhnHS
                    <a href="https://github.com/HarryAhnHS" target="_blank" className="fs-4 m-2" style={{color: 'black'}}>
                        <div>
                            <FontAwesomeIcon icon={faGithub} bounce/>
                        </div>
                    </a>
                </div>
            </section>
        </>
    )
}

export default Footer;