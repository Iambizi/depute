import{j as e}from"./jsx-runtime-u17CrQMm.js";import{r}from"./iframe-C-UiW1EA.js";import{g as Z}from"./common-DpQzTmW8.js";import{u as ee,a as te,V as ne}from"./a11y-CrbinD0p.js";import{a as g,M as E}from"./mockData-DOQp8R7v.js";import"./preload-helper-PPVm8Dsz.js";const ae="_approvalGate_1dvzb_12",se="_approvalGateApproved_1dvzb_24",re="_approvalGateRejected_1dvzb_28",oe="_approvalGateExpired_1dvzb_32",ie="_header_1dvzb_41",de="_statusIcon_1dvzb_49",ce="_statusIconPending_1dvzb_60",pe="_statusIconApproved_1dvzb_66",le="_statusIconRejected_1dvzb_71",ue="_statusIconExpired_1dvzb_76",me="_headerContent_1dvzb_81",ge="_title_1dvzb_86",ve="_statusLabel_1dvzb_94",fe="_body_1dvzb_106",_e="_description_1dvzb_110",he="_reasoning_1dvzb_117",xe="_reasoningLabel_1dvzb_127",be="_confidenceBadge_1dvzb_138",Se="_confidenceHigh_1dvzb_149",je="_confidenceMedium_1dvzb_154",ye="_confidenceLow_1dvzb_159",Ae="_scope_1dvzb_168",Re="_scopeTitle_1dvzb_175",we="_scopeItems_1dvzb_182",ke="_scopeBadge_1dvzb_188",Ie="_metadata_1dvzb_204",Ce="_metadataTable_1dvzb_208",Te="_countdown_1dvzb_241",ze="_countdownNormal_1dvzb_251",Ne="_countdownWarning_1dvzb_256",$e="_countdownUrgent_1dvzb_261",Ee="_stageIndicator_1dvzb_271",Le="_stage_1dvzb_271",Pe="_stageActive_1dvzb_287",Me="_stageCompleted_1dvzb_292",qe="_stageSeparator_1dvzb_296",Ge="_actions_1dvzb_304",Be="_btn_1dvzb_312",Oe="_btnApprove_1dvzb_332",De="_btnReject_1dvzb_342",Ue="_btnSecondary_1dvzb_352",We="_actionsSpacerRight_1dvzb_363",Ve="_resolvedBanner_1dvzb_371",He="_resolvedApproved_1dvzb_380",Fe="_resolvedRejected_1dvzb_385",Ke="_resolvedExpired_1dvzb_390",t={approvalGate:ae,approvalGateApproved:se,approvalGateRejected:re,approvalGateExpired:oe,header:ie,statusIcon:de,statusIconPending:ce,statusIconApproved:pe,statusIconRejected:le,statusIconExpired:ue,headerContent:me,title:ge,statusLabel:ve,body:fe,description:_e,reasoning:he,reasoningLabel:xe,confidenceBadge:be,confidenceHigh:Se,confidenceMedium:je,confidenceLow:ye,scope:Ae,scopeTitle:Re,scopeItems:we,scopeBadge:ke,metadata:Ie,metadataTable:Ce,countdown:Te,countdownNormal:ze,countdownWarning:Ne,countdownUrgent:$e,stageIndicator:Ee,stage:Le,stageActive:Pe,stageCompleted:Me,stageSeparator:qe,actions:Ge,btn:Be,btnApprove:Oe,btnReject:De,btnSecondary:Ue,actionsSpacerRight:We,resolvedBanner:Ve,resolvedApproved:He,resolvedRejected:Fe,resolvedExpired:Ke},Qe=()=>e.jsx("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"3",strokeLinecap:"round",strokeLinejoin:"round",children:e.jsx("polyline",{points:"20 6 9 17 4 12"})}),Xe=()=>e.jsxs("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"3",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),e.jsx("line",{x1:"6",y1:"6",x2:"18",y2:"18"})]}),Je=()=>e.jsxs("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("path",{d:"M5 22h14"}),e.jsx("path",{d:"M5 2h14"}),e.jsx("path",{d:"M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22"}),e.jsx("path",{d:"M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2"})]}),b={pending:null,approved:e.jsx(Qe,{}),rejected:e.jsx(Xe,{}),expired:e.jsx(Je,{})},L={pending:"Approval Required",approved:"Approved",rejected:"Rejected",expired:"Expired"};function Ye(a){switch(a){case"pending":return t.approvalGatePending;case"approved":return t.approvalGateApproved;case"rejected":return t.approvalGateRejected;case"expired":return t.approvalGateExpired;default:return""}}function Ze(a){switch(a){case"pending":return t.statusIconPending;case"approved":return t.statusIconApproved;case"rejected":return t.statusIconRejected;case"expired":return t.statusIconExpired;default:return""}}function O(a){const s=Math.floor(a/60),o=a%60;return s>0?`${s}:${o.toString().padStart(2,"0")}`:`${o}s`}function x({icon:a,title:s,description:o,agentReasoning:u,status:n="pending",mode:d="simple",confidence:l,timeoutSeconds:f,scope:c,metadata:$,onApprove:P,onReject:M,onTimeout:q,className:D}){const i=n==="pending",U=n==="approved"||n==="rejected"||n==="expired",W=ee(i),[v,V]=te("assertive"),[m,G]=r.useState("previewing"),[p,H]=r.useState(f??null);r.useEffect(()=>{i?v(`Approval required: ${s}`):n==="approved"?v(`Approved: ${s}`):n==="rejected"?v(`Rejected: ${s}`):n==="expired"&&v(`Approval expired: ${s}`)},[n,s,v,i]),r.useEffect(()=>{if(!i||p==null||p<=0)return;const _=setInterval(()=>{H(h=>h==null||h<=1?(clearInterval(_),q?.(),0):h-1)},1e3);return()=>clearInterval(_)},[i,p,q]);const F=r.useMemo(()=>p==null?"":p<=10?t.countdownUrgent:p<=60?t.countdownWarning:t.countdownNormal,[p]),K=r.useCallback(()=>{if(d==="staged"&&m==="previewing"){G("confirming"),v("Confirm to proceed with approval");return}P?.()},[d,m,P,v]),Q=r.useCallback(()=>{M?.()},[M]),X=r.useCallback(()=>{G("previewing")},[]),B=l!=null?Z(l):null,J=B?{high:t.confidenceHigh,medium:t.confidenceMedium,low:t.confidenceLow}[B]:"",Y=r.useMemo(()=>i?`Approval required: ${s}`:`${L[n]}: ${s}`,[i,n,s]);return e.jsxs("div",{ref:W,className:`${t.approvalGate} ${Ye(n)} ${D??""}`,role:i?"alertdialog":"region","aria-label":Y,"aria-modal":i?!0:void 0,children:[e.jsxs("div",{className:t.header,children:[(a||b[n])&&e.jsx("span",{className:`${t.statusIcon} ${Ze(n)}`,"aria-hidden":"true",children:a||b[n]}),e.jsxs("div",{className:t.headerContent,children:[e.jsx("h3",{className:t.title,children:s}),e.jsx("div",{className:t.statusLabel,children:L[n]})]}),i&&p!=null&&p>0&&e.jsx("span",{className:`${t.countdown} ${F}`,"aria-live":"polite",children:O(p)})]}),d==="staged"&&i&&e.jsxs("div",{className:t.stageIndicator,"aria-label":"Approval stages",children:[e.jsxs("span",{className:`${t.stage} ${m==="previewing"?t.stageActive:t.stageCompleted}`,children:[m==="confirming"?"✓":"1."," Preview"]}),e.jsx("span",{className:t.stageSeparator,"aria-hidden":"true",children:"→"}),e.jsx("span",{className:`${t.stage} ${m==="confirming"?t.stageActive:""}`,children:"2. Confirm"}),e.jsx("span",{className:t.stageSeparator,"aria-hidden":"true",children:"→"}),e.jsx("span",{className:t.stage,children:"3. Execute"})]}),e.jsxs("div",{className:t.body,children:[o&&e.jsx("p",{className:t.description,children:o}),u&&e.jsxs("div",{className:t.reasoning,children:[e.jsx("div",{className:t.reasoningLabel,children:"Agent Reasoning"}),u]}),l!=null&&e.jsxs("span",{className:`${t.confidenceBadge} ${J}`,"aria-label":`Confidence: ${l}%`,children:[l,"% confidence"]}),c&&(c.resourceLimit||c.durationSeconds||c.target)&&e.jsxs("div",{className:t.scope,children:[e.jsx("div",{className:t.scopeTitle,children:"Grant Details"}),e.jsxs("div",{className:t.scopeItems,children:[c.resourceLimit&&e.jsxs("span",{className:t.scopeBadge,children:["Up to ",c.resourceLimit]}),c.durationSeconds&&e.jsxs("span",{className:t.scopeBadge,children:["Valid for ",O(c.durationSeconds)]}),c.target&&e.jsx("span",{className:t.scopeBadge,children:c.target})]})]}),$&&Object.keys($).length>0&&e.jsx("div",{className:t.metadata,children:e.jsx("table",{className:t.metadataTable,children:e.jsx("tbody",{children:Object.entries($).map(([_,h])=>e.jsxs("tr",{children:[e.jsx("td",{children:_}),e.jsx("td",{children:h})]},_))})})})]}),i&&e.jsxs("div",{className:t.actions,children:[d==="staged"&&m==="confirming"&&e.jsx("button",{className:`${t.btn} ${t.btnSecondary}`,onClick:X,type:"button",children:"← Back"}),e.jsx("button",{className:`${t.btn} ${t.btnReject}`,onClick:Q,type:"button",children:"Reject"}),e.jsx("span",{className:t.actionsSpacerRight}),e.jsx("button",{className:`${t.btn} ${t.btnApprove}`,onClick:K,type:"button",children:d==="staged"&&m==="previewing"?"Preview & Continue →":d==="staged"&&m==="confirming"?"Confirm & Execute ✓":"Approve"})]}),U&&e.jsxs("div",{className:`${t.resolvedBanner} ${n==="approved"?t.resolvedApproved:n==="rejected"?t.resolvedRejected:t.resolvedExpired}`,children:[(a||b[n])&&e.jsx("span",{children:a||b[n]})," ",L[n]]}),e.jsx(ne,{children:e.jsx(V,{})})]})}x.__docgenInfo={description:"",methods:[],displayName:"ApprovalGate",props:{icon:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"Optional custom icon to display in the header (overrides defaults and removes pending clock icon logic)"},title:{required:!0,tsType:{name:"string"},description:"Title of the approval request"},description:{required:!1,tsType:{name:"string"},description:"Detailed description of what needs approval"},agentReasoning:{required:!1,tsType:{name:"string"},description:"Agent's reasoning for this request"},status:{required:!1,tsType:{name:"union",raw:"'pending' | 'approved' | 'rejected' | 'expired'",elements:[{name:"literal",value:"'pending'"},{name:"literal",value:"'approved'"},{name:"literal",value:"'rejected'"},{name:"literal",value:"'expired'"}]},description:"Current approval status",defaultValue:{value:"'pending'",computed:!1}},mode:{required:!1,tsType:{name:"union",raw:"'simple' | 'staged'",elements:[{name:"literal",value:"'simple'"},{name:"literal",value:"'staged'"}]},description:"Approval mode — simple (approve/reject) or staged (preview → confirm → execute)",defaultValue:{value:"'simple'",computed:!1}},confidence:{required:!1,tsType:{name:"number"},description:"Confidence score (0-100) for this action"},timeoutSeconds:{required:!1,tsType:{name:"number"},description:"Optional timeout in seconds"},scope:{required:!1,tsType:{name:"signature",type:"object",raw:`{
  /** Resource/spend limit (e.g. "$500", "10 API calls") */
  resourceLimit?: string;
  /** Time-bounded grant duration in seconds */
  durationSeconds?: number;
  /** What specifically is being granted */
  target?: string;
}`,signature:{properties:[{key:"resourceLimit",value:{name:"string",required:!1},description:'Resource/spend limit (e.g. "$500", "10 API calls")'},{key:"durationSeconds",value:{name:"number",required:!1},description:"Time-bounded grant duration in seconds"},{key:"target",value:{name:"string",required:!1},description:"What specifically is being granted"}]}},description:"Scoped constraints for the approval (per Stripe's SPT pattern)"},metadata:{required:!1,tsType:{name:"Record",elements:[{name:"string"},{name:"string"}],raw:"Record<string, string>"},description:"Additional metadata to display"},onApprove:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Called on approval"},onReject:{required:!1,tsType:{name:"signature",type:"function",raw:"(reason?: string) => void",signature:{arguments:[{type:{name:"string"},name:"reason"}],return:{name:"void"}}},description:"Called on rejection"},onTimeout:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Called on timeout"},className:{required:!1,tsType:{name:"string"},description:"Additional CSS class"}}};const ot={title:"AX Components/ApprovalGate",component:x,tags:["autodocs"],argTypes:{mode:{control:"select",options:["simple","staged"]},status:{control:"select",options:["pending","approved","rejected","expired"]},confidence:{control:{type:"range",min:0,max:100,step:1}},timeoutSeconds:{control:{type:"number",min:0}}}},S={args:g({status:"pending",mode:"simple"})},j={args:g({mode:"staged",status:"pending",timeoutSeconds:120,scope:{resourceLimit:"$500",durationSeconds:600,target:"Stripe API only"},metadata:{"Initiated by":"Agent v2.1","Risk level":"Medium"}})},y={name:"State: Pending",args:g({status:"pending"})},A={name:"State: Approved",args:g({status:"approved"})},R={name:"State: Rejected",args:g({status:"rejected"})},w={name:"State: Expired (Countdown)",args:g({status:"pending",timeoutSeconds:30})},k={name:"Quick Start: Prototype Approval Flow",render:()=>{const a=g({status:"pending",mode:"simple"}),[s,o]=r.useState("pending");return e.jsx(x,{...a,status:s,onApprove:()=>o("approved"),onReject:()=>o("rejected")})}},I={name:"Test Different Approval Scenarios",render:()=>{const[a,s]=r.useState(0),[o,u]=r.useState("pending"),n=E[a%E.length],d=l=>{s(l),u("pending")};return e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"1rem"},children:[e.jsx("div",{style:{display:"flex",gap:"0.5rem",flexWrap:"wrap",fontFamily:"sans-serif",fontSize:"0.75rem"},children:E.map((l,f)=>e.jsx("button",{onClick:()=>d(f),style:{padding:"0.25rem 0.625rem",border:"1px solid #ccc",borderRadius:"4px",background:a===f?"#1d4ed8":"#fff",color:a===f?"#fff":"#333",cursor:"pointer"},children:l.title},f))}),e.jsx(x,{title:n.title,description:n.description,agentReasoning:"This action is required to complete the current workflow step.",status:o,mode:"simple",confidence:75,onApprove:()=>u("approved"),onReject:()=>u("rejected")})]})}},C={name:"Simulate Real-Time Updates — Staged Mode",render:()=>{const a=g({mode:"staged",status:"pending",confidence:72}),[s,o]=r.useState("pending"),[u,n]=r.useState(0);return e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"1rem"},children:[r.createElement(x,{...a,key:u,status:s,onApprove:()=>o("approved"),onReject:()=>o("rejected")}),e.jsx("button",{onClick:()=>{o("pending"),n(d=>d+1)},style:{padding:"0.5rem 1rem",border:"1px solid #ccc",borderRadius:"4px",cursor:"pointer",fontFamily:"sans-serif"},children:"↺ Reset"})]})}},T={name:"Basic Usage",args:{title:"Send external email",description:"The agent will send a follow-up email to 3 recipients.",agentReasoning:"The task requires notifying stakeholders of the completed analysis.",status:"pending",mode:"simple",confidence:88}},z={name:"With Real API Data — Scoped Grant",args:{title:"Submit refund via Stripe",description:"A refund of $47.99 will be issued to the customer's original payment method.",agentReasoning:"Customer requested refund within the 30-day policy window. Eligibility confirmed.",status:"pending",mode:"simple",confidence:96,scope:{resourceLimit:"$100",durationSeconds:300,target:"Stripe API — /v1/refunds only"},metadata:{"Order ID":"ORD-28471",Customer:"jane.doe@example.com","Refund amount":"$47.99"}}},N={name:"Error Handling — Expired Gate",args:{title:"Delete archived records",description:"This action will permanently delete 842 archived records older than 2 years.",agentReasoning:"Records meet the data retention policy threshold for deletion.",status:"expired",mode:"simple",confidence:62,timeoutSeconds:60}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: generateMockApproval({
    status: 'pending',
    mode: 'simple'
  })
}`,...S.parameters?.docs?.source}}};j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  args: generateMockApproval({
    mode: 'staged',
    status: 'pending',
    timeoutSeconds: 120,
    scope: {
      resourceLimit: '$500',
      durationSeconds: 600,
      target: 'Stripe API only'
    },
    metadata: {
      'Initiated by': 'Agent v2.1',
      'Risk level': 'Medium'
    }
  })
}`,...j.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  name: 'State: Pending',
  args: generateMockApproval({
    status: 'pending'
  })
}`,...y.parameters?.docs?.source}}};A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  name: 'State: Approved',
  args: generateMockApproval({
    status: 'approved'
  })
}`,...A.parameters?.docs?.source}}};R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  name: 'State: Rejected',
  args: generateMockApproval({
    status: 'rejected'
  })
}`,...R.parameters?.docs?.source}}};w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  name: 'State: Expired (Countdown)',
  args: generateMockApproval({
    status: 'pending',
    timeoutSeconds: 30
  })
}`,...w.parameters?.docs?.source}}};k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  name: 'Quick Start: Prototype Approval Flow',
  render: () => {
    const base = generateMockApproval({
      status: 'pending',
      mode: 'simple'
    });
    const [status, setStatus] = useState<'pending' | 'approved' | 'rejected' | 'expired'>('pending');
    return <ApprovalGate {...base} status={status} onApprove={() => setStatus('approved')} onReject={() => setStatus('rejected')} />;
  }
}`,...k.parameters?.docs?.source}}};I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  name: 'Test Different Approval Scenarios',
  render: () => {
    const [idx, setIdx] = useState(0);
    const [status, setStatus] = useState<'pending' | 'approved' | 'rejected' | 'expired'>('pending');
    const scenario = MOCK_APPROVAL_SCENARIOS[idx % MOCK_APPROVAL_SCENARIOS.length];
    const switchScenario = (i: number) => {
      setIdx(i);
      setStatus('pending');
    };
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem'
    }}>
        <div style={{
        display: 'flex',
        gap: '0.5rem',
        flexWrap: 'wrap',
        fontFamily: 'sans-serif',
        fontSize: '0.75rem'
      }}>
          {MOCK_APPROVAL_SCENARIOS.map((s, i) => <button key={i} onClick={() => switchScenario(i)} style={{
          padding: '0.25rem 0.625rem',
          border: '1px solid #ccc',
          borderRadius: '4px',
          background: idx === i ? '#1d4ed8' : '#fff',
          color: idx === i ? '#fff' : '#333',
          cursor: 'pointer'
        }}>
              {s.title}
            </button>)}
        </div>
        <ApprovalGate title={scenario.title} description={scenario.description} agentReasoning="This action is required to complete the current workflow step." status={status} mode="simple" confidence={75} onApprove={() => setStatus('approved')} onReject={() => setStatus('rejected')} />
      </div>;
  }
}`,...I.parameters?.docs?.source}}};C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  name: 'Simulate Real-Time Updates — Staged Mode',
  render: () => {
    const base = generateMockApproval({
      mode: 'staged',
      status: 'pending',
      confidence: 72
    });
    const [status, setStatus] = useState<'pending' | 'approved' | 'rejected' | 'expired'>('pending');
    const [key, setKey] = useState(0);
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem'
    }}>
        <ApprovalGate {...base} key={key} status={status} onApprove={() => setStatus('approved')} onReject={() => setStatus('rejected')} />
        <button onClick={() => {
        setStatus('pending');
        setKey(k => k + 1);
      }} style={{
        padding: '0.5rem 1rem',
        border: '1px solid #ccc',
        borderRadius: '4px',
        cursor: 'pointer',
        fontFamily: 'sans-serif'
      }}>
          ↺ Reset
        </button>
      </div>;
  }
}`,...C.parameters?.docs?.source}}};T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  name: 'Basic Usage',
  args: {
    title: 'Send external email',
    description: 'The agent will send a follow-up email to 3 recipients.',
    agentReasoning: 'The task requires notifying stakeholders of the completed analysis.',
    status: 'pending',
    mode: 'simple',
    confidence: 88
  }
}`,...T.parameters?.docs?.source}}};z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  name: 'With Real API Data — Scoped Grant',
  args: {
    title: 'Submit refund via Stripe',
    description: "A refund of $47.99 will be issued to the customer's original payment method.",
    agentReasoning: 'Customer requested refund within the 30-day policy window. Eligibility confirmed.',
    status: 'pending',
    mode: 'simple',
    confidence: 96,
    scope: {
      resourceLimit: '$100',
      durationSeconds: 300,
      target: 'Stripe API — /v1/refunds only'
    },
    metadata: {
      'Order ID': 'ORD-28471',
      'Customer': 'jane.doe@example.com',
      'Refund amount': '$47.99'
    }
  }
}`,...z.parameters?.docs?.source}}};N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  name: 'Error Handling — Expired Gate',
  args: {
    title: 'Delete archived records',
    description: 'This action will permanently delete 842 archived records older than 2 years.',
    agentReasoning: 'Records meet the data retention policy threshold for deletion.',
    status: 'expired',
    mode: 'simple',
    confidence: 62,
    timeoutSeconds: 60
  }
}`,...N.parameters?.docs?.source}}};const it=["Default","AllFeatures","StatePending","StateApproved","StateRejected","StateExpired","PrototypeQuickStart","TestVariations","SimulateRealTimeUpdates","BasicUsage","WithRealAPIData","ErrorHandling"];export{j as AllFeatures,T as BasicUsage,S as Default,N as ErrorHandling,k as PrototypeQuickStart,C as SimulateRealTimeUpdates,A as StateApproved,w as StateExpired,y as StatePending,R as StateRejected,I as TestVariations,z as WithRealAPIData,it as __namedExportsOrder,ot as default};
