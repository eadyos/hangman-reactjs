import React from 'react';
import gallowImage0 from './gallows0.jpg';
import gallowImage1 from './gallows1.jpg';
import gallowImage2 from './gallows2.jpg';
import gallowImage3 from './gallows3.jpg';
import gallowImage4 from './gallows4.jpg';
import gallowImage5 from './gallows5.jpg';
import gallowImage6 from './gallows6.jpg';
import './Gallows.css';

class Gallows extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            gallowImages : {
                0 : gallowImage0,
                1 : gallowImage1,
                2 : gallowImage2,
                3 : gallowImage3,
                4 : gallowImage4,
                5 : gallowImage5
            }
        }
    }

    render() {

        let gallowImage = this.state.gallowImages[this.props.incorrectGuessCount];
        if(!gallowImage){
            gallowImage = gallowImage6;
        }

        return (
            <div className="Gallows">
                <img src={gallowImage} alt="Gallows"/>
            </div>
        );
    }
}

export default Gallows;
