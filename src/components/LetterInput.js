import React from 'react';

class UserInput extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            value : ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
            value: event.target.value.toUpperCase()
        })
    }

    handleSubmit(event){
        this.props.onGuess(this.state.value);
        this.setState({
           value: ''
        });
        event.preventDefault();
    }

    render() {

        const guessLetterForm = <div>
            <form onSubmit={this.handleSubmit}>
                <input
                    type="text"
                    value={this.state.value}
                    onChange={this.handleChange}
                    maxLength={1}
                />
                <input type={"submit"} value={"Guess Letter"}/>
            </form>
        </div>;

        const newGameButton = <div>
            <button onClick={this.props.onNewGame}>New Game</button>
        </div>;

        return this.props.gameActive ? guessLetterForm : newGameButton;
    }
}

export default UserInput;
