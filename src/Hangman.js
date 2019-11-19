import React from 'react';
import './App.css';
import Title from './components/Title';
import Gallows from "./components/Gallows";
import Phrase from "./components/Phrase";
import UserInput from "./components/LetterInput";


class Hangman extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            phrase : "HOT DOGS",
            guessedLetters : [],
        }
    }

    handleGuess(letter){
        if(!this.state.guessedLetters.includes(letter)){
            this.state.guessedLetters.push(letter);
            this.setState({
                guessedLetters : this.state.guessedLetters
            });
        }
    }

    handleNewGame(){
        this.setState({
            phrase : "HAMBURGERS",
            guessedLetters : [],
        });
    }

    isWon(){
        return this.state.phrase.split("").every((letter) =>
            this.state.guessedLetters.includes(letter) || letter === ' '
        );
    }

    isLost(){
        return this.getIncorrectGuessedLetters().length >= 6;
    }

    getIncorrectGuessedLetters(){
        return this.state.guessedLetters.filter( letter =>
            !this.state.phrase.includes(letter)
        );
    }

    render() {
        const incorrectGuessedLetters = this.getIncorrectGuessedLetters();
        const instructions = this.isWon() ? "Congratulations!" :
            this.isLost() ? "Game Over." : "Guess a letter";

        return (
            <div className="Hangman">
                <Title/>
                <Gallows
                    incorrectGuessCount={incorrectGuessedLetters.length}
                />
                <div>
                    {instructions}
                </div>
                <Phrase
                    phrase={this.state.phrase}
                    guessedLetters={this.state.guessedLetters}
                />
                <UserInput
                    onGuess={(letter) => this.handleGuess(letter)}
                    gameActive={!this.isLost() && !this.isWon()}
                    onNewGame={() => this.handleNewGame()}
                />
                {
                    this.state.guessedLetters.length > 0 &&
                        "Guessed Letters: " + this.state.guessedLetters.join("")
                }
            </div>
        );
    }
}

export default Hangman;