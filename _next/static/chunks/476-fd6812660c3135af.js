"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[476],{5638:function(t,e,r){var n;r.d(e,{HR:function(){return A},Jy:function(){return V}}),function(t){t[t.Float=0]="Float",t[t.Enum=1]="Enum",t[t.Int=2]="Int"}(n||(n={}));var i=r(7340),a=r(5770),s=r(9621),o=r(2910),c=r(6173);r(1135);const u=new c.Vector3,l=new c.Vector3;new c.Matrix4;var h;!function(t){t[t.X=0]="X",t[t.Y=1]="Y",t[t.Z=2]="Z"}(h||(h={}));const m={[h.X]:"x",[h.Y]:"y",[h.Z]:"z"};function p(t,e){return t[m[e]]}function f(t,e,r){t[m[e]]=r}const x=new c.Vector3;function g(t,e,r){t.getGeometrySize(x);let n=0;const i=[];for(l.set(0,0,0);p(x,e)>0;){const a=t.matrix.clone();a.multiply((0,s.Nh)(l.x,l.y,l.z));const o=r(a,n,x.x,x.y,x.z);o.getGeometrySize(u),i.push(o),n++;const c=p(u,e);f(x,e,p(x,e)-c),f(l,e,p(l,e)+c)}return i}new c.Vector3;var y=r(2253);const d=new c.Vector3;function w([t,e]){return t.primitive.getGeometrySize(d),(0,i.of)(d[e])}function v([t,e,r,n]){return(0,i.of)({attributes:Object.assign({},t.attributes),primitive:t.primitive.multiplyMatrix((0,s.gN)(e,r,n))})}function b(t){return Math.PI*t/180}function M([t,e,r,n]){return(0,i.of)({attributes:Object.assign({},t.attributes),primitive:t.primitive.multiplyMatrix((0,s.ae)(b(e),b(r),b(n)))})}function G([t,e,r,n]){return(0,i.of)({attributes:Object.assign({},t.attributes),primitive:t.primitive.multiplyMatrix((0,s.Nh)(e,r,n))})}function j([t,e]){return(0,i.of)({attributes:Object.assign({},t.attributes),primitive:t.primitive.changeMaterialGenerator((0,o.i7)(e))})}function P([t,e]){return(0,i.of)({attributes:Object.assign({},t.attributes),primitive:t.primitive.extrude(e)})}function S(t,e){const r=e.reduce(((e,r)=>[...e,...r.primitive.components(t).map((t=>({attributes:Object.assign({},r.attributes),primitive:t})))]),[]);return(0,i.of)((0,a.a_)(r,r.length))}function O(t,[e,r,n]){const s=g(e.primitive,t,((i,a,s,c,u)=>{if(null==n||a<n){const n=t===h.X?Math.min(r,s):s,a=t===h.Z?Math.min(r,u):u;return o.Js.fromLengthAndHeight(i,n,a,!1,e.primitive.materialGenerator)}return o.Js.fromLengthAndHeight(i,s,u,!1,e.primitive.materialGenerator)})).map((t=>({attributes:Object.assign({},e.attributes),primitive:t})));return(0,i.of)((0,a.a_)(s,s.length))}function T(t,[e,...r]){const n=g(e.primitive,t,((n,i,a,s,c)=>{const u=t===h.X&&null!=r[i]?Math.min(r[i],a):a,l=t===h.Z&&null!=r[i]?Math.min(r[i],c):c;return o.Js.fromLengthAndHeight(n,u,l,!1,e.primitive.materialGenerator)})).map((t=>({attributes:Object.assign({},e.attributes),primitive:t})));return(0,i.of)((0,a.a_)(n,n.length))}const V=Object.assign(Object.assign({},y.J),{translate:t=>e=>e.pipe((0,a.PM)(G,(t=>t),[a.fT,...t])),scale:t=>e=>e.pipe((0,a.PM)(v,(t=>t),[a.fT,...t])),rotate:t=>e=>e.pipe((0,a.PM)(M,(t=>t),[a.fT,...t])),extrude:t=>e=>e.pipe((0,a.PM)(P,(t=>t),[a.fT,...t])),splitX:t=>e=>e.pipe((0,a.PM)(O.bind(null,h.X),(t=>t),[a.fT,...t])),splitZ:t=>e=>e.pipe((0,a.PM)(O.bind(null,h.Z),(t=>t),[a.fT,...t])),multiSplitX:t=>e=>e.pipe((0,a.PM)(T.bind(null,h.X),(t=>t),[a.fT,...t])),multiSplitZ:t=>e=>e.pipe((0,a.PM)(T.bind(null,h.Z),(t=>t),[a.fT,...t])),points:t=>e=>e.pipe((0,a.PM)(S.bind(null,"points"),(t=>t),[a.fT,...t])),lines:t=>e=>e.pipe((0,a.PM)(S.bind(null,"lines"),(t=>t),[a.fT,...t])),faces:t=>e=>e.pipe((0,a.PM)(S.bind(null,"faces"),(t=>t),[a.fT,...t])),color:t=>e=>e.pipe((0,a.PM)(j,(t=>t),[a.fT,...t])),size:t=>e=>e.pipe((0,a.PM)(w,(t=>t),[a.fT,...t]))});var N=r(2598);function A(){return t=>t.pipe((0,a.PA)(),(0,a.Tr)(),(0,N.R)(((t,e)=>{if(Array.isArray(e))for(const r of e)z(t,r);else z(t,e);return t}),new c.Object3D))}function z(t,e){var r;let n;if(e.type===a.u4.UNSET)n=t.children.splice(e.index,e.deleteAmount);else{const i=e.value.value.primitive.getObject();null===(r=i.parent)||void 0===r||r.remove(i),i.parent=t,n=t.children.splice(e.index,e.deleteAmount,i)}for(const i of n)i.parent=null}},9621:function(t,e,r){r.d(e,{pT:function(){return o},Nh:function(){return c},ae:function(){return u},gN:function(){return l}});var n=r(6173);new n.Box3,new n.Vector3,new n.Vector3;const i=new n.Matrix4,a=new n.Vector3,s=new n.Euler;function o(t,e,r=i){return a.crossVectors(t,e),r.makeBasis(t,e,a)}function c(t,e,r,n=i){return n.makeTranslation(t,e,r)}function u(t,e,r,n=i){return n.makeRotationFromEuler(s.set(t,e,r))}function l(t,e,r,n=i){return n.makeScale(t,e,r)}},2910:function(t,e,r){r.d(e,{i7:function(){return s},Yh:function(){return f},Js:function(){return d},Jn:function(){return v}});var n=r(6173),i=r(766),a=r(9621);function s(t){return e=>{switch(e){case l.Point:return new n.PointsMaterial({color:t});case l.Line:return new n.LineBasicMaterial({color:t});case l.Mesh:return new n.MeshPhongMaterial({color:t})}}}const o=new n.Matrix4,c=new n.Vector3;function u(t,e){return t.matrixAutoUpdate=!1,t.matrix=e,t}var l;!function(t){t[t.Point=0]="Point",t[t.Line=1]="Line",t[t.Mesh=2]="Mesh"}(l||(l={}));class h{constructor(){this.geometryCache=null,this.objectCache=null}getGeometry(){return null===this.geometryCache&&(this.geometryCache=this.computeGeometry()),this.geometryCache}getObject(){return null===this.objectCache&&(this.objectCache=this.computeObject3D()),this.objectCache}dispose(){var t;null===(t=this.geometryCache)||void 0===t||t.dispose()}multiplyMatrix(t){return this.changeMatrix(this.matrix.clone().multiply(t))}premultiplyMatrix(t){return this.changeMatrix(this.matrix.clone().premultiply(t))}}class m extends h{constructor(t,e){super(),this.matrix=t,this.materialGenerator=e}changeMaterialGenerator(t){return new m(this.matrix,t)}changeMatrix(t){return new m(t,this.materialGenerator)}multiplyMatrix(t){return new m(this.matrix.clone().multiply(t),this.materialGenerator)}getGeometrySize(t){t.set(0,0,0)}extrude(t){return new f(this.matrix,t,this.materialGenerator)}components(t){return"points"===t?[this.clone()]:[]}computeObject3D(){return u(new n.Points((new n.BufferGeometry).setFromPoints([new n.Vector3]),this.materialGenerator(l.Point)),this.matrix)}clone(){return new m(this.matrix,this.materialGenerator)}computeGeometry(){}}const p=new n.Vector3(0,1,0);class f extends h{constructor(t,e,r){super(),this.matrix=t,this.length=e,this.materialGenerator=r}changeMaterialGenerator(t){return new f(this.matrix,this.length,t)}changeMatrix(t){return new f(t,this.length,this.materialGenerator)}static fromPoints(t,e,r,n){t.multiply((0,a.Nh)(e.x,0,e.y)),g.copy(r).sub(e);const i=g.length();return t.multiply((0,a.pT)(c.set(g.x,0,g.y).normalize(),p)),new f(t,i,n)}getGeometrySize(t){t.set(0,this.length,0)}clone(){return new f(this.matrix,this.length,this.materialGenerator)}extrude(t){return d.fromLengthAndHeight(this.matrix,this.length,t,!0,this.materialGenerator)}components(t){switch(t){case"faces":return[];case"lines":return[this.clone()];case"points":{const t=new m(this.matrix,this.materialGenerator);return t.multiplyMatrix(o.makeTranslation(0,this.length,0)),[new m(this.matrix,this.materialGenerator),t]}}}computeObject3D(){return u(new n.Line((new n.BufferGeometry).setFromPoints([new n.Vector3,new n.Vector3(this.length,0,0)]),this.materialGenerator(l.Line)),this.matrix)}computeGeometry(){}}const x=new n.Box2,g=new n.Vector2,y=new n.Matrix4;class d extends h{constructor(t,e,r){super(),this.matrix=t,this.shape=e,this.materialGenerator=r}changeMaterialGenerator(t){return new d(this.matrix,this.shape,t)}changeMatrix(t){return new d(t,this.shape,this.materialGenerator)}static fromLengthAndHeight(t,e,r,i,a){i&&t.multiply(o.makeRotationX(-Math.PI/2));const s=[new n.Vector2(e,0),new n.Vector2(e,r),new n.Vector2(0,r),new n.Vector2(0,0)],c=new n.Shape(s);return new d(t,c,a)}getGeometrySize(t){x.setFromPoints(this.shape.getPoints()).getSize(g),t.set(g.x,0,g.y)}computeGeometry(){const t=new n.ShapeBufferGeometry(this.shape);let e;for(let r=0;r<t.index.count;r+=3)e=t.index.getX(r),t.index.setX(r,t.index.getX(r+2)),t.index.setX(r+2,e);return t.rotateX(Math.PI/2),t}invert(){const t=this.matrix.clone();t.multiply((0,a.ae)(Math.PI,0,0));const e=this.shape.getPoints(5),r=this.shape.holes,i=new n.Shape(e.map((({x:t,y:e})=>new n.Vector2(t,-e))));return i.holes=r.map((t=>new n.Path(t.getPoints().map((({x:t,y:e})=>new n.Vector2(t,-e)))))),new d(t,i,this.materialGenerator)}extrude(t){y.copy(this.matrix).invert();const e=this.multiplyMatrix(y.multiply((0,a.Nh)(0,t,0))),r=this.shape.extractPoints(5).shape;return new v(this.matrix,[...r.map(((e,i)=>{const s=r[(i+1)%r.length];c.set(s.x-e.x,0,s.y-e.y);const o=c.length(),u=(0,a.Nh)(e.x,0,e.y,new n.Matrix4);u.multiply((0,a.pT)(c.normalize(),p));const l=d.fromLengthAndHeight(u,o,t,!0,this.materialGenerator);return t<0?l.invert():l})),e])}components(t){switch(t){case"points":return this.shape.extractPoints(5).shape.map((t=>new m(this.matrix.clone().multiply((0,a.Nh)(t.x,0,t.y)),this.materialGenerator)));case"lines":{const t=this.shape.extractPoints(5).shape;return t.map(((e,r)=>f.fromPoints(this.matrix.clone(),e,t[(r+1)%t.length],this.materialGenerator)))}case"faces":return[this]}}computeObject3D(){return u(new n.Mesh(this.getGeometry(),this.materialGenerator(l.Mesh)),this.matrix)}}const w=new n.Box3;class v extends h{constructor(t,e){super(),this.matrix=t,this.primitives=e}changeMaterialGenerator(t){return new v(this.matrix,this.primitives.map((e=>e.changeMaterialGenerator(t))))}changeMatrix(t){return new v(t,this.primitives)}extrude(t){return new v(this.matrix,this.primitives.map((e=>e.extrude(t))))}components(t){return this.primitives.map((e=>e.components(t))).reduce(((t,e)=>t.concat(e))).map((t=>t.premultiplyMatrix(this.matrix)))}computeObject3D(){const t=u(new n.Object3D,this.matrix);return this.primitives.forEach((e=>t.add(e.getObject()))),t}getGeometrySize(t){w.makeEmpty(),this.primitives.forEach((t=>{t.getGeometrySize(c),c.applyMatrix4(t.matrix),w.expandByPoint(c)})),w.getSize(t)}computeGeometry(){const t=this.primitives.map((t=>{var e;return null===(e=t.getGeometry())||void 0===e?void 0:e.applyMatrix4(t.matrix)})).filter(b),e=(0,i.qf)(t);return t.forEach((t=>t.dispose())),e}}function b(t){return null!=t}},7939:function(t,e,r){r.d(e,{T:function(){return l}});var n=r(5893),i=r(406),a=r(6447),s=r(5638),o=r(7294);function c(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}function u(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var r=null==t?null:"undefined"!==typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=r){var n,i,a=[],s=!0,o=!1;try{for(r=r.call(t);!(s=(n=r.next()).done)&&(a.push(n.value),!e||a.length!==e);s=!0);}catch(c){o=!0,i=c}finally{try{s||null==r.return||r.return()}finally{if(o)throw i}}return a}}(t,e)||function(t,e){if(!t)return;if("string"===typeof t)return c(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);"Object"===r&&t.constructor&&(r=t.constructor.name);if("Map"===r||"Set"===r)return Array.from(r);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return c(t,e)}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function l(t){var e=t.matrix,r=(0,o.useState)([void 0,void 0]),c=u(r[0],2),l=c[0],h=c[1],m=r[1];return(0,o.useEffect)((function(){if(null!=e){var t=e.pipe((0,s.HR)()).subscribe({next:function(t){return m([t,void 0])},error:function(t){console.error(t),m([void 0,t.message])}});return function(){return t.unsubscribe()}}}),[e]),(0,n.jsxs)("div",{style:{whiteSpace:"pre-line"},className:"flex-basis-0 d-flex flex-column flex-grow-1 bg-white h3 mb-0",children:[(0,n.jsx)("div",{className:"flex-basis-0 flex-grow-1 overflow-hidden position-relative",children:(0,n.jsxs)(a.Xz,{children:[(0,n.jsx)(i.o,{}),(0,n.jsx)("gridHelper",{}),(0,n.jsx)("pointLight",{position:[3,3,3]}),(0,n.jsx)("ambientLight",{}),(0,n.jsx)("group",{scale:.01,children:null!=l&&(0,n.jsx)("primitive",{object:l})})]})}),(0,n.jsx)("div",{className:"overflow-auto mb-0 border-top flex-basis-0 h5 bg-light flex-grow-1",style:{whiteSpace:"pre-line",maxHeight:300,height:300},children:null==h?null==e?(0,n.jsx)("div",{className:"text-primary p-3",children:"waiting ..."}):(0,n.jsx)("div",{className:"text-success p-3",children:"ok"}):(0,n.jsx)("div",{className:"text-danger p-3",children:h})})]})}},8377:function(t,e,r){r.d(e,{c:function(){return a}});var n=r(5770),i=r(7294);function a(t,e,r){return(0,i.useMemo)((function(){try{var i=(0,n.Qc)(t);return[e.pipe((0,n.Ii)(i,r)),void 0]}catch(a){return[void 0,JSON.stringify(a.message)]}}),[t,e])}}}]);