function search_apps() {
  let input = document.getElementById('searchbar').value.toLowerCase();
  let x = document.getElementsByClassName('apps');
  
  for (let i = 0; i < x.length; i++) { 
    if (!x[i].innerHTML.toLowerCase().includes(input)) {
      x[i].style.display = "none";
    } else {
      x[i].style.display = "block";                 
    }
  }
}

function search_installapps() {
  let input = document.getElementById('searchbar').value.toLowerCase();
  let x = document.getElementsByClassName('install-apps');
  
  for (let i = 0; i < x.length; i++) { 
    if (!x[i].innerHTML.toLowerCase().includes(input)) {
      x[i].style.display = "none";
    } else {
      x[i].style.display = "block";                 
    }
  }
}
