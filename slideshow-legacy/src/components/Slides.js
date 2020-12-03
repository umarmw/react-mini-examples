import React from 'react';

class Slides extends React.Component {
    constructor(props) {
      super(props);
      this.state = {length: props.slides.length, current: 0};
      this.handlePrevClick = this.handlePrevClick.bind(this);
      this.handleNextClick = this.handleNextClick.bind(this);
      this.handleResetClick = this.handleResetClick.bind(this);
    }

    handlePrevClick(e) {
        e.preventDefault();
        this.setState({ current: this.state.current-1});
    }
    
    handleNextClick(e) {
        e.preventDefault();
        this.setState({ current: this.state.current+1});
    }

    handleResetClick(e) {
        e.preventDefault();
        this.setState({ current:0});
    }

    render() {
        return (
            <div>
                <div id="navigation" className="text-center">
                    <button data-testid="button-restart" className="small outlined" disabled={(this.state.current===0)?"disabled":""} onClick={this.handleResetClick}>Restart</button>
                    <button data-testid="button-prev" className="small" disabled={(this.state.current===0)?"disabled":""} onClick={this.handlePrevClick}>Prev</button>
                    <button data-testid="button-next" className="small" disabled={(this.state.current===this.state.length-1)?"disabled":""} onClick={this.handleNextClick}>Next</button>
                </div>
                
                <div id="slide" className="card text-center">
                    <h1 data-testid="title">{this.props.slides[this.state.current].title}</h1>
                    <p data-testid="text">{this.props.slides[this.state.current].text}</p>
                </div>
                
            </div>
        );
    }
  }



export default Slides;
