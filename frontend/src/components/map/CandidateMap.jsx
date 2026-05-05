import React, { useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Tooltip, useMap } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import L from 'leaflet';
import CandidatePopup from './CandidatePopup';
import { Box } from '@mui/material';

// Fix for default marker icons in Leaflet + React
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Custom Marker Creator
const createCustomIcon = (color) => {
  return L.divIcon({
    className: 'custom-div-icon',
    html: `<div style="background-color: ${color};" class="custom-marker"><div><svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg></div></div>`,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40]
  });
};

// Component to handle map view updates
const MapUpdater = ({ center, zoom }) => {
  const map = useMap();
  
  useEffect(() => {
    // Crucial for fixing "grey area" issues after initial load
    setTimeout(() => {
      map.invalidateSize();
    }, 100);
  }, [map]);

  useEffect(() => {
    if (center) {
      map.setView(center, zoom || 12, { animate: true });
    } else {
      // Always reset to India if center is null/reset
      map.setView([20.5937, 78.9629], 5, { animate: true });
    }
  }, [center, zoom, map]);
  
  return null;
};

const INDIA_BOUNDS = [
  [6.4626999, 68.1097], // South West
  [35.513327, 97.395358] // North East
];

const CandidateMap = ({ candidates, parties, center, onCompare }) => {
  const partyColorMap = useMemo(() => {
    const map = {};
    parties.forEach(p => {
      map[p.name] = p.color;
    });
    return map;
  }, [parties]);

  return (
    <Box sx={{ width: '100%', height: '100%', position: 'relative' }}>
      <MapContainer
        center={center || [20.5937, 78.9629]}
        zoom={5}
        minZoom={3}
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          noWrap={true}
        />
        
        <MapUpdater center={center} zoom={center ? 12 : 5} />

        <MarkerClusterGroup
          chunkedLoading
          showCoverageOnHover={false}
          iconCreateFunction={(cluster) => {
            return L.divIcon({
              html: `<div class="marker-cluster-custom"><span>${cluster.getChildCount()}</span></div>`,
              className: 'marker-cluster-container',
              iconSize: L.point(40, 40)
            });
          }}
        >
          {candidates.map((candidate) => {
            const color = partyColorMap[candidate.party] || '#666';
            return (
              <Marker
                key={candidate.id}
                position={[candidate.location.lat, candidate.location.lng]}
                icon={createCustomIcon(color)}
              >
                <Tooltip direction="top" offset={[0, -40]} opacity={1}>
                  <Box sx={{ fontWeight: 600 }}>{candidate.name}</Box>
                  <Box sx={{ fontSize: '0.75rem', color: 'text.secondary' }}>{candidate.party}</Box>
                </Tooltip>
                <Popup maxWidth={300}>
                  <CandidatePopup candidate={candidate} onCompare={onCompare} />
                </Popup>
              </Marker>
            );
          })}
        </MarkerClusterGroup>
      </MapContainer>
    </Box>
  );
};

export default CandidateMap;
