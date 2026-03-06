import{j as e}from"./jsx-runtime-u17CrQMm.js";import{r as p}from"./iframe-B_jp5fYY.js";import{g as K}from"./common-DpQzTmW8.js";import{a as H,V as U}from"./a11y-C_IPrr1r.js";import{i as I,s as V}from"./mockData-DOQp8R7v.js";import"./preload-helper-PPVm8Dsz.js";const z="_planCard_yaory_11",G="_header_yaory_24",X="_title_yaory_33",J="_progress_yaory_41",Q="_stepList_yaory_51",Y="_step_yaory_51",Z="_stepClickable_yaory_69",ee="_stepIcon_yaory_83",ne="_stepIconPending_yaory_94",te="_stepIconActive_yaory_98",se="_stepIconCompleted_yaory_102",ae="_stepIconFailed_yaory_106",ie="_stepContent_yaory_114",oe="_stepLabel_yaory_119",re="_stepLabelFailed_yaory_126",ce="_stepDescription_yaory_130",le="_stepReasoning_yaory_137",de="_confidenceBadge_yaory_151",pe="_confidenceHigh_yaory_162",ue="_confidenceMedium_yaory_167",me="_confidenceLow_yaory_172",ge="_indeterminateIndicator_yaory_181",he="_footer_yaory_193",fe="_sectionToggle_yaory_198",ye="_chevron_yaory_224",xe="_chevronOpen_yaory_229",Se="_sectionContent_yaory_233",be="_assumptionList_yaory_240",ve="_emptyState_yaory_253",Ce="_actions_yaory_264",_e="_btn_yaory_273",we="_btnPrimary_yaory_293",ke="_btnSecondary_yaory_303",Pe="_actionsSpacerRight_yaory_315",n={planCard:z,header:G,title:X,progress:J,stepList:Q,step:Y,stepClickable:Z,stepIcon:ee,stepIconPending:ne,stepIconActive:te,stepIconCompleted:se,stepIconFailed:ae,stepContent:ie,stepLabel:oe,stepLabelFailed:re,stepDescription:ce,stepReasoning:le,confidenceBadge:de,confidenceHigh:pe,confidenceMedium:ue,confidenceLow:me,indeterminateIndicator:ge,footer:he,sectionToggle:fe,chevron:ye,chevronOpen:xe,sectionContent:Se,assumptionList:be,emptyState:ve,actions:Ce,btn:_e,btnPrimary:we,btnSecondary:ke,actionsSpacerRight:Pe},je={pending:e.jsx("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:e.jsx("circle",{cx:"12",cy:"12",r:"9",fill:"currentColor",fillOpacity:"0.1",stroke:"currentColor",strokeWidth:"1.5"})}),active:e.jsxs("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[e.jsx("circle",{cx:"12",cy:"12",r:"9",fill:"currentColor",fillOpacity:"0.1",stroke:"currentColor",strokeWidth:"1.5"}),e.jsx("circle",{cx:"12",cy:"12",r:"4",fill:"currentColor"})]}),completed:e.jsxs("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[e.jsx("circle",{cx:"12",cy:"12",r:"9",fill:"currentColor",fillOpacity:"0.1",stroke:"currentColor",strokeWidth:"1.5"}),e.jsx("path",{d:"M8.5 12L10.5 14L15.5 9",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"})]}),failed:e.jsxs("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[e.jsx("circle",{cx:"12",cy:"12",r:"9",fill:"currentColor",fillOpacity:"0.1",stroke:"currentColor",strokeWidth:"1.5"}),e.jsx("path",{d:"M9 9L15 15M15 9L9 15",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"})]})},Ie={pending:n.stepIconPending,active:n.stepIconActive,completed:n.stepIconCompleted,failed:n.stepIconFailed};function Ae(s,i,o){const r=s.filter(a=>a.status==="completed").length,c=s.filter(a=>a.status==="failed").length,l=s.find(a=>a.status==="active");if(s.length===0)return"No plan available";if(c>0){const a=s.find(g=>g.status==="failed");return`Plan: ${o}, step ${a?.label??""} failed`}if(r===s.length)return`Plan: ${o}, all ${s.length} steps completed`;if(l){const a=s.indexOf(l)+1;return i==="determinate"?`Plan: ${o}, step ${a} of ${s.length} in progress`:`Plan: ${o}, ${r} steps completed, more expected`}return`Plan: ${o}, ${s.length} steps pending`}function A({title:s,steps:i,mode:o="determinate",assumptions:r,reasoning:c,activeStepId:l,onStepClick:a,onProceed:g,onModify:f,showConfidence:L=!1,className:u}){const[h,T]=p.useState(()=>new Set),[F,B]=H(),N=p.useMemo(()=>i.filter(t=>t.status==="completed").length,[i]),O=o==="determinate"?`${N} / ${i.length}`:`${N} completed`,$=p.useMemo(()=>Ae(i,o,s),[i,o,s]),W=p.useMemo(()=>l||(i.find(t=>t.status==="active")?.id??null),[l,i]),E=t=>{T(m=>{const d=new Set(m);return d.has(t)?d.delete(t):d.add(t),d})},D=t=>{a&&(a(t),F(`Selected step: ${t.label}`))},M=(t,m)=>{(t.key==="Enter"||t.key===" ")&&(t.preventDefault(),D(m))};return i.length===0?e.jsxs("div",{className:`${n.planCard} ${u??""}`,role:"region","aria-label":"No plan available",children:[e.jsx("div",{className:n.header,children:e.jsx("h3",{className:n.title,children:s})}),e.jsx("div",{className:n.emptyState,children:"No plan steps available"}),e.jsx(B,{})]}):e.jsxs("div",{className:`${n.planCard} ${u??""}`,role:"region","aria-label":$,children:[e.jsxs("div",{className:n.header,children:[e.jsx("h3",{className:n.title,children:s}),e.jsx("span",{className:n.progress,"aria-hidden":"true",children:O}),e.jsx(U,{children:$})]}),e.jsxs("ol",{className:n.stepList,"aria-label":`Steps for ${s}`,children:[i.map(t=>{const m=t.id===W,d=!!a;return e.jsxs("li",{className:`${n.step} ${d?n.stepClickable:""}`,"aria-current":m?"step":void 0,role:d?"button":void 0,tabIndex:d?0:void 0,onClick:d?()=>D(t):void 0,onKeyDown:d?q=>M(q,t):void 0,children:[e.jsx("span",{className:`${n.stepIcon} ${Ie[t.status]}`,"aria-hidden":"true",children:je[t.status]}),e.jsxs("div",{className:n.stepContent,children:[e.jsx("span",{className:`${n.stepLabel} ${t.status==="failed"?n.stepLabelFailed:""}`,children:t.label}),t.description&&e.jsx("div",{className:n.stepDescription,children:t.description}),m&&t.reasoning&&e.jsx("div",{className:n.stepReasoning,children:t.reasoning})]}),L&&t.confidence!=null&&e.jsxs("span",{className:`${n.confidenceBadge} ${{high:n.confidenceHigh,medium:n.confidenceMedium,low:n.confidenceLow}[K(t.confidence)]}`,"aria-label":`Confidence: ${t.confidence}%`,children:[t.confidence,"%"]})]},t.id)}),o==="indeterminate"&&e.jsx("li",{className:n.indeterminateIndicator,"aria-hidden":"true",children:"• • •"})]}),(r?.length||c)&&e.jsxs("div",{className:n.footer,children:[r&&r.length>0&&e.jsxs("div",{children:[e.jsxs("button",{className:n.sectionToggle,onClick:()=>E("assumptions"),"aria-expanded":h.has("assumptions"),children:[e.jsx("span",{className:`${n.chevron} ${h.has("assumptions")?n.chevronOpen:""}`,"aria-hidden":"true",children:e.jsx("svg",{width:"10",height:"10",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:e.jsx("polyline",{points:"9 18 15 12 9 6"})})}),"Assumptions (",r.length,")"]}),h.has("assumptions")&&e.jsx("div",{className:n.sectionContent,children:e.jsx("ul",{className:n.assumptionList,children:r.map((t,m)=>e.jsx("li",{children:t},m))})})]}),c&&e.jsxs("div",{children:[e.jsxs("button",{className:n.sectionToggle,onClick:()=>E("reasoning"),"aria-expanded":h.has("reasoning"),children:[e.jsx("span",{className:`${n.chevron} ${h.has("reasoning")?n.chevronOpen:""}`,"aria-hidden":"true",children:e.jsx("svg",{width:"10",height:"10",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:e.jsx("polyline",{points:"9 18 15 12 9 6"})})}),"Reasoning"]}),h.has("reasoning")&&e.jsx("div",{className:n.sectionContent,children:c})]})]}),(g||f)&&e.jsxs("div",{className:n.actions,children:[f&&e.jsx("button",{className:`${n.btn} ${n.btnSecondary}`,onClick:f,type:"button",children:"Modify Plan"}),e.jsx("span",{className:n.actionsSpacerRight}),g&&e.jsxs("button",{className:`${n.btn} ${n.btnPrimary}`,onClick:g,type:"button",children:["Proceed",e.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("line",{x1:"5",y1:"12",x2:"19",y2:"12"}),e.jsx("polyline",{points:"12 5 19 12 12 19"})]})]})]})]})}A.__docgenInfo={description:"",methods:[],displayName:"PlanCard",props:{title:{required:!0,tsType:{name:"string"},description:"Title of the plan"},steps:{required:!0,tsType:{name:"Array",elements:[{name:"PlanStep"}],raw:"PlanStep[]"},description:"Array of plan steps to display"},mode:{required:!1,tsType:{name:"union",raw:"'determinate' | 'indeterminate'",elements:[{name:"literal",value:"'determinate'"},{name:"literal",value:"'indeterminate'"}]},description:"Plan mode — determinate (known total) or indeterminate",defaultValue:{value:"'determinate'",computed:!1}},assumptions:{required:!1,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:"Assumptions the agent made"},reasoning:{required:!1,tsType:{name:"string"},description:"Agent's overall reasoning for this plan"},activeStepId:{required:!1,tsType:{name:"string"},description:"Override which step appears active (by step ID)"},onStepClick:{required:!1,tsType:{name:"signature",type:"function",raw:"(step: PlanStep) => void",signature:{arguments:[{type:{name:"PlanStep"},name:"step"}],return:{name:"void"}}},description:"Called when a step is clicked"},showConfidence:{required:!1,tsType:{name:"boolean"},description:"Show confidence per step",defaultValue:{value:"false",computed:!1}},className:{required:!1,tsType:{name:"string"},description:"Additional CSS class"},onProceed:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onModify:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}};const Te={title:"AX Components/PlanCard",component:A,tags:["autodocs"],argTypes:{mode:{control:"select",options:["determinate","indeterminate"]},showConfidence:{control:"boolean"}}},R=I({stepCount:5,includeConfidence:!0}),y={args:{title:R.title,steps:R.steps,assumptions:R.assumptions}},x={args:{...I({stepCount:5,includeConfidence:!0,includeReasoning:!0}),showConfidence:!0}},_={name:"State: Active (step 2 in progress)",args:{title:"Refactor authentication layer",steps:[{id:"s1",label:"Audit existing auth code",status:"completed",confidence:92},{id:"s2",label:"Extract token refresh logic",status:"active",confidence:78,reasoning:"Isolating to a pure function decouples it from the HTTP client."},{id:"s3",label:"Write unit tests",status:"pending",confidence:85},{id:"s4",label:"Update integration tests",status:"pending",confidence:70},{id:"s5",label:"PR and review",status:"pending"}],showConfidence:!0,assumptions:["Auth module is isolated","CI pipeline is green"]}},w={name:"State: All Completed",args:{title:"Generate API documentation",steps:[{id:"s1",label:"Parse OpenAPI schema",status:"completed",confidence:95},{id:"s2",label:"Generate endpoint descriptions",status:"completed",confidence:88},{id:"s3",label:"Write usage examples",status:"completed",confidence:91},{id:"s4",label:"Export as Markdown",status:"completed",confidence:99}],showConfidence:!0}},k={name:"State: Step Failed",args:{title:"Deploy to staging",steps:[{id:"s1",label:"Build production bundle",status:"completed",confidence:97},{id:"s2",label:"Run smoke tests",status:"completed",confidence:90},{id:"s3",label:"Push to staging cluster",status:"failed",confidence:40},{id:"s4",label:"Verify health checks",status:"pending"}],assumptions:["AWS credentials are valid","ECS cluster is running"]}},P={name:"State: Indeterminate (open-ended)",args:{title:"Exploratory research on caching strategies",mode:"indeterminate",steps:[{id:"s1",label:"Survey Redis documentation",status:"completed"},{id:"s2",label:"Benchmark Memcached vs Redis",status:"active"},{id:"s3",label:"Prototype with Dragonfly",status:"pending"}],reasoning:"The number of additional steps depends on what the benchmarks reveal."}},j={name:"State: No Steps (empty)",args:{title:"Pending plan generation",steps:[]}},S={name:"Prototype: Step Selection",render:()=>{const s=I({stepCount:5,includeConfidence:!0,includeReasoning:!0}),[i,o]=p.useState(s.steps[1]?.id??""),[r,c]=p.useState("(none)"),l=a=>{o(a.id),c(a.label)};return e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"12px",maxWidth:"560px"},children:[e.jsxs("div",{style:{fontSize:"13px",color:"#888"},children:["Last clicked: ",e.jsx("strong",{children:r})]}),e.jsx(A,{...s,activeStepId:i,onStepClick:l,showConfidence:!0})]})}},b={name:"Prototype: Live Execution",render:()=>{const s=I({stepCount:6,includeConfidence:!0}),[i,o]=p.useState(s.steps),[r,c]=p.useState(!1),[l,a]=p.useState(null),g=()=>{o(s.steps.map(u=>({...u,status:"pending"}))),c(!0);const{cancel:L}=V({steps:s.steps.map(u=>({...u,status:"pending"})),onUpdate:u=>o(u),intervalMs:1200});a(()=>L)},f=()=>{l?.(),c(!1)};return e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"12px",maxWidth:"560px"},children:[e.jsxs("div",{style:{display:"flex",gap:"8px"},children:[e.jsx("button",{onClick:g,disabled:r,style:{padding:"6px 16px",borderRadius:"6px",cursor:r?"default":"pointer"},children:"Start simulation"}),e.jsx("button",{onClick:f,disabled:!r,style:{padding:"6px 16px",borderRadius:"6px",cursor:r?"pointer":"default"},children:"Stop"})]}),e.jsx(A,{title:s.title,steps:i,assumptions:s.assumptions,showConfidence:!0})]})}},v={name:"Production: Software Planning Task",args:{title:"Implement OAuth 2.0 with PKCE",mode:"determinate",showConfidence:!0,steps:[{id:"p1",label:"Research PKCE spec (RFC 7636)",status:"completed",confidence:98},{id:"p2",label:"Design token storage strategy",status:"completed",confidence:91},{id:"p3",label:"Implement authorization code flow",status:"active",confidence:84,reasoning:"PKCE flow prevents auth code interception in public clients without a client secret."},{id:"p4",label:"Add token refresh with sliding expiry",status:"pending",confidence:79},{id:"p5",label:"Write integration tests",status:"pending",confidence:87},{id:"p6",label:"Security audit & pen test",status:"pending",confidence:72}],assumptions:["Identity provider supports PKCE","Frontend is a SPA (no client secret)","Token storage uses httpOnly cookies"],reasoning:"PKCE is the recommended OAuth 2.0 flow for SPAs as of RFC 9700. The sequential steps ensure each security layer is validated before proceeding."}},C={name:"Production: Data Analysis (Indeterminate)",args:{title:"Diagnose API latency regression",mode:"indeterminate",showConfidence:!0,steps:[{id:"d1",label:"Pull last 7 days of trace data",status:"completed",confidence:99},{id:"d2",label:"Identify p99 latency outliers",status:"completed",confidence:94},{id:"d3",label:"Correlate with recent deploys",status:"active",confidence:81},{id:"d4",label:"Isolate DB query bottleneck",status:"pending",confidence:70}],reasoning:"Additional steps may be added depending on whether the bottleneck is in the DB layer, network, or application code.",assumptions:["Datadog traces are available for the time window","Deploy log access is granted"]}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    title: BASE.title,
    steps: BASE.steps,
    assumptions: BASE.assumptions
  }
}`,...y.parameters?.docs?.source},description:{story:"Default: all steps pending, determinate mode",...y.parameters?.docs?.description}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    ...generateMockPlan({
      stepCount: 5,
      includeConfidence: true,
      includeReasoning: true
    }),
    showConfidence: true
  }
}`,...x.parameters?.docs?.source},description:{story:"All features enabled: assumptions, reasoning, confidence badges",...x.parameters?.docs?.description}}};_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
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
}`,..._.parameters?.docs?.source}}};w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
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
}`,...w.parameters?.docs?.source}}};k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
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
}`,...k.parameters?.docs?.source}}};P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
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
}`,...P.parameters?.docs?.source}}};j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  name: 'State: No Steps (empty)',
  args: {
    title: 'Pending plan generation',
    steps: []
  }
}`,...j.parameters?.docs?.source}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
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
}`,...S.parameters?.docs?.source},description:{story:"Interactive prototype: click steps to select them",...S.parameters?.docs?.description}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
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
            Start simulation
          </button>
          <button onClick={handleStop} disabled={!running} style={{
          padding: '6px 16px',
          borderRadius: '6px',
          cursor: !running ? 'default' : 'pointer'
        }}>
            Stop
          </button>
        </div>
        <PlanCard title={plan.title} steps={steps} assumptions={plan.assumptions} showConfidence />
      </div>;
  }
}`,...b.parameters?.docs?.source},description:{story:"Live execution simulation: steps auto-advance pending → active → completed",...b.parameters?.docs?.description}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
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
}`,...v.parameters?.docs?.source},description:{story:"Production: realistic software planning task",...v.parameters?.docs?.description}}};C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
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
}`,...C.parameters?.docs?.source},description:{story:"Production: data analysis task with indeterminate steps",...C.parameters?.docs?.description}}};const Fe=["Default","AllFeatures","StateActive","StateCompleted","StateFailed","StateIndeterminate","StateEmpty","PrototypeStepSelection","PrototypeLiveExecution","ProductionSoftwarePlan","ProductionDataAnalysis"];export{x as AllFeatures,y as Default,C as ProductionDataAnalysis,v as ProductionSoftwarePlan,b as PrototypeLiveExecution,S as PrototypeStepSelection,_ as StateActive,w as StateCompleted,j as StateEmpty,k as StateFailed,P as StateIndeterminate,Fe as __namedExportsOrder,Te as default};
