import { Threebox } from 'threebox-plugin';
import { setActiveInfo, setShownInfo } from '@store/features/activeInfo/activeInfoSlice';

let date = new Date();
const fixedDate = new Date(date.setHours(13, 0, 0, 0)); // Set hours to 1 PM (13:00)


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
            const scale = 3.2; //1 3.2
            const options = {
                obj: `models/${animal.model}`,
                type: 'gltf',
                scale: { x: scale, y: scale, z: 2.7 }, //1 2.7
                units: 'meters',
                rotation: { x: 90, y: -90, z: 0 },
                anchor: 'center',
                id: animal.id
            };

            window.tb.loadObj(options, (model) => {
                model.setCoords([...animal.coords, 0]); //487
                model.setRotation({ x: 0, y: 0, z: 241 });
                model.addTooltip(animal.title, true);
                model.castShadow = true;
                model.addEventListener('SelectedChange', (e) => {
                    onSelected(e, animal)
                }, false);
                window.tb.add(model);
            });
        },

        render: function () {
            window.tb.setSunlight(fixedDate, startingPoint.center);
            window.tb.update();
        }
    });
}

export default function threed(startingPoint, map, animals, dispatch, isSideShown) {
    let loadedModels = [];

    function onSelectedChange(e, obj) {
        let selectedObject = e.detail.userData;
        dispatch(setActiveInfo(selectedObject.id));
        dispatch(setShownInfo(true))
        console.log(selectedObject.id);
        console.log(isSideShown);
        console.log(`audios/${obj.sound}`)
        const audio = new Audio(`audios/${obj.sound}`); 
        audio.preload = 'auto'; 
        audio.volume = 0.3;
        audio.play();
    }

    function remove3DObjects() {
        loadedModels.forEach(id => {
            if (map.getLayer(id)) {
                map.removeLayer(id);
            }
        });
        loadedModels = [];
    }
    
    map.once('style.load', () => {
        remove3DObjects();

        animals.forEach(animal => {
            if (!map.getLayer(animal.id)) {
                add3dObject(animal, startingPoint, map, onSelectedChange);
                loadedModels.push(animal.id);
            }
        });
    });
}

