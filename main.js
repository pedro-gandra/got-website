let clickaveis = document.querySelectorAll('.personagens');
let pops = document.querySelectorAll('.pops');
let fundoPop = document.querySelector('.fundoPop');

function showPOP(pos){
  pops[pos].classList.remove('oculto');
  fundoPop.classList.remove('escundido');
}


function unshowPOP(pos){
  pops[pos].classList.add('oculto');
  fundoPop.classList.add('escundido');
}


for (let i = 0; i < clickaveis.length; i++) {
  clickaveis[i].addEventListener('click', function () {
    showPOP(i);
  });
}

for (let i = 0; i < pops.length; i++) {
  if (pops[i].classList.contains('oculto')) {
    fundoPop.addEventListener('click', function(e){
      if(e.target==this)
      unshowPOP(i);
    })
  }
}
