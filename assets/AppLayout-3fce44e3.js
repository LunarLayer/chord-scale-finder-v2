import{R as G,u as Oe,c as We,n as S,m as pe,a as _,t as De,g as Ve,d as Re,b as Z,e as ve,i as ee,f as K,h as te,j as H,k as Be,l as Ge,o as _e,r as xe,p as Ke,s as He,q as ze,v as Ue,w as qe,x as be,y as W,z as j,A as m,B as je,C as n,D as Xe,E as Ye,F as Qe,G as q,H as a,I as Je,J as Ze,K as M,L as et,M as D,N as tt,O as oe,P as V,Q as R,S as nt,T as ae,U as st,V as rt}from"./index-8a90e514.js";import it from"./Loader-7ee42d21.js";function ye(e=G){const t=e===G?Oe:We(e);return function(){const{store:s}=t();return s}}const ot=ye();function at(e=G){const t=e===G?ot:ye(e);return function(){return t().dispatch}}const w=at();var ct=e=>{const t=e.reduce((r,s)=>{const i=S(s).chroma;return i!==void 0&&(r[i]=r[i]||S(s).name),r},{});return r=>t[r]};function lt(e,t={}){const r=e.map(i=>S(i).pc).filter(i=>i);return S.length===0?[]:pt(r,1,t).filter(i=>i.weight).sort((i,o)=>o.weight-i.weight).map(i=>i.name)}var z={anyThirds:384,perfectFifth:16,nonPerfectFifths:40,anySeventh:3},U=e=>t=>!!(t&e),ut=U(z.anyThirds),dt=U(z.perfectFifth),ft=U(z.anySeventh),ht=U(z.nonPerfectFifths);function mt(e){const t=parseInt(e.chroma,2);return ut(t)&&dt(t)&&ft(t)}function gt(e){const t=parseInt(e,2);return ht(t)?e:(t|16).toString(2)}function pt(e,t,r){const s=e[0],i=S(s).chroma,o=ct(e),u=pe(e,!1),c=[];return u.forEach((l,d)=>{const h=r.assumePerfectFifth&&gt(l);_().filter(f=>r.assumePerfectFifth&&mt(f)?f.chroma===h:f.chroma===l).forEach(f=>{const p=f.aliases[0],k=o(d);d!==i?c.push({weight:.5*t,name:`${k}${p}/${s}`}):c.push({weight:1*t,name:`${k}${p}`})})}),c}var Q={empty:!0,name:"",symbol:"",root:"",rootDegree:0,type:"",tonic:null,setNum:NaN,quality:"Unknown",chroma:"",normalized:"",aliases:[],notes:[],intervals:[]};function ne(e){const[t,r,s,i]=De(e);return t===""?["",e]:t==="A"&&i==="ug"?["","aug"]:[t+r,s+i]}function E(e){if(e==="")return Q;if(Array.isArray(e)&&e.length===2)return B(e[1],e[0]);{const[t,r]=ne(e),s=B(r,t);return s.empty?B(e):s}}function B(e,t,r){const s=Ve(e),i=S(t||""),o=S(r||"");if(s.empty||t&&i.empty||r&&o.empty)return Q;const u=Re(i.pc,o.pc),c=s.intervals.indexOf(u)+1;if(!o.empty&&!c)return Q;const l=Array.from(s.intervals);for(let f=1;f<c;f++){const p=l[0][0],k=l[0][1],g=parseInt(p,10)+7;l.push(`${g}${k}`),l.shift()}const d=i.empty?[]:l.map(f=>Z(i,f));e=s.aliases.indexOf(e)!==-1?e:s.aliases[0];const h=`${i.empty?"":i.pc}${e}${o.empty||c<=1?"":"/"+o.pc}`,v=`${t?i.pc+" ":""}${s.name}${c>1&&r?" over "+o.pc:""}`;return{...s,name:v,symbol:h,type:s.name,root:o.name,intervals:l,rootDegree:c,tonic:i.name,notes:d}}var vt=ve("Chord.chord","Chord.get",E);function xt(e,t){const[r,s]=ne(e);return r?Z(r,t)+s:e}function bt(e){const t=E(e),r=ee(t.chroma);return K().filter(s=>r(s.chroma)).map(s=>s.name)}function jt(e){const t=E(e),r=ee(t.chroma);return _().filter(s=>r(s.chroma)).map(s=>t.tonic+s.aliases[0])}function yt(e){const t=E(e),r=te(t.chroma);return _().filter(s=>r(s.chroma)).map(s=>t.tonic+s.aliases[0])}function St(e){const{intervals:t,tonic:r}=E(e),s=H(t,r);return i=>i?s(i>0?i-1:i):""}function Nt(e){const{intervals:t,tonic:r}=E(e);return H(t,r)}var J={getChord:B,get:E,detect:lt,chordScales:bt,extended:jt,reduced:yt,tokenize:ne,transpose:xt,degrees:St,steps:Nt,chord:vt},Ct={empty:!0,name:"",type:"",tonic:null,setNum:NaN,chroma:"",normalized:"",aliases:[],notes:[],intervals:[]};function Se(e){if(typeof e!="string")return["",""];const t=e.indexOf(" "),r=S(e.substring(0,t));if(r.empty){const i=S(e);return i.empty?["",e]:[i.name,""]}const s=e.substring(r.name.length+1);return[r.name,s.length?s:""]}var kt=Be;function $(e){const t=Array.isArray(e)?e:Se(e),r=S(t[0]).name,s=Ge(t[1]);if(s.empty)return Ct;const i=s.name,o=r?s.intervals.map(c=>Z(r,c)):[],u=r?r+" "+i:i;return{...s,name:u,type:i,tonic:r,notes:o}}var Tt=ve("Scale.scale","Scale.get",$);function $t(e,t={}){const r=_e(e),s=S(t.tonic??e[0]??""),i=s.chroma;if(i===void 0)return[];const o=r.split("");o[i]="1";const u=xe(i,o).join(""),c=K().find(d=>d.chroma===u),l=[];return c&&l.push(s.name+" "+c.name),t.match==="exact"||Ne(u).forEach(d=>{l.push(s.name+" "+d)}),l}function Ft(e){const t=$(e),r=te(t.chroma);return _().filter(s=>r(s.chroma)).map(s=>s.aliases[0])}function Ne(e){const t=Ke(e)?e:$(e).chroma,r=ee(t);return K().filter(s=>r(s.chroma)).map(s=>s.name)}function At(e){const t=te($(e).chroma);return K().filter(r=>t(r.chroma)).map(r=>r.name)}function Ce(e){const t=e.map(i=>S(i).pc).filter(i=>i),r=t[0],s=He(t);return xe(s.indexOf(r),s)}function wt(e){const t=$(e);if(t.empty)return[];const r=t.tonic?t.notes:t.intervals;return pe(t.chroma).map((s,i)=>{const o=$(s).name;return o?[r[i],o]:["",""]}).filter(s=>s[0])}function Et(e){const t=Array.isArray(e)?Ce(e):$(e).notes,r=t.map(s=>S(s).chroma);return s=>{const i=typeof s=="number"?S(Ue(s)):S(s),o=i.height;if(o===void 0)return;const u=o%12,c=r.indexOf(u);if(c!==-1)return qe(i.name,t[c])}}function It(e){const t=Et(e);return(r,s)=>{const i=S(r).height,o=S(s).height;return i===void 0||o===void 0?[]:ze(i,o).map(t).filter(u=>u)}}function Pt(e){const{intervals:t,tonic:r}=$(e),s=H(t,r);return i=>i?s(i>0?i-1:i):""}function Lt(e){const{intervals:t,tonic:r}=$(e);return H(t,r)}var Mt={degrees:Pt,detect:$t,extended:Ne,get:$,modeNames:wt,names:kt,rangeOf:It,reduced:At,scaleChords:Ft,scaleNotes:Ce,steps:Lt,tokenize:Se,scale:Tt};function Ot(e,t){let s=.1+.5*(1-e/t*100/100);var i="";let u=s/100;d(0,0);for(let h=1;h<=99;h++)s-=u,h%2===0?d(h,-s):d(h,s);d(100,0);let c=document.styleSheets[0],l=null;for(let h=0;h<c.cssRules.length;h++)if(c.cssRules[h].name==="dynamicSkew"){l=c.cssRules[h];break}l?l.cssText=`@keyframes stringVibration { ${i} }`:c.insertRule(`@keyframes stringVibration { ${i} }`,c.cssRules.length);function d(h,v){i+=`${h}% {
      transform: skewY(${v}deg);
    }`}}var ke={exports:{}},Wt="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED",Dt=Wt,Vt=Dt;function Te(){}function $e(){}$e.resetWarningCache=Te;var Rt=function(){function e(s,i,o,u,c,l){if(l!==Vt){var d=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw d.name="Invariant Violation",d}}e.isRequired=e;function t(){return e}var r={array:e,bigint:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,elementType:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t,checkPropTypes:$e,resetWarningCache:Te};return r.PropTypes=r,r};ke.exports=Rt();var Bt=ke.exports;const O=be(Bt);function Gt(e){var t=typeof e;return e!=null&&(t=="object"||t=="function")}var Fe=Gt,_t=typeof W=="object"&&W&&W.Object===Object&&W,Kt=_t,Ht=Kt,zt=typeof self=="object"&&self&&self.Object===Object&&self,Ut=Ht||zt||Function("return this")(),Ae=Ut,qt=Ae,Xt=function(){return qt.Date.now()},Yt=Xt,Qt=/\s/;function Jt(e){for(var t=e.length;t--&&Qt.test(e.charAt(t)););return t}var Zt=Jt,en=Zt,tn=/^\s+/;function nn(e){return e&&e.slice(0,en(e)+1).replace(tn,"")}var sn=nn,rn=Ae,on=rn.Symbol,we=on,ce=we,Ee=Object.prototype,an=Ee.hasOwnProperty,cn=Ee.toString,L=ce?ce.toStringTag:void 0;function ln(e){var t=an.call(e,L),r=e[L];try{e[L]=void 0;var s=!0}catch{}var i=cn.call(e);return s&&(t?e[L]=r:delete e[L]),i}var un=ln,dn=Object.prototype,fn=dn.toString;function hn(e){return fn.call(e)}var mn=hn,le=we,gn=un,pn=mn,vn="[object Null]",xn="[object Undefined]",ue=le?le.toStringTag:void 0;function bn(e){return e==null?e===void 0?xn:vn:ue&&ue in Object(e)?gn(e):pn(e)}var jn=bn;function yn(e){return e!=null&&typeof e=="object"}var Sn=yn,Nn=jn,Cn=Sn,kn="[object Symbol]";function Tn(e){return typeof e=="symbol"||Cn(e)&&Nn(e)==kn}var $n=Tn,Fn=sn,de=Fe,An=$n,fe=0/0,wn=/^[-+]0x[0-9a-f]+$/i,En=/^0b[01]+$/i,In=/^0o[0-7]+$/i,Pn=parseInt;function Ln(e){if(typeof e=="number")return e;if(An(e))return fe;if(de(e)){var t=typeof e.valueOf=="function"?e.valueOf():e;e=de(t)?t+"":t}if(typeof e!="string")return e===0?e:+e;e=Fn(e);var r=En.test(e);return r||In.test(e)?Pn(e.slice(2),r?2:8):wn.test(e)?fe:+e}var Mn=Ln,On=Fe,X=Yt,he=Mn,Wn="Expected a function",Dn=Math.max,Vn=Math.min;function Rn(e,t,r){var s,i,o,u,c,l,d=0,h=!1,v=!1,f=!0;if(typeof e!="function")throw new TypeError(Wn);t=he(t)||0,On(r)&&(h=!!r.leading,v="maxWait"in r,o=v?Dn(he(r.maxWait)||0,t):o,f="trailing"in r?!!r.trailing:f);function p(x){var T=s,P=i;return s=i=void 0,d=x,u=e.apply(P,T),u}function k(x){return d=x,c=setTimeout(N,t),h?p(x):u}function g(x){var T=x-l,P=x-d,ie=t-T;return v?Vn(ie,o-P):ie}function F(x){var T=x-l,P=x-d;return l===void 0||T>=t||T<0||v&&P>=o}function N(){var x=X();if(F(x))return I(x);c=setTimeout(N,g(x))}function I(x){return c=void 0,f&&s?p(x):(s=i=void 0,u)}function y(){c!==void 0&&clearTimeout(c),d=0,s=l=i=c=void 0}function b(){return c===void 0?u:I(X())}function C(){var x=X(),T=F(x);if(s=arguments,i=this,l=x,T){if(c===void 0)return k(l);if(v)return clearTimeout(c),c=setTimeout(N,t),p(l)}return c===void 0&&(c=setTimeout(N,t)),u}return C.cancel=y,C.flush=b,C}var Bn=Rn;const me=be(Bn);const ge="/chord-scale-finder-v2/icons/speaker-full.svg",Gn="/chord-scale-finder-v2/icons/speaker-medium.svg",_n="/chord-scale-finder-v2/icons/speaker-low.svg",Kn="/chord-scale-finder-v2/icons/speaker-muted.svg";function Hn({loadingSoundProgress:e}){const t=j.useRef(null),[r,s]=j.useState(!0),[i,o]=j.useState(ge),[u,c]=j.useState(!1),[l,d]=j.useState(null),[h,v]=j.useState(10),f=m(g=>g.user.soundFile);j.useEffect(()=>{const g=setInterval(()=>{je.state()==="loaded"&&(s(!1),clearInterval(g))},50);return()=>{clearInterval(g)}},[f]);function p(){if(!r){l&&clearTimeout(l),c(!u);const g=setTimeout(()=>{c(!1)},2e3);d(g)}}function k(){if(!r){l&&clearTimeout(l);let g=parseInt(t.current.value);v(g),g===0&&o(Kn),g>0&&g<=3&&o(_n),g>3&&g<=7&&o(Gn),g>7&&g<=10&&o(ge);let F=g/10;Xe.Howler.volume(F);const N=setTimeout(()=>{c(!1)},2e3);d(N)}}return n.jsxs("div",{id:"SoundController",className:`${u?"expanded":""} ${r?"loadingSound":""}`,children:[n.jsxs("button",{onClick:()=>p(),children:[n.jsx("img",{id:"speakerIcon",src:i,alt:"Volume icon"}),n.jsx("div",{className:"loader"})]}),n.jsx("input",{className:"volumeSlider",ref:t,type:"range",orient:"vertical",value:h,min:"0",max:"10",onChange:k})]})}function zn(){return n.jsx("nav",{id:"Navbar",children:n.jsxs("div",{className:"flex-wrapper",children:[n.jsxs("div",{className:"userSettings",children:[n.jsx("button",{children:"Login"}),n.jsx("button",{children:"Projects"})]}),n.jsx(Hn,{})]})})}function Y({onClick:e,children:t,className:r,active:s}){return n.jsx("button",{className:`button ${r} ${s?"active":""}`,onClick:e,children:t})}function Ie(){const e=Ye.createRef(),t=w(),r=m(o=>o.fretboard.fretCount),s=m(o=>o.fretboard.fretCap);function i(){t(Qe(parseInt(e.current.value)))}return n.jsxs("div",{id:"fretCount-slider",children:[n.jsxs("h4",{children:["Frets: ",r==0?"None":r]}),n.jsx("input",{ref:e,type:"range",value:r,min:"0",max:s,onChange:i})]})}Ie.propTypes={activeView:O.string,setActiveView:O.func};function Pe(){const e=w();m(s=>s.ui.currentViewSection1);const t=m(s=>s.musicTheory.key),r=m(s=>s.ui.menus);return n.jsxs("div",{id:"toolbar",children:[n.jsxs("div",{className:"Tonality wrapper",children:[n.jsx("h4",{children:"Key"}),n.jsx("div",{className:"content",children:n.jsxs(Y,{active:r.keyChange.showing,onClick:()=>e(q("keyChange")),children:[t.tonic," ",t.type==="major"?"Major":"Minor"]})})]}),n.jsxs("div",{className:"instrument wrapper",children:[n.jsx("h4",{children:"Settings"}),n.jsx("div",{className:"content",children:n.jsx(Y,{active:r.settings.showing,onClick:()=>e(q("settings")),children:"🛠️"})})]}),n.jsxs("div",{className:"menus wrapper",children:[n.jsx("h4",{children:"Quick menus"}),n.jsx("div",{className:"content",children:n.jsx(Y,{active:r.instrument.showing,onClick:()=>e(q("instrument")),children:"🎵"})})]}),n.jsx(Ie,{})]})}Pe.propTypes={activeView:O.string,setActiveView:O.func};function Un(e,t,r,s){let i=r.type==="minor"?r.natural.scale:r.scale;if(t==="note"){for(let o of i)if(a.enharmonic(o)===e)return o.includes("b")?o.replace(/b/g,"♭"):o.includes("#")?o.replace(/#/g,"♯"):o;return s==="b"?a.enharmonic(e).replace(/b/g,"♭"):e.replace(/#/g,"♯")}if(t==="degree"){for(let o=0;o<i.length;o++)if(e===i[o])return o+1}else if(t==="interval"){for(let o=0;o<i.length;o++)if(e===i[o])return r.intervals[o]}else if(t==="doReMi"){for(let o=0;o<i.length;o++)if(e===r.scale[o]){if(o===0)return"Do";if(o===1)return"Re";if(o===2)return"Mi";if(o===3)return"Fa";if(o===4)return"So";if(o===5)return"La";if(o===6)return"Ti"}}return e}const Le=j.memo(function({pitchClass:t,octave:r,noteWidth:s,labelWidth:i,selected:o,highlighted:u,stringNumber:c}){const l=m(f=>f.musicTheory.labelNotes),d=m(f=>f.musicTheory.key),h=m(f=>f.musicTheory.accidental);let v=Un(t,l,d,h);return n.jsx("button",{className:`note ${o?"selected":""} ${u?"highlighted":""}`,"data-pitchclass":t,"data-octave":r,"data-stringnumber":c,style:{minWidth:s,maxWidth:s},children:n.jsx("span",{style:{minWidth:i,maxWidth:i,minHeight:i,maxHeight:i},children:v})})});function qn({tuning:e,allNotes:t,nutIsFixed:r}){const s=m(o=>o.fretboard.notesLabelWidth),i=m(o=>o.fretboard.fretWidths);return n.jsx("div",{className:`nut ${r?"fixed":""}`,children:e.map((o,u)=>{let c=e.length-u,l=t.filter(v=>v.name===o.name&&v.appearsOnStrings.includes(c))[0],d=i[0],h=l.selectedOnStrings.includes(c);return n.jsx(Le,{pitchClass:l.pc,octave:l.oct,noteWidth:d,labelWidth:s,selected:h,highlighted:l.highlighted,stringNumber:c},`note${l.name}string${c}`)})})}let A=[{isAnimating:null,timeout:null},{isAnimating:null,timeout:null},{isAnimating:null,timeout:null},{isAnimating:null,timeout:null},{isAnimating:null,timeout:null},{isAnimating:null,timeout:null},{isAnimating:null,timeout:null},{isAnimating:null,timeout:null},{isAnimating:null,timeout:null},{isAnimating:null,timeout:null},{isAnimating:null,timeout:null},{isAnimating:null,timeout:null}];function Xn(e,t,r,s){let i=t;for(let d=0;d<r;d++)i-=s[d];Ot(i,t);let o=document.getElementsByClassName("stringVisual")[e],u=o.querySelector(".staticPart"),c=o.querySelector(".vibratingPart");A[e].timeout&&clearTimeout(A[e].timeout),c.classList.remove("animate"),c.offsetWidth,u.style.width=`calc(100% - ${i}px)`,c.style.width=`${i}px`,c.classList.add("animate");const l=[...A];l[e].isAnimating=!0,A=l,A[e].timeout=setTimeout(()=>{const d=[...A];d[e].isAnimating=!1,A=d,c.classList.remove("animate")},3e3)}function Yn(e,t,r){let s,i,o=!1,u,c,l=[],d=document.getElementById("Fretboard"),h=document.getElementById("Strings"),v=document.getElementById("FretVisuals"),f=document.getElementById("StringVisuals");d.addEventListener("mousedown",p),d.addEventListener("touchstart",k);function p(y){l=[];let b;d.classList.contains("nutIsFixed")?(b=h.clientWidth!==h.scrollWidth,l.push(h),l.push(v),l.push(f)):(b=d.clientWidth!==d.scrollWidth,l.push(d)),b&&(document.addEventListener("mousemove",g),document.addEventListener("mouseup",N),s=y.pageX-d.offsetLeft,i=l[0].scrollLeft)}function k(y){l=[];let b;d.classList.contains("nutIsFixed")?(b=h.clientWidth!==h.scrollWidth,l.push(h),l.push(v),l.push(f)):(b=d.clientWidth!==d.scrollWidth,l.push(d)),b&&(document.addEventListener("touchmove",F),document.addEventListener("touchend",I),s=y.touches[0].pageX-d.offsetLeft,i=l[0].scrollLeft)}function g(y){if(y.preventDefault(),u=y.pageX-d.offsetLeft,c=u-s,Math.abs(c)>10&&(r(!0),o=!0),o)for(let C=0;C<l.length;C++)l[C].scrollLeft=i-c}function F(y){if(y.preventDefault(),u=y.touches[0].pageX-d.offsetLeft,c=u-s,Math.abs(c)>10&&(r(!0),o=!0),o)for(let C=0;C<l.length;C++)l[C].scrollLeft=i-c}function N(){if(o){let y=l[0].scrollLeft;for(let b=0;b<l.length;b++)e(t(y));o=!1}document.removeEventListener("mouseup",N),document.removeEventListener("mousemove",g)}function I(){if(o){let y=l[0].scrollLeft;for(let b=0;b<l.length;b++)e(t(y));o=!1}document.removeEventListener("touchEnd",N),document.removeEventListener("touchMove",g)}}function Me(e,t){let r=0;for(let s=0;s<e.length;s++)r+=e[s];return r}function Qn(e,t){return e.filter(s=>s.appearsOnStrings.includes(t))}const Jn=j.memo(function({notes:t,stringNumber:r}){const s=m(u=>u.fretboard.nutIsFixed),i=m(u=>u.fretboard.notesLabelWidth),o=m(u=>u.fretboard.fretWidths);return n.jsx("div",{className:"string","data-stringnumber":r,children:t.map((u,c)=>{let l=u.selectedOnStrings.includes(r),d=s?o[c+1]:o[c];return n.jsx(Le,{pitchClass:u.pc,octave:u.oct,noteWidth:d,labelWidth:i,selected:l,highlighted:u.highlighted,stringNumber:r},`note${u.name}string${r}`)})})});function Zn({tuning:e,nutIsFixed:t,allNotes:r,fretWidths:s,width:i}){return n.jsx("div",{id:"Strings",style:{height:"145px",left:t?s[0]+"px":"auto",right:t?"unset":"auto",overflow:t?"hidden":"visible",maxWidth:t?i:"100%"},children:e.map((o,u)=>{let c=e.length-u,l=Qn(r,c);return t&&(l=l.slice(1)),n.jsx(Jn,{notes:l,stringNumber:c},`string${c}`)})})}function es({style:e,theme:t,tuning:r,fretWidths:s,fretboardWidth:i,nutIsFixed:o,width:u}){let c=Me(s);return n.jsxs(n.Fragment,{children:[n.jsx("div",{id:"StringVisuals",style:{width:o?i:c},children:r.map((l,d)=>{let h=r.length-d;return n.jsxs("div",{className:"stringVisual",style:{width:o?c:"auto"},children:[n.jsx("span",{className:"staticPart"}),n.jsx("span",{className:"vibratingPart"})]},`stringVisual${h}`)})}),o?n.jsx("div",{className:"nutVisual",style:{minWidth:s[0]+"px"}}):null,n.jsx("div",{id:"FretVisuals",className:`${o?"nutIsFixed":""}`,style:{left:o?s[0]+"px":"auto",right:o?0:"auto"},children:s.map((l,d)=>d===0&&o?null:n.jsxs("div",{className:!o&&d===0?"fretVisual nutVisual":"fretVisual",style:{minWidth:l,maxWidth:o?u:"auto"},children:[n.jsx("span",{className:"fretband"}),[3,5,7,9,15,17,19,21].includes(d)?n.jsx("span",{className:"fretMarker"}):null,[12,24].includes(d)?n.jsxs(n.Fragment,{children:[n.jsx("span",{className:"fretMarker"}),n.jsx("span",{className:"fretMarker"})]}):null,[24].includes(d)?n.jsx("span",{className:"fretband"}):null]},`fretVisual${d}`))})]})}function ts(){const[e,t]=j.useState(!1),r=w(),s=m(f=>f.musicTheory.allNotes),i=m(f=>f.musicTheory.markNotes),o=m(f=>f.fretboard.tuning),u=m(f=>f.fretboard.fretWidths),c=m(f=>f.fretboard.nutIsFixed),l=m(f=>f.fretboard.fretboardWidth),d=m(f=>f.fretboard.fretboardStyle),h=m(f=>f.fretboard.fretboardTheme);j.useEffect(()=>{Yn(r,Je,t)},[r]);function v(f){if(e)t(!1);else{let p=f.target;if(p.parentNode.classList.contains("note")&&(p=p.parentNode),p.classList.contains("note")){let k=p.parentNode,g=p.getAttribute("data-octave"),F=p.getAttribute("data-pitchclass"),N=parseInt(p.getAttribute("data-stringnumber")),I=o.length-N,y=k.querySelectorAll(".note"),b=Array.from(y).indexOf(p),C=a.get(F+g),x=p.classList.contains("selected");i!=="none"&&r(Ze({note:C,stringNumber:N,wasSelected:x})),je.playNote(F+g,N);let T=Me(u);Xn(I,T,b,u)}}}return n.jsxs("div",{id:"Fretboard",className:c?"nutIsFixed":"",style:{width:l,height:145},onClick:v,children:[c?n.jsx(qn,{tuning:o,allNotes:s,nutIsFixed:c}):null,n.jsx(Zn,{tuning:o,nutIsFixed:c,allNotes:s,fretWidths:u,width:l-u[0]}),n.jsx(es,{style:d,theme:h,tuning:o,fretWidths:u,fretboardWidth:l,nutIsFixed:c,width:l-u[0]})]})}function ns(){let e={username:"Guest",key:M.majorKey("C"),scale:"major",tonality:"todo",accidental:"",allNotes:[{...a.get("C0")},{...a.get("C#0")},{...a.get("D0")},{...a.get("D#0")},{...a.get("E0")},{...a.get("F0")},{...a.get("F#0")},{...a.get("G0")},{...a.get("G#0")},{...a.get("A0")},{...a.get("A#0")},{...a.get("B0")},{...a.get("C1")},{...a.get("C#1")},{...a.get("D1")},{...a.get("D#1")},{...a.get("E1")},{...a.get("F1")},{...a.get("F#1")},{...a.get("G1")},{...a.get("G#1")},{...a.get("A1")},{...a.get("A#1")},{...a.get("B1")},{...a.get("C2")},{...a.get("C#2")},{...a.get("D2")},{...a.get("D#2")},{...a.get("E2")},{...a.get("F2")},{...a.get("F#2")},{...a.get("G2")},{...a.get("G#2")},{...a.get("A2")},{...a.get("A#2")},{...a.get("B2")},{...a.get("C3")},{...a.get("C#3")},{...a.get("D3")},{...a.get("D#3")},{...a.get("E3")},{...a.get("F3")},{...a.get("F#3")},{...a.get("G3")},{...a.get("G#3")},{...a.get("A3")},{...a.get("A#3")},{...a.get("B3")},{...a.get("C4")},{...a.get("C#4")},{...a.get("D4")},{...a.get("D#4")},{...a.get("E4")},{...a.get("F4")},{...a.get("F#4")},{...a.get("G4")},{...a.get("G#4")},{...a.get("A4")},{...a.get("A#4")},{...a.get("B4")},{...a.get("C5")},{...a.get("C#5")},{...a.get("D5")},{...a.get("D#5")},{...a.get("E5")},{...a.get("F5")},{...a.get("F#5")},{...a.get("G5")},{...a.get("G#5")},{...a.get("A5")},{...a.get("A#5")},{...a.get("B5")},{...a.get("C6")},{...a.get("C#6")},{...a.get("D6")},{...a.get("D#6")},{...a.get("E6")},{...a.get("F6")},{...a.get("F#6")},{...a.get("G6")},{...a.get("G#6")},{...a.get("A6")},{...a.get("A#6")},{...a.get("B6")},{...a.get("C7")},{...a.get("C#7")},{...a.get("D7")},{...a.get("D#7")},{...a.get("E7")},{...a.get("F7")},{...a.get("F#7")},{...a.get("G7")},{...a.get("G#7")},{...a.get("A7")},{...a.get("A#7")},{...a.get("B7")},{...a.get("C8")},{...a.get("C#8")},{...a.get("D8")},{...a.get("D#8")},{...a.get("E8")},{...a.get("F8")},{...a.get("F#8")},{...a.get("G8")},{...a.get("G#8")},{...a.get("A8")},{...a.get("A#8")},{...a.get("B8")}],instrument:"Fretboard",nutIsFixed:!1,soundFile:"jazzBass.mp3",instrumentStyle:"default",instrumentTheme:"default",coloredNotes:!1,tuning:[a.get("G2"),a.get("D2"),a.get("A1"),a.get("E1")],markNotes:"single",labelNotes:"note",fretPosition:"all",highlightNotes:"none",assumePerfectFifth:!1,menus:{keyChange:{id:"KeyChangeMenu",showing:!1},instrument:{id:"InstrumentMenu",showing:!1},settings:{id:"SettingsMenu",showing:!1}},projects:[{title:"dance with the devil in Am",key:void 0,tonality:void 0,accidental:void 0,instrument:void 0,instrumentSound:void 0,instrumentVariant:void 0,theme:void 0,coloredNotes:void 0,tuning:void 0,keyChangeMenu:{showing:!1},fretboardMenu:{showing:!1},settingsMenu:{showing:!1},soundPlayerMenu:{showing:!1}}]};for(let t of e.allNotes)t.selected=!1,t.selectedOnStrings=[],t.highlighted=!1,t.highlightedOnStrings=[],t.appearsOnStrings=[];return e}function ss(e){const t=e.shift();return e.push(t),e}function rs(e,t){let r=[];for(let s=0;s<e.length;s++){let i;t?(i=J.detect(e,{assumePerfectFifth:!0}),console.log("detected: "+i)):(i=J.detect(e,{assumePerfectFifth:!1}),console.log("detected: "+i)),r.push(i),ss(e)}return r}function is(){const e=w(),t=m(c=>c.musicTheory.allNotes),r=m(c=>c.musicTheory.assumePerfectFifth),[s,i]=j.useState([]),[o,u]=j.useState([]);return console.log("chord: "+J.get(["C","E","G"])),j.useEffect(()=>{let c=t.reduce((d,h)=>(h.selected&&!d.includes(h.pc)&&(console.log("pushing: "+h.pc),d.push(h.pc)),d),[]);console.log(c);let l=rs(c,r);i(l),u(Mt.detect(c)),console.log("effecting")},[t,r]),n.jsxs("div",{id:"ChordScaleIdentifier",children:[n.jsxs("div",{className:"toolbar",children:[n.jsx("label",{htmlFor:"AssumePerfectFifth",children:"Assume perfect fifth"}),n.jsx("input",{id:"AssumePerfectFifth",type:"checkbox",onChange:()=>e(et())})]}),n.jsxs("div",{className:"chords",children:[n.jsxs("div",{className:"chord",children:[n.jsx("p",{children:"Chord:"}),n.jsx("button",{children:s[0]})]}),n.jsxs("div",{className:"possibleChords",children:[n.jsx("p",{children:"Possible Chords:"}),s.map((c,l)=>n.jsx("button",{children:c},c+l))]}),n.jsxs("div",{className:"chordInversions",children:[n.jsx("p",{children:"Inversions:"}),s.map((c,l)=>n.jsx("button",{children:l},"inversion"+l))]})]}),n.jsxs("div",{className:"scales",children:[n.jsxs("div",{className:"scale",children:[n.jsx("p",{children:"Scale:"}),n.jsx("button",{children:o[0]})]}),n.jsxs("div",{className:"possibleScales",children:[n.jsx("p",{children:"Possible Scale:"}),o.map((c,l)=>n.jsx("button",{children:c},c+l))]}),n.jsx("div",{className:"scaleInversions",children:n.jsx("p",{children:"Scale inversions:"})})]})]})}function se(e){e.style.maxHeight=null}function re(e){e.style.maxHeight=e.scrollHeight+"px"}function os({showing:e}){const t=w(),r=m(c=>c.musicTheory.key),s=m(c=>c.musicTheory.accidental);let i=a.get(r.tonic).letter;j.useEffect(()=>{let c=document.getElementById("KeyChangeMenu");e?re(c):se(c)},[e]);function o(c,l){r.type==="major"?t(D(M.majorKey(c+l))):t(D(M.minorKey(c+l))),t(tt(l)),t(oe())}function u(c){t(c==="major"?D(M.majorKey(r.tonic)):D(M.minorKey(r.tonic))),t(oe())}return n.jsx("div",{id:"KeyChangeMenu",children:n.jsx("div",{className:"content",children:n.jsxs("div",{className:"note-selection",children:[n.jsxs("div",{className:"naturals",children:[n.jsx("button",{className:i==="C"?"active":"",onClick:()=>o("C",s),children:"C"}),n.jsx("button",{className:i==="D"?"active":"",onClick:()=>o("D",s),children:"D"}),n.jsx("button",{className:i==="E"?"active":"",onClick:()=>o("E",s),children:"E"}),n.jsx("button",{className:i==="F"?"active":"",onClick:()=>o("F",s),children:"F"}),n.jsx("button",{className:i==="G"?"active":"",onClick:()=>o("G",s),children:"G"}),n.jsx("button",{className:i==="A"?"active":"",onClick:()=>o("A",s),children:"A"}),n.jsx("button",{className:i==="B"?"active":"",onClick:()=>o("B",s),children:"B"})]}),n.jsxs("div",{className:"accidentals",children:[n.jsx("button",{className:s==="b"?"active":"",onClick:()=>o(i,"b"),children:i+"♭"}),n.jsx("button",{className:s===""?"active":"",onClick:()=>o(i,""),children:i}),n.jsx("button",{className:s==="#"?"active":"",onClick:()=>o(i,"#"),children:i+"♯"})]}),n.jsxs("div",{className:"scaleSelection",children:[n.jsx("button",{onClick:()=>u("major"),children:"Major"}),n.jsx("button",{onClick:()=>u("minor"),children:"Minor"})]})]})})})}function as({showing:e}){return m(t=>t.ui.menus),j.useEffect(()=>{let t=document.getElementById("SettingsMenu");e?re(t):se(t)},[e]),n.jsx("div",{id:"SettingsMenu",children:n.jsx("div",{className:"content",children:"Settings Menu"})})}function cs({showing:e}){const t=w(),r=m(l=>l.musicTheory.markNotes),s=m(l=>l.musicTheory.labelNotes),i=m(l=>l.musicTheory.fretPosition),o=m(l=>l.musicTheory.highlightNotes),u=m(l=>l.fretboard.nutIsFixed);j.useEffect(()=>{let l=document.getElementById("InstrumentMenu");e?re(l):se(l)},[e]);function c(){t(nt(!u))}return n.jsxs("div",{id:"InstrumentMenu",children:[n.jsxs("div",{className:"settings",children:[n.jsxs("div",{className:"setting dropdown markNotes",children:[n.jsx("p",{children:"Mark notes"}),n.jsx("button",{children:r}),n.jsxs("div",{className:"dropdown-content",children:[n.jsx("button",{onClick:()=>t(V("single")),children:"Single"}),n.jsx("button",{onClick:()=>t(V("none")),children:"None"}),n.jsx("button",{onClick:()=>t(V("all")),children:"All"}),n.jsx("button",{onClick:()=>t(V("identical")),children:"Identical"})]})]}),n.jsxs("div",{className:"setting dropdown labelNotes",children:[n.jsx("p",{children:"Label notes"}),n.jsx("button",{children:s}),n.jsxs("div",{className:"dropdown-content",children:[n.jsx("button",{onClick:()=>t(R("note")),children:"Note"}),n.jsx("button",{onClick:()=>t(R("interval")),children:"Interval"}),n.jsx("button",{onClick:()=>t(R("degree")),children:"Degree"}),n.jsx("button",{onClick:()=>t(R("doReMi")),children:"DoReMi"})]})]}),n.jsxs("div",{className:"setting dropdown fretPositions",children:[n.jsx("p",{children:"Position"}),n.jsx("button",{children:i}),n.jsxs("div",{className:"dropdown-content",children:[n.jsx("button",{children:"All"}),n.jsx("button",{children:"1"}),n.jsx("button",{children:"2"}),n.jsx("button",{children:"3"}),n.jsx("button",{children:"4"}),n.jsx("button",{children:"5"})]})]}),n.jsxs("div",{className:"setting dropdown highlight",children:[n.jsx("p",{children:"Highlight"}),n.jsx("button",{children:o}),n.jsxs("div",{className:"dropdown-content highlight",children:[n.jsx("button",{children:"All"}),n.jsx("button",{children:"None"}),n.jsx("button",{onClick:()=>t,children:"Scale"})]})]}),n.jsxs("div",{className:"setting dropdown clear",children:[n.jsx("p",{children:"Clear"}),n.jsx("button",{children:"All"}),n.jsxs("div",{className:"dropdown-content clear",children:[n.jsx("button",{onClick:()=>t(deselectNotes("all")),children:"All"}),n.jsx("button",{onClick:()=>t(deselectNotes("marked")),children:"Marked"}),n.jsx("button",{onClick:()=>t(deselectNotes("highlighted")),children:"Highlighted"})]})]}),n.jsxs("div",{className:"setting dropdown fixNut",children:[n.jsx("p",{children:"Fixed nut"}),n.jsx("button",{className:u?"nutFixedButton active":"nutFixedButton",onClick:()=>c(),children:u?"Fixed":"Normal"})]})]}),n.jsx("button",{className:"closeButton",children:"🎵"})]})}function ls(){const e=w(),t=m(u=>u.ui.currentViewSection1),r=m(u=>u.fretboard.fretboardIsReady),s=m(u=>u.user.loginSuccess),i=m(u=>u.ui.menus);j.useEffect(()=>{if(s)e(ae({}));else{let u=ns();e(ae(u))}},[e,s]),j.useEffect(()=>{function u(){e(st(rt()))}return window.addEventListener("resize",me(u,20)),()=>{window.removeEventListener("resize",me(u,20))}},[e]);function o({view:u}){if(u==="fretboard")return n.jsx(ts,{});if(u==="piano")return n.jsx(Piano,{});if(u==="instrumentSettings")return n.jsx(InstrumentSettings,{});if(u==="keyChange")return n.jsx(KeyChange,{})}return r?n.jsxs("div",{className:"appLayout",children:[n.jsx(zn,{}),n.jsx(Pe,{}),n.jsx(os,{showing:i.keyChange.showing}),n.jsx(as,{showing:i.settings.showing}),n.jsx(cs,{showing:i.instrument.showing}),n.jsx(o,{view:t}),n.jsx(is,{})]}):n.jsx(it,{})}ls.propTypes={view:O.string};export{ls as default};
