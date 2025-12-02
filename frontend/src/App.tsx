import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import './App.css'
import Navbar from './components/layout/navbar'
import Map from './components/map/map'
import Footer from './components/layout/footer'

function App() {
  return (
    <>
      <Navbar />
      <main id='map'>
        <Map />
      </main>
      <Footer />
    </>
  )
}

export default App
