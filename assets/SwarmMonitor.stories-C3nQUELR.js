import{j as a}from"./iframe-B9939OLV.js";import{m as t}from"./mockData-DOQp8R7v.js";import"./preload-helper-PPVm8Dsz.js";const h="_base_1s2fg_3",k="_header_1s2fg_13",R="_title_1s2fg_22",b="_controls_1s2fg_28",v="_btnPause_1s2fg_33",C="_btnKill_1s2fg_34",N="_grid_1s2fg_61",x="_metric_1s2fg_67",S="_metricValue_1s2fg_81",f="_metricLabel_1s2fg_89",j="_metricError_medium_1s2fg_98",w="_metricError_low_1s2fg_99",I="_metricError_high_1s2fg_100",y="_dot_1s2fg_108",T="_dotWorking_1s2fg_117",E="_smPulse_1s2fg_1",B="_dotIdle_1s2fg_118",M="_completionRow_1s2fg_126",$="_completionLabel_1s2fg_133",P="_progressBar_1s2fg_142",L="_progressFill_1s2fg_150",V="_completionValue_1s2fg_157",e={base:h,header:k,title:R,controls:b,btnPause:v,btnKill:C,grid:N,metric:x,metricValue:S,metricLabel:f,metricError_medium:j,metricError_low:w,metricError_high:I,dot:y,dotWorking:T,smPulse:E,dotIdle:B,completionRow:M,completionLabel:$,progressBar:P,progressFill:L,completionValue:V},p=({className:g,metrics:s,onGlobalPause:d,onGlobalKill:u})=>{const _=s.errorRate>25?"high":s.errorRate>10?"medium":"low";return a.jsxs("div",{className:`${e.base} ${g||""}`,role:"region","aria-label":"Swarm Monitor",children:[a.jsxs("div",{className:e.header,children:[a.jsx("span",{className:e.title,children:"Swarm Monitor"}),a.jsxs("div",{className:e.controls,children:[d&&a.jsx("button",{className:e.btnPause,onClick:d,"aria-label":"Pause all agents",children:"⏸ Pause All"}),u&&a.jsx("button",{className:e.btnKill,onClick:u,"aria-label":"Kill all agents",children:"⏹ Kill All"})]})]}),a.jsxs("div",{className:e.grid,children:[a.jsxs("div",{className:e.metric,children:[a.jsx("span",{className:e.metricValue,children:s.activeInstances}),a.jsx("span",{className:e.metricLabel,children:"Active"}),a.jsx("span",{className:`${e.dot} ${e.dotWorking}`})]}),a.jsxs("div",{className:e.metric,children:[a.jsx("span",{className:e.metricValue,children:s.idleInstances}),a.jsx("span",{className:e.metricLabel,children:"Idle"}),a.jsx("span",{className:`${e.dot} ${e.dotIdle}`})]}),a.jsxs("div",{className:e.metric,children:[a.jsx("span",{className:e.metricValue,children:s.totalCost}),a.jsx("span",{className:e.metricLabel,children:"Total Cost"})]}),a.jsxs("div",{className:e.metric,children:[a.jsxs("span",{className:e.metricValue,children:[(s.tokensBurned/1e3).toFixed(1),"k"]}),a.jsx("span",{className:e.metricLabel,children:"Tokens"})]}),a.jsxs("div",{className:`${e.metric} ${e[`metricError_${_}`]??""}`,children:[a.jsxs("span",{className:e.metricValue,children:[s.errorRate,"%"]}),a.jsx("span",{className:e.metricLabel,children:"Error Rate"})]}),s.estimatedTimeRemaining&&a.jsxs("div",{className:e.metric,children:[a.jsx("span",{className:e.metricValue,children:s.estimatedTimeRemaining}),a.jsx("span",{className:e.metricLabel,children:"ETA"})]})]}),s.taskCompletionRate!=null&&a.jsxs("div",{className:e.completionRow,children:[a.jsx("span",{className:e.completionLabel,children:"Completion"}),a.jsx("div",{className:e.progressBar,children:a.jsx("div",{className:e.progressFill,style:{width:`${s.taskCompletionRate}%`},role:"progressbar","aria-valuenow":s.taskCompletionRate,"aria-valuemin":0,"aria-valuemax":100})}),a.jsxs("span",{className:e.completionValue,children:[s.taskCompletionRate,"%"]})]})]})};p.__docgenInfo={description:`SwarmMonitor is the macro-dashboard for the entire swarm.
Tracks cost, token burn, active instances, error rates, and time-to-completion.`,methods:[],displayName:"SwarmMonitor",props:{className:{required:!1,tsType:{name:"string"},description:"The root layout class name"},metrics:{required:!0,tsType:{name:"signature",type:"object",raw:`{
  activeInstances: number;
  idleInstances: number;
  totalCost: string;
  tokensBurned: number;
  errorRate: number; // percentage 0–100
  taskCompletionRate?: number; // percentage 0–100
  estimatedTimeRemaining?: string;
}`,signature:{properties:[{key:"activeInstances",value:{name:"number",required:!0}},{key:"idleInstances",value:{name:"number",required:!0}},{key:"totalCost",value:{name:"string",required:!0}},{key:"tokensBurned",value:{name:"number",required:!0}},{key:"errorRate",value:{name:"number",required:!0}},{key:"taskCompletionRate",value:{name:"number",required:!1}},{key:"estimatedTimeRemaining",value:{name:"string",required:!1}}]}},description:""},onGlobalPause:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onGlobalKill:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}};const H={title:"AX Components v1/SwarmMonitor",component:p,tags:["autodocs"]},r={args:t()},n={name:"State: Healthy Swarm",args:t({metrics:{activeInstances:6,idleInstances:2,totalCost:"$0.48",tokensBurned:32e3,errorRate:2,taskCompletionRate:65,estimatedTimeRemaining:"8m"}})},o={name:"State: High Error Rate",args:t({metrics:{activeInstances:4,idleInstances:0,totalCost:"$1.20",tokensBurned:8e4,errorRate:32,taskCompletionRate:28,estimatedTimeRemaining:"22m"}})},i={name:"State: No ETA / Completion Rate",args:t({metrics:{activeInstances:2,idleInstances:1,totalCost:"$0.05",tokensBurned:3200,errorRate:0}})},l={name:"State: Near Completion",args:t({metrics:{activeInstances:1,idleInstances:5,totalCost:"$2.10",tokensBurned:14e4,errorRate:5,taskCompletionRate:92,estimatedTimeRemaining:"1m"}})},c={name:"Prototype: With Pause / Kill Controls",args:{...t(),onGlobalPause:()=>{alert("⏸ Swarm paused")},onGlobalKill:()=>{alert("⏹ Swarm killed")}}},m={name:"Basic Usage",args:{metrics:{activeInstances:5,idleInstances:2,totalCost:"$0.72",tokensBurned:48e3,errorRate:8,taskCompletionRate:52,estimatedTimeRemaining:"11m"}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: generateMockSwarmMetrics()
}`,...r.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
}`,...m.parameters?.docs?.source}}};const W=["Default","HealthySwarm","HighErrorRate","NoETA","NearComplete","WithGlobalControls","BasicUsage"];export{m as BasicUsage,r as Default,n as HealthySwarm,o as HighErrorRate,l as NearComplete,i as NoETA,c as WithGlobalControls,W as __namedExportsOrder,H as default};
