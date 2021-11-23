import { combineReducers, applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import { CarouselReducer } from './reducers/CarouselReducer';
import { LoadingReducer } from './reducers/LoadingReducer';
import { ModalVideoReducer } from './reducers/ModalVideoReducer';
import { QuanLyDatVeReducer } from './reducers/QuanLyDatVeReducer';
import { QuanLyNguoiDungReducer } from './reducers/QuanLyNguoiDungReducer';
import { QuanLyPhimReducer } from './reducers/QuanLyPhimReducer';
import { QuanLyRapReducer } from './reducers/QuanLyRapReducer';

const rootReducer = combineReducers({
    CarouselReducer,
    QuanLyPhimReducer,
    QuanLyRapReducer,
    QuanLyNguoiDungReducer,
    QuanLyDatVeReducer,
    LoadingReducer,
    ModalVideoReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk));





