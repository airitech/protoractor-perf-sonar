window.startTime = performance.now(); 
function isVisble() {
  var element = document.querySelectorAll("#todo-count"); 
  if (element == null || element.length == 0) { return false; }
  var style = window.getComputedStyle(element[0]);
  console.log(style.display);
  return style.display !== "none";
}
function checkShow() { 
  var isVisible = isVisble(); 
  if (window.beforeVisible == false) { 
    if (isVisible == true) { 
      window.endTime = performance.now(); 
      window.clearInterval(window.perfInterval); 
      console.log('clear');
    }
  }
  window.beforeVisible = isVisible; 
  console.log(isVisible);
}; 
window.perfInterval = window.setInterval(checkShow, 50); 
checkShow();