# **COVID App**
---
### *Simple COVID application which displays regional data for a selected country and top headline news.*

- Shows **infected**, **Recovered**, **Deaths** for a region or world.
- Displays a graph timeline of all cases recorded for a region.

   - Cases calculated by: Infected - (Recovered + Deaths)
- Shows recent top news articles.
   
   - The number of News articles displayed is random and usualy around 4 (more ro less). The api returns the top articles from various news sources.

---
## APIs used
1. (https://api.covid19api.com) - Regional Data 
2. (https://newsapi.org)  News API
##### *The APIs used are free and limited. Try not to abuse them by calling them repeatedly or you'll get a CORS error.*

---
## Technologies used:
- HTML5
- CSS3
- Javascript
- React
- CanvisJS Library
---
## Bugs

1. When the graph is fetching new data for a new region, the previous regional data is still displayed. I plan to add a 'Loading data' fix some other time.

2. I plan to add more error checking if data fails to fetch for whatever reason.

---
## thoughts...
I made this web application for fun. I wish i was able to do more regarding the data displayed but i was held back by the limited data i was allowed to use from the APIs.

---
App by: *Christopher Yniguez*
