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
var materialWhite;

//test
var meshTask;
var assetsManager;

var init = function () {

    canvas = document.getElementById("renderCanvas");
    engine = new BABYLON.Engine(canvas, true);

    scene = new BABYLON.Scene(engine);
    // Set scene background color
    scene.clearColor = new BABYLON.Color4(0, 0, 0, 0.0000000000000001);

    //Create a light
    var light1 = new BABYLON.DirectionalLight("DirectionalLight1", new BABYLON.Vector3(60, 60, 60), scene);
    light1.specular = new BABYLON.Color3(0, 0, 0);

    var light2 = new BABYLON.DirectionalLight("DirectionalLight2", new BABYLON.Vector3(-60, -60, -60), scene);
    light2.specular = new BABYLON.Color3(0, 0, 0);

    //Create an Arc Rotate Camera - aimed negative z this time
    var camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI / 2, Math.PI * 0.5, 110, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);

    camera.lowerRadiusLimit = camera.upperRadiusLimit = 110;

    //Create materials
    materialBody = new BABYLON.StandardMaterial("texture1", scene);
    materialArms = new BABYLON.StandardMaterial("texture2", scene);
    materialFeet = new BABYLON.StandardMaterial("texture3", scene);
    materialHorn = new BABYLON.StandardMaterial("texture4", scene);
    materialFaces = new BABYLON.StandardMaterial("texture5", scene);
    materialMouth = new BABYLON.StandardMaterial("texture6", scene);
    materialEyes = new BABYLON.StandardMaterial("texture7", scene);
    materialWhite = new BABYLON.StandardMaterial("texture8", scene);
};

initModels = function () {
    var loadingFlag = [];

    for (var i = 0; i < 9; i++) {
        loadingFlag[i] = 0;
    }

    var parentObj = new BABYLON.Mesh.CreateBox("parentObj", 0.001, scene);
    parentObj.rotation.x = -Math.PI * 0.5;
    //test
    assetsManager = new BABYLON.AssetsManager(scene);

    bodyObj = assetsManager.addMeshTask("body", "", "models/", "body_full.babylon");
    hornObj = assetsManager.addMeshTask("horn", "", "models/", "horn.babylon");
    armsObj = assetsManager.addMeshTask("arms", "", "models/", "arms.babylon");
    feetObj = assetsManager.addMeshTask("feet", "", "models/", "feet.babylon");
    faceObj = assetsManager.addMeshTask("face", "", "models/", "face.babylon");
    mouthObj = assetsManager.addMeshTask("mouth", "", "models/", "mouth.babylon");
    eyeBrowsObj = assetsManager.addMeshTask("eyeBrows", "", "models/", "eye_brows.babylon");
    eyeWhitesObj = assetsManager.addMeshTask("eyeWhites", "", "models/", "eye_whites.babylon");
    teethObj = assetsManager.addMeshTask("teeth", "", "models/", "teeth.babylon");

    bodyObj.onSuccess = function (obj) {
        for (var i = 0; i < obj.loadedMeshes.length; i++) {
            if (i == 1 || i == 2) continue;
            obj.loadedMeshes[i].scaling = new BABYLON.Vector3(0.5, 0.5, 0.5);
            obj.loadedMeshes[i].material = materialBody;
            obj.loadedMeshes[i].parent = parentObj;
        }
    }

    hornObj.onSuccess = function (obj) {
        for (var i = 0; i < obj.loadedMeshes.length; i++) {
            obj.loadedMeshes[i].material = materialHorn;
        }
        obj.loadedMeshes[0].scaling = new BABYLON.Vector3(0.5, 0.5, 0.5);
        obj.loadedMeshes[0].parent = parentObj;
    }

    armsObj.onSuccess = function (obj) {
        for (var i = 0; i < obj.loadedMeshes.length; i++) {
            obj.loadedMeshes[i].scaling = new BABYLON.Vector3(0.5, 0.5, 0.5);
            obj.loadedMeshes[i].material = materialArms;
            obj.loadedMeshes[i].parent = parentObj;
        }
    }

    feetObj.onSuccess = function (obj) {
        for (var i = 0; i < obj.loadedMeshes.length; i++) {
            obj.loadedMeshes[i].scaling = new BABYLON.Vector3(0.5, 0.5, 0.5);
            obj.loadedMeshes[i].material = materialFeet;
            obj.loadedMeshes[i].parent = parentObj;
        }
    }

    faceObj.onSuccess = function (obj) {
        obj.loadedMeshes[0].scaling = new BABYLON.Vector3(0.5, 0.5, 0.5);
        obj.loadedMeshes[0].material = materialFaces;
        obj.loadedMeshes[0].parent = parentObj;
    }

    mouthObj.onSuccess = function (obj) {
        obj.loadedMeshes[0].scaling = new BABYLON.Vector3(0.5, 0.5, 0.5);
        obj.loadedMeshes[0].material = materialMouth;
        obj.loadedMeshes[0].parent = parentObj;
    }

    eyeBrowsObj.onSuccess = function (obj) {
        for (var i = 0; i < obj.loadedMeshes.length; i++) {
            obj.loadedMeshes[i].scaling = new BABYLON.Vector3(0.5, 0.5, 0.5);
            obj.loadedMeshes[i].material = materialEyes;
            obj.loadedMeshes[i].parent = parentObj;
        }
    }

    eyeWhitesObj.onSuccess = function (obj) {
        for (var i = 0; i < obj.loadedMeshes.length; i++) {
            obj.loadedMeshes[i].scaling = new BABYLON.Vector3(0.5, 0.5, 0.5);
            obj.loadedMeshes[i].material = materialWhite;
            obj.loadedMeshes[i].parent = parentObj;
        }
    }

    teethObj.onSuccess = function (obj) {
        for (var i = 0; i < obj.loadedMeshes.length; i++) {
            obj.loadedMeshes[i].scaling = new BABYLON.Vector3(0.5, 0.5, 0.5);
            obj.loadedMeshes[i].material = materialWhite;
            obj.loadedMeshes[i].parent = parentObj;
        }
    }

    // bottom ring
    var bottomRing = BABYLON.Mesh.CreateTorus("torus", 75, 0.1, 140, scene, false);
    bottomRing.addRotation(Math.PI / 2, 0, 0);
    bottomRing.position.z = -28.18;
    materialBottomRing = new BABYLON.StandardMaterial("texture9", scene);
    materialBottomRing.alpha = 1;
    bottomRing.material = materialBottomRing;
    bottomRing.parent = parentObj;

    //bottom plane
    var bottomPane = BABYLON.Mesh.CreateCylinder("cylinder", 0.1, 75, 75, 60, 1, scene, false);
    bottomPane.addRotation(Math.PI / 2, 0, 0);
    bottomPane.position.z = -28.18;
    materialBottomPane = new BABYLON.StandardMaterial("texture10", scene);
    materialBottomPane.alpha = 0.3;
    bottomPane.material = materialBottomPane;
    bottomPane.parent = parentObj;

    // GUI
    var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

    var rect1 = new BABYLON.GUI.Rectangle();
    rect1.width = 0.2;
    rect1.height = "40px";
    rect1.cornerRadius = 0;
    rect1.color = "Orange";
    rect1.thickness = 0;
    rect1.background = "transparent";
    advancedTexture.addControl(rect1);
    rect1.linkWithMesh(bottomPane);
    rect1.linkOffsetY = -28

    var label = new BABYLON.GUI.TextBlock();
    label.text = "";
    rect1.addControl(label);

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
    materialWhite.diffuseColor = new BABYLON.Color3.FromHexString('#FFFFFF');
}

// Resize
window.addEventListener("resize", function () {
    engine.resize();
});

init();

initModels();

update3D();

assetsManager.onFinish = function (tasks) {
    engine.runRenderLoop(function () {
        scene.render();
    });
}

assetsManager.load();

