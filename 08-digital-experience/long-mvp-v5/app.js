(()=>{"use strict";
const C=window.DBU_CONTENT;
const KEY="dbu_long_v5";
const OLD_KEY="dbu_long_v4";
const LEGACY_KEY="dbu_world1_v3";
const DEMO=new URLSearchParams(location.search).get("demo")==="1";
const rank={locked:0,discovered:1,demonstrated:2,affirmed:3};
const labels={locked:"Por explorar",discovered:"Descubierta",demonstrated:"Demostrada",affirmed:"Afirmada"};

function fresh(){
  return {
    view:"welcome", migrated:false, unlockedWorld:0,
    completedWorlds:[], completedLessons:[], states:{},
    currentWorld:null,currentLesson:null,step:0,
    data:{}, challengePick:[], events:[], startedAt:Date.now()
  };
}
function load(){
  try{
    const saved=JSON.parse(localStorage.getItem(KEY)||"null");
    if(saved) return {...fresh(),...saved};
  }catch(e){}
  const n=fresh();

  // Migrate the complete V4 session when it exists.
  try{
    const old=JSON.parse(localStorage.getItem(OLD_KEY)||"null");
    if(old){
      const migrated={...fresh(),...old,migrated:true,view:"welcome"};
      return migrated;
    }
  }catch(e){}

  // Older World 1 beta migration.
  try{
    const old=JSON.parse(localStorage.getItem(LEGACY_KEY)||"null");
    if(old&&old.worldComplete){
      const w=C.worlds[0];
      n.migrated=true;
      n.completedWorlds=[w.id];
      n.completedLessons=w.lessons.map(l=>l.id);
      n.unlockedWorld=1;
      n.view="welcome";
      w.lessons.forEach(l=>{
        const oldState=old.states&&old.states[l.id];
        n.states[l.id]=oldState==="affirmed"?"affirmed":"demonstrated";
      });
    }
  }catch(e){}
  return n;
}
let s=load();
function save(){localStorage.setItem(KEY,JSON.stringify(s))}
function log(name,payload={}){s.events.push({name,at:Date.now(),...payload});if(s.events.length>500)s.events=s.events.slice(-500);save()}
function setState(id,state){if(rank[state]>rank[s.states[id]||"locked"])s.states[id]=state;save()}
function esc(x){return String(x).replace(/[&<>'"]/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[m]))}
function world(i=s.currentWorld){return C.worlds[i]}
function lesson(){return world().lessons.find(l=>l.id===s.currentLesson)}
function completedInWorld(w){return w.lessons.filter(l=>s.completedLessons.includes(l.id)).length}
function pct(){const total=C.worlds.reduce((a,w)=>a+w.lessons.length,0);return Math.round((s.completedLessons.length/total)*100)}
function top(home=true){return `<div class="topbar"><div class="brand">DESCUBRIENDO <span>BITCOIN</span></div><div class="topProgress"><span style="width:${pct()}%"></span></div>${home?'<button class="iconBtn" onclick="A.worlds()" aria-label="Ver mundos">⌂</button>':'<span></span>'}</div>`}
function card(x,c=""){return `<section class="card ${c}">${x}</section>`}
function btn(t,a,c=""){return `<button class="btn ${c}" onclick="${a}">${t}</button>`}
function choices(key,items,cb="A.pick"){const v=s.data[key];return `<div class="choiceGrid">${items.map((x,i)=>`<button class="choice ${v===i?'selected':''}" onclick="${cb}('${key}',${i})"><span class="letter">${String.fromCharCode(65+i)}</span><span class="choiceText"><b>${esc(x)}</b></span></button>`).join("")}</div>`}
function feedback(ok,good,bad){return `<div class="feedback ${ok?'good':'bad'}"><div class="feedbackTitle">${ok?'Bien pensado.':'Buena hipótesis.'}</div><p>${esc(ok?good:bad)}</p></div>`}
function lessonSteps(){return `<div class="lessonSteps">${[0,1,2,3,4,5].map(i=>`<span class="lessonStep ${i<=s.step?'on':''}"></span>`).join("")}</div>`}
function phaseLabel(l,phase){
  const n=Math.abs([...l.id].reduce((a,ch)=>a+ch.charCodeAt(0),0));
  const critical=["Ponelo en duda","Elegí una postura","¿Qué te convence más?","Tomá una decisión","Probá el argumento"];
  const transfer=["Cambio de escenario","Ahora aplicalo","Otro contexto","Llevátelo afuera","Una vuelta más"];
  const pool=phase==="critical"?critical:transfer;
  return pool[n%pool.length];
}
function currentLessonIndex(w=world()){return w.lessons.findIndex(l=>l.id===s.currentLesson)}
function lessonUnlocked(w,l){const idx=w.lessons.findIndex(x=>x.id===l.id);if(s.completedWorlds.includes(w.id))return true;if(w.n-1<s.unlockedWorld)return true;if(w.n-1>s.unlockedWorld)return false;for(let i=0;i<idx;i++)if(!s.completedLessons.includes(w.lessons[i].id))return false;return true}
function worldUnlocked(i){return i<=s.unlockedWorld}
function stateBadge(id){const st=s.states[id]||"locked";return st==="locked"?"":`<span>Pasaporte: ${labels[st]}</span>`}
function nextIncompleteWorld(){
  for(let i=0;i<C.worlds.length;i++)if(!s.completedWorlds.includes(C.worlds[i].id))return i;
  return C.worlds.length-1;
}
function firstIncompleteLesson(w){
  return w.lessons.find(l=>!s.completedLessons.includes(l.id))||w.lessons[0];
}
function resetMechanic(){
  s.data.mechanic={};
  save();
}

const A={
  continueMigrated(){s.currentWorld=1;s.view="world";log("migrated_continue");save();render();scrollTo(0,0)},
  start(){s.view="worlds";s.currentWorld=0;log("journey_started");save();render();scrollTo(0,0)},
  worlds(){s.view="worlds";save();render();scrollTo(0,0)},
  openWorld(i){if(!worldUnlocked(i))return;s.currentWorld=i;s.view="world";save();render();scrollTo(0,0)},
  openLesson(id){const w=world(),l=w.lessons.find(x=>x.id===id);if(!l||!lessonUnlocked(w,l))return;s.currentLesson=id;s.step=0;s.view="lesson";resetMechanic();log("lesson_started",{world:w.id,lesson:id});save();render();scrollTo(0,0)},
  pick(key,i){s.data[key]=i;save();render()},
  next(){s.step++;save();render();scrollTo(0,0)},
  mechanicDone(){s.data.mechanicDone=true;s.step=2;save();render();scrollTo(0,0)},
  critical(){const l=lesson();const ok=s.data.critical===l.critical.answer;s.data.criticalOK=ok;s.step=4;log("critical_answered",{lesson:l.id,ok});save();render();scrollTo(0,0)},
  transfer(){const l=lesson();const ok=s.data.transfer===l.transfer.answer;s.data.transferOK=ok;s.step=5;if(!s.completedLessons.includes(l.id))s.completedLessons.push(l.id);setState(l.id,ok?"demonstrated":"discovered");log("transfer_answered",{world:world().id,lesson:l.id,ok});save();render();scrollTo(0,0)},
  finishLesson(){const w=world(),idx=currentLessonIndex(w);if(idx===w.lessons.length-1&&completedInWorld(w)===w.lessons.length){s.view="world";}else{s.view="world";}save();render();scrollTo(0,0)},
  challenge(){s.challengePick=[];s.view="challenge";save();render();scrollTo(0,0)},
  toggleChallenge(id){const i=s.challengePick.indexOf(id);if(i>=0)s.challengePick.splice(i,1);else if(s.challengePick.length<world().challenge.answer.length)s.challengePick.push(id);save();render()},
  checkChallenge(){
    const ans=world().challenge.answer;
    const ok=s.challengePick.length===ans.length&&ans.every(x=>s.challengePick.includes(x));
    s.data.challengeOK=ok;log("world_challenge",{world:world().id,ok});
    if(ok){
      const wid=world().id;
      if(!s.completedWorlds.includes(wid))s.completedWorlds.push(wid);
      s.unlockedWorld=Math.min(C.worlds.length-1,Math.max(s.unlockedWorld,s.currentWorld+1));
      s.view="worldComplete";
    } else s.view="challengeWrong";
    save();render();scrollTo(0,0);
  },
  retryChallenge(){s.challengePick=[];s.view="challenge";save();render();scrollTo(0,0)},
  nextWorld(){if(s.currentWorld<C.worlds.length-1){s.currentWorld++;s.view="world"}else{s.view="final"}save();render();scrollTo(0,0)},
  passport(){s.view="passport";save();render();scrollTo(0,0)},
  reset(){if(confirm("¿Borrar todo el progreso de esta versión en este dispositivo?")){localStorage.removeItem(KEY);s=fresh();render()}},
  exportData(){const b=new Blob([JSON.stringify(s,null,2)],{type:"application/json"});const a=document.createElement("a");a.href=URL.createObjectURL(b);a.download="dbu-long-mvp-v5-session.json";a.click();URL.revokeObjectURL(a.href)},

  // mechanics
  ledgerPay(){s.data.mechanic.paid=true;save();render()},
  doublePhoto(){s.data.mechanic.photo=true;save();render()},
  doubleAna(){s.data.mechanic.ana=true;save();render()},
  doubleJuan(){s.data.mechanic.juan=true;save();render()},
  inspect(i){const arr=s.data.mechanic.inspect||[];if(!arr.includes(i))arr.push(i);s.data.mechanic.inspect=arr;save();render()},
  compare(side){const arr=s.data.mechanic.compare||[];if(!arr.includes(side))arr.push(side);s.data.mechanic.compare=arr;save();render()},
  tamper(){s.data.mechanic.tampered=true;save();setTimeout(()=>{s.data.mechanic.rejected=true;save();render()},280)},
  seal(){s.data.mechanic.sealed=true;save();render()},
  sequence(i){const a=s.data.mechanic.sequence||[];if(!a.includes(i))a.push(i);s.data.mechanic.sequence=a;save();render()},
  checkSequence(){const m=lesson().mechanic,arr=s.data.mechanic.sequence||[];const ok=arr.length===m.answer.length&&arr.every((v,i)=>v===m.answer[i]);s.data.mechanic.seqOK=ok;if(ok)s.data.mechanicDone=true;save();render()},
  resetSequence(){s.data.mechanic.sequence=[];delete s.data.mechanic.seqOK;save();render()},
  queue(i){const arr=s.data.mechanic.queue||[];if(arr.includes(i))arr.splice(arr.indexOf(i),1);else if(arr.length<2)arr.push(i);s.data.mechanic.queue=arr;save();render()},
  build(){s.data.mechanic.built=true;save();render()},
  hash(){s.data.mechanic.hash=(s.data.mechanic.hash||0)+1;if(s.data.mechanic.hash>=5)s.data.mechanic.found=true;save();render()},
  confirmation(){s.data.mechanic.confirmations=Math.min(4,(s.data.mechanic.confirmations||0)+1);save();render()},
  path(i){s.data.mechanic.path=i;save();render()},
  chat(){s.data.mechanic.chat=true;save();render()},
  market(){s.data.mechanic.market=true;save();render()},
  cafeStep(){s.data.mechanic.cafeStage=Math.min(3,(s.data.mechanic.cafeStage||0)+1);save();render()},
  surpriseReveal(){s.data.mechanic.revealed=true;save();render()},
  verifyChoice(mode){s.data.mechanic.verifyChoice=mode;if(mode==="verify")s.data.mechanic.verified=true;save();render()},
  verifyNow(){s.data.mechanic.verified=true;save();render()},
  seedShock(){s.data.mechanic.seedSeen=true;save();render()},
  lightningPay(){
    s.data.mechanic.lightning="sending";save();render();
    setTimeout(()=>{s.data.mechanic.lightning="confirmed";save();render()},650);
  },
  circle(mode){s.data.mechanic.circleChoice=mode;save();render()},
  localReveal(){s.data.mechanic.local=true;save();render()}
};
window.A=A;

function welcome(){
 const migrated=s.migrated&&s.completedLessons.length>0;
 return top(false)+card(`<div class="eyebrow">V5 · Experiencia interactiva</div><h1>No venimos a convencerte. <span class="orange">Venimos a hacerte pensar.</span></h1><p>7 mundos para descubrir Bitcoin jugando con decisiones, cuentas, errores, sorpresas y casos reales.</p><div class="welcomePills"><span>37 misiones</span><span>sin precio</span><span>sin backend</span><span>con progreso local</span></div>${migrated?'<div class="callout green"><strong>Encontré tu progreso anterior.</strong><br><span class="muted">Podés seguir donde estabas. V5 mantiene el camino, pero cambia ejemplos, contraste y dinámicas.</span></div>'+btn('Continuar mi ruta','A.worlds()'):btn('Empezar a descubrir','A.start()')} ${btn('Ver Pasaporte','A.passport()','secondary')}<p class="tiny muted" style="margin-top:16px">Equivocarse acá es parte del juego. Ninguna respuesta incorrecta te deja afuera.</p>`,"hero");
}
function worldsView(){
 return top(false)+card(`<div class="eyebrow">Camino completo</div><h2>7 mundos. Una idea prepara la siguiente.</h2><p class="muted">No necesitás terminar todo de una vez. Cada mundo tiene una pregunta grande y un desafío final.</p><div class="worldGrid">${C.worlds.map((w,i)=>{const unlocked=worldUnlocked(i),done=s.completedWorlds.includes(w.id),current=unlocked&&!done&&i===nextIncompleteWorld();return `<div class="worldCard ${done?'done ':''}${current?'current ':''}${!unlocked?'locked':''}"><div class="worldHeader"><div><div class="kicker">Mundo ${w.n}</div><h3>${w.title}</h3></div><div class="doorIcon">${done?'✓':w.icon}</div></div><p>${w.question}</p><p class="tiny" style="margin-top:7px">${w.summary}</p><div class="worldActions">${unlocked?btn(done?'Volver a explorar':'Entrar',`A.openWorld(${i})`,'compact'):'<span class="tag">Bloqueado por dependencia</span>'}</div></div>`}).join("")}</div>${btn('Ver Pasaporte Bitcoin','A.passport()','secondary')}`)}
function worldView(){
 const w=world(),count=completedInWorld(w),all=count===w.lessons.length,done=s.completedWorlds.includes(w.id);
 return top()+card(`<div class="worldStrip"><span class="worldPill active">Mundo ${w.n} · ${w.title}</span><span class="worldPill">${count}/${w.lessons.length} lecciones</span></div><h2>${w.question}</h2><p class="muted">${w.summary}</p><div class="path">${w.lessons.map((l,i)=>{const ld=s.completedLessons.includes(l.id),open=lessonUnlocked(w,l),state=s.states[l.id]||"locked";return `<button class="door ${ld?'done ':''}${open&&!ld?'current ':''}${!open?'locked':''}" ${open?`onclick="A.openLesson('${l.id}')"`:'disabled'}><span class="doorIcon">${ld?'✓':l.icon}</span><span class="doorTitle"><b>${i+1}. ${l.title}</b><span>${l.intro}</span>${state!=="locked"?`<span>Pasaporte: ${labels[state]}</span>`:''}</span><span class="doorState">${ld?'✓':open?'›':'⌁'}</span></button>`}).join("")}</div>${all?btn(done?'Repetir desafío del mundo':'Desafío del mundo', 'A.challenge()', done?'secondary':''):''}${done&&s.currentWorld<C.worlds.length-1?btn('Seguir al próximo mundo','A.nextWorld()'):''}${done&&s.currentWorld===C.worlds.length-1?btn('Ver cierre de la ruta','A.nextWorld()'):''}`)}
function lessonView(){
 const l=lesson();
 let body=`<div class="kicker">Mundo ${world().n} · ${world().title}</div>${lessonSteps()}`;
 const starter=["Probar","Ver qué pasa","Jugar","Descubrir"][Math.abs(currentLessonIndex())%4];
 if(s.step===0)body+=`<div class="eyebrow">${l.title}</div><h2>${l.intro}</h2><p class="muted">Primero una situación. La explicación viene después.</p>${btn(starter,'A.next()')}`;
 else if(s.step===1)body+=renderMechanic(l);
 else if(s.step===2)body+=`<div class="eyebrow">Qué acabás de descubrir</div><h2>${l.explain.title}</h2><p>${l.explain.text}</p>${btn('Ponelo en duda','A.next()')}`;
 else if(s.step===3)body+=`<div class="eyebrow">${phaseLabel(l,"critical")}</div><h2>${l.critical.q}</h2><p class="small muted">Elegí primero. El matiz aparece después.</p>${choices('critical',l.critical.options)}${s.data.critical!==undefined?btn('Ver el matiz','A.critical()'):''}`;
 else if(s.step===4){const cOK=s.data.criticalOK;body+=feedback(cOK,l.critical.feedback,l.critical.feedback)+`<div class="eyebrow" style="margin-top:18px">${phaseLabel(l,"transfer")}</div><h2>${l.transfer.q}</h2>${choices('transfer',l.transfer.options)}${s.data.transfer!==undefined?btn('Comprobar','A.transfer()'):''}`;}
 else {const ok=s.data.transferOK;body+=`${feedback(ok,'Aplicaste la idea en una situación nueva.','Esta pieza quedó descubierta. Podés volver a demostrarla después.')}${stamp(l,ok)}${btn('Volver al mundo','A.finishLesson()')}`;}
 return top()+card(body);
}
function stamp(l,ok){return `<div class="stampAward ${ok?'':'outline'}"><div class="stampIcon">${l.icon}</div><div class="label">${ok?'Pieza demostrada':'Pieza descubierta'}</div><h3>${l.concept}</h3><p class="small muted">${ok?'El sello representa una aplicación correcta, no haber llegado al final.':'El concepto apareció, pero todavía no hay evidencia suficiente para marcarlo como demostrado.'}</p></div>`}

function renderMechanic(l){
 const m=l.mechanic,d=s.data.mechanic||{};
 const head=`<div class="eyebrow">Intentá</div><h2>${m.prompt}</h2>`;
 if(m.type==="cafe"){
   const st=d.cafeStage||0;
   if(st===0)return head+`<div class="cafeFlow"><div class="moneyBox"><span>Tenías</span><b>${m.start}</b></div><div class="operator">−</div><div class="moneyBox"><span>Café</span><b>${m.price}</b></div><div class="operator">=</div><div class="moneyBox mystery"><span>Te quedan</span><b>?</b></div></div><p class="small muted">Hacé la cuenta antes de tocar el botón.</p>${btn('Pagar '+m.price,'A.cafeStep()')}`;
   if(st===1)return head+`<div class="cafeFlow"><div class="moneyBox"><span>Tenías</span><b>${m.start}</b></div><div class="operator">−</div><div class="moneyBox"><span>Café</span><b>${m.price}</b></div><div class="operator">=</div><div class="moneyBox result"><span>Te quedan</span><b>${m.start-m.price}</b></div></div><div class="callout orange"><strong>La cuenta cierra.</strong><br><span class="muted">Primero entendemos esto. Después agregamos Bitcoin.</span></div>${btn('Ahora con sats','A.cafeStep()')}`;
   if(st===2)return head+`<div class="cafeStack"><div><span>Tenías</span><b>${m.satsStart.toLocaleString("es-UY")} sats</b></div><div><span>Café</span><b>− ${m.satsPrice.toLocaleString("es-UY")} sats</b></div><div class="result"><span>Saldo antes del fee</span><b>${(m.satsStart-m.satsPrice).toLocaleString("es-UY")} sats</b></div></div><p class="small muted">1 sat = una unidad muy pequeña de bitcoin.</p>${btn('Falta una cosa','A.cafeStep()')}`;
   return head+`<div class="cafeStack"><div><span>Tenías</span><b>${m.satsStart.toLocaleString("es-UY")} sats</b></div><div><span>Café</span><b>− ${m.satsPrice.toLocaleString("es-UY")} sats</b></div><div><span>Fee ilustrativo</span><b>− ${m.fee} sats</b></div><div class="result"><span>Saldo final</span><b>${(m.satsStart-m.satsPrice-m.fee).toLocaleString("es-UY")} sats</b></div></div><p class="small muted">El fee es solo un ejemplo didáctico. No existe una comisión fija universal.</p>${btn('Seguir','A.mechanicDone()')}`;
 }
 if(m.type==="surprise"){
   if(!d.revealed)return `<div class="surpriseStage"><div class="surpriseLabel">PAUSA</div><h2>Borrá todo lo que escuchaste de Bitcoin durante 10 segundos.</h2><p>Quedate solo con esta pregunta:</p><div class="surpriseQuestion">${m.prompt}</div></div>${btn('Ya tengo una hipótesis','A.surpriseReveal()')}`;
   return `<div class="eyebrow">Ahora sí</div><h2>${m.prompt}</h2><div class="revealCard"><span class="revealDot">₿</span><p>${m.reveal}</p></div><p class="small muted">No memorices la frase. Quedate con el problema que intenta resolver.</p>${btn('Ponerle nombre','A.mechanicDone()')}`;
 }
 if(m.type==="verify"){
   const choice=d.verifyChoice;
   if(!choice)return head+`<div class="resultVsAccount"><div class="resultPanel"><span>LA APP TE DICE</span><b>Saldo: ${m.result}</b></div><div class="vs">VS</div><div class="resultPanel outline"><span>VOS PODÉS</span><b>Rehacer la cuenta</b></div></div><div class="choiceGrid"><button class="choice" onclick="A.verifyChoice('trust')"><span class="letter">A</span><span class="choiceText"><b>Confiar en el resultado</b><span>Delegás la verificación en la herramienta.</span></span></button><button class="choice" onclick="A.verifyChoice('verify')"><span class="letter">B</span><span class="choiceText"><b>Verificar la cuenta</b><span>Revisás las entradas y salidas.</span></span></button></div>`;
   if(choice==="trust"&&!d.verified)return head+`<div class="callout orange"><strong>Confiar puede ser una decisión válida.</strong><br><span class="muted">La clave es saber qué estás delegando. Ahora veamos qué significa verificar.</span></div>${btn('Rehacer la cuenta','A.verifyNow()')}`;
   const rows=m.entries.map(x=>`<div class="verifyRow"><span>${x[1]}</span><b>${x[0]}</b></div>`).join("");
   return head+`<div class="verifyLedger">${rows}<div class="verifyTotal"><span>RESULTADO</span><b>${m.result}</b></div></div><div class="callout green"><strong>No confíes: verificá cuando quieras y puedas.</strong><br><span class="muted">Correr un nodo es una forma de verificar reglas y datos por cuenta propia. Muchas apps delegan parte de esa tarea.</span></div>${btn('Seguir','A.mechanicDone()')}`;
 }
 if(m.type==="seedShock"){
   if(!d.seedSeen)return `<div class="seedStage"><div class="fakeStamp">FICTICIA · NO CONTROLA FONDOS</div><div class="seedWords">${m.words.map(x=>`<span>${x}</span>`).join("")}</div></div><p class="small muted">Mirá cinco segundos. ¿Qué te incomoda de esta pantalla?</p>${btn('¿Qué error cometimos?','A.seedShock()')}`;
   return `<div class="callout red"><strong>Si fuera una seed real, mostrarla sería un error grave.</strong><br><span class="muted">Una frase válida puede permitir recuperar las claves de una wallet. Nunca la muestres para pedir ayuda.</span></div>${btn('Seguir','A.mechanicDone()')}`;
 }
 if(m.type==="lightningPay"){
   const st=d.lightning;
   if(!st)return head+`<div class="lightningDemo"><div class="coffeeIcon">☕</div><div><span>Café</span><b>${m.amount.toLocaleString("es-UY")} sats</b></div></div>${btn('⚡ Pagar con Lightning','A.lightningPay()')}`;
   if(st==="sending")return head+`<div class="lightningDemo sending"><div class="bolt">⚡</div><div><span>Enviando...</span><b>${m.amount.toLocaleString("es-UY")} sats</b></div></div><div class="loader"></div>`;
   return head+`<div class="lightningDemo confirmed"><div class="check">✓</div><div><span>Pago confirmado</span><b>${m.amount.toLocaleString("es-UY")} sats</b></div></div><div class="callout green"><strong>Se sintió inmediato.</strong><br><span class="muted">En este ejemplo el fee ilustrativo es ${m.fee} sats. En la vida real varía según ruta, canales y contexto.</span></div>${btn('Seguir','A.mechanicDone()')}`;
 }
 if(m.type==="circle"){
   const mode=d.circleChoice;
   const actors=m.actors.map((x,i)=>`<div class="circleActor ${mode==="loop"?'active':''}"><span>${i+1}</span><b>${x}</b></div>`).join('<div class="circleArrow">→</div>');
   if(!mode)return head+`<div class="circleFlow">${actors}</div><div class="choiceGrid"><button class="choice" onclick="A.circle('fiat')"><span class="letter">A</span><span class="choiceText"><b>El café cambia a moneda local</b><span>El circuito Bitcoin se corta ahí.</span></span></button><button class="choice" onclick="A.circle('loop')"><span class="letter">B</span><span class="choiceText"><b>El café paga a un proveedor en bitcoin</b><span>El valor puede seguir circulando.</span></span></button></div>`;
   if(mode==="fiat")return head+`<div class="circleFlow broken">${actors}</div><div class="callout orange"><strong>El círculo se cortó.</strong><br><span class="muted">Eso no significa que el comercio hizo algo mal. Puede ser la decisión razonable por volatilidad, impuestos o proveedores.</span></div>${btn('Ver el otro camino',"A.circle('loop')",'secondary')}`;
   return head+`<div class="circleFlow loop">${actors}<div class="loopBack">↺ el valor vuelve a circular</div></div><div class="callout green"><strong>Ahora aparece la circularidad.</strong><br><span class="muted">Aceptar bitcoin no alcanza: hacen falta conexiones útiles entre varios actores.</span></div>${btn('Seguir','A.mechanicDone()')}`;
 }
 if(m.type==="localCase"){
   if(!d.local)return `<div class="surpriseStage local"><div class="surpriseLabel">CASO LOCAL</div><h2>${m.prompt}</h2><p>No lo vamos a usar como publicidad. Lo vamos a mirar como una experiencia en construcción.</p></div>${btn('Revelar caso local','A.localReveal()')}`;
   return `<div class="localCase"><div class="localHero"><span>PUNTA DEL ESTE · URUGUAY</span><h2>${m.place}</h2><p>${m.subtitle}</p></div><div class="localGrid"><div><span>QUÉ HAY HOY</span><ul>${m.today.map(x=>'<li>'+x+'</li>').join('')}</ul></div><div><span>QUÉ FALTA</span><ul>${m.missing.map(x=>'<li>'+x+'</li>').join('')}</ul></div></div><div class="proofLine"><span>¿CÓMO SABRÍAMOS SI FUNCIONA?</span><b>${m.proof}</b></div><p class="small muted">Punta Bitcoin es aliado del programa. El vínculo se declara porque contexto y conflicto de interés también forman parte de verificar.</p></div>${btn('Seguir','A.mechanicDone()')}`;
 }
 if(m.type==="choice")return head+choices("mechanicChoice",m.options)+`${s.data.mechanicChoice!==undefined?btn('Ver consecuencia','A.mechanicDone()'):''}`;
 if(m.type==="ledger")return head+`<div class="paper"><div class="ledgerRow"><span>Tu cuenta</span><b>${d.paid?m.from-m.amount:m.from}</b></div><div class="ledgerRow"><span>Café</span><b>${d.paid?m.to+m.amount:m.to}</b></div></div>${d.paid?'<div class="callout orange"><strong>No viajó un billete por internet.</strong><br><span class="muted">Cambió el registro de dos saldos.</span></div>'+btn('Seguir','A.mechanicDone()'):btn('Pagar '+m.amount,'A.ledgerPay()')}`;
 if(m.type==="double")return head+`<div class="sim"><div class="simRow"><div class="phone">📷<br><span class="tiny">foto</span></div><span class="simArrow">→</span><div class="person"><div class="avatar">A</div><div class="personMeta"><b>Ana</b></div></div></div>${d.photo?'<div class="simRow pop" style="margin-top:12px"><div class="phone">📷<br>tu copia</div><div class="phone">📷<br>Ana</div></div>':''}</div>${!d.photo?btn('Enviar foto','A.doublePhoto()'):!d.ana?btn('Ahora enviar $100 a Ana','A.doubleAna()'):!d.juan?btn('Intentar usar los mismos $100 con Juan','A.doubleJuan()'):'<div class="callout red"><strong>La copia funciona para fotos. Para dinero crea un problema.</strong></div>'+btn('Seguir','A.mechanicDone()')}`;
 if(m.type==="inspect"){const seen=d.inspect||[];return head+`<div class="inspectGrid">${m.items.map((x,i)=>`<button class="inspect ${seen.includes(i)?'active':''}" onclick="A.inspect(${i})"><b>${x.title}</b><span>${seen.includes(i)?x.text:'Tocar para inspeccionar'}</span></button>`).join("")}</div>${seen.length===m.items.length?btn('Seguir','A.mechanicDone()'):'<p class="small muted">Abrí todas las piezas.</p>'}`;}
 if(m.type==="compare"){const seen=d.compare||[];return head+`<div class="compareTable"><button class="compareCol" onclick="A.compare('left')"><h3>${m.left.title}</h3>${seen.includes('left')?'<ul>'+m.left.items.map(x=>'<li>'+x+'</li>').join('')+'</ul>':'<p class="small muted">Tocar para explorar</p>'}</button><button class="compareCol" onclick="A.compare('right')"><h3>${m.right.title}</h3>${seen.includes('right')?'<ul>'+m.right.items.map(x=>'<li>'+x+'</li>').join('')+'</ul>':'<p class="small muted">Tocar para explorar</p>'}</button></div>${seen.length===2?btn('Seguir','A.mechanicDone()'):''}`;}
 if(m.type==="copies"){return head+`<div class="paper"><div class="ledgerRow"><span>Tu saldo</span><b>${d.tampered?'1.100':'100'}</b></div></div><div class="nodes">${[1,2,3,4,5].map((n,i)=>`<div class="node ${d.rejected&&i>0?'reject':''}">${i===0?'TU COPIA':d.rejected?'RECHAZA':'Copia '+(i+1)}</div>`).join("")}</div>${!d.tampered?btn('Alterar mi copia','A.tamper()'):d.rejected?'<div class="callout red"><strong>Tu cambio no respeta las reglas que las otras copias verifican.</strong></div>'+btn('Seguir','A.mechanicDone()'):'<p class="small muted">Verificando…</p>'}`;}
 if(m.type==="market"){return head+`<div class="market">${[32,61,45,83,38,72,54,91,43,67,49,77,40,58,36,70].map(h=>`<div class="bar" style="height:${h}%"></div>`).join("")}</div><div class="marketLabel"><span>tiempo</span><span>línea ficticia · sin precio real</span></div>${btn('Nadie garantiza el próximo punto','A.mechanicDone()')}`;}
 if(m.type==="seal")return head+`<div class="paper"><div class="ledgerRow"><span>Mensaje</span><b>Enviar 10 a Ana</b></div><div class="ledgerRow"><span>Firma</span><b>${d.sealed?'✓ verificable':'—'}</b></div></div>${d.sealed?'<div class="callout green"><strong>Otros pueden verificar la autorización sin ver tu secreto.</strong></div>'+btn('Seguir','A.mechanicDone()'):btn('Firmar con mi sello secreto','A.seal()')}`;
 if(m.type==="sequence"){const seq=d.sequence||[];return head+`<div class="sequence">${m.items.map((x,i)=>`<button class="sequenceItem ${seq.includes(i)?'chosen':''}" onclick="A.sequence(${i})"><span class="sequenceNum">${seq.includes(i)?seq.indexOf(i)+1:'+'}</span><span>${x}</span></button>`).join("")}</div>${seq.length===m.items.length?btn('Comprobar orden','A.checkSequence()'):''}${d.seqOK===false?'<div class="feedback bad"><div class="feedbackTitle">Todavía no.</div><p>Probá pensar: construir el mensaje → autorizarlo → difundirlo.</p></div>'+btn('Reintentar','A.resetSequence()','secondary'):''}${d.seqOK?btn('Seguir','A.mechanicDone()'):''}`;}
 if(m.type==="queue"){const q=d.queue||[];return head+`<div class="sequence">${['Tx A · fee baja','Tx B · fee media','Tx C · fee alta'].map((x,i)=>`<button class="sequenceItem ${q.includes(i)?'chosen':''}" onclick="A.queue(${i})"><span class="sequenceNum">${q.includes(i)?'✓':'+'}</span><span>${x}</span></button>`).join("")}</div><p class="small muted">Elegí dos. En la vida real hay más factores y cada minero tiene su política.</p>${q.length===2?btn('Continuar','A.mechanicDone()'):''}`;}
 if(m.type==="builder")return head+`<div class="sim"><div class="simRow"><span class="tag">Tx válida A</span><span class="tag">Tx válida B</span><span class="tag">Tx válida C</span></div>${d.built?'<div class="block confirmed pop" style="margin-top:14px">BLOQUE CANDIDATO<small>transacciones seleccionadas</small></div>':''}</div>${d.built?btn('Seguir','A.mechanicDone()'):btn('Construir bloque candidato','A.build()')}`;
 if(m.type==="hash"){const n=d.hash||0;return head+`<div class="hashBox"><div><div class="hashCount">${d.found?'✓':n}</div><div>${d.found?'Prueba simulada encontrada':'intentos simulados'}</div></div></div>${d.found?'<p class="small muted">Encontrar costó varios intentos; verificar el resultado será inmediato.</p>'+btn('Seguir','A.mechanicDone()'):btn('Probar otro hash','A.hash()')}`;}
 if(m.type==="confirmations"){const n=d.confirmations||0;return head+`<div class="networkLine">${[0,1,2,3].map(i=>`<div class="block ${i<n?'confirmed':''}">Bloque ${i+1}<small>${i===0?'incluye tu tx':i<n?'confirmación extra':'pendiente'}</small></div>`).join("")}</div>${n<4?btn('Agregar siguiente bloque','A.confirmation()'):btn('Seguir','A.mechanicDone()')}`;}
 if(m.type==="path"){const p=d.path;return head+`<div class="pathway">${m.paths.map((x,i)=>`<button class="pathNode ${p===i?'chosen':''}" onclick="A.path(${i})"><b>${x.title}</b>${p===i?'<p class="small muted" style="margin-top:6px">'+x.result+'</p>':''}</button>`).join("")}</div>${p!==undefined?btn('Seguir','A.mechanicDone()'):''}`;}
 if(m.type==="chat")return head+`<div class="phoneMock"><div class="tiny muted">Mensaje entrante</div><div class="chatBubble bad">${m.message}</div></div>${d.chat?'<div class="callout red"><strong>La señal crítica está en lo que te pide y cómo te presiona.</strong></div>'+btn('Seguir','A.mechanicDone()'):btn('Marcar como sospechoso','A.chat()')}`;
 return head+btn('Seguir','A.mechanicDone()');
}
function challengeView(){
 const ch=world().challenge,need=ch.answer.length;
 return top()+card(`<div class="eyebrow">Desafío · Mundo ${world().n}</div><h2>${ch.prompt}</h2><p class="muted">Elegí ${need}. Acá no alcanza con haber pasado las lecciones.</p><div class="challengeCards">${ch.options.map(x=>{const i=s.challengePick.indexOf(x.id);return `<button class="challengeCard ${i>=0?'chosen':''}" onclick="A.toggleChallenge('${x.id}')"><span class="orderBubble">${i>=0?'✓':'+'}</span><span>${x.text}</span></button>`}).join("")}</div>${s.challengePick.length===need?btn('Comprobar','A.checkChallenge()'):''}`)}
function challengeWrong(){return top()+card(`<div class="eyebrow">Casi</div><h2>Hay una o más piezas que no pertenecen al modelo.</h2><p>Volvé a pensar qué aprendiste en este mundo. Buscamos afirmaciones precisas, no slogans.</p>${btn('Intentar otra vez','A.retryChallenge()')}${btn('Volver a las lecciones','A.openWorld('+s.currentWorld+')','secondary')}`)}
function worldCompleteView(){
 const w=world(),last=s.currentWorld===C.worlds.length-1;
 return top()+card(`<div class="eyebrow">Mundo ${w.n} completado</div><h2>${last?'Terminaste la ruta base.':'Abriste una nueva puerta.'}</h2><div class="callout green"><strong>${w.title}</strong><br><span class="muted">${w.summary}</span></div><p>El desafío final comprobó que podés conectar varias piezas del mundo en una situación distinta.</p>${last?btn('Ver cierre y Pasaporte','A.nextWorld()'):btn('Entrar al Mundo '+(w.n+1),'A.nextWorld()')}${btn('Ver Pasaporte','A.passport()','secondary')}`)}
function passportView(){
 return top()+card(`<div class="eyebrow">Pasaporte Bitcoin</div><h2>Tu mapa de comprensión.</h2><p class="muted">Los sellos no representan tiempo de pantalla. Representan evidencia dentro de esta experiencia.</p>${C.worlds.map(w=>`<div class="worldCard ${s.completedWorlds.includes(w.id)?'done':''}" style="margin-top:12px"><div class="worldHeader"><div><div class="kicker">Mundo ${w.n}</div><h3>${w.title}</h3></div><span class="tag">${s.completedWorlds.includes(w.id)?'Mundo completado':completedInWorld(w)+'/'+w.lessons.length}</span></div><div class="passport">${w.lessons.map(l=>{const st=s.states[l.id]||'locked';return `<div class="stamp ${st}"><div class="stampSmallIcon">${l.icon}</div><b>${l.concept}</b><span>${st==='affirmed'?'Aplicada nuevamente después.':st==='demonstrated'?'Aplicada en otro contexto.':st==='discovered'?'Vista, todavía por demostrar.':'Por explorar.'}</span><div class="stampState">${labels[st]}</div></div>`}).join("")}</div></div>`).join("")}${btn('Volver a los mundos','A.worlds()')}${DEMO?btn('Exportar sesión de prueba','A.exportData()','secondary'):''}${btn('Borrar progreso de esta versión','A.reset()','ghost')}`)}
function finalView(){
 return top()+card(`<div class="eyebrow">Ruta base completada</div><h1>¿Tenés <span class="orange">mejores preguntas</span> que cuando empezaste?</h1><p>Ese es el objetivo. No salir convencido: salir entendiendo mejor qué podés verificar, qué riesgos existen y qué querés explorar después.</p><div class="summaryPhrase">“Bitcoin no se aprende de golpe. Se aprende por capas.”</div><div class="nextGrid"><div class="nextCard"><span>01</span><h3>Quiero entender más</h3><p>Volvé al mundo donde te quedó una duda y repetí una misión.</p></div><div class="nextCard"><span>02</span><h3>Quiero experimentar</h3><p>Elegí una práctica pequeña y segura: Lightning, seguridad o verificación.</p></div><div class="nextCard"><span>03</span><h3>Quiero conversar</h3><p>Llevate una pregunta a la comunidad. No necesitás una respuesta inmediata.</p></div></div><div class="capstone"><h3>Regla final</h3><p class="small muted">No confíes porque algo suena bien. No rechaces porque suena raro. Preguntá, contrastá y verificá.</p></div>${btn('Ver mi Pasaporte','A.passport()')}${btn('Volver a explorar mundos','A.worlds()','secondary')}`)}
function render(){
 let html="";
 if(s.view==="welcome")html=welcome();
 else if(s.view==="worlds")html=worldsView();
 else if(s.view==="world")html=worldView();
 else if(s.view==="lesson")html=lessonView();
 else if(s.view==="challenge")html=challengeView();
 else if(s.view==="challengeWrong")html=challengeWrong();
 else if(s.view==="worldComplete")html=worldCompleteView();
 else if(s.view==="passport")html=passportView();
 else if(s.view==="final")html=finalView();
 document.getElementById("app").innerHTML=html;
}
render();
})();