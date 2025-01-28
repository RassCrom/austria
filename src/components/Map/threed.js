import { Threebox } from 'threebox-plugin';

function onSelectedChange(e) {
    let selectedObject = e.detail;
    // let selectedValue = selectedObject.selected;
    console.log('nice: ', selectedObject)
}

let date = new Date();
// const fixedDate = new Date(date.setHours(13, 0, 0, 0)); // Set hours to 1 PM (13:00)

export default function threed(startingPoint, map, ) {
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
                    obj: 'models/palace.glb',
                    type: 'gltf',
                    scale: { x: scale, y: scale, z: 2.7 },
                    units: 'meters',
                    rotation: { x: 90, y: -90, z: 0 }
                };

                window.tb.loadObj(options, (model) => {
                    let s = model.setCoords([...startingPoint.center, 487]);
                    model.setRotation({ x: 0, y: 0, z: 241 });
                    model.addTooltip("Kabanbay Batyr mausoleum", true);
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
