import{j as e}from"./jsx-runtime-u17CrQMm.js";import{r as x}from"./iframe-B_jp5fYY.js";import{d as c}from"./mockData-DOQp8R7v.js";import"./preload-helper-PPVm8Dsz.js";const h="_base_71x6m_3",_="_header_71x6m_14",b="_icon_71x6m_23",v="_headerText_71x6m_28",y="_title_71x6m_34",f="_subtitle_71x6m_40",w="_badge_71x6m_45",D="_body_71x6m_57",T="_detailRow_71x6m_64",j="_detailLabel_71x6m_76",N="_detailValue_71x6m_87",k="_tagList_71x6m_93",A="_toolTag_71x6m_99",C="_costRow_71x6m_109",S="_costItem_71x6m_117",q="_costLabel_71x6m_123",R="_costValue_71x6m_131",L="_actions_71x6m_138",z="_btnApprove_71x6m_145",G="_btnDeny_71x6m_146",a={base:h,header:_,icon:b,headerText:v,title:y,subtitle:f,badge:w,body:D,detailRow:T,detailLabel:j,detailValue:N,tagList:k,toolTag:A,costRow:C,costItem:S,costLabel:q,costValue:R,actions:L,btnApprove:z,btnDeny:G},m=({className:n,requestingAgent:s,proposedSubagent:t,onApprove:u,onDeny:g})=>e.jsxs("div",{className:`${a.base} ${n||""}`,role:"alertdialog","aria-modal":"true","aria-label":`${s} is requesting to spawn a new agent`,children:[e.jsxs("div",{className:a.header,children:[e.jsx("span",{className:a.icon,"aria-hidden":"true",children:"⊕"}),e.jsxs("div",{className:a.headerText,children:[e.jsx("span",{className:a.title,children:"Agent Spawn Request"}),e.jsxs("span",{className:a.subtitle,children:[e.jsx("strong",{children:s})," wants to delegate a task"]})]}),e.jsx("span",{className:a.badge,children:"Delegation Gate"})]}),e.jsxs("div",{className:a.body,children:[e.jsxs("div",{className:a.detailRow,children:[e.jsx("span",{className:a.detailLabel,children:"Role"}),e.jsx("span",{className:a.detailValue,children:t.role})]}),e.jsxs("div",{className:a.detailRow,children:[e.jsx("span",{className:a.detailLabel,children:"Mandate"}),e.jsx("span",{className:a.detailValue,children:t.mandate})]}),t.allowedTools&&t.allowedTools.length>0&&e.jsxs("div",{className:a.detailRow,children:[e.jsx("span",{className:a.detailLabel,children:"Allowed Tools"}),e.jsx("div",{className:a.tagList,children:t.allowedTools.map(p=>e.jsx("span",{className:a.toolTag,children:p},p))})]}),t.maxDepth!=null&&e.jsxs("div",{className:a.detailRow,children:[e.jsx("span",{className:a.detailLabel,children:"Max Depth"}),e.jsxs("span",{className:a.detailValue,children:[t.maxDepth," levels"]})]}),e.jsxs("div",{className:a.costRow,children:[e.jsxs("div",{className:a.costItem,children:[e.jsx("span",{className:a.costLabel,children:"Est. Tokens"}),e.jsx("span",{className:a.costValue,children:t.estimatedTokens.toLocaleString()})]}),e.jsxs("div",{className:a.costItem,children:[e.jsx("span",{className:a.costLabel,children:"Est. Cost"}),e.jsx("span",{className:a.costValue,children:t.estimatedCost})]})]})]}),e.jsxs("div",{className:a.actions,children:[e.jsx("button",{className:a.btnApprove,onClick:u,children:"Approve Spawn"}),e.jsx("button",{className:a.btnDeny,onClick:g,children:"Deny"})]})]});m.__docgenInfo={description:`DelegationGate intercepts an Orchestrator's request to spawn a new sub-agent.
This is a decision gate (Y/N) focused on authorizing new autonomous capacity.`,methods:[],displayName:"DelegationGate",props:{className:{required:!1,tsType:{name:"string"},description:"The root layout class name"},requestingAgent:{required:!0,tsType:{name:"string"},description:"The agent requesting to spawn a new sub-agent"},proposedSubagent:{required:!0,tsType:{name:"signature",type:"object",raw:`{
  role: string;
  mandate: string;
  allowedTools?: string[];
  maxDepth?: number;
  estimatedTokens: number;
  estimatedCost: string;
}`,signature:{properties:[{key:"role",value:{name:"string",required:!0}},{key:"mandate",value:{name:"string",required:!0}},{key:"allowedTools",value:{name:"Array",elements:[{name:"string"}],raw:"string[]",required:!1}},{key:"maxDepth",value:{name:"number",required:!1}},{key:"estimatedTokens",value:{name:"number",required:!0}},{key:"estimatedCost",value:{name:"string",required:!0}}]}},description:"Details about the sub-agent being proposed"},onApprove:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Called when user approves the spawn"},onDeny:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Called when user denies the spawn"}}};const M={title:"AX Components v1/DelegationGate",component:m,tags:["autodocs"]},o={args:{...c(),onApprove:void 0,onDeny:void 0}},r={name:"State: No Tool Constraints",args:{...c(),proposedSubagent:{role:"Summarizer",mandate:"Summarize the 12 research papers in the /docs folder",estimatedTokens:8e3,estimatedCost:"$0.12"},onApprove:void 0,onDeny:void 0}},i={name:"State: High Cost Request",args:{...c(),proposedSubagent:{role:"Data Analyst",mandate:"Analyze and visualize all 500,000 rows of the transactions dataset",allowedTools:["query_db","execute_code","write_file"],maxDepth:3,estimatedTokens:15e4,estimatedCost:"$2.25"},onApprove:void 0,onDeny:void 0}},l={name:"Prototype: Approve / Deny Gate",render:()=>{const[n,s]=x.useState(null),t=c();return n?e.jsxs("div",{style:{fontFamily:"sans-serif",fontSize:"13px",padding:"16px",background:"#f9fafb",borderRadius:"8px",border:"1px solid #e5e7eb"},children:["Outcome: ",e.jsx("strong",{children:n}),e.jsx("button",{onClick:()=>s(null),style:{marginLeft:"12px",cursor:"pointer",padding:"4px 10px",border:"1px solid #e5e7eb",borderRadius:"4px",fontSize:"11px"},children:"↺ Try Again"})]}):e.jsx(m,{...t,onApprove:()=>s("Spawn approved — new agent is launching"),onDeny:()=>s("Spawn denied — task returned to orchestrator")})}},d={name:"Basic Usage",args:{requestingAgent:"Orchestrator-Prime",proposedSubagent:{role:"Code Writer",mandate:"Write and test a data migration script for the users table",allowedTools:["bash","read_file","write_file","run_tests"],maxDepth:1,estimatedTokens:18e3,estimatedCost:"$0.27"},onApprove:void 0,onDeny:void 0}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    ...generateMockDelegationGate(),
    onApprove: undefined,
    onDeny: undefined
  }
}`,...o.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
}`,...r.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
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
}`,...i.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
}`,...l.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
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
}`,...d.parameters?.docs?.source}}};const P=["Default","NoTools","HighCost","PrototypeInteractive","BasicUsage"];export{d as BasicUsage,o as Default,i as HighCost,r as NoTools,l as PrototypeInteractive,P as __namedExportsOrder,M as default};
