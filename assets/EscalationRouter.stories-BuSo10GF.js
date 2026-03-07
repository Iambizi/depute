import{j as e}from"./jsx-runtime-u17CrQMm.js";import{r as f}from"./iframe-C-UiW1EA.js";import{e as r}from"./mockData-DOQp8R7v.js";import"./preload-helper-PPVm8Dsz.js";const k="_base_7dyxk_3",T="_header_7dyxk_14",C="_icon_7dyxk_23",j="_headerText_7dyxk_28",B="_title_7dyxk_34",E="_subtitle_7dyxk_40",N="_failedBadge_7dyxk_45",w="_errorBox_7dyxk_58",O="_errorSummary_7dyxk_63",L="_traceSection_7dyxk_71",A="_traceToggle_7dyxk_75",M="_chevron_7dyxk_95",q="_chevronOpen_7dyxk_100",I="_trace_7dyxk_71",P="_recommendation_7dyxk_118",W="_recLabel_7dyxk_127",U="_recValue_7dyxk_135",$="_actions_7dyxk_142",z="_btnRetry_7dyxk_149",F="_btnReassign_7dyxk_150",V="_btnCancel_7dyxk_151",n={base:k,header:T,icon:C,headerText:j,title:B,subtitle:E,failedBadge:N,errorBox:w,errorSummary:O,traceSection:L,traceToggle:A,chevron:M,chevronOpen:q,trace:I,recommendation:P,recLabel:W,recValue:U,actions:$,btnRetry:z,btnReassign:F,btnCancel:V},h=({className:o,failedAgent:a,branchId:s,errorSummary:R,errorTrace:x,recommendation:c,onRetry:_,onReassign:v,onCancelBranch:b})=>{const[t,S]=f.useState(!1);return e.jsxs("div",{className:`${n.base} ${o||""}`,role:"alertdialog","aria-modal":"true","aria-label":`Escalation: ${a} failed`,children:[e.jsxs("div",{className:n.header,children:[e.jsxs("svg",{className:n.icon,width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",children:[e.jsx("path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"}),e.jsx("line",{x1:"12",y1:"9",x2:"12",y2:"13"}),e.jsx("line",{x1:"12",y1:"17",x2:"12.01",y2:"17"})]}),e.jsxs("div",{className:n.headerText,children:[e.jsx("span",{className:n.title,children:"Agent Failure Escalated"}),e.jsxs("span",{className:n.subtitle,children:[e.jsx("strong",{children:a}),s?` · branch ${s}`:""]})]}),e.jsx("span",{className:n.failedBadge,children:"Failed"})]}),e.jsx("div",{className:n.errorBox,children:e.jsx("p",{className:n.errorSummary,children:R})}),x&&e.jsxs("div",{className:n.traceSection,children:[e.jsxs("button",{className:n.traceToggle,onClick:()=>S(!t),"aria-expanded":t,children:[e.jsx("span",{className:`${n.chevron} ${t?n.chevronOpen:""}`,children:"▶"}),t?"Hide":"Show"," Error Trace"]}),t&&e.jsx("pre",{className:n.trace,children:x})]}),c&&e.jsxs("div",{className:n.recommendation,children:[e.jsx("span",{className:n.recLabel,children:"System Recommendation"}),e.jsxs("span",{className:n.recValue,children:[c==="retry"&&"↺ Retry with same agent",c==="reassign"&&"⇄ Reassign to different agent",c==="cancel"&&"⊘ Cancel this branch"]})]}),e.jsxs("div",{className:n.actions,children:[e.jsx("button",{className:n.btnRetry,onClick:_,children:"↺ Retry"}),e.jsx("button",{className:n.btnReassign,onClick:v,children:"⇄ Reassign"}),e.jsx("button",{className:n.btnCancel,onClick:b,children:"⊘ Cancel Branch"})]})]})};h.__docgenInfo={description:`EscalationRouter surfaces a leaf-agent failure to the human, with the failure trace
and options to retry, reassign to a different agent, or cancel the whole branch.`,methods:[],displayName:"EscalationRouter",props:{className:{required:!1,tsType:{name:"string"},description:"The root layout class name"},failedAgent:{required:!0,tsType:{name:"string"},description:"The agent that failed"},branchId:{required:!1,tsType:{name:"string"},description:"The branch this agent belongs to"},errorSummary:{required:!0,tsType:{name:"string"},description:"Human-readable summary of the error"},errorTrace:{required:!1,tsType:{name:"string"},description:"Partial stack trace or tool output that led to failure"},recommendation:{required:!1,tsType:{name:"union",raw:"'retry' | 'reassign' | 'cancel'",elements:[{name:"literal",value:"'retry'"},{name:"literal",value:"'reassign'"},{name:"literal",value:"'cancel'"}]},description:"System recommendation for how to resolve"},onRetry:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onReassign:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onCancelBranch:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}};const G={title:"AX Components v1/EscalationRouter",component:h,tags:["autodocs"],argTypes:{recommendation:{control:"select",options:["retry","reassign","cancel",void 0]}}},i={args:{...r(),onRetry:void 0,onReassign:void 0,onCancelBranch:void 0}},d={name:"State: With Error Trace",args:{...r({errorTrace:`TypeError: Cannot read properties of undefined (reading 'id')
  at processOutput (/agent/runner.js:248:18)
  at async AgentLoop.step (/agent/runner.js:112:5)`}),onRetry:void 0,onReassign:void 0,onCancelBranch:void 0}},l={name:"State: No Error Trace",args:{...r({errorTrace:void 0}),onRetry:void 0,onReassign:void 0,onCancelBranch:void 0}},m={name:"State: Recommend Retry",args:{...r({recommendation:"retry"}),onRetry:void 0,onReassign:void 0,onCancelBranch:void 0}},u={name:"State: Recommend Reassign",args:{...r({recommendation:"reassign"}),onRetry:void 0,onReassign:void 0,onCancelBranch:void 0}},g={name:"State: Recommend Cancel Branch",args:{...r({recommendation:"cancel"}),onRetry:void 0,onReassign:void 0,onCancelBranch:void 0}},p={name:"Prototype: Interactive Resolution",render:()=>{const[o,a]=f.useState(null),s=r();return o?e.jsxs("div",{style:{fontFamily:"sans-serif",fontSize:"13px",padding:"16px",background:"#f9fafb",borderRadius:"8px",border:"1px solid #e5e7eb"},children:["Resolution chosen: ",e.jsx("strong",{children:o}),e.jsx("button",{onClick:()=>a(null),style:{marginLeft:"12px",cursor:"pointer",padding:"4px 10px",border:"1px solid #e5e7eb",borderRadius:"4px",fontSize:"11px"},children:"↺ Reset"})]}):e.jsx(h,{...s,onRetry:()=>a("↺ Retrying same agent"),onReassign:()=>a("⇄ Reassigning to a different agent"),onCancelBranch:()=>a("⊘ Branch cancelled")})}},y={name:"Basic Usage",args:{failedAgent:"Code-Writer-1",branchId:"branch-3a",errorSummary:"Tool call `call_api` returned a 503 Service Unavailable after 3 retries. Agent cannot continue without external API access.",errorTrace:`MaxRetriesExceeded: call_api failed after 3 attempts
  Last response: 503 {"message":"Service temporarily unavailable"}`,recommendation:"retry",onRetry:void 0,onReassign:void 0,onCancelBranch:void 0}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    ...generateMockEscalation(),
    onRetry: undefined,
    onReassign: undefined,
    onCancelBranch: undefined
  }
}`,...i.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  name: 'State: With Error Trace',
  args: {
    ...generateMockEscalation({
      errorTrace: \`TypeError: Cannot read properties of undefined (reading 'id')\\n  at processOutput (/agent/runner.js:248:18)\\n  at async AgentLoop.step (/agent/runner.js:112:5)\`
    }),
    onRetry: undefined,
    onReassign: undefined,
    onCancelBranch: undefined
  }
}`,...d.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  name: 'State: No Error Trace',
  args: {
    ...generateMockEscalation({
      errorTrace: undefined
    }),
    onRetry: undefined,
    onReassign: undefined,
    onCancelBranch: undefined
  }
}`,...l.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  name: 'State: Recommend Retry',
  args: {
    ...generateMockEscalation({
      recommendation: 'retry'
    }),
    onRetry: undefined,
    onReassign: undefined,
    onCancelBranch: undefined
  }
}`,...m.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  name: 'State: Recommend Reassign',
  args: {
    ...generateMockEscalation({
      recommendation: 'reassign'
    }),
    onRetry: undefined,
    onReassign: undefined,
    onCancelBranch: undefined
  }
}`,...u.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  name: 'State: Recommend Cancel Branch',
  args: {
    ...generateMockEscalation({
      recommendation: 'cancel'
    }),
    onRetry: undefined,
    onReassign: undefined,
    onCancelBranch: undefined
  }
}`,...g.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  name: 'Prototype: Interactive Resolution',
  render: () => {
    const [outcome, setOutcome] = useState<string | null>(null);
    const data = generateMockEscalation();
    if (outcome) {
      return <div style={{
        fontFamily: 'sans-serif',
        fontSize: '13px',
        padding: '16px',
        background: '#f9fafb',
        borderRadius: '8px',
        border: '1px solid #e5e7eb'
      }}>
          Resolution chosen: <strong>{outcome}</strong>
          <button onClick={() => setOutcome(null)} style={{
          marginLeft: '12px',
          cursor: 'pointer',
          padding: '4px 10px',
          border: '1px solid #e5e7eb',
          borderRadius: '4px',
          fontSize: '11px'
        }}>
            ↺ Reset
          </button>
        </div>;
    }
    return <EscalationRouter {...data} onRetry={() => setOutcome('↺ Retrying same agent')} onReassign={() => setOutcome('⇄ Reassigning to a different agent')} onCancelBranch={() => setOutcome('⊘ Branch cancelled')} />;
  }
}`,...p.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  name: 'Basic Usage',
  args: {
    failedAgent: 'Code-Writer-1',
    branchId: 'branch-3a',
    errorSummary: 'Tool call \`call_api\` returned a 503 Service Unavailable after 3 retries. Agent cannot continue without external API access.',
    errorTrace: \`MaxRetriesExceeded: call_api failed after 3 attempts\\n  Last response: 503 {"message":"Service temporarily unavailable"}\`,
    recommendation: 'retry',
    onRetry: undefined,
    onReassign: undefined,
    onCancelBranch: undefined
  }
}`,...y.parameters?.docs?.source}}};const J=["Default","WithTrace","NoTrace","RecommendRetry","RecommendReassign","RecommendCancel","PrototypeInteractive","BasicUsage"];export{y as BasicUsage,i as Default,l as NoTrace,p as PrototypeInteractive,g as RecommendCancel,u as RecommendReassign,m as RecommendRetry,d as WithTrace,J as __namedExportsOrder,G as default};
