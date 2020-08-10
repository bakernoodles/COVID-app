import React from 'react';
import '../Styles/Content.css';
const Content = props => {
    return (
        <div className='contentArea'>
            <div className='cardArea'>
                <div className='cards'>
                    <h4>Infected</h4>
                <h2>{props.infected}</h2>
                </div>
                <div className='cards'>
                    <h4 >Recovered</h4>
                    <h2 className="greenText">{props.recovered}</h2>
                </div>
                <div className='cards'>
                    <h4>Dead</h4>
                    <h2 className="blackText">{props.dead}</h2>
                </div>
            </div>
        </div>    
    )
}

export default Content;