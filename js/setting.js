$(document).ready(function () {
    var interactedData = {
        'BodyColour': '#4a266d',
        'ArmsColour': '#FFFFFF',
        'ArmsType': 0,
        'FeetColour': '#79c366',
        'Head-ItemsColour': '#79c366',
        'Head-ItemsType': 0,
        'FacesColour': '#fadd4b',
        'FacesType': 0,
        'MouthColour': '#79c366',
        'MouthType': 0,
        'EyesColour': '#000000',
        'EyesType': 0
    };

    var colorArr = ['#000000', '#ffffff', '#9e9f9f', '#595a5b', '#fbfe00', '#ffe400', '#c38000', '#704a01', '#ffa200',
        '#ff6000', '#ff0000', '#b20000', '#640000', '#de00ff', '#9323a4', '#39bbff', '#0012ff', '#012259', '#00ea11',
        '#24ad4e', '#006720', '#00a6d0', '#ff9ce7', '#ff53d5', '#dc00c0', '#fd008f'];

    var settings = function () {
        var colorBtn = document.createElement("button");

        for (var i = 0; i < colorArr.length; i++) {
            var headColorBtn = colorBtn.cloneNode(true);
            document.getElementById('head-setting').appendChild(headColorBtn);
            headColorBtn.style.cssText = 'background:' + colorArr[i] + ';width:30px;height:30px; margin:2px;border:solid 2px white;border-radius: 50%';
            headColorBtn.setAttribute('class', 'headColor');
            headColorBtn.setAttribute('data-color', colorArr[i]);

            var armColorBtn = colorBtn.cloneNode(true);
            document.getElementById('arm-setting').appendChild(armColorBtn);
            armColorBtn.style.cssText = 'background:' + colorArr[i] + ';width:30px;height:30px; margin:2px;border:solid 2px white;border-radius: 50%';
            armColorBtn.setAttribute('class', 'armColor');
            armColorBtn.setAttribute('data-color', colorArr[i]);

            var bodyColorBtn = colorBtn.cloneNode(true);
            document.getElementById('body-setting').appendChild(bodyColorBtn);
            bodyColorBtn.style.cssText = 'background:' + colorArr[i] + ';width:30px;height:30px; margin:2px;border:solid 2px white;border-radius: 50%';
            bodyColorBtn.setAttribute('class', 'bodyColor');
            bodyColorBtn.setAttribute('data-color', colorArr[i]);

            var footColorBtn = colorBtn.cloneNode(true);
            document.getElementById('foot-setting').appendChild(footColorBtn);
            footColorBtn.style.cssText = 'background:' + colorArr[i] + ';width:30px;height:30px; margin:2px;border:solid 2px white;border-radius: 50%';
            footColorBtn.setAttribute('class', 'footColor');
            footColorBtn.setAttribute('data-color', colorArr[i]);
        }
    }

    settings();

    $('#setting-area button').click(function () {
        // var key = $(this).attr('class');
        // var color = $(this).attr('data-color');
        //
        // interactedData[key] = color;
        //
        // var jsonStr = JSON.stringify(interactedData);
        //
        // $('#shared-data').attr('data-interactiveconfig', jsonStr);

        update3D(interactedData);
    });
});




