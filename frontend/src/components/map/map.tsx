import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import SearchBar from "../layout/searchBar";

import { generateRecommendations, Recomendacion } from "../../services/AIServices.js";

export default function Map() {

    const [showSearchBar, setShowSearchBar] = useState(true);
    const [isSearching, setIsSearching] = useState(false);


    const [isLoading, setIsLoading] = useState(false);
    const [recommendations, setRecommendations] = useState<{ destinos: Recomendacion[] } | null>(null);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        const body = document.body;
        if (showSearchBar) body.classList.add("overflow-y-hidden");
        else body.classList.remove("overflow-y-hidden");
    }, [showSearchBar]);


    const handleSearch = async (term: string) => {
        if (!term.trim()) return;

        console.log("Buscando:", term);
        setIsSearching(true);
        setIsLoading(true);
        setError(null);
        setRecommendations(null);


        setTimeout(() => {
            setShowSearchBar(false);
        }, 700);

        try {
            // Llamada al servicio
            const result = await generateRecommendations(term);
            setRecommendations(result.destinos);
            console.log("Recomendaciones recibidas:", result.destinos);
        } catch (err: Error | any) {
            console.error("Error en la búsqueda:", err);
            setError(`Error al obtener recomendaciones: ${err.message}`);
            // Si hay un error, quizás quieras volver a mostrar la barra
            setShowSearchBar(true);
            setIsSearching(false);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="relative h-full w-full">
            <MapContainer
                center={
                    recommendations?.[0]
                        ? [recommendations[0].latitud, recommendations[0].longitud]
                        : [40.4168, -3.7038]
                }

                // center={[40.4168, -3.7038]}
                zoom={3}
                scrollWheelZoom={false}
                className="h-[100%] w-[100%] z-0"
                id="map-container"
            >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {recommendations && (
                    <>
                        {recommendations.map((rec: Recomendacion, index: number) => (
                            <Marker key={index} position={[rec.latitud, rec.longitud]}>
                                <Popup>
                                    <div>
                                        <h3 className="font-bold">{rec.nombre}</h3>
                                        <p>{rec.descripcionCorta}</p>
                                    </div>
                                </Popup>
                            </Marker>
                        ))}
                    </>
                )}
            </MapContainer>

            {showSearchBar && (
                <SearchBar
                    onSearch={handleSearch}
                    isSearching={isSearching}
                    isLoading={isLoading}
                />
            )}
            {/*             
            {!showSearchBar && (
                <div className="absolute top-0 left-0 p-8 z- text-white bg-black/50 w-full md:w-1/3 max-h-full overflow-y-auto">
                    {isLoading && <p>Cargando recomendaciones...</p>}
                    {error && <p className="text-red-500">Error: {error}</p>}

                    {recommendations && (
                        <div>
                            <h2 className="text-3xl font-bold mb-4">{recommendations.ciudad}</h2>
                            <p className="mb-6 italic">{recommendations.notaFinal}</p>
                        {recommendations.map((rec : Recomendacion, index : number) => (
                                <div key={index} className="mb-4 p-3 border-l-4 border-blue-400 bg-white/5 rounded-r-lg">
                                    <h3 className="text-xl font-semibold">{rec.nombre}</h3>
                                    <p className="text-sm text-blue-300">{rec.categoria}</p>
                                    <p className="mt-1">{rec.descripcionCorta}</p>
                                    <p className="text-xs mt-2 text-white/50">
                                        Lat: {rec.latitud}, Lon: {rec.longitud}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                    
                    <button 
                        onClick={() => {
                            setShowSearchBar(true);
                            setIsSearching(false);
                            setRecommendations(null);
                        }} 
                        className="mt-6 p-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition"
                    >
                        Volver a Buscar
                    </button>
                </div>
            )} */}
        </div>
    );
}