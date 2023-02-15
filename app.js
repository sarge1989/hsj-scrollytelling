gsap.registerPlugin(ScrollTrigger);

//to toggle off and on the scroll markers
// ScrollTrigger.defaults({
//     markers: true
// });

let loader = document.querySelector('.loader');
let html = document.querySelector('html');

//playing different lottie animations based on aspect ratio
let s = window.innerWidth < window.innerHeight ? "_m" : "_d"

//loading screen with a 0.25 seconds delay after for first animation to not look laggy
window.addEventListener("load", () => {
  loader.style.display = "none";
  html.style.overflowY = "visible";
  setTimeout(() => {
    const titlePage = lottie.loadAnimation({
      container: document.querySelector(".government-cover-1"), // the dom element that will contain the animation
      renderer: 'svg',
      loop: 0,
      autoplay: true, //it is true here as the designers want the first animation to be auto played
      path: `./animations/01_Cover${s}.json`, // the path to the animation json
      rendererSettings: {
        preserveAspectRatio: 'xMidYMax slice',
      }
    });
    titlePage.setSpeed(0.8); //1 is the current speed;
  }, 250);
});


/////LOTTIE ANIMATION FUNC
const ScrollLottie = (obj) => { //https://github.com/chrisgannon/ScrollLottie

  let anim = lottie.loadAnimation({ //https://github.com/airbnb/lottie-web/wiki/loadAnimation-options
    container: document.querySelector(obj.target), //div to place the animation in 
    renderer: 'svg', //render the json file as an svg
    loop: false,
    autoplay: false,
    path: obj.path, // the json file path
    rendererSettings: { //https://github.com/airbnb/lottie-web/wiki/Renderer-Settings
      preserveAspectRatio: obj.aspectRatio, //keep aspect ratio of svg
    }
  });

  let timeObj = { currentFrame: 0 }
  ScrollTrigger.create({ //https://greensock.com/docs/v3/Plugins/ScrollTrigger
    trigger: obj.target,
    scrub: true,
    pin: obj.pin,
    start: obj.start,
    end: obj.end,
    markers: obj.markers ?? false,
    onUpdate: self => { //whenever the user scrolls, the code calculates which lottie frame to show
      if (obj.duration) {
        gsap.to(timeObj, {
          duration: obj.duration,
          currentFrame: (Math.floor(self.progress * (anim.totalFrames - 1)) + obj.startingFrame),
          onUpdate: () => {
            anim.goToAndStop(timeObj.currentFrame, true)
          },
          ease: 'power0.out'
        })
      } else {
        anim.goToAndStop(self.progress * ((anim.totalFrames - 1) + obj.startingFrame), true)
      }
    }
  });
  ScrollTrigger.config({
    ignoreMobileResize: true
  });
}

//01_HSJ
ScrollLottie({
  target: ".scrollytelling-container", //the division the lottie animation will be in
  path: `./animations/03_HSJ${s}.json`, //downloaded json file
  duration: s == "_d" ? 1 : 0, //adds smooth scrolling, can set any number (TO JOHN: CHANGING THIS MIGHT INFLUENCE LAGGINESS)
  end: s == "_d" ? "+=1475%" : "+=1050%", //how many percent of the viewheight a user has to scroll to finish the animation
  // totalFrames: 708, //get this from the website. essentially the total frames for the whole animation (if want to set this can change anim.totalFrames to obj.totalFrames in the function above)
  start: "top top", //where trigger starts
  pin: false,
  startingFrame: 15, //usually 0, unless we want animation to start from a later frame in this case
  aspectRatio: 'xMidYMin meet', //toggle svg aspect ratio setting
});

//trigger for div to be pinned, has to be seperated from above ScrollLottie function as I want the animation to play at a different instance compared to when i want to pin it...
ScrollTrigger.create({
  trigger: ".scrollytelling-container",
  start: "top top",
  end: s == "_d" ? "+=1400%" : "+=1000%",
  pin: true,
});

// //01_HSJ
// ScrollLottie({
//   target: ".scrollytelling-2", //the division the lottie animation will be in
//   path: `./animations/01_HSJ${s}.json`, //downloaded json file
//   duration: s == "_d" ? 1 : 0, //adds smooth scrolling, can set any number
//   end: s == "_d" ? "+=2400%" : "+=1200%", //how many percent of the viewheight a user has to scroll to finish the animation
//   // totalFrames: 708, //get this from the website. essentially the total frames for the whole animation (if want to set this can change anim.totalFrames to obj.totalFrames in the function above)
//   start: "top top", //where trigger starts
//   pin: false,
//   startingFrame: 15, //usually 0, unless we want animation to start from a later frame in this case
//   aspectRatio: 'xMidYMin meet', //toggle svg aspect ratio setting
// });

// //trigger for div to be pinned, has to be seperated from above ScrollLottie function as I want the animation to play at a different instance compared to when i want to pin it...
// ScrollTrigger.create({
//   trigger: ".scrollytelling-container",
//   start: "top top",
//   end: s == "_d" ? "+=2200%" : "+=1000%",
//   pin: true,
// });
