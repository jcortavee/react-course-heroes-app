import React from 'react'
import { HeroesList } from '../heroes/HeroesList';

export const DcScreen = () => {
    const publisher = 'DC Comics';

    return (
        <div>
            <h1>DC</h1>
            <hr />

            <HeroesList publisher={publisher} />
        </div>
    )
}
