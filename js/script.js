// class FunnyScroll{
//     constructor(settings = {}){
//         this.wrapper = document.getElementById('wrapper')    
//         this.totalSections = document.querySelectorAll('.section').length
//         // The wrapper's sliding duration
//         this.transDur = settings.transDur ? settings.transDur : '500ms'
//         // The maximal viewport width for mobile mode 
//         this.mobileVpWidth = settings.mobileVpWidth ? settings.mobileVpWidth : 1100
//         // Whether or not the sliding should be done in mobile mode or not
//         this.mobileMode = window.innerWidth <= this.mobileVpWidth ? true : false
//         // Wheter or not the sliding is reset, if reset the duration of the slide is 1ms.
//         // All callbacks will not be played
//         this.reset = false
//         this.callbacks = {}
//         // The current section
//         this.currSection = 0
//         // The current slide value
//         this.currSlideVal = 0
//         // Whether or not the wrapper is sliding
//         this.isSliding = false            
//     }

//     isScrollValid(e){
//         if(this.isSliding === true){
//             return false
//         }
//         if(
//             ( e.deltaY > 0 && (this.currSection + 1) < this.totalSections ) ||
//             ( e.deltaY < 0 && (this.currSection - 1) >= 0 )
//         ){
//             return true
//         }
//         return false      
//     }    
//     slide(targetSect){
//         this.isSliding = true
//         // Slide to the next section
//         if(targetSect > this.currSection){
//             this.currSlideVal -= 100 * Math.abs(targetSect - this.currSection)
//         }
//         // Slide to the prev section
//         else{
//             this.currSlideVal += 100 * Math.abs(targetSect - this.currSection)
//         }
//         this.currSection = targetSect
//         // If playback exists and is not reset
//         if(this.callbacks && this.reset === false){
//             ;
//         }
//         this.wrapper.style.transitionDuration = this.reset ? '1ms' : this.transDur        
//         this.wrapper.style.transform = 'translate('+(
//             this.mobileMode ? `0%, ${this.currSlideVal}%` : `${this.currSlideVal}%, 0%` 
//         )+')';
//     }    
//     init(){
//         const _instance = this

//         _instance.wrapper.ontransitionend = () => {
//             _instance.isSliding = false
//             if(_instance.callbacks && _instance.reset === false){
//                 ;
//             }
//             _instance.reset = false
//         }
//         window.onwheel = (e) => {
//             if(_instance.isScrollValid(e)){
//                 const targetSect = (e.deltaY > 0 ? _instance.currSection + 1 : _instance.currSection - 1)
//                 _instance.slide(targetSect)
//             }      
//         }
//         window.onresize = () => {
//             // Browser resized to mobile viewport
//             if(window.innerWidth <= _instance.mobileVpWidth && _instance.mobileMode === false){
//                 _instance.mobileMode = true
//                 _instance.reset = true
//                 _instance.slide(_instance.currSection)
//             }
//             // Browser resized to desktop viewport
//             else if(window.innerWidth > _instance.mobileVpWidth && _instance.mobileMode === true){
//                 _instance.mobileMode = false
//                 _instance.reset = true
//                 _instance.slide(_instance.currSection)
//             }
//         }               
//     }
// }

$(document).ready(() => {
    // new FunnyScroll().init()

    const transDur = '500ms'
    const mobileVpWidth = 1100
    const wrapper = document.getElementById('wrapper')    
    const totalSections = document.querySelectorAll('.section').length
    let mobileMode = window.innerWidth <= mobileVpWidth ? true : false
    let reset = false
    let callbacks = {}
    let currSection = 0
    let currSlideVal = 0
    let isSliding = false    
    
    wrapper.ontransitionend = () => {
        isSliding = false
        if(callbacks && reset === false){
            ;
        }
        reset = false
    }

    const isScrollValid = (e) => {
        if(isSliding === true){
            return false
        }
        if(
            ( e.deltaY > 0 && (currSection + 1) < totalSections ) ||
            ( e.deltaY < 0 && (currSection - 1) >= 0 )
        ){
            return true
        }
        return false      
    }
    const slide = (targetSect) => {
        isSliding = true
        // Slide to the next section
        if(targetSect > currSection){
            currSlideVal -= 100 * Math.abs(targetSect - currSection)
        }
        // Slide to the prev section
        else{
            currSlideVal += 100 * Math.abs(targetSect - currSection)
        }
        currSection = targetSect
        // If playback exists and is not reset
        if(callbacks && reset === false){
            ;
        }
        wrapper.style.transitionDuration = reset ? '1ms' : transDur        
        wrapper.style.transform = 'translate('+(
            mobileMode ? `0%, ${currSlideVal}%` : `${currSlideVal}%, 0%` 
        )+')';
    }
        
    window.onwheel = (e) => {
        if(isScrollValid(e)){
            const targetSect = (e.deltaY > 0 ? currSection + 1 : currSection - 1)
            slide(targetSect)
        }      
    }  
    window.onresize = () => {
        // Browser resized to mobile viewport
        if(window.innerWidth <= mobileVpWidth && mobileMode === false){
            mobileMode = true
            reset = true
            slide(currSection)
        }
        // Browser resized to desktop viewport
        else if(window.innerWidth > mobileVpWidth && mobileMode === true){
            mobileMode = false
            reset = true
            slide(currSection)
        }
    }    
})

// const preloader = document.getElementB yId("preloader");
// const loader = document.getElementById("loader");

// window.addEventListener("load", function(){
//     preloader.style.display= "none";
//     loader.style.display= "block";
// })
