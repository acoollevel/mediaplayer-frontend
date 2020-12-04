function show_popup(icon, string) {
    var popup = "<div id='mpp-action-popup'><span class='material-icons'>" + icon + "</span><p>" + string + "</p></div>";
    var container = document.getElementsByClassName("shaka-video-container")[0]
    try {container.removeChild(document.getElementById("mpp-action-popup"));} catch {};
    container.insertAdjacentHTML("afterbegin", popup);
}


// Keybindings
export function keybinds(event, vid) {

    // prevent unexpected browser behaviour
    event.preventDefault();
    document.activeElement.blur();

    try {
        clearTimeout(timeout);
    } catch {}
    //controls.setAttribute("shown", "true");
    //timeout = setTimeout(function(){ controls.removeAttribute("shown"); }, 1000);

    // Pause with spacebar, 'k'
    if(event.keyCode == 32 || event.keyCode == 75) {
        if (vid.paused) {
            vid.play();
            show_popup("play_arrow", "Play");
        } else {
            vid.pause();
            show_popup("pause", "Pause");
        }
    }

    // Go fullscreen with 'f'
    if(event.keyCode == 70) {
        document.getElementsByClassName("shaka-fullscreen-button")[0].click();
    }

    // Seek forwards with '➡', 'l'
    if(event.keyCode == 39 || event.keyCode == 76) {
        vid.currentTime = vid.currentTime + 5;
        show_popup("skip_next", "Seek");
    }

    // Seek backwards with '⬅', 'j'
    if(event.keyCode == 37 || event.keyCode == 74) {
        vid.currentTime = vid.currentTime - 5;
        show_popup("skip_previous", "Seek");
    }

    // Volume up with '⬆'
    if(event.keyCode == 38) {
        vid.volume = vid.volume + 0.05;
        if (vid.volume > 0.95) {
            vid.volume = 1;
        }
        show_popup("volume_up", Math.round(vid.volume*100));
    }

    // Volume up with '⬇'
    if(event.keyCode == 40) {
        vid.volume = vid.volume - 0.05;
        if (vid.volume < 0.05) {
            vid.volume = 0;
        }
        show_popup("volume_down", Math.round(vid.volume*100));
    }

    // Increase speed with '.'
    if(event.keyCode == 190) {
        vid.playbackRate = vid.playbackRate + 0.25;
        if (vid.playbackRate > 3) {
            vid.playbackRate = 3;
        }
        show_popup("fast_forward", vid.playbackRate + "x");
    }

    // Decrease speed with ','
    if(event.keyCode == 188) {
        vid.playbackRate = vid.playbackRate - 0.25;
        if (vid.playbackRate < 0.25) {
            vid.playbackRate = 0.25;
        }
        show_popup("fast_rewind", vid.playbackRate + "x");
    }

    // Reset speed with '/'
    if(event.keyCode == 191) {
        vid.playbackRate = 1;
        show_popup("speed", "1x");
    }

    // Mute/unmute with 'm'
    if(event.keyCode == 77) {
        if (vid.muted) {
            vid.muted = false;
            show_popup("volume_up", "Unmuted");
        } else {
            vid.muted = true;
            show_popup("volume_off", "Muted");
        }
    }
};