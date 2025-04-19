var rt=e=>{throw TypeError(e)};var st=(e,t,s)=>t.has(e)||rt("Cannot "+s);var i=(e,t,s)=>(st(e,t,"read from private field"),s?s.call(e):t.get(e)),G=(e,t,s)=>t.has(e)?rt("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,s),z=(e,t,s,o)=>(st(e,t,"write to private field"),o?o.call(e,s):t.set(e,s),s),D=(e,t,s)=>(st(e,t,"access private method"),s);import{m as _,l as J,s as T,D as yt,a4 as ft,r as c,z as gt,aH as bt,j as h,t as q,K as xt,v as Q,o as tt,aN as K,n as pt,aP as It,q as vt,aQ as at,aR as Ct,aS as Y,aT as lt,C as ct,T as X,aU as St,aV as Lt,aW as Rt,aX as dt,aY as wt,aZ as mt,f as Pt,a_ as Mt,a$ as kt}from"./index-CZrG0g6s.js";function Bt(e){return _("PrivateSwitchBase",e)}J("PrivateSwitchBase",["root","checked","disabled","input","edgeStart","edgeEnd"]);const At=e=>{const{classes:t,checked:s,disabled:o,edge:n}=e,a={root:["root",s&&"checked",o&&"disabled",n&&`edge${xt(n)}`],input:["input"]};return Q(a,Bt,t)},Tt=T(yt)({padding:9,borderRadius:"50%",variants:[{props:{edge:"start",size:"small"},style:{marginLeft:-3}},{props:({edge:e,ownerState:t})=>e==="start"&&t.size!=="small",style:{marginLeft:-12}},{props:{edge:"end",size:"small"},style:{marginRight:-3}},{props:({edge:e,ownerState:t})=>e==="end"&&t.size!=="small",style:{marginRight:-12}}]}),Ft=T("input",{shouldForwardProp:ft})({cursor:"inherit",position:"absolute",opacity:0,width:"100%",height:"100%",top:0,left:0,margin:0,padding:0,zIndex:1}),Xt=c.forwardRef(function(t,s){const{autoFocus:o,checked:n,checkedIcon:a,className:r,defaultChecked:l,disabled:d,disableFocusRipple:v=!1,edge:p=!1,icon:x,id:W,inputProps:F,inputRef:k,name:N,onBlur:f,onChange:y,onFocus:C,readOnly:B,required:j=!1,tabIndex:U,type:m,value:$,...I}=t,[H,O]=gt({controlled:n,default:!!l,name:"SwitchBase",state:"checked"}),g=bt(),V=S=>{C&&C(S),g&&g.onFocus&&g.onFocus(S)},E=S=>{f&&f(S),g&&g.onBlur&&g.onBlur(S)},A=S=>{if(S.nativeEvent.defaultPrevented)return;const it=S.target.checked;O(it),y&&y(S,it)};let b=d;g&&typeof b>"u"&&(b=g.disabled);const w=m==="checkbox"||m==="radio",et={...t,checked:H,disabled:b,disableFocusRipple:v,edge:p},nt=At(et);return h.jsxs(Tt,{component:"span",className:q(nt.root,r),centerRipple:!0,focusRipple:!v,disabled:b,tabIndex:null,role:void 0,onFocus:V,onBlur:E,ownerState:et,ref:s,...I,children:[h.jsx(Ft,{autoFocus:o,checked:n,defaultChecked:l,className:nt.input,disabled:b,id:w?W:void 0,name:N,onChange:A,readOnly:B,ref:k,required:j,ownerState:et,tabIndex:U,type:m,...m==="checkbox"&&$===void 0?{}:{value:$},...F}),H?a:x]})});function Nt(e){return _("MuiListItem",e)}J("MuiListItem",["root","container","dense","alignItemsFlexStart","divider","gutters","padding","secondaryAction"]);function Zt(e){return _("MuiListItemButton",e)}const jt=J("MuiListItemButton",["root","focusVisible","dense","alignItemsFlexStart","disabled","divider","gutters","selected"]);function Ut(e){return _("MuiListItemSecondaryAction",e)}J("MuiListItemSecondaryAction",["root","disableGutters"]);const $t=e=>{const{disableGutters:t,classes:s}=e;return Q({root:["root",t&&"disableGutters"]},Ut,s)},Ot=T("div",{name:"MuiListItemSecondaryAction",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:s}=e;return[t.root,s.disableGutters&&t.disableGutters]}})({position:"absolute",right:16,top:"50%",transform:"translateY(-50%)",variants:[{props:({ownerState:e})=>e.disableGutters,style:{right:0}}]}),ht=c.forwardRef(function(t,s){const o=tt({props:t,name:"MuiListItemSecondaryAction"}),{className:n,...a}=o,r=c.useContext(K),l={...o,disableGutters:r.disableGutters},d=$t(l);return h.jsx(Ot,{className:q(d.root,n),ownerState:l,ref:s,...a})});ht.muiName="ListItemSecondaryAction";const Et=(e,t)=>{const{ownerState:s}=e;return[t.root,s.dense&&t.dense,s.alignItems==="flex-start"&&t.alignItemsFlexStart,s.divider&&t.divider,!s.disableGutters&&t.gutters,!s.disablePadding&&t.padding,s.hasSecondaryAction&&t.secondaryAction]},Gt=e=>{const{alignItems:t,classes:s,dense:o,disableGutters:n,disablePadding:a,divider:r,hasSecondaryAction:l}=e;return Q({root:["root",o&&"dense",!n&&"gutters",!a&&"padding",r&&"divider",t==="flex-start"&&"alignItemsFlexStart",l&&"secondaryAction"],container:["container"]},Nt,s)},zt=T("div",{name:"MuiListItem",slot:"Root",overridesResolver:Et})(pt(({theme:e})=>({display:"flex",justifyContent:"flex-start",alignItems:"center",position:"relative",textDecoration:"none",width:"100%",boxSizing:"border-box",textAlign:"left",variants:[{props:({ownerState:t})=>!t.disablePadding,style:{paddingTop:8,paddingBottom:8}},{props:({ownerState:t})=>!t.disablePadding&&t.dense,style:{paddingTop:4,paddingBottom:4}},{props:({ownerState:t})=>!t.disablePadding&&!t.disableGutters,style:{paddingLeft:16,paddingRight:16}},{props:({ownerState:t})=>!t.disablePadding&&!!t.secondaryAction,style:{paddingRight:48}},{props:({ownerState:t})=>!!t.secondaryAction,style:{[`& > .${jt.root}`]:{paddingRight:48}}},{props:{alignItems:"flex-start"},style:{alignItems:"flex-start"}},{props:({ownerState:t})=>t.divider,style:{borderBottom:`1px solid ${(e.vars||e).palette.divider}`,backgroundClip:"padding-box"}},{props:({ownerState:t})=>t.button,style:{transition:e.transitions.create("background-color",{duration:e.transitions.duration.shortest}),"&:hover":{textDecoration:"none",backgroundColor:(e.vars||e).palette.action.hover,"@media (hover: none)":{backgroundColor:"transparent"}}}},{props:({ownerState:t})=>t.hasSecondaryAction,style:{paddingRight:48}}]}))),Dt=T("li",{name:"MuiListItem",slot:"Container",overridesResolver:(e,t)=>t.container})({position:"relative"}),_t=c.forwardRef(function(t,s){const o=tt({props:t,name:"MuiListItem"}),{alignItems:n="center",children:a,className:r,component:l,components:d={},componentsProps:v={},ContainerComponent:p="li",ContainerProps:{className:x,...W}={},dense:F=!1,disableGutters:k=!1,disablePadding:N=!1,divider:f=!1,secondaryAction:y,slotProps:C={},slots:B={},...j}=o,U=c.useContext(K),m=c.useMemo(()=>({dense:F||U.dense||!1,alignItems:n,disableGutters:k}),[n,U.dense,F,k]),$=c.useRef(null),I=c.Children.toArray(a),H=I.length&&It(I[I.length-1],["ListItemSecondaryAction"]),O={...o,alignItems:n,dense:m.dense,disableGutters:k,disablePadding:N,divider:f,hasSecondaryAction:H},g=Gt(O),V=vt($,s),E=B.root||d.Root||zt,A=C.root||v.root||{},b={className:q(g.root,A.className,r),...j};let w=l||"li";return H?(w=!b.component&&!l?"div":w,p==="li"&&(w==="li"?w="div":b.component==="li"&&(b.component="div")),h.jsx(K.Provider,{value:m,children:h.jsxs(Dt,{as:p,className:q(g.container,x),ref:V,ownerState:O,...W,children:[h.jsx(E,{...A,...!at(E)&&{as:w,ownerState:{...O,...A.ownerState}},...b,children:I}),I.pop()]})})):h.jsx(K.Provider,{value:m,children:h.jsxs(E,{...A,as:w,ref:V,...!at(E)&&{ownerState:{...O,...A.ownerState}},...b,children:[I,y&&h.jsx(ht,{children:y})]})})}),Kt=e=>{const{alignItems:t,classes:s}=e;return Q({root:["root",t==="flex-start"&&"alignItemsFlexStart"]},Ct,s)},qt=T("div",{name:"MuiListItemIcon",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:s}=e;return[t.root,s.alignItems==="flex-start"&&t.alignItemsFlexStart]}})(pt(({theme:e})=>({minWidth:56,color:(e.vars||e).palette.action.active,flexShrink:0,display:"inline-flex",variants:[{props:{alignItems:"flex-start"},style:{marginTop:8}}]}))),Jt=c.forwardRef(function(t,s){const o=tt({props:t,name:"MuiListItemIcon"}),{className:n,...a}=o,r=c.useContext(K),l={...o,alignItems:r.alignItems},d=Kt(l);return h.jsx(qt,{className:q(d.root,n),ownerState:l,ref:s,...a})}),Wt=e=>{const{classes:t,inset:s,primary:o,secondary:n,dense:a}=e;return Q({root:["root",s&&"inset",a&&"dense",o&&n&&"multiline"],primary:["primary"],secondary:["secondary"]},St,t)},Ht=T("div",{name:"MuiListItemText",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:s}=e;return[{[`& .${Y.primary}`]:t.primary},{[`& .${Y.secondary}`]:t.secondary},t.root,s.inset&&t.inset,s.primary&&s.secondary&&t.multiline,s.dense&&t.dense]}})({flex:"1 1 auto",minWidth:0,marginTop:4,marginBottom:4,[`.${lt.root}:where(& .${Y.primary})`]:{display:"block"},[`.${lt.root}:where(& .${Y.secondary})`]:{display:"block"},variants:[{props:({ownerState:e})=>e.primary&&e.secondary,style:{marginTop:6,marginBottom:6}},{props:({ownerState:e})=>e.inset,style:{paddingLeft:56}}]}),te=c.forwardRef(function(t,s){const o=tt({props:t,name:"MuiListItemText"}),{children:n,className:a,disableTypography:r=!1,inset:l=!1,primary:d,primaryTypographyProps:v,secondary:p,secondaryTypographyProps:x,slots:W={},slotProps:F={},...k}=o,{dense:N}=c.useContext(K);let f=d??n,y=p;const C={...o,disableTypography:r,inset:l,primary:!!f,secondary:!!y,dense:N},B=Wt(C),j={slots:W,slotProps:{primary:v,secondary:x,...F}},[U,m]=ct("primary",{className:B.primary,elementType:X,externalForwardedProps:j,ownerState:C}),[$,I]=ct("secondary",{className:B.secondary,elementType:X,externalForwardedProps:j,ownerState:C});return f!=null&&f.type!==X&&!r&&(f=h.jsx(U,{variant:N?"body2":"body1",component:m!=null&&m.variant?void 0:"span",...m,children:f})),y!=null&&y.type!==X&&!r&&(y=h.jsx($,{variant:"body2",color:"textSecondary",...I,children:y})),h.jsxs(Ht,{className:q(B.root,a),ownerState:C,ref:s,...k,children:[f,y]})});var P,M,u,L,R,Z,ot,ut,Qt=(ut=class extends Lt{constructor(t,s){super();G(this,R);G(this,P);G(this,M);G(this,u);G(this,L);z(this,P,t),this.setOptions(s),this.bindMethods(),D(this,R,Z).call(this)}bindMethods(){this.mutate=this.mutate.bind(this),this.reset=this.reset.bind(this)}setOptions(t){var o;const s=this.options;this.options=i(this,P).defaultMutationOptions(t),Rt(this.options,s)||i(this,P).getMutationCache().notify({type:"observerOptionsUpdated",mutation:i(this,u),observer:this}),s!=null&&s.mutationKey&&this.options.mutationKey&&dt(s.mutationKey)!==dt(this.options.mutationKey)?this.reset():((o=i(this,u))==null?void 0:o.state.status)==="pending"&&i(this,u).setOptions(this.options)}onUnsubscribe(){var t;this.hasListeners()||(t=i(this,u))==null||t.removeObserver(this)}onMutationUpdate(t){D(this,R,Z).call(this),D(this,R,ot).call(this,t)}getCurrentResult(){return i(this,M)}reset(){var t;(t=i(this,u))==null||t.removeObserver(this),z(this,u,void 0),D(this,R,Z).call(this),D(this,R,ot).call(this)}mutate(t,s){var o;return z(this,L,s),(o=i(this,u))==null||o.removeObserver(this),z(this,u,i(this,P).getMutationCache().build(i(this,P),this.options)),i(this,u).addObserver(this),i(this,u).execute(t)}},P=new WeakMap,M=new WeakMap,u=new WeakMap,L=new WeakMap,R=new WeakSet,Z=function(){var s;const t=((s=i(this,u))==null?void 0:s.state)??wt();z(this,M,{...t,isPending:t.status==="pending",isSuccess:t.status==="success",isError:t.status==="error",isIdle:t.status==="idle",mutate:this.mutate,reset:this.reset})},ot=function(t){mt.batch(()=>{var s,o,n,a,r,l,d,v;if(i(this,L)&&this.hasListeners()){const p=i(this,M).variables,x=i(this,M).context;(t==null?void 0:t.type)==="success"?((o=(s=i(this,L)).onSuccess)==null||o.call(s,t.data,p,x),(a=(n=i(this,L)).onSettled)==null||a.call(n,t.data,null,p,x)):(t==null?void 0:t.type)==="error"&&((l=(r=i(this,L)).onError)==null||l.call(r,t.error,p,x),(v=(d=i(this,L)).onSettled)==null||v.call(d,void 0,t.error,p,x))}this.listeners.forEach(p=>{p(i(this,M))})})},ut);function ee(e,t){const s=Pt(),[o]=c.useState(()=>new Qt(s,e));c.useEffect(()=>{o.setOptions(e)},[o,e]);const n=c.useSyncExternalStore(c.useCallback(r=>o.subscribe(mt.batchCalls(r)),[o]),()=>o.getCurrentResult(),()=>o.getCurrentResult()),a=c.useCallback((r,l)=>{o.mutate(r,l).catch(Mt)},[o]);if(n.error&&kt(o.options.throwOnError,[n.error]))throw n.error;return{...n,mutate:a,mutateAsync:n.mutate}}const se=()=>`${Date.now()}-${Math.floor(Math.random()*1e5)}`;export{_t as L,Xt as S,ee as a,Jt as b,te as c,Zt as g,jt as l,se as u};
