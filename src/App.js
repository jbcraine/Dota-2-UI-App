import './App.css';
import { useEffect, useState } from 'react'

import CardList from './Components/CardList';
import FiltersBar from './Components/FiltersBar';

const heroesPerDecque = 7;
let heroDecquePositions = [-parseInt(heroesPerDecque/2), parseInt(heroesPerDecque/2)]

function App() {
 
  const totalCardWidth = 358;
  
  

  const[heroes, setHeroes] = useState([])
  const[filteredHeroes, setFilteredHeroes] = useState([])
  //Position of the currently selected hero in the heroes array
  const[selectedHeroPos, setSelectedHeroPos] = useState(parseInt(heroesPerDecque/2))
  const[isLoading, setIsLoading] = useState(true)
  const[query, setQuery] = useState("")
  const[filters, setFilters] = useState([])
  const[orderBy, setOrderBy] = useState("name");
  const[listLimit, setListLimit] = useState(122);
  const[ascending, setAscending] = useState(1);
  const[secondaryFilters, setSecondaryFilters] = useState([])
  //The card in the center index of heroDeceque will be selected. 
  //CONDITION: There must always be a card in the center index after initialization.
  const[heroDecque, setHeroDecque] = useState([])

//#region Functions

  //This function is used add to and remove cards from the heroDecque and ensure that the bounds of the filteredHeroes array are not exceeded
  const shiftPos = (i) => {
    const half = parseInt(heroesPerDecque / 2);

    //Moving backward
    if (i < 0)
    {
      //Backward move is only valid if the index prior to the middle index is not null
      if (heroDecque[half-1] != null)
      {
        if (heroDecquePositions[0] > 0)
        {
          //If the incumbent index is within the array, then add it to the decque
          let a = [];
          for (i = 0; i < heroDecque.length; i++)
            a[i] = heroDecque[i];

          a.unshift(filteredHeroes[heroDecquePositions[0]-1])
          a.pop();

          console.log(a)
          setHeroDecque(a);
        }
        else
        {
          setHeroDecque([null, ...heroDecque.slice(0, heroDecque.length-1)])
        }

        //Update the positions
        heroDecquePositions = heroDecquePositions.map(i => i-1)
        setSelectedHeroPos(half)
      }
    }
    
    //Moving forward
    else if (i > 0)
    {
      //Forward move is only valid if the index ahead of the middle index is not null
      if (heroDecque[half+1] != null)
      {
        //If the incumbent index is within the array, then add it to the decque
        if (heroDecquePositions[1] < filteredHeroes.length-1)
        {
          console.log(1)

          let a = [];
          for (i = 0; i < heroDecque.length; i++)
            a[i] = heroDecque[i];
        
          console.log(a)
          a.push(filteredHeroes[heroDecquePositions[1]+1]);
          console.log(a)
          a.shift()
          console.log(a)

          console.log(a)
          setHeroDecque(a);
        }
        //Otherwise, add a nonexistent index, indicating a null value
        else
        {
          console.log(2)
          setHeroDecque([...heroDecque.slice(1, heroDecque.length), null])
        }

        //Update the positions
        heroDecquePositions[0]+=1;
        heroDecquePositions[1]+=1;
        console.log(heroDecquePositions)
        setSelectedHeroPos(half)
      }
    }




    {/*
    var newPos = i;
    if (newPos < 0 || newPos >= listLimit || newPos >= filteredHeroes.length)
      return;
    setSelectedHeroPos(newPos);
    */}
  }

  const addFilter = async (s) => {
    console.log(filters)
    setFilters([...filters, s]);
    console.log(filters);
  }

  const removeFilter = async(s) => {
    console.log(filters)
    setFilters(filters.filter(f => f.name !== s.name))
    console.log(filters)
  }

  const setFilter = (selected, filter) => {
    selected?removeFilter(filter):addFilter(filter);
}

  const addSecondaryFilter = (secondaryFilter) => {
    if (secondaryFilters.length == 3)
    {
      return;
    }
    else
    {
      console.log(secondaryFilter)
      setSecondaryFilters([...secondaryFilters, secondaryFilter])
    }
  }

  const removeSecondaryFilter = (id) => {
    console.log(id)
    setSecondaryFilters(secondaryFilters.filter((sf) => sf.id != id));
  }

  const sortHeroes = (arr) => {
    return arr.sort((a, b) => {
      let i = 1, j = -1;
      i *= ascending;
      j *= ascending;
      return a[orderBy]>b[orderBy]?i:j;
    }).map(i => i)
  }
//#endregion
//#region Effects


  //On start, get all heroes from the database
  useEffect(() => {
    const fetchHeroes = async () => {

      const result = await fetch('http://localhost:5000/', {
        method: 'GET',
        mode: 'cors',
      })

      let h = await result.json();
      setHeroes(h);
      setFilteredHeroes(h);
    }

    fetchHeroes();

    }, 
    [])

  useEffect(() => {
    let arrhero = [];
    var half = parseInt(heroesPerDecque/2);
    //If there aren't enough items in filteredHeroes to fill the second half of the array, then put in as many as possible and null for the remained
    
    //STANDARD: There are enough heroes to fill.
    if (half+1 < filteredHeroes.length)
    {
      arrhero = filteredHeroes.slice(0, half + 1);
    } 

    //EXCEPTION: There are not enough heroes to fill. Fill remaining space will null.
    else
    {
      arrhero = filteredHeroes.map(i => i);
      //Fill remaining space will null.
      arrhero = [...arrhero, ...(new Array(half+1 - arrhero.length).fill(null))];
    }

    let arrnull = new Array(half).fill(null);


    setHeroDecque([...arrnull, ...arrhero]);
    }, [filteredHeroes])

    useEffect(() => {
      
    }, [heroDecque])

  //When a card is selected, that card will be focused on in the viewer
  //The card at the center index in heroDecque should be focused
  {/*}
  useEffect(() => {
    var elem = document.getElementsByClassName('selected_card');
    if (elem != null && elem[0] != null)
    {
      elem[0].classList.remove('selected_card');
    }
    var selected = document.getElementById('card-' + selectedHeroPos);
    if (selected != null)
    {
      selected.classList.add('selected_card');
    }
    

      var e = document.getElementById('hero_tape_container');
      if (e != null)
      {
        //e.style.left = (-(parseFloat(width.replace('px', '')) + parseFloat(margin.replace('px', '')) * 2.375) * selectedHeroPos) + 'px';
        e.style.left = (-(totalCardWidth) * selectedHeroPos) + 'px';
      }
    //}
  }, [selectedHeroPos])
*/}

  //When a name is provided by the user, the hero whose name is closest to the query is selected/FIND THE BEST MATCH
  useEffect(() => {
    let docs = filteredHeroes.filter((hero) => (hero.name.toLowerCase()).startsWith(query.toLowerCase()));
    console.log(docs);
    if (docs.length === 0)
    {
      docs = filteredHeroes.filter((hero) => (hero.name.toLowerCase()).includes(query.toLowerCase()));
      console.log(docs);
    }
    if (docs.length === 0)
    {
      return;
    }

    //Find the index of the item
    let pos = filteredHeroes.findIndex((hero) => docs[0]._id === hero._id);
    
    if (pos >= 0)
      setSelectedHeroPos(pos);
  }, [query])

  //When the filters are updated, then get all the heroes that pass each filter
  useEffect(() => {
    let h = heroes;
    filters.forEach((f) => {
      h = h.filter(hero => f(hero));
    })

    secondaryFilters.forEach((sf) => {
      h = h.filter((hero) => sf.filter(hero));
    })

    setFilteredHeroes(sortHeroes(h));
    setSelectedHeroPos(0);
    
  }, [filters, secondaryFilters])

  useEffect(() => {
    //setSelectedHeroPos(0);
    console.log("Loaded")
  }, [isLoading])

  useEffect(() => {
    setFilteredHeroes(sortHeroes(filteredHeroes));
  }, [orderBy, ascending])

//#endregion 
  
return (
    <div className="App">
      <div className="hero_card_page">
        <FiltersBar 
          setAttribute={setFilter} 
          addSecondaryFilter={addSecondaryFilter}
          delSecondaryFilter={removeSecondaryFilter} 
          setOrderBy={setOrderBy} 
          getLimit={(l) => setListLimit(l)} 
          setAscending={setAscending} 
          secondaryFilters={secondaryFilters}
          setQuery={setQuery}
          />
        
        <div id="hero_tape_container">
          {/*The CardList will take the array of heroes that are to be displayed, as well as methods for changing what those heroes are*/}
          {/*<CardList heroes={filteredHeroes.slice(0, listLimit)} pos={selectedHeroPos} adjustPos={shiftPos} isLoading={isLoading} setIsLoading={setIsLoading} />*/}
          <CardList heroes={heroDecque} pos={selectedHeroPos} adjustPos={shiftPos} isLoading={isLoading} setIsLoading={setIsLoading} />
        </div>
      </div>
    </div>
  );
}

export default App;