import DeckGL from '@deck.gl/react';
import {IconLayer} from '@deck.gl/layers';

const MapDeck = () => {
    const iconData = [
        {position: [-122.4, 37.8], size: 500, name: 'Icon 1'},
        {position: [-122.42, 37.81], size: 300, name: 'Icon 2'},
        {position: [-122.41, 37.82], size: 400, name: 'Icon 3'}
    ];
    
    // IconLayer for rendering 3D icons
    const iconLayer = new IconLayer({
        id: 'IconLayer',
        data: 'https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/bart-stations.json',
        // getColor: d => [Math.sqrt(d.exits), 140, 0],
        getIcon: d => 'marker',
        getPosition: d => d.coordinates,
        getSize: 60,
        iconAtlas: 'https://raw.githubusercontent.com/RassCrom/austria-deck-data/refs/heads/main/Group%202.png',
        iconMapping: {
            marker: {x: 0, y: 0, width: 221, height: 360, anchorY: 512}
        }, // Matching icon mapping
        pickable: true
    });

  return (
    <DeckGL
      initialViewState={{
        longitude: -122.4,
        latitude: 37.8,
        zoom: 10,
        pitch: 45, // Add pitch for a 3D perspective
        bearing: 0
      }}
      controller={true}
      getTooltip={({object}) => object && object.name}
      layers={[iconLayer]}
    >

    </DeckGL>
  );
};

export default MapDeck;




