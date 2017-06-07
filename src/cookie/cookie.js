/* jaffy 1.1
plugins:cookie
*/

window.jaffy = window.jaffy || {};

window.jaffy.cookie = (function(){
    function getCookies(){
    	var cookieDOM = [];
    	var allCookies = [];
    	
    	if(document.cookie.length){
    	    allCookies = document.cookie.split(';');
    	    var cookie, cItem, cookieDOM = [];
    	    
    	    for (var i = 0; i < allCookies.length; i++) {
    	    	cItem = allCookies[i];
    	        while (cItem.charAt(0) == ' ') cItem = cItem.substring(1, cItem.length);
    	        if (cItem.charAt(0) !== '_'){
    	        	cookie = cItem.split('=');
    	        	if(cookie[1]){
    	        		cookieDOM[cookie[0]] = cookie[1];
    	        	}else{
    	        		cookieDOM[cookie[0]] = undefined;
    	        	}
    	        }
    	    }
        }
    	
    	return cookieDOM;
    }
    
    function deleteCookie(cookieName){
    	setCookie(cookieName, null, -1);
    }
    
    function setSessionCookie(cookieName, cookieValue){
    	setCookie(cookieName, cookieValue, null);
    }
    
    function setCookieRaw(cookieName, cookieValue, expiry){
    	var d = new Date((expiry || null));
        var expires = "expires="+ d.toUTCString();
        document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=/";
    }
    
    function setCookie(cookieName, cookieValue, expiry){
    	var expires = "";
    	var d = new Date();
    	
    	if(expiry || expiry === undefined){
            d.setTime(d.getTime() + ((expiry || 30)*24*60*60*1000));
            expires = "expires="+ d.toUTCString();
    	}
    	
        document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=/";
    }

    function getCookie(cookieName){
    	var cookieDOM = getCookies();
    	
    	if(cookieDOM[cookieName]){
    		return cookieDOM[cookieName];
    	}else{
    		return null;
    	}
    }
    
    return {
    	all: getCookies,
    	get: getCookie,
    	set: setCookie,
    	setSession: setSessionCookie,
    	setRaw: setCookieRaw,
    	remove: deleteCookie
    };

})();
