(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[219],{5332:function(e,t,o){(window.__NEXT_P=window.__NEXT_P||[]).push(["/[slug]",function(){return o(2527)}])},2527:function(e,t,o){"use strict";o.r(t),o.d(t,{__N_SSG:function(){return _},default:function(){return C}});var r=o(5893),n=o(9008),s=o.n(n),i=o(2088),l=o(967),a=o(7747),d=o(4225),c=o(2757),x=o(7239),p=o(6089),u=o(7294),h=o(5083),f=o(9778),m=o(6559),g=o(6205),b=o(4859),j=o(4346),w=o(3717),v=o(4e3),y=o(4253),S=o(8948);let E=async function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"",r=t.map(e=>({...e,message:void 0})),n=await fetch("https://darwin-assistant.vercel.app/api/v1/conversation/labs",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({history:r,content:o,message:e})});return await n.json()};var k=function(e){let{btnRef:t,isOpen:o,onOpen:n,onClose:s,content:i}=e,[l,x]=(0,u.useState)(""),[p,k]=(0,u.useState)([]),[_,C]=(0,u.useState)(!1);(0,u.useEffect)(()=>{(async()=>{let e=await E("",p,i);k([{role:"user",parts:[{text:""}],message:""},{role:"model",parts:[{text:e.response}],message:e.response}])})()},[]);let z=async()=>{if(!l.trim())return;C(!0),x(""),k(e=>[...e,{role:"user",parts:[{text:l}],message:l},{role:"model",parts:[{text:"Thinking..."}],message:"Thinking..."}]);let e=await E(l,p,i);k(t=>{let o=[...t];return o[o.length-1]={role:"model",parts:[{text:e.response}],message:e.response},o}),C(!1)};return(0,r.jsxs)(h.d,{blockScrollOnMount:!1,size:"lg",isOpen:o,placement:"right",onClose:s,finalFocusRef:t,children:[(0,r.jsx)(f.Z,{}),(0,r.jsxs)(m.s,{children:[(0,r.jsx)(g.o,{}),(0,r.jsx)(b.x,{children:(0,r.jsx)(c.X,{color:"#ff79c6",size:"md",children:"Conversation With Darwin"})}),(0,r.jsx)(j.f,{children:p.map((e,t)=>e.message&&(0,r.jsx)(w.k,{direction:"column",align:"model"===e.role?"flex-start":"flex-end",children:(0,r.jsxs)(a.xu,{mb:4,p:3,borderRadius:"md",bg:"model"===e.role?"#2D3748":"#4A5568",color:"white",width:"85%",transition:"all 0.2s ease-in-out",_hover:{bg:"model"===e.role?"#394150":"#5A6478",transform:"scale(1.02)",boxShadow:"md"},children:[(0,r.jsx)(v.x,{fontWeight:"bold",color:"#ff79c6",children:"model"===e.role?"Darwin":"You"}),(0,r.jsx)(v.x,{mt:1,children:e.message})]})},t))}),(0,r.jsx)(y.m,{children:(0,r.jsxs)(w.k,{w:"100%",children:[(0,r.jsx)(S.I,{value:l,onChange:e=>x(e.target.value),onKeyDown:e=>{"Enter"===e.key&&z()},isDisabled:_,placeholder:"Send a message...",borderLeftRadius:"2xl",borderRightRadius:0,borderWidth:3,borderColor:"#536189",focusBorderColor:"#ff79c6",my:2}),(0,r.jsx)(d.z,{onClick:z,isLoading:_,loadingText:"Sending...",colorScheme:"purple",borderLeftRadius:0,my:2,children:"Send"})]})})]})]})},_=!0;function C(e){let{article:t}=e,{isOpen:o,onOpen:n,onClose:h}=(0,l.q)(),f=(0,u.useRef)(),[m,g]=(0,u.useState)(!1),[b,j]=(0,u.useState)(!1),[w,v]=(0,u.useState)([]);return(0,u.useEffect)(()=>{let e=()=>g(window.innerWidth<768);return e(),window.addEventListener("resize",e),()=>window.removeEventListener("resize",e)},[]),(0,u.useEffect)(()=>{v((()=>{let e=document.createElement("div");return e.innerHTML=(null==t?void 0:t.description)||"",Array.from(e.querySelectorAll("h1, h2, h3")).map((e,t)=>({id:"toc-header-".concat(t),text:e.innerText,level:parseInt(e.tagName.substring(1))}))})())},[t]),(0,u.useEffect)(()=>{let e=document.querySelector(".content");((null==e?void 0:e.querySelectorAll("h1, h2, h3"))||[]).forEach((e,t)=>{e.setAttribute("id","toc-header-".concat(t))})},[t]),(0,u.useEffect)(()=>{let e=document.querySelector(".content"),t=(null==e?void 0:e.querySelectorAll("pre"))||[],o=(null==e?void 0:e.querySelectorAll("code"))||[];t.forEach(e=>{e.style.width="1024px",e.parentNode.style.overflowX="scroll",e.parentNode.style.marginBlock="15px",e.style.backgroundColor="#272822"}),o.forEach(e=>{e.classList.add("custom-code")});let r=new MutationObserver(()=>{t.forEach(e=>e.style.width="1024px")});return e&&r.observe(e,{childList:!0,subtree:!0}),()=>r.disconnect()},[t]),(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)(s(),{children:[(0,r.jsx)("link",{rel:"icon",href:"https://firebasestorage.googleapis.com/v0/b/personal-blog-darmajr.appspot.com/o/portofolio%2Fadmin%2FAvatar.svg?alt=media&token=622405c3-9dff-4483-af0c-ddc95fbe6445"}),(0,r.jsx)("title",{children:t.title}),(0,r.jsx)("meta",{name:"description",content:t.short_description}),(0,r.jsx)("meta",{property:"og:title",content:t.title}),(0,r.jsx)("meta",{property:"og:description",content:t.short_description}),(0,r.jsx)("meta",{property:"og:type",content:"article"}),(0,r.jsx)("meta",{property:"og:url",content:"https://barbarpotato.github.io/labs/".concat(t.slug)})]}),(0,r.jsx)(a.xu,{position:"fixed",left:"0",top:"50%",transform:"translateY(-50%)",zIndex:"1000",children:m?(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(d.z,{onClick:()=>j(e=>!e),position:"fixed",top:"50%",left:"8px",transform:"translateY(-50%)",zIndex:"1100",bg:"#3F3F3F",color:"white",borderRadius:"12px",h:"60px",w:"28px",fontSize:"0.7em",writingMode:"vertical-rl",boxShadow:"2px 2px 6px rgba(0,0,0,0.3)",children:"TOC"}),b&&(0,r.jsx)(a.xu,{position:"fixed",top:"50%",left:"42px",transform:"translateY(-50%)",bg:"#1E1E1E",p:"12px 25px",borderRadius:"8px",color:"white",maxH:"70vh",w:"220px",overflowY:"auto",boxShadow:"2px 2px 8px rgba(0,0,0,0.3)",zIndex:"1099",children:w.map(e=>(0,r.jsx)(a.xu,{ml:(e.level-1)*3,py:1,borderBottom:"1px solid #333",children:(0,r.jsx)("a",{href:"#".concat(e.id),style:{color:"#f0f0f0",textDecoration:"none"},children:e.text})},e.id))})]}):(0,r.jsx)(a.xu,{onMouseEnter:()=>j(!0),onMouseLeave:()=>j(!1),bg:"#1E1E1E",p:b?4:1,borderTopRightRadius:"12px",borderBottomRightRadius:"12px",color:"white",maxH:"80vh",overflowY:"auto",transition:"width 0.3s ease, padding 0.3s ease",w:b?"240px":"20px",fontSize:"0.9em",children:b?w.map(e=>(0,r.jsx)(a.xu,{ml:(e.level-1)*3,py:1,borderBottom:"1px solid #333",children:(0,r.jsx)("a",{href:"#".concat(e.id),style:{color:"#f0f0f0",textDecoration:"none"},children:e.text})},e.id)):(0,r.jsx)(a.xu,{writingMode:"vertical-rl",transform:"rotate(180deg)",cursor:"pointer",fontWeight:"bold",color:"#aaa",children:"TOC"})})}),(0,r.jsxs)("article",{children:[(0,r.jsx)(a.xu,{mx:"auto",w:{base:"70%",md:"35%"},children:(0,r.jsx)(c.X,{color:"whitesmoke",children:t.title})}),(0,r.jsx)(x.M,{pt:2,pb:10,children:(0,r.jsx)(p.E,{src:t.image,w:{base:"70%",md:"35%"},borderRadius:"lg"})}),(0,r.jsx)(a.xu,{mx:"auto",w:{base:"70%",md:"35%"},display:"flex",justifyContent:"center",children:(0,r.jsx)("div",{className:"content",style:{overflowX:"auto",fontSize:"1.3em"},dangerouslySetInnerHTML:{__html:t.description}})}),m?(0,r.jsx)("button",{ref:f,onClick:n,style:{position:"fixed",bottom:"20px",right:"20px",zIndex:1e3,background:"#6B46C1",borderRadius:"50%",padding:"12px",border:"none"},children:(0,r.jsx)(i.E0L,{size:30,color:"white"})}):(0,r.jsx)(d.z,{ref:f,position:"fixed",right:"20px",bottom:"20px",zIndex:1e3,colorScheme:"purple",onClick:n,children:"Ask Darwin AI"}),(0,r.jsx)(k,{btnRef:f,isOpen:o,onOpen:n,onClose:h,content:t.description})]})]})}}},function(e){e.O(0,[838,187,888,774,179],function(){return e(e.s=5332)}),_N_E=e.O()}]);