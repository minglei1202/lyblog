var islogin = false;
$(function(){
	var container = $(".container"),siteNav = $(".site-nav-logo"),sitenavoverlay = $(".site-nav-overlay"),navTabs = $(".nav-tabs-list-item"),
		login = $("#login"),
		sign = $(".login"),
		doLogin = $(".do-login"),
		logining = $(".logining"),
		loginedInfo = $(".logined-info"),
		loginFrame = $(".login-frame"),
		sitenavlist = $(".site-nav-list"),
		loginForm = $(".login-form"),
		userAccount = $(".user-account"),
		_islogin = $("._islogin");
	bindAction(siteNav,'click',function(){
		setCss(container,{'transform':'translate3d(280px, 0px, 0px)'});
		$(this).hide();
		sitenavoverlay.show(function(){
			bindAction($(this),'click',function(){
				delAttr(container,'style');
				$(this).hide(function(){
					siteNav.fadeIn(500);
				});
			})
		});
	})
	bindAction(login,'click',function(){
		setCss(sitenavlist,{'padding-top':'180px'});
		setCss(sign,{'left':'10px'});
	})
	bindAction(doLogin,'click',function(){
		setCss(sign,{'left':'-280px'});
		setCss(logining,{'left':'10px'});
		setTimeout(function(){
			$.post('/login',loginForm.serialize(),function(json){
				if(json.status == 1){
					islogin = true;
					userAccount.html(json.info.name);
					loginFrame.fadeOut(function(){
						loginedInfo.fadeIn(function(){
							setCss(sign,{'left':'10px'});
							setCss(logining,{'left':'280px'});
							$("#login").html("<i class='icons icon-log-out'></i>Sign out").attr("href","/logout");
							$("#setting").removeAttr('style').attr('href','/setting').find('.name').text(json.info.name);
							$(".logined-avatar").attr("src",json.info.avatar);
							setTimeout(function(){
								delAttr(container,'style');
								sitenavoverlay.hide(function(){
									siteNav.fadeIn(500);
								});
							},800);
						});
					});
				}else{
					islogin = false;
					setCss(sign,{'left':'10px'});
					setCss(logining,{'left':'280px'});
				}
			})
		},1000);
	})
	bindAction(_islogin,'click',function(){
		if(!islogin){
			login.trigger('click');
			return false;
		}
	})
	navTabs.each(function(){
		bindAction($(this),'click',function(){
			$(".nav-tabs-list-item.active").removeClass('active');
			$(this).addClass('active');
		})
	});
})