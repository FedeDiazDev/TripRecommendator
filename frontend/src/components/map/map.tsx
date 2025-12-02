import { Map as LeafletMap } from "leaflet";
import { useEffect, useRef, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import SearchBar from "../layout/searchBar";
import { generateRecommendations, Recomendacion } from "../../services/AIServices.js";
import { Menu } from "lucide-react"; 

export default function Map() {

    const [showSearchBar, setShowSearchBar] = useState(true);
    const [isSearching, setIsSearching] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const mapRef = useRef<LeafletMap | null>(null);

    const [recommendations, setRecommendations] = useState<Recomendacion[] | null>(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const body = document.body;
        if (showSearchBar) body.classList.add("overflow-y-hidden");
        else body.classList.remove("overflow-y-hidden");
    }, [showSearchBar]);

    const handleSearch = async (term: string) => {
        if (!term.trim()) return;

        setIsSearching(true);
        setIsLoading(true);
        setError(null);
        setRecommendations(null);

        setTimeout(() => {
            setShowSearchBar(false);
        }, 700);

        try {
            const result = await generateRecommendations(term);
            if (result && Array.isArray(result.destinos)) {
                setRecommendations(result.destinos);
            } else if (Array.isArray(result)) {
                setRecommendations(result);
            } else {
                throw new Error("Formato de respuesta no válido");
            }
            setShowModal(true); 

        } catch (err: any) {
            console.error(err);
            setError(`Error: ${err.message}`);
            setShowSearchBar(true);
            setIsSearching(false);
        } finally {
            setIsLoading(false);
        }
    };

    const mapCenter: [number, number] = (recommendations && recommendations.length > 0)
        ? [recommendations[0].latitud, recommendations[0].longitud]
        : [40.4168, -3.7038];

    return (
        <div className="relative h-full w-full">
            <MapContainer
                center={mapCenter}
                zoom={recommendations ? 6 : 3}
                scrollWheelZoom={false}
                className={`h-[100%] w-[100%] transition-all ${showSearchBar ? 'z-0' : 'z-10'}`}
                id="map-container"
                ref={mapRef}
            >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                {recommendations && recommendations.map((rec: Recomendacion, index: number) => (
                    <Marker key={index} position={[rec.latitud, rec.longitud]}>
                        <Popup>
                            <div>
                                <h3 className="font-bold">{rec.nombre}</h3>
                                <p>{rec.descripcionCorta || rec.descripcion}</p>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>

            {showSearchBar && (
                <SearchBar
                    onSearch={handleSearch}
                    isSearching={isSearching}
                    isLoading={isLoading}
                />
            )}

            {!showSearchBar && !showModal && recommendations && (
                <button
                    onClick={() => setShowModal(true)}
                    className="absolute top-4 right-4 z-[50] bg-white text-black font-bold rounded-lg px-6 py-3 shadow-xl hover:scale-105 transition flex items-center gap-2"
                >
                   <Menu className="w-5 h-5"/> Ver Lista
                </button>
            )}

            {!showSearchBar && showModal && (
                <div className="absolute top-0 right-0 p-8 z-[50] text-white bg-black/80 backdrop-blur-md w-full md:w-1/3 h-full overflow-y-auto transition-transform duration-500">
                    <button
                        onClick={() => setShowModal(false)}
                        className="absolute top-4 right-4 z-[60] bg-white/10 text-white hover:bg-white/30 rounded-full w-10 h-10 flex items-center justify-center transition"
                    >
                        ✕
                    </button>

                    {isLoading && <p className="text-center mt-10">Explorando el mundo...</p>}
                    {error && <p className="text-red-400 font-bold">Error: {error}</p>}

                    {recommendations && (
                        <div className="space-y-6 mt-8">
                            <h2 className="text-3xl font-light mb-6">Destinos Sugeridos</h2>
                            {recommendations.map((rec: Recomendacion, index: number) => (
                                <div 
                                    key={index} 
                                    className="p-4 border-l-2 border-emerald-400 bg-white/5 hover:bg-white/10 transition rounded-r-lg cursor-pointer" 
                                    onClick={() => {
                                        if (mapRef.current) {
                                            mapRef.current.setView([rec.latitud, rec.longitud], 12, { animate: true });
                                        }
                                        setShowModal(false); 
                                    }} 
                                >
                                    <h3 className="text-xl font-bold text-emerald-300">{rec.nombre}</h3>
                                    {rec.categoria && <p className="text-xs uppercase tracking-widest text-white/60 mb-2">{rec.categoria}</p>}
                                    <p className="text-white/90 leading-relaxed">{rec.descripcionCorta || rec.descripcion}</p>
                                    <div className="flex gap-4 mt-3 text-xs text-white/40 font-mono">
                                        <span>Lat: {rec.latitud.toFixed(2)}</span>
                                        <span>Lon: {rec.longitud.toFixed(2)}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    <button
                        onClick={() => {
                            setShowSearchBar(true);
                            setIsSearching(false);
                            setRecommendations(null);
                            setShowModal(false);
                        }}
                        className="mt-8 w-full py-3 bg-white text-black font-bold rounded-full hover:scale-105 transition shadow-lg"
                    >
                        Nueva Búsqueda
                    </button>
                </div>
            )}
        </div>
    );
}