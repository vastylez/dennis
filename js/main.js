const bar=document.getElementById('progress');
  const onScroll=()=>{const h=document.documentElement;bar.style.width=((h.scrollTop/(h.scrollHeight-h.clientHeight))*100)+'%'};
  addEventListener('scroll',onScroll,{passive:true}); onScroll();
  const revealEls=[...document.querySelectorAll('.reveal,.card,.svc')];
  revealEls.forEach(el=>el.classList.remove('in'));

  const io=new IntersectionObserver((entries)=>{
    entries.forEach((entry)=>{
      if(!entry.isIntersecting) return;
      const el=entry.target;
      const siblings=[...el.parentElement.querySelectorAll('.reveal,.card,.svc')].filter(x=>x.parentElement===el.parentElement);
      const i=Math.max(0,siblings.indexOf(el));
      setTimeout(()=>el.classList.add('in'), Math.min(220, i*55));
      io.unobserve(el);
    });
  },{threshold:.06, rootMargin:'0px 0px -12% 0px'});

  revealEls.forEach(el=>io.observe(el));

  const forceReveal=()=>{
    const vh=window.innerHeight||document.documentElement.clientHeight;
    revealEls.forEach((el)=>{
      if(el.classList.contains('in')) return;
      const r=el.getBoundingClientRect();
      if(r.top < vh*0.9) el.classList.add('in');
    });
  };
  addEventListener('scroll', forceReveal, {passive:true});
  addEventListener('resize', forceReveal);
  setTimeout(forceReveal, 120);
  const co=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return; const el=e.target,end=+el.dataset.count||0,s=performance.now(),d=900; const t=(n)=>{const k=Math.min(1,(n-s)/d); el.textContent=Math.round(end*k).toLocaleString(); if(k<1)requestAnimationFrame(t)}; requestAnimationFrame(t); co.unobserve(el)}),{threshold:.6});
  document.querySelectorAll('[data-count]').forEach(el=>co.observe(el));