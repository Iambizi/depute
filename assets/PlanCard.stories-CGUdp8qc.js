import{r as p,j as e}from"./iframe-D3fIoj3q.js";import{g as q}from"./common-DpQzTmW8.js";import{a as K,V as W}from"./a11y-CvVfkBhc.js";import{i as k,s as H}from"./mockData-DOQp8R7v.js";import"./preload-helper-PPVm8Dsz.js";const U="_planCard_10ct2_11",V="_header_10ct2_24",z="_title_10ct2_32",G="_progress_10ct2_40",X="_stepList_10ct2_50",J="_step_10ct2_50",Q="_stepClickable_10ct2_68",Y="_stepIcon_10ct2_82",Z="_stepIconPending_10ct2_95",ee="_stepIconActive_10ct2_101",ne="_stepIconCompleted_10ct2_108",te="_stepIconFailed_10ct2_114",se="_stepContent_10ct2_124",ae="_stepLabel_10ct2_129",ie="_stepLabelFailed_10ct2_136",oe="_stepDescription_10ct2_140",ce="_stepReasoning_10ct2_147",re="_confidenceBadge_10ct2_161",de="_confidenceHigh_10ct2_170",le="_confidenceMedium_10ct2_175",pe="_confidenceLow_10ct2_180",ue="_indeterminateIndicator_10ct2_189",me="_footer_10ct2_201",ge="_sectionToggle_10ct2_206",fe="_chevron_10ct2_232",he="_chevronOpen_10ct2_237",Se="_sectionContent_10ct2_241",be="_assumptionList_10ct2_248",ye="_emptyState_10ct2_261",n={planCard:U,header:V,title:z,progress:G,stepList:X,step:J,stepClickable:Q,stepIcon:Y,stepIconPending:Z,stepIconActive:ee,stepIconCompleted:ne,stepIconFailed:te,stepContent:se,stepLabel:ae,stepLabelFailed:ie,stepDescription:oe,stepReasoning:ce,confidenceBadge:re,confidenceHigh:de,confidenceMedium:le,confidenceLow:pe,indeterminateIndicator:ue,footer:me,sectionToggle:ge,chevron:fe,chevronOpen:he,sectionContent:Se,assumptionList:be,emptyState:ye},ve={pending:"○",active:"●",completed:"✓",failed:"✕"},xe={pending:n.stepIconPending,active:n.stepIconActive,completed:n.stepIconCompleted,failed:n.stepIconFailed};function Ce(s,i,o){const c=s.filter(a=>a.status==="completed").length,r=s.filter(a=>a.status==="failed").length,d=s.find(a=>a.status==="active");if(s.length===0)return"No plan available";if(r>0){const a=s.find(f=>f.status==="failed");return`Plan: ${o}, step ${a?.label??""} failed`}if(c===s.length)return`Plan: ${o}, all ${s.length} steps completed`;if(d){const a=s.indexOf(d)+1;return i==="determinate"?`Plan: ${o}, step ${a} of ${s.length} in progress`:`Plan: ${o}, ${c} steps completed, more expected`}return`Plan: ${o}, ${s.length} steps pending`}function j({title:s,steps:i,mode:o="determinate",assumptions:c,reasoning:r,activeStepId:d,onStepClick:a,showConfidence:f=!1,className:C}){const[u,g]=p.useState(()=>new Set),[$,R]=K(),D=p.useMemo(()=>i.filter(t=>t.status==="completed").length,[i]),F=o==="determinate"?`${D} / ${i.length}`:`${D} completed`,L=p.useMemo(()=>Ce(i,o,s),[i,o,s]),O=p.useMemo(()=>d||(i.find(t=>t.status==="active")?.id??null),[d,i]),N=t=>{g(m=>{const l=new Set(m);return l.has(t)?l.delete(t):l.add(t),l})},T=t=>{a&&(a(t),$(`Selected step: ${t.label}`))},M=(t,m)=>{(t.key==="Enter"||t.key===" ")&&(t.preventDefault(),T(m))};return i.length===0?e.jsxs("div",{className:`${n.planCard} ${C??""}`,role:"region","aria-label":"No plan available",children:[e.jsx("div",{className:n.header,children:e.jsx("h3",{className:n.title,children:s})}),e.jsx("div",{className:n.emptyState,children:"No plan steps available"}),e.jsx(R,{})]}):e.jsxs("div",{className:`${n.planCard} ${C??""}`,role:"region","aria-label":L,children:[e.jsxs("div",{className:n.header,children:[e.jsx("h3",{className:n.title,children:s}),e.jsx("span",{className:n.progress,"aria-hidden":"true",children:F}),e.jsx(W,{children:L})]}),e.jsxs("ol",{className:n.stepList,"aria-label":`Steps for ${s}`,children:[i.map(t=>{const m=t.id===O,l=!!a;return e.jsxs("li",{className:`${n.step} ${l?n.stepClickable:""}`,"aria-current":m?"step":void 0,role:l?"button":void 0,tabIndex:l?0:void 0,onClick:l?()=>T(t):void 0,onKeyDown:l?B=>M(B,t):void 0,children:[e.jsx("span",{className:`${n.stepIcon} ${xe[t.status]}`,"aria-hidden":"true",children:ve[t.status]}),e.jsxs("div",{className:n.stepContent,children:[e.jsx("span",{className:`${n.stepLabel} ${t.status==="failed"?n.stepLabelFailed:""}`,children:t.label}),t.description&&e.jsx("div",{className:n.stepDescription,children:t.description}),m&&t.reasoning&&e.jsx("div",{className:n.stepReasoning,children:t.reasoning})]}),f&&t.confidence!=null&&e.jsxs("span",{className:`${n.confidenceBadge} ${{high:n.confidenceHigh,medium:n.confidenceMedium,low:n.confidenceLow}[q(t.confidence)]}`,"aria-label":`Confidence: ${t.confidence}%`,children:[t.confidence,"%"]})]},t.id)}),o==="indeterminate"&&e.jsx("li",{className:n.indeterminateIndicator,"aria-hidden":"true",children:"• • •"})]}),(c?.length||r)&&e.jsxs("div",{className:n.footer,children:[c&&c.length>0&&e.jsxs("div",{children:[e.jsxs("button",{className:n.sectionToggle,onClick:()=>N("assumptions"),"aria-expanded":u.has("assumptions"),children:[e.jsx("span",{className:`${n.chevron} ${u.has("assumptions")?n.chevronOpen:""}`,"aria-hidden":"true",children:"▶"}),"Assumptions (",c.length,")"]}),u.has("assumptions")&&e.jsx("div",{className:n.sectionContent,children:e.jsx("ul",{className:n.assumptionList,children:c.map((t,m)=>e.jsx("li",{children:t},m))})})]}),r&&e.jsxs("div",{children:[e.jsxs("button",{className:n.sectionToggle,onClick:()=>N("reasoning"),"aria-expanded":u.has("reasoning"),children:[e.jsx("span",{className:`${n.chevron} ${u.has("reasoning")?n.chevronOpen:""}`,"aria-hidden":"true",children:"▶"}),"Reasoning"]}),u.has("reasoning")&&e.jsx("div",{className:n.sectionContent,children:r})]})]}),e.jsx(R,{})]})}j.__docgenInfo={description:"",methods:[],displayName:"PlanCard",props:{title:{required:!0,tsType:{name:"string"},description:"Title of the plan"},steps:{required:!0,tsType:{name:"Array",elements:[{name:"PlanStep"}],raw:"PlanStep[]"},description:"Array of plan steps to display"},mode:{required:!1,tsType:{name:"union",raw:"'determinate' | 'indeterminate'",elements:[{name:"literal",value:"'determinate'"},{name:"literal",value:"'indeterminate'"}]},description:"Plan mode — determinate (known total) or indeterminate",defaultValue:{value:"'determinate'",computed:!1}},assumptions:{required:!1,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:"Assumptions the agent made"},reasoning:{required:!1,tsType:{name:"string"},description:"Agent's overall reasoning for this plan"},activeStepId:{required:!1,tsType:{name:"string"},description:"Override which step appears active (by step ID)"},onStepClick:{required:!1,tsType:{name:"signature",type:"function",raw:"(step: PlanStep) => void",signature:{arguments:[{type:{name:"PlanStep"},name:"step"}],return:{name:"void"}}},description:"Called when a step is clicked"},showConfidence:{required:!1,tsType:{name:"boolean"},description:"Show confidence per step",defaultValue:{value:"false",computed:!1}},className:{required:!1,tsType:{name:"string"},description:"Additional CSS class"}}};const ke={title:"AX Components/PlanCard",component:j,tags:["autodocs"],argTypes:{mode:{control:"select",options:["determinate","indeterminate"]},showConfidence:{control:"boolean"}}},E=k({stepCount:5,includeConfidence:!0}),h={args:{title:E.title,steps:E.steps,assumptions:E.assumptions}},S={args:{...k({stepCount:5,includeConfidence:!0,includeReasoning:!0}),showConfidence:!0}},_={name:"State: Active (step 2 in progress)",args:{title:"Refactor authentication layer",steps:[{id:"s1",label:"Audit existing auth code",status:"completed",confidence:92},{id:"s2",label:"Extract token refresh logic",status:"active",confidence:78,reasoning:"Isolating to a pure function decouples it from the HTTP client."},{id:"s3",label:"Write unit tests",status:"pending",confidence:85},{id:"s4",label:"Update integration tests",status:"pending",confidence:70},{id:"s5",label:"PR and review",status:"pending"}],showConfidence:!0,assumptions:["Auth module is isolated","CI pipeline is green"]}},P={name:"State: All Completed",args:{title:"Generate API documentation",steps:[{id:"s1",label:"Parse OpenAPI schema",status:"completed",confidence:95},{id:"s2",label:"Generate endpoint descriptions",status:"completed",confidence:88},{id:"s3",label:"Write usage examples",status:"completed",confidence:91},{id:"s4",label:"Export as Markdown",status:"completed",confidence:99}],showConfidence:!0}},w={name:"State: Step Failed",args:{title:"Deploy to staging",steps:[{id:"s1",label:"Build production bundle",status:"completed",confidence:97},{id:"s2",label:"Run smoke tests",status:"completed",confidence:90},{id:"s3",label:"Push to staging cluster",status:"failed",confidence:40},{id:"s4",label:"Verify health checks",status:"pending"}],assumptions:["AWS credentials are valid","ECS cluster is running"]}},I={name:"State: Indeterminate (open-ended)",args:{title:"Exploratory research on caching strategies",mode:"indeterminate",steps:[{id:"s1",label:"Survey Redis documentation",status:"completed"},{id:"s2",label:"Benchmark Memcached vs Redis",status:"active"},{id:"s3",label:"Prototype with Dragonfly",status:"pending"}],reasoning:"The number of additional steps depends on what the benchmarks reveal."}},A={name:"State: No Steps (empty)",args:{title:"Pending plan generation",steps:[]}},b={name:"Prototype: Step Selection",render:()=>{const s=k({stepCount:5,includeConfidence:!0,includeReasoning:!0}),[i,o]=p.useState(s.steps[1]?.id??""),[c,r]=p.useState("(none)"),d=a=>{o(a.id),r(a.label)};return e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"12px",maxWidth:"560px"},children:[e.jsxs("div",{style:{fontSize:"13px",color:"#888"},children:["Last clicked: ",e.jsx("strong",{children:c})]}),e.jsx(j,{...s,activeStepId:i,onStepClick:d,showConfidence:!0})]})}},y={name:"Prototype: Live Execution",render:()=>{const s=k({stepCount:6,includeConfidence:!0}),[i,o]=p.useState(s.steps),[c,r]=p.useState(!1),[d,a]=p.useState(null),f=()=>{o(s.steps.map(g=>({...g,status:"pending"}))),r(!0);const{cancel:u}=H({steps:s.steps.map(g=>({...g,status:"pending"})),onUpdate:g=>o(g),intervalMs:1200});a(()=>u)},C=()=>{d?.(),r(!1)};return e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"12px",maxWidth:"560px"},children:[e.jsxs("div",{style:{display:"flex",gap:"8px"},children:[e.jsx("button",{onClick:f,disabled:c,style:{padding:"6px 16px",borderRadius:"6px",cursor:c?"default":"pointer"},children:"▶ Start simulation"}),e.jsx("button",{onClick:C,disabled:!c,style:{padding:"6px 16px",borderRadius:"6px",cursor:c?"pointer":"default"},children:"✕ Stop"})]}),e.jsx(j,{title:s.title,steps:i,assumptions:s.assumptions,showConfidence:!0})]})}},v={name:"Production: Software Planning Task",args:{title:"Implement OAuth 2.0 with PKCE",mode:"determinate",showConfidence:!0,steps:[{id:"p1",label:"Research PKCE spec (RFC 7636)",status:"completed",confidence:98},{id:"p2",label:"Design token storage strategy",status:"completed",confidence:91},{id:"p3",label:"Implement authorization code flow",status:"active",confidence:84,reasoning:"PKCE flow prevents auth code interception in public clients without a client secret."},{id:"p4",label:"Add token refresh with sliding expiry",status:"pending",confidence:79},{id:"p5",label:"Write integration tests",status:"pending",confidence:87},{id:"p6",label:"Security audit & pen test",status:"pending",confidence:72}],assumptions:["Identity provider supports PKCE","Frontend is a SPA (no client secret)","Token storage uses httpOnly cookies"],reasoning:"PKCE is the recommended OAuth 2.0 flow for SPAs as of RFC 9700. The sequential steps ensure each security layer is validated before proceeding."}},x={name:"Production: Data Analysis (Indeterminate)",args:{title:"Diagnose API latency regression",mode:"indeterminate",showConfidence:!0,steps:[{id:"d1",label:"Pull last 7 days of trace data",status:"completed",confidence:99},{id:"d2",label:"Identify p99 latency outliers",status:"completed",confidence:94},{id:"d3",label:"Correlate with recent deploys",status:"active",confidence:81},{id:"d4",label:"Isolate DB query bottleneck",status:"pending",confidence:70}],reasoning:"Additional steps may be added depending on whether the bottleneck is in the DB layer, network, or application code.",assumptions:["Datadog traces are available for the time window","Deploy log access is granted"]}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    title: BASE.title,
    steps: BASE.steps,
    assumptions: BASE.assumptions
  }
}`,...h.parameters?.docs?.source},description:{story:"Default: all steps pending, determinate mode",...h.parameters?.docs?.description}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    ...generateMockPlan({
      stepCount: 5,
      includeConfidence: true,
      includeReasoning: true
    }),
    showConfidence: true
  }
}`,...S.parameters?.docs?.source},description:{story:"All features enabled: assumptions, reasoning, confidence badges",...S.parameters?.docs?.description}}};_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  name: 'State: Active (step 2 in progress)',
  args: {
    title: 'Refactor authentication layer',
    steps: [{
      id: 's1',
      label: 'Audit existing auth code',
      status: 'completed',
      confidence: 92
    }, {
      id: 's2',
      label: 'Extract token refresh logic',
      status: 'active',
      confidence: 78,
      reasoning: 'Isolating to a pure function decouples it from the HTTP client.'
    }, {
      id: 's3',
      label: 'Write unit tests',
      status: 'pending',
      confidence: 85
    }, {
      id: 's4',
      label: 'Update integration tests',
      status: 'pending',
      confidence: 70
    }, {
      id: 's5',
      label: 'PR and review',
      status: 'pending'
    }],
    showConfidence: true,
    assumptions: ['Auth module is isolated', 'CI pipeline is green']
  }
}`,..._.parameters?.docs?.source}}};P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  name: 'State: All Completed',
  args: {
    title: 'Generate API documentation',
    steps: [{
      id: 's1',
      label: 'Parse OpenAPI schema',
      status: 'completed',
      confidence: 95
    }, {
      id: 's2',
      label: 'Generate endpoint descriptions',
      status: 'completed',
      confidence: 88
    }, {
      id: 's3',
      label: 'Write usage examples',
      status: 'completed',
      confidence: 91
    }, {
      id: 's4',
      label: 'Export as Markdown',
      status: 'completed',
      confidence: 99
    }],
    showConfidence: true
  }
}`,...P.parameters?.docs?.source}}};w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  name: 'State: Step Failed',
  args: {
    title: 'Deploy to staging',
    steps: [{
      id: 's1',
      label: 'Build production bundle',
      status: 'completed',
      confidence: 97
    }, {
      id: 's2',
      label: 'Run smoke tests',
      status: 'completed',
      confidence: 90
    }, {
      id: 's3',
      label: 'Push to staging cluster',
      status: 'failed',
      confidence: 40
    }, {
      id: 's4',
      label: 'Verify health checks',
      status: 'pending'
    }],
    assumptions: ['AWS credentials are valid', 'ECS cluster is running']
  }
}`,...w.parameters?.docs?.source}}};I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  name: 'State: Indeterminate (open-ended)',
  args: {
    title: 'Exploratory research on caching strategies',
    mode: 'indeterminate',
    steps: [{
      id: 's1',
      label: 'Survey Redis documentation',
      status: 'completed'
    }, {
      id: 's2',
      label: 'Benchmark Memcached vs Redis',
      status: 'active'
    }, {
      id: 's3',
      label: 'Prototype with Dragonfly',
      status: 'pending'
    }],
    reasoning: 'The number of additional steps depends on what the benchmarks reveal.'
  }
}`,...I.parameters?.docs?.source}}};A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  name: 'State: No Steps (empty)',
  args: {
    title: 'Pending plan generation',
    steps: []
  }
}`,...A.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  name: 'Prototype: Step Selection',
  render: () => {
    const plan = generateMockPlan({
      stepCount: 5,
      includeConfidence: true,
      includeReasoning: true
    });
    const [activeStepId, setActiveStepId] = useState<string>(plan.steps[1]?.id ?? '');
    const [lastClicked, setLastClicked] = useState<string>('(none)');
    const handleStepClick = (step: PlanStep) => {
      setActiveStepId(step.id);
      setLastClicked(step.label);
    };
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      maxWidth: '560px'
    }}>
        <div style={{
        fontSize: '13px',
        color: '#888'
      }}>
          Last clicked: <strong>{lastClicked}</strong>
        </div>
        <PlanCard {...plan} activeStepId={activeStepId} onStepClick={handleStepClick} showConfidence />
      </div>;
  }
}`,...b.parameters?.docs?.source},description:{story:"Interactive prototype: click steps to select them",...b.parameters?.docs?.description}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  name: 'Prototype: Live Execution',
  render: () => {
    const plan = generateMockPlan({
      stepCount: 6,
      includeConfidence: true
    });
    const [steps, setSteps] = useState<PlanStep[]>(plan.steps);
    const [running, setRunning] = useState(false);
    const [cancelFn, setCancelFn] = useState<(() => void) | null>(null);
    const handleStart = () => {
      // Reset steps
      setSteps(plan.steps.map(s => ({
        ...s,
        status: 'pending' as const
      })));
      setRunning(true);
      const {
        cancel
      } = simulatePlanExecution({
        steps: plan.steps.map(s => ({
          ...s,
          status: 'pending' as const
        })),
        onUpdate: updated => setSteps(updated),
        intervalMs: 1200
      });
      setCancelFn(() => cancel);
    };
    const handleStop = () => {
      cancelFn?.();
      setRunning(false);
    };
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      maxWidth: '560px'
    }}>
        <div style={{
        display: 'flex',
        gap: '8px'
      }}>
          <button onClick={handleStart} disabled={running} style={{
          padding: '6px 16px',
          borderRadius: '6px',
          cursor: running ? 'default' : 'pointer'
        }}>
            ▶ Start simulation
          </button>
          <button onClick={handleStop} disabled={!running} style={{
          padding: '6px 16px',
          borderRadius: '6px',
          cursor: !running ? 'default' : 'pointer'
        }}>
            ✕ Stop
          </button>
        </div>
        <PlanCard title={plan.title} steps={steps} assumptions={plan.assumptions} showConfidence />
      </div>;
  }
}`,...y.parameters?.docs?.source},description:{story:"Live execution simulation: steps auto-advance pending → active → completed",...y.parameters?.docs?.description}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  name: 'Production: Software Planning Task',
  args: {
    title: 'Implement OAuth 2.0 with PKCE',
    mode: 'determinate',
    showConfidence: true,
    steps: [{
      id: 'p1',
      label: 'Research PKCE spec (RFC 7636)',
      status: 'completed',
      confidence: 98
    }, {
      id: 'p2',
      label: 'Design token storage strategy',
      status: 'completed',
      confidence: 91
    }, {
      id: 'p3',
      label: 'Implement authorization code flow',
      status: 'active',
      confidence: 84,
      reasoning: 'PKCE flow prevents auth code interception in public clients without a client secret.'
    }, {
      id: 'p4',
      label: 'Add token refresh with sliding expiry',
      status: 'pending',
      confidence: 79
    }, {
      id: 'p5',
      label: 'Write integration tests',
      status: 'pending',
      confidence: 87
    }, {
      id: 'p6',
      label: 'Security audit & pen test',
      status: 'pending',
      confidence: 72
    }],
    assumptions: ['Identity provider supports PKCE', 'Frontend is a SPA (no client secret)', 'Token storage uses httpOnly cookies'],
    reasoning: 'PKCE is the recommended OAuth 2.0 flow for SPAs as of RFC 9700. The sequential steps ensure each security layer is validated before proceeding.'
  }
}`,...v.parameters?.docs?.source},description:{story:"Production: realistic software planning task",...v.parameters?.docs?.description}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  name: 'Production: Data Analysis (Indeterminate)',
  args: {
    title: 'Diagnose API latency regression',
    mode: 'indeterminate',
    showConfidence: true,
    steps: [{
      id: 'd1',
      label: 'Pull last 7 days of trace data',
      status: 'completed',
      confidence: 99
    }, {
      id: 'd2',
      label: 'Identify p99 latency outliers',
      status: 'completed',
      confidence: 94
    }, {
      id: 'd3',
      label: 'Correlate with recent deploys',
      status: 'active',
      confidence: 81
    }, {
      id: 'd4',
      label: 'Isolate DB query bottleneck',
      status: 'pending',
      confidence: 70
    }],
    reasoning: 'Additional steps may be added depending on whether the bottleneck is in the DB layer, network, or application code.',
    assumptions: ['Datadog traces are available for the time window', 'Deploy log access is granted']
  }
}`,...x.parameters?.docs?.source},description:{story:"Production: data analysis task with indeterminate steps",...x.parameters?.docs?.description}}};const je=["Default","AllFeatures","StateActive","StateCompleted","StateFailed","StateIndeterminate","StateEmpty","PrototypeStepSelection","PrototypeLiveExecution","ProductionSoftwarePlan","ProductionDataAnalysis"];export{S as AllFeatures,h as Default,x as ProductionDataAnalysis,v as ProductionSoftwarePlan,y as PrototypeLiveExecution,b as PrototypeStepSelection,_ as StateActive,P as StateCompleted,A as StateEmpty,w as StateFailed,I as StateIndeterminate,je as __namedExportsOrder,ke as default};
