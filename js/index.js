var Utils=(function(){
	function iSetrem(){
		var html=document.getElementsByTagName("html")[0];
		var winW=document.documentElement.clientWidth;
		var value=100;
		value=winW<640?winW/640*100:value;
		html.style.fontSize=value+"px";
	}
	function iShare(){
		var imgUrl = 'http://zh.fzg360.com/zt/zt20180309/images/logo.jpg?v='+new Date().getTime();
		imgUrl = imgUrl.split('#')[0];
		function load_script(url, callback) {
			var head = document.getElementsByTagName('head')[0];
			var script = document.createElement('script');
			script.type = 'text/javascript';
			if (typeof callback == 'function') {
				var id = '$_' + parseInt(Math.random() * 1000000);
				window[id] = callback
			}
			script.src = url + (url.indexOf('?') == -1 ? '?' : '&') + 'callback=' + id;
			script.onload = script.onreadystatechange = function () {
				if ((!this.readyState || this.readyState === "loaded" || this.readyState === "complete")) {
					delete(window[id]);
					script.onload = script.onreadystatechange = null;
					if (head && script.parentNode) {
						head.removeChild(script)
					}
				}
			};
			head.insertBefore(script, head.firstChild)
		}
		var surl = window.location.href.split('#')[0];
		var JCF = 'http://jsb.fzg360.com/jWeixin.php?';
		load_script(JCF + 'url=' + encodeURIComponent(surl), function (conf) {
			conf['jsApiList'] = ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone'];
			wx.config(conf);
			var title = document.title;
			var desc = ((k = document.getElementsByName('description')) && k.length > 0 && k[0].content) || '';
			wx.ready(function () {
				wx.onMenuShareAppMessage({
					title: title,
					desc: desc,
					link: surl,
					imgUrl: imgUrl,
					type: 'link',
					dataUrl: '',
					success: function () {}, cancel: function () {}
				});
				wx.onMenuShareTimeline({
					title: title,
					link: surl,
					imgUrl: imgUrl,
					success: function () {}, cancel: function () {}
				});
			})
		});
	}
	function browser(){
		var u = navigator.userAgent, app = navigator.appVersion;
		return {
			trident: u.indexOf('Trident') > -1, //IE内核
			presto: u.indexOf('Presto') > -1, //opera内核
			webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
			gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,//火狐内核
			mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
			ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
			android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, //android终端
			iPhone: u.indexOf('iPhone') > -1 , //是否为iPhone或者QQHD浏览器
			iPad: u.indexOf('iPad') > -1, //是否iPad
			webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
			weixin: u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
			qq: u.match(/\sQQ/i) == " qq" //是否QQ
		};
	}
	function iMusic(){
		var music = document.getElementById("music");
		var music_bg = music.getElementsByClassName('music_bg')[0];
		var music_pic = music.getElementsByClassName('music_pic')[0];
		var aud = music.getElementsByClassName('aud')[0];
		if(browser().ios){
			music_bg.style.display = 'none';
			music_pic.style.animation = 'none';
			aud.pause();
			var flag=false;
			document.addEventListener("touchstart",function(e){
				if(!flag){
					music_bg.style.display = 'block';
					music_pic.style.animation = 'music 2s linear infinite';
					aud.play();
					flag=true;
				}else if(e.target.id=="music_pic"){
					music_bg.style.display = 'none';
					music_pic.style.animation = 'none';
					aud.pause();
					flag=false;
				}
			});
		}else{
			var music_sta = 1;
			music.onclick = function(){
				if(music_sta==1){
					music_bg.style.display = 'none';
					music_pic.style.animation = 'none';
					aud.pause();
					music_sta = 2;
				}else if(music_sta==2){
					music_bg.style.display = 'block';
					music_pic.style.animation = 'music 2s linear infinite';
					aud.play();
					music_sta = 1;
				}
			};
		}
	}
	function iSwiper(){
		new Swiper(".swiper-container",{
			direction:"vertical",
			loop:true,
			onSlideChangeEnd:function(swiper){
				var slideAry=swiper.slides;
				var curIn=swiper.activeIndex;
				var total=slideAry.length;
				var targetId="page";
				switch(curIn){
					case 0:
						targetId+=total-2;
						break;
					case (total-1):
						targetId+=1;
						break;
					default:
						targetId+=curIn;
				}
				[].forEach.call(slideAry,function(__item,index){
					if(curIn==index){
						__item.id=targetId;
						return;
					}
					__item.id="";
				});
			}
		});
	}
	return{
		init:function(){
			iSetrem();
			window.addEventListener("resize",iSetrem);
			iShare();
			window.addEventListener("load",iMusic);
			window.addEventListener("load",iSwiper);
		}
	}
}());

Utils.init();





