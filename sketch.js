// Zoom AnAnswertations (Final)
// Coding Challenge
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/157-zoom-anAnswertations.html
// https://youtu.be/

// Basic: https://editor.p5js.org/codingtrain/sketches/EaioB_iJs
// Final: https://editor.p5js.org/codingtrain/sketches/ELpl_VAqs

// Classifier Variable
let classifier;
// Model URL
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/FYy8Bc-IE/';

// Video
let video;
let flippedVideo;
// To store the classification
let label = '';

let BG;
let BGFade = 0;

let Question;
let QuestionFade = 0;

let Answer;
let AnswerFade = 0;

// Load the model first
function preload() {
  classifier = ml5.imageClassifier(imageModelURL + 'model.json');
  BG = loadImage('AFK.png');
  Question = loadImage('Questionn.png');
  Answer = loadImage('Answerr.png');
}

// function mousePressed() {
//     love.hide();
//   love.loop();
// }

function setup() {
  createCanvas(1280, 720);
  // Create the video
  video = createCapture(VIDEO);
  video.size(160, 120);
  // video.hide();

  flippedVideo = ml5.flipImage(video);
  // Start classifying
  classifyVideo();
}

function draw() {
  background(0, 255, 0);
  imageMode(CORNER);

  // Draw the video
  // tint(255);
  // image(flippedVideo, 0, 0);
  if (label == 'BG') {
    BGFade = 255;
  } else if (label == 'Question') {
    QuestionFade = 255;
  } else if (label == 'Answer') {
    AnswerFade = 255;
  }

  if (BGFade > 0) {
    tint(255, BGFade);
    image(BG, 0, 0);
    BGFade -= 10;
  }

  if (QuestionFade > 0) {
    tint(255, QuestionFade);
    image(Question, 0, 0);
    QuestionFade -= 10;
  }

  if (AnswerFade > 0) {
    tint(255, AnswerFade);
    image(Answer, 0, 0);
    AnswerFade -= 10;
  }

  // Draw the label
  // fill(255);
  // textSize(16);
  // textAlign(CENTER);
  // text(label, width / 2, height - 4);
}

// Get a prediction for the current video frame
function classifyVideo() {
  flippedVideo = ml5.flipImage(video);
  classifier.classify(flippedVideo, gotResult);
}

// When we get a result
function gotResult(error, results) {
  // If there is an error
  if (error) {
    console.error(error);
    return;
  }
  // The results are in an array ordered by confidence.
  // console.log(results[0]);
  label = results[0].label;
  // Classifiy again!
  classifyVideo();
}
