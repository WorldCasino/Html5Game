var netent_embed=function(){function e(e){var t={defaultWidth:e.defaultWidth,defaultHeight:e.defaultHeight,width:e.operatorConfiguration.width||e.defaultWidth,height:e.operatorConfiguration.height||e.defaultHeight,fullScreen:netent_tools.getBooleanValue(e.operatorConfiguration.fullScreen,!1),targetElement:e.operatorConfiguration.targetElement||netent_config_handling.defaultValues.targetElement,enforceRatio:netent_tools.getBooleanValue(e.operatorConfiguration.enforceRatio,!0)};if(!document.getElementById(t.targetElement))throw new netent_error_handling.GiError(16,"common.embed","targetElement",{value:t.targetElement});return t}function t(t){var n,r=e(t);return r.fullScreen&&(r.width=(window.innerWidth||document.documentElement.clientWidth)+"px",r.height=(window.innerHeight||document.documentElement.clientHeight)+"px"),n=netent_tools.resize(r.defaultWidth,r.defaultHeight,r.width,r.height,r.enforceRatio),t.width=n.width,t.height=n.height,t.targetElement=r.targetElement,t}return{updateTargetElementConfig:t}}(),netent_html_embed=function(){function e(e,t,n,o,i){var a=document.createElement("iframe");return a.setAttribute("id",e),a.setAttribute("src",t),a.setAttribute("frameBorder","0"),a.style.width=n.width,a.style.height=n.height,a.onload=function(){o(new netent_netentextend.Html(a,n))},a.onerror=function(e){i(18,r,e)},a}function t(t,o,i){var a,l,d;n(t.operatorConfiguration);try{t=netent_embed.updateTargetElementConfig(t),d=document.getElementById(t.targetElement),a=netent_launch_tools.createUrl(t.gameURL,t.operatorConfiguration),l=e(t.targetElement,a,t,o,i),d.parentNode.replaceChild(l,d)}catch(u){u instanceof netent_error_handling.GiError?i(u):i(18,r,u)}}function n(e){var t=[{from:"gameServerURL",to:"server"},{from:"language",to:"lang"},{from:"sessionId",to:"sessId"},{from:"casinoBrand",to:"operatorId"}];t.forEach(function(t){e.hasOwnProperty(t.from)&&(e[t.to]=e[t.from]),delete e[t.from]})}var r="netent_html_embed";return{init:t}}();