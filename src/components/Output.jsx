import '../styles/Output.css'

function Output({form}) {
    return (
        <>
            <div className="output">
                <button id="download">Download</button>
                <div className="deliverable-output">
                    {form.personal.name}
                </div>
            </div>
        </>
    )
}

export default Output;