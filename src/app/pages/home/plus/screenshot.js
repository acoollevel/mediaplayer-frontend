import * as shaka from '../shaka-player.ui.js';

function downloadURI(uri, name) {
    var link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Use shaka.ui.Element as a base class
class Screenshot extends shaka.ui.Element {
    constructor(parent, controls) {
        super(parent, controls);

        // The actual button that will be displayed
        this.button_ = document.createElement('button');
        this.button_.classList.add('material-icons');
        this.button_.textContent = 'wallpaper';
        
        this.parent.appendChild(this.button_);

        // Listen for clicks on the button to start the next playback
        this.eventManager.listen(this.button_, 'click', () => {
            var canvas = document.createElement('canvas');
            canvas.width = this.video.videoWidth;
            canvas.height = this.video.videoHeight;
            var ctx = canvas.getContext('2d');
            ctx.drawImage(document.querySelector("#video"), 0, 0, canvas.width, canvas.height);
            var dataURI = canvas.toDataURL('image/jpeg'); // can also use 'image/png'
            downloadURI(dataURI, "My Screenshot");
        });
    }
};


// Factory that will create a button at run time.
Screenshot.Factory = class {
    create(rootElement, controls) {
        return new Screenshot(rootElement, controls);
    }
};

// Register our factory with the controls, so controls can create button instances.
export var screenshot = new Screenshot.Factory();
