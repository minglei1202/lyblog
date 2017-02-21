$(function(){
	var barPreview = $("#Bar .preview"),
		preview = $('#Preview'),
		input = document.getElementById('Input'),
		Input = $("#Input"),
		inputhtml = "按照以下示例格式编辑文章:\r\n\r\n#一级标题\r\n##二级标题   ...\r\n######六级标题\r\n\r\n正文内容 **加粗** 正文内容 _斜体_ 正文内容 (两次换行为新段落)\r\n\r\n[插入超链接]("+"http://www.236v5.com/"+' "超链接介绍文字")\r\n'+"\r\n"+"![图片文字属性]("+"http://www.236v5.com/"+'images/footer-logo.jpg "图片介绍文字")\r\n'+"\r\n"+"行内代码`代码`区块\r\n"+"\r\n"+"`\r\n"+"//独立段落代码块\r\n"+"function(){\r\n"+"  var abc = 123;\r\n"+"}\r\n"+"`\r\n"+"\r\n"+"(三个*号为分割线)\r\n"+"***\r\n"+"\r\n"+">引用文本引用文本引用文本引用文本引用文本引用文本引用文本引用文本引用文本引用文本用文本引用文本\r\n"+"\r\n"+">第二段落引用文本\r\n"+">>嵌套引用\r\n"+"\r\n"+"+ 无序列表(“+”加号后有空格)\r\n"+"+ 无序列表\r\n"+"+ 无序列表\r\n"+"\r\n\r\n"+"1. 有序列表(点号后有空格)\r\n"+"2. 有序列表(加号后有空格)\r\n"+"3. 有序列表\r\n"+"\r\n"+"表格|项目1左对齐|项目2居中对齐|项目3右对齐\r\n"+"--- |:---       |:---:        |---:\r\n"+"行1 |左         |中           |右\r\n"+"行2 |A          |B            |C\r\n",
		help = $(".help"),
		publish = $("#Submit"),
		autoDraft = $(".auto_draft"),
		title = $("#Title"),
		container = $(".container"),
		siteNav = $(".site-nav-logo"),
		sign = $(".login"),
		sitenavlist = $(".site-nav-list"),
		sitenavoverlay = $(".site-nav-overlay"),
        aid = $("input[name=collect_id]").val();
	bindAction(barPreview,'click',function(){
		if(getCss(preview,'display') == 'block'){hidePreview();return;}
		showPreview();
	})
	bindAction(publish,'click',function(){
		if(!islogin){
			showNav();
			return;
		}
		setCss(autoDraft,{top:'0'});
		var content = marked(input.value);
		$.post('/dopublish',{title:title.val(),content:content,aid:aid},function(json){
			autoDraft.text(json.info);
			if(json.status == 1){
				title.val("");Input.val("");
			}
			setTimeout(function(){
				setCss(autoDraft,{top:'-25px'});
			},1000);
		})
	})
	input.oninput = function(){
		innerPreview(input);
	}
	bindAction(help,'click',function(){
		Input.val(inputhtml);
		showPreview();
	});
	function showNav(){
		setCss(container,{'transform':'translate3d(280px, 0px, 0px)'});
		siteNav.hide();
		sitenavoverlay.show(function(){
			bindAction($(this),'click',function(){
				delAttr(container,'style');
				$(this).hide(function(){
					siteNav.fadeIn(500);
				});
			})
			setCss(sitenavlist,{'padding-top':'180px'});
			setCss(sign,{'left':'10px'});
		});
	}
	function hidePreview(){
		$("#Wrap").attr("style","transition-duration: 500ms; max-width:860px; transition-timing-function: ease-in;")
		$("#Wrap .inputWrap").attr("style","transition-duration: 500ms; width: 100%; transition-timing-function: cubic-bezier(0, 1, 0.5, 1);");
		$("#Preview").delay(500).hide();
	}
	function showPreview(){
		innerPreview(input);
		$("#Wrap").attr("style","transition-duration: 500ms; max-width:100%; transition-timing-function: ease-in;")
		$("#Wrap .inputWrap").attr("style","transition-duration: 500ms; width: 50%; transition-timing-function: cubic-bezier(0, 1, 0.5, 1);");
		$("#Preview").delay(500).fadeIn(200);
	}
	function innerPreview(object){
		preview.html(marked(object.value));
	}
	function getCss(obj,attr){
		return obj.css(attr);
	}
})