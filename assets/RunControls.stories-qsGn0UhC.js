import{j as e}from"./jsx-runtime-u17CrQMm.js";import{r as u}from"./iframe-DLl0a6ph.js";import{V as F}from"./a11y-CKuWmtce.js";import"./preload-helper-PPVm8Dsz.js";const T="_runControls_1yt5j_3",$="_statusDot_1yt5j_14",A="_statusDotIdle_1yt5j_21",I="_statusDotRunning_1yt5j_22",N="_statusDotPaused_1yt5j_26",E="_statusDotCompleted_1yt5j_27",z="_statusDotFailed_1yt5j_28",q="_statusLabel_1yt5j_30",U="_btn_1yt5j_41",W="_btnStart_1yt5j_71",B="_btnPause_1yt5j_80",H="_btnStop_1yt5j_89",V="_btnRetry_1yt5j_98",Q="_separator_1yt5j_111",n={runControls:T,statusDot:$,statusDotIdle:A,statusDotRunning:I,statusDotPaused:N,statusDotCompleted:E,statusDotFailed:z,statusLabel:q,btn:U,btnStart:W,btnPause:B,btnStop:H,btnRetry:V,separator:Q},C={idle:"Idle",running:"Running",paused:"Paused",completed:"Completed",failed:"Failed"},M={idle:n.statusDotIdle,running:n.statusDotRunning,paused:n.statusDotPaused,completed:n.statusDotCompleted,failed:n.statusDotFailed};function d({state:t,onStart:a,onPause:r,onStop:s,onRetry:o,showLabel:L=!0,actions:i,className:l}){const D=t==="idle"||t==="paused",j=t==="running",v=t==="running"||t==="paused",P=t==="failed",k=u.useMemo(()=>`Run controls: ${C[t]}`,[t]);return e.jsxs("div",{className:`${n.runControls} ${l??""}`,role:"toolbar","aria-label":k,children:[e.jsx("span",{className:`${n.statusDot} ${M[t]}`,"aria-hidden":"true"}),L&&e.jsx("span",{className:n.statusLabel,children:C[t]}),e.jsx(F,{children:`Current state: ${C[t]}`}),D&&e.jsx("button",{className:`${n.btn} ${n.btnStart}`,onClick:a,"aria-label":t==="paused"?"Resume":"Start",type:"button",children:"▶"}),j&&e.jsx("button",{className:`${n.btn} ${n.btnPause}`,onClick:r,"aria-label":"Pause",type:"button",children:"⏸"}),v&&e.jsx("button",{className:`${n.btn} ${n.btnStop}`,onClick:s,"aria-label":"Stop",type:"button",children:"⏹"}),P&&e.jsx("button",{className:`${n.btn} ${n.btnRetry}`,onClick:o,"aria-label":"Retry",type:"button",children:"↻"}),i&&e.jsxs(e.Fragment,{children:[e.jsx("span",{className:n.separator,"aria-hidden":"true"}),i]})]})}d.__docgenInfo={description:"",methods:[],displayName:"RunControls",props:{state:{required:!0,tsType:{name:"union",raw:"'idle' | 'running' | 'paused' | 'completed' | 'failed'",elements:[{name:"literal",value:"'idle'"},{name:"literal",value:"'running'"},{name:"literal",value:"'paused'"},{name:"literal",value:"'completed'"},{name:"literal",value:"'failed'"}]},description:"Current execution state"},onStart:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Called when user clicks start/resume"},onPause:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Called when user clicks pause"},onStop:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Called when user clicks stop"},onRetry:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Called when user clicks retry (after failure)"},showLabel:{required:!1,tsType:{name:"boolean"},description:"Whether to show a status label",defaultValue:{value:"true",computed:!1}},actions:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"Slot for additional action buttons"},className:{required:!1,tsType:{name:"string"},description:"Additional CSS class"}}};const K={title:"AX Components/RunControls",component:d,tags:["autodocs"],argTypes:{state:{control:"select",options:["idle","running","paused","completed","failed"]},showLabel:{control:"boolean"}}},c={args:{state:"idle",showLabel:!0}},p={args:{state:"running",showLabel:!0,actions:e.jsx("span",{style:{fontFamily:"monospace",fontSize:"0.75rem",color:"#6b7280"},children:"Custom action slot"})}},m={name:"State: Idle",args:{state:"idle",showLabel:!0}},g={name:"State: Running (pulsing dot)",args:{state:"running",showLabel:!0}},S={name:"State: Paused",args:{state:"paused",showLabel:!0}},f={name:"State: Completed",args:{state:"completed",showLabel:!0}},b={name:"State: Failed (retry available)",args:{state:"failed",showLabel:!0}},y={name:"Quick Start: Prototype Run Control Flow",render:()=>{const[t,a]=u.useState("idle"),r={onStart:()=>a("running"),onPause:()=>a("paused"),onStop:()=>a("idle"),onRetry:()=>a("running")};return e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"1rem",fontFamily:"sans-serif"},children:[e.jsx(d,{state:t,showLabel:!0,...r}),e.jsx("span",{style:{fontSize:"0.75rem",color:"#9ca3af"},children:"Click the buttons to transition through states."})]})}},h={name:"Test Different States",render:()=>{const t=["idle","running","paused","completed","failed"],[a,r]=u.useState("idle");return e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"1rem"},children:[e.jsx("div",{style:{display:"flex",gap:"0.5rem",flexWrap:"wrap",fontFamily:"sans-serif",fontSize:"0.75rem"},children:t.map(s=>e.jsx("button",{onClick:()=>r(s),style:{padding:"0.25rem 0.625rem",border:"1px solid #ccc",borderRadius:"4px",background:a===s?"#1d4ed8":"#fff",color:a===s?"#fff":"#333",cursor:"pointer"},children:s},s))}),e.jsx(d,{state:a,showLabel:!0})]})}},x={name:"Simulate Real-Time Updates — Auto State Machine",render:()=>{const[t,a]=u.useState("idle"),[r,s]=u.useState([]),o=i=>s(l=>[`${new Date().toLocaleTimeString()}: ${i}`,...l.slice(0,4)]),L={onStart:()=>{a("running"),o("Started")},onPause:()=>{a("paused"),o("Paused")},onStop:()=>{a("idle"),o("Stopped")},onRetry:()=>{a("running"),o("Retrying...")}};return e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"1rem",fontFamily:"sans-serif"},children:[e.jsx(d,{state:t,showLabel:!0,...L}),e.jsx("div",{style:{fontSize:"0.75rem",color:"#6b7280",display:"flex",flexDirection:"column",gap:"0.25rem"},children:r.map((i,l)=>e.jsx("span",{children:i},l))}),t==="running"&&e.jsx("button",{onClick:()=>{a("failed"),o("Simulated failure")},style:{width:"fit-content",padding:"0.25rem 0.75rem",border:"1px solid #fca5a5",borderRadius:"4px",background:"#fef2f2",fontSize:"0.75rem",cursor:"pointer"},children:"Simulate failure"})]})}},R={name:"Basic Usage",args:{state:"idle",showLabel:!0}},w={name:"With Real API Data — Running State",args:{state:"running",showLabel:!0}},_={name:"Error Handling — Failed with Retry",args:{state:"failed",showLabel:!0}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    state: 'idle',
    showLabel: true
  }
}`,...c.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    state: 'running',
    showLabel: true,
    actions: <span style={{
      fontFamily: 'monospace',
      fontSize: '0.75rem',
      color: '#6b7280'
    }}>Custom action slot</span>
  }
}`,...p.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  name: 'State: Idle',
  args: {
    state: 'idle',
    showLabel: true
  }
}`,...m.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  name: 'State: Running (pulsing dot)',
  args: {
    state: 'running',
    showLabel: true
  }
}`,...g.parameters?.docs?.source}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  name: 'State: Paused',
  args: {
    state: 'paused',
    showLabel: true
  }
}`,...S.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  name: 'State: Completed',
  args: {
    state: 'completed',
    showLabel: true
  }
}`,...f.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  name: 'State: Failed (retry available)',
  args: {
    state: 'failed',
    showLabel: true
  }
}`,...b.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  name: 'Quick Start: Prototype Run Control Flow',
  render: () => {
    const [state, setState] = useState<RunState>('idle');
    const handlers = {
      onStart: () => setState('running'),
      onPause: () => setState('paused'),
      onStop: () => setState('idle'),
      onRetry: () => setState('running')
    };
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      fontFamily: 'sans-serif'
    }}>
        <RunControls state={state} showLabel {...handlers} />
        <span style={{
        fontSize: '0.75rem',
        color: '#9ca3af'
      }}>
          Click the buttons to transition through states.
        </span>
      </div>;
  }
}`,...y.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  name: 'Test Different States',
  render: () => {
    const states: RunState[] = ['idle', 'running', 'paused', 'completed', 'failed'];
    const [current, setCurrent] = useState<RunState>('idle');
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem'
    }}>
        <div style={{
        display: 'flex',
        gap: '0.5rem',
        flexWrap: 'wrap',
        fontFamily: 'sans-serif',
        fontSize: '0.75rem'
      }}>
          {states.map(s => <button key={s} onClick={() => setCurrent(s)} style={{
          padding: '0.25rem 0.625rem',
          border: '1px solid #ccc',
          borderRadius: '4px',
          background: current === s ? '#1d4ed8' : '#fff',
          color: current === s ? '#fff' : '#333',
          cursor: 'pointer'
        }}>
              {s}
            </button>)}
        </div>
        <RunControls state={current} showLabel />
      </div>;
  }
}`,...h.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  name: 'Simulate Real-Time Updates — Auto State Machine',
  render: () => {
    const [state, setState] = useState<RunState>('idle');
    const [log, setLog] = useState<string[]>([]);
    const addLog = (msg: string) => setLog(prev => [\`\${new Date().toLocaleTimeString()}: \${msg}\`, ...prev.slice(0, 4)]);
    const handlers = {
      onStart: () => {
        setState('running');
        addLog('Started');
      },
      onPause: () => {
        setState('paused');
        addLog('Paused');
      },
      onStop: () => {
        setState('idle');
        addLog('Stopped');
      },
      onRetry: () => {
        setState('running');
        addLog('Retrying...');
      }
    };
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      fontFamily: 'sans-serif'
    }}>
        <RunControls state={state} showLabel {...handlers} />
        <div style={{
        fontSize: '0.75rem',
        color: '#6b7280',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.25rem'
      }}>
          {log.map((l, i) => <span key={i}>{l}</span>)}
        </div>
        {state === 'running' && <button onClick={() => {
        setState('failed');
        addLog('Simulated failure');
      }} style={{
        width: 'fit-content',
        padding: '0.25rem 0.75rem',
        border: '1px solid #fca5a5',
        borderRadius: '4px',
        background: '#fef2f2',
        fontSize: '0.75rem',
        cursor: 'pointer'
      }}>
            Simulate failure
          </button>}
      </div>;
  }
}`,...x.parameters?.docs?.source}}};R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  name: 'Basic Usage',
  args: {
    state: 'idle',
    showLabel: true
  }
}`,...R.parameters?.docs?.source}}};w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  name: 'With Real API Data — Running State',
  args: {
    state: 'running',
    showLabel: true
  }
}`,...w.parameters?.docs?.source}}};_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  name: 'Error Handling — Failed with Retry',
  args: {
    state: 'failed',
    showLabel: true
  }
}`,..._.parameters?.docs?.source}}};const Y=["Default","AllFeatures","StateIdle","StateRunning","StatePaused","StateCompleted","StateFailed","PrototypeQuickStart","TestVariations","SimulateRealTimeUpdates","BasicUsage","WithRealAPIData","ErrorHandling"];export{p as AllFeatures,R as BasicUsage,c as Default,_ as ErrorHandling,y as PrototypeQuickStart,x as SimulateRealTimeUpdates,f as StateCompleted,b as StateFailed,m as StateIdle,S as StatePaused,g as StateRunning,h as TestVariations,w as WithRealAPIData,Y as __namedExportsOrder,K as default};
