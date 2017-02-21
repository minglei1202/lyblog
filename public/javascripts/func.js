function bindAction(obj,action,callback){
	obj.on(action,callback);
}
function setAttr(obj,params){
	obj.attr(params);
}
function delAttr(obj,attr){
	obj.removeAttr(attr);
}
function setCss(obj,params){
	obj.css(params);
}