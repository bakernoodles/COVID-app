import React, {useState, useEffect} from 'react';
import './App.css';
import Content from './components/Content';
import Graph from './components/Graph';
import News from './components/News';
const App = () => {
  // state
  const [summary, setSummary] = useState([]); // Data Summary for The country selected. (infected, deaths, recovered)
  const [infected, setInfected] = useState('loading');
  const [recovered, setRecovered] = useState('loading');
  const [dead, setDead] = useState('loading');
  const [countries, setCountries]= useState([]);// The list of countries gathered on initial fetch (for the dropdown).
  const [regionSelected, setRegionSelected] = useState(''); // The region currently selected from the drop down.
  const [worldData, setWorldData]=useState([]); // Holds the infected, recovered and dead data.
  // When region is changed, change the records displayed.
  const changeRegion = (event) => {
    setRegionSelected(event.target.value);
    // if current selected is the world, display world data. else display the country selected data
    if(event.target.value === 'world'){
      setInfected(worldData[0]);
      setRecovered(worldData[1]);
      setDead(worldData[2]);
    }else{
      let countryIndex = countries.indexOf(event.target.value)
      setInfected(summary.Countries[countryIndex].TotalConfirmed.toLocaleString());
      setRecovered(summary.Countries[countryIndex].TotalRecovered.toLocaleString());
      setDead(summary.Countries[countryIndex].TotalDeaths.toLocaleString());
    }
  }
  // Data Summary fetch at launch
  useEffect( () =>  {
    fetch('https://cors-anywhere.herokuapp.com/https://api.covid19api.com/summary')
      .then(res => res.json())
      .then((info) => {
        //set the global numbers immediateley and caches it for later use.
        setInfected(info.Global.TotalConfirmed.toLocaleString() );
        setRecovered(info.Global.TotalRecovered.toLocaleString() );
        setDead(info.Global.TotalDeaths.toLocaleString() );
        setWorldData([info.Global.TotalConfirmed.toLocaleString() , info.Global.TotalRecovered.toLocaleString(), info.Global.TotalDeaths.toLocaleString()]);
        // get country list
        setCountries( () => {
          const regions = [];
          info.Countries.map(c => regions.push(c.Slug));
          return regions;
        })
        // cache the world data summary
        setSummary(info);
      }) 
  }, []);
  // 
  return(
    <div className="App">
      <header className="App-header">
        <h2>Covid 19</h2>
        <div>
          <h4>Select Region</h4>
          <select id='region' onChange={changeRegion} value = { regionSelected}>
            <option value={'world'} >World</option>
            {countries.map(item => <option key={item} value={item}> {item.toUpperCase()} </option>)}
          </select>
        </div>
      </header>
      <Content infected={infected} recovered={recovered} dead={dead} />
      <Graph regionSelected = {regionSelected} worldData = {summary.Countries}/>
      <News/> 
  </div>
  )
}

export default App;