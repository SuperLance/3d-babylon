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
        'mouthColour': '#FF0000',
        'mouthType': 0,
        'eyesColour': '#FFFFFF',
        'eyeBrowColour': '#000000',
        'eyesType': 0
    };

    var armsType = 0;
    var bodyType = 0;
    var hornType = 0;
    var mouthType = 0;
    var teethType = 0;
    var eyesType = 0;

    var setColors = function() {
        armsType = (armsType + 1) % 3;
        bodyType = (bodyType + 1) % 3;
        hornType = (hornType + 1) % 4;
        mouthType = Math.floor(Math.random() * 10) % 3;
        teethType = (teethType + 1) % 2;
        eyesType = Math.floor(Math.random() * 10) % 3;
        interactedData.bodyColour = '#c8102e';//'#'+(Math.random()*0xFFFFFF<<0).toString(16);
        interactedData.armsColour = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
        interactedData.feetColour = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
        interactedData.hornColour = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
        interactedData.facesColour = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
        interactedData.mouthColour = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
        interactedData.eyesColour = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
        interactedData.eyeBrowColour = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
        interactedData.hornType = hornType;
        interactedData.bodyType = bodyType;
        interactedData.armsType = armsType;
        interactedData.mouthType = mouthType;
        interactedData.teethType = teethType;
        interactedData.eyesType = eyesType;
    }

    $('#setting-area button').click(function () {
        setColors();
        update3D(interactedData);
    });
});




