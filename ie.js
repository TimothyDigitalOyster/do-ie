var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
var list = document.querySelector('.content ul');
var standardise = function(id) {
  if ($("#container_"+id+" label.error").attr("style") == "display:none;") $("#container_"+id+" label.error").remove();
  else if ($("#container_"+id+" label.error").attr("style") == "display: none;") $("#container_"+id+" label.error").remove();
  else if ($("#container_"+id+" label.error").attr("style") == "display: inline;") $("#container_"+id+" label.error").attr("style", "display:inline-block;");
}
var observer = new MutationObserver(function(mutations) {
  console.info("Change");

  mutations.forEach(function(mutation) {
    console.log(mutation);
    if (mutation.type === 'childList' ) {
      var list_values = [].slice.call(list.children).map( function(node) { return node.innerHTML; });
    }
    if (typeof list_values != 'undefined') {
      list_values.forEach(function(value) {

        var forFind = /for=\"(.*?)\"/g.exec(value);
        console.log(forFind[1]);
        console.info(value);
        if ("#group_"+forFind[1].length > 0) {
          console.log("group" + "#group_"+forFind[1].length);
          $("#container_"+forFind[1]+" label.error").remove();
          $('#group_'+forFind[1]).after(value);
        } else {
          console.log("else");
          $("#container_"+forFind[1]+" label.error").remove();
  			  $('#'+forFind[1]).after(value);
        }

    		standardise(forFind[1]);
        //console.log("mUpdates:"+forFind[1]);
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
  $("form label.error").remove();
  console.info("Updates");
  console.log(mutations);
  mutations.forEach(function(mutation) {
    var error_id, error_html;
    //console.log(mutation);
    if (mutation.target.control == '' || mutation.target.control == null) {
      error_id = mutation.target.htmlFor;
      error_html = mutation.target.outerHTML;
      console.log('id:'+error_id+" errorHtml:"+error_html);
      $("#container_"+error_id+" label.error").remove();
      $('#group_'+error_id).after(error_html);
 	    standardise(error_id);
    } else {
      error_id = mutation.target.control.id;
      error_html = mutation.target.outerHTML;
      $("#container_"+error_id+" label.error").remove();
      $('#'+error_id).after(error_html);
 	    standardise(error_id);
    }
  });
});

observer.observe(list, {
  attributes: true,
  childList: true,
  characterData: true
});

$('<style>.lp-pom-form-field label.error {display: inline-block;position: relative;top: 52px;width: 100%;text-align: left;color:red;}.lp-pom-form-field input.error, .lp-pom-form-field select.error {border:2px solid red !important;}.lp-form-errors {display: block !important;}</style>').appendTo($('head'));
