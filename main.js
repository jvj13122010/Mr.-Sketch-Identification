quick_draw_data_set = ["aircraft carrier", "airplane", "alarm clock", "ambulance", "angel", "animal migration", "ant", "anvil", "apple", "arm", "asparagus", "axe", "backpack", "banana", "bandage", "barn", "baseball", "baseball bat", "basket", "basketball", "bat", "bathtub", "beach", "bear", "beard", "bed", "bee", "belt", "bench", "bicycle", "binoculars", "bird", "birthday cake", "blackberry", "blueberry", "book", "boomerang", "bottlecap", "bowtie", "bracelet", "brain", "bread", "bridge", "broccoli", "broom", "bucket", "bulldozer", "bus", "bush", "butterfly", "cactus", "cake", "calculator", "calendar", "camel", "camera", "camouflage", "campfire", "candle", "cannon", "canoe", "car", "carrot", "castle", "cat", "ceiling fan", "cello", "cell phone", "chair", "chandelier", "church", "circle", "clarinet", "clock", "cloud", "coffee cup", "compass", "computer", "cookie", "cooler", "couch", "cow", "crab", "crayon", "crocodile", "crown", "cruise ship", "cup", "diamond", "dishwasher", "diving board", "dog", "dolphin", "donut", "door", "dragon", "dresser", "drill", "drums", "duck", "dumbbell", "ear", "elbow", "elephant"]
random = Math.floor((Math.random() * quick_draw_data_set.length) + 1);
sketch = quick_draw_data_set[random];
document.getElementById("skTBD").innerHTML = "Sketch To Be Drawn : " + sketch;
timerCounter = 0;
timerCheck = "";
drawnSketch = ""
answerHolder = "";
score = 0;

function updateCanvas() {
    background("gainsboro");
    random = Math.floor((Math.random() * quick_draw_data_set.length) + 1);
    sketch = quick_draw_data_set[random];
    document.getElementById("skTBD").innerHTML = "Sketch To Be Drawn : " + sketch;
}
function preload() {
    classifier = ml5.imageClassifier('DoodleNet');
}

function setup() {
    console.log("Setup Complete!");
    canvas = createCanvas(280, 280);
    canvas.center();
    background("gainsboro");
    canvas.mouseReleased(classifyCanvas);
}

function clearCanvas() {
    background("gainsboro");
}

function draw() {
    strokeWeight(5);
    stroke(0);
    if (mouseIsPressed) {
        line(pmouseX, pmouseY, mouseX, mouseY);
    }
    checkSketch();
    if (drawnSketch == sketch) {
        answerHolder = "set";
        score++;
        document.getElementById("score").innerHTML = "Score: " + score;
    }
}

function checkSketch() {
    timerCounter++;
    document.getElementById("timer").innerHTML = "Timer : " + timerCounter;
    if (timerCounter > 400) {
        timerCounter = 0;
        timerCheck = "Completed";
    }
    if (timerCheck == "Completed" || answerHolder == "set") {
        timerCheck = "";
        answerHolder = "";
        updateCanvas();
    }
}
function classifyCanvas() {
    classifier.classify(canvas, gotResult)
}
function gotResult(error, results) {
    if (error) {
        console.error(error);
    }
    console.log(results);
    drawn_sketch = results[0].label;
    document.getElementById('label').innerHTML = 'Your Sketch: ' + drawn_sketch;
    document.getElementById('confidence').innerHTML = 'Confidence: ' + Math.round(results[0].confidence * 100) + '%';
}
