import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import { Icon, icon } from 'leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import 'leaflet-defaulticon-compatibility'
import { useEffect, useState } from 'react'
import MarkerClusterGroup from 'react-leaflet-markercluster'
import 'react-leaflet-markercluster/dist/styles.min.css'
import { Button } from './Button'
import { addToCart, deleteItem } from '../store/Actions'
import Link from 'next/link'
import { useContext } from 'react'
import { DataContext } from '../store/GlobalState'

import { AiOutlineMail, AiOutlinePhone } from 'react-icons/ai'
import { HiHeart, HiOutlineHeart } from 'react-icons/hi'

const Map = ({ productsToDisplay }) => {
  /* const [activeMarker, setActiveMarker] = useState(null) */
  const [center, setCenter] = useState([62.597203, 16.491682])
  const [zoom, setZoom] = useState(4)

  const { state, dispatch } = useContext(DataContext)
  const { cart, auth } = state

  const icon = new Icon({
    iconUrl: '/icons/marker_icon.svg',
    iconSize: [35, 35],
  })

  /* const printer = ({item}) => {
    if (item !== undefined) {
      return(
        <>
          <h1>{item._id}</h1>
        </>
      )
    }
    else{
      return(
        <h1>hej där, inga items</h1>
      )
    }
  } */

  const checkCart = ({ item }) => {
    let isAdded = false

    const check = cart.every((product) => {
      return product._id !== item._id
    })

    if (!check) {
      isAdded = true
    }

    if (isAdded === false) {
      return (
        <Button
          className='w-min p-2 h-8'
          primary='true'
          onClick={() => dispatch(addToCart(item, cart))}
        >
          <HiOutlineHeart className='text-xl p-0' />
        </Button>
      )
    }
    if (isAdded === true) {
      return (
        <Button
          className='w-min p-2 h-8'
          primary='true'
          onClick={() => dispatch(deleteItem(cart, item._id, 'ADD_CART'))}
        >
          <HiHeart className='text-xl p-0' />
        </Button>
      )
    }
  }

  /* function Bounds({ coordinates }) {
    const map = useMap()
    useEffect(() => {
      if (!map) return

      map.fitBounds(coordinates)
    }, [map, coordinates])
    return null
  } */

  return (
    <div id='mapid' className='w-full z-0 mt-4'>
      <MapContainer
        /* whenCreated={map => OpenStreetMapProvider(map)} */
        /* bounds={coordinates} */
        /* boundsOptions={{ padding: [500, 500] }} */
        className='markercluster-map'
        center={center}
        zoom={zoom}
        scrollWheelZoom={false}
        tap={false}
        style={{ height: '500px', width: '100%', zIndex: '0' }}
      >
        <TileLayer
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          /* url='https://api.mapbox.com/styles/v1/andreasalfven95/ckqy4vrv903uk18pat6xg6g6p/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiYW5kcmVhc2FsZnZlbjk1IiwiYSI6ImNrcjF1d3poYTBiYWIydnB0dmR5cG8yMTEifQ.RxPDeo0ikm1qPahM4C-UaA'
          attribution='&copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors, Imagery &copy; <a href=&quot;https://www.mapbox.com/&quot;>Mapbox</a>' */
        />

        <MarkerClusterGroup showCoverageOnHover={false}>
          {productsToDisplay.map((item) => (
            <Marker
              key={item._id}
              position={[item.coordinates.lat, item.coordinates.lng]}
              /* eventHandlers={{
                click: (e) => {
                  setActiveMarker(item)
                },
              }} */
              icon={icon}
            >
              <Popup maxWidth={200}>
                <div className='flex flex-col'>
                  <div className='border-b mb-2'>
                    <h2 className='capitalize text-base font-bold'>
                      {item.title}
                    </h2>
                  </div>
                  <div className=''>
                    <img
                      className='block max-h-32 md:max-w-sm mx-auto md:m-0'
                      layout='fill'
                      src={item.images[0].url}
                      alt={item.images[0].url}
                    ></img>
                  </div>
                  <div className='mt-2 mb-1 border-b border-t py-1'>
                    {item.description}
                  </div>

                  {item.email && (
                    <div className='flex items-center mb-1'>
                      <div className='w-min self-start text-beige-normal inline-block mr-4 mt-1'>
                        <AiOutlineMail></AiOutlineMail>
                      </div>
                      <a
                        className='hover:underline'
                        href={`mailto:${item.email}`}
                      >
                        {item.email}
                      </a>
                    </div>
                  )}

                  {item.phone && (
                    <div className='flex items-center mb-1'>
                      <div className='w-min self-start text-beige-normal inline-block mr-4 mt-1'>
                        <AiOutlinePhone></AiOutlinePhone>
                      </div>
                      <a className='hover:underline' href={`tel:${item.phone}`}>
                        {item.phone}
                      </a>
                    </div>
                  )}

                  <div className='flex justify-end border-t pt-1'>
                    <Link href={`/product/${item._id}`} passHref>
                      <Button primary='true' className='mr-2 p-2 w-min h-8'>
                        Läs mer...
                      </Button>
                    </Link>

                    {checkCart({ item })}
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>

        {/* <Bounds coordinates={coordinates} /> */}

        {/* {activeMarker && (
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
        )} */}
      </MapContainer>
    </div>
  )
}

/* https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=MY_ACCESS_TOKEN */
/* url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' */
/* url='https://api.mapbox.com/styles/v1/andreasalfven95/ckqy4vrv903uk18pat6xg6g6p/wmts?access_token=pk.eyJ1IjoiYW5kcmVhc2FsZnZlbjk1IiwiYSI6ImNrcXc5MGFtZTA1Y2Uyb254cTk3NmN1ZGYifQ.Ry17nPv_BUMEruIhrCJ6_Q' */

export default Map
