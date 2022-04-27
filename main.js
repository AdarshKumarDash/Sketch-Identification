function setup() {
    canvas = createCanvas(280, 280);
    canvas.center();
    canvas.mouseReleased(classifyCanvas);
    synth = window.speechSynthesis;
}

function preload() {
    classifier = ml5.imageClassifier("DoodleNet");
}

function draw() {
    strokeWeight(12);
    stroke(0);
    if (mouseIsPressed) {
        line(pmouseX, pmouseY, mouseX, mouseY);
    }
}

function classifyCanvas() {
    classifier.classify(canvas, gotResult);
}

function gotResult(error, result) {
    if (error) {
        console.log(error);
    } else {
        console.log(result);
        document.getElementById("userimg").innerHTML = result[0].label;
        document.getElementById("confidence").innerHTML = Math.round(result[0].confidence*100) + "%";
        var utter = new SpeechSynthesisUtterance(result[0].label);
        synth.speak(utter);
    }
}

function clearimg() {
    background("white");
}