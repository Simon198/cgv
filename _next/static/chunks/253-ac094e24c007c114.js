"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[253],{2253:function(e,t,r){r.d(t,{J:function(){return x}});var s=r(7340),n=r(598),o=r(892),a=r(5900),i=r(6621),p=r(5770);function l(e){return t=>r=>r.pipe((0,p.PM)((([t,r])=>(0,s.of)(e(t,r))),(e=>e),t))}function u(e){return t=>r=>r.pipe((0,p.PM)((([t])=>(0,s.of)(e(t))),(e=>e),t))}const m=(0,n.U)((e=>(0,p.Au)(((e,t)=>Object.assign(Object.assign({},t),{value:e})),e))),c=(0,n.U)((({value:[e]})=>e));function y([e,t,r]){const n=t-e;let o=Math.random()*n+e;return null!=r&&(o=Math.floor(o/r)*r),(0,s.of)(o)}function f(e,t){const[r,s]=e,i=t.pipe((0,n.U)((e=>(0,p.a_)([e],p.JY))),(0,p.bS)([]),(0,o.d)({bufferSize:1,refCount:!0}));return(0,a.T)(i,i.pipe(c,r,(0,p.bS)([1])),i.pipe(c,s,(0,p.bS)([2]))).pipe((0,p.Jh)(),b(3),(0,n.U)((([e,t,r])=>function(e,t,r){return(0,p.wm)(((e,t,r,s)=>!Array.isArray(r)&&!Array.isArray(s)&&null!=r&&null!=s&&r.value<=e&&e<s.value?t:null),e,t,r)}(e,t,r))))}function b(e){return(0,i.h)((t=>null!=t&&e===t.reduce(((e,t)=>null!=t?e+1:e),0)))}function d(e,t){const r=e[0],s=t.pipe((0,n.U)((e=>(0,p.a_)([e],p.JY))),(0,p.bS)([]),(0,o.d)({bufferSize:1,refCount:!0})),i=s.pipe(c,r,(0,p.bS)([1]),(0,o.d)({bufferSize:1,refCount:!0}));return(0,a.T)(...new Array((e.length-1)/2).fill(null).map(((t,r)=>(0,a.T)(s,i,s.pipe(c,e[2*r+1],(0,p.bS)([2]))).pipe((0,p.Jh)(),b(3),(0,n.U)((([e,t,r])=>function(e,t,r){return(0,p.wm)(((e,t,r,s)=>Array.isArray(r)||Array.isArray(s)||null==r||null==s||r.value!==s.value?null:t),e,t,r)}(e,t,r))),e[2*r+2],(0,n.U)((e=>[{index:[r],type:p.u4.SET,value:e}])))))).pipe((0,p.Jh)())}function S(e,t){const r=e[0],[,s,i]=e,l=t.pipe((0,n.U)((e=>(0,p.a_)([e],p.JY))),(0,p.bS)([]),(0,o.d)({bufferSize:1,refCount:!0}));return(0,a.T)(l,l.pipe(c,r,(0,p.bS)([1]))).pipe((0,p.Jh)(),b(2),(0,p.Ud)([e=>e.pipe((0,n.U)((([e,t])=>w(e,t,!0))),s),e=>e.pipe((0,n.U)((([e,t])=>w(e,t,!1))),i)]))}function w(e,t,r){return(0,p.wm)(((e,t,s)=>Array.isArray(s)||null==s||s.value!==r?null:t),e,t)}const O=(0,n.U)((e=>(0,p.Au)(((e,t)=>Object.assign(Object.assign({},t),{terminated:!0})),e)));function h(e,t){return t.pipe((0,p.dF)((e=>{var t;const r=(0,p.L$)(e),o=e.reduce(((e,t)=>Object.assign(Object.assign({},e),t.parameters)),{}),[a,i]=e;return(null!==(t=a.parameters[i.value])&&void 0!==t?t:(0,s.of)(void 0)).pipe((0,n.U)((e=>({value:e,eventDepthMap:r,terminated:!1,parameters:o}))))}),(e=>e),e))}function v([e,t,r],s){return s}const x={"+":l(((e,t)=>e+t)),"-":l(((e,t)=>e-t)),"/":l(((e,t)=>e/t)),"*":l(((e,t)=>e*t)),"%":l(((e,t)=>e%t)),"!-":u((e=>-e)),"!":u((e=>!e)),"&&":l(((e,t)=>e&&t)),"||":l(((e,t)=>e||t)),"<":l(((e,t)=>e<t)),"<=":l(((e,t)=>e<=t)),"==":l(((e,t)=>e==t)),"!=":l(((e,t)=>e!=t)),if:e=>S.bind(null,e),switch:e=>d.bind(null,e),select:e=>f.bind(null,e),index:()=>m,return:()=>O,getVariable:e=>h.bind(null,[p.fT,...e]),setVariable:e=>v.bind(null,[p.fT,...e]),random:e=>t=>t.pipe((0,p.PM)(y,void 0,[...e]))}},5770:function(e,t,r){r.d(t,{u4:function(){return i},bS:function(){return I},Tr:function(){return L},Jh:function(){return G},a_:function(){return C},JY:function(){return T},Ii:function(){return ee},Au:function(){return P},vj:function(){return J},PA:function(){return D},L$:function(){return Z},Ud:function(){return E},wm:function(){return q},S9:function(){return g},dF:function(){return Q},PM:function(){return X},Qc:function(){return a},fX:function(){return _},fT:function(){return W}});var s=r(7606),n=r(5454);const o=s.Grammar.fromCompiled(n.Z);function a(e){const t=new s.Parser(o);if(t.feed(e),0===t.results.length)throw new Error("unexpected end of input");return t.results[0]}var i,p=r(7506),l=r(3184),u=r(1556),m=r(3741),c=r(7340),y=r(598),f=r(2598),b=r(892),d=r(5900),S=r(6728),w=r(4668),O=r(6431),h=r(4340),v=r(2384),x=r(1952);function _(e){return t=>t.pipe((0,p.v)(R,{connector:()=>new l.t(1)}),(0,u.z)((e=>e.pipe((0,m.w)((e=>e.type===i.UNSET?(0,c.of)(e):e.value.pipe((0,y.U)((t=>Object.assign(Object.assign({},e),{value:t}))))))))),z(e))}function g(e){return t=>{const r=new Map;return t.pipe(D(),(0,u.z)((t=>{const s=new Map;for(const n of t){const[t,o]=e(n.index),a=A(t);r.has(a)||r.set(a,t);let i=s.get(a);null==i&&(i={outer:t,changes:[]},s.set(a,i)),i.changes.push(Object.assign(Object.assign({},n),{index:o}))}return(0,c.of)(...Array.from(s.values()))})),(0,p.v)((({outer:e})=>A(e)),{connector:()=>new l.t(1/0,100)}),(0,y.U)((e=>{const t=r.get(e.key),s=e.pipe((0,f.R)(((e,{changes:t})=>j(e,t)),void 0));return{index:t,type:i.SET,value:s}})))}}function A(e){for(let t=e.length-1;t>=0;t--)if(0!==e[t])return e.slice(0,t+1).join(",");return""}function E(e){return t=>{const r=t.pipe((0,b.d)({refCount:!0,bufferSize:1}));return(0,d.T)(...e.map(((e,t)=>r.pipe(e,I([t]))))).pipe(G())}}function P(e,t){var r;return null!==(r=$(e,0,t))&&void 0!==r?r:void 0}function q(e,t,...r){var s;return null!==(s=$(e,0,t,...r))&&void 0!==s?s:void 0}function $(e,t,r,...s){if(Array.isArray(r)){const t=[];let n=0;for(let o=0;o<r.length;o++){const a=r[o],i=s.map((e=>Array.isArray(e)?e[o]:null)),p=$(e,o,a,...i);null!==p&&(void 0!==p&&++n,t.push(p))}return n>0?C(t,n):null}if(void 0!==r)return e(t,r,...s)}!function(e){e[e.SET=0]="SET",e[e.UNSET=1]="UNSET"}(i||(i={}));const U=[];function k(e,t,r=[]){if(null==t)return[{index:r,type:i.UNSET}];if(Array.isArray(t)){const s=Array.isArray(e)?e:U,n=Math.max(s.length,t.length);return new Array(n).fill(null).reduce(((e,n,o)=>[...e,...k(s[o],t[o],[...r,o])]),[])}return[{index:r,type:i.SET,value:t}]}function j(e,t){if(!Array.isArray(t))return M(e,t.index,t);for(const r of t)e=M(e,r.index,r);return e}function C(e,t){const r="number"===typeof t?t:e.reduce(((e,r)=>e+t(r)),0);return Object.assign(e,{size:r})}function T(e){return null==e?0:Array.isArray(e)?e.size:1}function M(e,t,r){if(0===t.length)return r.type===i.SET?r.value:void 0;const s=t[0],n=Array.isArray(e)?e:[],o=n[s],a=T(o),p=T(e),l=M(o,t.slice(1),r),u=p+T(l)-a;if(0===u)return;return C([...B(n.slice(0,s),s),l,...n.slice(s+1)],u)}function B(e,t){return e.length<t?e.concat(new Array(t-e.length)):e}function R(e){return A(e.index)}function D(){return e=>e.pipe((0,S.O)(void 0),(0,w.G)(),(0,y.U)((([e,t])=>k(e,t))))}function I(e){return(0,y.U)((t=>({index:e,type:i.SET,value:t})))}function G(){return(0,f.R)(((e,t)=>j(e,t)),void 0)}function L(){return e=>e.pipe((0,f.R)(((e,t)=>{let r;return Array.isArray(t)?r=t.map((t=>{const r=N(e[0],t.index,t,0);return e[0]=j(e[0],t),r})):(r=N(e[0],t.index,t,0),e[0]=j(e[0],t)),e[1]=r,e}),[void 0,[]]),(0,y.U)((([,e])=>e)))}function N(e,t,r,s){if(0===t.length||!Array.isArray(e))return Object.assign(Object.assign({},r),{deleteAmount:T(e),index:s});const n=t[0];for(let o=0;o<n;o++)s+=T(e[o]);return N(e[n],t.slice(1),r,s)}function z(e){return t=>{const r=new l.t(1);return t.pipe((0,O.b)((()=>r.next())),(0,h.f)(r.pipe((0,v.b)(e))),(0,x.x)((()=>r.complete())))}}function J(){return(0,y.U)(V)}function V(e){return Array.isArray(e)?e.reduce(((e,t)=>e.concat(V(t))),[]):null==e?[]:[e]}var F=r(8761);const K=new Map;function W(e){return e}function Y(e){return[e.slice(1),[e[0]]]}function Z(e){const t={};for(const r of e){const e=Object.entries(r.eventDepthMap);for(const r of e){const[e,s]=r;if(null==s)continue;const n=t[e];(null==n||s>n)&&(t[r[0]]=r[1])}}return t}function X(e,t,r,s=Y,n=0){return Q((t=>{const r=Z(t),s=t.reduce(((e,t)=>Object.assign(Object.assign({},e),t.parameters)),{});return e(t.map((({value:e})=>e))).pipe((0,y.U)((e=>P(((e,t)=>({eventDepthMap:r,parameters:s,terminated:!1,value:t})),e))))}),null==t?void 0:e=>t(e.map((({value:e})=>e))),r,s,n)}function Q(e,t,r,s=Y,n=0){const o=null==t?t=>t.pipe((0,m.w)((t=>null==t?(0,c.of)(void 0):e(t)))):function(e,t){let r=K.get(t);null==r&&(r=[],K.set(t,r));const s=r;return r=>r.pipe((0,y.U)((r=>{if(null==r)return(0,c.of)(void 0);const n=e(r);let o=s.find((([e])=>function(e,t){if(e.length!=t.length)return!1;for(let r=0;r<e.length;r++)if(e[r]!=t[r])return!1;return!0}(e,n)));if(null==o){const e=t(r).pipe((0,b.d)({refCount:!1,bufferSize:1}));o=[n,e],s.push(o)}return o[1]})),(0,F.B)())}((e=>t(e)),(t=>null==t?(0,c.of)(void 0):e(t)));return e=>e.pipe(E(r),g(s),(0,y.U)((e=>Object.assign(Object.assign({},e),{value:e.value.pipe(J(),(0,y.U)((e=>r.length===e.length?e:void 0)),o)}))),_(n),G())}var H=r(8482);function ee(e,t){const r=Object.values(e);if(0===r.length)return e=>e;const s=new Map;return te(r[0],e,t,s)}function te(e,t,r,s){switch(e.type){case"operation":{const n=r[e.identifier];if(null==n)throw new Error(`unknown operation "${e.identifier}"`);return n(e.parameters.map((e=>te(e,t,r,s))))}case"parallel":return E(e.steps.map((e=>te(e,t,r,s))));case"raw":return t=>t.pipe((0,y.U)((t=>P(((t,r)=>Object.assign(Object.assign({},r),{value:e.value})),t))));case"sequential":return n=>{let o=n;const a=[];for(const i of e.steps){const e=o.pipe((0,b.d)({refCount:!0,bufferSize:1}));a.push(e.pipe(re(!0))),o=e.pipe(re(!1),te(i,t,r,s))}return(0,d.T)(...[o,...a].map(((e,t)=>e.pipe(I([t]))))).pipe(G())};case"this":return e=>e;case"symbol":{let n=s.get(e.identifier);if(null==n){const o=t[e.identifier];if(null==o)throw new Error(`unknown rule "${e.identifier}"`);n={ref:void 0},s.set(e.identifier,n),n.ref=te(o,t,r,s)}return e=>(0,H.P)((()=>e.pipe(n.ref)))}}}function re(e){return(0,y.U)((t=>P(((t,r)=>r.terminated===e?r:void 0),t)))}},5454:function(__unused_webpack_module,__webpack_exports__,__webpack_require__){var moo__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(985),moo__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(moo__WEBPACK_IMPORTED_MODULE_0__);function id(e){return e[0]}const lexer=moo__WEBPACK_IMPORTED_MODULE_0___default().compile({returnSymbol:/return/,thisSymbol:/this/,ifSymbol:/if/,thenSymbol:/then/,elseSymbol:/else/,switchSymbol:/switch/,caseSymbol:/case/,arrow:/->/,openBracket:/\(/,closedBracket:/\)/,point:/\./,comma:/,/,colon:/:/,smallerEqual:/<=/,greaterEqual:/>=/,smaller:/</,greater:/>/,equal:/==/,unequal:/!=/,and:/&&/,or:/\|\|/,not:/!/,parallel:/\|/,int:/0[Xx][\da-fA-F]+|0[bB][01]+/,number:/-?\d+(?:\.\d+)?/,string:/"[^"]*"/,boolean:/true|false/,plus:/\+/,minus:/-/,multiply:/\*/,modulo:/%/,divide:/\//,identifier:/[a-zA-Z_$]+\w*/,ws:{match:/\s+/,lineBreaks:!0}}),grammar={Lexer:lexer,ParserRules:[{name:"GrammarDefinition",symbols:["ws","RuleDefinition","ws"],postprocess:([,[e,t]])=>({[e]:t})},{name:"GrammarDefinition",symbols:["ws","RuleDefinition",lexer.has("ws")?{type:"ws"}:ws,"GrammarDefinition"],postprocess:([,[e,t],,r])=>Object.assign({[e]:t},r)},{name:"GrammarDefinition",symbols:["ws"],postprocess:()=>({})},{name:"RuleDefinition",symbols:[lexer.has("identifier")?{type:"identifier"}:identifier,"ws",lexer.has("arrow")?{type:"arrow"}:arrow,"ws","Steps"],postprocess:([{value:e},,,,t])=>[e,t]},{name:"Steps",symbols:["ParallelSteps"],postprocess:([e])=>e},{name:"EmptySteps",symbols:["ParallelSteps"],postprocess:([e])=>e},{name:"EmptySteps",symbols:[],postprocess:()=>({type:"raw",value:[]})},{name:"ParallelSteps$ebnf$1",symbols:["ParallelStep"]},{name:"ParallelSteps$ebnf$1",symbols:["ParallelSteps$ebnf$1","ParallelStep"],postprocess:e=>e[0].concat([e[1]])},{name:"ParallelSteps",symbols:["SequentialSteps","ParallelSteps$ebnf$1"],postprocess:([e,t])=>({type:"parallel",steps:[e,...t]})},{name:"ParallelSteps",symbols:["SequentialSteps"],postprocess:([e])=>e},{name:"ParallelStep",symbols:["ws",lexer.has("parallel")?{type:"parallel"}:parallel,"SequentialSteps"],postprocess:([,,e])=>e},{name:"SequentialSteps$ebnf$1",symbols:["SequentialStep"]},{name:"SequentialSteps$ebnf$1",symbols:["SequentialSteps$ebnf$1","SequentialStep"],postprocess:e=>e[0].concat([e[1]])},{name:"SequentialSteps",symbols:["PrimarySteps","SequentialSteps$ebnf$1"],postprocess:([e,t])=>({type:"sequential",steps:[e,...t]})},{name:"SequentialSteps",symbols:["PrimarySteps"],postprocess:([e])=>e},{name:"SequentialStep",symbols:[lexer.has("ws")?{type:"ws"}:ws,"PrimarySteps"],postprocess:([,e])=>e},{name:"PrimarySteps",symbols:["ws","BasicOperation"],postprocess:([,e])=>e},{name:"Step",symbols:["Operation"],postprocess:([e])=>e},{name:"Step",symbols:["Symbol"],postprocess:([e])=>e},{name:"Step",symbols:[lexer.has("thisSymbol")?{type:"thisSymbol"}:thisSymbol],postprocess:()=>({type:"this"})},{name:"Step",symbols:["GetVariable"],postprocess:([e])=>e},{name:"Step",symbols:["Constant"],postprocess:([e])=>({type:"raw",value:e})},{name:"Step",symbols:["ConditionalOperation"],postprocess:([e])=>e},{name:"Step",symbols:[lexer.has("returnSymbol")?{type:"returnSymbol"}:returnSymbol],postprocess:()=>({type:"operation",parameters:[],identifier:"return"})},{name:"Step",symbols:[lexer.has("openBracket")?{type:"openBracket"}:openBracket,"Steps","ws",lexer.has("closedBracket")?{type:"closedBracket"}:closedBracket],postprocess:([,e])=>e},{name:"Operation",symbols:[lexer.has("identifier")?{type:"identifier"}:identifier,lexer.has("openBracket")?{type:"openBracket"}:openBracket,"EmptyParameters","ws",lexer.has("closedBracket")?{type:"closedBracket"}:closedBracket],postprocess:([{value:e},,t])=>({type:"operation",parameters:t,identifier:e})},{name:"EmptyParameters",symbols:["Parameters"],postprocess:([e])=>e},{name:"EmptyParameters",symbols:[],postprocess:()=>[]},{name:"Parameters$ebnf$1",symbols:["Parameter"]},{name:"Parameters$ebnf$1",symbols:["Parameters$ebnf$1","Parameter"],postprocess:e=>e[0].concat([e[1]])},{name:"Parameters",symbols:["Steps","Parameters$ebnf$1"],postprocess:([e,t])=>[e,...t]},{name:"Parameters",symbols:["Steps"],postprocess:([e])=>[e]},{name:"Parameter",symbols:["ws",lexer.has("comma")?{type:"comma"}:comma,"Steps"],postprocess:([,,e])=>e},{name:"Symbol",symbols:[lexer.has("identifier")?{type:"identifier"}:identifier],postprocess:([{value:e}])=>({type:"symbol",identifier:e})},{name:"JS",symbols:[lexer.has("js")?{type:"js"}:js],postprocess:([{value:value}])=>eval(value.replace(/"([^"]+)"/,((e,t)=>t)))},{name:"ws",symbols:[lexer.has("ws")?{type:"ws"}:ws]},{name:"ws",symbols:[]},{name:"Constant",symbols:[lexer.has("boolean")?{type:"boolean"}:boolean],postprocess:([{value:e}])=>"true"===e},{name:"Constant",symbols:[lexer.has("string")?{type:"string"}:string],postprocess:([{value:e}])=>e.slice(1,-1)},{name:"Constant",symbols:[lexer.has("number")?{type:"number"}:number],postprocess:([{value:e}])=>Number.parseFloat(e)},{name:"Constant",symbols:[lexer.has("int")?{type:"int"}:int],postprocess:([{value:e}])=>Number.parseInt(e)},{name:"Variable",symbols:[lexer.has("thisSymbol")?{type:"thisSymbol"}:thisSymbol,lexer.has("point")?{type:"point"}:point,lexer.has("identifier")?{type:"identifier"}:identifier],postprocess:([,,e])=>({type:"raw",value:e})},{name:"GetVariable",symbols:["Variable"],postprocess:([e])=>({type:"operation",parameters:[e],identifier:"getVariable"})},{name:"SetVariable",symbols:["Variable","ws",lexer.has("equal")?{type:"equal"}:equal,"ws","Step"],postprocess:([e,,,,t])=>({type:"operation",parameters:[e,t],identifier:"setVariable"})},{name:"ConditionalOperation",symbols:["IfThenElseOperation"],postprocess:([e])=>e},{name:"ConditionalOperation",symbols:["SwitchOperation"],postprocess:([e])=>e},{name:"IfThenElseOperation",symbols:[lexer.has("ifSymbol")?{type:"ifSymbol"}:ifSymbol,lexer.has("ws")?{type:"ws"}:ws,"Step",lexer.has("ws")?{type:"ws"}:ws,lexer.has("thenSymbol")?{type:"thenSymbol"}:thenSymbol,lexer.has("ws")?{type:"ws"}:ws,"Step",lexer.has("ws")?{type:"ws"}:ws,lexer.has("elseSymbol")?{type:"elseSymbol"}:elseSymbol,lexer.has("ws")?{type:"ws"}:ws,"Step"],postprocess:([,,e,,,,t,,,,r])=>({type:"operation",parameters:[e,t,r],identifier:"if"})},{name:"SwitchOperation$ebnf$1",symbols:["SwitchCase"]},{name:"SwitchOperation$ebnf$1",symbols:["SwitchOperation$ebnf$1","SwitchCase"],postprocess:e=>e[0].concat([e[1]])},{name:"SwitchOperation",symbols:[lexer.has("switchSymbol")?{type:"switchSymbol"}:switchSymbol,lexer.has("ws")?{type:"ws"}:ws,"Step","SwitchOperation$ebnf$1"],postprocess:([,,e,t])=>({type:"operation",parameters:[e,...t.reduce(((e,t)=>e.concat(t)))],identifier:"switch"})},{name:"SwitchCase",symbols:[lexer.has("ws")?{type:"ws"}:ws,lexer.has("caseSymbol")?{type:"caseSymbol"}:caseSymbol,lexer.has("ws")?{type:"ws"}:ws,"Step",lexer.has("colon")?{type:"colon"}:colon,"ws","Step"],postprocess:([,,,e,,,t])=>[e,t]},{name:"BasicOperation",symbols:["BooleanOperation"],postprocess:([e])=>e},{name:"BooleanOperation",symbols:["OrOperation"],postprocess:([e])=>e},{name:"OrOperation",symbols:["OrOperation","ws",lexer.has("or")?{type:"or"}:or,"ws","AndOperation"],postprocess:([e,,,,t])=>({type:"operation",parameters:[e,t],identifier:"||"})},{name:"OrOperation",symbols:["AndOperation"],postprocess:([e])=>e},{name:"AndOperation",symbols:["AndOperation","ws",lexer.has("and")?{type:"and"}:and,"ws","NegateOperation"],postprocess:([e,,,,t])=>({type:"operation",parameters:[e,t],identifier:"&&"})},{name:"AndOperation",symbols:["NegateOperation"],postprocess:([e])=>e},{name:"NegateOperation",symbols:[lexer.has("not")?{type:"not"}:not,"ws","NegateOperation"],postprocess:([,,e])=>({type:"operation",parameters:[e],identifier:"!"})},{name:"NegateOperation",symbols:["ComparisonOperation"],postprocess:([e])=>e},{name:"ComparisonOperation",symbols:["EquityOperation"],postprocess:([e])=>e},{name:"EquityOperation",symbols:["EqualOperation"],postprocess:([e])=>e},{name:"EquityOperation",symbols:["UnequalOperation"],postprocess:([e])=>e},{name:"EquityOperation",symbols:["RelationalOperation"],postprocess:([e])=>e},{name:"EqualOperation",symbols:["EquityOperation","ws",lexer.has("equal")?{type:"equal"}:equal,"ws","RelationalOperation"],postprocess:([e,,,,t])=>({type:"operation",parameters:[e,t],identifier:"=="})},{name:"UnequalOperation",symbols:["EquityOperation","ws",lexer.has("unequal")?{type:"unequal"}:unequal,"ws","RelationalOperation"],postprocess:([e,,,,t])=>({type:"operation",parameters:[e,t],identifier:"!="})},{name:"RelationalOperation",symbols:["SmallerOperation"],postprocess:([e])=>e},{name:"RelationalOperation",symbols:["SmallerEqualOperation"],postprocess:([e])=>e},{name:"RelationalOperation",symbols:["GreaterOperation"],postprocess:([e])=>e},{name:"RelationalOperation",symbols:["GreaterEqualOperation"],postprocess:([e])=>e},{name:"RelationalOperation",symbols:["ArithmeticOperation"],postprocess:([e])=>e},{name:"SmallerOperation",symbols:["RelationalOperation","ws",lexer.has("smaller")?{type:"smaller"}:smaller,"ws","ArithmeticOperation"],postprocess:([e,,,,t])=>({type:"operation",parameters:[e,t],identifier:"<"})},{name:"SmallerEqualOperation",symbols:["RelationalOperation","ws",lexer.has("smallerEqual")?{type:"smallerEqual"}:smallerEqual,"ws","ArithmeticOperation"],postprocess:([e,,,,t])=>({type:"operation",parameters:[e,t],identifier:"<="})},{name:"GreaterOperation",symbols:["RelationalOperation","ws",lexer.has("greater")?{type:"greater"}:greater,"ws","ArithmeticOperation"],postprocess:([e,,,,t])=>({type:"operation",parameters:[t,e],identifier:"<"})},{name:"GreaterEqualOperation",symbols:["RelationalOperation","ws",lexer.has("greaterEqual")?{type:"greaterEqual"}:greaterEqual,"ws","ArithmeticOperation"],postprocess:([e,,,,t])=>({type:"operation",parameters:[t,e],identifier:"<="})},{name:"ArithmeticOperation",symbols:["LineOperation"],postprocess:([e])=>e},{name:"LineOperation",symbols:["AddOperation"],postprocess:([e])=>e},{name:"LineOperation",symbols:["SubtractOperation"],postprocess:([e])=>e},{name:"LineOperation",symbols:["PointOperation"],postprocess:([e])=>e},{name:"AddOperation",symbols:["LineOperation","ws",lexer.has("plus")?{type:"plus"}:plus,"ws","PointOperation"],postprocess:([e,,,,t])=>({type:"operation",parameters:[e,t],identifier:"+"})},{name:"SubtractOperation",symbols:["LineOperation","ws",lexer.has("minus")?{type:"minus"}:minus,"ws","PointOperation"],postprocess:([e,,,,t])=>({type:"operation",parameters:[e,t],identifier:"-"})},{name:"PointOperation",symbols:["MultiplyOperation"],postprocess:([e])=>e},{name:"PointOperation",symbols:["DivideOperation"],postprocess:([e])=>e},{name:"PointOperation",symbols:["ModuloOperation"],postprocess:([e])=>e},{name:"PointOperation",symbols:["InvertOperation"],postprocess:([e])=>e},{name:"DivideOperation",symbols:["PointOperation","ws",lexer.has("divide")?{type:"divide"}:divide,"ws","InvertOperation"],postprocess:([e,,,,t])=>({type:"operation",parameters:[e,t],identifier:"/"})},{name:"MultiplyOperation",symbols:["PointOperation","ws",lexer.has("multiply")?{type:"multiply"}:multiply,"ws","InvertOperation"],postprocess:([e,,,,t])=>({type:"operation",parameters:[e,t],identifier:"*"})},{name:"ModuloOperation",symbols:["PointOperation","ws",lexer.has("modulo")?{type:"modulo"}:modulo,"ws","InvertOperation"],postprocess:([e,,,,t])=>({type:"operation",parameters:[e,t],identifier:"%"})},{name:"InvertOperation",symbols:[lexer.has("minus")?{type:"minus"}:minus,"ws","InvertOperation"],postprocess:([,,e])=>({type:"operation",parameters:[e],identifier:"!-"})},{name:"InvertOperation",symbols:["Step"],postprocess:([e])=>e}],ParserStart:"GrammarDefinition"};__webpack_exports__.Z=grammar}}]);