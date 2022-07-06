import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from 'react-router-dom'
import App from './App'
import PokemonDetails from './components/PokemonDetails'
import PokemonList from './components/PokemonList'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <App />
    <Router>
      <NavLink style={{ textDecoration: 'none' }} to="/">
        <h1 className="heading">Pokemon List</h1>
      </NavLink>
      <Routes>
        <Route path="/" element={<PokemonList />} />
        <Route path="/pokemon/:id" element={<PokemonDetails />} />
      </Routes>
    </Router>
  </React.StrictMode>,
)
