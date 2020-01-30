import React from 'react';
import './Map.css';

class Map extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {gameMatrix} = this.props;
     
        return (
            <div className={"map"}>
                {
                    gameMatrix.map((line, index) => (
                        <div className="line" key={index}>
                            {
                                line.map((square, index) => (
                                    <div className={`square`} key={index} style={{backgroundColor: `${square}`}} >
                                        {square == 'white' ? 'x' : ' '}
                                    </div>
                                ))
                            }
                        </div>
                    ))
                }
            </div>
        )
    }
}

export default Map;