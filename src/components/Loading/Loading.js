import React from 'react'
import { useSelector } from 'react-redux'
import './Loading.css'

export default function Loading() {

    const { isLoading } = useSelector(state => state.LoadingReducer)


    return (
        <>
            {(isLoading)
                ?
                <div className='loading'>
                    <div className='loading-overlay' ></div>
                </div >
                :
                ''
            }
        </>
    )
}
