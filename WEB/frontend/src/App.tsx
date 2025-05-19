import './MainStyles.scss'
import MainPage from './Main/MainPage'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import SigninPage from './Authorization/SigninPage'
import SignupPage from './Authorization/SignupPage'
import PlayPage from './Play/PlayPage'
import ProfilePage from './Profile/Profile'
import NotFoundPage from './NotFoundPage'
import { Provider } from 'react-redux'
import { Store } from './Store'
import { StoreFetch } from './StoreFetch'

function App() {
  

  return (
    <Provider store={Store}>
      <StoreFetch />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <MainPage /> } />
          <Route path='/signin' element={ <SigninPage /> } />
          <Route path='/signup' element={ <SignupPage /> } />
          <Route path='/play' element={ <PlayPage /> } />
          <Route path='/profile' element={ <ProfilePage /> } />
          <Route path='/*' element={ <NotFoundPage /> } />
        </Routes>
        {/* <ResponsiveDrawer /> */}
      </BrowserRouter>
    </Provider>
  )
}

export default App
