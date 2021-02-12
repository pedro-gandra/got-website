let play = document.querySelector('#play');
let jogando=false;
let area=document.querySelector(".area");
let divPont = document.querySelector('#pont');
let body = document.querySelector('body');

delete HTMLImageElement.prototype.x;
delete HTMLImageElement.prototype.y;

const largTab=area.offsetWidth/innerWidth*100,
  altTab=area.offsetHeight/innerWidth*100;

play.addEventListener('click', function(){
  if(jogando) return;

  play.setAttribute('disabled', '');
  divPont.innerHTML = '<h2>Score: 0</h2>'
  let press=[];
  var criador;
  let velAumenta = 0;
  let parametro = 350;
  let tempo = 0;
  let euX = 0, euY = 0;
  let velX = 0,velY = 0;
  let eu = document.querySelector('#eu');
  const vel = 0.3;
  let velLeao = 0.18;
  const euLarg=eu.offsetWidth/innerWidth*100,euAlt=euLarg*480/607;
  const euLargHitbox=euLarg*0.613,euAltHitbox=euAlt*0.50;
  let inimigos = document.querySelector('.inimigos');
  let contador = 0;
  let comparador = 0;
  let intervaloPont;
  let comparador2 = 0;
  let teste = 0;
  pontuação();



  function numerinho(left, top) {
    let x = document.createElement("span");
    x.classList.add('numerinho');
    area.appendChild(x);
    x.innerHTML='+100';
    x.style.top=top+"vw";
    x.style.left=left+"vw";
    setTimeout(function(){
      x.remove();
    },1500);
  }


  function morte() {
    if (teste == 0) {
      teste++;
      setTimeout(function () {
        let popUp = document.querySelector("#death");
        popUp.innerHTML += '<p>Your final score was <span class="num">' + contador + '</span></p>';
        popUp.classList.remove("oculto");
        popUp.classList.add("popUp");
        body.classList.add("escuro");
      }, 200);
    }
  }


  function criaLeao(){
    const leao=document.createElement('img');
    leao.src = "./imgs/recortado.png";
    leao.larg=7;
    leao.alt=7;
    leao.altHitbox=leao.alt*0.707;
    leao.largHitbox=leao.larg*0.6;
    leao.style.width = leao.larg + 'vw';
    leao.style.height = leao.alt + 'vw';
    leao.posX = Math.random()*(largTab-leao.larg);
    leao.posY = Math.random()*(altTab-leao.alt);
    leao.classList.add('waitTime');
    atualizarPos(leao);
    opons.push(leao);
    inimigos.appendChild(leao);
    setTimeout(function () {
      leao.classList.remove('waitTime');
      leao.parar = setInterval(function () {
        let centroEuX = euLarg/2 + euX;
        let centroLeaoX = leao.larg/2 + leao.posX;
        let centroEuY = euAlt/2 + euY;
        let centroLeaoY = leao.alt/2 + leao.posY;
        let catY = centroLeaoY - centroEuY;
        let catX = centroEuX - centroLeaoX;
        let tg = catY/catX;
        let ang = Math.atan(tg);
        if(catX<0){
          ang+=Math.PI;
        }
        leao.posX += Math.cos(ang)*(velLeao+velAumenta);
        leao.posY -= Math.sin(ang)*(velLeao+velAumenta);
        atualizarPos(leao)
        const moduloX=Math.abs(catX);
        const moduloY=Math.abs(catY);
        if((moduloY<=leao.altHitbox && moduloX<=leao.largHitbox+euLargHitbox) && (moduloY<=leao.altHitbox+euAltHitbox && moduloX<=leao.largHitbox)){
          eu.remove();
          clearInterval(intervaloPont);
          clearInterval(criador);
          morte();
          for(let i=0; i<opons.length; i++){
            clearInterval(opons[i].parar);
            setTimeout(function() {
              opons[i].classList.add('sumindo');
            }, 400);
          }
        }
        else{
          for(let i=0; i<opons.length; i++){
            if(opons[i]!=leao && opons[i].parar!=undefined){
              let centroLeao2X = opons[i].larg/2 + opons[i].posX;
              let centroLeao2Y = opons[i].alt/2 + opons[i].posY;
              let moduloY2 = Math.abs(centroLeaoY - centroLeao2Y);
              let moduloX2 = Math.abs(centroLeaoX - centroLeao2X);
              if ((moduloY2<=leao.altHitbox && moduloX2<=leao.largHitbox*2) && (moduloY2<=leao.altHitbox*2 && moduloX2<=leao.largHitbox)) {
                function explosion(leao){
                  leao.remove();
                  clearInterval(leao.parar);
                }
                numerinho(centroLeaoX, centroLeaoY);
                explosion(leao);
                explosion(opons[i]);
                opons.splice(i,1);
                opons.splice(opons.indexOf(leao),1);
                contador += 100;
              }
            }
          }
        }
      } ,10);
    },1200);
  }

  function pontuação () {
    setTimeout(function () {
      contador++;
      comparador++;
      divPont.innerHTML = '<h2>' + 'Score: ' + contador + '</h2>';
      intervaloPont=setInterval(function () {
        contador++;
        comparador++;
        divPont.innerHTML = '<h2>' + 'Score: ' + contador + '</h2>';
        if (comparador >= 100) {
          if (velAumenta < 0.08) {
            velAumenta += 0.004;
            comparador -= 100;
          }
        }
      }, 30);
    }, 4200);
  }


  // Oponentes

  let opons=[];

  function atualizarPos (elemento) {
    elemento.style.left = elemento.posX + 'vw';
    elemento.style.top = elemento.posY + 'vw';
  }


  function mudaVel(tecla, x){
    switch (tecla) {
      case 37:
        velX -= x;
        break;
      case 38:
        velY -= x;
        break;
        case 39:
          velX += x;
          break;
        case 40:
          velY += x;
          break;
    }
  }

  addEventListener("keydown",function (e) {
    if(e.which>=37 && e.which<=40){
      for(let i=0; i<press.length; i++){
        if(e.which==press[i]){
          return;
        }
      }
      press.push(e.which);
    }
    mudaVel(e.which, vel);
  });
  addEventListener("keyup",function (e) {
    if(e.which>=37 && e.which<=40){
      for(let i=0; i<press.length; i++){
        if(e.which==press[i]){
          press.splice(i,1);
        }
      }
    }
    mudaVel(e.which, -vel);
  });

  setInterval(function () {
    let raiz=press.length==2? 1/Math.sqrt(2): 1;
    euX += velX*raiz;
    euY += velY*raiz;
    if (euX < 0)
      euX = 0;
    else if (euX > 80 - euLarg)
      euX = 80-euLarg;
    if (euY < 0)
      euY = 0;
    else if (euY > 45-euAlt)
      euY = 45- euAlt;
    eu.style.top = euY + 'vw';
    eu.style.left = euX + 'vw';
  }, 10);

  setTimeout(function () {
    criaLeao();
    criador = setInterval(function () {
      tempo++;
      comparador2++;
      if (parametro > 150 && comparador2 >= 800){
        parametro -= 10;
        comparador2 -= 200;
      }
      if (tempo>=parametro) {
        criaLeao();
        tempo -= parametro;
      }
    }, 10);
  }, 3000);

  jogando=true;
});
