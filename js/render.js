var canvas;
var engine;
var scene;

var materialBody;
var materialArms;
var materialFeet;
var materialHorn;
var materialFaces;
var materialMouth;
var materialEyes;


var init = function () {

    canvas = document.getElementById("renderCanvas");
    engine = new BABYLON.Engine(canvas, true);

    scene = new BABYLON.Scene(engine);
    // Set scene background color
    scene.clearColor = new BABYLON.Color4(0, 0, 0, 0.0000000000000001);

    //Create a light
    var light = new BABYLON.PointLight("Omni", new BABYLON.Vector3(-60, 60, 80), scene);

    //Create an Arc Rotate Camera - aimed negative z this time
    var camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, 1.0, 110, BABYLON.Vector3.Zero(), scene);
    //var camera = new BABYLON.FreeCamera("Camera", BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);

    //Create materials
    materialBody = new BABYLON.StandardMaterial("texture1", scene);
    materialArms = new BABYLON.StandardMaterial("texture2", scene);
    materialFeet = new BABYLON.StandardMaterial("texture3", scene);
    materialHorn = new BABYLON.StandardMaterial("texture4", scene);
    materialFaces = new BABYLON.StandardMaterial("texture5", scene);
    materialMouth = new BABYLON.StandardMaterial("texture6", scene);
    materialEyes = new BABYLON.StandardMaterial("texture6", scene);
};

initModels = function () {
    BABYLON.SceneLoader.ImportMesh("", "models/", "body_full.babylon", scene, function (meshes) {
        for (var i = 0; i < meshes.length; i++) {
            if (i == 1 || i == 2) continue;
            meshes[i].scaling = new BABYLON.Vector3(0.5, 0.5, 0.5);
            meshes[i].material = materialBody;
        }
    });

    BABYLON.SceneLoader.ImportMesh("", "models/", "arms.babylon", scene, function (meshes) {
        for (var i = 0; i < meshes.length; i++) {
            meshes[i].scaling = new BABYLON.Vector3(0.5, 0.5, 0.5);
            meshes[i].material = materialArms;
        }
    });

    BABYLON.SceneLoader.ImportMesh("", "models/", "feet.babylon", scene, function (meshes) {
        for (var i = 0; i < meshes.length; i++) {
            meshes[i].scaling = new BABYLON.Vector3(0.5, 0.5, 0.5);
            meshes[i].material = materialFeet;
        }
    });

    BABYLON.SceneLoader.ImportMesh("", "models/", "horn.babylon", scene, function (meshes) {
        for (var i = 0; i < meshes.length; i++) {
            meshes[i].material = materialFeet;
        }
        meshes[0].scaling = new BABYLON.Vector3(0.5, 0.5, 0.5);
    });

    BABYLON.SceneLoader.ImportMesh("", "models/", "face.babylon", scene, function (meshes) {
        var m = meshes[0];
        m.scaling = new BABYLON.Vector3(0.5, 0.5, 0.5);
        m.material = materialFaces;
    });

    BABYLON.SceneLoader.ImportMesh("", "models/", "mouth.babylon", scene, function (meshes) {
        var m = meshes[0];
        m.scaling = new BABYLON.Vector3(0.5, 0.5, 0.5);
        m.material = materialMouth;
    });

    BABYLON.SceneLoader.ImportMesh("", "models/", "eye_brows.babylon", scene, function (meshes) {
        for (var i = 0; i < meshes.length; i++) {
            meshes[i].scaling = new BABYLON.Vector3(0.5, 0.5, 0.5);
            meshes[i].material = materialEyes;
        }
    });

    BABYLON.SceneLoader.ImportMesh("", "models/", "eye_whites.babylon", scene, function (meshes) {
        for (var i = 0; i < meshes.length; i++) {
            meshes[i].scaling = new BABYLON.Vector3(0.5, 0.5, 0.5);
            meshes[i].material = materialEyes;
        }
    });

    BABYLON.SceneLoader.ImportMesh("", "models/", "teeth.babylon", scene, function (meshes) {
        var m = meshes[0];
        m.scaling = new BABYLON.Vector3(0.5, 0.5, 0.5);
        m.material = materialMouth;
    });
}

var update3D = function (interactedData) {
    var jsonObj;

    if (!interactedData) {
        jsonObj = {
            'bodyColour': '#4a266d',
            'armsColour': '#FFFFFF',
            'armsType': 0,
            'feetColour': '#79c366',
            'hornColour': '#79c366',
            'hornType': 0,
            'facesColour': '#fadd4b',
            'facesType': 0,
            'mouthColour': '#79c366',
            'mouthType': 0,
            'eyesColour': '#000000',
            'eyesType': 0
        }
    } else {
        jsonObj = interactedData;
    }

    // change material color according to parameter
    materialBody.diffuseColor = new BABYLON.Color3.FromHexString(jsonObj.bodyColour);
    materialArms.diffuseColor = new BABYLON.Color3.FromHexString(jsonObj.armsColour);
    materialFeet.diffuseColor = new BABYLON.Color3.FromHexString(jsonObj.feetColour);
    materialHorn.diffuseColor = new BABYLON.Color3.FromHexString(jsonObj.hornColour);
    materialFaces.diffuseColor = new BABYLON.Color3.FromHexString(jsonObj.facesColour);
    materialMouth.diffuseColor = new BABYLON.Color3.FromHexString(jsonObj.mouthColour);
    materialEyes.diffuseColor = new BABYLON.Color3.FromHexString(jsonObj.eyesColour);
}

// Resize
window.addEventListener("resize", function () {
    engine.resize();
});

init();

initModels();

update3D();

engine.runRenderLoop(function () {
    scene.render();
});



