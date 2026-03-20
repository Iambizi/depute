import{j as t}from"./jsx-runtime-u17CrQMm.js";import{r as d}from"./iframe-Os096Vc4.js";import{V as U}from"./a11y-F8BY1ugJ.js";import"./preload-helper-PPVm8Dsz.js";const H="_severityNormal_1kppw_8",O="_severityElevated_1kppw_15",W="_severityCritical_1kppw_22",G="_severityExceeded_1kppw_29",Q="_budgetMeter_1kppw_40",Y="_header_1kppw_53",z="_label_1kppw_60",J="_severityBadge_1kppw_66",K="_barContainer_1kppw_82",X="_barFill_1kppw_91",Z="_values_1kppw_120",ee="_valueSpent_1kppw_127",ae="_valueSeparator_1kppw_133",te="_valueLimit_1kppw_138",re="_valuePercentage_1kppw_144",ne="_metadata_1kppw_155",se="_metaItem_1kppw_163",ie="_metaLabel_1kppw_169",oe="_metaValue_1kppw_173",ce="_budgetMeterCompact_1kppw_183",le="_compactLabel_1kppw_194",me="_compactValue_1kppw_200",ue="_compactSeparator_1kppw_207",de="_compactBar_1kppw_212",pe="_compactBarFill_1kppw_220",a={severityNormal:H,severityElevated:O,severityCritical:W,severityExceeded:G,budgetMeter:Q,header:Y,label:z,severityBadge:J,barContainer:K,barFill:X,values:Z,valueSpent:ee,valueSeparator:ae,valueLimit:te,valuePercentage:re,metadata:ne,metaItem:se,metaLabel:ie,metaValue:oe,budgetMeterCompact:ce,compactLabel:le,compactValue:me,compactSeparator:ue,compactBar:de,compactBarFill:pe};function ge(e,n,s,T){if(n<=0)return"exceeded";const i=e/n*100;return i>=100?"exceeded":i>=T?"critical":i>=s?"elevated":"normal"}const c={normal:a.severityNormal,elevated:a.severityElevated,critical:a.severityCritical,exceeded:a.severityExceeded},M={normal:"Within budget",elevated:"Approaching limit",critical:"Near limit",exceeded:"Budget exceeded"},ve=e=>e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:e.toLocaleString();function L({label:e,spent:n,limit:s,unit:T,formatValue:i=ve,burnRate:S,formatBurnRate:V,estimatedTimeRemaining:$,elevatedThreshold:P=60,criticalThreshold:A=85,severity:D,onBudgetExceeded:N,onCriticalThreshold:R,compact:I=!1,className:F}){const r=D??ge(n,s,P,A),o=d.useMemo(()=>s>0?Math.min(n/s*100,100):100,[n,s]),E=d.useRef(r);d.useEffect(()=>{const j=E.current;E.current=r,r==="exceeded"&&j!=="exceeded"&&N?.(),r==="critical"&&j!=="critical"&&R?.()},[r,N,R]);const m=i(n),u=i(s),w=S!=null?V?V(S):`${i(S)}/min`:null,B=d.useMemo(()=>`${e}: ${m} of ${u} used (${Math.round(o)}%). ${M[r]}.`,[e,m,u,o,r]);return I?t.jsxs("div",{className:`${a.budgetMeterCompact} ${c[r]} ${F??""}`,role:"meter","aria-label":B,"aria-valuenow":n,"aria-valuemin":0,"aria-valuemax":s,children:[t.jsx("span",{className:a.compactLabel,children:e}),t.jsxs("span",{className:a.compactValue,children:[m,t.jsx("span",{className:a.compactSeparator,children:"/"}),u]}),t.jsx("div",{className:a.compactBar,children:t.jsx("div",{className:`${a.compactBarFill} ${c[r]}`,style:{width:`${o}%`}})})]}):t.jsxs("div",{className:`${a.budgetMeter} ${c[r]} ${F??""}`,role:"meter","aria-label":B,"aria-valuenow":n,"aria-valuemin":0,"aria-valuemax":s,children:[t.jsxs("div",{className:a.header,children:[t.jsx("span",{className:a.label,children:e}),t.jsx("span",{className:`${a.severityBadge} ${c[r]}`,children:M[r]})]}),t.jsx("div",{className:a.barContainer,children:t.jsx("div",{className:`${a.barFill} ${c[r]}`,style:{width:`${o}%`},"aria-hidden":"true"})}),t.jsxs("div",{className:a.values,children:[t.jsx("span",{className:a.valueSpent,children:m}),t.jsx("span",{className:a.valueSeparator,children:"of"}),t.jsx("span",{className:a.valueLimit,children:u}),t.jsxs("span",{className:a.valuePercentage,children:["(",Math.round(o),"%)"]})]}),(w||$)&&t.jsxs("div",{className:a.metadata,children:[w&&t.jsxs("span",{className:a.metaItem,children:[t.jsx("span",{className:a.metaLabel,children:"Burn rate"}),t.jsx("span",{className:a.metaValue,children:w})]}),$&&t.jsxs("span",{className:a.metaItem,children:[t.jsx("span",{className:a.metaLabel,children:"Est. remaining"}),t.jsx("span",{className:a.metaValue,children:$})]})]}),t.jsx(U,{children:B})]})}L.__docgenInfo={description:"",methods:[],displayName:"BudgetMeter",props:{label:{required:!0,tsType:{name:"string"},description:'Human-readable label (e.g. "Session Budget", "Token Allowance")'},spent:{required:!0,tsType:{name:"number"},description:"Current amount spent/consumed"},limit:{required:!0,tsType:{name:"number"},description:"Maximum budget allowance"},unit:{required:!0,tsType:{name:"union",raw:"'currency' | 'tokens' | 'api-calls' | 'compute' | 'custom'",elements:[{name:"literal",value:"'currency'"},{name:"literal",value:"'tokens'"},{name:"literal",value:"'api-calls'"},{name:"literal",value:"'compute'"},{name:"literal",value:"'custom'"}]},description:"Unit of measurement"},formatValue:{required:!1,tsType:{name:"signature",type:"function",raw:"(value: number) => string",signature:{arguments:[{type:{name:"number"},name:"value"}],return:{name:"string"}}},description:'Display format for the value (e.g. "$1,250", "3.2k tokens") — if omitted, raw number is shown',defaultValue:{value:"(value: number): string => {\n  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;\n  if (value >= 1_000) return `${(value / 1_000).toFixed(1)}k`;\n  return value.toLocaleString();\n}",computed:!1}},burnRate:{required:!1,tsType:{name:"number"},description:"Current burn rate per minute (optional)"},formatBurnRate:{required:!1,tsType:{name:"signature",type:"function",raw:"(rate: number) => string",signature:{arguments:[{type:{name:"number"},name:"rate"}],return:{name:"string"}}},description:"Format function for burn rate display"},estimatedTimeRemaining:{required:!1,tsType:{name:"string"},description:'Estimated time remaining at current burn rate (human-readable, e.g. "~12 min")'},elevatedThreshold:{required:!1,tsType:{name:"number"},description:'Threshold percentage for "elevated" severity (default: 60)',defaultValue:{value:"60",computed:!1}},criticalThreshold:{required:!1,tsType:{name:"number"},description:'Threshold percentage for "critical" severity (default: 85)',defaultValue:{value:"85",computed:!1}},severity:{required:!1,tsType:{name:"union",raw:"'normal' | 'elevated' | 'critical' | 'exceeded'",elements:[{name:"literal",value:"'normal'"},{name:"literal",value:"'elevated'"},{name:"literal",value:"'critical'"},{name:"literal",value:"'exceeded'"}]},description:"Override auto-calculated severity"},onBudgetExceeded:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Called when budget is fully consumed"},onCriticalThreshold:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Called when budget crosses the critical threshold"},compact:{required:!1,tsType:{name:"boolean"},description:"Whether to show a compact inline variant (default: false)",defaultValue:{value:"false",computed:!1}},className:{required:!1,tsType:{name:"string"},description:"Additional CSS class"}}};const ye={title:"v2 — Compliance & Forensics/BudgetMeter",component:L,parameters:{layout:"padded",docs:{description:{component:"A visual gauge showing session budget vs. burn rate. Designed for delegation scenarios where humans give agents a spending/usage limit and let them run autonomously within bounds."}}},tags:["autodocs"],argTypes:{unit:{control:"select",options:["currency","tokens","api-calls","compute","custom"]},severity:{control:"select",options:[void 0,"normal","elevated","critical","exceeded"]},compact:{control:"boolean"}}},l=e=>`$${e.toLocaleString()}`,q=e=>e>=1e6?`${(e/1e6).toFixed(1)}M tok`:e>=1e3?`${(e/1e3).toFixed(1)}k tok`:`${e} tok`,p={args:{label:"Session Budget",spent:250,limit:1e3,unit:"currency",formatValue:l}},g={args:{label:"API Budget",spent:120,limit:500,unit:"api-calls",formatValue:e=>`${e} calls`}},v={args:{label:"Token Allowance",spent:65e4,limit:1e6,unit:"tokens",formatValue:q,burnRate:2500,formatBurnRate:e=>`${(e/1e3).toFixed(1)}k tok/min`,estimatedTimeRemaining:"~2 hr 20 min"}},f={args:{label:"Session Spend",spent:4250,limit:5e3,unit:"currency",formatValue:l,burnRate:12,formatBurnRate:e=>`$${e}/min`,estimatedTimeRemaining:"~62 min"}},b={args:{label:"Compute Budget",spent:1100,limit:1e3,unit:"compute",formatValue:e=>`${e} GPU-hrs`}},_={name:"Compact — Normal",args:{label:"Budget",spent:150,limit:500,unit:"currency",formatValue:l,compact:!0}},h={name:"Compact — Critical",args:{label:"Tokens",spent:89e4,limit:1e6,unit:"tokens",formatValue:q,compact:!0}},y={name:"💰 Fintech: Max Session Spend",args:{label:"Trading Session",spent:3200,limit:5e3,unit:"currency",formatValue:l,burnRate:45,formatBurnRate:e=>`$${e}/min`,estimatedTimeRemaining:"~40 min"}},x={name:"🔧 DevOps: Compute Quota",args:{label:"Daily Compute",spent:340,limit:500,unit:"compute",formatValue:e=>`${e} vCPU-hrs`,burnRate:8,formatBurnRate:e=>`${e} vCPU-hrs/min`}},C={name:"👥 HR: Candidate Processing",args:{label:"Candidate Batch",spent:38,limit:50,unit:"custom",formatValue:e=>`${e} candidates`,burnRate:2,formatBurnRate:e=>`${e} candidates/min`,estimatedTimeRemaining:"~6 min"}},k={name:"With Exceeded Callback",args:{label:"Monitored Budget",spent:980,limit:1e3,unit:"currency",formatValue:l,onBudgetExceeded:()=>alert("⚠️ Budget exceeded! Agent will be paused."),onCriticalThreshold:()=>console.log("Critical threshold reached")}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Session Budget',
    spent: 250,
    limit: 1000,
    unit: 'currency',
    formatValue: currencyFormat
  }
}`,...p.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'API Budget',
    spent: 120,
    limit: 500,
    unit: 'api-calls',
    formatValue: v => \`\${v} calls\`
  }
}`,...g.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Token Allowance',
    spent: 650_000,
    limit: 1_000_000,
    unit: 'tokens',
    formatValue: tokenFormat,
    burnRate: 2500,
    formatBurnRate: r => \`\${(r / 1000).toFixed(1)}k tok/min\`,
    estimatedTimeRemaining: '~2 hr 20 min'
  }
}`,...v.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Session Spend',
    spent: 4250,
    limit: 5000,
    unit: 'currency',
    formatValue: currencyFormat,
    burnRate: 12,
    formatBurnRate: r => \`$\${r}/min\`,
    estimatedTimeRemaining: '~62 min'
  }
}`,...f.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Compute Budget',
    spent: 1100,
    limit: 1000,
    unit: 'compute',
    formatValue: v => \`\${v} GPU-hrs\`
  }
}`,...b.parameters?.docs?.source}}};_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  name: 'Compact — Normal',
  args: {
    label: 'Budget',
    spent: 150,
    limit: 500,
    unit: 'currency',
    formatValue: currencyFormat,
    compact: true
  }
}`,..._.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  name: 'Compact — Critical',
  args: {
    label: 'Tokens',
    spent: 890_000,
    limit: 1_000_000,
    unit: 'tokens',
    formatValue: tokenFormat,
    compact: true
  }
}`,...h.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  name: '💰 Fintech: Max Session Spend',
  args: {
    label: 'Trading Session',
    spent: 3200,
    limit: 5000,
    unit: 'currency',
    formatValue: currencyFormat,
    burnRate: 45,
    formatBurnRate: r => \`$\${r}/min\`,
    estimatedTimeRemaining: '~40 min'
  }
}`,...y.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  name: '🔧 DevOps: Compute Quota',
  args: {
    label: 'Daily Compute',
    spent: 340,
    limit: 500,
    unit: 'compute',
    formatValue: v => \`\${v} vCPU-hrs\`,
    burnRate: 8,
    formatBurnRate: r => \`\${r} vCPU-hrs/min\`
  }
}`,...x.parameters?.docs?.source}}};C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  name: '👥 HR: Candidate Processing',
  args: {
    label: 'Candidate Batch',
    spent: 38,
    limit: 50,
    unit: 'custom',
    formatValue: v => \`\${v} candidates\`,
    burnRate: 2,
    formatBurnRate: r => \`\${r} candidates/min\`,
    estimatedTimeRemaining: '~6 min'
  }
}`,...C.parameters?.docs?.source}}};k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  name: 'With Exceeded Callback',
  args: {
    label: 'Monitored Budget',
    spent: 980,
    limit: 1000,
    unit: 'currency',
    formatValue: currencyFormat,
    onBudgetExceeded: () => alert('⚠️ Budget exceeded! Agent will be paused.'),
    onCriticalThreshold: () => console.log('Critical threshold reached')
  }
}`,...k.parameters?.docs?.source}}};const xe=["Default","Normal","Elevated","Critical","Exceeded","CompactNormal","CompactCritical","FintechTrading","DevOpsCompute","HRScreening","WithCallbacks"];export{h as CompactCritical,_ as CompactNormal,f as Critical,p as Default,x as DevOpsCompute,v as Elevated,b as Exceeded,y as FintechTrading,C as HRScreening,g as Normal,k as WithCallbacks,xe as __namedExportsOrder,ye as default};
