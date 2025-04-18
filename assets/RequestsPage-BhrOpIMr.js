import{g as re,a as ne,s as F,r as u,u as ae,aH as nt,aI as Mt,j as s,c as P,b as _,D as Ie,_ as Te,q as le,L as ee,aJ as Ue,aw as at,v as lt,F as ve,K as oe,N as Ve,aK as kt,z as Et,G as Pt,a2 as it,a1 as ct,a4 as dt,Z as xe,f as Ft,H as we,a0 as $t,k as Me,ao as te,i as ut,T as Y,a9 as qt,aa as pe,aL as Ot,aM as Nt,S as L,aN as Z,B as zt,ae as Lt,aE as Dt,aj as Wt,af as Gt,ah as je,P as Je}from"./index-BZkRBEHS.js";import{u as ke,b as Xe,a as At}from"./index-CLEpx6nL.js";import{l as ue,g as Ht,S as Ut,a as Vt,K as Jt,d as Ee,e as se,I as Xt,F as Ke,L as pt,b as Kt,c as Yt,u as _t}from"./selectedRequest-BevRt0DN.js";import{T as Qt,a as Zt,b as eo,c as to,i as oo}from"./isEmptyValues-BL65-UoV.js";function so(e){return ne("MuiFormGroup",e)}re("MuiFormGroup",["root","row","error"]);const ro=e=>{const{classes:t,row:o,error:r}=e;return _({root:["root",o&&"row",r&&"error"]},so,t)},no=F("div",{name:"MuiFormGroup",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:o}=e;return[t.root,o.row&&t.row]}})({display:"flex",flexDirection:"column",flexWrap:"wrap",variants:[{props:{row:!0},style:{flexDirection:"row"}}]}),ao=u.forwardRef(function(t,o){const r=ae({props:t,name:"MuiFormGroup"}),{className:n,row:a=!1,...f}=r,p=nt(),l=Mt({props:r,muiFormControl:p,states:["error"]}),i={...r,row:a,error:l.error},h=ro(i);return s.jsx(no,{className:P(h.root,n),ownerState:i,ref:o,...f})}),lo=(e,t)=>{const{ownerState:o}=e;return[t.root,o.dense&&t.dense,o.alignItems==="flex-start"&&t.alignItemsFlexStart,o.divider&&t.divider,!o.disableGutters&&t.gutters]},io=e=>{const{alignItems:t,classes:o,dense:r,disabled:n,disableGutters:a,divider:f,selected:p}=e,i=_({root:["root",r&&"dense",!a&&"gutters",f&&"divider",n&&"disabled",t==="flex-start"&&"alignItemsFlexStart",p&&"selected"]},Ht,o);return{...o,...i}},co=F(Ie,{shouldForwardProp:e=>Te(e)||e==="classes",name:"MuiListItemButton",slot:"Root",overridesResolver:lo})(le(({theme:e})=>({display:"flex",flexGrow:1,justifyContent:"flex-start",alignItems:"center",position:"relative",textDecoration:"none",minWidth:0,boxSizing:"border-box",textAlign:"left",paddingTop:8,paddingBottom:8,transition:e.transitions.create("background-color",{duration:e.transitions.duration.shortest}),"&:hover":{textDecoration:"none",backgroundColor:(e.vars||e).palette.action.hover,"@media (hover: none)":{backgroundColor:"transparent"}},[`&.${ue.selected}`]:{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / ${e.vars.palette.action.selectedOpacity})`:ee(e.palette.primary.main,e.palette.action.selectedOpacity),[`&.${ue.focusVisible}`]:{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.focusOpacity}))`:ee(e.palette.primary.main,e.palette.action.selectedOpacity+e.palette.action.focusOpacity)}},[`&.${ue.selected}:hover`]:{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.hoverOpacity}))`:ee(e.palette.primary.main,e.palette.action.selectedOpacity+e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / ${e.vars.palette.action.selectedOpacity})`:ee(e.palette.primary.main,e.palette.action.selectedOpacity)}},[`&.${ue.focusVisible}`]:{backgroundColor:(e.vars||e).palette.action.focus},[`&.${ue.disabled}`]:{opacity:(e.vars||e).palette.action.disabledOpacity},variants:[{props:({ownerState:t})=>t.divider,style:{borderBottom:`1px solid ${(e.vars||e).palette.divider}`,backgroundClip:"padding-box"}},{props:{alignItems:"flex-start"},style:{alignItems:"flex-start"}},{props:({ownerState:t})=>!t.disableGutters,style:{paddingLeft:16,paddingRight:16}},{props:({ownerState:t})=>t.dense,style:{paddingTop:4,paddingBottom:4}}]}))),ft=u.forwardRef(function(t,o){const r=ae({props:t,name:"MuiListItemButton"}),{alignItems:n="center",autoFocus:a=!1,component:f="div",children:p,dense:l=!1,disableGutters:i=!1,divider:h=!1,focusVisibleClassName:y,selected:w=!1,className:j,...B}=r,I=u.useContext(Ue),C=u.useMemo(()=>({dense:l||I.dense||!1,alignItems:n,disableGutters:i}),[n,I.dense,l,i]),M=u.useRef(null);at(()=>{a&&M.current&&M.current.focus()},[a]);const S={...r,alignItems:n,dense:C.dense,disableGutters:i,divider:h,selected:w},k=io(S),E=lt(M,o);return s.jsx(Ue.Provider,{value:C,children:s.jsx(co,{ref:E,href:B.href||B.to,component:(B.href||B.to)&&f==="div"?"button":f,focusVisibleClassName:P(k.focusVisible,y),ownerState:S,className:P(k.root,j),...B,classes:k,children:p})})}),uo=ve(s.jsx("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"}),"RadioButtonUnchecked"),po=ve(s.jsx("path",{d:"M8.465 8.465C9.37 7.56 10.62 7 12 7C14.76 7 17 9.24 17 12C17 13.38 16.44 14.63 15.535 15.535C14.63 16.44 13.38 17 12 17C9.24 17 7 14.76 7 12C7 10.62 7.56 9.37 8.465 8.465Z"}),"RadioButtonChecked"),fo=F("span",{shouldForwardProp:Te})({position:"relative",display:"flex"}),ho=F(uo)({transform:"scale(1)"}),mo=F(po)(le(({theme:e})=>({left:0,position:"absolute",transform:"scale(0)",transition:e.transitions.create("transform",{easing:e.transitions.easing.easeIn,duration:e.transitions.duration.shortest}),variants:[{props:{checked:!0},style:{transform:"scale(1)",transition:e.transitions.create("transform",{easing:e.transitions.easing.easeOut,duration:e.transitions.duration.shortest})}}]})));function ht(e){const{checked:t=!1,classes:o={},fontSize:r}=e,n={...e,checked:t};return s.jsxs(fo,{className:o.root,ownerState:n,children:[s.jsx(ho,{fontSize:r,className:o.background,ownerState:n}),s.jsx(mo,{fontSize:r,className:o.dot,ownerState:n})]})}const mt=u.createContext(void 0);function bo(){return u.useContext(mt)}function xo(e){return ne("MuiRadio",e)}const Ye=re("MuiRadio",["root","checked","disabled","colorPrimary","colorSecondary","sizeSmall"]),vo=e=>{const{classes:t,color:o,size:r}=e,n={root:["root",`color${oe(o)}`,r!=="medium"&&`size${oe(r)}`]};return{...t,..._(n,xo,t)}},yo=F(Ut,{shouldForwardProp:e=>Te(e)||e==="classes",name:"MuiRadio",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:o}=e;return[t.root,o.size!=="medium"&&t[`size${oe(o.size)}`],t[`color${oe(o.color)}`]]}})(le(({theme:e})=>({color:(e.vars||e).palette.text.secondary,[`&.${Ye.disabled}`]:{color:(e.vars||e).palette.action.disabled},variants:[{props:{color:"default",disabled:!1,disableRipple:!1},style:{"&:hover":{backgroundColor:e.vars?`rgba(${e.vars.palette.action.activeChannel} / ${e.vars.palette.action.hoverOpacity})`:ee(e.palette.action.active,e.palette.action.hoverOpacity)}}},...Object.entries(e.palette).filter(Ve()).map(([t])=>({props:{color:t,disabled:!1,disableRipple:!1},style:{"&:hover":{backgroundColor:e.vars?`rgba(${e.vars.palette[t].mainChannel} / ${e.vars.palette.action.hoverOpacity})`:ee(e.palette[t].main,e.palette.action.hoverOpacity)}}})),...Object.entries(e.palette).filter(Ve()).map(([t])=>({props:{color:t,disabled:!1},style:{[`&.${Ye.checked}`]:{color:(e.vars||e).palette[t].main}}})),{props:{disableRipple:!1},style:{"&:hover":{"@media (hover: none)":{backgroundColor:"transparent"}}}}]})));function go(e,t){return typeof t=="object"&&t!==null?e===t:String(e)===String(t)}const _e=s.jsx(ht,{checked:!0}),Qe=s.jsx(ht,{}),Ze=u.forwardRef(function(t,o){const r=ae({props:t,name:"MuiRadio"}),{checked:n,checkedIcon:a=_e,color:f="primary",icon:p=Qe,name:l,onChange:i,size:h="medium",className:y,disabled:w,disableRipple:j=!1,...B}=r,I=nt();let C=w;I&&typeof C>"u"&&(C=I.disabled),C??(C=!1);const M={...r,disabled:C,disableRipple:j,color:f,size:h},S=vo(M),k=bo();let E=n;const D=kt(i,k&&k.onChange);let $=l;return k&&(typeof E>"u"&&(E=go(k.value,r.value)),typeof $>"u"&&($=k.name)),s.jsx(yo,{type:"radio",icon:u.cloneElement(p,{fontSize:Qe.props.fontSize??h}),checkedIcon:u.cloneElement(a,{fontSize:_e.props.fontSize??h}),disabled:C,ownerState:M,classes:S,name:$,checked:E,onChange:D,ref:o,className:P(S.root,y),...B})});function So(e){return ne("MuiRadioGroup",e)}re("MuiRadioGroup",["root","row","error"]);const Co=e=>{const{classes:t,row:o,error:r}=e;return _({root:["root",o&&"row",r&&"error"]},So,t)},wo=u.forwardRef(function(t,o){const{actions:r,children:n,className:a,defaultValue:f,name:p,onChange:l,value:i,...h}=t,y=u.useRef(null),w=Co(t),[j,B]=Et({controlled:i,default:f,name:"RadioGroup"});u.useImperativeHandle(r,()=>({focus:()=>{let S=y.current.querySelector("input:not(:disabled):checked");S||(S=y.current.querySelector("input:not(:disabled)")),S&&S.focus()}}),[]);const I=lt(o,y),C=Pt(p),M=u.useMemo(()=>({name:C,onChange(S){B(S.target.value),l&&l(S,S.target.value)},value:j}),[C,l,B,j]);return s.jsx(mt.Provider,{value:M,children:s.jsx(ao,{role:"radiogroup",ref:I,className:P(w.root,a),...h,children:n})})});function jo(e){return ne("MuiTab",e)}const O=re("MuiTab",["root","labelIcon","textColorInherit","textColorPrimary","textColorSecondary","selected","disabled","fullWidth","wrapped","iconWrapper","icon"]),Ro=e=>{const{classes:t,textColor:o,fullWidth:r,wrapped:n,icon:a,label:f,selected:p,disabled:l}=e,i={root:["root",a&&f&&"labelIcon",`textColor${oe(o)}`,r&&"fullWidth",n&&"wrapped",p&&"selected",l&&"disabled"],icon:["iconWrapper","icon"]};return _(i,jo,t)},Bo=F(Ie,{name:"MuiTab",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:o}=e;return[t.root,o.label&&o.icon&&t.labelIcon,t[`textColor${oe(o.textColor)}`],o.fullWidth&&t.fullWidth,o.wrapped&&t.wrapped,{[`& .${O.iconWrapper}`]:t.iconWrapper},{[`& .${O.icon}`]:t.icon}]}})(le(({theme:e})=>({...e.typography.button,maxWidth:360,minWidth:90,position:"relative",minHeight:48,flexShrink:0,padding:"12px 16px",overflow:"hidden",whiteSpace:"normal",textAlign:"center",lineHeight:1.25,variants:[{props:({ownerState:t})=>t.label&&(t.iconPosition==="top"||t.iconPosition==="bottom"),style:{flexDirection:"column"}},{props:({ownerState:t})=>t.label&&t.iconPosition!=="top"&&t.iconPosition!=="bottom",style:{flexDirection:"row"}},{props:({ownerState:t})=>t.icon&&t.label,style:{minHeight:72,paddingTop:9,paddingBottom:9}},{props:({ownerState:t,iconPosition:o})=>t.icon&&t.label&&o==="top",style:{[`& > .${O.icon}`]:{marginBottom:6}}},{props:({ownerState:t,iconPosition:o})=>t.icon&&t.label&&o==="bottom",style:{[`& > .${O.icon}`]:{marginTop:6}}},{props:({ownerState:t,iconPosition:o})=>t.icon&&t.label&&o==="start",style:{[`& > .${O.icon}`]:{marginRight:e.spacing(1)}}},{props:({ownerState:t,iconPosition:o})=>t.icon&&t.label&&o==="end",style:{[`& > .${O.icon}`]:{marginLeft:e.spacing(1)}}},{props:{textColor:"inherit"},style:{color:"inherit",opacity:.6,[`&.${O.selected}`]:{opacity:1},[`&.${O.disabled}`]:{opacity:(e.vars||e).palette.action.disabledOpacity}}},{props:{textColor:"primary"},style:{color:(e.vars||e).palette.text.secondary,[`&.${O.selected}`]:{color:(e.vars||e).palette.primary.main},[`&.${O.disabled}`]:{color:(e.vars||e).palette.text.disabled}}},{props:{textColor:"secondary"},style:{color:(e.vars||e).palette.text.secondary,[`&.${O.selected}`]:{color:(e.vars||e).palette.secondary.main},[`&.${O.disabled}`]:{color:(e.vars||e).palette.text.disabled}}},{props:({ownerState:t})=>t.fullWidth,style:{flexShrink:1,flexGrow:1,flexBasis:0,maxWidth:"none"}},{props:({ownerState:t})=>t.wrapped,style:{fontSize:e.typography.pxToRem(12)}}]}))),et=u.forwardRef(function(t,o){const r=ae({props:t,name:"MuiTab"}),{className:n,disabled:a=!1,disableFocusRipple:f=!1,fullWidth:p,icon:l,iconPosition:i="top",indicator:h,label:y,onChange:w,onClick:j,onFocus:B,selected:I,selectionFollowsFocus:C,textColor:M="inherit",value:S,wrapped:k=!1,...E}=r,D={...r,disabled:a,disableFocusRipple:f,selected:I,icon:!!l,iconPosition:i,label:!!y,fullWidth:p,textColor:M,wrapped:k},$=Ro(D),q=l&&y&&u.isValidElement(l)?u.cloneElement(l,{className:P($.icon,l.props.className)}):l,Q=N=>{!I&&w&&w(N,S),j&&j(N)},H=N=>{C&&!I&&w&&w(N,S),B&&B(N)};return s.jsxs(Bo,{focusRipple:!f,className:P($.root,n),ref:o,role:"tab","aria-selected":I,disabled:a,onClick:Q,onFocus:H,ownerState:D,tabIndex:I?0:-1,...E,children:[i==="top"||i==="start"?s.jsxs(u.Fragment,{children:[q,y]}):s.jsxs(u.Fragment,{children:[y,q]}),h]})});function Io(e){return(1+Math.sin(Math.PI*e-Math.PI/2))/2}function To(e,t,o,r={},n=()=>{}){const{ease:a=Io,duration:f=300}=r;let p=null;const l=t[e];let i=!1;const h=()=>{i=!0},y=w=>{if(i){n(new Error("Animation cancelled"));return}p===null&&(p=w);const j=Math.min(1,(w-p)/f);if(t[e]=a(j)*(o-l)+l,j>=1){requestAnimationFrame(()=>{n(null)});return}requestAnimationFrame(y)};return l===o?(n(new Error("Element already at target position")),h):(requestAnimationFrame(y),h)}const Mo={width:99,height:99,position:"absolute",top:-9999,overflow:"scroll"};function ko(e){const{onChange:t,...o}=e,r=u.useRef(),n=u.useRef(null),a=()=>{r.current=n.current.offsetHeight-n.current.clientHeight};return at(()=>{const f=ct(()=>{const l=r.current;a(),l!==r.current&&t(r.current)}),p=it(n.current);return p.addEventListener("resize",f),()=>{f.clear(),p.removeEventListener("resize",f)}},[t]),u.useEffect(()=>{a(),t(r.current)},[t]),s.jsx("div",{style:Mo,...o,ref:n})}function Eo(e){return ne("MuiTabScrollButton",e)}const Po=re("MuiTabScrollButton",["root","vertical","horizontal","disabled"]),Fo=e=>{const{classes:t,orientation:o,disabled:r}=e;return _({root:["root",o,r&&"disabled"]},Eo,t)},$o=F(Ie,{name:"MuiTabScrollButton",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:o}=e;return[t.root,o.orientation&&t[o.orientation]]}})({width:40,flexShrink:0,opacity:.8,[`&.${Po.disabled}`]:{opacity:0},variants:[{props:{orientation:"vertical"},style:{width:"100%",height:40,"& svg":{transform:"var(--TabScrollButton-svgRotate)"}}}]}),qo=u.forwardRef(function(t,o){const r=ae({props:t,name:"MuiTabScrollButton"}),{className:n,slots:a={},slotProps:f={},direction:p,orientation:l,disabled:i,...h}=r,y=dt(),w={isRtl:y,...r},j=Fo(w),B=a.StartScrollButtonIcon??Vt,I=a.EndScrollButtonIcon??Jt,C=xe({elementType:B,externalSlotProps:f.startScrollButtonIcon,additionalProps:{fontSize:"small"},ownerState:w}),M=xe({elementType:I,externalSlotProps:f.endScrollButtonIcon,additionalProps:{fontSize:"small"},ownerState:w});return s.jsx($o,{component:"div",className:P(j.root,n),ref:o,role:null,ownerState:w,tabIndex:null,...h,style:{...h.style,...l==="vertical"&&{"--TabScrollButton-svgRotate":`rotate(${y?-90:90}deg)`}},children:p==="left"?s.jsx(B,{...C}):s.jsx(I,{...M})})});function Oo(e){return ne("MuiTabs",e)}const Re=re("MuiTabs",["root","vertical","flexContainer","flexContainerVertical","centered","scroller","fixed","scrollableX","scrollableY","hideScrollbar","scrollButtons","scrollButtonsHideMobile","indicator"]),tt=(e,t)=>e===t?e.firstChild:t&&t.nextElementSibling?t.nextElementSibling:e.firstChild,ot=(e,t)=>e===t?e.lastChild:t&&t.previousElementSibling?t.previousElementSibling:e.lastChild,be=(e,t,o)=>{let r=!1,n=o(e,t);for(;n;){if(n===e.firstChild){if(r)return;r=!0}const a=n.disabled||n.getAttribute("aria-disabled")==="true";if(!n.hasAttribute("tabindex")||a)n=o(e,n);else{n.focus();return}}},No=e=>{const{vertical:t,fixed:o,hideScrollbar:r,scrollableX:n,scrollableY:a,centered:f,scrollButtonsHideMobile:p,classes:l}=e;return _({root:["root",t&&"vertical"],scroller:["scroller",o&&"fixed",r&&"hideScrollbar",n&&"scrollableX",a&&"scrollableY"],flexContainer:["flexContainer",t&&"flexContainerVertical",f&&"centered"],indicator:["indicator"],scrollButtons:["scrollButtons",p&&"scrollButtonsHideMobile"],scrollableX:[n&&"scrollableX"],hideScrollbar:[r&&"hideScrollbar"]},Oo,l)},zo=F("div",{name:"MuiTabs",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:o}=e;return[{[`& .${Re.scrollButtons}`]:t.scrollButtons},{[`& .${Re.scrollButtons}`]:o.scrollButtonsHideMobile&&t.scrollButtonsHideMobile},t.root,o.vertical&&t.vertical]}})(le(({theme:e})=>({overflow:"hidden",minHeight:48,WebkitOverflowScrolling:"touch",display:"flex",variants:[{props:({ownerState:t})=>t.vertical,style:{flexDirection:"column"}},{props:({ownerState:t})=>t.scrollButtonsHideMobile,style:{[`& .${Re.scrollButtons}`]:{[e.breakpoints.down("sm")]:{display:"none"}}}}]}))),Lo=F("div",{name:"MuiTabs",slot:"Scroller",overridesResolver:(e,t)=>{const{ownerState:o}=e;return[t.scroller,o.fixed&&t.fixed,o.hideScrollbar&&t.hideScrollbar,o.scrollableX&&t.scrollableX,o.scrollableY&&t.scrollableY]}})({position:"relative",display:"inline-block",flex:"1 1 auto",whiteSpace:"nowrap",variants:[{props:({ownerState:e})=>e.fixed,style:{overflowX:"hidden",width:"100%"}},{props:({ownerState:e})=>e.hideScrollbar,style:{scrollbarWidth:"none","&::-webkit-scrollbar":{display:"none"}}},{props:({ownerState:e})=>e.scrollableX,style:{overflowX:"auto",overflowY:"hidden"}},{props:({ownerState:e})=>e.scrollableY,style:{overflowY:"auto",overflowX:"hidden"}}]}),Do=F("div",{name:"MuiTabs",slot:"FlexContainer",overridesResolver:(e,t)=>{const{ownerState:o}=e;return[t.flexContainer,o.vertical&&t.flexContainerVertical,o.centered&&t.centered]}})({display:"flex",variants:[{props:({ownerState:e})=>e.vertical,style:{flexDirection:"column"}},{props:({ownerState:e})=>e.centered,style:{justifyContent:"center"}}]}),Wo=F("span",{name:"MuiTabs",slot:"Indicator",overridesResolver:(e,t)=>t.indicator})(le(({theme:e})=>({position:"absolute",height:2,bottom:0,width:"100%",transition:e.transitions.create(),variants:[{props:{indicatorColor:"primary"},style:{backgroundColor:(e.vars||e).palette.primary.main}},{props:{indicatorColor:"secondary"},style:{backgroundColor:(e.vars||e).palette.secondary.main}},{props:({ownerState:t})=>t.vertical,style:{height:"100%",width:2,right:0}}]}))),Go=F(ko)({overflowX:"auto",overflowY:"hidden",scrollbarWidth:"none","&::-webkit-scrollbar":{display:"none"}}),st={},Ao=u.forwardRef(function(t,o){const r=ae({props:t,name:"MuiTabs"}),n=Ft(),a=dt(),{"aria-label":f,"aria-labelledby":p,action:l,centered:i=!1,children:h,className:y,component:w="div",allowScrollButtonsMobile:j=!1,indicatorColor:B="primary",onChange:I,orientation:C="horizontal",ScrollButtonComponent:M=qo,scrollButtons:S="auto",selectionFollowsFocus:k,slots:E={},slotProps:D={},TabIndicatorProps:$={},TabScrollButtonProps:q={},textColor:Q="primary",value:H,variant:N="standard",visibleScrollbar:b=!1,...v}=r,m=N==="scrollable",T=C==="vertical",W=T?"scrollTop":"scrollLeft",G=T?"top":"left",fe=T?"bottom":"right",ye=T?"clientHeight":"clientWidth",ie=T?"height":"width",V={...r,component:w,allowScrollButtonsMobile:j,indicatorColor:B,orientation:C,vertical:T,scrollButtons:S,textColor:Q,variant:N,visibleScrollbar:b,fixed:!m,hideScrollbar:m&&!b,scrollableX:m&&!T,scrollableY:m&&T,centered:i&&!m,scrollButtonsHideMobile:!j},U=No(V),bt=xe({elementType:E.StartScrollButtonIcon,externalSlotProps:D.startScrollButtonIcon,ownerState:V}),xt=xe({elementType:E.EndScrollButtonIcon,externalSlotProps:D.endScrollButtonIcon,ownerState:V}),[Pe,vt]=u.useState(!1),[J,Fe]=u.useState(st),[$e,yt]=u.useState(!1),[qe,gt]=u.useState(!1),[Oe,St]=u.useState(!1),[Ne,Ct]=u.useState({overflow:"hidden",scrollbarWidth:0}),ze=new Map,A=u.useRef(null),X=u.useRef(null),Le=()=>{const c=A.current;let d;if(c){const x=c.getBoundingClientRect();d={clientWidth:c.clientWidth,scrollLeft:c.scrollLeft,scrollTop:c.scrollTop,scrollWidth:c.scrollWidth,top:x.top,bottom:x.bottom,left:x.left,right:x.right}}let g;if(c&&H!==!1){const x=X.current.children;if(x.length>0){const R=x[ze.get(H)];g=R?R.getBoundingClientRect():null}}return{tabsMeta:d,tabMeta:g}},ce=we(()=>{const{tabsMeta:c,tabMeta:d}=Le();let g=0,x;T?(x="top",d&&c&&(g=d.top-c.top+c.scrollTop)):(x=a?"right":"left",d&&c&&(g=(a?-1:1)*(d[x]-c[x]+c.scrollLeft)));const R={[x]:g,[ie]:d?d[ie]:0};if(typeof J[x]!="number"||typeof J[ie]!="number")Fe(R);else{const z=Math.abs(J[x]-R[x]),K=Math.abs(J[ie]-R[ie]);(z>=1||K>=1)&&Fe(R)}}),ge=(c,{animation:d=!0}={})=>{d?To(W,A.current,c,{duration:n.transitions.duration.standard}):A.current[W]=c},De=c=>{let d=A.current[W];T?d+=c:d+=c*(a?-1:1),ge(d)},We=()=>{const c=A.current[ye];let d=0;const g=Array.from(X.current.children);for(let x=0;x<g.length;x+=1){const R=g[x];if(d+R[ye]>c){x===0&&(d=c);break}d+=R[ye]}return d},wt=()=>{De(-1*We())},jt=()=>{De(We())},Rt=u.useCallback(c=>{Ct({overflow:null,scrollbarWidth:c})},[]),Bt=()=>{const c={};c.scrollbarSizeListener=m?s.jsx(Go,{onChange:Rt,className:P(U.scrollableX,U.hideScrollbar)}):null;const g=m&&(S==="auto"&&($e||qe)||S===!0);return c.scrollButtonStart=g?s.jsx(M,{slots:{StartScrollButtonIcon:E.StartScrollButtonIcon},slotProps:{startScrollButtonIcon:bt},orientation:C,direction:a?"right":"left",onClick:wt,disabled:!$e,...q,className:P(U.scrollButtons,q.className)}):null,c.scrollButtonEnd=g?s.jsx(M,{slots:{EndScrollButtonIcon:E.EndScrollButtonIcon},slotProps:{endScrollButtonIcon:xt},orientation:C,direction:a?"left":"right",onClick:jt,disabled:!qe,...q,className:P(U.scrollButtons,q.className)}):null,c},Ge=we(c=>{const{tabsMeta:d,tabMeta:g}=Le();if(!(!g||!d)){if(g[G]<d[G]){const x=d[W]+(g[G]-d[G]);ge(x,{animation:c})}else if(g[fe]>d[fe]){const x=d[W]+(g[fe]-d[fe]);ge(x,{animation:c})}}}),he=we(()=>{m&&S!==!1&&St(!Oe)});u.useEffect(()=>{const c=ct(()=>{A.current&&ce()});let d;const g=z=>{z.forEach(K=>{K.removedNodes.forEach(de=>{d==null||d.unobserve(de)}),K.addedNodes.forEach(de=>{d==null||d.observe(de)})}),c(),he()},x=it(A.current);x.addEventListener("resize",c);let R;return typeof ResizeObserver<"u"&&(d=new ResizeObserver(c),Array.from(X.current.children).forEach(z=>{d.observe(z)})),typeof MutationObserver<"u"&&(R=new MutationObserver(g),R.observe(X.current,{childList:!0})),()=>{c.clear(),x.removeEventListener("resize",c),R==null||R.disconnect(),d==null||d.disconnect()}},[ce,he]),u.useEffect(()=>{const c=Array.from(X.current.children),d=c.length;if(typeof IntersectionObserver<"u"&&d>0&&m&&S!==!1){const g=c[0],x=c[d-1],R={root:A.current,threshold:.99},z=Ce=>{yt(!Ce[0].isIntersecting)},K=new IntersectionObserver(z,R);K.observe(g);const de=Ce=>{gt(!Ce[0].isIntersecting)},He=new IntersectionObserver(de,R);return He.observe(x),()=>{K.disconnect(),He.disconnect()}}},[m,S,Oe,h==null?void 0:h.length]),u.useEffect(()=>{vt(!0)},[]),u.useEffect(()=>{ce()}),u.useEffect(()=>{Ge(st!==J)},[Ge,J]),u.useImperativeHandle(l,()=>({updateIndicator:ce,updateScrollButtons:he}),[ce,he]);const Ae=s.jsx(Wo,{...$,className:P(U.indicator,$.className),ownerState:V,style:{...J,...$.style}});let me=0;const It=u.Children.map(h,c=>{if(!u.isValidElement(c))return null;const d=c.props.value===void 0?me:c.props.value;ze.set(d,me);const g=d===H;return me+=1,u.cloneElement(c,{fullWidth:N==="fullWidth",indicator:g&&!Pe&&Ae,selected:g,selectionFollowsFocus:k,onChange:I,textColor:Q,value:d,...me===1&&H===!1&&!c.props.tabIndex?{tabIndex:0}:{}})}),Tt=c=>{const d=X.current,g=$t(d).activeElement;if(g.getAttribute("role")!=="tab")return;let R=C==="horizontal"?"ArrowLeft":"ArrowUp",z=C==="horizontal"?"ArrowRight":"ArrowDown";switch(C==="horizontal"&&a&&(R="ArrowRight",z="ArrowLeft"),c.key){case R:c.preventDefault(),be(d,g,ot);break;case z:c.preventDefault(),be(d,g,tt);break;case"Home":c.preventDefault(),be(d,null,tt);break;case"End":c.preventDefault(),be(d,null,ot);break}},Se=Bt();return s.jsxs(zo,{className:P(U.root,y),ownerState:V,ref:o,as:w,...v,children:[Se.scrollButtonStart,Se.scrollbarSizeListener,s.jsxs(Lo,{className:U.scroller,ownerState:V,style:{overflow:Ne.overflow,[T?`margin${a?"Left":"Right"}`:"marginBottom"]:b?void 0:-Ne.scrollbarWidth},ref:A,children:[s.jsx(Do,{"aria-label":f,"aria-labelledby":p,"aria-orientation":C==="vertical"?"vertical":null,className:U.flexContainer,ownerState:V,onKeyDown:Tt,ref:X,role:"tablist",children:It}),Pe&&Ae]}),Se.scrollButtonEnd]})}),Ho=()=>{const e=Me();return ke({mutationFn:async t=>await Ee.addCustomRequest(t),mutationKey:["add-custom-request"],onSuccess:()=>{e.invalidateQueries({queryKey:["custom-requests"]})}})},Uo=()=>{const e=Me();return ke({mutationFn:async t=>await Ee.deleteCustomRequest(t),mutationKey:["delete-custom-request"],onSuccess:()=>{e.invalidateQueries({queryKey:["custom-requests"]})}})},Vo=()=>{const e=Me();return ke({mutationFn:async({id:t,newCustomRequestData:o})=>await Ee.updateCustomRequest(t,o),mutationKey:["update-custom-request"],onSuccess:()=>{e.invalidateQueries({queryKey:["custom-requests"]})}})},Jo=e=>e.reduce((t,{key:o,value:r})=>(o.trim()&&(t[o]=r),t),{}),Xo=e=>Object.entries(e).map(([t,o])=>({key:t,value:o}));class Ko{constructor(t){this.method=t.method,this.title=t.title,this.path=t.path,this.params=Jo(t.params),this.json=t.json?JSON.parse(t.json):{},this.data=t.data,this.bodyType=t.bodyType,this.id=t.id}}const Yo=e=>{const t={method:"GET",url:"",params:{},body:null,data:null,headers:{}};let o=e.trim().replace(/^curl\s+/,"");const r=o.match(/'(https?:\/\/[^']+)'/);r&&(t.url=r[1],o=o.replace(r[0],"").trim());const n=t.url.split("?");n.length>1&&(new URLSearchParams(n[1]).forEach((i,h)=>{t.params[h]=i}),t.url=n[0]);const a=o.match(/-X\s+(\w+)/);a&&(t.method=a[1].toUpperCase(),o=o.replace(a[0],"").trim());const f=o.matchAll(/-H\s+'([^:]+):\s*([^']+)'/g);for(const l of f){const[i,h,y]=l;t.headers[h]=y}o=o.replace(/-H\s+'[^']+'/g,"").trim();const p=t.headers["Content-Type"]||t.headers["content-type"];if(p){if(p.includes("application/json")){const l=o.match(/--data-raw\s+'({.*})'/);if(l)try{t.body=JSON.parse(l[1])}catch(i){console.error("Ошибка при парсинге JSON:",i)}}else if(p.includes("application/x-www-form-urlencoded")||p.includes("multipart/form-data")){const l=o.matchAll(/(--data-raw|-d|--form|-F)\s+'([^']+)'/g),i=[];for(const h of l){const[y,w,j]=h;i.push(j)}i.length>0&&(t.data=i.join("&"))}}return t},Be=e=>{try{const t=typeof e=="string"?JSON.parse(e):e;return JSON.stringify(t,null,2)}catch(t){return console.error("Invalid JSON:",t),""}},_o=({param:e,onChange:t,error:o,...r})=>{const[n,a]=u.useState(e),f=l=>{const{name:i,value:h}=l.target;a(y=>({...y,[i]:h}))},p=()=>{t(n)};return s.jsxs(Qt,{...r,children:[s.jsx(Xe,{children:s.jsx(te,{defaultValue:e.key,name:"key",onChange:f,onBlur:p,size:"small",placeholder:"key",fullWidth:!0,variant:"standard",slotProps:{input:{disableUnderline:!0}},error:o})}),s.jsx(Xe,{children:s.jsx(te,{defaultValue:e.value,name:"value",onChange:f,onBlur:p,size:"small",placeholder:"value",fullWidth:!0,variant:"standard",slotProps:{input:{disableUnderline:!0}},error:o})})]})},Qo=({title:e,onChange:t})=>{const[o,r]=u.useState(!1),[n,a]=u.useState(e),f=()=>{r(!1);const i=n.trim();if(!i){p();return}a(i),t(i)},p=()=>{r(!1),a(e),t(e)},l=i=>{i.key==="Enter"&&f(),i.key==="Escape"&&p()};return u.useEffect(()=>{a(e)},[e]),o?s.jsx(te,{value:n,onChange:i=>a(i.target.value),onBlur:f,onKeyDown:l,autoFocus:!0,fullWidth:!0,size:"small",variant:"standard",slotProps:{input:{disableUnderline:!0}},sx:{"& .MuiInputBase-input":{fontSize:"1.44rem",fontWeight:400,padding:0}}}):s.jsx(ut,{sx:{width:"100%",cursor:"pointer",whiteSpace:"nowrap",overflow:"hidden"},children:s.jsx(Y,{sx:{whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",flexGrow:1},variant:"H5",onClick:()=>r(!0),children:e})})},Zo=u.forwardRef(({value:e,onChange:t,...o},r)=>s.jsxs(qt,{ref:r,value:e,onChange:t,sx:{minWidth:100},variant:"standard",disableUnderline:!0,...o,children:[s.jsx(pe,{value:"GET",children:"GET"}),s.jsx(pe,{value:"POST",children:"POST"}),s.jsx(pe,{value:"PATCH",children:"PATCH"}),s.jsx(pe,{value:"DELETE",children:"DELETE"})]})),rt={method:"GET",path:"",json:"{}",data:"",params:[{key:"",value:""}],bodyType:"JSON",title:"New request",id:At()},es=({...e})=>{const t=se.use.request(),o=se.use.setRequest(),{control:r,handleSubmit:n,formState:{errors:a,isValid:f,isDirty:p},setValue:l,trigger:i,reset:h,resetField:y,watch:w}=Ot({defaultValues:t||rt,mode:"onChange"});u.useEffect(()=>(h(t?{...t,json:Be(t.json),params:[...Xo(t.params),{key:"",value:""}]}:rt),()=>h()),[t,h]);const j=Ho(),B=Vo(),I=b=>{const v=new Ko({...b,params:b.params.filter(m=>m.key&&m.value)});t?B.mutate({id:v.id,newCustomRequestData:v}):j.mutate(v),o(v)},C=(b,v)=>{const m=b===M.length-1,{id:T,...W}=v,G=oo(W);m&&!G&&S({key:"",value:""}),!m&&G&&k(b),l(`params.${b}`,v),i(`params.${b}`)},{fields:M,append:S,remove:k}=Nt({control:r,name:"params"}),[E,D]=u.useState(0),$=(b,v)=>{D(v)},q=w("bodyType"),Q=u.useCallback(b=>{if(q==="JSON"&&b.trim())try{return JSON.parse(b),!0}catch{return"Invalid JSON format"}return!0},[q]),H=async b=>{const v=b.target.value;try{const m=JSON.parse(v.trim()),T=Be(m);l("json",T),await i("json")}catch{l("json",v.trim()),await i("json")}},N=b=>{b.preventDefault();const v=b.clipboardData.getData("text");try{const m=Yo(v);if(!m.url){l("path",v);return}l("method",m.method||"GET"),i("method"),l("path",m.url),i("path");const T=Object.entries(m.params).map(([W,G])=>({key:W,value:G}));k(),T.length>0&&S([...T]),S([{key:"",value:""}]),y("body"),y("data"),y("bodyType"),m.body&&(l("bodyType","JSON"),l("json",Be(m.body))),m.data&&(l("bodyType","x-www-form-urlencoded"),l("data",m.data),i("bodyType"))}catch(m){console.error("Failed to parse curl command:",m)}};return s.jsxs(L,{...e,gap:2,component:"form",onSubmit:n(I),justifyContent:"space-between",children:[s.jsxs(L,{gap:2,children:[s.jsx(Z,{name:"title",control:r,render:({field:b})=>s.jsx(Qo,{title:b.value,onChange:b.onChange})}),s.jsx(L,{direction:"row",gap:2,paddingTop:2,children:s.jsx(Z,{name:"path",control:r,rules:{required:"Path is required"},render:({field:b})=>{var v;return s.jsx(te,{...b,label:"Request",fullWidth:!0,onPaste:N,sx:{height:"100%"},slotProps:{input:{startAdornment:s.jsx(Xt,{position:"start",children:s.jsx(Z,{name:"method",control:r,rules:{required:"Method is required"},render:({field:m})=>s.jsx(Zo,{...m})})}),placeholder:"https://your-request.com"}},error:!!a.path,helperText:(v=a.path)==null?void 0:v.message})}})}),s.jsxs(Ao,{value:E,onChange:$,"aria-label":"basic tabs example",children:[s.jsx(et,{label:"Query"}),s.jsx(et,{label:"Body"})]}),E===0&&s.jsx(Zt,{sx:{flexGrow:1,paddingBlock:1,scrollbarWidth:"thin"},children:s.jsx(eo,{children:s.jsx(to,{children:M.map((b,v)=>{var m;return s.jsx(_o,{param:b,onChange:T=>C(v,T),error:!!((m=a.params)!=null&&m[v])},b.id)})})})}),E===1&&s.jsxs(s.Fragment,{children:[s.jsx(Z,{name:"bodyType",control:r,rules:{required:"Body type is required"},render:({field:b})=>s.jsxs(wo,{row:!0,...b,children:[s.jsx(Ke,{value:"JSON",control:s.jsx(Ze,{}),label:"JSON"}),s.jsx(Ke,{value:"x-www-form-urlencoded",control:s.jsx(Ze,{}),label:"x-www-form-urlencoded"})]})}),q==="JSON"&&s.jsx(Z,{name:"json",control:r,rules:{validate:Q},render:({field:b})=>{var v;return s.jsx(te,{...b,label:"Valid json",multiline:!0,rows:8,error:!!a.json,helperText:(v=a.json)==null?void 0:v.message,onBlur:H})}}),q==="x-www-form-urlencoded"&&s.jsx(Z,{name:"data",control:r,render:({field:b})=>{var v;return s.jsx(te,{...b,label:"Data",multiline:!0,rows:8,error:!!a.data,helperText:(v=a.data)==null?void 0:v.message})}})]})]}),s.jsx(ut,{textAlign:"end",children:s.jsx(zt,{type:"submit",variant:"contained",sx:{minWidth:"100px"},disabled:!f||!p,loading:j.isPending||B.isPending,children:t?"Update":"Save"})})]})},ts=ve(s.jsx("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m4 11h-3v3c0 .55-.45 1-1 1s-1-.45-1-1v-3H8c-.55 0-1-.45-1-1s.45-1 1-1h3V8c0-.55.45-1 1-1s1 .45 1 1v3h3c.55 0 1 .45 1 1s-.45 1-1 1"}),"AddCircleRounded"),os=()=>{const e=se.use.unsetRequest(),t=se.use.request();return s.jsx(pt,{disablePadding:!0,children:s.jsx(ft,{disabled:!t,onClick:()=>{e()},children:s.jsx(L,{width:"100%",gap:1,direction:"row",alignItems:"center",justifyContent:"center",children:s.jsx(ts,{})})})})},ss=ve(s.jsx("path",{d:"M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2zM18 4h-2.5l-.71-.71c-.18-.18-.44-.29-.7-.29H9.91c-.26 0-.52.11-.7.29L8.5 4H6c-.55 0-1 .45-1 1s.45 1 1 1h12c.55 0 1-.45 1-1s-.45-1-1-1"}),"DeleteRounded"),rs=({request:e})=>{const t=se.use.setRequest(),o=se.use.unsetRequest(),r=Uo(),[n,a]=u.useState(null),f=i=>{i.preventDefault(),a(n===null?{mouseX:i.clientX+2,mouseY:i.clientY-6}:null)},p=()=>{a(null)},l=()=>{r.mutate(e.id),o(),p()};return s.jsxs(s.Fragment,{children:[s.jsx(pt,{disablePadding:!0,onContextMenu:f,children:s.jsx(Lt,{title:e.path,disableInteractive:!0,children:s.jsx(ft,{onClick:()=>{t(e)},children:s.jsxs(L,{gap:1,direction:"row",alignItems:"center",sx:{width:"100%",whiteSpace:"nowrap",overflow:"hidden"},children:[s.jsx(Y,{variant:"caption",color:"textSecondary",minWidth:"50px",children:e.method}),s.jsx(Y,{sx:{whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",flexGrow:1},children:e.title})]})})})}),s.jsx(Dt,{open:n!==null,onClose:p,anchorReference:"anchorPosition",anchorPosition:n!==null?{top:n.mouseY,left:n.mouseX}:void 0,children:s.jsxs(pe,{onClick:l,children:[s.jsx(Kt,{children:s.jsx(ss,{fontSize:"small"})}),s.jsx(Yt,{children:"Delete"})]})})]})},ns=({...e})=>{const{data:t,isError:o,isLoading:r}=_t();return r?s.jsx(L,{gap:2,justifyContent:"center",alignItems:"center",sx:{height:"100%"},...e,children:s.jsx(Wt,{})}):o?s.jsx(L,{gap:2,justifyContent:"center",alignItems:"center",sx:{height:"100%"},...e,children:s.jsx(Y,{variant:"H5",color:"error",children:"Error"})}):s.jsxs(L,{gap:2,...e,children:[s.jsx(Y,{variant:"H5",children:"Your requests"}),!t.length&&s.jsx(Y,{textAlign:"center",variant:"Body",color:"textSecondary",children:"Empty for now"}),t.length?s.jsx(os,{}):null,s.jsx(Gt,{children:t.map((n,a)=>s.jsx(rs,{request:n},a))})]})},ds=()=>s.jsxs(L,{gap:4,flexGrow:1,maxWidth:"100%",children:[s.jsx(Y,{variant:"H3",children:"Requests"}),s.jsxs(je,{container:!0,spacing:2,sx:{flexGrow:1},children:[s.jsx(je,{size:3,children:s.jsx(Je,{sx:{height:"100%",padding:2},children:s.jsx(ns,{})})}),s.jsx(je,{size:"grow",children:s.jsx(Je,{sx:{height:"100%"},children:s.jsx(L,{sx:{height:"100%"},gap:2,padding:2,children:s.jsx(es,{flexGrow:1})})})})]})]});export{ds as default};
