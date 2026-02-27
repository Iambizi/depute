import{j as a}from"./iframe-D3fIoj3q.js";import{k as r}from"./mockData-DOQp8R7v.js";import"./preload-helper-PPVm8Dsz.js";const x="_card_1a5vp_3",B="_card_idle_1a5vp_30",N="_card_working_1a5vp_31",j="_card_blocked_1a5vp_32",W="_card_failed_1a5vp_33",$="_card_completed_1a5vp_34",P="_header_1a5vp_37",U="_identity_1a5vp_44",D="_nameBlock_1a5vp_51",F="_name_1a5vp_51",I="_role_1a5vp_66",M="_headerRight_1a5vp_73",R="_dot_1a5vp_81",q="_dotIdle_1a5vp_88",A="_dotWorking_1a5vp_89",G="_dotBlocked_1a5vp_90",L="_dotFailed_1a5vp_91",O="_dotCompleted_1a5vp_92",H="_dotPulsing_1a5vp_94",z="_scPulse_1a5vp_1",J="_statusBadge_1a5vp_104",V="_badge_idle_1a5vp_113",X="_badge_working_1a5vp_114",E="_badge_blocked_1a5vp_115",K="_badge_failed_1a5vp_116",Q="_badge_completed_1a5vp_117",Y="_expandBtn_1a5vp_120",Z="_task_1a5vp_141",ee="_progressRow_1a5vp_151",ae="_progressBar_1a5vp_157",te="_progressFill_1a5vp_165",se="_progressLabel_1a5vp_172",re="_footer_1a5vp_180",ne="_tokenCount_1a5vp_184",e={card:x,card_idle:B,card_working:N,card_blocked:j,card_failed:W,card_completed:$,header:P,identity:U,nameBlock:D,name:F,role:I,headerRight:M,dot:R,dotIdle:q,dotWorking:A,dotBlocked:G,dotFailed:L,dotCompleted:O,dotPulsing:H,scPulse:z,statusBadge:J,badge_idle:V,badge_working:X,badge_blocked:E,badge_failed:K,badge_completed:Q,expandBtn:Y,task:Z,progressRow:ee,progressBar:ae,progressFill:te,progressLabel:se,footer:re,tokenCount:ne},oe={idle:e.dotIdle,working:e.dotWorking,blocked:e.dotBlocked,failed:e.dotFailed,completed:e.dotCompleted},y={idle:"Idle",working:"Working",blocked:"Blocked",failed:"Failed",completed:"Done"},v=({className:d,agentName:S,role:f,status:t,currentTask:n,planStepCount:l,planStepsCompleted:C=0,tokensUsed:h,onExpand:s})=>{const T=l!=null&&l>0,w=T?Math.round(C/l*100):0;return a.jsxs("div",{className:`${e.card} ${e[`card_${t}`]??""} ${d||""}`,role:s?"button":void 0,tabIndex:s?0:void 0,onClick:s,onKeyDown:s?o=>{(o.key==="Enter"||o.key===" ")&&(o.preventDefault(),s())}:void 0,"aria-label":`${S}, ${y[t]??t}${n?`, ${n}`:""}`,children:[a.jsxs("div",{className:e.header,children:[a.jsxs("div",{className:e.identity,children:[a.jsx("span",{className:`${e.dot} ${oe[t]??""} ${t==="working"?e.dotPulsing:""}`,"aria-hidden":"true"}),a.jsxs("div",{className:e.nameBlock,children:[a.jsx("span",{className:e.name,children:S}),f&&a.jsx("span",{className:e.role,children:f})]})]}),a.jsxs("div",{className:e.headerRight,children:[a.jsx("span",{className:`${e.statusBadge} ${e[`badge_${t}`]??""}`,children:y[t]??t}),s&&a.jsx("button",{className:e.expandBtn,onClick:o=>{o.stopPropagation(),s()},"aria-label":`Expand ${S}`,tabIndex:-1,children:"↗"})]})]}),n&&a.jsx("div",{className:e.task,title:n,children:n}),T&&a.jsxs("div",{className:e.progressRow,children:[a.jsx("div",{className:e.progressBar,children:a.jsx("div",{className:e.progressFill,style:{width:`${w}%`}})}),a.jsxs("span",{className:e.progressLabel,children:[C,"/",l]})]}),h!=null&&a.jsx("div",{className:e.footer,children:a.jsxs("span",{className:e.tokenCount,children:[h.toLocaleString()," tokens"]})})]})};v.__docgenInfo={description:"SubagentCard is a dense, condensed card representing a single sub-agent in a swarm.\nDesigned to be embedded inside OrchestratorView or used standalone.\nClicking `onExpand` drills down to the agent's full v0 panel (ToolTrace, PlanCard, etc.)",methods:[],displayName:"SubagentCard",props:{className:{required:!1,tsType:{name:"string"},description:"The root layout class name"},agentName:{required:!0,tsType:{name:"string"},description:"Name or ID of the subagent"},role:{required:!1,tsType:{name:"string"},description:'Display role, e.g. "Code Writer", "Researcher"'},status:{required:!0,tsType:{name:"union",raw:"'idle' | 'working' | 'blocked' | 'failed' | 'completed'",elements:[{name:"literal",value:"'idle'"},{name:"literal",value:"'working'"},{name:"literal",value:"'blocked'"},{name:"literal",value:"'failed'"},{name:"literal",value:"'completed'"}]},description:"Current operating status"},currentTask:{required:!1,tsType:{name:"string"},description:"The specific task the agent is currently executing"},planStepCount:{required:!1,tsType:{name:"number"},description:"Number of steps in the subagent's current plan"},planStepsCompleted:{required:!1,tsType:{name:"number"},description:"Number of completed steps in the subagent's current plan",defaultValue:{value:"0",computed:!1}},tokensUsed:{required:!1,tsType:{name:"number"},description:"Tokens burned in this agent's session"},onExpand:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Click handler to drill down into the agent's full detail panel"}}};const ce={title:"AX Components v1/SubagentCard",component:v,tags:["autodocs"],argTypes:{status:{control:"select",options:["idle","working","blocked","failed","completed"]},tokensUsed:{control:{type:"number",min:0}},planStepsCompleted:{control:{type:"number",min:0}},planStepCount:{control:{type:"number",min:1}}}},i={args:r({status:"working"})},c={name:"State: Idle",args:r({status:"idle",currentTask:void 0,planStepsCompleted:0})},p={name:"State: Working",args:r({status:"working"})},g={name:"State: Blocked",args:r({status:"blocked",currentTask:"Awaiting approval gate response"})},m={name:"State: Failed",args:r({status:"failed",currentTask:"Tool call exceeded token budget"})},u={name:"State: Completed",args:r({status:"completed",planStepsCompleted:6,planStepCount:6,currentTask:void 0})},_={name:"Prototype: Multiple Cards in a Grid",render:()=>a.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(260px, 1fr))",gap:"12px"},children:["idle","working","blocked","failed","completed"].map(d=>a.jsx(v,{...r({status:d})},d))})},k={name:"Basic Usage",args:{agentName:"Code-Writer-1",role:"Code Writer",status:"working",currentTask:"Generating TypeScript interfaces from JSON schema",planStepCount:5,planStepsCompleted:3,tokensUsed:8420}},b={name:"Production: High Token Usage Warning",args:{agentName:"Data-Analyst",role:"Data Analyst",status:"working",currentTask:"Summarizing findings from 200-page report",planStepCount:8,planStepsCompleted:4,tokensUsed:38500}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: generateMockSubagentCard({
    status: 'working'
  })
}`,...i.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  name: 'State: Idle',
  args: generateMockSubagentCard({
    status: 'idle',
    currentTask: undefined,
    planStepsCompleted: 0
  })
}`,...c.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  name: 'State: Working',
  args: generateMockSubagentCard({
    status: 'working'
  })
}`,...p.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  name: 'State: Blocked',
  args: generateMockSubagentCard({
    status: 'blocked',
    currentTask: 'Awaiting approval gate response'
  })
}`,...g.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  name: 'State: Failed',
  args: generateMockSubagentCard({
    status: 'failed',
    currentTask: 'Tool call exceeded token budget'
  })
}`,...m.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  name: 'State: Completed',
  args: generateMockSubagentCard({
    status: 'completed',
    planStepsCompleted: 6,
    planStepCount: 6,
    currentTask: undefined
  })
}`,...u.parameters?.docs?.source}}};_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  name: 'Prototype: Multiple Cards in a Grid',
  render: () => <div style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
    gap: '12px'
  }}>
      {(['idle', 'working', 'blocked', 'failed', 'completed'] as const).map(status => <SubagentCard key={status} {...generateMockSubagentCard({
      status
    })} />)}
    </div>
}`,..._.parameters?.docs?.source}}};k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  name: 'Basic Usage',
  args: {
    agentName: 'Code-Writer-1',
    role: 'Code Writer',
    status: 'working',
    currentTask: 'Generating TypeScript interfaces from JSON schema',
    planStepCount: 5,
    planStepsCompleted: 3,
    tokensUsed: 8420
  }
}`,...k.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  name: 'Production: High Token Usage Warning',
  args: {
    agentName: 'Data-Analyst',
    role: 'Data Analyst',
    status: 'working',
    currentTask: 'Summarizing findings from 200-page report',
    planStepCount: 8,
    planStepsCompleted: 4,
    tokensUsed: 38500
  }
}`,...b.parameters?.docs?.source}}};const pe=["Default","StateIdle","StateWorking","StateBlocked","StateFailed","StateCompleted","CardGrid","BasicUsage","HighTokenUsage"];export{k as BasicUsage,_ as CardGrid,i as Default,b as HighTokenUsage,g as StateBlocked,u as StateCompleted,m as StateFailed,c as StateIdle,p as StateWorking,pe as __namedExportsOrder,ce as default};
