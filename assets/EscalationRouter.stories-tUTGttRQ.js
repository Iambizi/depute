import{r as y,j as e}from"./iframe-DV2IyA73.js";import{e as r}from"./mockData-DOQp8R7v.js";import"./preload-helper-PPVm8Dsz.js";const T="_base_lm5dw_3",C="_header_lm5dw_14",B="_icon_lm5dw_23",w="_headerText_lm5dw_28",j="_title_lm5dw_34",E="_subtitle_lm5dw_40",N="_failedBadge_lm5dw_45",k="_errorBox_lm5dw_58",O="_errorSummary_lm5dw_63",A="_traceSection_lm5dw_71",L="_traceToggle_lm5dw_75",M="_chevron_lm5dw_95",q="_chevronOpen_lm5dw_100",I="_trace_lm5dw_71",P="_recommendation_lm5dw_118",U="_recLabel_lm5dw_127",W="_recValue_lm5dw_135",$="_actions_lm5dw_142",z="_btnRetry_lm5dw_149",F="_btnReassign_lm5dw_150",V="_btnCancel_lm5dw_151",n={base:T,header:C,icon:B,headerText:w,title:j,subtitle:E,failedBadge:N,errorBox:k,errorSummary:O,traceSection:A,traceToggle:L,chevron:M,chevronOpen:q,trace:I,recommendation:P,recLabel:U,recValue:W,actions:$,btnRetry:z,btnReassign:F,btnCancel:V},R=({className:s,failedAgent:a,branchId:o,errorSummary:_,errorTrace:f,recommendation:c,onRetry:x,onReassign:v,onCancelBranch:b})=>{const[t,S]=y.useState(!1);return e.jsxs("div",{className:`${n.base} ${s||""}`,role:"alertdialog","aria-modal":"true","aria-label":`Escalation: ${a} failed`,children:[e.jsxs("div",{className:n.header,children:[e.jsx("span",{className:n.icon,"aria-hidden":"true",children:"⚠"}),e.jsxs("div",{className:n.headerText,children:[e.jsx("span",{className:n.title,children:"Agent Failure Escalated"}),e.jsxs("span",{className:n.subtitle,children:[e.jsx("strong",{children:a}),o?` · branch ${o}`:""]})]}),e.jsx("span",{className:n.failedBadge,children:"Failed"})]}),e.jsx("div",{className:n.errorBox,children:e.jsx("p",{className:n.errorSummary,children:_})}),f&&e.jsxs("div",{className:n.traceSection,children:[e.jsxs("button",{className:n.traceToggle,onClick:()=>S(!t),"aria-expanded":t,children:[e.jsx("span",{className:`${n.chevron} ${t?n.chevronOpen:""}`,children:"▶"}),t?"Hide":"Show"," Error Trace"]}),t&&e.jsx("pre",{className:n.trace,children:f})]}),c&&e.jsxs("div",{className:n.recommendation,children:[e.jsx("span",{className:n.recLabel,children:"System Recommendation"}),e.jsxs("span",{className:n.recValue,children:[c==="retry"&&"↺ Retry with same agent",c==="reassign"&&"⇄ Reassign to different agent",c==="cancel"&&"⊘ Cancel this branch"]})]}),e.jsxs("div",{className:n.actions,children:[e.jsx("button",{className:n.btnRetry,onClick:x,children:"↺ Retry"}),e.jsx("button",{className:n.btnReassign,onClick:v,children:"⇄ Reassign"}),e.jsx("button",{className:n.btnCancel,onClick:b,children:"⊘ Cancel Branch"})]})]})};R.__docgenInfo={description:`EscalationRouter surfaces a leaf-agent failure to the human, with the failure trace
and options to retry, reassign to a different agent, or cancel the whole branch.`,methods:[],displayName:"EscalationRouter",props:{className:{required:!1,tsType:{name:"string"},description:"The root layout class name"},failedAgent:{required:!0,tsType:{name:"string"},description:"The agent that failed"},branchId:{required:!1,tsType:{name:"string"},description:"The branch this agent belongs to"},errorSummary:{required:!0,tsType:{name:"string"},description:"Human-readable summary of the error"},errorTrace:{required:!1,tsType:{name:"string"},description:"Partial stack trace or tool output that led to failure"},recommendation:{required:!1,tsType:{name:"union",raw:"'retry' | 'reassign' | 'cancel'",elements:[{name:"literal",value:"'retry'"},{name:"literal",value:"'reassign'"},{name:"literal",value:"'cancel'"}]},description:"System recommendation for how to resolve"},onRetry:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onReassign:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onCancelBranch:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}};const G={title:"AX Components v1/EscalationRouter",component:R,tags:["autodocs"],argTypes:{recommendation:{control:"select",options:["retry","reassign","cancel",void 0]}}},i={args:{...r(),onRetry:void 0,onReassign:void 0,onCancelBranch:void 0}},d={name:"State: With Error Trace",args:{...r({errorTrace:`TypeError: Cannot read properties of undefined (reading 'id')
  at processOutput (/agent/runner.js:248:18)
  at async AgentLoop.step (/agent/runner.js:112:5)`}),onRetry:void 0,onReassign:void 0,onCancelBranch:void 0}},l={name:"State: No Error Trace",args:{...r({errorTrace:void 0}),onRetry:void 0,onReassign:void 0,onCancelBranch:void 0}},m={name:"State: Recommend Retry",args:{...r({recommendation:"retry"}),onRetry:void 0,onReassign:void 0,onCancelBranch:void 0}},u={name:"State: Recommend Reassign",args:{...r({recommendation:"reassign"}),onRetry:void 0,onReassign:void 0,onCancelBranch:void 0}},g={name:"State: Recommend Cancel Branch",args:{...r({recommendation:"cancel"}),onRetry:void 0,onReassign:void 0,onCancelBranch:void 0}},p={name:"Prototype: Interactive Resolution",render:()=>{const[s,a]=y.useState(null),o=r();return s?e.jsxs("div",{style:{fontFamily:"sans-serif",fontSize:"13px",padding:"16px",background:"#f9fafb",borderRadius:"8px",border:"1px solid #e5e7eb"},children:["Resolution chosen: ",e.jsx("strong",{children:s}),e.jsx("button",{onClick:()=>a(null),style:{marginLeft:"12px",cursor:"pointer",padding:"4px 10px",border:"1px solid #e5e7eb",borderRadius:"4px",fontSize:"11px"},children:"↺ Reset"})]}):e.jsx(R,{...o,onRetry:()=>a("↺ Retrying same agent"),onReassign:()=>a("⇄ Reassigning to a different agent"),onCancelBranch:()=>a("⊘ Branch cancelled")})}},h={name:"Basic Usage",args:{failedAgent:"Code-Writer-1",branchId:"branch-3a",errorSummary:"Tool call `call_api` returned a 503 Service Unavailable after 3 retries. Agent cannot continue without external API access.",errorTrace:`MaxRetriesExceeded: call_api failed after 3 attempts
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
}`,...p.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
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
}`,...h.parameters?.docs?.source}}};const J=["Default","WithTrace","NoTrace","RecommendRetry","RecommendReassign","RecommendCancel","PrototypeInteractive","BasicUsage"];export{h as BasicUsage,i as Default,l as NoTrace,p as PrototypeInteractive,g as RecommendCancel,u as RecommendReassign,m as RecommendRetry,d as WithTrace,J as __namedExportsOrder,G as default};
