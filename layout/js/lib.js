function e_ObserverList(){this.eObserverList=[]}function e_Subject(){this.eObservers=new e_ObserverList}function e_Observer(){this.update=function(e){this.handleEvent(e)}}function preventDefault(e){e=e||window.event,e.preventDefault&&e.preventDefault(),e.returnValue=!1}function preventDefaultForScrollKeys(e){return keys[e.keyCode]?(preventDefault(e),!1):void 0}function disableScroll(){window.addEventListener&&window.addEventListener("DOMMouseScroll",preventDefault,!1),window.onwheel=preventDefault,window.onmousewheel=document.onmousewheel=preventDefault,window.ontouchmove=preventDefault,document.onkeydown=preventDefaultForScrollKeys}function enableScroll(){window.removeEventListener&&window.removeEventListener("DOMMouseScroll",preventDefault,!1),window.onmousewheel=document.onmousewheel=null,window.onwheel=null,window.ontouchmove=null,document.onkeydown=null}var Page=function(e,t){if(this.settings={animations:!0,pageTitle:"Abstract"},this.$el=t||null,null==this.$el)throw new Error("Element is equal to null");$.extend(this.settings,e),this.Events=Events.getInstance()};Page.prototype.log=function(){console.log(this.settings.pageTitle)};var Page_Choices=function(){Page.apply(this,arguments);var e={animationSpeed:.75};$.extend(this.settings,e);var i=this.$el,n=this;return this.visibleFlag=!1,this.currentChoiceList=0,this.decisionList=[null,null,null],this.init=function(){this.decisionProgressBar=new DecisionProgressBar({},$(".decision-progress-bar")),this.buildChoiceLists(),this.Events.addObserver_Scroll(this),this.Events.addObserver_Click(this)},this.buildChoiceLists=function(){this.choiceLists=[],i.find("section.choice").each(function(){n.choiceLists[n.choiceLists.length]=new ChoiceList({},$(this))})},this.goTo_NextChoiceList=function(e){this.u_UpdateChoice(e,this.currentChoiceList),this.a_NextChoiceList()},this.goTo_Result=function(){this.Results=new Page_Results({pageTitle:"Results Page"},$(".page_results"),this)},this.handleEvent=function(e){switch(e.type){case"scroll":this.e_Scroll(e);break;case"click":this.e_Click(e)}},this.e_Scroll=function(){window.pageYOffset>i.offset().top-$(window).height()&&0==this.visibleFlag&&(this.a_RiseIn(),this.visibleFlag=!0)},this.e_Click=function(e){t=e.target,p=t.parentElement;var i=null,o=this.u_findCurrentChoice();if("A"==t.nodeName?i=p:"A"==p.nodeName?i=p.parentElement:"A"==p.parentElement.nodeName&&(i=p.parentElement.parentElement),null!=i){e.preventDefault();for(var s=0;s<o.choices.length;s++)o.choices[s].$el[0]==i&&(i=o.choices[s],n.goTo_NextChoiceList(i,o));this.u_CheckDecisions()&&null!=i&&this.goTo_Result()}},this.a_RiseIn=function(){var e=this.u_findCurrentChoice().$el,t=i.find("section");t.eq(0).addClass("current"),TweenLite.to(i[0],n.settings.animationSpeed,{"padding-top":0,opacity:"1",onComplete:function(){TweenLite.to(t,n.settings.animationSpeed,{"padding-left":"20%"}),n.a_DecisionProgressBar_SlideIn(n.settings.animationSpeed)}}),e.css({display:"block"})},this.a_DecisionProgressBar_SlideIn=function(){this.decisionProgressBar.a_SlideIn()},this.a_NextChoiceList=function(){var e=this.currentChoiceList,t=this.currentChoiceList+1;i.find("section").eq(t).css({left:"100%",position:"absolute"}),TweenLite.to(window,n.settings.animationSpeed,{scrollTo:{y:0},ease:Power2.easeOut}),TweenLite.to(i.find("section").eq(e)[0],n.settings.animationSpeed,{left:"-100%",ease:Power2.easeOut}),TweenLite.to(i.find("section").eq(t)[0],n.settings.animationSpeed,{display:"block",left:0,ease:Power2.easeOut}),i.find("section.current").removeClass("current"),i.find("section").eq(t).addClass("current"),this.currentChoiceList=t},this.u_findCurrentChoice=function(){var e=null;return i.find("section").hasClass("current")?(e=this.choiceLists[i.find("section").index($(".current"))],this.currentChoiceList=i.find("section").index($(".current"))):(e=this.choiceLists[0],this.currentChoiceList=0),e},this.u_UpdateChoice=function(e,t){this.decisionList[t]=e,this.decisionProgressBar.u_UpdateChoice(e,t)},this.u_CheckDecisions=function(){for(var e=!0,t=0;t<this.decisionList.length;t++)null==this.decisionList[t]&&(e=!1);return e},this.init(),this};Page_Choices.prototype=Object.create(Page.prototype),Page_Choices.prototype.constructor=Page_Choices;var Page_Main=function(){Page.apply(this,arguments);var e={};$.extend(this.settings,e);this.$el;return this};Page_Main.prototype=Object.create(Page.prototype),Page_Main.prototype.constructor=Page_Main;var Page_Results=function(e,t,i){Page.apply(this,arguments);var n={animationSpeed:1};$.extend(this.settings,n);this.$el;return this.init=function(e){this.Decision=e,this.a_SlideIn()},this.init(i),this};Page_Results.prototype=Object.create(Page.prototype),Page_Results.prototype.constructor=Page_Results;var Page_Splash=function(){Page.apply(this,arguments);var e={animationSpeed:1};$.extend(this.settings,e);var t=this.$el,i=this,n=!1;return this.init=function(){$(window).scrollTop(0),this.Events.addObserver_Scroll(this),this.Events.addObserver_KeyUp(this)},this.handleEvent=function(e){switch(e.type){case"scroll":this.e_Scroll(e);break;case"keyup":this.e_KeyUp(e)}},this.e_Scroll=function(e){var o=0;0==n&&(window.pageYOffset<t.height()&&window.pageYOffset>o?i.a_SlideScrollDown(e):window.pageYOffset<o&&TweenLite.to(window,1,{scrollTo:{y:0},ease:Power2.easeOut,overwrite:"all"}))},this.e_KeyUp=function(e){var t=40;e.keyCode==t&&0==n&&i.a_SlideScrollDown(e)},this.a_SlideScrollDown=function(){disableScroll(),TweenLite.to(window,i.settings.animationSpeed,{scrollTo:{y:t.height()},ease:Power2.easeOut,onComplete:function(){enableScroll(),t.css({display:"none"}),$(window).scrollTop(0)}}),TweenLite.to(t[0],i.settings.animationSpeed,{opacity:0}),n=!0},this.init(),this};Page_Splash.prototype=Object.create(Page.prototype),Page_Splash.prototype.constructor=Page_Splash;var Animation=function(e,t){if(this.settings={animate:!0,animationSpeed:.4,delay:200,animationSpeed_MouseFollow:100,states:null},this.$el=t||null,null==this.$el)throw new Error("Element is equal to null");$.extend(this.settings,e)};Animation.prototype.log=function(){console.log("Working!")},Animation.prototype.animate=function(){throw new Error("What are you doing? I'm still abstract.")},Animation.prototype.stopAnimation=function(){throw new Error("What are you doing? I'm still abstract.")},Animation.prototype.handleEvent=function(){throw new Error("What are you doing? I'm still abstract.")};var Module=function(e,t){if(this.settings={title:"Page Object",animated:!0,interactive:!0},this.$el=t||null,null==this.$el)throw new Error("Element is equal to null");$.extend(this.settings,e)};Module.prototype.log=function(){console.log("Page Object: "+this.settings.title)},Module.prototype.animate=function(){throw new Error("What are you doing? I'm still abstract.")},Module.prototype.stopAnimation=function(){throw new Error("What are you doing? I'm still abstract.")},Module.prototype.handleEvent=function(){throw new Error("What are you doing? I'm still abstract.")};var Choice=function(){Module.apply(this,arguments);var e={animationSpeed:.3};$.extend(this.settings,e);var t=this.$el,i=this;return this.init=function(){t.on("mouseenter",i.e_MouseEnter).on("mouseleave",i.e_MouseLeave),this.value=t.data("value"),this.colors={bg:t.data("bg"),bgShade:t.data("bgshade")},t.find("div").css({background:this.colors.bg}),t.find("div span").css({background:this.colors.bgShade})},this.e_MouseEnter=function(){i.a_IllustrationHover(),i.a_CaptionHover()},this.e_MouseLeave=function(){i.a_IllustrationHoverCancel(),i.a_CaptionHoverCancel()},this.a_IllustrationHover=function(){TweenLite.to(t.find("div>span")[0],i.settings.animationSpeed,{width:"100%",height:"100%","margin-left":"-50%","margin-top":"0"})},this.a_IllustrationHoverCancel=function(){TweenLite.to(t.find("div>span")[0],i.settings.animationSpeed,{width:"0",height:"0","margin-left":"0","margin-top":"50%"})},this.a_CaptionHover=function(){TweenLite.to(t.find("figure>span")[0],i.settings.animationSpeed,{width:"100%"}),TweenLite.to(t.find("figure>h4")[0],i.settings.animationSpeed,{color:"#ffffff"})},this.a_CaptionHoverCancel=function(){TweenLite.to(t.find("figure>span")[0],i.settings.animationSpeed,{width:"0"}),TweenLite.to(t.find("figure>h4")[0],i.settings.animationSpeed,{color:"#E0DFDE"})},this.init(),this};Choice.prototype=Object.create(Module.prototype),Choice.prototype.constructor=Choice;var ChoiceList=function(){Module.apply(this,arguments);var e={};$.extend(this.settings,e),$.extend(this,new e_Subject);var t=this.$el,i=this;return this.init=function(){this.choices=[],t.find(".choice-list>li").each(function(e){i.choices[i.choices.length]=new Choice({},$(this)),i.addObserver(i.choices[e])})},this.init(),this};ChoiceList.prototype=Object.create(Module.prototype),ChoiceList.prototype.constructor=ChoiceList;var DecisionNavigation=function(){Module.apply(this,arguments);var e={};$.extend(this.settings,e);this.$el;return this};DecisionNavigation.prototype=Object.create(Module.prototype),DecisionNavigation.prototype.constructor=DecisionNavigation;var DecisionProgressBar=function(){Module.apply(this,arguments);var e={animationSpeed:.75};$.extend(this.settings,e);var t=this.$el,i=this;return this.decisionList=[null,null,null],this.a_SlideIn=function(){TweenLite.to(t[0],i.settings.animationSpeed,{"margin-left":0})},this.a_UpdateChoice=function(e){var n=this.decisionList[e].colors.bg;t.find("li span").eq(e).css({background:n}),t.find("li h3").eq(e).html(this.decisionList[e].value),TweenLite.to(t.find("span").eq(e)[0],i.settings.animationSpeed,{width:"200%",height:"200%","margin-left":"-100%","margin-top":"-50%"})},this.u_UpdateChoice=function(e,t){this.decisionList[t]=e,this.a_UpdateChoice(t)},this};DecisionProgressBar.prototype=Object.create(Module.prototype),DecisionProgressBar.prototype.constructor=DecisionProgressBar;var ResultChoiceList=function(){Module.apply(this,arguments);var e={};$.extend(this.settings,e);this.$el;return this};ResultChoiceList.prototype=Object.create(Module.prototype),ResultChoiceList.prototype.constructor=ResultChoiceList;var ResultControls=function(){Module.apply(this,arguments);var e={};$.extend(this.settings,e);this.$el;return this};ResultControls.prototype=Object.create(Module.prototype),ResultControls.prototype.constructor=ResultControls;var ResultDisplay=function(){Module.apply(this,arguments);var e={};$.extend(this.settings,e);this.$el;return this};ResultDisplay.prototype=Object.create(Module.prototype),ResultDisplay.prototype.constructor=ResultDisplay;var Splash=function(){Module.apply(this,arguments);var e={};$.extend(this.settings,e);this.$el;return this};Splash.prototype=Object.create(Module.prototype),Splash.prototype.constructor=Splash;var Events=function(){function e(){var e=this;return this.e_MouseMove=new e_Subject,this.e_KeyUp=new e_Subject,this.e_Click=new e_Subject,this.e_Scroll=new e_Subject,this.e_MouseEnter=new e_Subject,this.e_MouseLeave=new e_Subject,$(document).on("mousemove",function(t){e.e_MouseMove.notify(t)}).on("keyup",function(t){e.e_KeyUp.notify(t)}).on("click",function(t){e.e_Click.notify(t)}).on("scroll",function(t){e.e_Scroll.notify(t)}).on("mouseenter",function(t){e.e_MouseEnter.notify(t)}).on("mouseleave",function(t){e.e_MouseLeave.notify(t)}),{addObserver_MouseEnter:function(t){$.extend(t,new e_Observer),e.e_MouseEnter.addObserver(t)},removeObserver_MouseEnter:function(t){e.e_MouseEnter.removeObserver(t)},addObserver_MouseLeave:function(t){$.extend(t,new e_Observer),e.e_MouseLeave.addObserver(t)},removeObserver_MouseLeave:function(t){e.e_MouseLeave.removeObserver(t)},addObserver_MouseMove:function(t){$.extend(t,new e_Observer),e.e_MouseMove.addObserver(t)},removeObserver_MouseMove:function(t){e.e_MouseMove.removeObserver(t)},addObserver_KeyUp:function(t){$.extend(t,new e_Observer),e.e_KeyUp.addObserver(t)},removeObserver_KeyUp:function(t){e.e_KeyUp.removeObserver(t)},addObserver_Click:function(t){$.extend(t,new e_Observer),e.e_Click.addObserver(t)},removeObserver_Click:function(t){e.e_Click.removeObserver(t)},addObserver_Scroll:function(t){$.extend(t,new e_Observer),e.e_Scroll.addObserver(t)},removeObserver_Scroll:function(t){e.e_Scroll.removeObserver(t)}}}var t;return{getInstance:function(){return t||(t=e()),t}}}();e_ObserverList.prototype.add=function(e){return this.eObserverList.push(e)},e_ObserverList.prototype.count=function(){return this.eObserverList.length},e_ObserverList.prototype.get=function(e){return e>-1&&e<this.eObserverList.length?this.eObserverList[e]:void 0},e_ObserverList.prototype.indexOf=function(e,t){for(var i=t;i<this.eObserverList.length;){if(this.eObserverList[i]===e)return i;i++}return-1},e_ObserverList.prototype.remove=function(e){this.eObserverList.splice(e,1)},e_Subject.prototype.addObserver=function(e){this.eObservers.add(e)},e_Subject.prototype.removeObserver=function(e){this.eObservers.remove(this.eObservers.indexOf(e,0))},e_Subject.prototype.notify=function(e){for(var t=this.eObservers.count(),i=0;t>i;i++)this.eObservers.get(i).update(e)};