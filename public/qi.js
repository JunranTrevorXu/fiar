
	var i;
	var j;
	var index = 0;
	
	for (i = 0; i < 15; i++) {
		
		for (j = 0; j < 15; j++) {
		
			
			var _div = document.createElement('div');
			_div.className="cube";
			_div.id=i+","+j;
			/*if ((i+j) % 2 == 0) _div.style.backgroundColor="red";
			else _div.style.backgroundColor="green";
			_div.style.opacity = "1";
			*/
			document.getElementById("grid").appendChild(_div);
			
			document.getElementById(_div.id).onclick = function () {
		
				//alert(this.id);
				
				xhrGet(encodeURI("SimpleServlet?put="+this.id), function(responseText){
					// add to document
					alert(responseText);

				}, function(err){
					console.log(err);
				});
				
				var _zi = document.createElement('div');
				_zi.className="zi";
				if (index == 1) _zi.style.backgroundColor="white";
				else _zi.style.backgroundColor="black";
				index = 1 - index;
				document.getElementById(this.id).appendChild(_zi);
			}
		}
	}




xhrGet(encodeURI("SimpleServlet?name=jr"), function(responseText){
	// add to document
	alert(responseText);

}, function(err){
	console.log(err);
});

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
function parseJson(str){
	return window.JSON ? JSON.parse(str) : eval('(' + str + ')');
}
function prettyJson(str){
	// If browser does not have JSON utilities, just print the raw string value.
	return window.JSON ? JSON.stringify(JSON.parse(str), null, '  ') : str;
}
	
	
	
	
	
	
	
	
	
	
	