import { Threebox } from 'threebox-plugin';
import { setActiveInfo } from '@store/features/activeInfo/activeInfoSlice';
import { setShownInfo } from '../../store/features/shownInfo/shownInfoSlice';

let date = new Date();
// const fixedDate = new Date(date.setHours(13, 0, 0, 0)); // Set hours to 1 PM (13:00)

export default function threed(startingPoint, map, animal, dispatch) {
    function onSelectedChange(e) {
        let selectedObject = e.detail.userData;
        console.log(selectedObject.id);
        dispatch(setActiveInfo(selectedObject.id));
        dispatch(setShownInfo())
    }
    
    map.on('style.load', () => {
        map.addLayer({
            id: 'custom-threebox-model',
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
                const scale = 3.2;
                const options = {
                    obj: `models/${animal.model}`,
                    type: 'gltf',
                    scale: { x: scale, y: scale, z: 2.7 },
                    units: 'meters',
                    rotation: { x: 90, y: -90, z: 0 },
                    anchor: 'center',
                    id: animal.id || 'test'
                };

                window.tb.loadObj(options, (model) => {
                    let s = model.setCoords([...animal.coords, 487]);
                    model.setRotation({ x: 0, y: 0, z: 241 });
                    model.addTooltip(animal.title, true);
                    model.castShadow = true;
                    s.addEventListener('SelectedChange', onSelectedChange, false);
                    window.tb.add(model);
                });
            },

            render: function () {
                window.tb.setSunlight(date, startingPoint.center);
                window.tb.update();
            }
        });
    });
}
