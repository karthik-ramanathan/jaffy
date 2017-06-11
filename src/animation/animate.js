$(function(){
    $.fn.extend({
        vfx: function (animationName, callback) {
            var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
            var $this = $(this);

            $this.data('callback', (typeof callback === "function")? callback : null);

            $this.addClass('animated ' + animationName).one(animationEnd, function(event){
                event.stopPropagation();
                $this.removeClass('animated ' + animationName);
                if($this.data('callback')){
                    $this.data('callback')();
                }
            });
        }
    });

});

const ANIMATION = {
bounce:'bounce',
flash:'flash',
pulse:'pulse',
rubberBand:'rubberBand',
shake:'shake',
swing:'swing',
tada:'tada',
wobble:'wobble',
jello:'jello',
bounceIn:'bounceIn',
bounceInDown:'bounceInDown',
bounceInLeft:'bounceInLeft',
bounceInRight:'bounceInRight',
bounceInUp:'bounceInUp',
bounceOut:'bounceOut',
bounceOutDown:'bounceOutDown',
bounceOutLeft:'bounceOutLeft',
bounceOutRight:'bounceOutRight',
bounceOutUp:'bounceOutUp',
fadeIn:'fadeIn',
fadeInDown:'fadeInDown',
fadeInDownBig:'fadeInDownBig',
fadeInLeft:'fadeInLeft',
fadeInLeftBig:'fadeInLeftBig',
fadeInRight:'fadeInRight',
fadeInRightBig:'fadeInRightBig',
fadeInUp:'fadeInUp',
fadeInUpBig:'fadeInUpBig',
fadeOut:'fadeOut',
fadeOutDown:'fadeOutDown',
fadeOutDownBig:'fadeOutDownBig',
fadeOutLeft:'fadeOutLeft',
fadeOutLeftBig:'fadeOutLeftBig',
fadeOutRight:'fadeOutRight',
fadeOutRightBig:'fadeOutRightBig',
fadeOutUp:'fadeOutUp',
fadeOutUpBig:'fadeOutUpBig',
flip:'flip',
flipInX:'flipInX',
flipInY:'flipInY',
flipOutX:'flipOutX',
flipOutY:'flipOutY',
lightSpeedIn:'lightSpeedIn',
lightSpeedOut:'lightSpeedOut',
rotateIn:'rotateIn',
rotateInDownLeft:'rotateInDownLeft',
rotateInDownRight:'rotateInDownRight',
rotateInUpLeft:'rotateInUpLeft',
rotateInUpRight:'rotateInUpRight',
rotateOut:'rotateOut',
rotateOutDownLeft:'rotateOutDownLeft',
rotateOutDownRight:'rotateOutDownRight',
rotateOutUpLeft:'rotateOutUpLeft',
rotateOutUpRight:'rotateOutUpRight',
slideInUp:'slideInUp',
slideInDown:'slideInDown',
slideInLeft:'slideInLeft',
slideInRight:'slideInRight',
slideOutUp:'slideOutUp',
slideOutDown:'slideOutDown',
slideOutLeft:'slideOutLeft',
slideOutRight:'slideOutRight',
zoomIn:'zoomIn',
zoomInDown:'zoomInDown',
zoomInLeft:'zoomInLeft',
zoomInRight:'zoomInRight',
zoomInUp:'zoomInUp',
zoomOut:'zoomOut',
zoomOutDown:'zoomOutDown',
zoomOutLeft:'zoomOutLeft',
zoomOutRight:'zoomOutRight',
zoomOutUp:'zoomOutUp',
hinge:'hinge',
rollIn:'rollIn',
rollOut:'rollOut'
}