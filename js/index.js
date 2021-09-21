const $video = document.querySelector('#video');
const $play = document.querySelector('#play');
const $pause = document.querySelector('#pause');
const $backward = document.querySelector('#backward');
const $forward = document.querySelector('#forward');
const $progress = document.querySelector('#progress');
const $progressValue = document.querySelector('#progressValue');

$play.addEventListener('click', handlePlay);
$pause.addEventListener('click', handlePause);
$backward.addEventListener('click', handleBackward);
$forward.addEventListener('click', handleForward);
$video.addEventListener('loadedmetadata', handleLoaded);
$video.addEventListener('timeupdate', handleTimeUpdate);
$video.addEventListener('ended', handleEndedVideo);
$progress.addEventListener('input', handleInput);
 
function handlePlay() {
    playerState({play: true, pause: false});
    $backward.hidden = false;
    $forward.hidden = false;
}

function handlePause() {
    playerState({play: false, pause: true});
}

function playerState({play, pause}) {
    $play.hidden = play;
    $pause.hidden = pause;
    (play) ? $video.play() : $video.pause();
}

function handleBackward() {
    $video.currentTime -= 10;
}

function handleForward() {
    $video.currentTime += 10;
}

function handleLoaded() {
    $progress.max = $video.duration;
}

function handleTimeUpdate() {
    $progress.value = $video.currentTime;
    progressUpdate();
}

function handleEndedVideo() {
    playerState({play: false, pause: true});
    $forward.hidden = true;
    $backward.hidden = true;
}

function handleInput() {
    $video.currentTime = $progress.value;
}

function progressUpdate() {
    const progressTime = Number( ($progress.value * 100) / $video.duration );
    const progressPosition = 20 - ($progress.value * 0.2);
    const date = new Date(0);
    var timeString;    

    date.setSeconds($video.currentTime);
    timeString = date.toISOString().substr(14, 5);

    $progressValue.innerHTML = `<span>${ timeString }</span>`;
    $progressValue.style.left = `calc(${ progressTime }% + (${ progressPosition }px))`;
}

      