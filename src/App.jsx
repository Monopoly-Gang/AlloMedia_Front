import { Routes, Route } from 'react-router-dom'
import { routes } from './router/routes'
import NotFound from './pages/404'
import Navbar from './components/layout/Interface/Header'
import Footer from './components/layout/Interface/Footer'

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
          <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
