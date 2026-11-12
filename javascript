(function(){
var IM=["","img/armazem.jpg","img/maquinarios.jpg","img/veterinaria.jpg","img/cooperativa.jpg","img/escritorio-fazenda.jpg","img/industria.jpg","img/distribuidora.jpg","img/supermercado.jpg","img/feira.jpg","","img/paineis-solares.jpg"];
function $(i){return document.getElementById(i)}
var lb=$("lb"),lbi=lb.querySelector("img");
lb.onclick=function(){lb.classList.remove("on")};
/* REVEAL + NAV */
var rv=[].slice.call(document.querySelectorAll("section>*"));rv.forEach(function(e){e.classList.add("rv")});
if("IntersectionObserver" in window){var io=new IntersectionObserver(function(es){es.forEach(function(x){if(x.isIntersecting){x.target.classList.add("in");io.unobserve(x.target)}})},{threshold:.08});rv.forEach(function(e){io.observe(e)});
var links=[].slice.call(document.querySelectorAll(".bn a"));
var io2=new IntersectionObserver(function(es){es.forEach(function(x){if(x.isIntersecting){links.forEach(function(a){a.classList.toggle("on",a.getAttribute("href")==="#"+x.target.id)})}})},{rootMargin:"-40% 0px -55% 0px"});
[].forEach.call(document.querySelectorAll("header,section"),function(s){io2.observe(s)})}else{rv.forEach(function(e){e.classList.add("in")})}
/* PLAYER */
var curP=null;
function say(t,on){try{speechSynthesis.cancel();if(on){var u=new SpeechSynthesisUtterance(t);u.lang="pt-BR";speechSynthesis.speak(u)}}catch(e){}}
function mk(host,title,sc){
var i=0,pl=false,tm=0,vo=false,started=false,api={};
host.innerHTML='<div class="vt">'+title+'</div><div class="stage"></div><div class="ctl"><button class="pb">▶</button><div class="seg"></div><button class="vo">🔊</button></div>';
var st=host.querySelector(".stage"),seg=host.querySelector(".seg"),pb=host.querySelector(".pb"),vb=host.querySelector(".vo");
function dur(s){return Math.max(5500,s.t.length*(vo?72:55))}
function render(){
var s=sc[i],n=s.s?s.s.length:0;
st.className="stage "+(s.g||"g0");
st.innerHTML=(s.im?'<div class="bgi" style="background-image:url('+IM[s.im]+')"></div>':"")+(s.s||[]).map(function(a,k){return'<span class="sp '+(a[1]||"")+'" style="left:'+((k+.5)/n*100)+'%;top:'+(14+(k%2)*28)+'%;animation-delay:-'+k*.5+'s">'+a[0]+'</span>'}).join("")+'<div class="cap"><h4>'+s.h+'</h4><p>'+s.t+'</p></div>'+(started?"":'<button class="big">▶</button>');
var b=st.querySelector(".big");if(b)b.onclick=toggle;
seg.innerHTML=sc.map(function(x,k){return'<i class="'+(k<i?"d":k===i?"a"+(pl?" pl":""):"")+'" style="--d:'+dur(s)+'ms"><b></b></i>'}).join("");
pb.textContent=pl?"⏸":"▶"}
function sched(){clearTimeout(tm);if(!pl)return;say(sc[i].t,vo);tm=setTimeout(function(){if(i<sc.length-1){i++;render();sched()}else{pl=false;i=0;started=false;say("",false);render()}},dur(sc[i]))}
function toggle(){if(curP&&curP!==api)curP.stop();curP=api;started=true;pl=!pl;if(!pl){clearTimeout(tm);say("",false)}render();sched()}
api.stop=function(){pl=false;clearTimeout(tm);say("",false);render()};
pb.onclick=toggle;
vb.onclick=function(){vo=!vo;vb.classList.toggle("on",vo);if(pl){render();sched()}};
render();return api}
mk($("v1"),"1 · O que é o agronegócio?",[
{g:"g0",s:[["☀️","spin"],["☁️"],["🌾","sway"]],h:"Do campo à mesa",t:"O agronegócio reúne tudo o que acontece para o alimento chegar até você."},
{g:"g1",s:[["🚜","drive"],["🌱"],["🚪"]],h:"A porteira",t:"A porteira é a divisão simbólica da fazenda. Existem etapas antes, dentro e depois dela."},
{g:"g2",s:[["📦"],["🌾","sway"],["🛒"]],h:"Três momentos",t:"Antes: preparar. Dentro: produzir. Depois: transformar, distribuir e vender."},
{g:"g3",s:[["🍽️"],["💼"],["🌍"]],h:"Por que importa",t:"Ele gera alimento, empregos e movimenta a economia."}]);
mk($("v2"),"2 · Antes da porteira",[
{im:1,h:"Armazém de insumos",t:"Recebe, guarda e distribui sementes, fertilizantes, rações e defensivos."},
{im:2,h:"Maquinários",t:"Tratores e colheitadeiras aumentam a produtividade e poupam esforço."},
{im:3,h:"Veterinária",t:"Cuida da saúde dos animais e ajuda a garantir alimentos seguros."},
{im:4,h:"Cooperativa",t:"Produtores unidos conseguem melhores condições de compra e venda."},
{im:5,h:"Escritório da fazenda",t:"Organiza o planejamento, o controle financeiro e a gestão da equipe."}]);
mk($("v3"),"3 · Depois da porteira",[
{im:6,h:"Indústria",t:"Transforma a matéria-prima do campo em produtos e gera empregos."},
{im:7,h:"Distribuidora",t:"Guarda os produtos e organiza o transporte até os mercados."},
{im:8,h:"Supermercado",t:"É onde o produto do campo chega ao consumidor final."},
{im:9,h:"Feira do produtor",t:"Aproxima quem produz de quem consome, com alimentos frescos."}]);
/* LEITURA */
var art=$("art"),fs=1.06;
function setFs(d){fs=Math.min(1.5,Math.max(.9,fs+d));art.style.fontSize=fs+"rem"}
$("am").onclick=function(){setFs(-.08)};$("ap").onclick=function(){setFs(.08)};
function prog(){var r=art.getBoundingClientRect(),h=r.height-window.innerHeight*.6,p=Math.min(1,Math.max(0,-r.top/Math.max(h,1)+.05));$("pgi").style.width=(p*100)+"%"}
window.addEventListener("scroll",prog,{passive:true});prog();
/* EXPLORAR */
var D=[
{ph:"antes",n:"Insumos e armazém",e:"📦",im:1,w:"Estrutura que recebe, guarda e distribui sementes, fertilizantes, rações e defensivos antes de chegarem à fazenda.",f:["Receber produtos dos fornecedores","Armazenar e controlar o estoque","Distribuir para lojas e cooperativas"],y:"Evita desperdícios e garante insumos na hora certa."},
{ph:"antes",n:"Maquinários",e:"🚜",im:2,w:"Tratores, colheitadeiras, plantadeiras e pulverizadores usados no campo.",f:["Aumentar a produtividade","Reduzir o esforço","Economizar tempo"],y:"Ajuda a produzir mais e com mais qualidade."},
{ph:"antes",n:"Veterinária",e:"🐄",im:3,w:"Área que cuida da saúde dos animais em todas as etapas da produção.",f:["Vacinação e exames","Prevenção de doenças","Orientação nutricional"],y:"Mantém os animais saudáveis e os alimentos seguros."},
{ph:"antes",n:"Cooperativa",e:"🤝",im:4,w:"União entre produtores para conseguir melhores condições de compra e venda.",f:["Apoiar o produtor rural","Melhorar condições de venda","Incentivar a produção sustentável"],y:"Juntos, os produtores ficam mais fortes."},
{ph:"antes",n:"Escritório",e:"🗂️",im:5,w:"Local onde são organizadas e planejadas as atividades do campo.",f:["Controle do rebanho e da produção","Planejar plantio e colheita","Controle financeiro e da equipe"],y:"Mais controle dos recursos e decisões mais acertadas."},
{ph:"antes",n:"Energia solar",e:"☀️",im:11,w:"Painéis que captam a luz do sol e a transformam em energia elétrica.",f:["Reduzir a conta de luz","Usar fonte renovável","Diminuir a emissão de carbono"],y:"Um jeito sustentável de energizar a propriedade."},
{ph:"dentro",n:"Fazenda",e:"🌱",im:0,w:"É dentro da porteira que acontece a produção: plantio, colheita, criação de animais e manejo.",f:["Plantar e colher","Criar e cuidar dos animais","Usar o que foi preparado antes"],y:"É o coração da cadeia: dali sai a matéria-prima."},
{ph:"depois",n:"Indústria",e:"🏭",im:6,w:"Local onde a matéria-prima do campo é processada e transformada em produtos.",f:["Processar e transformar","Embalar","Abastecer o mercado"],y:"Agrega valor, gera empregos e movimenta a economia."},
{ph:"depois",n:"Distribuidora",e:"🚚",im:7,w:"Recebe os produtos da indústria, guarda e organiza para levar aos mercados.",f:["Armazenar com cuidado","Organizar a logística","Distribuir aos mercados"],y:"É a ponte entre a indústria e o supermercado."},
{ph:"depois",n:"Supermercado",e:"🛒",im:8,w:"Local onde os produtos do campo são vendidos diretamente ao consumidor.",f:["Reunir produtos variados","Vender ao consumidor","Receber de distribuidores"],y:"É onde o alimento finalmente chega às pessoas."},
{ph:"depois",n:"Feira do produtor",e:"🥕",im:9,w:"Canal de venda em que o produtor se aproxima do consumidor, com alimentos frescos.",f:["Comercializar os produtos","Garantir acesso a alimentos de qualidade","Valorizar a produção local"],y:"Aproxima quem produz de quem consome."}];
var PH={todas:"Todas",antes:"Antes",dentro:"Dentro",depois:"Depois"},cur=0,filt="todas",tabs=$("tabs"),nodes=$("nodes"),panel=$("panel");
Object.keys(PH).forEach(function(k){var b=document.createElement("button");b.className="tab"+(k===filt?" on":"");b.textContent=PH[k];b.onclick=function(){filt=k;[].forEach.call(tabs.children,function(t){t.classList.toggle("on",t===b)});draw();var v=vis();if(v.indexOf(cur)<0)cur=v[0];show()};tabs.appendChild(b)});
D.forEach(function(d,i){var b=document.createElement("button");b.className="node";b.dataset.ph=d.ph;b.textContent=d.e+" "+d.n;b.onclick=function(){cur=i;show()};nodes.appendChild(b)});
function vis(){return D.map(function(d,i){return i}).filter(function(i){return filt==="todas"||D[i].ph===filt})}
function draw(){[].forEach.call(nodes.children,function(n,i){n.classList.toggle("hide",vis().indexOf(i)<0)})}
function show(){var d=D[cur],P={antes:"Antes da porteira",dentro:"Dentro da porteira",depois:"Depois da porteira"};
[].forEach.call(nodes.children,function(n,i){n.classList.toggle("on",i===cur)});
panel.classList.remove("sw");void panel.offsetWidth;panel.classList.add("sw");
panel.innerHTML='<div class="pic">'+(d.im?'<img src="'+IM[d.im]+'" alt="'+d.n+'">':d.e)+'</div><div><span class="badge">'+P[d.ph]+'</span><h3>'+d.e+" "+d.n+'</h3><p>'+d.w+'</p><ul>'+d.f.map(function(x){return"<li>"+x+"</li>"}).join("")+'</ul><div class="why"><b>Por que importa:</b> '+d.y+'</div></div>';
var im=panel.querySelector("img");if(im)im.onclick=function(){lbi.src=im.src;lbi.alt=im.alt;lb.classList.add("on")};
var v=vis(),p=v.indexOf(cur);$("prev").disabled=p<=0;$("next").disabled=p>=v.length-1;
var nd=nodes.children[cur];if(nd&&nd.scrollIntoView)try{nodes.scrollTo({left:nd.offsetLeft-20,behavior:"smooth"})}catch(e){}}
function go(s){var v=vis(),p=v.indexOf(cur)+s;if(p>=0&&p<v.length){cur=v[p];show()}}
$("prev").onclick=function(){go(-1)};$("next").onclick=function(){go(1)};
document.addEventListener("keydown",function(e){if(e.key==="Escape")lb.classList.remove("on")});
draw();show();
/* QUIZ */
var Q=[
{q:"O que significa “antes da porteira”?",o:["O que acontece após a venda no supermercado","Tudo o que prepara a produção, como insumos e máquinas","Somente a colheita","A exportação dos produtos"],a:1,x:"Antes da porteira reúne as atividades que preparam a produção."},
{q:"Qual etapa guarda os produtos da indústria e os leva aos mercados?",o:["Veterinária","Cooperativa","Distribuidora","Escritório da fazenda"],a:2,x:"A distribuidora é a ponte entre a indústria e o supermercado."},
{q:"Para que serve uma cooperativa?",o:["Para produtores se unirem e terem melhores condições","Para processar leite","Para vender só máquinas","Para gerar energia"],a:0,x:"A união gera mais força e melhores condições de venda."},
{q:"Quem cuida da saúde dos animais na produção?",o:["Indústria","Veterinária","Feira do produtor","Supermercado"],a:1,x:"A medicina veterinária previne doenças e promove o bem-estar animal."},
{q:"Qual é uma vantagem dos painéis solares no campo?",o:["Aumentam a conta de luz","Dependem de combustível fóssil","Usam fonte renovável e reduzem a conta de luz","Só funcionam à noite"],a:2,x:"A luz do sol é uma fonte renovável e econômica."}];
var qz=$("quiz"),qi=0,sc=0;
function qdraw(){
if(qi>=Q.length){qz.innerHTML='<h3 style="margin:0 0 6px">Você acertou '+sc+" de "+Q.length+' '+(sc===Q.length?"🏆":sc>=3?"👏":"📚")+'</h3><p>'+(sc===Q.length?"Perfeito!":sc>=3?"Muito bem!":"Vale reler o guia lá em cima.")+'</p><button class="btn" id="qr">Refazer quiz</button>';$("qr").onclick=function(){qi=0;sc=0;qdraw()};return}
var q=Q[qi];
qz.innerHTML='<div class="bar"><i style="width:'+(qi/Q.length*100)+'%"></i></div><b style="font-family:system-ui,sans-serif">Pergunta '+(qi+1)+" de "+Q.length+'</b><h3 style="margin:6px 0">'+q.q+'</h3><div class="opts"></div><div class="fb"></div><button class="btn" id="qn" style="display:none">'+(qi===Q.length-1?"Ver resultado":"Próxima")+'</button>';
var box=qz.querySelector(".opts"),fb=qz.querySelector(".fb"),nx=$("qn");
q.o.forEach(function(t,i){var b=document.createElement("button");b.className="opt";b.textContent=t;b.onclick=function(){
[].forEach.call(box.children,function(c,j){c.disabled=true;if(j===q.a)c.classList.add("ok")});
if(i===q.a){sc++;fb.textContent="✅ Correto! "+q.x}else{b.classList.add("no");fb.textContent="❌ Não foi dessa vez. "+q.x}
nx.style.display="inline-block"};box.appendChild(b)});
nx.onclick=function(){qi++;qdraw()}}
qdraw();
/* JOGO */
var G=[["🌱","Insumos e sementes"],["🚜","Máquinas"],["🌾","Plantio e colheita"],["🏭","Indústria"],["🚚","Distribuidora"],["🛒","Supermercado"],["🍽️","Sua mesa"]];
var slots=$("slots"),chips=$("chips"),gfb=$("gfb"),step=0;
function gstart(){step=0;gfb.textContent="";slots.innerHTML="";chips.innerHTML="";
G.forEach(function(g,i){var s=document.createElement("div");s.className="slot";s.textContent=(i+1)+"º";slots.appendChild(s)});
G.map(function(g,i){return i}).sort(function(){return Math.random()-.5}).forEach(function(i){
var b=document.createElement("button");b.className="chip";b.textContent=G[i][0]+" "+G[i][1];
b.onclick=function(){if(i===step){var s=slots.children[step];s.className="slot f";s.textContent=G[i][0]+" "+G[i][1];b.disabled=true;step++;gfb.textContent=step===G.length?"🎉 Parabéns! O alimento chegou à sua mesa.":"Isso! Qual é o próximo?"}
else{b.classList.remove("shake");void b.offsetWidth;b.classList.add("shake");gfb.textContent="Ainda não, tente outra etapa."}};
chips.appendChild(b)})}
$("greset").onclick=gstart;gstart();
})();