// import React, { Suspense, lazy } from 'react'
import React, { Suspense, useEffect } from 'react'
import { createBrowserHistory } from 'history'
import { Router, Switch } from 'react-router'
import Homtemplate from './templates/HomeTemplate/Homtemplate'
import Home from './pages/Home/Home'
import Contact from './pages/Contact/Contact'
import News from './pages/News/News'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import Detail from './pages/Detail/Detail'
import CheckOutTeamplate from './templates/CheckOutTeamplate/CheckOutTeamplate'
import CheckOut from './pages/CheckOut/CheckOut'
import UserTemplate from './templates/UserTemplate/UserTemplate'
import Loading from './components/Loading/Loading'
import Profile from './pages/Profile/Profile'
import AdminTemplate from './templates/AdminTemplate/AdminTemplate'
import Films from './pages/Admin/Films/Films'
import ShowTime from './pages/Admin/Films/ShowTime/ShowTime'
import DashBoard from './pages/Admin/DashBoard/DashBoard'
import AddNew from './pages/Admin/Films/AddNew/AddNew'
import Edit from './pages/Admin/Films/Edit/Edit'
import ModalVideo from './components/Modal/ModalVideo'
import XuLyNghiepVuUser from './pages/Admin/DashBoard/XuLyNghiepVuUser'
import { USER_EDIT } from './util/settings/config'

// const CheckOutTemplate = lazy(() => import('./templates/CheckOutTeamplate/CheckOutTeamplate'))

export const history = createBrowserHistory()



export default function App() {

  useEffect(() => {
    localStorage.removeItem(USER_EDIT)
  })

  return (
    <Suspense fallback="loading">
      <Router history={history}>
        <Loading />
        <ModalVideo />
        <Switch>
          <Homtemplate exact path="/home" Component={Home} />
          <Homtemplate exact path="/contact" Component={Contact} />
          <Homtemplate exact path="/news" Component={News} />
          <Homtemplate exact path="/detail/:id" Component={Detail} />
          <Homtemplate exact path="/profile" Component={Profile} />
          <UserTemplate exact path="/login" Component={Login} />
          <UserTemplate exact path="/register" Component={Register} />
          <CheckOutTeamplate exact path="/checkout/:id" Component={CheckOut} />
          <AdminTemplate exact path="/admin" Component={DashBoard} />
          <AdminTemplate exact path="/admin/flims" Component={Films} />
          <AdminTemplate exact path="/admin/flims/addnew" Component={AddNew} />
          <AdminTemplate exact path="/admin/films/edit/:id" Component={Edit} />
          <AdminTemplate exact path="/admin/films/showtime/:id" Component={ShowTime} />
          <AdminTemplate exact path="/admin/users" Component={DashBoard} />
          <AdminTemplate exact path="/admin/users/adduser" Component={XuLyNghiepVuUser} />
          <AdminTemplate exact path="/admin/users/edituser/:taiKhoan" Component={XuLyNghiepVuUser} />
          <Homtemplate exact path="/" Component={Home} />
          <Homtemplate exact path="*" Component={Home} />
          {/* <Suspense fallback={<h1>Loading ...</h1>}>
          <CheckOutTemplate exact path="/checkout/:id" Component={CheckOut} />
        </Suspense> */}
        </Switch>
      </Router>
    </Suspense>
  )
}
