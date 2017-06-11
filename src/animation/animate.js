$(function(){
    $.fn.extend({
        visual: function (animationName, callback) {
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