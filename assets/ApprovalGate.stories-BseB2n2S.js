import{j as t}from"./jsx-runtime-u17CrQMm.js";import{r}from"./iframe-CS1FWmYW.js";import{g as Y}from"./common-DpQzTmW8.js";import{u as Z,a as ee,V as te}from"./a11y-D3NPVmaC.js";import{a as m,M as k}from"./mockData-DOQp8R7v.js";import"./preload-helper-PPVm8Dsz.js";const ne="_approvalGate_1oqz0_12",ae="_approvalGatePending_1oqz0_22",se="_approvalGateApproved_1oqz0_27",re="_approvalGateRejected_1oqz0_31",oe="_approvalGateExpired_1oqz0_35",ie="_header_1oqz0_44",de="_statusIcon_1oqz0_52",ce="_statusIconPending_1oqz0_63",pe="_statusIconApproved_1oqz0_69",le="_statusIconRejected_1oqz0_74",ue="_statusIconExpired_1oqz0_79",me="_headerContent_1oqz0_84",ge="_title_1oqz0_89",ve="_statusLabel_1oqz0_97",fe="_body_1oqz0_109",_e="_description_1oqz0_113",Se="_reasoning_1oqz0_120",he="_reasoningLabel_1oqz0_130",xe="_confidenceBadge_1oqz0_141",je="_confidenceHigh_1oqz0_152",ye="_confidenceMedium_1oqz0_157",Ae="_confidenceLow_1oqz0_162",be="_scope_1oqz0_171",Re="_scopeTitle_1oqz0_178",qe="_scopeItems_1oqz0_185",we="_scopeBadge_1oqz0_191",Ie="_metadata_1oqz0_207",Ce="_metadataTable_1oqz0_211",ze="_countdown_1oqz0_238",Te="_countdownNormal_1oqz0_248",ke="_countdownWarning_1oqz0_253",Ne="_countdownUrgent_1oqz0_258",$e="_stageIndicator_1oqz0_268",Ee="_stage_1oqz0_268",Pe="_stageActive_1oqz0_284",Ge="_stageCompleted_1oqz0_289",Le="_stageSeparator_1oqz0_293",Me="_actions_1oqz0_301",Be="_btn_1oqz0_309",Oe="_btnApprove_1oqz0_329",De="_btnReject_1oqz0_339",Ue="_btnSecondary_1oqz0_349",We="_actionsSpacerRight_1oqz0_360",Ve="_resolvedBanner_1oqz0_368",Fe="_resolvedApproved_1oqz0_377",He="_resolvedRejected_1oqz0_382",Ke="_resolvedExpired_1oqz0_387",e={approvalGate:ne,approvalGatePending:ae,approvalGateApproved:se,approvalGateRejected:re,approvalGateExpired:oe,header:ie,statusIcon:de,statusIconPending:ce,statusIconApproved:pe,statusIconRejected:le,statusIconExpired:ue,headerContent:me,title:ge,statusLabel:ve,body:fe,description:_e,reasoning:Se,reasoningLabel:he,confidenceBadge:xe,confidenceHigh:je,confidenceMedium:ye,confidenceLow:Ae,scope:be,scopeTitle:Re,scopeItems:qe,scopeBadge:we,metadata:Ie,metadataTable:Ce,countdown:ze,countdownNormal:Te,countdownWarning:ke,countdownUrgent:Ne,stageIndicator:$e,stage:Ee,stageActive:Pe,stageCompleted:Ge,stageSeparator:Le,actions:Me,btn:Be,btnApprove:Oe,btnReject:De,btnSecondary:Ue,actionsSpacerRight:We,resolvedBanner:Ve,resolvedApproved:Fe,resolvedRejected:He,resolvedExpired:Ke},M={pending:"⏳",approved:"✓",rejected:"✕",expired:"⌛"},N={pending:"Approval Required",approved:"Approved",rejected:"Rejected",expired:"Expired"};function Qe(n){switch(n){case"pending":return e.approvalGatePending;case"approved":return e.approvalGateApproved;case"rejected":return e.approvalGateRejected;case"expired":return e.approvalGateExpired;default:return""}}function Xe(n){switch(n){case"pending":return e.statusIconPending;case"approved":return e.statusIconApproved;case"rejected":return e.statusIconRejected;case"expired":return e.statusIconExpired;default:return""}}function B(n){const d=Math.floor(n/60),o=n%60;return d>0?`${d}:${o.toString().padStart(2,"0")}`:`${o}s`}function S({title:n,description:d,agentReasoning:o,status:a="pending",mode:c="simple",confidence:l,timeoutSeconds:v,scope:s,metadata:T,onApprove:$,onReject:E,onTimeout:P,className:O}){const i=a==="pending",D=a==="approved"||a==="rejected"||a==="expired",U=Z(i),[g,W]=ee("assertive"),[u,G]=r.useState("previewing"),[p,V]=r.useState(v??null);r.useEffect(()=>{i?g(`Approval required: ${n}`):a==="approved"?g(`Approved: ${n}`):a==="rejected"?g(`Rejected: ${n}`):a==="expired"&&g(`Approval expired: ${n}`)},[a,n,g,i]),r.useEffect(()=>{if(!i||p==null||p<=0)return;const f=setInterval(()=>{V(_=>_==null||_<=1?(clearInterval(f),P?.(),0):_-1)},1e3);return()=>clearInterval(f)},[i,p,P]);const F=r.useMemo(()=>p==null?"":p<=10?e.countdownUrgent:p<=60?e.countdownWarning:e.countdownNormal,[p]),H=r.useCallback(()=>{if(c==="staged"&&u==="previewing"){G("confirming"),g("Confirm to proceed with approval");return}$?.()},[c,u,$,g]),K=r.useCallback(()=>{E?.()},[E]),Q=r.useCallback(()=>{G("previewing")},[]),L=l!=null?Y(l):null,X=L?{high:e.confidenceHigh,medium:e.confidenceMedium,low:e.confidenceLow}[L]:"",J=r.useMemo(()=>i?`Approval required: ${n}`:`${N[a]}: ${n}`,[i,a,n]);return t.jsxs("div",{ref:U,className:`${e.approvalGate} ${Qe(a)} ${O??""}`,role:i?"alertdialog":"region","aria-label":J,"aria-modal":i?!0:void 0,children:[t.jsxs("div",{className:e.header,children:[t.jsx("span",{className:`${e.statusIcon} ${Xe(a)}`,"aria-hidden":"true",children:M[a]}),t.jsxs("div",{className:e.headerContent,children:[t.jsx("h3",{className:e.title,children:n}),t.jsx("div",{className:e.statusLabel,children:N[a]})]}),i&&p!=null&&p>0&&t.jsx("span",{className:`${e.countdown} ${F}`,"aria-live":"polite",children:B(p)})]}),c==="staged"&&i&&t.jsxs("div",{className:e.stageIndicator,"aria-label":"Approval stages",children:[t.jsxs("span",{className:`${e.stage} ${u==="previewing"?e.stageActive:e.stageCompleted}`,children:[u==="confirming"?"✓":"1."," Preview"]}),t.jsx("span",{className:e.stageSeparator,"aria-hidden":"true",children:"→"}),t.jsx("span",{className:`${e.stage} ${u==="confirming"?e.stageActive:""}`,children:"2. Confirm"}),t.jsx("span",{className:e.stageSeparator,"aria-hidden":"true",children:"→"}),t.jsx("span",{className:e.stage,children:"3. Execute"})]}),t.jsxs("div",{className:e.body,children:[d&&t.jsx("p",{className:e.description,children:d}),o&&t.jsxs("div",{className:e.reasoning,children:[t.jsx("div",{className:e.reasoningLabel,children:"Agent Reasoning"}),o]}),l!=null&&t.jsxs("span",{className:`${e.confidenceBadge} ${X}`,"aria-label":`Confidence: ${l}%`,children:[l,"% confidence"]}),s&&(s.resourceLimit||s.durationSeconds||s.target)&&t.jsxs("div",{className:e.scope,children:[t.jsx("div",{className:e.scopeTitle,children:"Grant Details"}),t.jsxs("div",{className:e.scopeItems,children:[s.resourceLimit&&t.jsxs("span",{className:e.scopeBadge,children:["Up to ",s.resourceLimit]}),s.durationSeconds&&t.jsxs("span",{className:e.scopeBadge,children:["Valid for ",B(s.durationSeconds)]}),s.target&&t.jsx("span",{className:e.scopeBadge,children:s.target})]})]}),T&&Object.keys(T).length>0&&t.jsx("div",{className:e.metadata,children:t.jsx("table",{className:e.metadataTable,children:t.jsx("tbody",{children:Object.entries(T).map(([f,_])=>t.jsxs("tr",{children:[t.jsx("td",{children:f}),t.jsx("td",{children:_})]},f))})})})]}),i&&t.jsxs("div",{className:e.actions,children:[c==="staged"&&u==="confirming"&&t.jsx("button",{className:`${e.btn} ${e.btnSecondary}`,onClick:Q,type:"button",children:"← Back"}),t.jsx("button",{className:`${e.btn} ${e.btnReject}`,onClick:K,type:"button",children:"Reject"}),t.jsx("span",{className:e.actionsSpacerRight}),t.jsx("button",{className:`${e.btn} ${e.btnApprove}`,onClick:H,type:"button",children:c==="staged"&&u==="previewing"?"Preview & Continue →":c==="staged"&&u==="confirming"?"Confirm & Execute ✓":"Approve"})]}),D&&t.jsxs("div",{className:`${e.resolvedBanner} ${a==="approved"?e.resolvedApproved:a==="rejected"?e.resolvedRejected:e.resolvedExpired}`,children:[M[a]," ",N[a]]}),t.jsx(te,{children:t.jsx(W,{})})]})}S.__docgenInfo={description:"",methods:[],displayName:"ApprovalGate",props:{title:{required:!0,tsType:{name:"string"},description:"Title of the approval request"},description:{required:!1,tsType:{name:"string"},description:"Detailed description of what needs approval"},agentReasoning:{required:!1,tsType:{name:"string"},description:"Agent's reasoning for this request"},status:{required:!1,tsType:{name:"union",raw:"'pending' | 'approved' | 'rejected' | 'expired'",elements:[{name:"literal",value:"'pending'"},{name:"literal",value:"'approved'"},{name:"literal",value:"'rejected'"},{name:"literal",value:"'expired'"}]},description:"Current approval status",defaultValue:{value:"'pending'",computed:!1}},mode:{required:!1,tsType:{name:"union",raw:"'simple' | 'staged'",elements:[{name:"literal",value:"'simple'"},{name:"literal",value:"'staged'"}]},description:"Approval mode — simple (approve/reject) or staged (preview → confirm → execute)",defaultValue:{value:"'simple'",computed:!1}},confidence:{required:!1,tsType:{name:"number"},description:"Confidence score (0-100) for this action"},timeoutSeconds:{required:!1,tsType:{name:"number"},description:"Optional timeout in seconds"},scope:{required:!1,tsType:{name:"signature",type:"object",raw:`{
  /** Resource/spend limit (e.g. "$500", "10 API calls") */
  resourceLimit?: string;
  /** Time-bounded grant duration in seconds */
  durationSeconds?: number;
  /** What specifically is being granted */
  target?: string;
}`,signature:{properties:[{key:"resourceLimit",value:{name:"string",required:!1},description:'Resource/spend limit (e.g. "$500", "10 API calls")'},{key:"durationSeconds",value:{name:"number",required:!1},description:"Time-bounded grant duration in seconds"},{key:"target",value:{name:"string",required:!1},description:"What specifically is being granted"}]}},description:"Scoped constraints for the approval (per Stripe's SPT pattern)"},metadata:{required:!1,tsType:{name:"Record",elements:[{name:"string"},{name:"string"}],raw:"Record<string, string>"},description:"Additional metadata to display"},onApprove:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Called on approval"},onReject:{required:!1,tsType:{name:"signature",type:"function",raw:"(reason?: string) => void",signature:{arguments:[{type:{name:"string"},name:"reason"}],return:{name:"void"}}},description:"Called on rejection"},onTimeout:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Called on timeout"},className:{required:!1,tsType:{name:"string"},description:"Additional CSS class"}}};const at={title:"AX Components/ApprovalGate",component:S,tags:["autodocs"],argTypes:{mode:{control:"select",options:["simple","staged"]},status:{control:"select",options:["pending","approved","rejected","expired"]},confidence:{control:{type:"range",min:0,max:100,step:1}},timeoutSeconds:{control:{type:"number",min:0}}}},h={args:m({status:"pending",mode:"simple"})},x={args:m({mode:"staged",status:"pending",timeoutSeconds:120,scope:{resourceLimit:"$500",durationSeconds:600,target:"Stripe API only"},metadata:{"Initiated by":"Agent v2.1","Risk level":"Medium"}})},j={name:"State: Pending",args:m({status:"pending"})},y={name:"State: Approved",args:m({status:"approved"})},A={name:"State: Rejected",args:m({status:"rejected"})},b={name:"State: Expired (Countdown)",args:m({status:"pending",timeoutSeconds:30})},R={name:"Quick Start: Prototype Approval Flow",render:()=>{const n=m({status:"pending",mode:"simple"}),[d,o]=r.useState("pending");return t.jsx(S,{...n,status:d,onApprove:()=>o("approved"),onReject:()=>o("rejected")})}},q={name:"Test Different Approval Scenarios",render:()=>{const[n,d]=r.useState(0),[o,a]=r.useState("pending"),c=k[n%k.length],l=v=>{d(v),a("pending")};return t.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"1rem"},children:[t.jsx("div",{style:{display:"flex",gap:"0.5rem",flexWrap:"wrap",fontFamily:"sans-serif",fontSize:"0.75rem"},children:k.map((v,s)=>t.jsx("button",{onClick:()=>l(s),style:{padding:"0.25rem 0.625rem",border:"1px solid #ccc",borderRadius:"4px",background:n===s?"#1d4ed8":"#fff",color:n===s?"#fff":"#333",cursor:"pointer"},children:v.title},s))}),t.jsx(S,{title:c.title,description:c.description,agentReasoning:"This action is required to complete the current workflow step.",status:o,mode:"simple",confidence:75,onApprove:()=>a("approved"),onReject:()=>a("rejected")})]})}},w={name:"Simulate Real-Time Updates — Staged Mode",render:()=>{const n=m({mode:"staged",status:"pending",confidence:72}),[d,o]=r.useState("pending"),[a,c]=r.useState(0);return t.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"1rem"},children:[r.createElement(S,{...n,key:a,status:d,onApprove:()=>o("approved"),onReject:()=>o("rejected")}),t.jsx("button",{onClick:()=>{o("pending"),c(l=>l+1)},style:{padding:"0.5rem 1rem",border:"1px solid #ccc",borderRadius:"4px",cursor:"pointer",fontFamily:"sans-serif"},children:"↺ Reset"})]})}},I={name:"Basic Usage",args:{title:"Send external email",description:"The agent will send a follow-up email to 3 recipients.",agentReasoning:"The task requires notifying stakeholders of the completed analysis.",status:"pending",mode:"simple",confidence:88}},C={name:"With Real API Data — Scoped Grant",args:{title:"Submit refund via Stripe",description:"A refund of $47.99 will be issued to the customer's original payment method.",agentReasoning:"Customer requested refund within the 30-day policy window. Eligibility confirmed.",status:"pending",mode:"simple",confidence:96,scope:{resourceLimit:"$100",durationSeconds:300,target:"Stripe API — /v1/refunds only"},metadata:{"Order ID":"ORD-28471",Customer:"jane.doe@example.com","Refund amount":"$47.99"}}},z={name:"Error Handling — Expired Gate",args:{title:"Delete archived records",description:"This action will permanently delete 842 archived records older than 2 years.",agentReasoning:"Records meet the data retention policy threshold for deletion.",status:"expired",mode:"simple",confidence:62,timeoutSeconds:60}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: generateMockApproval({
    status: 'pending',
    mode: 'simple'
  })
}`,...h.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
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
}`,...x.parameters?.docs?.source}}};j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  name: 'State: Pending',
  args: generateMockApproval({
    status: 'pending'
  })
}`,...j.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  name: 'State: Approved',
  args: generateMockApproval({
    status: 'approved'
  })
}`,...y.parameters?.docs?.source}}};A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  name: 'State: Rejected',
  args: generateMockApproval({
    status: 'rejected'
  })
}`,...A.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  name: 'State: Expired (Countdown)',
  args: generateMockApproval({
    status: 'pending',
    timeoutSeconds: 30
  })
}`,...b.parameters?.docs?.source}}};R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  name: 'Quick Start: Prototype Approval Flow',
  render: () => {
    const base = generateMockApproval({
      status: 'pending',
      mode: 'simple'
    });
    const [status, setStatus] = useState<'pending' | 'approved' | 'rejected' | 'expired'>('pending');
    return <ApprovalGate {...base} status={status} onApprove={() => setStatus('approved')} onReject={() => setStatus('rejected')} />;
  }
}`,...R.parameters?.docs?.source}}};q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`{
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
}`,...q.parameters?.docs?.source}}};w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
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
}`,...w.parameters?.docs?.source}}};I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  name: 'Basic Usage',
  args: {
    title: 'Send external email',
    description: 'The agent will send a follow-up email to 3 recipients.',
    agentReasoning: 'The task requires notifying stakeholders of the completed analysis.',
    status: 'pending',
    mode: 'simple',
    confidence: 88
  }
}`,...I.parameters?.docs?.source}}};C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
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
}`,...C.parameters?.docs?.source}}};z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
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
}`,...z.parameters?.docs?.source}}};const st=["Default","AllFeatures","StatePending","StateApproved","StateRejected","StateExpired","PrototypeQuickStart","TestVariations","SimulateRealTimeUpdates","BasicUsage","WithRealAPIData","ErrorHandling"];export{x as AllFeatures,I as BasicUsage,h as Default,z as ErrorHandling,R as PrototypeQuickStart,w as SimulateRealTimeUpdates,y as StateApproved,b as StateExpired,j as StatePending,A as StateRejected,q as TestVariations,C as WithRealAPIData,st as __namedExportsOrder,at as default};
