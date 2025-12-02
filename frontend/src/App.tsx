import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import './App.css'
import Navbar from './components/layout/navbar'
import SearchBar from './components/layout/searchBar'
import Map from './components/map/map'
import Footer from './components/layout/footer'

function App() {
  return (
    <>
      <Navbar />
      <main id='map'>
        <SearchBar />
        <Map />
      </main>
      <Footer />
    </>
  )
}

export default App
