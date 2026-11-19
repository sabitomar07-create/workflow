const $=s=>document.querySelector(s),all=s=>[...document.querySelectorAll(s)];
const rm=matchMedia('(prefers-reduced-motion:reduce)').matches,fine=matchMedia('(pointer:fine)').matches;
all('.split').forEach(el=>{el.setAttribute('aria-label',el.textContent);let i=0;const wrap=n=>[...n.childNodes].forEach(c=>{if(c.nodeType===3){const f=document.createDocumentFragment();c.textContent.split(/(\s+)/).forEach(w=>{if(/^\s+$/.test(w))f.append(' ');else if(w){const d=document.createElement('span');d.className='w';d.setAttribute('aria-hidden','true');[...w].forEach(k=>{const s=document.createElement('span');s.className='ch';s.textContent=k;s.style.setProperty('--i',i++);d.append(s)});f.append(d)}});c.replaceWith(f)}else if(c.nodeType===1)wrap(c)});wrap(el)});
const sc=all('.scene'),bg=all('.bg'),run=$('#run'),dots=$('.dots');
sc.forEach((_,i)=>{const b=document.createElement('button');b.setAttribute('aria-label','Scene '+(i+1));b.onclick=()=>go(i);dots.append(b)});
function go(i){scrollTo({top:run.offsetTop+(i+.35)/5*(run.offsetHeight-innerHeight),behavior:rm?'auto':'smooth'})}
all('[data-go]').forEach(a=>a.onclick=e=>{e.preventDefault();go(+a.dataset.go)});
let cur=-1;
function onScroll(){const q=Math.max(0,Math.min(5,(scrollY-run.offsetTop)/(run.offsetHeight-innerHeight)*5)),idx=Math.min(4,Math.floor(q));
sc.forEach((s,i)=>{s.style.setProperty('--sp',Math.max(0,Math.min(1,q-i+.15)));s.classList.toggle('on',i===idx)});
bg.forEach((b,i)=>b.classList.toggle('on',i===idx));[...dots.children].forEach((d,i)=>d.classList.toggle('on',i===idx));cur=idx}
addEventListener('scroll',onScroll,{passive:true});onScroll();
// stars
const c=$('#sky'),x=c.getContext('2d');let W,H,S=[],m={x:-999,y:-999};
function size(){const d=Math.min(devicePixelRatio||1,2);W=innerWidth;H=innerHeight;c.width=W*d;c.height=H*d;x.setTransform(d,0,0,d,0,0);S=Array.from({length:Math.round(W*H/15000)},()=>({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.2,vy:(Math.random()-.5)*.2,r:Math.random()*1.6+.6}))}
size();addEventListener('resize',size);
// cursor, guide line
const cr=$('#cur'),l1=$('#l1'),sq=$('#sq'),an=$('#an');let cx=0,cy=0,lx=0,ly=0,ax,ay;
addEventListener('pointermove',e=>{m.x=e.clientX;m.y=e.clientY;cr.style.transform=`translate(${m.x}px,${m.y}px)`;cr.classList.toggle('big',!!e.target.closest('a,button,input,textarea,.pil'))});
function tick(){ax=W*.14;ay=H*.78;if(m.x>-900){lx+=(m.x-lx)*.12;ly+=(m.y-ly)*.12}else{lx=ax;ly=ay}
l1.setAttribute('x1',ax);l1.setAttribute('y1',ay);l1.setAttribute('x2',lx);l1.setAttribute('y2',ly);sq.setAttribute('x',lx-6);sq.setAttribute('y',ly-6);an.setAttribute('cx',ax);an.setAttribute('cy',ay);
$('#ln').style.opacity=cur===0?1:0;
x.clearRect(0,0,W,H);
for(const s of S){if(!rm){s.x+=s.vx;s.y+=s.vy;if(s.x<0||s.x>W)s.vx*=-1;if(s.y<0||s.y>H)s.vy*=-1}const d=Math.hypot(s.x-m.x,s.y-m.y);x.fillStyle=d<170?'#ffe9b0':'rgba(255,255,255,.7)';x.shadowColor='#ffd98a';x.shadowBlur=d<170?14:3;x.beginPath();x.arc(s.x,s.y,s.r+(d<170?1.2:0),0,7);x.fill()}
x.shadowBlur=0;
for(let i=0;i<S.length;i++)for(let j=i+1;j<S.length;j++){const a=S[i],b=S[j],d=Math.hypot(a.x-b.x,a.y-b.y);if(d<110){const n=Math.hypot(a.x-m.x,a.y-m.y)<170||Math.hypot(b.x-m.x,b.y-m.y)<170;x.strokeStyle=n?`rgba(255,217,138,${(1-d/110)*.9})`:`rgba(255,255,255,${(1-d/110)*.12})`;x.lineWidth=n?1.2:.6;x.beginPath();x.moveTo(a.x,a.y);x.lineTo(b.x,b.y);x.stroke()}}
requestAnimationFrame(tick)}tick();
// confetti
function burst(px,py){if(rm)return;for(let i=0;i<14;i++){const s=document.createElement('span');s.className='star';s.textContent='✦';s.style.left=px+'px';s.style.top=py+'px';document.body.append(s);const a=Math.random()*6.28,d=60+Math.random()*90;s.animate([{transform:'translate(0,0) scale(1)',opacity:1},{transform:`translate(${Math.cos(a)*d}px,${Math.sin(a)*d+40}px) rotate(${Math.random()*360}deg) scale(.2)`,opacity:0}],{duration:900+Math.random()*500,easing:'cubic-bezier(.2,.8,.3,1)'}).onfinish=()=>s.remove()}}
addEventListener('click',e=>burst(e.clientX,e.clientY));
$('#f').onsubmit=e=>{e.preventDefault();burst(innerWidth/2,innerHeight/2);const b=encodeURIComponent($('#m').value+'\n\n'+$('#n').value);location.href=`mailto:hello@vanthis.com?subject=New project from ${encodeURIComponent($('#n').value)}&body=${b}`;$('#f').innerHTML='<p style="margin:0;font:italic 28px var(--serif)">Thank you. Your email app should open now.</p>'};
