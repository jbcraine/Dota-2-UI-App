import './App.css';
import { useEffect, useState } from 'react'

import CardList from './Components/CardList';
import FiltersBar from './Components/FiltersBar';

const heroesPerDecque = 13;
const beginningSize = parseInt(heroesPerDecque/2+1)

function App() {
  const[heroes, setHeroes] = useState([])
  const [filteredHeroes, setFilteredHeroes] = useState([])
  const [limitedFilteredHeroes, setLimitedFilteredHeroes] = useState([])
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
        if (i > 0 && selectedHeroPos < limitedFilteredHeroes.length) {
            //MOVE RIGHT
            //if (((limitedFilteredHeroes.length < beginningSize) || (limitedFilteredHeroes.length > beginningSize && limitedFilteredHeroes.length < heroesPerDecque))) {
            if ((limitedFilteredHeroes.length < beginningSize || (limitedFilteredHeroes.length >= beginningSize && limitedFilteredHeroes.length <= heroesPerDecque)) && selectedHeroPos !== limitedFilteredHeroes.length - 1) {
                setSelectedHeroPos(selectedHeroPos => selectedHeroPos + 1)
            }

            //GROW RIGHT
            else if (heroDecque[0] === 0 && heroDecque.length < heroesPerDecque && heroDecque[heroDecque.length - 1] !== limitedFilteredHeroes.length - 1) {
                setHeroDecque(heroDecque => [...heroDecque, heroDecque[heroDecque.length - 1] + 1]);
                setSelectedHeroPos(selectedHeroPos => selectedHeroPos + 1)
            }
            //SHRINK RIGHT
            else if (heroDecque[heroDecque.length - 1] === limitedFilteredHeroes.length - 1 && heroDecque.length > beginningSize && heroDecque[0] != 0) {
                setHeroDecque(heroDecque => heroDecque.slice(1));
            }
            //SHIFT RIGHT
            else if (heroDecque.length === heroesPerDecque && (limitedFilteredHeroes.length > heroesPerDecque || (heroDecque[0] !== selectedHeroPos && heroDecque[heroDecque.length - 1] !== selectedHeroPos))) {
                setHeroDecque(heroDecque => [...heroDecque.slice(1), heroDecque[heroDecque.length - 1] + 1]);
            }
        }
        else if (i < 0 && selectedHeroPos > 0) {
            //MOVE LEFT
            //if (limitedFilteredHeroes.length <= beginningSize || (limitedFilteredHeroes.length >= beginningSize && limitedFilteredHeroes.length <= heroesPerDecque)) {
            if ((limitedFilteredHeroes.length < beginningSize || (limitedFilteredHeroes.length >= beginningSize && limitedFilteredHeroes.length <= heroesPerDecque)) && selectedHeroPos !== 0) {
                setSelectedHeroPos(selectedHeroPos => selectedHeroPos - 1);
            }
            //GROW LEFT
            else if (heroDecque[heroDecque.length - 1] === limitedFilteredHeroes.length - 1 && heroDecque.length < heroesPerDecque && heroDecque[0] != 0) {
                setHeroDecque([heroDecque[0] - 1, ...heroDecque])
                
            }
            //SHRINK LEFT
            else if (heroDecque[0] === 0 && heroDecque.length > beginningSize && heroDecque[heroDecque.length - 1] != limitedFilteredHeroes.length - 1) {
                setHeroDecque(heroDecque => heroDecque.slice(0, heroDecque.length - 1))
                setSelectedHeroPos(selectedHeroPos => selectedHeroPos - 1)
            }
            //SHIFT LEFT
            else if (heroDecque.length === heroesPerDecque) {
                setHeroDecque(heroDecque => [heroDecque[0] - 1, ...heroDecque.slice(0, heroDecque.length - 1)])
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

        //In case we are only incrementing, then use the incrementPos function
        /*
        let a = i - selectedHeroPos
        if (Math.abs(a) === 1) {
            incrementPos(a);
            return;
        }
        */

        if (limitedFilteredHeroes.length <= heroesPerDecque) {
            setSelectedHeroPos(i)
        }
        else if (limitedFilteredHeroes.length > heroesPerDecque) {
            //To move, create both halves of the decque and join them together
            let half1 = [], half2 = [];
            for (let j = pos - 1; j >= pos - half && j >= 0; j--) {
                half1.unshift(j);
            }

            for (let j = pos + 1; j <= pos + half && j < limitedFilteredHeroes.length; j++) {
                half2.push(j);
            }

            setHeroDecque([...half1, pos, ...half2])
            setSelectedHeroPos(half1.length)
        }
    }


  const addFilter = (s) => {
    setFilters([...filters, s]);
  }

  const removeFilter = (s) => {
    setFilters(filters.filter(f => f.name !== s.name))
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
      setSecondaryFilters([...secondaryFilters, secondaryFilter])
    }
  }

  const removeSecondaryFilter = (id) => {
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

  const scroll = (event) => {
    event.preventDefault();
  }

  
//#endregion
//#region Effects


  //On start, get all heroes from the database
  useEffect(() => {
    const fetchHeroes = async () => {

      const result = await fetch('https://us-central1-dota-2-hero-api.cloudfunctions.net/app ', {
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
        setLimitedFilteredHeroes(filteredHeroes.slice(0, listLimit));
    }, [filteredHeroes])

    useEffect(() => {
        let size = limitedFilteredHeroes.length <= heroesPerDecque ? limitedFilteredHeroes.length : beginningSize;
        //let size = limitedFilteredHeroes.length < beginningSize ? limitedFilteredHeroes.length : beginningSize;
        let a = new Array(size);
        for (let i = 0; i < size; i++)
            a[i] = i;

        setHeroDecque(a)
        setSelectedHeroPos(0);
    }, [limitedFilteredHeroes])


  //When a name is provided by the user, the hero whose name is closest to the query is selected/FIND THE BEST MATCH
    //To work with the heroDecque, the found hero is placed in the middle of the decque, and the heroes in the immediate viscinity will fill in the rest
    //EXCEPTION: There are not enough heroes to fill the heroDecque.
        //In this case, fill in the heroDecque as much as possible with heroes, and resort to using NULL values when none are available

    //TODO: Rewrite this effect to work with the decque system
  useEffect(() => {
    let docs = filteredHeroes.filter((hero) => (hero.name.toLowerCase()).startsWith(query.toLowerCase()));
    if (docs.length === 0)
    {
      docs = filteredHeroes.filter((hero) => (hero.name.toLowerCase()).includes(query.toLowerCase()));
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

  //When the filters are updated, then get all the heroes that pass each filter
    //When the filters change, the heroDecque will need to be updated along with filteredHeroes
  useEffect(() => {
    let h = heroes;
    filters.forEach((f) => {
      h = h.filter(hero => f.f(hero));
    })

    secondaryFilters.forEach((sf) => {
      h = h.filter((hero) => sf.filter(hero));
    })

    setFilteredHeroes(sortHeroes(h));
    setSelectedHeroPos(0);
    
  }, [filters, secondaryFilters])

    useEffect(() => {
        setLimitedFilteredHeroes(filteredHeroes.slice(0, listLimit))
    }, [listLimit])

  useEffect(() => {
    //setSelectedHeroPos(0);
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
                <CardList 
                  heroes={limitedFilteredHeroes.slice(heroDecque[0], heroDecque[heroDecque.length - 1] + 1)} 
                  pos={selectedHeroPos} 
                  adjustPos={incrementPos} 
                  shiftPos={shiftPos}
                  isLoading={isLoading} 
                  setIsLoading={setIsLoading}
                />
        </div>
      </div>
    </div>
  );
}

export default App;