window.onload=function(){
	var EventUtil = {
		//添加事件
		addEvent: function(element,type,callback){
			if(element.addEventListener){
				element.addEventListener(type,callback,false);
			}else if(element.attachEvent){
				element.attachEvent('on'+type,callback);
			}else{
				element['on'+type] = callback;
			}
		},
		//移除事件
		removeEvent: function(element,type,callback){
			if(element.removeEventListener){
				element.removeEventListener(type,callback,false);
			}else if(element.detachEvent){
				element.detachEvent('on'+type,callback);
			}else{
				element['on'+type] = null;
			}
		},
		//获取事件对象
		getEvent: function(event){
			return event?event:window.event;
		},
		//获取事件目标
		getTarget: function(event){
			return event.target||event.srcElement;
		},
		//取消默认行为
		preventDefault: function(event){
			if(event.preventDefault){
				event.preventDefault();
			}else{
				event.returnValue = false;
			}
		},
		//阻止冒泡
		stopPropagation: function(event){
			if(event.stopPropagation){
				event.stopPropagation();
			}else{
				event.cancelBubble = true;
			}
		}
	};
	var magni = document.getElementById("magni");
	var smallBox = document.getElementById("small-box");
	var floatBox = document.getElementById("float-box");
	var bigBox = document.getElementById("big-box");
	var bigBoxImg = document.getElementById("big-box").getElementsByTagName("img")[0];
	//鼠标移入显示浮动窗口和放大窗口，移出隐藏
	EventUtil.addEvent(smallBox,'mouseover',function(){
		floatBox.style.display = "block";
		bigBox.style.display = "block";
	});
	EventUtil.addEvent(smallBox,'mouseout',function(){
		floatBox.style.display = "none";
		bigBox.style.display = "none";
	});
	EventUtil.addEvent(smallBox,'mousemove',magniMove);
	//放大窗口随浮动窗口移动
	function magniMove(event){
		var event = EventUtil.getEvent(event);
		//console.log(event);
		//设置浮动小窗口绝对定位，使之跟随鼠标移动
		var left = event.clientX - magni.offsetLeft - smallBox.offsetLeft - floatBox.offsetWidth/2;
		var top = event.clientY - magni.offsetTop - smallBox.offsetTop - floatBox.offsetHeight/2;
		if(left < 0){
			left = 0;
		}else if (left > (smallBox.offsetWidth - floatBox.offsetWidth)){
			left = smallBox.offsetWidth - floatBox.offsetWidth;
		}
		if(top < 0){
			top = 0;
		}else if (top > (smallBox.offsetHeight - floatBox.offsetHeight)){
			top = smallBox.offsetHeigh - floatBox.offsetHeight;
		}
		floatBox.style.left = left + 'px';
		floatBox.style.top = top + 'px';
		//设置大图片相对于放大窗口的绝对定位，使之跟随浮动窗口移动;
		bigBoxImg.style.left = -left*bigBoxImg.offsetWidth/smallBox.offsetWidth + 'px';
		bigBoxImg.style.top = -top*bigBoxImg.offsetHeight/smallBox.offsetHeight + 'px';
	}
}