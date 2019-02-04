const teaserBannerTimer = 5000;
let bannerStatus = 0;
const images = document.getElementsByClassName("banner-image");
const statusIcons = document.getElementsByClassName("status-icon");
let intervalID;

if(images.length !== 0) {
    images[1].style.top = "100%";
    for(let i = 0; i < images.length; i++){
        images[i].style.backgroundImage = "url('../../files/img/main-teaser-slider/main-teaser" + i + ".jpg')";
    }
    for(let i = 2; i < images.length; i++){
        images[i].style.top = "-100%";
    }
} else {
    console.log('No slider images defined');
}

if(document.getElementById('teaser-slider') !== null) {
    intervalID = setInterval(function () {
        teaserBannerLoop();
    }, teaserBannerTimer);
}

function teaserBannerLoop() {

    const currentImage = bannerStatus;
    let nextImage;
    let lastImage;
    if(currentImage === images.length-1){
        nextImage = 0;
    } else {
        nextImage = bannerStatus + 1;
    }
    if(currentImage === 0){
        lastImage = images.length - 1;
    } else {
        lastImage = bannerStatus - 1;
    }
    for(let i = 0; i < images.length; i++){
        if(i !== currentImage && i !== nextImage){
            images[i].style.opacity = '0';
        }
    }

    setTimeout(function() {
        images[currentImage].style.top = "-100%";
        images[nextImage].style.top = "0";
        images[lastImage].style.top = "100%";
    }, 500);
    setTimeout(function() {
        for(let i = 0; i < images.length; i++){
            if(i !== currentImage && i !== nextImage){
                images[i].style.opacity = '1';
            }
        }
        statusIcons[currentImage].classList.remove("active");
        statusIcons[nextImage].classList.add("active");
    }, 1000);
    if(bannerStatus === images.length-1){
        bannerStatus = 0;
    } else {
        bannerStatus++;
    }
}

function switchBanner(iterations) {
    const iter = iterations;
    const currentImage = bannerStatus;
    let nextImage;
    let lastImage;
    if(currentImage === images.length-1){
        nextImage = 0;
    } else {
        nextImage = bannerStatus + 1;
    }
    if(currentImage === 0){
        lastImage = images.length - 1;
    } else {
        lastImage = bannerStatus - 1;
    }
    for(let i = 0; i < images.length; i++){
        if(i !== currentImage && i !== nextImage){
            images[i].style.opacity = '0';
        }
    }
    images[currentImage].style.top = "-100%";
    images[nextImage].style.top = "0";
    images[lastImage].style.top = "100%";
    for(let i = 0; i < images.length; i++){
        if(i !== currentImage && i !== nextImage){
            images[i].style.opacity = '1';
        }
    }
    statusIcons[currentImage].classList.remove("active");
    statusIcons[nextImage].classList.add("active");
    if(bannerStatus === images.length-1){
        bannerStatus = 0;
    } else {
        bannerStatus++;
    }
    clearInterval(intervalID);
    intervalID = setInterval(function() {
        teaserBannerLoop();
    }, teaserBannerTimer);
    if(iter !== 1){
        switchBanner(iter-1);
    } else if (iter === 1){
        setTimeout(function(){
            for (let i = 0; i < images.length; i++){
                images[i].style.transition = 'all ease-in-out 500ms';
                images[i].style.MozTransition = 'all ease-in-out 500ms';
                images[i].style.WebkitTransition = 'all ease-in-out 500ms';
                images[i].style.OTransition = 'all ease-in-out 500ms';
            }
        }, 500);
    }
}

function selectBanner(el) {
    const idLong = el.id;
    const id = parseInt(idLong.slice(3));
    let difference;
    for (let i = 0; i < images.length; i++){
        images[i].style.transition = 'none';
        images[i].style.MozTransition = 'none';
        images[i].style.WebkitTransition = 'none';
        images[i].style.OTransition = 'none';
    }
    if(id > bannerStatus){
        difference = parseInt(id - bannerStatus);
    } else {
        difference = parseInt(images.length - bannerStatus + id);
    }
    switchBanner(difference);
}

let mutationObserver = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        let classList = Array.from(mutation.target.classList);
        if(classList.includes("mm-current")) {
            document.getElementById('background-blue').style.opacity = "1";
            document.getElementById('background-blue').style.zIndex = "2";
            document.getElementById('nav-bg').style.backgroundColor = "rgba(255,255,255,0.1)";
            if(document.getElementById('teaser-slider') !== null) {
                document.getElementById('status-icons').style.display = "none";
            }
        } else {
            document.getElementById('background-blue').style.opacity = "0";
            document.getElementById('background-blue').style.zIndex = "0";
            document.getElementById('nav-bg').style.backgroundColor = "rgba(50,74,106,0.6)";
            if(document.getElementById('teaser-slider') !== null) {
                document.getElementById('status-icons').style.display = "block";
            }
        }
    })
});

mutationObserver.observe(document.getElementById('menu'), {
    attributes: true
});