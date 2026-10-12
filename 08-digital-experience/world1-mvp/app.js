(()=>{
'use strict';
const STORAGE='dbu_world1_v3';
const DEMO=new URLSearchParams(location.search).get('demo')==='1';
const LESSONS=[
 {id:'functions',n:1,title:'Qué hace el dinero',sub:'Intercambiar, comparar y guardar valor',icon:'↔',concept:'Funciones del dinero'},
 {id:'ledger',n:2,title:'El dinero es un registro',sub:'Qué significa realmente un saldo digital',icon:'▤',concept:'Dinero = registro'},
 {id:'double',n:3,title:'Enviá dos veces',sub:'El problema del dinero digital',icon:'⧉',concept:'Doble gasto'},
 {id:'intermediary',n:4,title:'¿Quién lleva la libreta?',sub:'Qué resuelven los intermediarios',icon:'◎',concept:'Intermediarios'},
 {id:'bitcoin',n:5,title:'Una libreta sin dueño',sub:'La primera idea de Bitcoin',icon:'₿',concept:'Bitcoin'},
 {id:'risk',n:6,title:'¿Es una inversión?',sub:'Precio, volatilidad y promesas',icon:'≈',concept:'Precio y riesgo'}
];
const DEFAULT={view:'welcome',belief:null,entry:'zero',unlocked:1,completed:[],states:{},lesson:null,step:0,data:{},challengeUnlocked:false,worldComplete:false,challengePick:[],challengeAttempts:0,placementStep:0,placementScore:0,placementResults:[],events:[],startedAt:Date.now(),practiceAt:null};
let s=load();
function load(){try{return {...structuredClone(DEFAULT),...JSON.parse(localStorage.getItem(STORAGE)||'{}')}}catch(e){return structuredClone(DEFAULT)}}
function save(){localStorage.setItem(STORAGE,JSON.stringify(s))}
function log(name,payload={}){s.events.push({name,at:Date.now(),...payload});if(s.events.length>300)s.events=s.events.slice(-300);save()}
function reset(){localStorage.removeItem(STORAGE);s=structuredClone(DEFAULT);render()}
function conceptState(id){return s.states[id]||'locked'}
function setState(id,state){const rank={locked:0,discovered:1,demonstrated:2,affirmed:3};if(rank[state]>rank[conceptState(id)])s.states[id]=state;save()}
function completedCount(){return LESSONS.filter(l=>s.completed.includes(l.id)).length}
function progressPct(){return Math.round((completedCount()/LESSONS.length)*100)}
function esc(x){return String(x).replace(/[&<>'"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[m]))}
function top({home=true,progress=true}={}){return `<div class="topbar"><div class="brand">DESCUBRIENDO <span>BITCOIN</span></div>${progress?`<div class="topProgress" aria-label="Progreso"><span style="width:${progressPct()}%"></span></div>`:''}${home?'<button class="iconBtn" onclick="Actions.home()" aria-label="Volver al mapa">⌂</button>':'<span></span>'}</div>`}
function card(inner,cls=''){return `<section class="card ${cls}">${inner}</section>`}
function btn(text,action,cls=''){return `<button class="btn ${cls}" onclick="${action}">${text}</button>`}
function choices(key,items,{letters=true,disabled=false}={}){const picked=s.data[key];return `<div class="choiceGrid">${items.map((item,i)=>{const obj=typeof item==='string'?{title:item}:item;return `<button class="choice ${picked===i?'selected':''} ${disabled?'disabled':''}" ${disabled?'disabled':`onclick="Actions.pick('${key}',${i})"`}>${letters?`<span class="letter">${String.fromCharCode(65+i)}</span>`:''}<span class="choiceText"><b>${obj.title}</b>${obj.sub?`<span>${obj.sub}</span>`:''}</span></button>`}).join('')}</div>`}
function feedback(ok,titleGood,textGood,titleBad,textBad){return `<div class="feedback ${ok?'good':'bad'}"><div class="feedbackTitle">${ok?titleGood:titleBad}</div><p>${ok?textGood:textBad}</p></div>`}
function stampAward(lesson,demonstrated){return `<div class="stampAward ${demonstrated?'':'outline'}"><div class="stampIcon">${lesson.icon}</div><div class="label">${demonstrated?'Pieza demostrada':'Pieza descubierta'}</div><h3>${lesson.concept}</h3><p class="small muted">${demonstrated?'La aplicaste correctamente en un contexto nuevo.':'La idea ya apareció, pero todavía falta demostrarla en otro contexto. Volverá en la práctica.'}</p></div>`}
function beliefText(){return ['Que es una inversión','Que es una estafa','Que es dinero digital','Que es una tecnología','Nada en concreto'][s.belief]||'Bitcoin'}
function firstIncomplete(){return LESSONS.find(l=>!s.completed.includes(l.id))||LESSONS[0]}
function lessonBy(id){return LESSONS.find(l=>l.id===id)}
function nextUnlock(id){const idx=LESSONS.findIndex(l=>l.id===id);s.unlocked=Math.max(s.unlocked,Math.min(LESSONS.length,idx+2));if(s.completed.length===LESSONS.length)s.challengeUnlocked=true}
function completeLesson(id,transferOK){const l=lessonBy(id);if(!s.completed.includes(id))s.completed.push(id);setState(id,transferOK?'demonstrated':'discovered');nextUnlock(id);log('lesson_completed',{lesson:id,transferOK});s.view='lessonReward';save();render();scrollTo(0,0)}
function startLesson(id){const idx=LESSONS.findIndex(l=>l.id===id);if(idx+1>s.unlocked&&!s.worldComplete)return;s.lesson=id;s.step=0;s.view='lesson';s.data.lesson={};log('lesson_started',{lesson:id});save();render();scrollTo(0,0)}
function nextLessonStep(){s.step++;save();render();scrollTo(0,0)}
function pick(key,i){s.data[key]=i;save();render()}
function finishTransfer(id,key,correct){const ok=s.data[key]===correct;s.data[`${id}_transfer_ok`]=ok;save();nextLessonStep()}
function stateLabel(state){return {locked:'Bloqueada',discovered:'Descubierta',demonstrated:'Demostrada',affirmed:'Afirmada'}[state]||'Por explorar'}

const Actions={
 startZero(){s.entry='zero';s.view='belief';log('entry_selected',{entry:'zero'});save();render();scrollTo(0,0)},
 startLevel(){s.entry='level';s.view='placementIntro';s.placementStep=0;s.placementScore=0;s.placementResults=[];log('entry_selected',{entry:'level'});save();render();scrollTo(0,0)},
 belief(i){s.belief=i;log('belief_selected',{belief:i});save();render()},
 openMap(){s.view='map';save();render();scrollTo(0,0)},
 home(){s.view='map';s.lesson=null;s.step=0;save();render();scrollTo(0,0)},
 openLesson(id){startLesson(id)},
 pick,
 next(){nextLessonStep()},
 complete(id,key,correct){finishTransfer(id,key,correct)},
 finishLesson(id){completeLesson(id,!!s.data[`${id}_transfer_ok`])},
 afterReward(){s.view='map';save();render();scrollTo(0,0)},
 copyPhoto(){s.data.photoSent=true;save();render()},
 spendAna(){s.data.spentAna=true;save();render()},
 spendJuan(){s.data.spentJuan=true;save();render()},
 payCafe(){s.data.paidCafe=true;save();render()},
 ledgerChoice(i){s.data.ledgerKeeper=i;save();render()},
 tamper(){s.data.tampered=true;save();setTimeout(()=>{s.data.rejected=true;save();render()},350)},
 riskNext(){s.data.marketMoved=true;save();render()},
 challenge(){s.challengePick=[];s.view='challenge';s.step=0;save();render();scrollTo(0,0)},
 toggleChallenge(id){const idx=s.challengePick.indexOf(id);if(idx>=0)s.challengePick.splice(idx,1);else if(s.challengePick.length<4)s.challengePick.push(id);save();render()},
 checkChallenge(){s.challengeAttempts++;const correct=['double','central','network','risk'];const ok=s.challengePick.length===4&&s.challengePick.every((x,i)=>x===correct[i]);s.data.challengeOK=ok;if(ok){s.worldComplete=true;s.practiceAt=Date.now()+3*24*3600*1000;setState('functions',conceptState('functions')==='discovered'?'demonstrated':conceptState('functions'));setState('ledger',conceptState('ledger')==='discovered'?'demonstrated':conceptState('ledger'));setState('double',conceptState('double')==='discovered'?'demonstrated':conceptState('double'));setState('intermediary',conceptState('intermediary')==='discovered'?'demonstrated':conceptState('intermediary'));setState('bitcoin',conceptState('bitcoin')==='discovered'?'demonstrated':conceptState('bitcoin'));setState('risk',conceptState('risk')==='discovered'?'demonstrated':conceptState('risk'));s.step=2}else{s.step=1}log('challenge_checked',{ok,attempt:s.challengeAttempts});save();render();scrollTo(0,0)},
 retryChallenge(){s.challengePick=[];s.step=0;save();render();scrollTo(0,0)},
 passport(){s.view='passport';save();render();scrollTo(0,0)},
 placementAnswer(i){const qs=[{a:1,concept:'functions'},{a:0,concept:'double'},{a:1,concept:'bitcoin'}];const q=qs[s.placementStep],ok=i===q.a;s.placementResults.push({step:s.placementStep,ok,answer:i,concept:q.concept});if(ok){s.placementScore++;setState(q.concept,'demonstrated')}else setState(q.concept,'discovered');s.data.placementFeedback={ok,step:s.placementStep};s.view='placementFeedback';log('placement_answered',{step:s.placementStep,ok});save();render();scrollTo(0,0)},
 placementContinue(){s.placementStep++;if(s.placementStep>=3){if(s.placementScore===3){s.unlocked=6;s.challengeUnlocked=true}else if(s.placementScore===2){s.unlocked=4}else if(s.placementScore===1){s.unlocked=2}else{s.unlocked=1}s.view='placementResult'}else{s.view='placement'}save();render();scrollTo(0,0)},
 placementStart(){s.view='placement';save();render();scrollTo(0,0)},
 reset(){if(confirm('¿Borrar todo el progreso guardado en este dispositivo?'))reset()},
 practice(){s.view='practice';s.step=0;save();render();scrollTo(0,0)},
 practiceAnswer(i){const answers=[0,1,2],concepts=['double','bitcoin','risk'];const ok=i===answers[s.step];if(ok)setState(concepts[s.step],'affirmed');s.data[`practice_${s.step}`]=ok;s.step++;if(s.step>=3)s.view='practiceResult';save();render();scrollTo(0,0)},
 exportData(){const blob=new Blob([JSON.stringify({...s,events:s.events},null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='dbu-mvp-session.json';a.click();URL.revokeObjectURL(a.href)}
};
window.Actions=Actions;

function welcome(){return top({home:false,progress:false})+card(`<div class="eyebrow">MVP · Mundo 1</div><h1>Entendé Bitcoin <span class="orange">desde cero.</span></h1><p>No hace falta saber qué es una wallet, una seed, un nodo ni una blockchain.</p><div class="callout orange"><strong>La idea:</strong><br><span class="muted">primero vivís el problema. Después aparece el concepto.</span></div><p class="muted">En este primer mundo vas a construir una respuesta a una sola pregunta: <b>¿por qué apareció Bitcoin?</b></p>${btn('Empezar desde cero','Actions.startZero()')}${btn('Ya sé algo · encontrar mi nivel','Actions.startLevel()','secondary')}<p class="tiny muted" style="margin-top:16px">Sin cuenta · sin precio · sin premios en dinero · el progreso queda en este dispositivo.</p>`,'hero')}
function belief(){return top({home:false,progress:false})+card(`<div class="eyebrow">Antes de abrir la primera puerta</div><h2>¿Qué escuchaste sobre Bitcoin?</h2><p class="muted">No hay una respuesta correcta. Queremos empezar desde tu punto de partida.</p>${choices('belief',['Que es una inversión','Que es una estafa','Que es dinero digital','Que es una tecnología','Nada en concreto'],{letters:false})}${s.data.belief!==undefined?btn('Ver mi camino','Actions.openMap()'):''}`)}

function map(){const count=completedCount();const practiceReady=DEMO|| (s.practiceAt&&Date.now()>=s.practiceAt);return top()+card(`<div class="worldStrip"><span class="worldPill active">Mundo 1 · De dinero a Bitcoin</span><span class="worldPill">Mundo 2 · Cómo funciona</span><span class="worldPill">Mundo 3 · Claves</span></div><div class="mapIntro"><div><div class="eyebrow">Tu camino</div><h2>${s.worldComplete?'Mundo 1 completo':'Construí la idea paso a paso'}</h2></div><div class="counter">${count}/6 lecciones</div></div><p class="muted">Las puertas se abren por dependencia: cada idea prepara la siguiente.</p><div class="path">${LESSONS.map((l,i)=>{const done=s.completed.includes(l.id),open=i<s.unlocked||s.worldComplete,current=open&&!done&&i===Math.min(s.unlocked-1,5),state=conceptState(l.id);return `<button class="door ${done?'done ':''}${current?'current ':''}${!open?'locked':''}" ${open?`onclick="Actions.openLesson('${l.id}')"`:'disabled'}><span class="doorIcon">${done?'✓':l.icon}</span><span class="doorTitle"><b>${l.n}. ${l.title}</b><span>${l.sub}</span>${state!=='locked'?`<span>Pasaporte: ${stateLabel(state)}</span>`:''}</span><span class="doorState">${done?'✓':open?'›':'⌁'}</span></button>`}).join('')}</div>${s.challengeUnlocked||s.worldComplete?btn(s.worldComplete?'Repetir desafío del mundo':'Abrir desafío · Explicáselo a Ana','Actions.challenge()','secondary'):''}${s.worldComplete?btn('Ver Pasaporte Bitcoin','Actions.passport()'):''}${practiceReady&&s.worldComplete?btn('Práctica · afirmar 3 piezas','Actions.practice()','secondary'):s.worldComplete?'<p class="small muted" style="margin-top:14px">La práctica espaciada aparecerá después para comprobar qué quedó, sin rachas ni castigos.</p>':''}<div class="future"><div class="futureRow"><div class="futureNum">2</div><div><b>Cómo funciona Bitcoin</b><div class="small muted">Firmas · transacciones · nodos · mineros · bloques</div></div></div><div class="futureRow"><div class="futureNum">3</div><div><b>Claves y control</b><div class="small muted">Wallet · custodia · autocustodia · recuperación</div></div></div></div>`)}

function lessonReward(){const l=lessonBy(s.lesson),ok=!!s.data[`${l.id}_transfer_ok`];return top()+card(`<div class="eyebrow">Lección terminada</div><h2>${ok?'Lo demostraste.':'La pieza ya apareció.'}</h2>${stampAward(l,ok)}<p class="muted">${ok?'No ganaste el sello por terminar: lo ganaste por aplicar la idea en una situación distinta.':'No pasa nada por equivocarse. El error queda como pista para la práctica futura.'}</p>${btn('Volver al camino','Actions.afterReward()')}`)}

function lesson(id,step){if(id==='functions')return lessonFunctions(step);if(id==='ledger')return lessonLedger(step);if(id==='double')return lessonDouble(step);if(id==='intermediary')return lessonIntermediary(step);if(id==='bitcoin')return lessonBitcoin(step);return lessonRisk(step)}
function lessonShell(inner,label){return top()+card(`<div class="kicker">${label}</div>${inner}`)}

function lessonFunctions(st){
 if(st===0)return lessonShell(`<h2>Imaginemos un intercambio sin dinero.</h2><div class="scene"><div class="person"><div class="avatar">🧺</div><div class="personMeta"><b>Vos</b><span>Tenés tomates</span></div><div class="sceneObject">🍅</div></div><div class="downArrow">↓</div><div class="person"><div class="avatar">☕</div><div class="personMeta"><b>Café del barrio</b><span>Querés un café</span></div><div class="sceneObject">☕</div></div></div><p>El café no necesita tomates hoy.</p>${btn('Intentar pagar con tomates','Actions.next()')}`,'Lección 1 · Situación');
 if(st===1)return lessonShell(`<h2>El intercambio no ocurre.</h2><div class="callout red"><strong>El problema no es que los tomates “no valgan”.</strong><br><span class="muted">Las dos personas simplemente no necesitan lo que la otra ofrece en ese momento.</span></div><h3>¿Qué ayudaría?</h3>${choices('f_medium',[{title:'Algo que ambos acepten',sub:'Aunque cada uno quiera cosas distintas'},{title:'Internet',sub:'Para mandar un mensaje'},{title:'Un precio más alto',sub:'Sin cambiar lo que el café necesita'}])}${s.data.f_medium!==undefined?btn('Probar','Actions.next()'):''}`,'Intentá');
 if(st===2){const ok=s.data.f_medium===0;return lessonShell(`<h2>${ok?'Exacto: aparece un medio común.':'Mirá qué faltaba.'}</h2>${feedback(ok,'Intercambio desbloqueado','Si ambos aceptan el mismo medio, el intercambio deja de depender de querer exactamente lo que ofrece la otra persona.','La pieza que faltaba','Internet o un precio distinto no resuelven que el café no quiera tomates. Hace falta algo aceptado por ambos.')}<div class="paper"><h3>Una misma herramienta puede hacer 3 trabajos</h3><div class="ledgerRow"><span>Comprar un café</span><b>Intercambiar</b></div><div class="ledgerRow"><span>Café = 3 unidades</span><b>Comparar precios</b></div><div class="ledgerRow"><span>Guardar 20 para mañana</span><b>Trasladar valor</b></div></div>${btn('Ponerles nombre','Actions.next()')}`,'Consecuencia');}
 if(st===3)return lessonShell(`<h2>Tres funciones útiles del dinero.</h2><div class="split"><div class="metric"><span>1</span><b>Intercambio</b><span>Facilita comprar y vender.</span></div><div class="metric"><span>2</span><b>Unidad de cuenta</b><span>Permite comparar precios.</span></div></div><div class="metric" style="marg