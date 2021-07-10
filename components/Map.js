import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import { Icon, icon } from 'leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import 'leaflet-defaulticon-compatibility'
import { useEffect, useState } from 'react'

const Map = ({ productsToDisplay, coordinates }) => {
  const [activeMarker, setActiveMarker] = useState(null)
  const [center, setCenter] = useState([59.8680023, 17.6825141])
  const [zoom, setZoom] = useState(10)

  const icon = new Icon({
    iconUrl: '',
    iconSize: [25, 25],
  })

  function Bounds({ coordinates }) {
    const map = useMap()
    useEffect(() => {
      if (!map) return

      map.fitBounds(coordinates)
    }, [map, coordinates])
    return null
  }

  return (
    <div id='mapid' className='w-screen h-96 z-0 my-4'>
      <MapContainer
        bounds={coordinates}
        /* LatLngBounds={coordinates} */
        center={center}
        zoom={zoom}
        scrollWheelZoom={false}
        style={{ height: '100%', width: '100%', zIndex: '0' }}
      >
        <TileLayer
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          attribution='Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          /* , Imagery © <a href="https://www.mapbox.com/">Mapbox</a> */
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
            //icon={icon}
          />
        ))}

        <Bounds coordinates={coordinates} />

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
      </MapContainer>
    </div>
  )
}

/* https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=MY_ACCESS_TOKEN */
/* url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' */
/* url='https://api.mapbox.com/styles/v1/andreasalfven95/ckqy4vrv903uk18pat6xg6g6p/wmts?access_token=pk.eyJ1IjoiYW5kcmVhc2FsZnZlbjk1IiwiYSI6ImNrcXc5MGFtZTA1Y2Uyb254cTk3NmN1ZGYifQ.Ry17nPv_BUMEruIhrCJ6_Q' */

export default Map
