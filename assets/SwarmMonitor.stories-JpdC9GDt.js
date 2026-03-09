import{j as a}from"./jsx-runtime-u17CrQMm.js";import{m as r}from"./mockData-DOQp8R7v.js";const b="_base_1lbdn_3",h="_header_1lbdn_13",k="_title_1lbdn_24",R="_controls_1lbdn_31",v="_btnPause_1lbdn_36",C="_btnKill_1lbdn_37",N="_grid_1lbdn_68",x="_metric_1lbdn_74",S="_metricValue_1lbdn_88",j="_metricLabel_1lbdn_96",w="_metricError_medium_1lbdn_105",I="_metricError_low_1lbdn_108",y="_metricError_high_1lbdn_111",T="_dot_1lbdn_123",E="_dotWorking_1lbdn_132",B="_smPulse_1lbdn_1",M="_dotIdle_1lbdn_136",$="_completionRow_1lbdn_151",P="_completionLabel_1lbdn_158",f="_progressBar_1lbdn_167",L="_progressFill_1lbdn_175",V="_completionValue_1lbdn_186",e={base:b,header:h,title:k,controls:R,btnPause:v,btnKill:C,grid:N,metric:x,metricValue:S,metricLabel:j,metricError_medium:w,metricError_low:I,metricError_high:y,dot:T,dotWorking:E,smPulse:B,dotIdle:M,completionRow:$,completionLabel:P,progressBar:f,progressFill:L,completionValue:V},p=({className:g,metrics:t,onGlobalPause:d,onGlobalKill:u})=>{const _=t.errorRate>25?"high":t.errorRate>10?"medium":"low";return a.jsxs("div",{className:`${e.base} ${g||""}`,role:"region","aria-label":"Swarm Monitor",children:[a.jsxs("div",{className:e.header,children:[a.jsx("span",{className:e.title,children:"Swarm Monitor"}),a.jsxs("div",{className:e.controls,children:[d&&a.jsx("button",{className:e.btnPause,onClick:d,"aria-label":"Pause all agents",children:"⏸ Pause All"}),u&&a.jsx("button",{className:e.btnKill,onClick:u,"aria-label":"Kill all agents",children:"⏹ Kill All"})]})]}),a.jsxs("div",{className:e.grid,children:[a.jsxs("div",{className:e.metric,children:[a.jsx("span",{className:e.metricValue,children:t.activeInstances}),a.jsx("span",{className:e.metricLabel,children:"Active"}),a.jsx("span",{className:`${e.dot} ${e.dotWorking}`})]}),a.jsxs("div",{className:e.metric,children:[a.jsx("span",{className:e.metricValue,children:t.idleInstances}),a.jsx("span",{className:e.metricLabel,children:"Idle"}),a.jsx("span",{className:`${e.dot} ${e.dotIdle}`})]}),a.jsxs("div",{className:e.metric,children:[a.jsx("span",{className:e.metricValue,children:t.totalCost}),a.jsx("span",{className:e.metricLabel,children:"Total Cost"})]}),a.jsxs("div",{className:e.metric,children:[a.jsxs("span",{className:e.metricValue,children:[(t.tokensBurned/1e3).toFixed(1),"k"]}),a.jsx("span",{className:e.metricLabel,children:"Tokens"})]}),a.jsxs("div",{className:`${e.metric} ${e[`metricError_${_}`]??""}`,children:[a.jsxs("span",{className:e.metricValue,children:[t.errorRate,"%"]}),a.jsx("span",{className:e.metricLabel,children:"Error Rate"})]}),t.estimatedTimeRemaining&&a.jsxs("div",{className:e.metric,children:[a.jsx("span",{className:e.metricValue,children:t.estimatedTimeRemaining}),a.jsx("span",{className:e.metricLabel,children:"ETA"})]})]}),t.taskCompletionRate!=null&&a.jsxs("div",{className:e.completionRow,children:[a.jsx("span",{className:e.completionLabel,children:"Completion"}),a.jsx("div",{className:e.progressBar,children:a.jsx("div",{className:e.progressFill,style:{width:`${t.taskCompletionRate}%`},role:"progressbar","aria-valuenow":t.taskCompletionRate,"aria-valuemin":0,"aria-valuemax":100})}),a.jsxs("span",{className:e.completionValue,children:[t.taskCompletionRate,"%"]})]})]})};p.__docgenInfo={description:`SwarmMonitor is the macro-dashboard for the entire swarm.
Tracks cost, token burn, active instances, error rates, and time-to-completion.`,methods:[],displayName:"SwarmMonitor",props:{className:{required:!1,tsType:{name:"string"},description:"The root layout class name"},metrics:{required:!0,tsType:{name:"signature",type:"object",raw:`{
  activeInstances: number;
  idleInstances: number;
  totalCost: string;
  tokensBurned: number;
  errorRate: number; // percentage 0–100
  taskCompletionRate?: number; // percentage 0–100
  estimatedTimeRemaining?: string;
}`,signature:{properties:[{key:"activeInstances",value:{name:"number",required:!0}},{key:"idleInstances",value:{name:"number",required:!0}},{key:"totalCost",value:{name:"string",required:!0}},{key:"tokensBurned",value:{name:"number",required:!0}},{key:"errorRate",value:{name:"number",required:!0}},{key:"taskCompletionRate",value:{name:"number",required:!1}},{key:"estimatedTimeRemaining",value:{name:"string",required:!1}}]}},description:""},onGlobalPause:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onGlobalKill:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}};const A={title:"AX Components v1/SwarmMonitor",component:p,tags:["autodocs"]},s={args:r()},n={name:"State: Healthy Swarm",args:r({metrics:{activeInstances:6,idleInstances:2,totalCost:"$0.48",tokensBurned:32e3,errorRate:2,taskCompletionRate:65,estimatedTimeRemaining:"8m"}})},o={name:"State: High Error Rate",args:r({metrics:{activeInstances:4,idleInstances:0,totalCost:"$1.20",tokensBurned:8e4,errorRate:32,taskCompletionRate:28,estimatedTimeRemaining:"22m"}})},i={name:"State: No ETA / Completion Rate",args:r({metrics:{activeInstances:2,idleInstances:1,totalCost:"$0.05",tokensBurned:3200,errorRate:0}})},l={name:"State: Near Completion",args:r({metrics:{activeInstances:1,idleInstances:5,totalCost:"$2.10",tokensBurned:14e4,errorRate:5,taskCompletionRate:92,estimatedTimeRemaining:"1m"}})},c={name:"Prototype: With Pause / Kill Controls",args:{...r(),onGlobalPause:()=>{alert("⏸ Swarm paused")},onGlobalKill:()=>{alert("⏹ Swarm killed")}}},m={name:"Basic Usage",args:{metrics:{activeInstances:5,idleInstances:2,totalCost:"$0.72",tokensBurned:48e3,errorRate:8,taskCompletionRate:52,estimatedTimeRemaining:"11m"}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: generateMockSwarmMetrics()
}`,...s.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  name: 'State: Healthy Swarm',
  args: generateMockSwarmMetrics({
    metrics: {
      activeInstances: 6,
      idleInstances: 2,
      totalCost: '$0.48',
      tokensBurned: 32000,
      errorRate: 2,
      taskCompletionRate: 65,
      estimatedTimeRemaining: '8m'
    }
  })
}`,...n.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  name: 'State: High Error Rate',
  args: generateMockSwarmMetrics({
    metrics: {
      activeInstances: 4,
      idleInstances: 0,
      totalCost: '$1.20',
      tokensBurned: 80000,
      errorRate: 32,
      taskCompletionRate: 28,
      estimatedTimeRemaining: '22m'
    }
  })
}`,...o.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  name: 'State: No ETA / Completion Rate',
  args: generateMockSwarmMetrics({
    metrics: {
      activeInstances: 2,
      idleInstances: 1,
      totalCost: '$0.05',
      tokensBurned: 3200,
      errorRate: 0
    }
  })
}`,...i.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  name: 'State: Near Completion',
  args: generateMockSwarmMetrics({
    metrics: {
      activeInstances: 1,
      idleInstances: 5,
      totalCost: '$2.10',
      tokensBurned: 140000,
      errorRate: 5,
      taskCompletionRate: 92,
      estimatedTimeRemaining: '1m'
    }
  })
}`,...l.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  name: 'Prototype: With Pause / Kill Controls',
  args: {
    ...generateMockSwarmMetrics(),
    onGlobalPause: () => {
      alert('⏸ Swarm paused');
    },
    onGlobalKill: () => {
      alert('⏹ Swarm killed');
    }
  }
}`,...c.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  name: 'Basic Usage',
  args: {
    metrics: {
      activeInstances: 5,
      idleInstances: 2,
      totalCost: '$0.72',
      tokensBurned: 48000,
      errorRate: 8,
      taskCompletionRate: 52,
      estimatedTimeRemaining: '11m'
    }
  }
}`,...m.parameters?.docs?.source}}};const H=["Default","HealthySwarm","HighErrorRate","NoETA","NearComplete","WithGlobalControls","BasicUsage"];export{m as BasicUsage,s as Default,n as HealthySwarm,o as HighErrorRate,l as NearComplete,i as NoETA,c as WithGlobalControls,H as __namedExportsOrder,A as default};
