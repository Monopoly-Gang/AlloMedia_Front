import { Routes, Route } from 'react-router-dom'
import { routes } from './router/routes'
import NotFound from './pages/404'

function App() {
  return (
    <>
      <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
          <Route path="*" element={<NotFound />} />
        </Routes>
    </>
  )
}

export default App
