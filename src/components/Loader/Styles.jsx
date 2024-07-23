import {useState} from 'react';

import ToggleButton from 'react-bootstrap/ToggleButton';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

function Styles({theme, setTheme}) {
    const [selectedTheme, setSelectedTheme] = useState({
        ...theme
    })
    let fontNames = ['Raleway', 'Lora', 'Quicksand']

    function handleStyleChange(e) {
        const {name, value} = e.target;
        let updatedTheme;

        if (name === "color") {
            updatedTheme = {
                ...selectedTheme,
                'color': value,
            }
        }
        else {
            updatedTheme = {
            ...selectedTheme,
            'font': parseInt(value),
            }
        }

        setSelectedTheme(updatedTheme);
        setTheme(updatedTheme);
    } 
    console.log(selectedTheme);
    return (
        <>
            <div className="style-label font">Choose your font</div>
            <ButtonGroup>
                <ToggleButton
                    id='font-1'
                    type="radio"
                    variant='outline-primary'
                    name="font"
                    value={1}
                    checked={selectedTheme.font === 1}
                    onChange={(e) => handleStyleChange(e)}
                    style={{
                            fontFamily: `${fontNames[0]}, serif`
                        }}>
                        Abc
                </ToggleButton>
                <ToggleButton
                    id='font-2'
                    type="radio"
                    variant='outline-primary'
                    name="font"
                    value={2}
                    checked={selectedTheme.font === 2}
                    onChange={(e) => handleStyleChange(e)}
                    style={{
                        fontFamily: `${fontNames[1]}, serif`
                    }}>
                        Abc
                </ToggleButton>
                <ToggleButton
                    id='font-3'
                    type="radio"
                    variant='outline-primary'
                    name="font"
                    value={3}
                    checked={selectedTheme.font === 3}
                    onChange={(e) => handleStyleChange(e)}
                    style={{
                        fontFamily: `${fontNames[2]}, serif`
                    }}>
                        Abc
                </ToggleButton>
            </ButtonGroup>

            <div className="accent-color">
                <label htmlFor='color-input' className='form-label'>Pick your accent color</label>
                    <input 
                        id="color-input"
                        type="color"
                        name="color"
                        value={selectedTheme.color}
                        onChange={(e)=>handleStyleChange(e)} 

                        className="form-control form-control-color"
                        title="Choose your color"
                    />
            </div>
        </>
    )
}

export default Styles;