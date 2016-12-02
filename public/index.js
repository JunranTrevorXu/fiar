	
	document.getElementById("pve").onclick = function () {
		
		alert("pve");
		xhrGet(encodeURI("SimpleServlet?start=0"), function(responseText){
			// add to document
			alert("pve : "+responseText);

		}, function(err){
			console.log(err);
		});
	}
	
	document.getElementById("pvp").onclick = function () {
		
		alert("pvp");
		xhrGet(encodeURI("SimpleServlet?start=1"), function(responseText){
			// add to document
			alert("pvp : "+responseText);

		}, function(err){
			console.log(err);
		});
	}
	
//utilities
function createXHR(){
	if(typeof XMLHttpRequest != 'undefined'){
		return new XMLHttpRequest();
	}else{
		try{
			return new ActiveXObject('Msxml2.XMLHTTP');
		}catch(e){
			try{
				return new ActiveXObject('Microsoft.XMLHTTP');
			}catch(e){}
		}
	}
	return null;
}
function xhrGet(url, callback, errback){
	var xhr = new createXHR();
	xhr.open("GET", url, true);
	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4){
			if(xhr.status == 200){
				callback(xhr.responseText);
			}else{
				errback('service not available');
			}
		}
	};
	xhr.timeout = 3000;
	xhr.ontimeout = errback;
	xhr.send();
}