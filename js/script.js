$(document).ready(() => {
    const wrapper = document.getElementById('wrapper')
    wrapper.ontransitionend = () => {
        isSliding = false
        console.log('Finish sliding, the current section animation will play')
    }
    const totalSections = document.querySelectorAll('.section').length
    let currentSection = 0
    let currentSlideVal = 0
    let isSliding = false

    const isScrollValid = (e) => {
        if(isSliding === true){
            return false
        }
        if(
            ( e.deltaY > 0 && (currentSection + 1) < totalSections ) ||
            ( e.deltaY < 0 && (currentSection - 1) >= 0 )
        ){
            return true
        }
        return false      
    }
    const slide = (e) => {
        isSliding = true
        if(e.deltaY > 0){
            currentSlideVal -= 100
            ++currentSection
            console.log('Slide to the next section, the current section after effect will play')
        }
        else{
            currentSlideVal += 100
            --currentSection            
            console.log('Slide to the prev section, the current section after effect will play')
        }
        wrapper.style.transform = `translateX(${currentSlideVal}%)`;
    }
        
    window.onwheel = (e) => {
        if(isScrollValid(e)){
            slide(e)
        }      
    }
})

// const preloader = document.getElementB yId("preloader");
// const loader = document.getElementById("loader");

// window.addEventListener("load", function(){
//     preloader.style.display= "none";
//     loader.style.display= "block";
// })
