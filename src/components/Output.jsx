import '../index.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faPhone, faLocationCrosshairs } from '@fortawesome/free-solid-svg-icons';


import { useState } from 'react';

import Modal from  'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Styles from './Loader/Styles';

import htmlCanvas from 'html2canvas';
import jsPdf from 'jspdf';


function Output({form, theme, setTheme}) {

    const [downloader, setDownloader] = useState(false);

    const downloadPdf = () => {
        const capture = document.querySelector('.deliverable-output');
        setDownloader(true);
        htmlCanvas(capture).then((canvas) => {
            const imgData = canvas.toDataURL('img/png');
            const doc = new jsPdf('a', 'mm', 'a4');
            const componentWidth = doc.internal.pageSize.getWidth();
            const componentHeight = doc.internal.pageSize.getHeight();
            doc.addImage(imgData, 'PNG', 0, 0, componentWidth, componentHeight);
            setDownloader(false);
            doc.save(`Resume.pdf`);
        })
    }


    const [showModal, setShowModal] = useState(false);
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    function getFont() {
        let fontNames = ['Raleway', 'Lora', 'Quicksand']
        return fontNames[theme.font - 1];
    }

    function getTextColorBasedOnBGColor() {
        const color = theme.color.slice(1);
        var r = parseInt(color.substring(0, 2), 16); // hexToR
        var g = parseInt(color.substring(2, 4), 16); // hexToG
        var b = parseInt(color.substring(4, 6), 16); // hexToB
        var uicolors = [r / 255, g / 255, b / 255];
        var c = uicolors.map((col) => {
            if (col <= 0.03928) {
            return col / 12.92;
            }
            return Math.pow((col + 0.055) / 1.055, 2.4);
        });
        var L = (0.2126 * c[0]) + (0.7152 * c[1]) + (0.0722 * c[2]);
        return (L > 0.250) ? '#000000' : '#FFFFFF';
    }

    function isPersonalEmpty() {
        return Object.keys(form.personal).every((key) => !form.personal[key] || form.personal[key] == "")
    }


    return (
            <div className="output col-sm-12 col-md-6 order-1 order-md-2 d-flex flex-column" style={{
                backgroundColor: '#e1e1e1'
            }}>
                
                <div className="d-flex align-items-center justify-content-end m-4">
                    <Button variant="secondary" size="sm" className='align-middle mx-1' onClick={handleShow}>
                        Customize
                    </Button>
                    <Button variant="primary" size="sm" className='align-middle mx-1' 
                        onClick={downloadPdf} disabled={!(downloader === false)}>
                        Download
                    </Button>
                </div>  

                <Modal show={showModal} onHide={handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Customize your resume</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Styles theme={theme} setTheme={setTheme}/>
                    </Modal.Body>
                </Modal>

                <div className='mb-5 d-flex justify-content-center'>
                    <div 
                        // ref={componentRef}
                        className='deliverable-output g-0 p-0 flex-fill'
                        style={
                            {
                                fontFamily: `${getFont()}, serif`,
                                overflow: 'hidden'
                            }
                        }>
                        <div className="d-flex"
                            style={
                                {
                                    backgroundColor: `${theme.color}`,
                                    color: getTextColorBasedOnBGColor(),
                                }
                            }>
                            <div 
                                className={`flex-fill ${!form.personal.avatar 
                                        ? 'd-flex justify-content-between' 
                                        : 'd-flex flex-column'}`}
                                        style={isPersonalEmpty() ? null : {margin: '2cqh 4cqw'}}>
                                <div className="d-flex flex-column justify-content-center">
                                    <h1 className="m-0 fw-bolder" style={{fontSize: '4cqw'}}>{form.personal.personalName}</h1>
                                    <p className="m-0 fw-normal"  style={{fontSize: '2.5cqw'}}>{form.personal.personalJob}</p>
                                </div>
                                <div className=
                                    "output-head-details fw-light" style={{fontSize: '2cqw'}}>
                                    {form.personal.personalEmail != "" && form.personal.personalEmail
                                    ?
                                        <div className="d-flex">
                                            <div className="detail-label mt-1 mb-0 mx-2">
                                                <FontAwesomeIcon icon={faEnvelope} />
                                            </div>
                                            <p className="detail-content mt-1 mb-0">{form.personal.personalEmail}</p>
                                        </div>
                                    :   
                                        null
                                    } 
                                    
                                    {form.personal.personalPhone != ""  && form.personal.personalPhone
                                    ? 
                                        <div className="d-flex">
                                            <div className="detail-label mt-1 mb-0 mx-2">
                                            <FontAwesomeIcon icon={faPhone} />
                                            </div>
                                            <p className="detail-content mt-1 mb-0">{form.personal.personalPhone}</p>
                                        </div>
                                    :
                                        null
                                    }
                                    
                                    
                                    {form.personal.personalLocation != "" && form.personal.personalLocation
                                    ?
                                        <div className="d-flex">
                                            <div className="detail-label mt-1 mb-0 mx-2">
                                                <FontAwesomeIcon icon={faLocationCrosshairs} />
                                            </div>
                                            <p className="detail-content mt-1 mb-0">{form.personal.personalLocation}</p>
                                        </div>
                                    :
                                        null
                                    }
                                    
                                </div>
                            </div>
                            
                            {form.personal.avatar 
                            ? 
                                <div className="col-md-4 d-flex align-items-center" style={{width: '18%', margin:'2cqh 4cqw 2cqh 0'}}>
                                    <img src={form.personal.avatar} style={{
                                        width: '100%',
                                        aspectRatio: '1/1.1',
                                        objectFit: 'cover',
                                    }}/>
                                </div> 
                            : 
                                null
                            }
                        </div>

                        <div className='output-body' style={{padding: '1cqh 3cqw'}}>
                            
                            {form.bio != "" 
                            ?
                                <div>
                                    <h1 className="border-bottom" style={{fontSize: '3cqw', marginBottom: '1cqh'}}>About me:</h1> 
                                    <p className="m-0" style={{fontSize: '2cqw'}}>
                                        {form.bio}
                                    </p>
                                </div>
                            : 
                            null}
                            
                            {form.educations.length > 0
                            ?
                                <div>
                                    <h1 className="border-bottom" style={{fontSize: '3cqw', marginBottom: '1cqh', marginTop:'1cqh'}}>Education:</h1>
                                    {form.educations.map((entry) => {
                                        return (
                                            <div className="d-flex" style={{marginTop: '1cqh'}}key={entry.uuid}>
                                                {(entry.educationStartDate != "" && entry.educationStartDate) || (entry.educationEndDate != "" && entry.educationEndDate)
                                                ?
                                                    <div style={{marginRight: '2cqw'}}>
                                                        <div style={{fontSize: '2cqw'}}>{entry.educationStartDate}</div>
                                                        <div className='d-flex' style={{fontSize: '2cqw'}}>
                                                            {entry.educationStartDate != "" && entry.educationEndDate != "" && entry.educationStartDate && entry.educationEndDate
                                                            ? <p className='m-0'>-&nbsp;</p>
                                                            : null}
                                                            {entry.educationEndDate}
                                                        </div>
                                                    </div>
                                                :
                                                    null
                                                }
                                                <div className="flex-fill d-flex flex-column justify-content-center">
                                                    <div className="d-flex align-items-center">
                                                        <h1 className="m-0 flex-fill" style={{fontSize: '2.5cqw'}}>
                                                            {entry.educationName}
                                                        </h1>
                                                        <p className="m-0" style={{fontSize: '2cqw'}}>
                                                            {entry.educationLocation}
                                                        </p>
                                                    </div>
                                                    <h5 className="m-0 fw-lighter" style={{fontSize: '2cqw'}}>
                                                        {entry.educationDegree}
                                                    </h5>
                                                    <p className="fw-normal" style={{fontSize: '2cqw', marginTop: '0.2cqh', marginBottom: '0'}}>
                                                        {entry.educationDescription}
                                                    </p>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            : 
                                null
                            }

                            {form.experiences.length > 0
                            ?
                                <div>
                                    <h1 className="border-bottom" style={{fontSize: '3cqw', marginBottom: '1cqh', marginTop:'1cqh'}}>Experience:</h1>
                                    {form.experiences.map((entry) => {
                                        return (
                                            <div className="d-flex" style={{marginTop: '1cqh'}}key={entry.uuid}>
                                                {(entry.expStartDate != "" && entry.expStartDate) || (entry.expEndDate != "" && entry.expEndDate)
                                                ?
                                                    <div style={{marginRight: '2cqw'}}>
                                                        <div style={{fontSize: '2cqw'}}>
                                                            {entry.expStartDate}
                                                        </div>
                                                        <div className='d-flex' style={{fontSize: '2cqw'}}>
                                                            {entry.expStartDate != "" && entry.expEndDate != "" && entry.expStartDate && entry.expEndDate
                                                            ? <p className='m-0'>-&nbsp;</p>
                                                            : null}
                                                            {entry.expEndDate}
                                                        </div>
                                                    </div>
                                                :
                                                    null
                                                }
                                                <div className="flex-fill d-flex flex-column justify-content-center">
                                                    <div className="d-flex align-items-center">
                                                        <h1 className="m-0 flex-fill" style={{fontSize: '2.5cqw'}}>
                                                            {entry.expCompanyName}
                                                        </h1>
                                                        <p className="m-0" style={{fontSize: '2cqw'}}>
                                                            {entry.expLocation}
                                                        </p>
                                                    </div>
                                                    <h5 className="m-0 fw-lighter" style={{fontSize: '2cqw'}}>
                                                        {entry.expPosition}
                                                    </h5>
                                                    <p className="fw-normal" style={{fontSize: '2cqw', marginTop: '0.2cqh', marginBottom: '0'}}>
                                                        {entry.expDescription}
                                                    </p>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            :
                                null
                            }

                            {form.categories.length > 0
                            ?   
                                form.categories.map((category) => {
                                    return (
                                        <div key={category.uuid}>
                                            <h1 className="border-bottom" style={{fontSize: '3cqw', marginBottom: '1cqh', marginTop:'1cqh'}}>{category.categoryTitle}:</h1>
                                            {category.categoryItems.map((entry) => {
                                                return (
                                                    <div className="d-flex" style={{marginTop: '1cqh'}}key={entry.uuid}>
                                                        {(entry.StartDate != "" && entry.StartDate) || (entry.EndDate != "" && entry.EndDate)
                                                        ?
                                                            <div style={{marginRight: '2cqw'}}>
                                                                <div style={{fontSize: '2cqw'}}>{entry.StartDate}</div>
                                                                <div className='d-flex' style={{fontSize: '2cqw'}}>
                                                                    {entry.StartDate != "" && entry.StartDate != "" && entry.EndDate && entry.EndDate
                                                                    ? <p className='m-0'>-&nbsp;</p>
                                                                    : null}
                                                                    {entry.EndDate}
                                                                </div>
                                                            </div>
                                                        :
                                                            null
                                                        }
                                                        <div className="flex-fill d-flex flex-column justify-content-center">
                                                            <div className="d-flex align-items-center">
                                                                <h1 className="m-0 flex-fill" style={{fontSize: '2.5cqw'}}>
                                                                    {entry.Title}
                                                                </h1>
                                                                <p className="m-0" style={{fontSize: '2cqw'}}>
                                                                    {entry.Location}
                                                                </p>
                                                            </div>
                                                            <p className="fw-normal" style={{fontSize: '2cqw', marginTop: '0.2cqh', marginBottom: '0'}}>
                                                                {entry.Description}
                                                            </p>
                                                        </div>
                                                    </div>)
                                                })}
                                        </div>)
                                    })
                            : 
                                null
                            }
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default Output;