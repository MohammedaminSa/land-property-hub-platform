import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Properties from './pages/Properties'
import PropertyDetails from './pages/PropertyDetails'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import CreateProperty from './pages/CreateProperty'
import PrivateRoute from './components/PrivateRoute'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="properties" element={<Properties />} />
        <Route path="properties/:id" element={<PropertyDetails />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        
        {/* Protected Routes */}
        <Route path="dashboard/*" element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        } />
        <Route path="properties/new" element={
          <PrivateRoute>
            <CreateProperty />
          </PrivateRoute>
        } />
      </Route>
    </Routes>
  )
}

export default App