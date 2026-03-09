import{j as r}from"./jsx-runtime-u17CrQMm.js";import{r as s}from"./iframe-BRop0YAY.js";import{A as R}from"./ApprovalGate-DineOYcl.js";import{a as t,M as j}from"./mockData-DOQp8R7v.js";import"./preload-helper-PPVm8Dsz.js";import"./common-DpQzTmW8.js";import"./a11y-CAoaMNmU.js";const M={title:"AX Components/ApprovalGate",component:R,tags:["autodocs"],argTypes:{mode:{control:"select",options:["simple","staged"]},status:{control:"select",options:["pending","approved","rejected","expired"]},confidence:{control:{type:"range",min:0,max:100,step:1}},timeoutSeconds:{control:{type:"number",min:0}}}},c={args:t({status:"pending",mode:"simple"})},p={args:t({mode:"staged",status:"pending",timeoutSeconds:120,scope:{resourceLimit:"$500",durationSeconds:600,target:"Stripe API only"},metadata:{"Initiated by":"Agent v2.1","Risk level":"Medium"}})},l={name:"State: Pending",args:t({status:"pending"})},m={name:"State: Approved",args:t({status:"approved"})},u={name:"State: Rejected",args:t({status:"rejected"})},g={name:"State: Expired (Countdown)",args:t({status:"pending",timeoutSeconds:30})},S={name:"Quick Start: Prototype Approval Flow",render:()=>{const n=t({status:"pending",mode:"simple"}),[a,e]=s.useState("pending");return r.jsx(R,{...n,status:a,onApprove:()=>e("approved"),onReject:()=>e("rejected")})}},f={name:"Test Different Approval Scenarios",render:()=>{const[n,a]=s.useState(0),[e,o]=s.useState("pending"),i=j[n%j.length],h=k=>{a(k),o("pending")};return r.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"1rem"},children:[r.jsx("div",{style:{display:"flex",gap:"0.5rem",flexWrap:"wrap",fontFamily:"sans-serif",fontSize:"0.75rem"},children:j.map((k,d)=>r.jsx("button",{onClick:()=>h(d),style:{padding:"0.25rem 0.625rem",border:"1px solid #ccc",borderRadius:"4px",background:n===d?"#1d4ed8":"#fff",color:n===d?"#fff":"#333",cursor:"pointer"},children:k.title},d))}),r.jsx(R,{title:i.title,description:i.description,agentReasoning:"This action is required to complete the current workflow step.",status:e,mode:"simple",confidence:75,onApprove:()=>o("approved"),onReject:()=>o("rejected")})]})}},v={name:"Simulate Real-Time Updates — Staged Mode",render:()=>{const n=t({mode:"staged",status:"pending",confidence:72}),[a,e]=s.useState("pending"),[o,i]=s.useState(0);return r.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"1rem"},children:[s.createElement(R,{...n,key:o,status:a,onApprove:()=>e("approved"),onReject:()=>e("rejected")}),r.jsx("button",{onClick:()=>{e("pending"),i(h=>h+1)},style:{padding:"0.5rem 1rem",border:"1px solid #ccc",borderRadius:"4px",cursor:"pointer",fontFamily:"sans-serif"},children:"↺ Reset"})]})}},y={name:"Basic Usage",args:{title:"Send external email",description:"The agent will send a follow-up email to 3 recipients.",agentReasoning:"The task requires notifying stakeholders of the completed analysis.",status:"pending",mode:"simple",confidence:88}},x={name:"With Real API Data — Scoped Grant",args:{title:"Submit refund via Stripe",description:"A refund of $47.99 will be issued to the customer's original payment method.",agentReasoning:"Customer requested refund within the 30-day policy window. Eligibility confirmed.",status:"pending",mode:"simple",confidence:96,scope:{resourceLimit:"$100",durationSeconds:300,target:"Stripe API — /v1/refunds only"},metadata:{"Order ID":"ORD-28471",Customer:"jane.doe@example.com","Refund amount":"$47.99"}}},A={name:"Error Handling — Expired Gate",args:{title:"Delete archived records",description:"This action will permanently delete 842 archived records older than 2 years.",agentReasoning:"Records meet the data retention policy threshold for deletion.",status:"expired",mode:"simple",confidence:62,timeoutSeconds:60}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: generateMockApproval({
    status: 'pending',
    mode: 'simple'
  })
}`,...c.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
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
}`,...p.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  name: 'State: Pending',
  args: generateMockApproval({
    status: 'pending'
  })
}`,...l.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  name: 'State: Approved',
  args: generateMockApproval({
    status: 'approved'
  })
}`,...m.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  name: 'State: Rejected',
  args: generateMockApproval({
    status: 'rejected'
  })
}`,...u.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  name: 'State: Expired (Countdown)',
  args: generateMockApproval({
    status: 'pending',
    timeoutSeconds: 30
  })
}`,...g.parameters?.docs?.source}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  name: 'Quick Start: Prototype Approval Flow',
  render: () => {
    const base = generateMockApproval({
      status: 'pending',
      mode: 'simple'
    });
    const [status, setStatus] = useState<'pending' | 'approved' | 'rejected' | 'expired'>('pending');
    return <ApprovalGate {...base} status={status} onApprove={() => setStatus('approved')} onReject={() => setStatus('rejected')} />;
  }
}`,...S.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
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
}`,...f.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
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
}`,...v.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  name: 'Basic Usage',
  args: {
    title: 'Send external email',
    description: 'The agent will send a follow-up email to 3 recipients.',
    agentReasoning: 'The task requires notifying stakeholders of the completed analysis.',
    status: 'pending',
    mode: 'simple',
    confidence: 88
  }
}`,...y.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
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
}`,...x.parameters?.docs?.source}}};A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
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
}`,...A.parameters?.docs?.source}}};const O=["Default","AllFeatures","StatePending","StateApproved","StateRejected","StateExpired","PrototypeQuickStart","TestVariations","SimulateRealTimeUpdates","BasicUsage","WithRealAPIData","ErrorHandling"];export{p as AllFeatures,y as BasicUsage,c as Default,A as ErrorHandling,S as PrototypeQuickStart,v as SimulateRealTimeUpdates,m as StateApproved,g as StateExpired,l as StatePending,u as StateRejected,f as TestVariations,x as WithRealAPIData,O as __namedExportsOrder,M as default};
