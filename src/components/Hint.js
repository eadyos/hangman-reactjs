import React from 'react';

class Hint extends React.Component {

    render() {
        if(this.props.hintCount < 1 && this.props.gameActive){
            return <div><button onClick={this.props.onClick}>Use Hint</button></div>
        }else{
            return null;
        }
    }
}

export default Hint;
