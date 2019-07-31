var nav = document.getElementById('main-nav');
nav.addEventListener('click', function(){
    'use strict';
    nav.classList.toggle('mostrar');
})

function checks() {
    document.getElementById("myChecks").checked = true;
  }
  
  function unchecks() {
    document.getElementById("myChecks").checked = false;
  }
  
	/*para recervar hora */
function OnChangeCheckbox (checkbox) {
  if (checkbox.checked) {
      alert ("Esta seguro que quiere recerbar");
  }
  else {
    alert ("Esta seguro no que quiere recerbar");
  }
}
/* para casos especiales de recervar hora */
function ShowHideTextBox (checkbox) {
  var textBox = document.getElementById ("input1");
  if (checkbox.checked) {
      textBox.style.display = "";
  }
  else {
      textBox.style.display = "none";
  }
}

function EnableDisableTextBox (checkbox) {
  var textBox = document.getElementById ("input2");
  textBox.disabled = !checkbox.checked;
}

function Init () {
  var checkBox1 = document.getElementById ("check1");
  var checkBox2 = document.getElementById ("check2");
  ShowHideTextBox (checkBox1);
  EnableDisableTextBox (checkBox2);
}
