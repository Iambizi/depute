import{j as n}from"./jsx-runtime-u17CrQMm.js";import{r as p}from"./iframe-DLl0a6ph.js";import{V as x}from"./a11y-CKuWmtce.js";import"./preload-helper-PPVm8Dsz.js";const T="_rollbackTimeline_16ljt_4",B="_header_16ljt_12",R="_title_16ljt_21",y="_countBadge_16ljt_28",N="_timeline_16ljt_42",S="_point_16ljt_46",A="_connector_16ljt_58",I="_connectorPast_16ljt_66",$="_connectorFuture_16ljt_70",D="_dot_16ljt_75",P="_pointCurrent_16ljt_89",W="_pointAvailable_16ljt_95",H="_pointRolledBack_16ljt_99",q="_pointIrreversible_16ljt_104",E="_pointContent_16ljt_110",F="_pointHeader_16ljt_115",L="_pointLabel_16ljt_122",U="_pointTimestamp_16ljt_128",w="_pointDescription_16ljt_135",V="_irreversibleTag_16ljt_141",O="_rollbackBtn_16ljt_163",M="_dependentCount_16ljt_189",z="_confirmBar_16ljt_195",G="_confirmText_16ljt_206",J="_confirmBtn_16ljt_212",K="_cancelBtn_16ljt_229",t={rollbackTimeline:T,header:B,title:R,countBadge:y,timeline:N,point:S,connector:A,connectorPast:I,connectorFuture:$,dot:D,pointCurrent:P,pointAvailable:W,pointRolledBack:H,pointIrreversible:q,pointContent:E,pointHeader:F,pointLabel:L,pointTimestamp:U,pointDescription:w,irreversibleTag:V,rollbackBtn:O,dependentCount:M,confirmBar:z,confirmText:G,confirmBtn:J,cancelBtn:K},_={available:t.pointAvailable,current:t.pointCurrent,"rolled-back":t.pointRolledBack,irreversible:t.pointIrreversible},Q={available:"Available",current:"Current","rolled-back":"Rolled back",irreversible:"Irreversible"};function v({title:r,points:l,onRollback:d,requireConfirmation:f=!0,className:h}){const[m,o]=p.useState(null),k=p.useMemo(()=>l.findIndex(e=>e.status==="current"),[l]),u=e=>{if(!(!e.reversible||e.status==="current"||e.status==="rolled-back")){if(f&&m!==e.id){o(e.id);return}o(null),d?.(e.id)}},j=()=>{o(null)},g=l.filter(e=>e.reversible&&e.status==="available").length;return n.jsxs("div",{className:`${t.rollbackTimeline} ${h??""}`,role:"region","aria-label":`${r}: ${l.length} actions, ${g} reversible`,children:[n.jsxs("div",{className:t.header,children:[n.jsx("h3",{className:t.title,children:r}),n.jsxs("span",{className:t.countBadge,children:[l.length," action",l.length!==1?"s":""]})]}),n.jsx("div",{className:t.timeline,role:"list","aria-label":"Rollback points",children:l.map((e,c)=>{const b=m===e.id,C=e.reversible&&e.status==="available"&&d;return n.jsxs("div",{className:`${t.point} ${_[e.status]}`,role:"listitem",children:[c<l.length-1&&n.jsx("span",{className:`${t.connector} ${c<k?t.connectorPast:t.connectorFuture}`,"aria-hidden":"true"}),n.jsx("span",{className:`${t.dot} ${_[e.status]}`,"aria-hidden":"true",children:e.status==="irreversible"?"🔒":e.status==="current"?"●":"○"}),n.jsxs("div",{className:t.pointContent,children:[n.jsxs("div",{className:t.pointHeader,children:[n.jsx("span",{className:t.pointLabel,children:e.label}),n.jsx("span",{className:t.pointTimestamp,children:e.timestamp})]}),e.description&&n.jsx("p",{className:t.pointDescription,children:e.description}),!e.reversible&&e.status!=="current"&&n.jsx("span",{className:t.irreversibleTag,children:"Irreversible"}),C&&!b&&n.jsxs("button",{type:"button",className:t.rollbackBtn,onClick:()=>u(e),"aria-label":`Rollback to: ${e.label}`,children:["↩ Rollback to here",e.dependentCount!=null&&e.dependentCount>0&&n.jsxs("span",{className:t.dependentCount,children:["(",e.dependentCount," dependent action",e.dependentCount!==1?"s":"",")"]})]}),b&&n.jsxs("div",{className:t.confirmBar,role:"alert",children:[n.jsx("span",{className:t.confirmText,children:"Undo all actions after this point?"}),n.jsx("button",{type:"button",className:t.confirmBtn,onClick:()=>u(e),"aria-label":"Confirm rollback",children:"Confirm"}),n.jsx("button",{type:"button",className:t.cancelBtn,onClick:j,"aria-label":"Cancel rollback",children:"Cancel"})]})]}),n.jsx(x,{children:`Step ${c+1}: ${e.label}. Status: ${Q[e.status]}. ${e.reversible?"Reversible.":"Irreversible."}`})]},e.id)})})]})}v.__docgenInfo={description:"",methods:[],displayName:"RollbackTimeline",props:{title:{required:!0,tsType:{name:"string"},description:'Title (e.g. "Action Timeline", "Undo History")'},points:{required:!0,tsType:{name:"Array",elements:[{name:"RollbackPoint"}],raw:"RollbackPoint[]"},description:"Ordered list of rollback points (oldest first)"},onRollback:{required:!1,tsType:{name:"signature",type:"function",raw:"(pointId: string) => void",signature:{arguments:[{type:{name:"string"},name:"pointId"}],return:{name:"void"}}},description:"Called when user requests rollback to a specific point"},requireConfirmation:{required:!1,tsType:{name:"boolean"},description:"Whether to confirm before rollback (default: true)",defaultValue:{value:"true",computed:!1}},className:{required:!1,tsType:{name:"string"},description:"Additional CSS class"}}};const te={title:"v2 — Compliance & Forensics/RollbackTimeline",component:v,parameters:{layout:"padded"},tags:["autodocs"]},a={args:{title:"Action History",onRollback:r=>alert(`Rolling back to point ${r}`),points:[{id:"1",label:"Fetched user data",status:"available",timestamp:"12:00:01",reversible:!0},{id:"2",label:"Updated email address",status:"available",timestamp:"12:00:05",reversible:!0,dependentCount:2},{id:"3",label:"Sent confirmation email",status:"current",timestamp:"12:00:10",reversible:!0}]}},s={name:"With Irreversible Action",args:{title:"Deployment Pipeline",points:[{id:"1",label:"Built Docker image",status:"available",timestamp:"14:00:00",reversible:!0},{id:"2",label:"Pushed to registry",status:"available",timestamp:"14:01:30",reversible:!0},{id:"3",label:"Deployed to production",status:"current",timestamp:"14:02:45",reversible:!1},{id:"4",label:"DNS cutover",status:"available",timestamp:"14:03:00",reversible:!1}]}},i={name:"After Rollback",args:{title:"Email Workflow",points:[{id:"1",label:"Drafted email",status:"current",timestamp:"09:00:00",reversible:!0},{id:"2",label:"Added attachments",status:"rolled-back",timestamp:"09:01:00",reversible:!0},{id:"3",label:"Sent to distribution list",status:"rolled-back",timestamp:"09:02:00",reversible:!0}]}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Action History',
    onRollback: id => alert(\`Rolling back to point \${id}\`),
    points: [{
      id: '1',
      label: 'Fetched user data',
      status: 'available',
      timestamp: '12:00:01',
      reversible: true
    }, {
      id: '2',
      label: 'Updated email address',
      status: 'available',
      timestamp: '12:00:05',
      reversible: true,
      dependentCount: 2
    }, {
      id: '3',
      label: 'Sent confirmation email',
      status: 'current',
      timestamp: '12:00:10',
      reversible: true
    }]
  }
}`,...a.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  name: 'With Irreversible Action',
  args: {
    title: 'Deployment Pipeline',
    points: [{
      id: '1',
      label: 'Built Docker image',
      status: 'available',
      timestamp: '14:00:00',
      reversible: true
    }, {
      id: '2',
      label: 'Pushed to registry',
      status: 'available',
      timestamp: '14:01:30',
      reversible: true
    }, {
      id: '3',
      label: 'Deployed to production',
      status: 'current',
      timestamp: '14:02:45',
      reversible: false
    }, {
      id: '4',
      label: 'DNS cutover',
      status: 'available',
      timestamp: '14:03:00',
      reversible: false
    }]
  }
}`,...s.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  name: 'After Rollback',
  args: {
    title: 'Email Workflow',
    points: [{
      id: '1',
      label: 'Drafted email',
      status: 'current',
      timestamp: '09:00:00',
      reversible: true
    }, {
      id: '2',
      label: 'Added attachments',
      status: 'rolled-back',
      timestamp: '09:01:00',
      reversible: true
    }, {
      id: '3',
      label: 'Sent to distribution list',
      status: 'rolled-back',
      timestamp: '09:02:00',
      reversible: true
    }]
  }
}`,...i.parameters?.docs?.source}}};const ne=["Default","WithIrreversible","WithRolledBack"];export{a as Default,s as WithIrreversible,i as WithRolledBack,ne as __namedExportsOrder,te as default};
