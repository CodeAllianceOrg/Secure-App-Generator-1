define(["../var/support"],function(a){(function(){var d,f,b,c,e;f=document.createElement("div");f.setAttribute("className","t");f.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";c=f.getElementsByTagName("a")[0];b=document.createElement("select");e=b.appendChild(document.createElement("option"));d=f.getElementsByTagName("input")[0];c.style.cssText="top:1px";a.getSetAttribute=f.className!=="t";a.style=/top/.test(c.getAttribute("style"));a.hrefNormalized=c.getAttribute("href")==="/a";a.checkOn=!!d.value;a.optSelected=e.selected;a.enctype=!!document.createElement("form").enctype;b.disabled=true;a.optDisabled=!e.disabled;d=document.createElement("input");d.setAttribute("value","");a.input=d.getAttribute("value")==="";d.value="t";d.setAttribute("type","radio");a.radioValue=d.value==="t"})();return a});