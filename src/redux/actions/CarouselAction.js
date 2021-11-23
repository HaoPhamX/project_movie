import { quanLyPhimService } from '../../services/QuanLyPhimService'
import { SET_CAROUSEL } from '../types/CarouselType/CarouselType'

export const getCarouselAction = () => {
    return async (dispatch) => {
        try {
            const { data } = await quanLyPhimService.layDanhSachBanner()

            dispatch({
                type: SET_CAROUSEL,
                arrBanner: data.content
            })

        } catch (err) {
            console.log('errors', err)
        }
    }
}
