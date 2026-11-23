/* Language switch (English / Arabic): sets <html> lang and dir, remembers the choice. */
(function(){
var d=document.documentElement,b=document.getElementById('lang'),k='mfg-lang';
var T={en:'Mister Fishing Gear – Sidi Beshr, Alexandria',ar:'Mister Fishing Gear – معدات الصيد، سيدي بشر، الإسكندرية'};
function set(l){d.lang=l;d.dir=l==='ar'?'rtl':'ltr';document.title=T[l];
b.textContent=l==='ar'?'English':'العربية';b.lang=l==='ar'?'en':'ar';
b.setAttribute('aria-label',l==='ar'?'Switch to English':'التبديل إلى العربية');}
var s=null;try{s=localStorage.getItem(k)}catch(e){}
if(s!=='ar'&&s!=='en')s=(navigator.language||'').toLowerCase().indexOf('ar')===0?'ar':'en';
set(s);
b.addEventListener('click',function(){var n=d.lang==='ar'?'en':'ar';set(n);try{localStorage.setItem(k,n)}catch(e){}});
})();
