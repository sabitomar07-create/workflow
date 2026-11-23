/* 3D hero scene (three.js r128): low-poly animated sea, sun and a bobber riding the waves.
   Falls back to the flat SVG artwork when WebGL is unavailable. */
(function(){
var hero=document.querySelector('.hero'),cv=document.getElementById('scene');
if(!window.THREE||!hero||!cv)return;
var T=THREE,still=matchMedia('(prefers-reduced-motion: reduce)').matches,R;
try{R=new T.WebGLRenderer({canvas:cv,antialias:true,alpha:true})}catch(e){return}
R.setPixelRatio(Math.min(devicePixelRatio||1,2));
var FOV=40,TH=Math.tan(FOV*Math.PI/360),S=new T.Scene(),C=new T.PerspectiveCamera(FOV,1,.1,200);
S.fog=new T.Fog(0x094557,14,58);
S.add(new T.HemisphereLight(0xbfe6ee,0x0a3a4a,.9));
var L=new T.DirectionalLight(0xffe2a0,.9);L.position.set(8,5,-20);S.add(L);
var g=new T.PlaneGeometry(100,80,100,80);g.rotateX(-Math.PI/2);g.translate(0,0,-30);
var P=g.attributes.position,A=P.array;
S.add(new T.Mesh(g,new T.MeshPhongMaterial({color:0x1190a4,specular:0xffe9a8,shininess:45,flatShading:true})));
var sun=new T.Mesh(new T.CircleGeometry(3.4,48),new T.MeshBasicMaterial({color:0xffc93c,fog:false}));sun.position.set(0,2.4,-45);S.add(sun);
function H(x,z,t){return .3*Math.sin(x*.55+t*1.1)+.24*Math.sin(z*.7+t*.9)+.12*Math.sin((x+z)*1.3+t*1.7)}
function mat(c,s){return new T.MeshPhongMaterial({color:c,shininess:s||60})}
function half(a,c){var m=new T.Mesh(new T.SphereGeometry(.42,32,16,0,6.2832,a,1.5708),mat(c,90));m.scale.y=1.35;return m}
var B=new T.Group(),ring=new T.Mesh(new T.TorusGeometry(.43,.035,8,32),mat(0xffc93c)),ant=new T.Mesh(new T.CylinderGeometry(.04,.04,.8,8),mat(0xffc93c)),ln=new T.Mesh(new T.CylinderGeometry(.012,.012,14,4),new T.MeshBasicMaterial({color:0xffffff,transparent:true,opacity:.7,fog:false}));
ring.rotation.x=Math.PI/2;ant.position.y=.97;ln.position.y=8.36;B.add(half(0,0xe4412f),half(1.5708,0xf4f8fa),ring,ant,ln);S.add(B);
var asp=1,pitch=0,bz=-8,mx=0,px=0,sx=document.documentElement.dir==='rtl'?-1:1,live=true,run=false,t0=performance.now();
function size(){var w=hero.clientWidth,h=hero.clientHeight,n=w<h;asp=w/h;R.setSize(w,h,false);C.aspect=asp;C.updateProjectionMatrix();pitch=Math.atan(((n?.62:.56)*2-1)*TH);bz=n?-12:-8;B.scale.setScalar(n?2:1.6)}
function go(){if(!run){run=true;requestAnimationFrame(frame)}}
function frame(now){run=false;var t=still?3:(now-t0)/1000,tg=document.documentElement.dir==='rtl'?-1:1,d=.6;sx+=(tg-sx)*(still?1:.06);
var bx=sx*(9-bz)*TH*asp*.55,k=still?1:Math.min(t/1.4,1);
B.position.set(bx,H(bx,bz,t)+.1+(1-k)*(1-k)*7,bz);
B.rotation.z=Math.atan((H(bx+d,bz,t)-H(bx-d,bz,t))/(2*d))*.9;B.rotation.x=-Math.atan((H(bx,bz+d,t)-H(bx,bz-d,t))/(2*d))*.9;
sun.position.x=sx*54*TH*asp*.42;L.position.x=sx*8;
for(var i=0;i<P.count;i++)A[i*3+1]=H(A[i*3],A[i*3+2],t);P.needsUpdate=true;
px+=(mx-px)*.05;C.position.set(px*.8,2.4,9);C.lookAt(0,2.4+10*Math.tan(pitch),-1);R.render(S,C);if(live&&!still)go()}
addEventListener('pointermove',function(e){mx=e.clientX/innerWidth*2-1},{passive:true});
if(window.IntersectionObserver)new IntersectionObserver(function(e){live=e[0].isIntersecting;if(live&&!still)go()}).observe(hero);
function onSize(){size();if(still)frame(performance.now())}
size();try{frame(performance.now());hero.classList.add('gl')}catch(e){return}
if(window.ResizeObserver)new ResizeObserver(onSize).observe(hero);else addEventListener('resize',onSize);
})();
