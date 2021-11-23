import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SET_OPEN_MODAL } from '../../redux/types/ModalVideoType/ModalVideoType'
import './ModalVideo.css'

export default function ModalVideo() {

    const { isOpenModal, url } = useSelector(state => state.ModalVideoReducer)

    const dispatch = useDispatch()


    return (
        <>
            {/* onClick={() => { setState(!state) }} */}
            <div onClick={() => { dispatch({ type: SET_OPEN_MODAL }) }} className={`fixed z-10 inset-0 overflow-y-auto modalvideo ${isOpenModal ? 'modalVideo' : 'modalvideoHide'} transition duration-300`}>
                <div className="relative sm:block flex items-end justify-center min-h-screen text-center">
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen">​</span>
                    <div className="inline-block align-bottom rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle w-auto">
                        {isOpenModal ? <iframe width="885" height="498" src={url} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> : ''}
                    </div>
                    <div className="absolute close flex items-center justify-center" onClick={() => { dispatch({ type: SET_OPEN_MODAL }) }} >
                        <span onClick={() => { dispatch({ type: SET_OPEN_MODAL }) }}>X</span>
                    </div>
                </div>
            </div>
        </>
    )
}
