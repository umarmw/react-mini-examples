import React, {useState} from 'react';

function Slides({slides}) {
    const [current, setCurrent] = useState(0);
    const length = slides.length;

    function handlePrevClick(e) {
        e.preventDefault();
        setCurrent(current-1);
    }
    
    function handleNextClick(e) {
        e.preventDefault();
        setCurrent(current+1);
    }


    function handleResetClick(e) {
        e.preventDefault();
        setCurrent(0);
    }

    return (
        <div>
            <div id="navigation" className="text-center">
                <button data-testid="button-restart" className="small outlined" disabled={(current==0)?"disabled":""} onClick={handleResetClick}>Restart</button>
                <button data-testid="button-prev" className="small" disabled={(current==0)?"disabled":""} onClick={handlePrevClick}>Prev</button>
                <button data-testid="button-next" className="small" disabled={(current==length-1)?"disabled":""} onClick={handleNextClick}>Next</button>
            </div>
            
            <div id="slide" className="card text-center">
                <h1 data-testid="title">{slides[current].title}</h1>
                <p data-testid="text">{slides[current].text}</p>
            </div>
            
            
        </div>
    );

}

export default Slides;
