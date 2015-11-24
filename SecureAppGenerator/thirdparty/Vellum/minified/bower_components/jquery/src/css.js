define(["./core","./var/pnum","./core/access","./css/var/rmargin","./css/var/rnumnonpx","./css/var/cssExpand","./css/var/isHidden","./css/curCSS","./css/defaultDisplay","./css/addGetHookIf","./css/support","./core/init","./css/swap","./core/ready","./selector"],function(s,a,h,u,o,c,j,w,p,t,q){var m=w.getStyles,i=/alpha\([^)]*\)/i,d=/opacity\s*=\s*([^)]*)/,e=/^(none|table(?!-c[ea]).+)/,g=new RegExp("^("+a+")(.*)$","i"),f=new RegExp("^([+-])=("+a+")","i"),n={position:"absolute",visibility:"hidden",display:"block"},v={letterSpacing:"0",fontWeight:"400"},l=["Webkit","O","Moz","ms"];w=w.curCSS;function b(C,A){if(A in C){return A}var D=A.charAt(0).toUpperCase()+A.slice(1),z=A,B=l.length;while(B--){A=l[B]+D;if(A in C){return A}}return z}function x(F,z){var G,D,E,A=[],B=0,C=F.length;for(;B<C;B++){D=F[B];if(!D.style){continue}A[B]=s._data(D,"olddisplay");G=D.style.display;if(z){if(!A[B]&&G==="none"){D.style.display=""}if(D.style.display===""&&j(D)){A[B]=s._data(D,"olddisplay",p(D.nodeName))}}else{E=j(D);if(G&&G!=="none"||!E){s._data(D,"olddisplay",E?G:s.css(D,"display"))}}}for(B=0;B<C;B++){D=F[B];if(!D.style){continue}if(!z||D.style.display==="none"||D.style.display===""){D.style.display=z?A[B]||"":"none"}}return F}function k(z,B,C){var A=g.exec(B);return A?Math.max(0,A[1]-(C||0))+(A[2]||"px"):B}function y(D,A,z,F,C){var B=z===(F?"border":"content")?4:A==="width"?1:0,E=0;for(;B<4;B+=2){if(z==="margin"){E+=s.css(D,z+c[B],true,C)}if(F){if(z==="content"){E-=s.css(D,"padding"+c[B],true,C)}if(z!=="margin"){E-=s.css(D,"border"+c[B]+"Width",true,C)}}else{E+=s.css(D,"padding"+c[B],true,C);if(z!=="padding"){E+=s.css(D,"border"+c[B]+"Width",true,C)}}}return E}function r(D,A,z){var C=true,E=A==="width"?D.offsetWidth:D.offsetHeight,B=m(D),F=q.boxSizing&&s.css(D,"boxSizing",false,B)==="border-box";if(E<=0||E==null){E=w(D,A,B);if(E<0||E==null){E=D.style[A]}if(o.test(E)){return E}C=F&&(q.boxSizingReliable()||E===D.style[A]);E=parseFloat(E)||0}return(E+y(D,A,z||(F?"border":"content"),C,B))+"px"}s.extend({cssHooks:{opacity:{get:function(B,A){if(A){var z=w(B,"opacity");return z===""?"1":z}}}},cssNumber:{columnCount:true,fillOpacity:true,flexGrow:true,flexShrink:true,fontWeight:true,lineHeight:true,opacity:true,order:true,orphans:true,widows:true,zIndex:true,zoom:true},cssProps:{"float":q.cssFloat?"cssFloat":"styleFloat"},style:function(B,A,H,C){if(!B||B.nodeType===3||B.nodeType===8||!B.style){return}var F,G,I,D=s.camelCase(A),z=B.style;A=s.cssProps[D]||(s.cssProps[D]=b(z,D));I=s.cssHooks[A]||s.cssHooks[D];if(H!==undefined){G=typeof H;if(G==="string"&&(F=f.exec(H))){H=(F[1]+1)*F[2]+parseFloat(s.css(B,A));G="number"}if(H==null||H!==H){return}if(G==="number"&&!s.cssNumber[D]){H+="px"}if(!q.clearCloneStyle&&H===""&&A.indexOf("background")===0){z[A]="inherit"}if(!I||!("set" in I)||(H=I.set(B,H,C))!==undefined){try{z[A]=H}catch(E){}}}else{if(I&&"get" in I&&(F=I.get(B,false,C))!==undefined){return F}return z[A]}},css:function(F,D,A,E){var C,G,z,B=s.camelCase(D);D=s.cssProps[B]||(s.cssProps[B]=b(F.style,B));z=s.cssHooks[D]||s.cssHooks[B];if(z&&"get" in z){G=z.get(F,true,A)}if(G===undefined){G=w(F,D,E)}if(G==="normal"&&D in v){G=v[D]}if(A===""||A){C=parseFloat(G);return A===true||s.isNumeric(C)?C||0:G}return G}});s.each(["height","width"],function(A,z){s.cssHooks[z]={get:function(D,C,B){if(C){return e.test(s.css(D,"display"))&&D.offsetWidth===0?s.swap(D,n,function(){return r(D,z,B)}):r(D,z,B)}},set:function(D,E,B){var C=B&&m(D);return k(D,E,B?y(D,z,B,q.boxSizing&&s.css(D,"boxSizing",false,C)==="border-box",C):0)}}});if(!q.opacity){s.cssHooks.opacity={get:function(A,z){return d.test((z&&A.currentStyle?A.currentStyle.filter:A.style.filter)||"")?(0.01*parseFloat(RegExp.$1))+"":z?"1":""},set:function(D,E){var C=D.style,A=D.currentStyle,z=s.isNumeric(E)?"alpha(opacity="+E*100+")":"",B=A&&A.filter||C.filter||"";C.zoom=1;if((E>=1||E==="")&&s.trim(B.replace(i,""))===""&&C.removeAttribute){C.removeAttribute("filter");if(E===""||A&&!A.filter){return}}C.filter=i.test(B)?B.replace(i,z):B+" "+z}}}s.cssHooks.marginRight=t(q.reliableMarginRight,function(A,z){if(z){return s.swap(A,{display:"inline-block"},w,[A,"marginRight"])}});s.each({margin:"",padding:"",border:"Width"},function(z,A){s.cssHooks[z+A]={expand:function(D){var C=0,B={},E=typeof D==="string"?D.split(" "):[D];for(;C<4;C++){B[z+c[C]+A]=E[C]||E[C-2]||E[0]}return B}};if(!u.test(z)){s.cssHooks[z+A].set=k}});s.fn.extend({css:function(z,A){return h(this,function(F,C,G){var E,B,H={},D=0;if(s.isArray(C)){E=m(F);B=C.length;for(;D<B;D++){H[C[D]]=s.css(F,C[D],false,E)}return H}return G!==undefined?s.style(F,C,G):s.css(F,C)},z,A,arguments.length>1)},show:function(){return x(this,true)},hide:function(){return x(this)},toggle:function(z){if(typeof z==="boolean"){return z?this.show():this.hide()}return this.each(function(){if(j(this)){s(this).show()}else{s(this).hide()}})}});return s});