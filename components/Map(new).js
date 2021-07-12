import React from 'react'
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-markercluster'
import 'react-leaflet-markercluster/dist/styles.min.css'

const Map = ({ productsToDisplay, coordinates }) => {
  /* const createClusterCustomIcon = (cluster) => {
    const count = cluster.getChildCount()
    let size = 'LargeXL'

    if (count < 10) {
      size = 'Small'
    } else if (count >= 10 && count < 100) {
      size = 'Medium'
    } else if (count >= 100 && count < 500) {
      size = 'Large'
    }
    const options = {
      cluster: `markerCluster${size}`,
    }

    return L.divIcon({
      html: `<div>
              <span class="markerClusterLabel">${count}</span>
            </div>`,
      className: `${options.cluster} cluster-marker`,
    })
  } */
  return (
    <div>
      <MapContainer
        className='markercluster-map'
        center={[51.0, 19.0]}
        zoom={4}
        maxZoom={18}
        style={{ height: '400px' }}
      >
        <TileLayer
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />

        <MarkerClusterGroup
          showCoverageOnHover={false}
          /* iconCreateFunction={createClusterCustomIcon} */
        >
          <Marker position={[49.8397, 24.0297]} />
          <Marker position={[52.2297, 21.0122]} />
          <Marker position={[51.5074, -0.0901]} />
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  )
}

export default Map

/* // src/pages/map.js
import React, { useState, useEffect, useRef } from "react"
import AddLocate from "../lib/add-locate"
import GetVisibleMarkers from "../lib/get-visible-markers"
import UpdateMapPosition from "../lib/update-map-position"
//... more imports

const Map = () => {
  // REFS
  //...groupRef and clusterRef

  // STATE
  //...geoJsonKey, displayedMarkers, visibleMarkers

  // FUNCTIONS
  //...createPopups, createClusters, useEffect

  // Some other stuff that is not relevant

  return (
    <>
      //more above here
      {useHasMounted && (
        <MapContainer
          center={[51.072806, -114.11918]}
          zoom={10}
          style={{ height: "400px" }}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <FeatureGroup ref={groupRef} name="Homes">
            <MarkerClusterGroup ref={clusterRef}>
              <GeoJSON
                data={displayedMarkers}
                key={geoJsonKey}
                onEachFeature={createPopups}
              />
            </MarkerClusterGroup>
          </FeatureGroup>
          <UpdateMapPosition
            geoJsonKey={geoJsonKey}
            groupRef={groupRef}
            displayedMarkers={displayedMarkers}
          />
          <GetVisibleMarkers
            geoJsonKey={geoJsonKey}
            groupRef={groupRef}
            clusterRef={clusterRef}
            setVisibleMarkers={setVisibleMarkers}
          />
          <AddLocate />
        </MapContainer>
      )}
      //more below here
    </>
  )
}

export default Map */
