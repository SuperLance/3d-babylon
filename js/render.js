var canvas = document.getElementById("renderCanvas");
var engine = new BABYLON.Engine(canvas, true);

var scene = new BABYLON.Scene(engine);
var materialBody = new BABYLON.StandardMaterial("texture1", scene);
var materialHead = new BABYLON.StandardMaterial("texture2", scene);

var materialArm_1 = new BABYLON.StandardMaterial("texture3", scene);
var materialArm_2 = new BABYLON.StandardMaterial("texture4", scene);
var materialFoot_1 = new BABYLON.StandardMaterial("texture5", scene);
var materialFoot_2 = new BABYLON.StandardMaterial("texture6", scene);


var createScene = function () {

    //Create a light
    var light = new BABYLON.PointLight("Omni", new BABYLON.Vector3(-60, 60, 80), scene);

    //Create an Arc Rotate Camera - aimed negative z this time
    var camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, 1.0, 110, BABYLON.Vector3.Zero(), scene);
    //var camera = new BABYLON.FreeCamera("Camera", BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);

    //Creation of 6 spheres
    var bodyObj = BABYLON.Mesh.CreateSphere("Sphere1", 10.0, 0.01, scene);
    var armObj_1 = BABYLON.Mesh.CreateSphere("Sphere2", 10.0, 0.01, scene);
    var armObj_2 = BABYLON.Mesh.CreateSphere("Sphere2", 10.0, 0.01, scene);
    var footObj_1 = BABYLON.Mesh.CreateSphere("Sphere3", 10.0, 0.01, scene);
    var footObj_2 = BABYLON.Mesh.CreateSphere("Sphere3", 10.0, 0.01, scene);
    var headObj = BABYLON.Mesh.CreateSphere("Sphere4", 10.0, 0.01, scene);

    //Position the spheres
    bodyObj.position.x = 0;
    headObj.position.x = 0;
    armObj_1.position.x = -10
    armObj_2.position.x = 10
    footObj_1.position.x = -5;
    footObj_2.position.x = 5;


    bodyObj.position.y = 15;
    headObj.position.y = 25;
    armObj_1.position.y = 20;
    armObj_2.position.y = 20;
    footObj_1.position.y = 5;
    footObj_2.position.y = 5;


    //Creation of a material with wireFrame
    materialBody.diffuseColor = new BABYLON.Color3(0, 1, 0); //Red

    //Creation of a red material with alpha
    materialArm_1.diffuseColor = new BABYLON.Color3(1, 0, 0);
    materialArm_2.diffuseColor = new BABYLON.Color3(1, 0, 0);

    //Creation of a material with an image texture
    materialFoot_1.diffuseColor = new BABYLON.Color3(0.1, 1, 1);
    materialFoot_2.diffuseColor = new BABYLON.Color3(0.1, 1, 1);

    //Creation of a material with translated texture
    materialHead.wireframe = true; //Red

    //Creation of a material with an alpha texture
    //Creation of a repeated textured material
    var materialPlane = new BABYLON.StandardMaterial("texturePlane", scene);
    materialPlane.diffuseTexture = new BABYLON.Texture("/textures/grass.jpg", scene);
    materialPlane.diffuseTexture.uScale = 5.0;//Repeat 5 times on the Vertical Axes
    materialPlane.diffuseTexture.vScale = 5.0;//Repeat 5 times on the Horizontal Axes
    materialPlane.backFaceCulling = false;//Always show the front and the back of an element

    //Apply the materials to meshes``
    bodyObj.material = materialBody;
    headObj.material = materialHead;
    armObj_1.material = materialArm_1;
    armObj_2.material = materialArm_2;
    footObj_1.material = materialFoot_1;
    footObj_2.material = materialFoot_2;

    // Set scene background color
    scene.clearColor = new BABYLON.Color4(0,0,0,0.0000000000000001);
};

createScene();

engine.runRenderLoop(function () {
    scene.render();
});

function initGame() {
    // Number of lanes
    var LANE_NUMBER = 3;
    // Space between lanes
    var LANE_INTERVAL = 5;
    var LANES_POSITIONS = [];

    // Function to create lanes
    var createLane = function (id, position) {
        var lane = BABYLON.Mesh.CreateBox("lane"+id, 1, scene);
        lane.scaling.y = 0.1;
        lane.scaling.x = 3;
        lane.scaling.z = 800;
        lane.position.x = position;
        lane.position.z = lane.scaling.z/2-200;
    };

    var createEnding = function (id, position) {
        var ending = BABYLON.Mesh.CreateGround(id, 3, 4, 1, scene);
        ending.position.x = position;
        ending.position.y = 0.1;
        ending.position.z = 1;
        var mat = new BABYLON.StandardMaterial("endingMat", scene);
        mat.diffuseColor = new BABYLON.Color3(0.8,0.2,0.2);
        ending.material = mat;
        return ending;
    };

    // The function ImportMesh will import our custom model in the scene given in parameter
    BABYLON.SceneLoader.ImportMesh("", "models/", "face.babylon", scene, function (meshes) {
        var m = meshes[0];
        m.scaling = new BABYLON.Vector3(0.5,0.5,0.5);
        m.material = materialHead;

    });

    BABYLON.SceneLoader.ImportMesh("", "models/", "body_full.babylon", scene, function (meshes) {

        for(var i = 0; i < meshes.length; i++) {
            if(i == 1 || i == 2) continue;
            meshes[i].scaling = new BABYLON.Vector3(0.5, 0.5, 0.5);
            meshes[i].material = materialArm_1;
        }
    });

    BABYLON.SceneLoader.ImportMesh("", "models/", "eye_brows.babylon", scene, function (meshes) {
        for(var i = 0; i < meshes.length; i++) {
            meshes[i].scaling = new BABYLON.Vector3(0.5, 0.5, 0.5);
            meshes[i].material = materialArm_1;
        }

    });

    BABYLON.SceneLoader.ImportMesh("", "models/", "eye_whites.babylon", scene, function (meshes) {
        for(var i = 0; i < meshes.length; i++) {
            meshes[i].scaling = new BABYLON.Vector3(0.5, 0.5, 0.5);
            meshes[i].material = materialArm_1;
        }
    });

    BABYLON.SceneLoader.ImportMesh("", "models/", "arms.babylon", scene, function (meshes) {
        for(var i = 0; i < meshes.length; i++) {
            meshes[i].scaling = new BABYLON.Vector3(0.5, 0.5, 0.5);
            meshes[i].material = materialArm_1;
        }
    });

    BABYLON.SceneLoader.ImportMesh("", "models/", "feet.babylon", scene, function (meshes) {
        for(var i = 0; i < meshes.length; i++) {
            meshes[i].scaling = new BABYLON.Vector3(0.5, 0.5, 0.5);
            meshes[i].material = materialArm_1;
        }
    });

    BABYLON.SceneLoader.ImportMesh("", "models/", "horn.babylon", scene, function (meshes) {
        var m = meshes[0];
        m.scaling = new BABYLON.Vector3(0.5,0.5,0.5);
        m.material = materialHead;

    });

    BABYLON.SceneLoader.ImportMesh("", "models/", "mouth.babylon", scene, function (meshes) {
        var m = meshes[0];
        m.scaling = new BABYLON.Vector3(0.5,0.5,0.5);
        m.material = materialHead;

    });

    BABYLON.SceneLoader.ImportMesh("", "models/", "teeth.babylon", scene, function (meshes) {
        var m = meshes[0];
        m.scaling = new BABYLON.Vector3(0.5,0.5,0.5);
        m.material = materialHead;

    });
}

initGame();

// Resize
window.addEventListener("resize", function () {
    engine.resize();
});



var update3D = function (interactedData) {

    // change material color according to parameter
    materialHead.diffuseColor = new BABYLON.Color3.FromHexString(jsonObj.headColor);
    materialBody.diffuseColor = new BABYLON.Color3.FromHexString(jsonObj.bodyColor);
    materialArm_1.diffuseColor = new BABYLON.Color3.FromHexString(jsonObj.armColor);
    materialArm_2.diffuseColor = new BABYLON.Color3.FromHexString(jsonObj.armColor);
    materialFoot_1.diffuseColor = new BABYLON.Color3.FromHexString(jsonObj.footColor);
    materialFoot_2.diffuseColor = new BABYLON.Color3.FromHexString(jsonObj.footColor);
}


