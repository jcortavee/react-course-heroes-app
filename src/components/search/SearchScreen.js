import React, { useMemo } from 'react'
import queryString from 'query-string'
import { useLocation } from 'react-router';
import { useForm } from '../../hooks/useForm';
import { HeroeCard } from '../heroes/HeroeCard';
import { getHeroesByName } from '../../selectors/getHeroesByName';

export const SearchScreen = ({ history }) => {

    const location = useLocation();
    const { q = '' } = queryString.parse(location.search);
    
    const [formValues, handleInputChange] = useForm({search: q});
    const { search } = formValues;
    
    const getHeroesByNameMemo = useMemo(() => getHeroesByName(q), [q])
    const heroesFiltered = getHeroesByNameMemo;
    
    const handleSearch = (e) => {
        e.preventDefault();
        history.push(`?q=${search}`)
    }

    return (
        <div>
            <h1>Search</h1>
            <hr />

            <div className='row'>
                <div className='col-5'>
                    <h4>Search Form</h4>
                    <hr />

                    <form>
                        <input type='text'
                            value={search}
                            name='search'
                            placeholder='Find your hero'
                            autoComplete='off'
                            onChange={handleInputChange}
                            className='form-control' />

                        <button type='submit'
                            onClick={(e) => handleSearch(e)}
                            className='btn m-1 btn-block btn-outline-primary'>Search</button>    
                    </form>
                </div>
                <div className='col-7'>
                    <h4>Results</h4>
                    <hr />

                    { (q === '') && <div className='alert alert-info'>
                        Search a hero
                    </div>}

                    {
                        (q !== '') && heroesFiltered.length == 0 && <div className='alert alert-danger'>
                            There is no result for {search}
                        </div>
                    }

                    {
                        heroesFiltered && heroesFiltered.map(heroe => (
                            <HeroeCard key={heroe.id}
                                {...heroe} />
                        ))
                    }
                </div>

            </div>
        </div>
    )
}
