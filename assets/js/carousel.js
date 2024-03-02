(function(){
    $('#video-carousel').carousel({ interval: false });
}());

var tag = document.createElement('script');
tag.src = "//www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var videoArray = [];

function onYouTubePlayerAPIReady() {
    var videos = document.querySelectorAll('#video-carousel .youtube-video');
    for (var i = 0; i < videos.length; i++) {
        var dataset = videos[i].dataset.id;
        var cclang = videos[i].dataset.lang;
        var ccpolicy = videos[i].dataset.cc;
        var divID = 'vid-' + i.toString();

        videoArray[i] = new YT.Player(divID, {
            height: '100%',
            width: '100%',
            playerVars: {
                'autoplay': 0,
                'controls': 1,
                'modestbranding': 1,
                'rel': 0,
                'showinfo': 0,
                'loop': 1,
                'iv_load_policy': 3,
                'cc_lang_pref': cclang,
                'cc_load_policy': ccpolicy
            },
            videoId: dataset,
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
        });
    }
}

function onPlayerReady(event) {
    $('#video-carousel').on('slide.bs.carousel', function () {
        $(this).find('iframe').each(function(){
            event.target.pauseVideo();
        });
    });
}

function onPlayerStateChange(event) {
    $("#video-carousel").find('.play-button-wrapper .btn-video').each(function(){
        if (event.data == YT.PlayerState.ENDED) {
            $(this).fadeIn("Slow");
            $(this).find('i').attr("class", "fa fa-play");
        }
        if (event.data == YT.PlayerState.PLAYING) {
            $(this).find('i').attr("class", "fa fa-pause");
            $(this).fadeOut("Slow");
        }
        if (event.data == YT.PlayerState.PAUSED) {
            $(this).fadeIn("Slow");
            $(this).find('i').attr("class", "fa fa-play");
        }
        if (event.data == YT.PlayerState.BUFFERING) {
            $(this).find('i').attr("class", "fa fa-circle-o-notch fa-spin fa-fw");
        }
    });
}

$(".play-button-wrapper").bind("click touchstart", function() {
    $("#video-carousel").find('.active iframe').each(function(){
        var objectID = $(this).attr('id').split('-');
        if (videoArray[ objectID[1] ].getPlayerState() == 1) {
            videoArray[ objectID[1] ].pauseVideo();
        } else if (videoArray[ objectID[1] ].getPlayerState() == 2) {
            videoArray[ objectID[1] ].playVideo();
        } else {
            videoArray[ objectID[1] ].playVideo();
        }
    });
});