/* jaffy 1.1
plugins:rest
*/

window.jaffy = window.jaffy || {};

window.jaffy.RestAPI = function() {
	var instance = { 
			url : null,
			params : {},
			headers : {},
			body : {},
			sync : false,
			method : "GET",
			scope : null,
			success : null,
			error : null,
			failure : null,
			nullFilter: false,
			contentType: null
		};
	var that = this;
	function setParam(param1, param2){
		if(param1 && typeof param1 === "string"){
			instance.params[param1] = param2
		}else if(!param2 && param1 && typeof param1 === "object" && !param1 instanceof Array ){
			jQuery.extend(instance.params, param1);
		}else if(!param2 && param1 && param1 instanceof Array){
			for(var param in param1){
				jQuery.extend(instance.params, param1[param]);
			}
		}
	}
	function setHeader(param1, param2){
		if(param1 && typeof param1 === "string"){
			instance.headers[param1] = param2
		}else if(!param2 && param1 && typeof param1 === "object" && !param1 instanceof Array ){
			jQuery.extend(instance.headers, param1);
		}else if(!param2 && param1 && param1 instanceof Array){
			for(var param in param1){
				jQuery.extend(instance.headers, param1[param]);
			}
		}
	}
	function setBody(param1, param2){
		if(param1 && typeof param1 === "string"){
			instance.body[param1] = param2
		}else if(!param2 && param1 && typeof param1 === "object" && !param1 instanceof Array ){
			jQuery.extend(instance.body, param1);
		}else if(!param2 && param1 && param1 instanceof Array){
			for(var param in param1){
				jQuery.extend(instance.body, param1[param]);
			}
		}
	}
	function setPayload(param1, param2){
		instance.contentType = 'application/json';
		setBody(param1, param2);
	}
	
	
	function setUrl(url){
		if(url && typeof url==="string"){
			instance.url = url;
		}
	}
	
	function setMethod(method){
		if(method && typeof method === "string"){
			
			switch(method.toUpperCase()){
				case 'GET':
				case 'POST':
				case 'OPTIONS':
				case 'PUT':
				case 'DELETE':
				case 'PATCH':
				instance.method = method.toUpperCase();
				break;
			}
			
		}else{
			console.log("Invalid setMethod argument.");
		}
	}
	function GET(successCallback, errorCallback){
		setMethod("GET");
		execute(successCallback, errorCallback);
	}
	function POST(successCallback, errorCallback){
		setMethod("POST");
		execute(successCallback, errorCallback);
	}
	function OPTIONS(successCallback, errorCallback){
		setMethod("OPTIONS");
		execute(successCallback, errorCallback);
	}
	function PUT(successCallback, errorCallback){
		setMethod("PUT");
		execute(successCallback, errorCallback);
	}
	function DELETE(successCallback, errorCallback){
		setMethod("DELETE");
		execute(successCallback, errorCallback);
	}
	function PATCH(successCallback, errorCallback){
		setMethod("PATCH");
		execute(successCallback, errorCallback);
	}
	function debug(){
		console.log(instance.params);
	}
	
	function setScope(Obj){
		instance.scope = Obj;
	}
	
	function onError(errorCallback){
		if(errorCallback && typeof errorCallback === "function"){
			config.error = function(a,b,c){
				errorCallback.call({scope: this.scope}, a,b,c);
			}
		}
	}

	function execute(successCallback, errorCallback){
			var config = {};
			if(instance.url && instance.method){
				
				config.url = instance.url;
				config.method = instance.method;
				config.async = !instance.sync;
				config.dataType = "json";
				config.error = function(xhr, status, statusDesc){
					console.log(statusDesc);
				};

	/*			config.xhrFields=  {
				      withCredentials: true
				   };*/
				
				config.scope = instance.scope;
				
				config.headers = instance.headers;

				if(config.method === "GET"){
					config.data = instance.params
				}else{
					if(instance.contentType){
						config.contentType = 'application/json';
						config.data = JSON.stringify(instance.body);
					}else{
						config.data = instance.body
					}
					
					
					for(var param in instance.params){
						if(instance.params.hasOwnProperty(param)){
							config.url += (config.url.split('?')[1] ? '&':'?') + param + '=' + instance.params[param]
						}
					}
				}

				if(errorCallback && typeof errorCallback === "function"){
					config.error = function(a,b,c){
						errorCallback.call({scope: this.scope}, a,b,c);
					}
				}
				//console.log(config);
				$.ajax(config).then(function(data){
					if(successCallback && typeof successCallback === "function"){
						successCallback.call({scope: this.scope}, data);
					}
				});
			}else{
				console.log("Missing url");
			}
		
	}

	function sync(sync){
		instance.sync = sync || true;
	}
	
	return {
		setParam:setParam,
		setHeader:setHeader,
		setBody: setBody,
		setMethod: setMethod,
		setUrl: setUrl,
		GET: GET,
		POST: POST,
		OPTIONS:OPTIONS,
		PUT:PUT,
		DELETE:DELETE,
		PATCH:PATCH,
		sync: sync,
		execute: execute,
		onError:onError,
		setScope:setScope,
		debug: debug,
		setPayload: setPayload,
		METHOD: {POST : "POST", GET: "GET"}
	}
}