import React from 'react';
import './Hangman.css';
import Title from './components/Title';
import Gallows from "./components/Gallows";
import Phrase from "./components/Phrase";
import UserInput from "./components/LetterInput";
import Hint from "./components/Hint";


class Hangman extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            phrase: null,
            guessedLetters: [],
            hintCount : 0
        }
    }

    componentDidMount() {
        this.fetchWord()
    }

    fetchWord(){
        const offlineWords = [
            "dance",
            "jumping jack",
            "alligator",
            "shark",
            "chicken",
            "ice cream cone",
            "airplane",
            "basketball",
            "elephant",
            "camera",
            "telephone",
            "football",
            "toothbrush",
            "kangaroo",
            "circle",
            "sleep",
            "prayer",
            "happy",
            "blink",
            "drawings",
            "Frankenstein",
            "skateboard",
            "penguin",
            "Hot Wheels",
            "Scooby Doo",
            "Spider Man",
            "trumpet",
            "alarm clock",
            "lipstick",
            "puppet",
            "hair dryer",
            "president",
            "washing machine",
            "lawn mower",
            "nightmare",
            "dreams",
            "valcano",
            "quicksand",
            "french bulldog",
            "James",
            "bicycles",
            "windmill",
            "harry potter",
            "alphabet",
            "thank you",
            "parsons elementary",
            "pillow case",
            "bath tub",
            "swimming pool"
        ]

        fetch('http://localhost:3001')
            .then(res => res.text())
            .then(text => {
                console.log(text);
                this.setState({
                    phrase : text.toUpperCase()
                });
            })
            .catch((exception) => {
                const index = Math.floor(offlineWords.length * Math.random())
                this.setState({
                    phrase : offlineWords[index].toUpperCase()
                });
                console.log(exception);
            });
    }

    handleGuess(letter) {
        if (!this.state.guessedLetters.includes(letter)) {
            this.state.guessedLetters.push(letter);
            this.setState({
                guessedLetters: this.state.guessedLetters
            });
        }
    }

    handleNewGame() {
        this.setState({
            phrase: this.fetchWord(),
            guessedLetters: [],
            hintCount: 0
        });
    }

    isWon() {
        return this.state.phrase != null && this.state.phrase.split("").every((letter) =>
            this.state.guessedLetters.includes(letter) || letter === ' '
        );
    }

    isLost() {
        return this.getIncorrectGuessedLetters().length >= 6;
    }

    getIncorrectGuessedLetters() {
        return this.state.guessedLetters.filter(letter =>
            !this.state.phrase.includes(letter)
        );
    }

    handleHintClicked() {
        const letter = this.state.phrase.split("").find(letter =>
            !this.state.guessedLetters.includes(letter)
        );
        this.state.guessedLetters.push(letter)
        this.setState({
            guessedLetters: this.state.guessedLetters,
            hintCount: this.state.hintCount + 1
        });
    }

    render() {
        const incorrectGuessedLetters = this.getIncorrectGuessedLetters();
        const message = this.isWon() ? <div className={"congratulations"}>Congratulations!</div>
            : this.isLost() ? <div className={"gameover"}>Game Over</div> : "";
        const gameActive = !this.isLost() && !this.isWon();

        return (
            <div className="Hangman">
                <Title/>
                <Gallows
                    incorrectGuessCount={incorrectGuessedLetters.length}
                    isWon={this.isWon()}
                />
                <Phrase
                    phrase={this.state.phrase}
                    guessedLetters={this.state.guessedLetters}
                />
                {message}
                <UserInput
                    onGuess={(letter) => this.handleGuess(letter)}
                    gameActive={gameActive}
                    onNewGame={() => this.handleNewGame()}
                />
                {
                    this.state.guessedLetters.length > 0 &&
                    "Guessed Letters: " + this.state.guessedLetters.join("")
                }
                <Hint
                    gameActive={gameActive}
                    hintCount={this.state.hintCount}
                    onClick={() => this.handleHintClicked()}
                />
            </div>
        );
    }
}

export default Hangman;