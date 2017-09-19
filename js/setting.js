$(document).ready(function () {
    var interactedData = {
        'bodyColour': '#4a266d',
        'bodyType': 0,
        'armsColour': '#FFFFFF',
        'armsType': 1,
        'feetColour': '#79c366',
        'hornColour': '#79c366',
        'hornType': 0,
        'facesColour': '#fadd4b',
        'facesType': 0,
        'mouthColour': '#FF0000',
        'mouthType': 0,
        'eyesColour': '#FFFFFF',
        'eyesType': 0
    };

    var armsType = 0;

    var setColors = function() {
        armsType = (armsType + 1) % 2;
        interactedData.bodyColour = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
        interactedData.armsColour = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
        interactedData.feetColour = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
        interactedData.hornColour = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
        interactedData.facesColour = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
        interactedData.mouthColour = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
        interactedData.eyesColour = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
        interactedData.armsType = armsType;
    }

    $('#setting-area button').click(function () {
        setColors();
        update3D(interactedData);
    });
});




