import{j as e}from"./jsx-runtime-u17CrQMm.js";import{r as u}from"./iframe-DLl0a6ph.js";import{g as X}from"./common-DpQzTmW8.js";import{a as Q,V as J}from"./a11y-CKuWmtce.js";import{i as E,s as Y}from"./mockData-DOQp8R7v.js";import"./preload-helper-PPVm8Dsz.js";const Z="_planCard_yaory_11",ee="_header_yaory_24",ne="_title_yaory_33",te="_progress_yaory_41",se="_stepList_yaory_51",ae="_step_yaory_51",ie="_stepClickable_yaory_69",oe="_stepIcon_yaory_83",re="_stepIconPending_yaory_94",ce="_stepIconActive_yaory_98",le="_stepIconCompleted_yaory_102",de="_stepIconFailed_yaory_106",pe="_stepContent_yaory_114",ue="_stepLabel_yaory_119",me="_stepLabelFailed_yaory_126",ge="_stepDescription_yaory_130",he="_stepReasoning_yaory_137",fe="_confidenceBadge_yaory_151",ye="_confidenceHigh_yaory_162",xe="_confidenceMedium_yaory_167",be="_confidenceLow_yaory_172",Se="_indeterminateIndicator_yaory_181",ve="_footer_yaory_193",Ce="_sectionToggle_yaory_198",we="_chevron_yaory_224",_e="_chevronOpen_yaory_229",ke="_sectionContent_yaory_233",Pe="_assumptionList_yaory_240",Ie="_emptyState_yaory_253",je="_actions_yaory_264",Ae="_btn_yaory_273",Re="_btnPrimary_yaory_293",Ee="_btnSecondary_yaory_303",Le="_actionsSpacerRight_yaory_315",n={planCard:Z,header:ee,title:ne,progress:te,stepList:se,step:ae,stepClickable:ie,stepIcon:oe,stepIconPending:re,stepIconActive:ce,stepIconCompleted:le,stepIconFailed:de,stepContent:pe,stepLabel:ue,stepLabelFailed:me,stepDescription:ge,stepReasoning:he,confidenceBadge:fe,confidenceHigh:ye,confidenceMedium:xe,confidenceLow:be,indeterminateIndicator:Se,footer:ve,sectionToggle:Ce,chevron:we,chevronOpen:_e,sectionContent:ke,assumptionList:Pe,emptyState:Ie,actions:je,btn:Ae,btnPrimary:Re,btnSecondary:Ee,actionsSpacerRight:Le},Te={pending:e.jsx("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:e.jsx("circle",{cx:"12",cy:"12",r:"9",fill:"currentColor",fillOpacity:"0.1",stroke:"currentColor",strokeWidth:"1.5"})}),active:e.jsxs("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[e.jsx("circle",{cx:"12",cy:"12",r:"9",fill:"currentColor",fillOpacity:"0.1",stroke:"currentColor",strokeWidth:"1.5"}),e.jsx("circle",{cx:"12",cy:"12",r:"4",fill:"currentColor"})]}),completed:e.jsxs("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[e.jsx("circle",{cx:"12",cy:"12",r:"9",fill:"currentColor",fillOpacity:"0.1",stroke:"currentColor",strokeWidth:"1.5"}),e.jsx("path",{d:"M8.5 12L10.5 14L15.5 9",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"})]}),failed:e.jsxs("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[e.jsx("circle",{cx:"12",cy:"12",r:"9",fill:"currentColor",fillOpacity:"0.1",stroke:"currentColor",strokeWidth:"1.5"}),e.jsx("path",{d:"M9 9L15 15M15 9L9 15",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"})]})},De={pending:n.stepIconPending,active:n.stepIconActive,completed:n.stepIconCompleted,failed:n.stepIconFailed};function $e(s,i,o){const r=s.filter(a=>a.status==="completed").length,c=s.filter(a=>a.status==="failed").length,l=s.find(a=>a.status==="active");if(s.length===0)return"No plan available";if(c>0){const a=s.find(g=>g.status==="failed");return`Plan: ${o}, step ${a?.label??""} failed`}if(r===s.length)return`Plan: ${o}, all ${s.length} steps completed`;if(l){const a=s.indexOf(l)+1;return i==="determinate"?`Plan: ${o}, step ${a} of ${s.length} in progress`:`Plan: ${o}, ${r} steps completed, more expected`}return`Plan: ${o}, ${s.length} steps pending`}function L({title:s,steps:i,mode:o="determinate",assumptions:r,reasoning:c,activeStepId:l,onStepClick:a,onProceed:g,onModify:f,showConfidence:T=!1,isStreaming:m=!1,showReasoning:q=!1,defaultExpandedStepId:N,className:F}){const[p,K]=u.useState(()=>{const t=new Set;return N&&t.add(`step-reasoning-${N}`),t}),[G,O]=Q(),W=u.useMemo(()=>i.filter(t=>t.status==="completed").length,[i]),H=o==="determinate"?`${W} / ${i.length}`:`${W} completed`,B=u.useMemo(()=>$e(i,o,s),[i,o,s]),V=u.useMemo(()=>l||(i.find(t=>t.status==="active")?.id??null),[l,i]),D=t=>{K(h=>{const d=new Set(h);return d.has(t)?d.delete(t):d.add(t),d})},M=t=>{a&&(a(t),G(`Selected step: ${t.label}`))},U=(t,h)=>{(t.key==="Enter"||t.key===" ")&&(t.preventDefault(),M(h))};return i.length===0?e.jsxs("div",{className:`${n.planCard} ${F??""}`,role:"region","aria-label":"No plan available","data-streaming":m||void 0,children:[e.jsx("div",{className:n.header,children:e.jsx("h3",{className:n.title,children:s})}),e.jsx("div",{className:n.emptyState,children:"No plan steps available"}),e.jsx(O,{})]}):e.jsxs("div",{className:`${n.planCard} ${F??""}`,role:"region","aria-label":B,"data-streaming":m||void 0,children:[e.jsxs("div",{className:n.header,children:[e.jsx("h3",{className:n.title,children:s}),e.jsx("span",{className:n.progress,"aria-hidden":"true",children:H}),e.jsx(J,{children:B})]}),e.jsxs("ol",{className:n.stepList,"aria-label":`Steps for ${s}`,children:[i.map(t=>{const h=t.id===V,d=!!a;return e.jsxs("li",{className:`${n.step} ${d?n.stepClickable:""}`,"aria-current":h?"step":void 0,role:d?"button":void 0,tabIndex:d?0:void 0,onClick:d?()=>M(t):void 0,onKeyDown:d?z=>U(z,t):void 0,children:[e.jsx("span",{className:`${n.stepIcon} ${De[t.status]}`,"aria-hidden":"true",children:Te[t.status]}),e.jsxs("div",{className:n.stepContent,children:[e.jsx("span",{className:`${n.stepLabel} ${t.status==="failed"?n.stepLabelFailed:""}`,children:t.label}),t.description&&e.jsx("div",{className:n.stepDescription,children:t.description}),q&&t.reasoning&&e.jsxs("div",{children:[e.jsxs("button",{className:n.sectionToggle,onClick:()=>D(`step-reasoning-${t.id}`),"aria-expanded":p.has(`step-reasoning-${t.id}`),children:[e.jsx("span",{className:`${n.chevron} ${p.has(`step-reasoning-${t.id}`)?n.chevronOpen:""}`,"aria-hidden":"true",children:e.jsx("svg",{width:"10",height:"10",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:e.jsx("polyline",{points:"9 18 15 12 9 6"})})}),"Reasoning"]}),p.has(`step-reasoning-${t.id}`)&&e.jsx("div",{className:n.stepReasoning,children:t.reasoning})]})]}),T&&t.confidence!=null&&e.jsxs("span",{className:`${n.confidenceBadge} ${{high:n.confidenceHigh,medium:n.confidenceMedium,low:n.confidenceLow}[X(t.confidence)]}`,"aria-label":`Confidence: ${t.confidence}%`,children:[t.confidence,"% conf"]})]},t.id)}),o==="indeterminate"&&e.jsx("li",{className:n.indeterminateIndicator,"aria-hidden":"true",children:"• • •"})]}),(r?.length||c)&&e.jsxs("div",{className:n.footer,children:[r&&r.length>0&&e.jsxs("div",{children:[e.jsxs("button",{className:n.sectionToggle,onClick:()=>D("assumptions"),"aria-expanded":p.has("assumptions"),children:[e.jsx("span",{className:`${n.chevron} ${p.has("assumptions")?n.chevronOpen:""}`,"aria-hidden":"true",children:e.jsx("svg",{width:"10",height:"10",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:e.jsx("polyline",{points:"9 18 15 12 9 6"})})}),"Assumptions (",r.length,")"]}),p.has("assumptions")&&e.jsx("div",{className:n.sectionContent,children:e.jsx("ul",{className:n.assumptionList,children:r.map((t,h)=>e.jsx("li",{children:t},h))})})]}),c&&e.jsxs("div",{children:[e.jsxs("button",{className:n.sectionToggle,onClick:()=>D("reasoning"),"aria-expanded":p.has("reasoning"),children:[e.jsx("span",{className:`${n.chevron} ${p.has("reasoning")?n.chevronOpen:""}`,"aria-hidden":"true",children:e.jsx("svg",{width:"10",height:"10",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:e.jsx("polyline",{points:"9 18 15 12 9 6"})})}),"Reasoning"]}),p.has("reasoning")&&e.jsx("div",{className:n.sectionContent,children:c})]})]}),(g||f)&&e.jsxs("div",{className:n.actions,children:[f&&e.jsx("button",{className:`${n.btn} ${n.btnSecondary}`,onClick:f,type:"button",children:"Modify Plan"}),e.jsx("span",{className:n.actionsSpacerRight}),g&&e.jsxs("button",{className:`${n.btn} ${n.btnPrimary}`,onClick:g,type:"button",children:["Proceed",e.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("line",{x1:"5",y1:"12",x2:"19",y2:"12"}),e.jsx("polyline",{points:"12 5 19 12 12 19"})]})]})]}),e.jsx(O,{})]})}L.__docgenInfo={description:"",methods:[],displayName:"PlanCard",props:{title:{required:!0,tsType:{name:"string"},description:"Title of the plan"},steps:{required:!0,tsType:{name:"Array",elements:[{name:"PlanStep"}],raw:"PlanStep[]"},description:"Array of plan steps to display"},mode:{required:!1,tsType:{name:"union",raw:"'determinate' | 'indeterminate'",elements:[{name:"literal",value:"'determinate'"},{name:"literal",value:"'indeterminate'"}]},description:"Plan mode — determinate (known total) or indeterminate",defaultValue:{value:"'determinate'",computed:!1}},assumptions:{required:!1,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:"Assumptions the agent made"},reasoning:{required:!1,tsType:{name:"string"},description:"Agent's overall reasoning for this plan"},activeStepId:{required:!1,tsType:{name:"string"},description:"Override which step appears active (by step ID)"},onStepClick:{required:!1,tsType:{name:"signature",type:"function",raw:"(step: PlanStep) => void",signature:{arguments:[{type:{name:"PlanStep"},name:"step"}],return:{name:"void"}}},description:"Called when a step is clicked"},showConfidence:{required:!1,tsType:{name:"boolean"},description:"Show confidence per step",defaultValue:{value:"false",computed:!1}},isStreaming:{required:!1,tsType:{name:"boolean"},description:'When true, indicates that plan steps are still being generated by a\nstreaming backend. Exposes `data-streaming="true"` on the root element\nas a CSS hook — the consumer decides how to style the streaming state.',defaultValue:{value:"false",computed:!1}},showReasoning:{required:!1,tsType:{name:"boolean"},description:"Global toggle for per-step reasoning text. Defaults to `false` — reasoning\nis hidden unless explicitly opted in. Requires `PlanStep.reasoning` to be\npopulated to have any effect.",defaultValue:{value:"false",computed:!1}},defaultExpandedStepId:{required:!1,tsType:{name:"string"},description:"ID of the step whose reasoning is expanded by default (uncontrolled).\nFollows the same pattern as `activeStepId`. No-op if `showReasoning` is\nfalse or the step has no `reasoning` string."},className:{required:!1,tsType:{name:"string"},description:"Additional CSS class"},onProceed:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onModify:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}};const qe={title:"AX Components/PlanCard",component:L,tags:["autodocs"],argTypes:{mode:{control:"select",options:["determinate","indeterminate"]},showConfidence:{control:"boolean"},isStreaming:{control:"boolean"},showReasoning:{control:"boolean"}}},$=E({stepCount:5,includeConfidence:!0}),y={args:{title:$.title,steps:$.steps,assumptions:$.assumptions}},x={args:{...E({stepCount:5,includeConfidence:!0,includeReasoning:!0}),showConfidence:!0}},w={name:"State: Active (step 2 in progress)",args:{title:"Refactor authentication layer",steps:[{id:"s1",label:"Audit existing auth code",status:"completed",confidence:92},{id:"s2",label:"Extract token refresh logic",status:"active",confidence:78,reasoning:"Isolating to a pure function decouples it from the HTTP client."},{id:"s3",label:"Write unit tests",status:"pending",confidence:85},{id:"s4",label:"Update integration tests",status:"pending",confidence:70},{id:"s5",label:"PR and review",status:"pending"}],showConfidence:!0,assumptions:["Auth module is isolated","CI pipeline is green"]}},_={name:"State: All Completed",args:{title:"Generate API documentation",steps:[{id:"s1",label:"Parse OpenAPI schema",status:"completed",confidence:95},{id:"s2",label:"Generate endpoint descriptions",status:"completed",confidence:88},{id:"s3",label:"Write usage examples",status:"completed",confidence:91},{id:"s4",label:"Export as Markdown",status:"completed",confidence:99}],showConfidence:!0}},k={name:"State: Step Failed",args:{title:"Deploy to staging",steps:[{id:"s1",label:"Build production bundle",status:"completed",confidence:97},{id:"s2",label:"Run smoke tests",status:"completed",confidence:90},{id:"s3",label:"Push to staging cluster",status:"failed",confidence:40},{id:"s4",label:"Verify health checks",status:"pending"}],assumptions:["AWS credentials are valid","ECS cluster is running"]}},P={name:"State: Indeterminate (open-ended)",args:{title:"Exploratory research on caching strategies",mode:"indeterminate",steps:[{id:"s1",label:"Survey Redis documentation",status:"completed"},{id:"s2",label:"Benchmark Memcached vs Redis",status:"active"},{id:"s3",label:"Prototype with Dragonfly",status:"pending"}],reasoning:"The number of additional steps depends on what the benchmarks reveal."}},I={name:"State: No Steps (empty)",args:{title:"Pending plan generation",steps:[]}},j={name:"State: Streaming (steps still arriving)",args:{title:"Generating migration plan",isStreaming:!0,mode:"indeterminate",steps:[{id:"s1",label:"Analyse schema diff",status:"completed"},{id:"s2",label:"Generate ALTER TABLE statements",status:"active"}],assumptions:["Database is PostgreSQL 15+"]}},A={name:"Feature: Show Reasoning (per step)",args:{title:"Refactor authentication layer",showReasoning:!0,showConfidence:!0,steps:[{id:"s1",label:"Audit existing auth code",status:"completed",confidence:92,reasoning:"Found 3 places where token refresh is duplicated across modules."},{id:"s2",label:"Extract token refresh logic",status:"active",confidence:78,reasoning:"Isolating to a pure function decouples it from the HTTP client and makes it testable."},{id:"s3",label:"Write unit tests",status:"pending",confidence:85,reasoning:"Need 90%+ branch coverage on the refresh path before the PR can merge."}]}},R={name:"Feature: Default Expanded Reasoning (step 2)",args:{title:"Implement OAuth 2.0 with PKCE",showReasoning:!0,defaultExpandedStepId:"s2",steps:[{id:"s1",label:"Research PKCE spec",status:"completed",reasoning:"RFC 7636 mandates code_verifier length ≥ 43 characters."},{id:"s2",label:"Design token storage strategy",status:"active",reasoning:`httpOnly cookies are preferred over localStorage to mitigate XSS. This step's reasoning is expanded by default via defaultExpandedStepId="s2".`},{id:"s3",label:"Implement auth code flow",status:"pending",reasoning:"Will use the PKCE challenge generated in step 2."}]}},b={name:"Prototype: Step Selection",render:()=>{const s=E({stepCount:5,includeConfidence:!0,includeReasoning:!0}),[i,o]=u.useState(s.steps[1]?.id??""),[r,c]=u.useState("(none)"),l=a=>{o(a.id),c(a.label)};return e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"12px",maxWidth:"560px"},children:[e.jsxs("div",{style:{fontSize:"13px",color:"#888"},children:["Last clicked: ",e.jsx("strong",{children:r})]}),e.jsx(L,{...s,activeStepId:i,onStepClick:l,showConfidence:!0})]})}},S={name:"Prototype: Live Execution",render:()=>{const s=E({stepCount:6,includeConfidence:!0}),[i,o]=u.useState(s.steps),[r,c]=u.useState(!1),[l,a]=u.useState(null),g=()=>{o(s.steps.map(m=>({...m,status:"pending"}))),c(!0);const{cancel:T}=Y({steps:s.steps.map(m=>({...m,status:"pending"})),onUpdate:m=>o(m),intervalMs:1200});a(()=>T)},f=()=>{l?.(),c(!1)};return e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"12px",maxWidth:"560px"},children:[e.jsxs("div",{style:{display:"flex",gap:"8px"},children:[e.jsx("button",{onClick:g,disabled:r,style:{padding:"6px 16px",borderRadius:"6px",cursor:r?"default":"pointer"},children:"Start simulation"}),e.jsx("button",{onClick:f,disabled:!r,style:{padding:"6px 16px",borderRadius:"6px",cursor:r?"pointer":"default"},children:"Stop"})]}),e.jsx(L,{title:s.title,steps:i,assumptions:s.assumptions,showConfidence:!0})]})}},v={name:"Production: Software Planning Task",args:{title:"Implement OAuth 2.0 with PKCE",mode:"determinate",showConfidence:!0,steps:[{id:"p1",label:"Research PKCE spec (RFC 7636)",status:"completed",confidence:98},{id:"p2",label:"Design token storage strategy",status:"completed",confidence:91},{id:"p3",label:"Implement authorization code flow",status:"active",confidence:84,reasoning:"PKCE flow prevents auth code interception in public clients without a client secret."},{id:"p4",label:"Add token refresh with sliding expiry",status:"pending",confidence:79},{id:"p5",label:"Write integration tests",status:"pending",confidence:87},{id:"p6",label:"Security audit & pen test",status:"pending",confidence:72}],assumptions:["Identity provider supports PKCE","Frontend is a SPA (no client secret)","Token storage uses httpOnly cookies"],reasoning:"PKCE is the recommended OAuth 2.0 flow for SPAs as of RFC 9700. The sequential steps ensure each security layer is validated before proceeding."}},C={name:"Production: Data Analysis (Indeterminate)",args:{title:"Diagnose API latency regression",mode:"indeterminate",showConfidence:!0,steps:[{id:"d1",label:"Pull last 7 days of trace data",status:"completed",confidence:99},{id:"d2",label:"Identify p99 latency outliers",status:"completed",confidence:94},{id:"d3",label:"Correlate with recent deploys",status:"active",confidence:81},{id:"d4",label:"Isolate DB query bottleneck",status:"pending",confidence:70}],reasoning:"Additional steps may be added depending on whether the bottleneck is in the DB layer, network, or application code.",assumptions:["Datadog traces are available for the time window","Deploy log access is granted"]}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
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
}`,...x.parameters?.docs?.source},description:{story:"All features enabled: assumptions, reasoning, confidence badges",...x.parameters?.docs?.description}}};w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
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
}`,...w.parameters?.docs?.source}}};_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
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
}`,..._.parameters?.docs?.source}}};k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
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
}`,...P.parameters?.docs?.source}}};I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  name: 'State: No Steps (empty)',
  args: {
    title: 'Pending plan generation',
    steps: []
  }
}`,...I.parameters?.docs?.source}}};j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  name: 'State: Streaming (steps still arriving)',
  args: {
    title: 'Generating migration plan',
    isStreaming: true,
    mode: 'indeterminate',
    steps: [{
      id: 's1',
      label: 'Analyse schema diff',
      status: 'completed'
    }, {
      id: 's2',
      label: 'Generate ALTER TABLE statements',
      status: 'active'
    }],
    assumptions: ['Database is PostgreSQL 15+']
  }
}`,...j.parameters?.docs?.source}}};A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  name: 'Feature: Show Reasoning (per step)',
  args: {
    title: 'Refactor authentication layer',
    showReasoning: true,
    showConfidence: true,
    steps: [{
      id: 's1',
      label: 'Audit existing auth code',
      status: 'completed',
      confidence: 92,
      reasoning: 'Found 3 places where token refresh is duplicated across modules.'
    }, {
      id: 's2',
      label: 'Extract token refresh logic',
      status: 'active',
      confidence: 78,
      reasoning: 'Isolating to a pure function decouples it from the HTTP client and makes it testable.'
    }, {
      id: 's3',
      label: 'Write unit tests',
      status: 'pending',
      confidence: 85,
      reasoning: 'Need 90%+ branch coverage on the refresh path before the PR can merge.'
    }]
  }
}`,...A.parameters?.docs?.source}}};R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  name: 'Feature: Default Expanded Reasoning (step 2)',
  args: {
    title: 'Implement OAuth 2.0 with PKCE',
    showReasoning: true,
    defaultExpandedStepId: 's2',
    steps: [{
      id: 's1',
      label: 'Research PKCE spec',
      status: 'completed',
      reasoning: 'RFC 7636 mandates code_verifier length ≥ 43 characters.'
    }, {
      id: 's2',
      label: 'Design token storage strategy',
      status: 'active',
      reasoning: 'httpOnly cookies are preferred over localStorage to mitigate XSS. This step\\'s reasoning is expanded by default via defaultExpandedStepId="s2".'
    }, {
      id: 's3',
      label: 'Implement auth code flow',
      status: 'pending',
      reasoning: 'Will use the PKCE challenge generated in step 2.'
    }]
  }
}`,...R.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
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
}`,...b.parameters?.docs?.source},description:{story:"Interactive prototype: click steps to select them",...b.parameters?.docs?.description}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
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
}`,...S.parameters?.docs?.source},description:{story:"Live execution simulation: steps auto-advance pending → active → completed",...S.parameters?.docs?.description}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
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
}`,...C.parameters?.docs?.source},description:{story:"Production: data analysis task with indeterminate steps",...C.parameters?.docs?.description}}};const Ke=["Default","AllFeatures","StateActive","StateCompleted","StateFailed","StateIndeterminate","StateEmpty","StateStreaming","ShowReasoningToggle","DefaultExpandedReasoning","PrototypeStepSelection","PrototypeLiveExecution","ProductionSoftwarePlan","ProductionDataAnalysis"];export{x as AllFeatures,y as Default,R as DefaultExpandedReasoning,C as ProductionDataAnalysis,v as ProductionSoftwarePlan,S as PrototypeLiveExecution,b as PrototypeStepSelection,A as ShowReasoningToggle,w as StateActive,_ as StateCompleted,I as StateEmpty,k as StateFailed,P as StateIndeterminate,j as StateStreaming,Ke as __namedExportsOrder,qe as default};
