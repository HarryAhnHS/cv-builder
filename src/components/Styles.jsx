import {useState} from 'react';

function Styles({setTheme}) {
    const [selectedTheme, setSelectedTheme] = useState({
        layout: 1,
        font: 1,
        color: '#09A4FF',
    })

    function handleStyleChange(e) {
        const {name, id, value} = e.target;
        let updatedTheme;

        if (name === "color") {
            updatedTheme = {
                ...selectedTheme,
                [name]: value,
            }
        }
        else {
            updatedTheme = {
            ...selectedTheme,
            [name]: id.slice(-1),
            }
        }

        setSelectedTheme(updatedTheme);
        setTheme(updatedTheme);
    } 
    return (
        <div className="form styles">
            <div className="fonts">
                <div className="style-label font">Choose your font</div>
                <div className='style-inputs font'>
                    <button 
                        onClick={(e)=>handleStyleChange(e)} 
                        id="font-1" name="font" 
                        className={selectedTheme.font == 1 ? 'active' : null}>A</button>
                    <button 
                        onClick={(e)=>handleStyleChange(e)} 
                        id="font-2" name="font" 
                        className={selectedTheme.font == 2 ? 'active' : null}>B</button>
                    <button 
                        onClick={(e)=>handleStyleChange(e)} 
                        id="font-3" name="font" 
                        className={selectedTheme.font == 3 ? 'active' : null}>C</button>
                </div>
                
            </div>

            <div className="accent-color">
                <div className="style-label color">Choose your accent color</div>
                <div className='style-inputs color'>
                    <input 
                        type="color"
                        name="color"
                        value={selectedTheme.color}
                        onChange={(e)=>handleStyleChange(e)} 
                    />
                </div>
            </div>
        </div>
    )
}

export default Styles;