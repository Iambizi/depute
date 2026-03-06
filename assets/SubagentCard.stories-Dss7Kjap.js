import{j as a}from"./jsx-runtime-u17CrQMm.js";import{k as s}from"./mockData-DOQp8R7v.js";const x="_card_1ajru_3",v="_card_idle_1ajru_30",B="_card_working_1ajru_31",N="_card_blocked_1ajru_32",W="_card_failed_1ajru_33",$="_card_completed_1ajru_34",P="_header_1ajru_37",U="_identity_1ajru_44",D="_nameBlock_1ajru_51",F="_name_1ajru_51",I="_role_1ajru_66",M="_headerRight_1ajru_73",R="_dot_1ajru_81",q="_dotIdle_1ajru_88",A="_dotWorking_1ajru_89",G="_dotBlocked_1ajru_90",L="_dotFailed_1ajru_91",O="_dotCompleted_1ajru_92",H="_dotPulsing_1ajru_94",z="_scPulse_1ajru_1",J="_statusBadge_1ajru_104",V="_badge_idle_1ajru_113",X="_badge_working_1ajru_114",E="_badge_blocked_1ajru_115",K="_badge_failed_1ajru_116",Q="_badge_completed_1ajru_117",Y="_expandBtn_1ajru_120",Z="_task_1ajru_141",ee="_progressRow_1ajru_151",ae="_progressBar_1ajru_157",re="_progressFill_1ajru_165",te="_progressLabel_1ajru_172",se="_footer_1ajru_180",ne="_tokenCount_1ajru_184",e={card:x,card_idle:v,card_working:B,card_blocked:N,card_failed:W,card_completed:$,header:P,identity:U,nameBlock:D,name:F,role:I,headerRight:M,dot:R,dotIdle:q,dotWorking:A,dotBlocked:G,dotFailed:L,dotCompleted:O,dotPulsing:H,scPulse:z,statusBadge:J,badge_idle:V,badge_working:X,badge_blocked:E,badge_failed:K,badge_completed:Q,expandBtn:Y,task:Z,progressRow:ee,progressBar:ae,progressFill:re,progressLabel:te,footer:se,tokenCount:ne},oe={idle:e.dotIdle,working:e.dotWorking,blocked:e.dotBlocked,failed:e.dotFailed,completed:e.dotCompleted},y={idle:"Idle",working:"Working",blocked:"Blocked",failed:"Failed",completed:"Done"},f=({className:d,agentName:S,role:C,status:r,currentTask:n,planStepCount:l,planStepsCompleted:j=0,tokensUsed:h,onExpand:t})=>{const T=l!=null&&l>0,w=T?Math.round(j/l*100):0;return a.jsxs("div",{className:`${e.card} ${e[`card_${r}`]??""} ${d||""}`,role:t?"button":void 0,tabIndex:t?0:void 0,onClick:t,onKeyDown:t?o=>{(o.key==="Enter"||o.key===" ")&&(o.preventDefault(),t())}:void 0,"aria-label":`${S}, ${y[r]??r}${n?`, ${n}`:""}`,children:[a.jsxs("div",{className:e.header,children:[a.jsxs("div",{className:e.identity,children:[a.jsx("span",{className:`${e.dot} ${oe[r]??""} ${r==="working"?e.dotPulsing:""}`,"aria-hidden":"true"}),a.jsxs("div",{className:e.nameBlock,children:[a.jsx("span",{className:e.name,children:S}),C&&a.jsx("span",{className:e.role,children:C})]})]}),a.jsxs("div",{className:e.headerRight,children:[a.jsx("span",{className:`${e.statusBadge} ${e[`badge_${r}`]??""}`,children:y[r]??r}),t&&a.jsx("button",{className:e.expandBtn,onClick:o=>{o.stopPropagation(),t()},"aria-label":`Expand ${S}`,tabIndex:-1,children:"↗"})]})]}),n&&a.jsx("div",{className:e.task,title:n,children:n}),T&&a.jsxs("div",{className:e.progressRow,children:[a.jsx("div",{className:e.progressBar,children:a.jsx("div",{className:e.progressFill,style:{width:`${w}%`}})}),a.jsxs("span",{className:e.progressLabel,children:[j,"/",l]})]}),h!=null&&a.jsx("div",{className:e.footer,children:a.jsxs("span",{className:e.tokenCount,children:[h.toLocaleString()," tokens"]})})]})};f.__docgenInfo={description:"SubagentCard is a dense, condensed card representing a single sub-agent in a swarm.\nDesigned to be embedded inside OrchestratorView or used standalone.\nClicking `onExpand` drills down to the agent's full v0 panel (ToolTrace, PlanCard, etc.)",methods:[],displayName:"SubagentCard",props:{className:{required:!1,tsType:{name:"string"},description:"The root layout class name"},agentName:{required:!0,tsType:{name:"string"},description:"Name or ID of the subagent"},role:{required:!1,tsType:{name:"string"},description:'Display role, e.g. "Code Writer", "Researcher"'},status:{required:!0,tsType:{name:"union",raw:"'idle' | 'working' | 'blocked' | 'failed' | 'completed'",elements:[{name:"literal",value:"'idle'"},{name:"literal",value:"'working'"},{name:"literal",value:"'blocked'"},{name:"literal",value:"'failed'"},{name:"literal",value:"'completed'"}]},description:"Current operating status"},currentTask:{required:!1,tsType:{name:"string"},description:"The specific task the agent is currently executing"},planStepCount:{required:!1,tsType:{name:"number"},description:"Number of steps in the subagent's current plan"},planStepsCompleted:{required:!1,tsType:{name:"number"},description:"Number of completed steps in the subagent's current plan",defaultValue:{value:"0",computed:!1}},tokensUsed:{required:!1,tsType:{name:"number"},description:"Tokens burned in this agent's session"},onExpand:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Click handler to drill down into the agent's full detail panel"}}};const ie={title:"AX Components v1/SubagentCard",component:f,tags:["autodocs"],argTypes:{status:{control:"select",options:["idle","working","blocked","failed","completed"]},tokensUsed:{control:{type:"number",min:0}},planStepsCompleted:{control:{type:"number",min:0}},planStepCount:{control:{type:"number",min:1}}}},i={args:s({status:"working"})},c={name:"State: Idle",args:s({status:"idle",currentTask:void 0,planStepsCompleted:0})},p={name:"State: Working",args:s({status:"working"})},u={name:"State: Blocked",args:s({status:"blocked",currentTask:"Awaiting approval gate response"})},g={name:"State: Failed",args:s({status:"failed",currentTask:"Tool call exceeded token budget"})},m={name:"State: Completed",args:s({status:"completed",planStepsCompleted:6,planStepCount:6,currentTask:void 0})},_={name:"Prototype: Multiple Cards in a Grid",render:()=>a.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(260px, 1fr))",gap:"12px"},children:["idle","working","blocked","failed","completed"].map(d=>a.jsx(f,{...s({status:d})},d))})},k={name:"Basic Usage",args:{agentName:"Code-Writer-1",role:"Code Writer",status:"working",currentTask:"Generating TypeScript interfaces from JSON schema",planStepCount:5,planStepsCompleted:3,tokensUsed:8420}},b={name:"Production: High Token Usage Warning",args:{agentName:"Data-Analyst",role:"Data Analyst",status:"working",currentTask:"Summarizing findings from 200-page report",planStepCount:8,planStepsCompleted:4,tokensUsed:38500}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
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
}`,...p.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  name: 'State: Blocked',
  args: generateMockSubagentCard({
    status: 'blocked',
    currentTask: 'Awaiting approval gate response'
  })
}`,...u.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  name: 'State: Failed',
  args: generateMockSubagentCard({
    status: 'failed',
    currentTask: 'Tool call exceeded token budget'
  })
}`,...g.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  name: 'State: Completed',
  args: generateMockSubagentCard({
    status: 'completed',
    planStepsCompleted: 6,
    planStepCount: 6,
    currentTask: undefined
  })
}`,...m.parameters?.docs?.source}}};_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
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
}`,...b.parameters?.docs?.source}}};const ce=["Default","StateIdle","StateWorking","StateBlocked","StateFailed","StateCompleted","CardGrid","BasicUsage","HighTokenUsage"];export{k as BasicUsage,_ as CardGrid,i as Default,b as HighTokenUsage,u as StateBlocked,m as StateCompleted,g as StateFailed,c as StateIdle,p as StateWorking,ce as __namedExportsOrder,ie as default};
