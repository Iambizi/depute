import{j as n}from"./jsx-runtime-u17CrQMm.js";import{r as P}from"./iframe-DLl0a6ph.js";import{V as z}from"./a11y-CKuWmtce.js";import"./preload-helper-PPVm8Dsz.js";const O="_policyBanner_1qlzf_4",H="_severityInfo_1qlzf_16",F="_severityWarning_1qlzf_23",G="_severityCritical_1qlzf_30",U="_header_1qlzf_49",Y="_liveIndicator_1qlzf_62",J="_modeBadge_1qlzf_87",K="_description_1qlzf_106",Q="_spacer_1qlzf_119",X="_viewPolicyBtn_1qlzf_127",Z="_collapseBtn_1qlzf_154",ee="_constraints_1qlzf_183",ne="_constraint_1qlzf_183",ae="_constraintLabel_1qlzf_204",te="_constraintValue_1qlzf_213",e={policyBanner:O,severityInfo:H,severityWarning:F,severityCritical:G,header:U,liveIndicator:Y,modeBadge:J,description:K,spacer:Q,viewPolicyBtn:X,collapseBtn:Z,constraints:ee,constraint:ne,constraintLabel:ae,constraintValue:te},se={sandbox:"info",staging:"warning",production:"critical",simulation:"info",test:"info",drafting:"info",executing:"critical"},ie={sandbox:"Sandbox",staging:"Staging",production:"Production",simulation:"Simulation",test:"Test",drafting:"Drafting",executing:"Executing"},C={info:e.severityInfo,warning:e.severityWarning,critical:e.severityCritical};function q({mode:i,label:L,description:t,severity:D,constraints:s,collapsible:B=!1,collapsed:$,onToggleCollapse:E,onViewPolicy:M,showLiveIndicator:I,className:R}){const[V,k]=P.useState(!1),o=$??V,r=D??se[i],l=L??ie[i],W=I??(i==="production"||i==="executing"),A=()=>{E?E():k(a=>!a)},j=P.useMemo(()=>`Policy: ${l}${t?` — ${t}`:""}`,[l,t]);return n.jsxs("div",{className:`${e.policyBanner} ${C[r]} ${R??""}`,role:"status","aria-label":j,children:[n.jsxs("div",{className:e.header,children:[W&&n.jsx("span",{className:`${e.liveIndicator} ${C[r]}`,"aria-hidden":"true"}),n.jsx("span",{className:`${e.modeBadge} ${C[r]}`,children:l}),t&&n.jsx("span",{className:e.description,children:t}),n.jsx("span",{className:e.spacer}),M&&n.jsx("button",{type:"button",className:e.viewPolicyBtn,onClick:M,"aria-label":"View full policy details",children:"View Policy"}),B&&n.jsx("button",{type:"button",className:e.collapseBtn,onClick:A,"aria-expanded":!o,"aria-label":o?"Expand policy details":"Collapse policy details",children:o?"▸":"▾"})]}),s&&s.length>0&&!o&&n.jsx("div",{className:e.constraints,role:"list","aria-label":"Active policy constraints",children:s.map(a=>n.jsxs("div",{className:e.constraint,role:"listitem",children:[n.jsx("span",{className:e.constraintLabel,children:a.label}),n.jsx("span",{className:e.constraintValue,children:a.value})]},a.label))}),n.jsx(z,{children:`Current operating policy: ${l}. Severity: ${r}.${s?` Constraints: ${s.map(a=>`${a.label}: ${a.value}`).join(", ")}.`:""}`})]})}q.__docgenInfo={description:"",methods:[],displayName:"PolicyBanner",props:{mode:{required:!0,tsType:{name:"union",raw:`| 'sandbox'
| 'staging'
| 'production'
| 'simulation'
| 'test'
| 'drafting'
| 'executing'`,elements:[{name:"literal",value:"'sandbox'"},{name:"literal",value:"'staging'"},{name:"literal",value:"'production'"},{name:"literal",value:"'simulation'"},{name:"literal",value:"'test'"},{name:"literal",value:"'drafting'"},{name:"literal",value:"'executing'"}]},description:"The current operating mode/environment"},label:{required:!1,tsType:{name:"string"},description:"Human-readable label override (defaults to mode name)"},description:{required:!1,tsType:{name:"string"},description:"Short description of the active policy"},severity:{required:!1,tsType:{name:"union",raw:"'info' | 'warning' | 'critical'",elements:[{name:"literal",value:"'info'"},{name:"literal",value:"'warning'"},{name:"literal",value:"'critical'"}]},description:"Visual severity — controls color treatment (auto-detected from mode if omitted)"},constraints:{required:!1,tsType:{name:"Array",elements:[{name:"PolicyConstraint"}],raw:"PolicyConstraint[]"},description:"Active policy constraints to display"},collapsible:{required:!1,tsType:{name:"boolean"},description:"Whether the banner can be collapsed (default: false — always visible)",defaultValue:{value:"false",computed:!1}},collapsed:{required:!1,tsType:{name:"boolean"},description:"Whether the banner is currently collapsed"},onToggleCollapse:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Called when collapse toggle is clicked"},onViewPolicy:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:'Called when the user clicks "View Full Policy"'},showLiveIndicator:{required:!1,tsType:{name:"boolean"},description:"Whether to show a pulsing indicator for live/production modes"},className:{required:!1,tsType:{name:"string"},description:"Additional CSS class"}}};const de={title:"v2 — Compliance & Forensics/PolicyBanner",component:q,parameters:{layout:"padded",docs:{description:{component:"A persistent banner that visually anchors the agent's current operating policy, ensuring the human supervisor knows whether they are overseeing a sandbox, staging, or production environment."}}},tags:["autodocs"],argTypes:{mode:{control:"select",options:["sandbox","staging","production","simulation","test","drafting","executing"],description:"The current operating mode/environment"},severity:{control:"select",options:["info","warning","critical"],description:"Visual severity (auto-detected from mode if omitted)"},collapsible:{control:"boolean",description:"Whether the constraints section can be collapsed"},showLiveIndicator:{control:"boolean",description:"Show a pulsing indicator for live modes"}}},c={args:{mode:"sandbox",description:"No real transactions will be executed",constraints:[{label:"Max Spend",value:"$0"},{label:"Network",value:"TestNet"}]}},d={args:{mode:"sandbox",description:"Isolated sandbox environment — all actions are simulated",constraints:[{label:"Transfers",value:"Disabled"},{label:"Network",value:"TestNet"}]}},u={args:{mode:"staging",description:"Pre-production environment — data may persist",constraints:[{label:"Max Spend",value:"$100"},{label:"Scope",value:"Read + Write"}]}},p={args:{mode:"production",description:"Live environment — all actions are irreversible",constraints:[{label:"Max Spend",value:"$5,000"},{label:"Scope",value:"Full Access"},{label:"Audit Log",value:"Enabled"}]}},m={args:{mode:"simulation",description:"Running simulated agent workflow — no side effects"}},g={name:"Test",args:{mode:"test",description:"Unit test harness — mock backends only"}},v={args:{mode:"drafting",description:"Contract in draft mode — terms not yet binding",constraints:[{label:"Status",value:"Non-binding"}]}},b={args:{mode:"executing",description:"Active execution — contract terms are legally binding",constraints:[{label:"Status",value:"Binding"},{label:"Signatory",value:"Required"}]}},y={name:"With View Policy Button",args:{mode:"production",description:"Live trading environment",constraints:[{label:"Max Trade",value:"$10,000"},{label:"Allowed Pairs",value:"BTC/USD, ETH/USD"}],onViewPolicy:()=>alert("Opening full policy document...")}},f={args:{mode:"staging",description:"Deployment staging pipeline",collapsible:!0,constraints:[{label:"Target",value:"us-east-1"},{label:"Max Instances",value:"3"},{label:"Rollback",value:"Auto"},{label:"Approval",value:"Required for prod"}]}},x={name:"Custom Label (TestNet / MainNet)",args:{mode:"sandbox",label:"TestNet",description:"Sepolia testnet — no real ETH will be spent",constraints:[{label:"Chain",value:"Sepolia"},{label:"Gas",value:"Free (Faucet)"}]}},h={args:{mode:"production",label:"MainNet",description:"Ethereum mainnet — all transactions are final",constraints:[{label:"Chain",value:"ETH Mainnet"},{label:"Max Gas",value:"50 Gwei"},{label:"Max Spend",value:"0.5 ETH"}]}},S={name:"Minimal (Mode Only)",args:{mode:"sandbox"}},w={name:"Production Without Live Indicator",args:{mode:"production",description:"Review mode — execution paused",showLiveIndicator:!1}},_={name:"💰 Fintech: Trading Dashboard",args:{mode:"production",label:"Live Trading",description:"Connected to NYSE — market hours active",constraints:[{label:"Max Position",value:"$25,000"},{label:"Daily Loss Limit",value:"$2,500"},{label:"Instruments",value:"Equities, Options"}],onViewPolicy:()=>alert("Opening risk management policy...")}},T={name:"🔧 DevOps: Deployment Pipeline",args:{mode:"staging",label:"Staging",description:"Pre-prod deployment — changes require manual promotion",collapsible:!0,constraints:[{label:"Region",value:"us-east-1"},{label:"Writes",value:"DB read-only"},{label:"Deploy",value:"Manual approval"}]}},N={name:"👥 HR: Candidate Screening",args:{mode:"simulation",label:"Simulation",description:"Dry run — no emails will be sent to candidates",constraints:[{label:"Emails",value:"Disabled"},{label:"Records",value:"Read-only"},{label:"Max Candidates",value:"50"}]}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    mode: 'sandbox',
    description: 'No real transactions will be executed',
    constraints: [{
      label: 'Max Spend',
      value: '$0'
    }, {
      label: 'Network',
      value: 'TestNet'
    }]
  }
}`,...c.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    mode: 'sandbox',
    description: 'Isolated sandbox environment — all actions are simulated',
    constraints: [{
      label: 'Transfers',
      value: 'Disabled'
    }, {
      label: 'Network',
      value: 'TestNet'
    }]
  }
}`,...d.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    mode: 'staging',
    description: 'Pre-production environment — data may persist',
    constraints: [{
      label: 'Max Spend',
      value: '$100'
    }, {
      label: 'Scope',
      value: 'Read + Write'
    }]
  }
}`,...u.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    mode: 'production',
    description: 'Live environment — all actions are irreversible',
    constraints: [{
      label: 'Max Spend',
      value: '$5,000'
    }, {
      label: 'Scope',
      value: 'Full Access'
    }, {
      label: 'Audit Log',
      value: 'Enabled'
    }]
  }
}`,...p.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    mode: 'simulation',
    description: 'Running simulated agent workflow — no side effects'
  }
}`,...m.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  name: 'Test',
  args: {
    mode: 'test',
    description: 'Unit test harness — mock backends only'
  }
}`,...g.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    mode: 'drafting',
    description: 'Contract in draft mode — terms not yet binding',
    constraints: [{
      label: 'Status',
      value: 'Non-binding'
    }]
  }
}`,...v.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    mode: 'executing',
    description: 'Active execution — contract terms are legally binding',
    constraints: [{
      label: 'Status',
      value: 'Binding'
    }, {
      label: 'Signatory',
      value: 'Required'
    }]
  }
}`,...b.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  name: 'With View Policy Button',
  args: {
    mode: 'production',
    description: 'Live trading environment',
    constraints: [{
      label: 'Max Trade',
      value: '$10,000'
    }, {
      label: 'Allowed Pairs',
      value: 'BTC/USD, ETH/USD'
    }],
    onViewPolicy: () => alert('Opening full policy document...')
  }
}`,...y.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    mode: 'staging',
    description: 'Deployment staging pipeline',
    collapsible: true,
    constraints: [{
      label: 'Target',
      value: 'us-east-1'
    }, {
      label: 'Max Instances',
      value: '3'
    }, {
      label: 'Rollback',
      value: 'Auto'
    }, {
      label: 'Approval',
      value: 'Required for prod'
    }]
  }
}`,...f.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  name: 'Custom Label (TestNet / MainNet)',
  args: {
    mode: 'sandbox',
    label: 'TestNet',
    description: 'Sepolia testnet — no real ETH will be spent',
    constraints: [{
      label: 'Chain',
      value: 'Sepolia'
    }, {
      label: 'Gas',
      value: 'Free (Faucet)'
    }]
  }
}`,...x.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    mode: 'production',
    label: 'MainNet',
    description: 'Ethereum mainnet — all transactions are final',
    constraints: [{
      label: 'Chain',
      value: 'ETH Mainnet'
    }, {
      label: 'Max Gas',
      value: '50 Gwei'
    }, {
      label: 'Max Spend',
      value: '0.5 ETH'
    }]
  }
}`,...h.parameters?.docs?.source}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  name: 'Minimal (Mode Only)',
  args: {
    mode: 'sandbox'
  }
}`,...S.parameters?.docs?.source}}};w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  name: 'Production Without Live Indicator',
  args: {
    mode: 'production',
    description: 'Review mode — execution paused',
    showLiveIndicator: false
  }
}`,...w.parameters?.docs?.source}}};_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  name: '💰 Fintech: Trading Dashboard',
  args: {
    mode: 'production',
    label: 'Live Trading',
    description: 'Connected to NYSE — market hours active',
    constraints: [{
      label: 'Max Position',
      value: '$25,000'
    }, {
      label: 'Daily Loss Limit',
      value: '$2,500'
    }, {
      label: 'Instruments',
      value: 'Equities, Options'
    }],
    onViewPolicy: () => alert('Opening risk management policy...')
  }
}`,..._.parameters?.docs?.source}}};T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  name: '🔧 DevOps: Deployment Pipeline',
  args: {
    mode: 'staging',
    label: 'Staging',
    description: 'Pre-prod deployment — changes require manual promotion',
    collapsible: true,
    constraints: [{
      label: 'Region',
      value: 'us-east-1'
    }, {
      label: 'Writes',
      value: 'DB read-only'
    }, {
      label: 'Deploy',
      value: 'Manual approval'
    }]
  }
}`,...T.parameters?.docs?.source}}};N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  name: '👥 HR: Candidate Screening',
  args: {
    mode: 'simulation',
    label: 'Simulation',
    description: 'Dry run — no emails will be sent to candidates',
    constraints: [{
      label: 'Emails',
      value: 'Disabled'
    }, {
      label: 'Records',
      value: 'Read-only'
    }, {
      label: 'Max Candidates',
      value: '50'
    }]
  }
}`,...N.parameters?.docs?.source}}};const ue=["Default","Sandbox","Staging","Production","Simulation","TestMode","Drafting","Executing","WithViewPolicy","Collapsible","WithCustomLabel","MainNet","MinimalBanner","NoLiveIndicator","FintechExample","DevOpsExample","HRExample"];export{f as Collapsible,c as Default,T as DevOpsExample,v as Drafting,b as Executing,_ as FintechExample,N as HRExample,h as MainNet,S as MinimalBanner,w as NoLiveIndicator,p as Production,d as Sandbox,m as Simulation,u as Staging,g as TestMode,x as WithCustomLabel,y as WithViewPolicy,ue as __namedExportsOrder,de as default};
