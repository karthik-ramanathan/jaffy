function newError(ErrorCode, ErrorMessage){
    var $trackedElement = $("[data-error *=" + ErrorCode + "]");

    if($trackedElement.length){
        $trackedElement.each(function(){
            var $container = $(this);
            var ErrorMessages = $(this).attr("data-error-" + ErrorCode) || ErrorMessage;

            if($(this).is("div")){
                $(this).find(".error").remove();
                if($.isArray(ErrorMessages)){
                    $(ErrorMessages).each(function(){
                        $("<div />", {
                            class: "error error-msg"
                        }).html(this).appendTo($container);
                    });
                }else{
                    $("<div />", {
                        class: "error error-msg"
                    }).html(ErrorMessages).appendTo($container);
                }

            }else{
                $(this).parent().find(".error").remove();
                $("<div />", {
                        class: "error error-msg"
                    }).html(ErrorMessages).insertAfter($container);
            }
        });
    }
}

function clearError(ErrorCode,elem){
    var $elem = elem ? $(elem) : $(document);
    var $trackedElements = ErrorCode ? $elem.find("[data-error *=" + ErrorCode + "]") : $elem.find("[data-error]");
    $trackedElements.each(function(){
        if($(this).is("div")){
            $(this).find(".error").remove();
        }else{
            $(this).parent().find(".error").remove();
        }
    });
}
