import './App.css';
import { useEffect, useState } from 'react'

import CardList from './Components/CardList';
import FiltersBar from './Components/FiltersBar';

const heroesPerDecque = 7;
const beginningSize = parseInt(heroesPerDecque/2+1)
const totalCardWidth = 358;


function App() {
  const[heroes, setHeroes] = useState([])
  const[filteredHeroes, setFilteredHeroes] = useState([])
  //Position of the currently selected hero in the heroes array
  const[selectedHeroPos, setSelectedHeroPos] = useState(0)
  const[isLoading, setIsLoading] = useState(true)
  const[query, setQuery] = useState("")
  const[filters, setFilters] = useState([])
  const[orderBy, setOrderBy] = useState("name");
  const[listLimit, setListLimit] = useState(122);
  const[ascending, setAscending] = useState(1);
  const[secondaryFilters, setSecondaryFilters] = useState([])

  const[heroDecque, setHeroDecque] = useState([])

//#region Functions

    const incrementPos = async (i) => {
        if (i > 0) {
            if (selectedHeroPos < filteredHeroes.length - 1) {
                //MOVE RIGHT
                if (filteredHeroes.length < beginningSize) {
                    setSelectedHeroPos(selectedHeroPos + 1)
                }
                //GROW RIGHT
                else if (heroDecque[0] === 0 && heroDecque.length < heroesPerDecque) {
                    setHeroDecque([...heroDecque, heroDecque[heroDecque.length - 1] + 1]);
                    console.log('Grow Right')
                    setSelectedHeroPos(selectedHeroPos + 1)
                }
                //SHRINK RIGHT
                else if (heroDecque[heroDecque.length - 1] === filteredHeroes.length - 1 && heroDecque.length > beginningSize) {
                    setHeroDecque(heroDecque.slice(1));
                    console.log('Shrink Right')
                    //setSelectedHeroPos(selectedHeroPos + 1)
                }
                //SHIFT RIGHT
                else if (heroDecque.length === heroesPerDecque) {
                    setHeroDecque([...heroDecque.slice(1), heroDecque[heroDecque.length - 1] + 1]);
                    console.log('Shift Right')
                }

                
                //setSelectedHeroPos(selectedHeroPos + 1)
            }
        }
        else if (i < 0) {
            if (selectedHeroPos > 0) {
                //MOVE LEFT
                if (filteredHeroes.length < beginningSize) {
                    setSelectedHeroPos(selectedHeroPos - 1);
                }
                //GROW LEFT
                else if (heroDecque[heroDecque.length-1] === filteredHeroes.length-1) {
                    setHeroDecque([heroDecque[0] - 1, ...heroDecque])
                    console.log('Grow Left')
                    //setSelectedHeroPos(selectedHeroPos - 1)
                }
                //SHRINK LEFT
                else if (heroDecque[0] === 0 && heroDecque.length > beginningSize) {
                    setHeroDecque(heroDecque.slice(0, heroDecque.length - 1))
                    console.log('Shrink Left')
                    setSelectedHeroPos(selectedHeroPos - 1)
                }
                //SHIFT LEFT
                else if (heroDecque.length === heroesPerDecque) {
                    setHeroDecque([heroDecque[0] - 1, ...heroDecque.slice(0, heroDecque.length - 1)])
                    console.log('Shift Left')
                    
                }


                //setSelectedHeroPos(selectedHeroPos - 1)
                
            }
        }
    }
  //Take a value and find the difference between it and the currently selected position. Use the difference to determine movement.
    const shiftPos = (i) => {
        let pos = heroDecque[i];
        setPos(pos);
 
  }

    //Take a specific position of the filteredHeroes array and use it as the pivot of the heroDecque
    const setPos = (i) => {
        let half = beginningSize - 1;
        let pos = i;
        console.log('pos: ' + pos);
        //if (pos === selectedHeroPos)
        //     return;

        //In case we are only incrementing, then use the incrementPos function
        let a = i - selectedHeroPos
        if (Math.abs(a) === 1) {
            incrementPos(a);
            return;
        }

        //To move, create both halves of the decque and join them together
        let half1 = [], half2 = [];
        for (let j = pos - 1; j >= pos - half && j >= 0; j--) {
            half1.unshift(j);
        }

        for (let j = pos + 1; j <= pos + half && j < filteredHeroes.length; j++) {
            half2.push(j);
        }

        setHeroDecque([...half1, pos, ...half2])
        setSelectedHeroPos(half1.length)
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
        let size = filteredHeroes.length < beginningSize ? filteredHeroes.length : beginningSize;
        let a = new Array(size);
        for (let i = 0; i < size; i++)
            a[i] = i;

        setHeroDecque(a)

    }, [filteredHeroes])

    useEffect(() => {
       
        
    }, [heroDecque])


  //When a name is provided by the user, the hero whose name is closest to the query is selected/FIND THE BEST MATCH
    //To work with the heroDecque, the found hero is placed in the middle of the decque, and the heroes in the immediate viscinity will fill in the rest
    //EXCEPTION: There are not enough heroes to fill the heroDecque.
        //In this case, fill in the heroDecque as much as possible with heroes, and resort to using NULL values when none are available

    //TODO: Rewrite this effect to work with the decque system
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
    
      if (pos >= 0) {
          setPos(pos);
      }
  }, [query])

    useEffect(() => {
        console.log('selectedHeroPos: ' + selectedHeroPos)
    }, [selectedHeroPos])
  //When the filters are updated, then get all the heroes that pass each filter
    //TODO: Update to work with the decque system
    //When the filters change, the heroDecque will need to be updated along with filteredHeroes
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
                <CardList heroes={filteredHeroes.slice(heroDecque[0], heroDecque[heroDecque.length - 1] + 1)} pos={selectedHeroPos} adjustPos={incrementPos} shiftPos={shiftPos }isLoading={isLoading} setIsLoading={setIsLoading} />
        </div>
      </div>
    </div>
  );
}

export default App;