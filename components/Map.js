import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import 'leaflet-defaulticon-compatibility'
import { useState } from 'react'
import { data } from 'autoprefixer/node_modules/browserslist'

const Map = ({ productsToDisplay }) => {
  const [activeMarker, setActiveMarker] = useState(null)

  /* const LocationMarker = () => {
    const [position, setPosition] = useState(null)
    const map = useMapEvents({
      click() {
        map.locate()
      },
      locationfound(e) {
        setPosition(e.latlng)
        map.flyTo(e.latlng, map.getZoom())
      },
    })

    return position === null ? null : (
      <Marker position={position}>
        <Popup>You are here</Popup>
      </Marker>
    )
  } */

  return (
    <div id='mapid' className='w-screen z-0'>
      <MapContainer
        center={[59.8680023, 17.6825141]}
        zoom={10}
        scrollWheelZoom={false}
        style={{ height: '400px', width: '100%', zIndex: '0' }}
      >
        <TileLayer
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          attribution='Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
        />
        {productsToDisplay.map((item) => (
          <Marker
            key={item._id}
            position={[item.coordinates.lat, item.coordinates.lng]}
            eventHandlers={{
              click: (e) => {
                console.log(e)
                console.log(item)
                setActiveMarker(item)
              },
            }}
          />
        ))}

        {activeMarker && (
          <Popup
            position={[
              activeMarker.coordinates.lat,
              activeMarker.coordinates.lng,
            ]}
          >
            <div>
              <h1>hej</h1>
            </div>
          </Popup>
        )}
        {/* <LocationMarker /> */}
      </MapContainer>
    </div>
  )
}

/* https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=MY_ACCESS_TOKEN */

export default Map
