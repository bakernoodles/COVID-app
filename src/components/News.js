import React, { useEffect, useState } from 'react';
import "../Styles/news.css";

const News = ()=>{
   const [newsData, setNewsData] = useState(null);
   const [updated, setUpdated] = useState(false);
   useEffect((newsData)=>{
      fetch("https://newsapi.org/v2/everything?apiKey=a9f91860669c429ea84c73cc65388adc&q=COVID&pageSize=7&language=en&qInTitle=(COVID)AND(CORONA)")
      .then(res => res.json())
      .then(info => {
         setNewsData(info)
         setUpdated(true);
      })
   },[updated])
   
   let dataJSX = ()=>{
      if(newsData){
         return newsData.articles.map((item, index)=>{
            return (
               <div className="articleSection" key={index}>
               <a href={item.url} target="_blank" rel="noopener noreferrer">
                  <h2>{item.title}</h2>
                  <img src={item.urlToImage} alt={item.description} />
                  <h4>{item.description}</h4>
               </a>
            </div>
            )
         })
      } else return null;
   };

   return(
      <div className='container'>
         {dataJSX()}
      </div>
      
   );
}
export default News;
