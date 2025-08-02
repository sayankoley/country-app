export const SearchFilter=({search, setSearch, filter, setfilter,apiData,setData})=>{
    const handleFilter=(e)=>{
        e.preventDefault();
         setfilter(e.target.value);
    }
    const sortCountries=(val)=>{
     const sortCount=[...apiData].sort((a,b)=>{
         return  val ==="asc" ? a.name.common.localeCompare(b.name.common) : b.name.common.localeCompare(a.name.common)
      })
  setData(sortCount);

    }
    return(

        <>
         <section className="section-searchFilter container">
      <div>
        <input
          type="text"
          placeholder="search"
          value={search}
          onChange={(e)=>{
              e.preventDefault();
            setSearch(e.target.value)
          }
        }
          
        />
      </div>

       <div>
        <button onClick={() => sortCountries("asc")}>Asc</button>
      </div>

      <div>
        <button onClick={() => sortCountries("des")}>Desc</button>
      </div> 

      
      <div>
        <select
          className="select-section"
          value={filter} onChange={handleFilter}
        
        >
          <option value="all">All</option>
          <option value="Africa">Africa</option>
          <option value="Americas">Americas</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
      </div>
    </section>
        </>
    )

}