

    ymaps.ready(init);
    function init(){
        const myMap = new ymaps.Map("map", {
            center: [58.489223, 155.062709],          
            zoom: 4
            
        });
        myMap.behaviors.disable('scrollZoom');
    
//         plMarkCollection = new ymaps.GeoObjectCollection(null, {
//             preset: 'islands#blueIcon' }),

// //создание коллекции меток и  масштабирование при нажатии на метку
//         plMarksCoords =[[48.489223, 135.062709], [53.035004, 158.662000], [62.031828, 129.734945], [50.552464, 137.022528]];
//         for (let i = 0; i < plMarksCoords.length;  i++) {
//                 plMarkCollection.add(new ymaps.Placemark(plMarksCoords[i]));
//         };
//         myMap.geoObjects.add(plMarkCollection);
//         plMarkCollection.events
//         .add('mouseenter', function (e) {
//             e.get('target').options.set('preset', 'islands#greenIcon');
//         })
//         .add('mouseleave', function (e) {
//             e.get('target').options.unset('preset');
//         })
//         .add('click', function (e) {
//             coordNew = e.get('target').geometry.getCoordinates();
//             myMap.setZoom(15); 
//             myMap.setCenter(coordNew);
//         });


    /* поиск по своему списку*/     
        objectManager = new ymaps.ObjectManager({
            clusterize: true,
            gridSize: 32
        });
        myMap.geoObjects.add(objectManager);

        objectManager.add({
                "type": "FeatureCollection",
        "features":[
            {
                    "type": "Feature",
                    "id": 'Хабаровск',
                    "geometry":{
                        "type": "Point",
                        "coordinates":[48.489223, 135.062709]
                    },
                    
                },{
                    "type": "Feature",
                    "id": 'Петропавловск-Камчатский',
                    "geometry":{
                        "type": "Point",
                        "coordinates":[53.035004, 158.662000]
                    }
                    },
                    {
                    "type": "Feature",
                    "id": 'Якутск',
                    "geometry":{
                        "type": "Point",
                        "coordinates":[62.031828, 129.734945]
                    }
                    },
                    {
                    "type": "Feature",
                    "id": 'Комсомольск-на-Амуре',
                    "geometry":{
                        "type": "Point",
                        "coordinates":[50.552464, 137.022528]
                    }
                    }
                    ]
            });

                function viewObject(objectId){
    // Удаляем со всего списка класс active затем добавляем к выбранному
                for (let object of document.querySelectorAll('[data-objectId]')) {
                    object.classList.remove('active');
                }
                document.querySelector('[data-objectId="'+objectId+'"]').classList.add('active');

                // Выделяем все метки в синий
                objectManager.objects.each(function (item) {
                    objectManager.objects.setObjectOptions(item.id, {
                        preset: 'islands#blueIcon'
                    });
                });

                // Центруем по метке
                myMap.setCenter(objectManager.objects.getById(objectId).geometry.coordinates, 15, {
                    checkZoomRange: true
                });
            }
            objectManager.objects.events.add('click', function (e) {
                var objectId=e.get('objectId');
                viewObject(objectId);
            });
            //Клик в списке
            [].forEach.call(document.querySelectorAll('[data-objectId]'), function(el) {
                el.addEventListener('click', function() {
                    let objectId=el.getAttribute("data-objectId");
                    viewObject(objectId);
                });
            });

            const srchCt = document.querySelector('.search__city-name');
            const srchBtn = document.querySelector('.search__city-btn');
            const myArr = document.querySelectorAll('.cities-name');
            
            

            srchBtn.addEventListener('click', function() {
                for (let i=0; i<myArr.length; i++){
                    if (myArr[i].innerHTML.includes(srchCt.value) & srchCt.value !== "") {
                        myMap.setZoom(15); 
                        myMap.setCenter(objectManager.objects.getById(myArr[i].innerHTML).geometry.coordinates, 15, {
                                checkZoomRange: true });
                        for (let object of document.querySelectorAll('[data-objectId]')) {
                            object.classList.add('hidden');                            
                            document.querySelector('[data-objectId="'+srchCt.value+'"]').classList.remove('hidden');
                            }
                    
                            console.log(myArr[i].innerHTML);
                            console.log(srchCt.value);
                        }}
                    if (srchCt.value === "") {
                    console.log('пусто');
                    myMap.setZoom(4);
                    myMap.setCenter([58.489223, 155.062709]);
                    for (let object of document.querySelectorAll('[data-objectId]')) {
                            object.classList.remove('hidden');}
                    }
                
                });


        /*свой список подсказок*/
        ymaps.ready(int);
        function int() {
            
            var arr = [
                "Хабаровск",
                "Петропавловск-Камчатский",
                "Якутск",
                "Комсомольск-на-Амуре"
                ];
        var find = function (arr, find) {
                return arr.filter(function (value) {
                    return (value + "").toLowerCase().indexOf(find.toLowerCase()) != -1;
                });
            };

        var myProvider = {
            suggest: function (request, options) {
                var res = find(arr, request),
                    arrayResult = [],
                    results = Math.min(options.results, res.length);
                for (var i = 0; i < results; i++) {
                    arrayResult.push({displayName: res[i], value: res[i]})
                }
                return ymaps.vow.resolve(arrayResult);
            }
        }
        var suggestView = new ymaps.SuggestView('suggest', {provider: myProvider, results: 1});
                    }};