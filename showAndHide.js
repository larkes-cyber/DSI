function isOnVisibleSpace(element) {
	let bodyHeight = window.innerHeight;
    let elemRect = element.getBoundingClientRect();
    let offset   = elemRect.top;// - bodyRect.top;
  if(offset<0) return false;
  if(offset>bodyHeight) return false;
  return true;
}

let listenedElements = [];
window.onscroll = function() {
	listenedElements.forEach(item=>{

    let result = isOnVisibleSpace(item.el);
    

    if(item.el.isOnVisibleSpace && !result){
    	item.el.isOnVisibleSpace = false;
      item.outVisibleSpace(item.el);
      return;
    }

    if(!item.el.isOnVisibleSpace && result){
    	item.el.isOnVisibleSpace = true;
      item.inVisibleSpace(item.el);
      return;
    }
  });
}


function onVisibleSpaceListener(elem, cbIn, cbOut) {

  listenedElements.push({
  	el: elem,
    inVisibleSpace: cbIn,
    outVisibleSpace: cbOut    
  });
}

const elems=document.querySelectorAll('.ani');
elems.forEach(item=>{
    onVisibleSpaceListener(item, 
	el=>{

    el.classList.add('hideElem');
    el.classList.remove('showElem');
    
	},
	el=>{
        el.classList.remove('hideElem');
        el.classList.add('showElem');
	}
);  
})
