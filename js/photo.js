(function() {

    const width = 320;
    let height = 0;

    let streaming = false;

    let video = null;
    let canvas = null;
    let photo = null;
    let snap = null;

    function startup(){
        video = document.getElementById('video');
        canvas = document.getElementById('canvas');
        photo = document.getElementById('photo');
        snap = document.getElementById('snap');

        // next four lines were in code but not tutorial
        // maybe related to not working
        /*
        navigator.getMedia = (  navigator.getUserMedia ||
                                navigator.webkitGetUserMedia ||
                                navigator.mozGetUserMedia ||
                                navigator.msGetUserMedia); 

        // Function below is from tutorial
        // maybe related to not working
        */
        navigator.mediaDevices.getUserMedia(
            { 
                video: true, 
                audio: false 
            }
        )
        .then(function(stream) {
            video.srcObject = stream;
            video.play();
        })
        .catch(function(err) {
            console.log("Ann error occurred! " + err);
        });
        /*   
        // Below is function from code "equivalent" to commented out tutorial code above
        navigator.getMedia(
            {
              video: true,
              audio: false
            },
            function(stream) {
              if (navigator.mozGetUserMedia) {
                video.mozSrcObject = stream;
              } else {
                var vendorURL = window.URL || window.webkitURL;
                video.src = vendorURL.createObjectURL(stream);
              }
              video.play();
            },
            function(err) {
              console.log("An error occured! " + err);
            }
        );               
        */

        video.addEventListener('canplay', function(ev){
            if (!streaming){
                height = video.videoHeight / (video.videoWidth/width);

                // inserting following lines from code that aren't in tutorial
                // Firefox currently has a bug where the height can't be read from
                // the video, so we will make assumptions if this happens.
                if (isNaN(height)) {
                    height = width / (4/3);
                }                

                video.setAttribute('width', width);
                video.setAttribute('height', height);
                canvas.setAttribute('width', width);
                canvas.setAttribute('height', height);
                streaming = true;
            }
        }, false);

        snap.addEventListener('click', function(ev){
            takePicture();
            ev.preventDefault();
        }, false);

        clearPhoto();
    }

    function clearPhoto(){
        var context = canvas.getContext('2d');
        context.fillStyle = "#AAA";
        context.fillRect(0, 0, canvas.width, canvas.height);

        var data = canvas.toDataURL('image/png');
        photo.setAttribute('src', data);
    }

    function takePicture (){
        var context = canvas.getContext('2d');
        if (width && height) {
            canvas.width = width;
            canvas.height = height;
            context.drawImage(video, 0, 0, width, height);

            var data = canvas.toDataURL('image/png');
            photo.setAttribute('src', data);
        } else {
            clearPhoto();
        }
    }
    // adding next from code that wasn't in tutorial
    // Set up our event listener to run the startup process
    // once loading is complete.
    window.addEventListener('load', startup, false);
})();
// Also added the (); at the very end which wasn't in tutorial