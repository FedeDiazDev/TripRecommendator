import { MapContainer, TileLayer } from 'react-leaflet'

export default function Map() {
    return (
        <MapContainer center={[40.4168, -3.7038]} zoom={10} scrollWheelZoom={false} className="h-[100%] w-[100%]">
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
        </MapContainer>
    );
}