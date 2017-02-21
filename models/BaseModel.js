
exports.getTime = function(){
	var date = new Date();
	var m = date.getMonth() + 1,
		d = date.getDate(),
		h = date.getHours(),
		i = date.getMinutes(),
		s = date.getSeconds();
	return date.getFullYear()+'-'+format(m)+'-'+format(d)+' '+format(h)+':'+format(i)+':'+format(s);
}
exports.getLength = function(o){
	if((typeof o) == 'string') return o.length;
	if((typeof o) == 'object'){
		var j = 0;
		for(var i in o){
			j++;
		}
		return j;
	}
}
exports.arrToStr = function(arr){
	if((typeof arr) == 'string') return arr;
	var str = '',j=1,length = this.getLength(arr);
	for(var i in arr){
		if(j == length){
			str +=' '+ i + '="'+ arr[i] + '" ';
		}else{
			str +=' '+ i + '="'+ arr[i] + '" and ';
			j++;
		}
	}
	return str;
}
exports.keyValues = function(arr){
	var keys = "",values="",j = 1,
		length = this.getLength(arr);
	for(var i in arr){
		if(j == length){
			keys += i;
			values += "\""+arr[i]+"\"";
		}else{
			keys += i + ",";
			values += "\""+arr[i] + "\",";
		}
		j++;
	}
	return [keys,values];
}
function format(str){
	if(str < 10) return '0'+str;
	return str;
}