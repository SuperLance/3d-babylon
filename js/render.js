/*********************************
 |         Variables              |
 *********************************/

/**
 * Main Variables for babylon
 */
var canvas, engine, scene, camera;

/**
 * Material variables
 */
var materialArr = [];
var materialBottomPane;

/**
 * Model object variable
 * @type {Array}
 */
var objArr = [];

/**
 * static variables
 */
var objCount = 11;
var deltaColor = 0.02;
var loadedCount = 0;

/**
 * Global parameter for integration
 */
var jsonObj;

/**
 * Object Variables
 */
var assetsManager;
var rotationTitleGUI;
var bottomPane, axisRing;

/*********************************
 |         Foreign Functions      |
 *********************************/

/**
 * Return position array of circle according to radius.
 * @param radius
 * @param delta
 * @returns {Array}
 */
var getCirclePos = function (radius, delta) {
    var posArr = [];

    for (var i = 0; i < 360 - 2 * delta; i++) {
        posArr[i] = new BABYLON.Vector3(radius * Math.cos(2 * Math.PI * (i + delta) / 360), 0,
            radius * Math.sin(2 * Math.PI * (i + delta) / 360));
    }

    return posArr;
}

/**
 * Return value according to key from json Object.
 * @param index
 * @param type
 * @returns {string}
 */
var getJsonValue = function (index, type) {
    var result = '';

    if (type == 'color') {
        switch (index) {
            case 0:
                result = jsonObj.bodyColour;
                break;
            case 1:
                result = jsonObj.armsColour;
                break;
            case 2:
                result = jsonObj.feetColour;
                break
            case 3:
                result = jsonObj.hornColour;
                break;
            case 4:
                result = jsonObj.facesColour;
                break;
            case 5:
                result = jsonObj.mouthColour;
                break;
            case 6:
                result = "#ffffff";
                break;
            case 7:
                result = jsonObj.eyeBrowColour;
                break;
            case 8:
                result = "#ffffff";
                break;
            case 9:
                result = jsonObj.eyesColour;
                break;
            case 10:
                result = "#000000";
                break;
            default:
                result = "#ffffff";
                break;
        }
    } else {
        switch (index) {
            case 0:
                result = jsonObj.bodyType;
                break;
            case 1:
                result = jsonObj.armsType;
                break;
            case 2:
                result = 0;
                break
            case 3:
                result = jsonObj.hornType;
                break;
            case 4:
                result = jsonObj.facesType;
                break;
            case 5:
                result = jsonObj.mouthType;
                break;
            case 6:
                result = jsonObj.mouthType;
                break;
            case 7:
                result = jsonObj.eyesType;
                break;
            case 8:
                result = jsonObj.eyesType;
                break;
            case 9:
                result = jsonObj.eyesType;
                break;
            case 10:
                result = jsonObj.eyesType;
                break;
            default:
                result = 0;
                break;
        }
    }

    return result;
}

/**
 * Return number of model type.
 * @param objIndex
 * @returns {number}
 */
var getTypeCount = function (objIndex) {
    var count = 0;
    switch (objIndex) {
        case 0: //body
            count = 11;
            break;
        case 1: //arms
            count = 3;
            break;
        case 2: //feet
            count = 1;
            break;
        case 3: //horn
            count = 4;
            break;
        case 4: //face
            count = 18;
            break;
        case 5: //mouth
            count = 3;
            break;
        case 6: //teeth
            count = 3;
            break;
        case 7: //eyeBrows
            count = 3;
            break;
        case 8: //eyeWhites
            count = 3;
            break;
        case 9: //eyeColors
            count = 3;
            break;
        case 10: //eyePupils
            count = 3;
            break;
        default:
            count = 0;
            break;

    }

    return count;
}

/*********************************
 |         Main Functions         |
 *********************************/

/**
 * Init babylon
 */
var init = function () {
    canvas = document.getElementById("render-canvas");
    engine = new BABYLON.Engine(canvas, true);

    scene = new BABYLON.Scene(engine);

    // Set scene background color
    scene.clearColor = new BABYLON.Color4(0, 0, 0, 0.0000000000000001);

    //Create a light
    var light1 = new BABYLON.PointLight("DirectionalLight1", new BABYLON.Vector3(20, 20, 100), scene);
    light1.specular = new BABYLON.Color3(0, 0, 0);

    //Create an Arc Rotate Camera - aimed negative z this time
    camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI / 2, Math.PI * 0.5, 110, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);

    // Move the light with the camera
    scene.registerBeforeRender(function () {
        light1.position = camera.position;
    });

    camera.lowerRadiusLimit = camera.upperRadiusLimit = 110;

    //Create material
    for (var i = 0; i < objCount; i++) {
        materialArr[i] = [];
        for (var j = 0; j < getTypeCount(i); j++) {
            materialArr[i][j] = new BABYLON.StandardMaterial("texture-" + i + "-" + j, scene);
        }
    }
};

/**
 * Init 3D models
 */
initModels = function () {
    var parentObj = new BABYLON.Mesh.CreateBox("parentObj", 0.001, scene);
    parentObj.rotation.x = -Math.PI * 0.5;

    assetsManager = new BABYLON.AssetsManager(scene);

    //Import mesh files.
    for (var i = 0; i < objCount; i++) {
        objArr[i] = [];
        for (var j = 0; j < getTypeCount(i); j++) {
            switch (i) {
                case 0:
                    objArr[i][j] = assetsManager.addMeshTask("body-" + i + "-" + j, "", "models/", "body_" + j + ".babylon");
                    break;
                case 1:
                    objArr[i][j] = assetsManager.addMeshTask("arms-" + i + "-" + j, "", "models/", "arms_" + j + ".babylon");
                    break;
                case 2:
                    objArr[i][j] = assetsManager.addMeshTask("feet-" + i + "-" + j, "", "models/", "feet_" + j + ".babylon");
                    break;
                case 3:
                    objArr[i][j] = assetsManager.addMeshTask("horn-" + i + "-" + j, "", "models/", "horn_" + j + ".babylon");
                    break;
                case 4:
                    objArr[i][j] = assetsManager.addMeshTask("face-" + i + "-" + j, "", "models/", "face_" + j + ".babylon");
                    break;
                case 5:
                    objArr[i][j] = assetsManager.addMeshTask("mouth-" + i + "-" + j, "", "models/", "mouth_" + j + ".babylon");
                    break;
                case 6:
                    objArr[i][j] = assetsManager.addMeshTask("teeth-" + i + "-" + j, "", "models/", "teeth_" + j + ".babylon");
                    break;
                case 7:
                    objArr[i][j] = assetsManager.addMeshTask("eye_brows-" + i + "-" + j, "", "models/", "eye_brows_" + j + ".babylon");
                    break;
                case 8:
                    objArr[i][j] = assetsManager.addMeshTask("eye_whites-" + i + "-" + j, "", "models/", "eye_whites_" + j + ".babylon");
                    break;
                case 9:
                    objArr[i][j] = assetsManager.addMeshTask("eye_colors-" + i + "-" + j, "", "models/", "eye_colors_" + j + ".babylon");
                    break;
                case 10:
                    objArr[i][j] = assetsManager.addMeshTask("eye_pupils-" + i + "-" + j, "", "models/", "eye_pupils_" + j + ".babylon");
                    break;
                default:
                    break;
            }
        }
    }

    //Add material to loaded models.
    for (var i = 0; i < objCount; i++) {
        for (var j = 0; j < getTypeCount(i); j++) {
            objArr[i][j].onSuccess = function (obj) {
                loadedCount++;

                var ii = obj.name.split("-")[1];
                var jj = obj.name.split("-")[2];
                if (ii == 0) {
                    for (var k = 0; k < obj.loadedMeshes.length; k++) {
                        obj.loadedMeshes[k].material = materialArr[ii][jj];

                        if (k == 1 || k == 2) continue

                        obj.loadedMeshes[k].scaling = new BABYLON.Vector3(0.5, 0.5, 0.5);
                        obj.loadedMeshes[k].parent = parentObj;
                        obj.loadedMeshes[k].position.z = -29;
                    }
                } else if (ii == 3) {
                    for (var k = 0; k < obj.loadedMeshes.length; k++) {
                        obj.loadedMeshes[k].material = materialArr[ii][jj];
                        obj.loadedMeshes[k].position.z = -29;
                    }

                    obj.loadedMeshes[0].scaling = new BABYLON.Vector3(0.5, 0.5, 0.5);
                    obj.loadedMeshes[0].parent = parentObj;
                } else if (ii == 4 || ii == 5) {
                    for (var k = 0; k < obj.loadedMeshes.length; k++) {
                        obj.loadedMeshes[k].material = materialArr[ii][jj];
                        obj.loadedMeshes[k].position.z = -29;
                    }

                    obj.loadedMeshes[0].scaling = new BABYLON.Vector3(0.5, 0.5, 0.5);
                    obj.loadedMeshes[0].material = materialArr[ii][jj];
                    obj.loadedMeshes[0].parent = parentObj;
                } else {
                    for (var k = 0; k < obj.loadedMeshes.length; k++) {
                        obj.loadedMeshes[k].scaling = new BABYLON.Vector3(0.5, 0.5, 0.5);
                        obj.loadedMeshes[k].material = materialArr[ii][jj];
                        obj.loadedMeshes[k].parent = parentObj;
                        obj.loadedMeshes[k].position.z = -29;
                    }
                }
            }
        }
    }

    // bottom ring
    axisRing = BABYLON.Mesh.CreateLines("axisRing", getCirclePos(37.5, 7), scene);
    axisRing.position.y = -28.18;
    axisRing.rotation.y = Math.PI / 2;
    axisRing.color = new BABYLON.Color3(0, 0, 0);
    axisRing.alpha = 0.3;

    //bottom plane
    bottomPane = BABYLON.Mesh.CreateCylinder("cylinder", 0.1, 75, 75, 60, 1, scene, false);
    bottomPane.position.y = -28.18;
    materialBottomPane = new BABYLON.StandardMaterial("texture10", scene);
    materialBottomPane.alpha = 0.3;
    bottomPane.material = materialBottomPane;

    // GUI
    var rotationTitleObj = new BABYLON.Mesh.CreateBox("rotationTitleObj", 0.001, scene);
    rotationTitleObj.position.x = 38;
    rotationTitleObj.parent = axisRing;

    var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

    rotationTitleGUI = new BABYLON.GUI.Rectangle();
    rotationTitleGUI.width = 1;
    rotationTitleGUI.height = "40px";
    rotationTitleGUI.cornerRadius = 0;
    rotationTitleGUI.color = "rgba(0, 0, 0, 1)";
    rotationTitleGUI.thickness = 0;
    rotationTitleGUI.background = "transparent";
    advancedTexture.addControl(rotationTitleGUI);
    rotationTitleGUI.linkWithMesh(rotationTitleObj);

    var label = new BABYLON.GUI.TextBlock();
    //label.fontFamily = "Arial";
    label.text = "360�";
    label.color = "#000000";
    label.fontSize = 12;
    rotationTitleGUI.addControl(label);

}

/**
 * Set Parameters
 */
var update3D = function (interactedData) {
    if (!interactedData) {
        jsonObj = {
            'bodyColour': '#4a266d',
            'bodyType': 0,
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
            'eyeBrowColour': '#000000',
            'eyesType': 0
        }
    } else {
        jsonObj = interactedData;
    }

    if(jsonObj.bodyType >= 2) {
        jsonObj.facesType = -1;
        jsonObj.bodyType = 3 * jsonObj.eyesType + jsonObj.mouthType + 2;
    } else {
        jsonObj.facesType = 9 * jsonObj.bodyType + 3 * jsonObj.eyesType + jsonObj.mouthType;
    }

}

/*********************************
 |     Real time Functions       |
 *********************************/

/**
 * Change Color and Type of models smoothly
 */
var animationModel = function () {
    for (var i = 0; i < materialArr.length; i++) {
        var color = new BABYLON.Color3.FromHexString(getJsonValue(i, 'color'));

        var type = getJsonValue(i, 'type');

        for (var j = 0; j < materialArr[i].length; j++) {
            if (type == j) {
                materialArr[i][j].alpha = 1;
            } else {
                materialArr[i][j].alpha = 0;
            }

            if (Math.abs(materialArr[i][j].diffuseColor.r - color.r) > 0.02) {
                if (materialArr[i][j].diffuseColor.r > color.r) {
                    materialArr[i][j].diffuseColor.r -= deltaColor;
                } else {
                    materialArr[i][j].diffuseColor.r += deltaColor;
                }
            } else {
                materialArr[i][j].diffuseColor.r = color.r;
            }


            if (Math.abs(materialArr[i][j].diffuseColor.g - color.g) > 0.02) {
                if (materialArr[i][j].diffuseColor.g > color.g) {
                    materialArr[i][j].diffuseColor.g -= deltaColor;
                } else {
                    materialArr[i][j].diffuseColor.g += deltaColor;
                }
            } else {
                materialArr[i][j].diffuseColor.g = color.g;
            }

            if (Math.abs(materialArr[i][j].diffuseColor.b - color.b) > 0.03) {
                if (materialArr[i][j].diffuseColor.b > color.b) {
                    materialArr[i][j].diffuseColor.b -= deltaColor;
                } else {
                    materialArr[i][j].diffuseColor.b += deltaColor;
                }
            } else {
                if(i == 0) {
                    materialArr[i][j].diffuseColor.b = color.b;
                }
            }
        }
    }
}

/**
 * Render Circle and 360 word at the bottom of model.
 */
var circlePane = function () {
    axisRing.rotation.y = -camera.alpha;

    if (camera.beta < Math.PI * 1.166 / 2 && camera.beta > Math.PI * 0.834 / 2) {
        axisRing.alpha = 0.3;
        materialBottomPane.alpha = 0;

        rotationTitleGUI.alpha = 1;
    }
    else {
        var diffAlpha = Math.abs(Math.PI / 2 - Math.abs(camera.beta)) - Math.PI * 0.166 / 2;
        var delta = Math.PI * 0.07;
        var titleOpacity = 1;
        if (diffAlpha < delta) {
            axisRing.alpha = 0.3 * (1 - diffAlpha / delta);
            materialBottomPane.alpha = 0 * (1 - diffAlpha / delta);
            titleOpacity = 1 - diffAlpha / delta;
        }
        else {
            axisRing.alpha = 0;
            materialBottomPane.alpha = 0;

            titleOpacity = 1 - diffAlpha / delta;
        }

        if(titleOpacity < 0) titleOpacity = 0;

        rotationTitleGUI.alpha = titleOpacity;
    }
}

/*********************************
 |            START              |
 *********************************/

init();

initModels();

update3D();

/*********************************
 |  Functions related to render  |
 *********************************/

/**
 * Render after loading.
 * @param tasks
 */
assetsManager.onFinish = function (tasks) {
    //Disable if models are loaded.
    $("#progress-bar").css('display', 'none');

    engine.runRenderLoop(function () {
        circlePane();
        animationModel();

        scene.render();
    });
}

/**
 * Re-render when browser is resized
 */
window.addEventListener("resize", function () {
    engine.resize();
});

/**
 * Load assets files.
 */
assetsManager.useDefaultLoadingScreen = false;

//Count loaded models.
setInterval(function () {
    var totalCount = 0;

    for(var i = 0; i < objCount; i++) {
        totalCount += getTypeCount(i);
    }

    $("#progress-bar").css('width', ""+(loadedCount * 100/ totalCount)+"%");

}, 100);

assetsManager.load();
