(function(a){if(typeof define==="function"&&define.amd){define("jstree.sort",["jquery","jstree"],a)}else{if(typeof exports==="object"){a(require("jquery"),require("jstree"))}else{a(jQuery,jQuery.jstree)}}}(function(b,a,c){if(b.jstree.plugins.sort){return}b.jstree.defaults.sort=function(e,d){return this.get_text(e)>this.get_text(d)?1:-1};b.jstree.plugins.sort=function(d,e){this.bind=function(){e.bind.call(this);this.element.on("model.jstree",b.proxy(function(g,f){this.sort(f.parent,true)},this)).on("rename_node.jstree create_node.jstree",b.proxy(function(g,f){this.sort(f.parent||f.node.parent,false);this.redraw_node(f.parent||f.node.parent,true)},this)).on("move_node.jstree copy_node.jstree",b.proxy(function(g,f){this.sort(f.parent,false);this.redraw_node(f.parent,true)},this))};this.sort=function(k,f){var h,g;k=this.get_node(k);if(k&&k.children&&k.children.length){k.children.sort(b.proxy(this.settings.sort,this));if(f){for(h=0,g=k.children_d.length;h<g;h++){this.sort(k.children_d[h],false)}}}}}}));