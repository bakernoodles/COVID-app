import React, { useEffect, useState } from 'react';
import '../Styles/Content.css';
import CanvasJSReact from '../assets/canvasjs.react';

var CanvasJSChart = CanvasJSReact.CanvasJSChart;
const Graph = props => {
    const [dataCache, setDataCache] = useState({});
    const [options, setOptions] = useState(
        {
            title: {
              text: 'Select Country'
            },
            data: [{				
                type: "line",
                dataPoints: [{'x': "", 'y': ""}]
            }]
        }
    );
    useEffect(()=>{
        // if the "world" drop down gets selected... set default data.
        if(props.regionSelected === 'world') setOptions(
            {
                title: {
                  text: 'Select a Country'
                },
                data: [{				
                    type: "line",
                    dataPoints: [{'x': "", 'y': 0}]
                }]
            }
        ); // end of useEffect()
        // Else, check which region is selected.
        else if(props.regionSelected){
            // check if the data has already been searched and cached...if so, grab that data and display it.
            if(dataCache.hasOwnProperty(props.regionSelected)){
                setOptions({
                    title: {
                      text: props.regionSelected.toUpperCase() + ': Cases'
                    },
                    height:360,
                    
                    data: [{	
                        type: "line",			
                        dataPoints: dataCache[props.regionSelected]
                     }]
                });
            } else{
                // else, fetch the new data.
                let allInfected = '';
                fetch("https://cors-anywhere.herokuapp.com/https://api.covid19api.com/total/dayone/country/" + props.regionSelected)
                .then(res => res.json())
                .then(info => {
                    console.log( props.regionSelected," Data fetched and cached!: ", info);
                    // store the mapped array in a variable.
                    allInfected = info.map( (item, index )=> {
                        let regEx = item.Date.match(/^\d\d\d\d-\d\d-\d\d/)[0].split('-');
                        return {x: new Date(regEx[0], regEx[1], regEx[2]), y: item.Confirmed - item.Recovered - item.Deaths }
                    });
                })
                // set the new graph data
                .then(()=>{
                    // Cache the data to prevent multiple fetch calls
                    const newData = dataCache;
                    newData[props.regionSelected] = allInfected;
                    setDataCache(newData);
                    //set data
                    setOptions({
                        title: {
                        text: props.regionSelected.toUpperCase() + ': Cases'
                        },
                        height:360,
                        
                        data: [{	
                            type: "line",			
                            dataPoints: allInfected
                        }]
                    }); // end of setOptions()
                });// end of .then
            } // end of else
        };// end of else if
      
    },[props.regionSelected, dataCache])
    if(!props.regionSelected || props.regionSelected === 'world') return null;
    else return (
        <div  className='graph'>
            <CanvasJSChart options ={options}/>
        </div>
    )
}

export default Graph;