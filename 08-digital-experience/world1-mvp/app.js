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
 placementAnswer(i){const qs=[{a:1,concept:'functions'},{a:0,concept:'double'},{a:1,concept:'bitcoin'}];const q=qs[s.placementStep],ok=i===q.a;