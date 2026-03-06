import{j as t}from"./jsx-runtime-u17CrQMm.js";import{r}from"./iframe-Bgbjxzh1.js";import{g as Z}from"./common-DpQzTmW8.js";import{u as ee,a as te,V as ne}from"./a11y-D12Erp7f.js";import{a as g,M as E}from"./mockData-DOQp8R7v.js";import"./preload-helper-PPVm8Dsz.js";const ae="_approvalGate_1dvzb_12",se="_approvalGateApproved_1dvzb_24",re="_approvalGateRejected_1dvzb_28",oe="_approvalGateExpired_1dvzb_32",ie="_header_1dvzb_41",de="_statusIcon_1dvzb_49",ce="_statusIconPending_1dvzb_60",pe="_statusIconApproved_1dvzb_66",le="_statusIconRejected_1dvzb_71",ue="_statusIconExpired_1dvzb_76",me="_headerContent_1dvzb_81",ge="_title_1dvzb_86",ve="_statusLabel_1dvzb_94",fe="_body_1dvzb_106",_e="_description_1dvzb_110",be="_reasoning_1dvzb_117",Se="_reasoningLabel_1dvzb_127",he="_confidenceBadge_1dvzb_138",xe="_confidenceHigh_1dvzb_149",je="_confidenceMedium_1dvzb_154",ye="_confidenceLow_1dvzb_159",Ae="_scope_1dvzb_168",Re="_scopeTitle_1dvzb_175",we="_scopeItems_1dvzb_182",Ie="_scopeBadge_1dvzb_188",Ce="_metadata_1dvzb_204",Te="_metadataTable_1dvzb_208",ze="_countdown_1dvzb_241",ke="_countdownNormal_1dvzb_251",Ne="_countdownWarning_1dvzb_256",$e="_countdownUrgent_1dvzb_261",Ee="_stageIndicator_1dvzb_271",Pe="_stage_1dvzb_271",Le="_stageActive_1dvzb_287",qe="_stageCompleted_1dvzb_292",Ge="_stageSeparator_1dvzb_296",Me="_actions_1dvzb_304",Oe="_btn_1dvzb_312",Be="_btnApprove_1dvzb_332",De="_btnReject_1dvzb_342",Ue="_btnSecondary_1dvzb_352",We="_actionsSpacerRight_1dvzb_363",Ve="_resolvedBanner_1dvzb_371",Fe="_resolvedApproved_1dvzb_380",He="_resolvedRejected_1dvzb_385",Ke="_resolvedExpired_1dvzb_390",e={approvalGate:ae,approvalGateApproved:se,approvalGateRejected:re,approvalGateExpired:oe,header:ie,statusIcon:de,statusIconPending:ce,statusIconApproved:pe,statusIconRejected:le,statusIconExpired:ue,headerContent:me,title:ge,statusLabel:ve,body:fe,description:_e,reasoning:be,reasoningLabel:Se,confidenceBadge:he,confidenceHigh:xe,confidenceMedium:je,confidenceLow:ye,scope:Ae,scopeTitle:Re,scopeItems:we,scopeBadge:Ie,metadata:Ce,metadataTable:Te,countdown:ze,countdownNormal:ke,countdownWarning:Ne,countdownUrgent:$e,stageIndicator:Ee,stage:Pe,stageActive:Le,stageCompleted:qe,stageSeparator:Ge,actions:Me,btn:Oe,btnApprove:Be,btnReject:De,btnSecondary:Ue,actionsSpacerRight:We,resolvedBanner:Ve,resolvedApproved:Fe,resolvedRejected:He,resolvedExpired:Ke},h={pending:null,approved:"✓",rejected:"✕",expired:"⌛"},P={pending:"Approval Required",approved:"Approved",rejected:"Rejected",expired:"Expired"};function Qe(a){switch(a){case"pending":return e.approvalGatePending;case"approved":return e.approvalGateApproved;case"rejected":return e.approvalGateRejected;case"expired":return e.approvalGateExpired;default:return""}}function Xe(a){switch(a){case"pending":return e.statusIconPending;case"approved":return e.statusIconApproved;case"rejected":return e.statusIconRejected;case"expired":return e.statusIconExpired;default:return""}}function B(a){const s=Math.floor(a/60),o=a%60;return s>0?`${s}:${o.toString().padStart(2,"0")}`:`${o}s`}function S({icon:a,title:s,description:o,agentReasoning:u,status:n="pending",mode:d="simple",confidence:l,timeoutSeconds:f,scope:c,metadata:$,onApprove:L,onReject:q,onTimeout:G,className:D}){const i=n==="pending",U=n==="approved"||n==="rejected"||n==="expired",W=ee(i),[v,V]=te("assertive"),[m,M]=r.useState("previewing"),[p,F]=r.useState(f??null);r.useEffect(()=>{i?v(`Approval required: ${s}`):n==="approved"?v(`Approved: ${s}`):n==="rejected"?v(`Rejected: ${s}`):n==="expired"&&v(`Approval expired: ${s}`)},[n,s,v,i]),r.useEffect(()=>{if(!i||p==null||p<=0)return;const _=setInterval(()=>{F(b=>b==null||b<=1?(clearInterval(_),G?.(),0):b-1)},1e3);return()=>clearInterval(_)},[i,p,G]);const H=r.useMemo(()=>p==null?"":p<=10?e.countdownUrgent:p<=60?e.countdownWarning:e.countdownNormal,[p]),K=r.useCallback(()=>{if(d==="staged"&&m==="previewing"){M("confirming"),v("Confirm to proceed with approval");return}L?.()},[d,m,L,v]),Q=r.useCallback(()=>{q?.()},[q]),X=r.useCallback(()=>{M("previewing")},[]),O=l!=null?Z(l):null,J=O?{high:e.confidenceHigh,medium:e.confidenceMedium,low:e.confidenceLow}[O]:"",Y=r.useMemo(()=>i?`Approval required: ${s}`:`${P[n]}: ${s}`,[i,n,s]);return t.jsxs("div",{ref:W,className:`${e.approvalGate} ${Qe(n)} ${D??""}`,role:i?"alertdialog":"region","aria-label":Y,"aria-modal":i?!0:void 0,children:[t.jsxs("div",{className:e.header,children:[(a||h[n])&&t.jsx("span",{className:`${e.statusIcon} ${Xe(n)}`,"aria-hidden":"true",children:a||h[n]}),t.jsxs("div",{className:e.headerContent,children:[t.jsx("h3",{className:e.title,children:s}),t.jsx("div",{className:e.statusLabel,children:P[n]})]}),i&&p!=null&&p>0&&t.jsx("span",{className:`${e.countdown} ${H}`,"aria-live":"polite",children:B(p)})]}),d==="staged"&&i&&t.jsxs("div",{className:e.stageIndicator,"aria-label":"Approval stages",children:[t.jsxs("span",{className:`${e.stage} ${m==="previewing"?e.stageActive:e.stageCompleted}`,children:[m==="confirming"?"✓":"1."," Preview"]}),t.jsx("span",{className:e.stageSeparator,"aria-hidden":"true",children:"→"}),t.jsx("span",{className:`${e.stage} ${m==="confirming"?e.stageActive:""}`,children:"2. Confirm"}),t.jsx("span",{className:e.stageSeparator,"aria-hidden":"true",children:"→"}),t.jsx("span",{className:e.stage,children:"3. Execute"})]}),t.jsxs("div",{className:e.body,children:[o&&t.jsx("p",{className:e.description,children:o}),u&&t.jsxs("div",{className:e.reasoning,children:[t.jsx("div",{className:e.reasoningLabel,children:"Agent Reasoning"}),u]}),l!=null&&t.jsxs("span",{className:`${e.confidenceBadge} ${J}`,"aria-label":`Confidence: ${l}%`,children:[l,"% confidence"]}),c&&(c.resourceLimit||c.durationSeconds||c.target)&&t.jsxs("div",{className:e.scope,children:[t.jsx("div",{className:e.scopeTitle,children:"Grant Details"}),t.jsxs("div",{className:e.scopeItems,children:[c.resourceLimit&&t.jsxs("span",{className:e.scopeBadge,children:["Up to ",c.resourceLimit]}),c.durationSeconds&&t.jsxs("span",{className:e.scopeBadge,children:["Valid for ",B(c.durationSeconds)]}),c.target&&t.jsx("span",{className:e.scopeBadge,children:c.target})]})]}),$&&Object.keys($).length>0&&t.jsx("div",{className:e.metadata,children:t.jsx("table",{className:e.metadataTable,children:t.jsx("tbody",{children:Object.entries($).map(([_,b])=>t.jsxs("tr",{children:[t.jsx("td",{children:_}),t.jsx("td",{children:b})]},_))})})})]}),i&&t.jsxs("div",{className:e.actions,children:[d==="staged"&&m==="confirming"&&t.jsx("button",{className:`${e.btn} ${e.btnSecondary}`,onClick:X,type:"button",children:"← Back"}),t.jsx("button",{className:`${e.btn} ${e.btnReject}`,onClick:Q,type:"button",children:"Reject"}),t.jsx("span",{className:e.actionsSpacerRight}),t.jsx("button",{className:`${e.btn} ${e.btnApprove}`,onClick:K,type:"button",children:d==="staged"&&m==="previewing"?"Preview & Continue →":d==="staged"&&m==="confirming"?"Confirm & Execute ✓":"Approve"})]}),U&&t.jsxs("div",{className:`${e.resolvedBanner} ${n==="approved"?e.resolvedApproved:n==="rejected"?e.resolvedRejected:e.resolvedExpired}`,children:[(a||h[n])&&t.jsx("span",{children:a||h[n]})," ",P[n]]}),t.jsx(ne,{children:t.jsx(V,{})})]})}S.__docgenInfo={description:"",methods:[],displayName:"ApprovalGate",props:{icon:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"Optional custom icon to display in the header (overrides defaults and removes pending clock icon logic)"},title:{required:!0,tsType:{name:"string"},description:"Title of the approval request"},description:{required:!1,tsType:{name:"string"},description:"Detailed description of what needs approval"},agentReasoning:{required:!1,tsType:{name:"string"},description:"Agent's reasoning for this request"},status:{required:!1,tsType:{name:"union",raw:"'pending' | 'approved' | 'rejected' | 'expired'",elements:[{name:"literal",value:"'pending'"},{name:"literal",value:"'approved'"},{name:"literal",value:"'rejected'"},{name:"literal",value:"'expired'"}]},description:"Current approval status",defaultValue:{value:"'pending'",computed:!1}},mode:{required:!1,tsType:{name:"union",raw:"'simple' | 'staged'",elements:[{name:"literal",value:"'simple'"},{name:"literal",value:"'staged'"}]},description:"Approval mode — simple (approve/reject) or staged (preview → confirm → execute)",defaultValue:{value:"'simple'",computed:!1}},confidence:{required:!1,tsType:{name:"number"},description:"Confidence score (0-100) for this action"},timeoutSeconds:{required:!1,tsType:{name:"number"},description:"Optional timeout in seconds"},scope:{required:!1,tsType:{name:"signature",type:"object",raw:`{
  /** Resource/spend limit (e.g. "$500", "10 API calls") */
  resourceLimit?: string;
  /** Time-bounded grant duration in seconds */
  durationSeconds?: number;
  /** What specifically is being granted */
  target?: string;
}`,signature:{properties:[{key:"resourceLimit",value:{name:"string",required:!1},description:'Resource/spend limit (e.g. "$500", "10 API calls")'},{key:"durationSeconds",value:{name:"number",required:!1},description:"Time-bounded grant duration in seconds"},{key:"target",value:{name:"string",required:!1},description:"What specifically is being granted"}]}},description:"Scoped constraints for the approval (per Stripe's SPT pattern)"},metadata:{required:!1,tsType:{name:"Record",elements:[{name:"string"},{name:"string"}],raw:"Record<string, string>"},description:"Additional metadata to display"},onApprove:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Called on approval"},onReject:{required:!1,tsType:{name:"signature",type:"function",raw:"(reason?: string) => void",signature:{arguments:[{type:{name:"string"},name:"reason"}],return:{name:"void"}}},description:"Called on rejection"},onTimeout:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Called on timeout"},className:{required:!1,tsType:{name:"string"},description:"Additional CSS class"}}};const at={title:"AX Components/ApprovalGate",component:S,tags:["autodocs"],argTypes:{mode:{control:"select",options:["simple","staged"]},status:{control:"select",options:["pending","approved","rejected","expired"]},confidence:{control:{type:"range",min:0,max:100,step:1}},timeoutSeconds:{control:{type:"number",min:0}}}},x={args:g({status:"pending",mode:"simple"})},j={args:g({mode:"staged",status:"pending",timeoutSeconds:120,scope:{resourceLimit:"$500",durationSeconds:600,target:"Stripe API only"},metadata:{"Initiated by":"Agent v2.1","Risk level":"Medium"}})},y={name:"State: Pending",args:g({status:"pending"})},A={name:"State: Approved",args:g({status:"approved"})},R={name:"State: Rejected",args:g({status:"rejected"})},w={name:"State: Expired (Countdown)",args:g({status:"pending",timeoutSeconds:30})},I={name:"Quick Start: Prototype Approval Flow",render:()=>{const a=g({status:"pending",mode:"simple"}),[s,o]=r.useState("pending");return t.jsx(S,{...a,status:s,onApprove:()=>o("approved"),onReject:()=>o("rejected")})}},C={name:"Test Different Approval Scenarios",render:()=>{const[a,s]=r.useState(0),[o,u]=r.useState("pending"),n=E[a%E.length],d=l=>{s(l),u("pending")};return t.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"1rem"},children:[t.jsx("div",{style:{display:"flex",gap:"0.5rem",flexWrap:"wrap",fontFamily:"sans-serif",fontSize:"0.75rem"},children:E.map((l,f)=>t.jsx("button",{onClick:()=>d(f),style:{padding:"0.25rem 0.625rem",border:"1px solid #ccc",borderRadius:"4px",background:a===f?"#1d4ed8":"#fff",color:a===f?"#fff":"#333",cursor:"pointer"},children:l.title},f))}),t.jsx(S,{title:n.title,description:n.description,agentReasoning:"This action is required to complete the current workflow step.",status:o,mode:"simple",confidence:75,onApprove:()=>u("approved"),onReject:()=>u("rejected")})]})}},T={name:"Simulate Real-Time Updates — Staged Mode",render:()=>{const a=g({mode:"staged",status:"pending",confidence:72}),[s,o]=r.useState("pending"),[u,n]=r.useState(0);return t.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"1rem"},children:[r.createElement(S,{...a,key:u,status:s,onApprove:()=>o("approved"),onReject:()=>o("rejected")}),t.jsx("button",{onClick:()=>{o("pending"),n(d=>d+1)},style:{padding:"0.5rem 1rem",border:"1px solid #ccc",borderRadius:"4px",cursor:"pointer",fontFamily:"sans-serif"},children:"↺ Reset"})]})}},z={name:"Basic Usage",args:{title:"Send external email",description:"The agent will send a follow-up email to 3 recipients.",agentReasoning:"The task requires notifying stakeholders of the completed analysis.",status:"pending",mode:"simple",confidence:88}},k={name:"With Real API Data — Scoped Grant",args:{title:"Submit refund via Stripe",description:"A refund of $47.99 will be issued to the customer's original payment method.",agentReasoning:"Customer requested refund within the 30-day policy window. Eligibility confirmed.",status:"pending",mode:"simple",confidence:96,scope:{resourceLimit:"$100",durationSeconds:300,target:"Stripe API — /v1/refunds only"},metadata:{"Order ID":"ORD-28471",Customer:"jane.doe@example.com","Refund amount":"$47.99"}}},N={name:"Error Handling — Expired Gate",args:{title:"Delete archived records",description:"This action will permanently delete 842 archived records older than 2 years.",agentReasoning:"Records meet the data retention policy threshold for deletion.",status:"expired",mode:"simple",confidence:62,timeoutSeconds:60}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: generateMockApproval({
    status: 'pending',
    mode: 'simple'
  })
}`,...x.parameters?.docs?.source}}};j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
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
}`,...w.parameters?.docs?.source}}};I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  name: 'Quick Start: Prototype Approval Flow',
  render: () => {
    const base = generateMockApproval({
      status: 'pending',
      mode: 'simple'
    });
    const [status, setStatus] = useState<'pending' | 'approved' | 'rejected' | 'expired'>('pending');
    return <ApprovalGate {...base} status={status} onApprove={() => setStatus('approved')} onReject={() => setStatus('rejected')} />;
  }
}`,...I.parameters?.docs?.source}}};C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
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
}`,...C.parameters?.docs?.source}}};T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
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
}`,...T.parameters?.docs?.source}}};z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  name: 'Basic Usage',
  args: {
    title: 'Send external email',
    description: 'The agent will send a follow-up email to 3 recipients.',
    agentReasoning: 'The task requires notifying stakeholders of the completed analysis.',
    status: 'pending',
    mode: 'simple',
    confidence: 88
  }
}`,...z.parameters?.docs?.source}}};k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
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
}`,...k.parameters?.docs?.source}}};N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
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
}`,...N.parameters?.docs?.source}}};const st=["Default","AllFeatures","StatePending","StateApproved","StateRejected","StateExpired","PrototypeQuickStart","TestVariations","SimulateRealTimeUpdates","BasicUsage","WithRealAPIData","ErrorHandling"];export{j as AllFeatures,z as BasicUsage,x as Default,N as ErrorHandling,I as PrototypeQuickStart,T as SimulateRealTimeUpdates,A as StateApproved,w as StateExpired,y as StatePending,R as StateRejected,C as TestVariations,k as WithRealAPIData,st as __namedExportsOrder,at as default};
