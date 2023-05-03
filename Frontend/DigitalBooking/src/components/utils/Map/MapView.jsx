import React,{useContext,useEffect} from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import  { LocationIcon } from './LocationIcon.jsx'
import 'leaflet/dist/leaflet.css'
import { ProductContex } from '../../../context/ProductContex.jsx'

const MapView = () => {

    const {selectedData} =  useContext(ProductContex);
                
    return (
            <div>
                { selectedData.latitud && (  <MapContainer center={[selectedData?.latitud, selectedData?.longitud]} zoom={13}>
                <TileLayer 
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
                    attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'/>
                <Marker position={[selectedData?.latitud, selectedData?.longitud]} icon={LocationIcon}>
                    <Popup>
                        {selectedData?.nombre}.
                    </Popup>
                </Marker>
            </MapContainer> )}
            </div>
    )
}

export default MapView