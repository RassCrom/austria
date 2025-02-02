import { Threebox } from 'threebox-plugin';
import { setActiveInfo, setShownInfo } from '@store/features/activeInfo/activeInfoSlice';

let date = new Date();
// const fixedDate = new Date(date.setHours(13, 0, 0, 0)); // Set hours to 1 PM (13:00)


function add3dObject(animal, startingPoint, map, onSelected) {
    map.addLayer({
        id: animal.id,
        type: 'custom',
        renderingMode: '3d',
        onAdd: function () {
            window.tb = new Threebox(
                map,
                map.getCanvas().getContext('webgl2'),
                {                
                    realSunlight: true,
                    sky: false,
                    enableSelectingObjects: true,
                    enableTooltips: true,
                }
            );
            const scale = 1;
            const options = {
                obj: `models/${animal.model}`,
                type: 'gltf',
                scale: { x: scale, y: scale, z: 1 },
                units: 'meters',
                rotation: { x: 90, y: -90, z: 0 },
                anchor: 'center',
                id: animal.id
            };

            window.tb.loadObj(options, (model) => {
                let s = model.setCoords([...animal.coords, 0]); //487
                model.setRotation({ x: 0, y: 0, z: 241 });
                model.addTooltip(animal.title, true);
                model.castShadow = true;
                s.addEventListener('SelectedChange', onSelected, false);
                window.tb.add(model);
            });
        },

        render: function () {
            window.tb.setSunlight(date, startingPoint.center);
            window.tb.update();
        }
    });
}

export default function threed(startingPoint, map, animals, dispatch, isSideShown) {
    function onSelectedChange(e) {
        let selectedObject = e.detail.userData;
        dispatch(setActiveInfo(selectedObject.id));
        dispatch(setShownInfo(true))
        // console.log(selectedObject.id);
        console.log(isSideShown);
    }
    
    map.once('style.load', () => {
        animals.forEach(animal => {
            if (!map.getLayer(animal.id)) {
                add3dObject(animal, startingPoint, map, onSelectedChange);
            }
        });
    });
    
}

