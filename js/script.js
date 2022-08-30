class FunnyScroll{
    constructor(settings = {}){
        this.wrapper = document.getElementById('wrapper')    
        this.sections = document.querySelectorAll('.section')
        this.totalSections = this.sections.length
        // The wrapper's sliding duration
        this.transDur = settings.transDur ? settings.transDur : '500ms'
        // The maximal viewport width for mobile mode 
        this.mobileVpWidth = settings.mobileVpWidth ? settings.mobileVpWidth : 1100
        // Whether or not the sliding should be done in mobile mode or not
        this.mobileMode = window.innerWidth <= this.mobileVpWidth ? true : false
        // Wheter or not the sliding is reset, if reset the duration of the slide is 1ms.
        // All callbacks will not be played
        this.reset = false
        this.callbacks = settings.callbacks ? settings.callbacks : {}
        // The current section
        this.currSection = 0
        // The previous section
        this.prevSection = 0        
        // The current slide value
        this.currSlideVal = 0
        // Whether or not the wrapper is sliding
        this.isSliding = false
        this.touchStart = 0
    }

    isScrollValid(dir, type){
        if(this.isSliding === true){
            return false
        }
        if(type === 'wheel'){
            if(
                ( dir > 0 && (this.currSection + 1) < this.totalSections ) ||
                ( dir < 0 && (this.currSection - 1) >= 0 )
            ){
                return true
            }
        }
        else{
            if(Math.abs(dir) > 50){
                if(
                    ( dir > 0 && (this.currSection + 1) < this.totalSections ) ||
                    ( dir < 0 && (this.currSection - 1) >= 0 )                    
                ){
                    return true
                }
            }            
        }
        return false      
    }    
    slide(targetSect){
        const prevSlideVal = this.currSlideVal
        this.isSliding = true
        // Slide to the next section
        if(targetSect > this.currSection){
            this.currSlideVal -= 100 * Math.abs(targetSect - this.currSection)
        }
        // Slide to the prev section
        else{
            this.currSlideVal += 100 * Math.abs(targetSect - this.currSection)
        }
        this.prevSection = this.currSection
        this.currSection = targetSect
        // Play callback
        console.log(prevSlideVal)
        console.log(this.currSlideVal)
        this.playCallback('start')
        this.wrapper.style.transitionDuration = this.reset ? '1ms' : this.transDur        
        this.wrapper.style.transform = 'translate('+(
            this.mobileMode ? `0%, ${this.currSlideVal}%` : `${this.currSlideVal}%, 0%` 
        )+')';
        if(this.currSlideVal === prevSlideVal){
            this.isSliding = false
            this.reset = false
        }
    }    
    playCallback(type){
        const callback = this.callbacks[this.currSection.toString()]
        if(callback && this.reset === false){
            if(type == 'start' && callback.start){
                callback.start(
                    this.sections[this.prevSection], this.sections[this.currSection]
                )
            }
            else if(type == 'end' && callback.end){
                callback.end(
                    this.sections[this.prevSection], this.sections[this.currSection]
                )
            }
        }
    }
    init(){
        const _instance = this

        _instance.wrapper.ontransitionend = () => {
            _instance.playCallback('end')
            _instance.isSliding = false
            _instance.reset = false
        }
        window.onwheel = (e) => {
            if(_instance.isScrollValid(e.deltaY, e.type)){
                const targetSect = (e.deltaY > 0 ? _instance.currSection + 1 : _instance.currSection - 1)
                _instance.slide(targetSect)
            }      
        }
        window.onresize = () => {
            // Browser resized to mobile viewport
            if(_instance.mobileMode === false && window.innerWidth <= _instance.mobileVpWidth){
                _instance.mobileMode = true
                _instance.reset = true
                _instance.slide(_instance.currSection)
            }
            // Browser resized to desktop viewport
            else if(_instance.mobileMode === true && window.innerWidth > _instance.mobileVpWidth){
                _instance.mobileMode = false
                _instance.reset = true
                _instance.slide(_instance.currSection)
            }
        }
        document.ontouchstart = (e) => {
            _instance.touchStart = e.touches[0].clientY
        }
        document.ontouchend = (e) => {
            const dir = _instance.touchStart - e.changedTouches[0].clientY
            if(_instance.isScrollValid(dir, e.type)){
                const targetSect = (dir > 0 ? _instance.currSection + 1 : _instance.currSection - 1)
                _instance.slide(targetSect)
            }             
        }
    }
}

$(document).ready(() => {
    new FunnyScroll({
        transDur: '800ms'
        // callbacks: {
        //     '0': {
        //         'start': (prev, curr) => {
        //             console.log('start')
        //             console.log(prev)
        //             console.log(curr)
        //         },
        //         'end': (prev, curr) => {
        //             console.log('end')
        //             console.log(prev)
        //             console.log(curr)                    
        //         }
        //     }
        // }        
    }).init()

    // const transDur = '500ms'
    // const mobileVpWidth = 1100
    // const wrapper = document.getElementById('wrapper')    
    // const totalSections = document.querySelectorAll('.section').length
    // let mobileMode = window.innerWidth <= mobileVpWidth ? true : false
    // let reset = false
    // let callbacks = {}
    // let currSection = 0
    // let currSlideVal = 0
    // let isSliding = false    
    
    // wrapper.ontransitionend = () => {
    //     isSliding = false
    //     if(callbacks && reset === false){
    //         ;
    //     }
    //     reset = false
    // }

    // const isScrollValid = (e) => {
    //     if(isSliding === true){
    //         return false
    //     }
    //     if(
    //         ( e.deltaY > 0 && (currSection + 1) < totalSections ) ||
    //         ( e.deltaY < 0 && (currSection - 1) >= 0 )
    //     ){
    //         return true
    //     }
    //     return false      
    // }
    // const slide = (targetSect) => {
    //     isSliding = true
    //     // Slide to the next section
    //     if(targetSect > currSection){
    //         currSlideVal -= 100 * Math.abs(targetSect - currSection)
    //     }
    //     // Slide to the prev section
    //     else{
    //         currSlideVal += 100 * Math.abs(targetSect - currSection)
    //     }
    //     currSection = targetSect
    //     // If playback exists and is not reset
    //     if(callbacks && reset === false){
    //         ;
    //     }
    //     wrapper.style.transitionDuration = reset ? '1ms' : transDur        
    //     wrapper.style.transform = 'translate('+(
    //         mobileMode ? `0%, ${currSlideVal}%` : `${currSlideVal}%, 0%` 
    //     )+')';
    // }
        
    // window.onwheel = (e) => {
    //     if(isScrollValid(e)){
    //         const targetSect = (e.deltaY > 0 ? currSection + 1 : currSection - 1)
    //         slide(targetSect)
    //     }      
    // }  
    // window.onresize = () => {
    //     // Browser resized to mobile viewport
    //     if(mobileMode === false && window.innerWidth <= mobileVpWidth){
    //         mobileMode = true
    //         reset = true
    //         slide(currSection)
    //     }
    //     // Browser resized to desktop viewport
    //     else if(mobileMode === true && window.innerWidth > mobileVpWidth){
    //         mobileMode = false
    //         reset = true
    //         slide(currSection)
    //     }
    // }    
})

// const preloader = document.getElementB yId("preloader");
// const loader = document.getElementById("loader");

// window.addEventListener("load", function(){
//     preloader.style.display= "none";
//     loader.style.display= "block";
// })
