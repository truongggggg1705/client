import './App.css'
import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { authRouters, privateRoutes, publicRoutes } from './routes';
import { DefaultLayout } from './layouts/client/DefaultLayout';
import DefaultLayoutAdmin from './layouts/admin/DefaultLayoutAdmin';
import Page404 from './pages/pageError';
import { SocketProvider } from './context/SocketContext';

function App() {
  return (
    <SocketProvider>
      <div>
        <ToastContainer />
        <Router>
          <Routes>
            <Route path='*' element={<Page404 />} />
            {authRouters.map((route) => {
              return <Route key={route.path} path={route.path} element={<route.component />} />
            })}

            {
              publicRoutes.map((route) => {
                return <Route key={route.path} path={route.path} element={
                  <DefaultLayout>
                    <route.component />
                  </DefaultLayout>
                } />
              })
            }
            {
              localStorage.getItem('accessToken') && privateRoutes.map((route) => {
                return <Route key={route.path}
                  path={'/admin' + route.path}
                  element={
                    <DefaultLayoutAdmin>
                      <route.component />
                    </DefaultLayoutAdmin>
                  } />
              })
            }
          </Routes>
        </Router>
      </div>
    </SocketProvider>
  )
}

export default App
