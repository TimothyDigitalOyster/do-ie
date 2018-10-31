var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
var list = document.querySelector('.content ul');
var standardise = function(id) {
  if ($("#container_"+id+" label.error").attr("style") == "display:none;") $("#container_"+id+" label.error").remove();
  else if ($("#container_"+id+" label.error").attr("style") == "display: none;") $("#container_"+id+" label.error").remove();
  else if ($("#container_"+id+" label.error").attr("style") == "display: inline;") $("#container_"+id+" label.error").attr("style", "display:inline-block;");
}
var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {

    	if (mutation.type === 'childList' ) {
        	var list_values = [].slice.call(list.children).map( function(node) { return node.innerHTML; });
      	}
      	if (typeof list_values != 'undefined') {
      		list_values.forEach(function(value) {
        		var forFind = /for=\"(.*?)\"/g.exec(value);
        		$("#container_"+forFind[1]+" label.error").remove();
				$('#'+forFind[1]).after(value);
  				standardise(forFind[1]);
                console.log("mUpdates:"+forFind[1]);
      			updates.observe(document.querySelector(".content [for='"+forFind[1]+"']"), {
		  			attributes: true,
		  			childList: false,
		  			characterData: true
	    		});
      		});
        }
    });
});

var updates = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    console.log(mutation);
    var error_id = mutation.target.control.id;
  	//console.log("mChange:"+error_id);
    var error_html = mutation.target.outerHTML;
    $("#container_"+error_id+" label.error").remove();
    $('#'+error_id).after(error_html);
  	standardise(error_id);
  });
});

observer.observe(list, {
  	attributes: true,
  	childList: true,
  	characterData: true
});


$('head').append( $('<link rel="stylesheet" type="text/css" />').attr('href', 'https://timothydigitaloyster.github.io/UnbounceMutantErrors/main.css') );
