import React, {useState, useEffect} from 'react';
import './App.css';
import 'h8k-components';

import Articles from './components/Articles';

const title = "Sorting Articles";


function compareUpvotes(a, b) {
    const A = a.upvotes;
    const B = b.upvotes;
  
    let comparison = 0;
    if (A > B) {
      comparison = 1;
    } else if (A < B) {
      comparison = -1;
    }
    return comparison;
  }

  function compareDates(a, b) {
    const A = (new Date(a.date)).getTime();
    const B = (new Date(b.date)).getTime();
  
    let comparison = 0;
    if (A > B) {
      comparison = 1;
    } else if (A < B) {
      comparison = -1;
    }
    return comparison;
  }

function App({articles}) {

    const [lartik, setLartik] = useState([]);

    // useEffect(() => { setLartik(JSON.parse(JSON.stringify(articles))) }, [articles]);
    useEffect(() => { setLartik(articles) }, [articles]);

    function mostUpvoted(e){
        e.preventDefault();
        let lk = lartik.sort(compareUpvotes).reverse();
        setLartik(JSON.parse(JSON.stringify(lk)));
    }

    function mostRecent(e){
        e.preventDefault();
        let lk = lartik.sort(compareDates).reverse();
        setLartik(JSON.parse(JSON.stringify(lk)));
    }


    return (
        <div className="App">
            <h8k-navbar header={title}></h8k-navbar>
            <div className="layout-row align-items-center justify-content-center my-20 navigation">
                <label className="form-hint mb-0 text-uppercase font-weight-light">Sort By</label>
                <button data-testid="most-upvoted-link" className="small" onClick={mostUpvoted}>Most Upvoted</button>
                <button data-testid="most-recent-link" className="small" onClick={mostRecent}>Most Recent</button>
            </div>
            {lartik && <Articles articles={lartik}/>}
        </div>
    );

}

export default App;
