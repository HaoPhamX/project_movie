import { SET_OPEN_MODAL } from "../types/ModalVideoType/ModalVideoType"

const initialState = {
    isOpenModal: false,
    url: ''
}

export const ModalVideoReducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_OPEN_MODAL: {
            console.log(state.isOpenModal)
            return { ...state, isOpenModal: !state.isOpenModal, url: action.url }
        }


        default:
            return state
    }
}
