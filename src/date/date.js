/* jaffy 1.1
plugins:date
*/

window.jaffy = window.jaffy || {};

window.jaffy.date = (function(){
	
	function create(dateString, adjustment){
		var timeStamp, 
			adjustments = [],
			adjust, 
			adjustTimestamp = 0;
	
		if(typeof dateString === "undefined") {
			return new Date();
		}

		timeStamp =  new Date(dateString).getTime();

		if(isNaN(timeStamp) || timeStamp <= 0){
			timeStamp = new Date().getTime();
			adjustments = dateString.split('&');
			
		}else if (adjustment){
			adjustments = adjustment.split('&');
		}

			substitute = {
				"m": 60, "h": 3600,
				"D": 86400, "W": 604800, "M": 2635200, "Y": 31536000
			};
		while(adjustments.length){
			adjust = adjustments.shift();
			switch(adjust.substr(0,1)){
				case "-":
				adjustTimestamp += (-1 * adjust.substr(1,adjust.length -2) * substitute[adjust.substr(-1)] );
				break;
				case "+":
				adjustTimestamp += (adjust.substr(1,adjust.length -2) * substitute[adjust.substr(-1)] );
				break;
			default:
				adjustTimestamp += (adjust.substr(0,adjust.length -1) * substitute[adjust.substr(-1)] );
			}
		}
		
		return new Date(timeStamp + (adjustTimestamp * 1000));
	}
    
    return {
		create: create
	};

})();
