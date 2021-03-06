import React from 'react';

class Phrase extends React.Component {

    render() {

        const phraseLetters = this.props.phrase != null ? this.props.phrase.split("") : [];
        const guessedLetters = this.props.guessedLetters;
        const phraseDisplay = phraseLetters.map((letter) => {
           return guessedLetters.includes(letter) ? letter :
               letter === ' ' ? '\u00A0' : "_";
        }).join(" ");

        return (
            <div className={"Phrase"}>
                {phraseDisplay}
            </div>
        );
    }
}

export default Phrase;
