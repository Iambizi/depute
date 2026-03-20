import{j as e}from"./jsx-runtime-u17CrQMm.js";import{r as h}from"./iframe-Os096Vc4.js";import{d as r}from"./mockData-DOQp8R7v.js";import"./preload-helper-PPVm8Dsz.js";const f="_base_71x6m_3",v="_header_71x6m_14",A="_icon_71x6m_23",_="_headerText_71x6m_28",y="_title_71x6m_34",w="_subtitle_71x6m_40",T="_badge_71x6m_45",j="_body_71x6m_57",D="_detailRow_71x6m_64",k="_detailLabel_71x6m_76",N="_detailValue_71x6m_87",S="_tagList_71x6m_93",C="_toolTag_71x6m_99",q="_costRow_71x6m_109",R="_costItem_71x6m_117",B="_costLabel_71x6m_123",L="_costValue_71x6m_131",z="_actions_71x6m_138",O="_btnApprove_71x6m_145",G="_btnDeny_71x6m_146",t={base:f,header:v,icon:A,headerText:_,title:y,subtitle:w,badge:T,body:j,detailRow:D,detailLabel:k,detailValue:N,tagList:S,toolTag:C,costRow:q,costItem:R,costLabel:B,costValue:L,actions:z,btnApprove:O,btnDeny:G},x=({className:s,requestingAgent:n,proposedSubagent:a,onApprove:i,onDeny:o})=>e.jsxs("div",{className:`${t.base} ${s||""}`,role:"alertdialog","aria-modal":"true","aria-label":`${n} is requesting to spawn a new agent`,children:[e.jsxs("div",{className:t.header,children:[e.jsx("span",{className:t.icon,"aria-hidden":"true",children:"⊕"}),e.jsxs("div",{className:t.headerText,children:[e.jsx("span",{className:t.title,children:"Agent Spawn Request"}),e.jsxs("span",{className:t.subtitle,children:[e.jsx("strong",{children:n})," wants to delegate a task"]})]}),e.jsx("span",{className:t.badge,children:"Delegation Gate"})]}),e.jsxs("div",{className:t.body,children:[e.jsxs("div",{className:t.detailRow,children:[e.jsx("span",{className:t.detailLabel,children:"Role"}),e.jsx("span",{className:t.detailValue,children:a.role})]}),e.jsxs("div",{className:t.detailRow,children:[e.jsx("span",{className:t.detailLabel,children:"Mandate"}),e.jsx("span",{className:t.detailValue,children:a.mandate})]}),a.allowedTools&&a.allowedTools.length>0&&e.jsxs("div",{className:t.detailRow,children:[e.jsx("span",{className:t.detailLabel,children:"Allowed Tools"}),e.jsx("div",{className:t.tagList,children:a.allowedTools.map(d=>e.jsx("span",{className:t.toolTag,children:d},d))})]}),a.maxDepth!=null&&e.jsxs("div",{className:t.detailRow,children:[e.jsx("span",{className:t.detailLabel,children:"Max Depth"}),e.jsxs("span",{className:t.detailValue,children:[a.maxDepth," levels"]})]}),e.jsxs("div",{className:t.costRow,children:[e.jsxs("div",{className:t.costItem,children:[e.jsx("span",{className:t.costLabel,children:"Est. Tokens"}),e.jsx("span",{className:t.costValue,children:a.estimatedTokens.toLocaleString()})]}),e.jsxs("div",{className:t.costItem,children:[e.jsx("span",{className:t.costLabel,children:"Est. Cost"}),e.jsx("span",{className:t.costValue,children:a.estimatedCost})]})]})]}),e.jsxs("div",{className:t.actions,children:[e.jsx("button",{className:t.btnApprove,onClick:i,children:"Approve Spawn"}),e.jsx("button",{className:t.btnDeny,onClick:o,children:"Deny"})]})]});x.__docgenInfo={description:`DelegationGate intercepts an Orchestrator's request to spawn a new sub-agent.
This is a decision gate (Y/N) focused on authorizing new autonomous capacity.`,methods:[],displayName:"DelegationGate",props:{className:{required:!1,tsType:{name:"string"},description:"The root layout class name"},requestingAgent:{required:!0,tsType:{name:"string"},description:"The agent requesting to spawn a new sub-agent"},proposedSubagent:{required:!0,tsType:{name:"signature",type:"object",raw:`{
  role: string;
  mandate: string;
  allowedTools?: string[];
  maxDepth?: number;
  estimatedTokens: number;
  estimatedCost: string;
}`,signature:{properties:[{key:"role",value:{name:"string",required:!0}},{key:"mandate",value:{name:"string",required:!0}},{key:"allowedTools",value:{name:"Array",elements:[{name:"string"}],raw:"string[]",required:!1}},{key:"maxDepth",value:{name:"number",required:!1}},{key:"estimatedTokens",value:{name:"number",required:!0}},{key:"estimatedCost",value:{name:"string",required:!0}}]}},description:"Details about the sub-agent being proposed"},onApprove:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Called when user approves the spawn"},onDeny:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Called when user denies the spawn"}}};const M={title:"AX Components v1/DelegationGate",component:x,tags:["autodocs"]},l={args:{...r(),onApprove:void 0,onDeny:void 0}},c={name:"State: No Tool Constraints",args:{...r(),proposedSubagent:{role:"Summarizer",mandate:"Summarize the 12 research papers in the /docs folder",estimatedTokens:8e3,estimatedCost:"$0.12"},onApprove:void 0,onDeny:void 0}},p={name:"State: High Cost Request",args:{...r(),proposedSubagent:{role:"Data Analyst",mandate:"Analyze and visualize all 500,000 rows of the transactions dataset",allowedTools:["query_db","execute_code","write_file"],maxDepth:3,estimatedTokens:15e4,estimatedCost:"$2.25"},onApprove:void 0,onDeny:void 0}},m={name:"Prototype: Approve / Deny Gate",render:()=>{const[s,n]=h.useState(null),a=r();return s?e.jsxs("div",{style:{fontFamily:"sans-serif",fontSize:"13px",padding:"16px",background:"#f9fafb",borderRadius:"8px",border:"1px solid #e5e7eb"},children:["Outcome: ",e.jsx("strong",{children:s}),e.jsx("button",{onClick:()=>n(null),style:{marginLeft:"12px",cursor:"pointer",padding:"4px 10px",border:"1px solid #e5e7eb",borderRadius:"4px",fontSize:"11px"},children:"↺ Try Again"})]}):e.jsx(x,{...a,onApprove:()=>n("Spawn approved — new agent is launching"),onDeny:()=>n("Spawn denied — task returned to orchestrator")})}},u={name:"Basic Usage",args:{requestingAgent:"Orchestrator-Prime",proposedSubagent:{role:"Code Writer",mandate:"Write and test a data migration script for the users table",allowedTools:["bash","read_file","write_file","run_tests"],maxDepth:1,estimatedTokens:18e3,estimatedCost:"$0.27"},onApprove:void 0,onDeny:void 0}},g={name:"Composition: With AutomationBiasAlert",render:()=>{const{isAlertTriggered:s,recordAction:n,dismissAlert:a}=require("../src/hooks").useAutomationBias({consecutiveApprovals:2}),[i,o]=h.useState(null),d=r();if(i)return e.jsxs("div",{style:{fontFamily:"sans-serif",fontSize:"13px",padding:"16px",background:"#f9fafb",borderRadius:"8px",border:"1px solid #e5e7eb"},children:["Outcome: ",e.jsx("strong",{children:i}),e.jsx("button",{onClick:()=>{o(null),n("approved")},style:{marginLeft:"12px",cursor:"pointer",padding:"4px 10px",border:"1px solid #e5e7eb",borderRadius:"4px",fontSize:"11px"},children:"↺ Trigger Another Spawn"})]});const b=require("../src/components/AutomationBiasAlert").AutomationBiasAlert;return e.jsxs("div",{style:{maxWidth:"600px"},children:[e.jsxs("p",{style:{fontSize:"12px",color:"#666",marginBottom:"16px",fontFamily:"sans-serif"},children:[e.jsx("strong",{children:"Tip:"})," Approve twice in a row to trigger the Automation Bias friction layer."]}),e.jsx(b,{isActive:s,onAcknowledge:a,actionName:"the spawning of a new autonomous agent",children:e.jsx(x,{...d,onApprove:()=>{n("approved"),o("Spawn approved!")},onDeny:()=>{n("rejected"),o("Spawn denied.")}})})]})}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    ...generateMockDelegationGate(),
    onApprove: undefined,
    onDeny: undefined
  }
}`,...l.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  name: 'State: No Tool Constraints',
  args: {
    ...generateMockDelegationGate(),
    proposedSubagent: {
      role: 'Summarizer',
      mandate: 'Summarize the 12 research papers in the /docs folder',
      estimatedTokens: 8000,
      estimatedCost: '$0.12'
    },
    onApprove: undefined,
    onDeny: undefined
  }
}`,...c.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  name: 'State: High Cost Request',
  args: {
    ...generateMockDelegationGate(),
    proposedSubagent: {
      role: 'Data Analyst',
      mandate: 'Analyze and visualize all 500,000 rows of the transactions dataset',
      allowedTools: ['query_db', 'execute_code', 'write_file'],
      maxDepth: 3,
      estimatedTokens: 150000,
      estimatedCost: '$2.25'
    },
    onApprove: undefined,
    onDeny: undefined
  }
}`,...p.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  name: 'Prototype: Approve / Deny Gate',
  render: () => {
    const [outcome, setOutcome] = useState<string | null>(null);
    const data = generateMockDelegationGate();
    if (outcome) {
      return <div style={{
        fontFamily: 'sans-serif',
        fontSize: '13px',
        padding: '16px',
        background: '#f9fafb',
        borderRadius: '8px',
        border: '1px solid #e5e7eb'
      }}>
          Outcome: <strong>{outcome}</strong>
          <button onClick={() => setOutcome(null)} style={{
          marginLeft: '12px',
          cursor: 'pointer',
          padding: '4px 10px',
          border: '1px solid #e5e7eb',
          borderRadius: '4px',
          fontSize: '11px'
        }}>
            ↺ Try Again
          </button>
        </div>;
    }
    return <DelegationGate {...data} onApprove={() => setOutcome('Spawn approved — new agent is launching')} onDeny={() => setOutcome('Spawn denied — task returned to orchestrator')} />;
  }
}`,...m.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  name: 'Basic Usage',
  args: {
    requestingAgent: 'Orchestrator-Prime',
    proposedSubagent: {
      role: 'Code Writer',
      mandate: 'Write and test a data migration script for the users table',
      allowedTools: ['bash', 'read_file', 'write_file', 'run_tests'],
      maxDepth: 1,
      estimatedTokens: 18000,
      estimatedCost: '$0.27'
    },
    onApprove: undefined,
    onDeny: undefined
  }
}`,...u.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
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
    const [outcome, setOutcome] = useState<string | null>(null);
    const data = generateMockDelegationGate();
    if (outcome) {
      return <div style={{
        fontFamily: 'sans-serif',
        fontSize: '13px',
        padding: '16px',
        background: '#f9fafb',
        borderRadius: '8px',
        border: '1px solid #e5e7eb'
      }}>
          Outcome: <strong>{outcome}</strong>
          <button onClick={() => {
          setOutcome(null);
          recordAction('approved');
        }} style={{
          marginLeft: '12px',
          cursor: 'pointer',
          padding: '4px 10px',
          border: '1px solid #e5e7eb',
          borderRadius: '4px',
          fontSize: '11px'
        }}>
            ↺ Trigger Another Spawn
          </button>
        </div>;
    }
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
          <strong>Tip:</strong> Approve twice in a row to trigger the Automation Bias friction layer.
        </p>
        <AutomationBiasAlert isActive={isAlertTriggered} onAcknowledge={dismissAlert} actionName="the spawning of a new autonomous agent">
          <DelegationGate {...data} onApprove={() => {
          recordAction('approved');
          setOutcome('Spawn approved!');
        }} onDeny={() => {
          recordAction('rejected');
          setOutcome('Spawn denied.');
        }} />
        </AutomationBiasAlert>
      </div>;
  }
}`,...g.parameters?.docs?.source}}};const F=["Default","NoTools","HighCost","PrototypeInteractive","BasicUsage","WithAutomationBiasAlert"];export{u as BasicUsage,l as Default,p as HighCost,c as NoTools,m as PrototypeInteractive,g as WithAutomationBiasAlert,F as __namedExportsOrder,M as default};
