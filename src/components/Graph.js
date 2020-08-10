import React, { useEffect, useState } from 'react';
import '../Styles/Content.css';
import CanvasJSReact from '../assets/canvasjs.react';

var CanvasJSChart = CanvasJSReact.CanvasJSChart;
const Graph = props => {
    const [dataCache, setDataCache] = useState({});// data cache
    // function to display loading in the graph section
    const loading = ()=>{
        return {
            title: {
            text: 'Loading'
            },
            data: [{				
                type: "line",
                dataPoints: [{'x': "", 'y': ""}]
            }]
        };
    }
    const [options, setOptions] = useState(loading());
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
        ); 
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
                setOptions(loading());// Display loading while data is being fetched.
                let allInfected = ''; // Holds the fetched data temporarily.
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
                    const newData = dataCache;
                    newData[props.regionSelected] = allInfected;
                    setDataCache(newData); // Set cache data. Prevents multiple fetch calls
                    // Set options data
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
      
    },[props.regionSelected, dataCache]);
    // return null if no region or world is selected. (removes the graph). Else, display the graph.
    if(!props.regionSelected || props.regionSelected === 'world') return null;
    else return (
        <div  className='graph'>
            <CanvasJSChart options ={options}/>
        </div>
    )
}

export default Graph;