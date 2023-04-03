window.onload = () => {
    const button = document.querySelector('button[data-action="change"]');
    button.innerText = ' ? ';

    let places = staticLoadPlaces();
    renderPlaces(places);
};

function staticLoadPlaces() {
    return [
        {
            name: 'Objetos',
            location: {
                lat: -8.1111717,
                lng: -34.9994433
            },
        },
    ];
}

var models = [
    {
        url: 'https://rawcdn.githack.com/DiogenesMatias/AR/a01d60996dee4af928f213e743683fd53b82d326/assets/magnemite/scene.gltf',
        scale: '0.5 0.5 0.5',
        info: 'Magnemite, Lv. 5, HP 10/10',
        rotation: '0 180 0',
    },
    {
        url: 'https://rawcdn.githack.com/DiogenesMatias/AR/3eeda73dc9e4baa3de48a95bcd88f440ec6d7841/assets/dragao/scene.gltf',
        scale: '0.2 0.2 0.2',
        rotation: '0 180 0',
        info: 'Dragao 01',
    },
    {
        url: 'https://rawcdn.githack.com/DiogenesMatias/AR/3427cccb9167bb672a655f6b6a8a962c6334515a/assets/cabeca/scene.gltf',
        scale: '0.08 0.08 0.08',
        rotation: '0 180 0',
        info: 'Cabeca animada',
    },
    {
        url: 'https://rawcdn.githack.com/DiogenesMatias/AR/3427cccb9167bb672a655f6b6a8a962c6334515a/assets/dragao02/scene.gltf',
        scale: '0.08 0.08 0.08',
        rotation: '0 180 0',
        info: 'Dragao 02',
    },
];

var modelIndex = 0;
var setModel = function (model, entity) {
    if (model.scale) {
        entity.setAttribute('scale', model.scale);
    }

    if (model.rotation) {
        entity.setAttribute('rotation', model.rotation);
    }

    if (model.position) {
        entity.setAttribute('position', model.position);
    }

    entity.setAttribute('gltf-model', model.url);

    const div = document.querySelector('.instructions');
    div.innerText = model.info;
};

function renderPlaces(places) {
    let scene = document.querySelector('a-scene');

    places.forEach((place) => {
        let latitude = place.location.lat;
        let longitude = place.location.lng;

        let model = document.createElement('a-entity');
        model.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);

        setModel(models[modelIndex], model);

        model.setAttribute('animation-mixer', '');

        document.querySelector('button[data-action="change"]').addEventListener('click', function () {
            var entity = document.querySelector('[gps-entity-place]');
            modelIndex++;
            var newIndex = modelIndex % models.length;
            setModel(models[newIndex], entity);
        });

        scene.appendChild(model);
    });
}