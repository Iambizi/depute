import{j as e}from"./jsx-runtime-u17CrQMm.js";import{r as a}from"./iframe-DLl0a6ph.js";import{A as l}from"./ApprovalGate-CsTk3zbV.js";import{a as s,M as b}from"./mockData-DOQp8R7v.js";import"./preload-helper-PPVm8Dsz.js";import"./common-DpQzTmW8.js";import"./a11y-CKuWmtce.js";const W={title:"AX Components/ApprovalGate",component:l,tags:["autodocs"],argTypes:{mode:{control:"select",options:["simple","staged"]},status:{control:"select",options:["pending","approved","rejected","expired"]},confidence:{control:{type:"range",min:0,max:100,step:1}},timeoutSeconds:{control:{type:"number",min:0}}}},m={args:s({status:"pending",mode:"simple"})},u={args:s({mode:"staged",status:"pending",timeoutSeconds:120,scope:{resourceLimit:"$500",durationSeconds:600,target:"Stripe API only"},metadata:{"Initiated by":"Agent v2.1","Risk level":"Medium"}})},g={name:"State: Pending",args:s({status:"pending"})},S={name:"State: Approved",args:s({status:"approved"})},A={name:"State: Rejected",args:s({status:"rejected"})},f={name:"State: Expired (Countdown)",args:s({status:"pending",timeoutSeconds:30})},v={name:"Quick Start: Prototype Approval Flow",render:()=>{const r=s({status:"pending",mode:"simple"}),[i,t]=a.useState("pending");return e.jsx(l,{...r,status:i,onApprove:()=>t("approved"),onReject:()=>t("rejected")})}},x={name:"Test Different Approval Scenarios",render:()=>{const[r,i]=a.useState(0),[t,n]=a.useState("pending"),o=b[r%b.length],p=c=>{i(c),n("pending")};return e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"1rem"},children:[e.jsx("div",{style:{display:"flex",gap:"0.5rem",flexWrap:"wrap",fontFamily:"sans-serif",fontSize:"0.75rem"},children:b.map((c,d)=>e.jsx("button",{onClick:()=>p(d),style:{padding:"0.25rem 0.625rem",border:"1px solid #ccc",borderRadius:"4px",background:r===d?"#1d4ed8":"#fff",color:r===d?"#fff":"#333",cursor:"pointer"},children:c.title},d))}),e.jsx(l,{title:o.title,description:o.description,agentReasoning:"This action is required to complete the current workflow step.",status:t,mode:"simple",confidence:75,onApprove:()=>n("approved"),onReject:()=>n("rejected")})]})}},h={name:"Simulate Real-Time Updates — Staged Mode",render:()=>{const r=s({mode:"staged",status:"pending",confidence:72}),[i,t]=a.useState("pending"),[n,o]=a.useState(0);return e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"1rem"},children:[a.createElement(l,{...r,key:n,status:i,onApprove:()=>t("approved"),onReject:()=>t("rejected")}),e.jsx("button",{onClick:()=>{t("pending"),o(p=>p+1)},style:{padding:"0.5rem 1rem",border:"1px solid #ccc",borderRadius:"4px",cursor:"pointer",fontFamily:"sans-serif"},children:"↺ Reset"})]})}},y={name:"Basic Usage",args:{title:"Send external email",description:"The agent will send a follow-up email to 3 recipients.",agentReasoning:"The task requires notifying stakeholders of the completed analysis.",status:"pending",mode:"simple",confidence:88}},R={name:"With Real API Data — Scoped Grant",args:{title:"Submit refund via Stripe",description:"A refund of $47.99 will be issued to the customer's original payment method.",agentReasoning:"Customer requested refund within the 30-day policy window. Eligibility confirmed.",status:"pending",mode:"simple",confidence:96,scope:{resourceLimit:"$100",durationSeconds:300,target:"Stripe API — /v1/refunds only"},metadata:{"Order ID":"ORD-28471",Customer:"jane.doe@example.com","Refund amount":"$47.99"}}},k={name:"Error Handling — Expired Gate",args:{title:"Delete archived records",description:"This action will permanently delete 842 archived records older than 2 years.",agentReasoning:"Records meet the data retention policy threshold for deletion.",status:"expired",mode:"simple",confidence:62,timeoutSeconds:60}},j={name:"Composition: With AutomationBiasAlert",render:()=>{const{isAlertTriggered:r,recordAction:i,dismissAlert:t}=require("../src/hooks").useAutomationBias({consecutiveApprovals:2}),[n,o]=a.useState("pending"),[p,c]=a.useState(0),d=()=>{i("approved"),o("approved"),c(P=>P+1)},w=()=>{o("pending")},C=require("../src/components/AutomationBiasAlert").AutomationBiasAlert;return e.jsxs("div",{style:{maxWidth:"600px"},children:[e.jsxs("p",{style:{fontSize:"12px",color:"#666",marginBottom:"16px",fontFamily:"sans-serif"},children:[e.jsx("strong",{children:"Approvals:"})," ",p," | ",e.jsx("strong",{children:"Tip:"})," Approve twice in a row to trigger the Automation Bias alert."]}),e.jsx(C,{isActive:r,onAcknowledge:t,actionName:"the deployment of this script",children:e.jsx(l,{...s({status:n,title:"Production Script Deployment"}),onApprove:d,onReject:()=>o("rejected")})}),n!=="pending"&&e.jsx("button",{onClick:w,style:{marginTop:"1rem",padding:"0.4rem 0.8rem",border:"1px solid #ccc",borderRadius:"4px",cursor:"pointer",fontSize:"12px"},children:"↺ Reset for next action"})]})}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: generateMockApproval({
    status: 'pending',
    mode: 'simple'
  })
}`,...m.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
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
}`,...u.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  name: 'State: Pending',
  args: generateMockApproval({
    status: 'pending'
  })
}`,...g.parameters?.docs?.source}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  name: 'State: Approved',
  args: generateMockApproval({
    status: 'approved'
  })
}`,...S.parameters?.docs?.source}}};A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  name: 'State: Rejected',
  args: generateMockApproval({
    status: 'rejected'
  })
}`,...A.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  name: 'State: Expired (Countdown)',
  args: generateMockApproval({
    status: 'pending',
    timeoutSeconds: 30
  })
}`,...f.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  name: 'Quick Start: Prototype Approval Flow',
  render: () => {
    const base = generateMockApproval({
      status: 'pending',
      mode: 'simple'
    });
    const [status, setStatus] = useState<'pending' | 'approved' | 'rejected' | 'expired'>('pending');
    return <ApprovalGate {...base} status={status} onApprove={() => setStatus('approved')} onReject={() => setStatus('rejected')} />;
  }
}`,...v.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
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
}`,...x.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
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
}`,...h.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  name: 'Basic Usage',
  args: {
    title: 'Send external email',
    description: 'The agent will send a follow-up email to 3 recipients.',
    agentReasoning: 'The task requires notifying stakeholders of the completed analysis.',
    status: 'pending',
    mode: 'simple',
    confidence: 88
  }
}`,...y.parameters?.docs?.source}}};R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
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
}`,...R.parameters?.docs?.source}}};k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
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
}`,...k.parameters?.docs?.source}}};j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  name: 'Composition: With AutomationBiasAlert',
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const {
      isAlertTriggered,
      recordAction,
      dismissAlert
    } = require('../src/hooks').useAutomationBias({
      consecutiveApprovals: 2 // Trigger fast for demo
    });
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [status, setStatus] = useState<'pending' | 'approved' | 'rejected' | 'expired'>('pending');
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [count, setCount] = useState(0);
    const handleApprove = () => {
      recordAction('approved');
      setStatus('approved');
      setCount(prev => prev + 1);
    };
    const handleReset = () => {
      setStatus('pending');
    };
    const AutomationBiasAlert = require('../src/components/AutomationBiasAlert').AutomationBiasAlert;
    return <div style={{
      maxWidth: '600px'
    }}>
        <p style={{
        fontSize: '12px',
        color: '#666',
        marginBottom: '16px',
        fontFamily: 'sans-serif'
      }}>
          <strong>Approvals:</strong> {count} | <strong>Tip:</strong> Approve twice in a row to trigger the Automation Bias alert.
        </p>
        <AutomationBiasAlert isActive={isAlertTriggered} onAcknowledge={dismissAlert} actionName="the deployment of this script">
          <ApprovalGate {...generateMockApproval({
          status,
          title: 'Production Script Deployment'
        })} onApprove={handleApprove} onReject={() => setStatus('rejected')} />
        </AutomationBiasAlert>
        {status !== 'pending' && <button onClick={handleReset} style={{
        marginTop: '1rem',
        padding: '0.4rem 0.8rem',
        border: '1px solid #ccc',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '12px'
      }}>
            ↺ Reset for next action
          </button>}
      </div>;
  }
}`,...j.parameters?.docs?.source}}};const q=["Default","AllFeatures","StatePending","StateApproved","StateRejected","StateExpired","PrototypeQuickStart","TestVariations","SimulateRealTimeUpdates","BasicUsage","WithRealAPIData","ErrorHandling","WithAutomationBiasAlert"];export{u as AllFeatures,y as BasicUsage,m as Default,k as ErrorHandling,v as PrototypeQuickStart,h as SimulateRealTimeUpdates,S as StateApproved,f as StateExpired,g as StatePending,A as StateRejected,x as TestVariations,j as WithAutomationBiasAlert,R as WithRealAPIData,q as __namedExportsOrder,W as default};
