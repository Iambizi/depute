import{j as e}from"./jsx-runtime-u17CrQMm.js";const p="_container_7bw8d_1",m="_header_7bw8d_11",y="_title_7bw8d_20",x="_duration_7bw8d_29",f="_body_7bw8d_39",g="_summaryBlock_7bw8d_43",w="_grid_7bw8d_52",_="_sectionTitle_7bw8d_64",v="_surfacesList_7bw8d_76",b="_surfaceItem_7bw8d_82",j="_surfaceLabel_7bw8d_97",k="_surfaceType_7bw8d_105",S="_surfaceAction_7bw8d_109",L="_read_7bw8d_117",T="_write_7bw8d_121",N="_execute_7bw8d_125",D="_decisionsList_7bw8d_130",B="_decisionItem_7bw8d_136",s={container:p,header:m,title:y,duration:x,body:f,summaryBlock:g,grid:w,sectionTitle:_,surfacesList:v,surfaceItem:b,surfaceLabel:j,surfaceType:k,surfaceAction:S,read:L,write:T,execute:N,decisionsList:D,decisionItem:B};function A(n){switch(n){case"file":return e.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("path",{d:"M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"}),e.jsx("polyline",{points:"14 2 14 8 20 8"})]});case"api":return e.jsx("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:e.jsx("path",{d:"M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"})});case"database":return e.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("ellipse",{cx:"12",cy:"5",rx:"9",ry:"3"}),e.jsx("path",{d:"M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"}),e.jsx("path",{d:"M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"})]});case"system":return e.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("rect",{x:"2",y:"3",width:"20",height:"14",rx:"2",ry:"2"}),e.jsx("line",{x1:"8",y1:"21",x2:"16",y2:"21"}),e.jsx("line",{x1:"12",y1:"17",x2:"12",y2:"21"})]})}}function d({sessionSummary:n,duration:l,surfacesTouched:u,keyDecisions:c=[],className:h=""}){return e.jsxs("div",{className:`${s.container} ${h}`,"data-testid":"ax-session-overview",children:[e.jsxs("div",{className:s.header,children:[e.jsxs("div",{className:s.title,children:[e.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("path",{d:"M3 3v18h18"}),e.jsx("path",{d:"m19 9-5 5-4-4-3 3"})]}),"Session Overview"]}),e.jsx("div",{className:s.duration,children:l})]}),e.jsxs("div",{className:s.body,children:[e.jsx("div",{className:s.summaryBlock,children:n}),e.jsxs("div",{className:s.grid,children:[e.jsxs("div",{className:s.surfacesGroup,children:[e.jsxs("div",{className:s.sectionTitle,children:[e.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("rect",{x:"3",y:"3",width:"7",height:"7"}),e.jsx("rect",{x:"14",y:"3",width:"7",height:"7"}),e.jsx("rect",{x:"14",y:"14",width:"7",height:"7"}),e.jsx("rect",{x:"3",y:"14",width:"7",height:"7"})]}),"Impacted Surfaces"]}),e.jsx("div",{className:s.surfacesList,children:u.map((t,o)=>e.jsxs("div",{className:s.surfaceItem,children:[e.jsxs("div",{className:s.surfaceLabel,children:[e.jsx("span",{className:s.surfaceType,children:A(t.type)}),e.jsx("span",{children:t.label})]}),e.jsx("span",{className:`${s.surfaceAction} ${s[t.action]}`,children:t.action})]},o))})]}),c.length>0&&e.jsxs("div",{className:s.decisionsGroup,children:[e.jsxs("div",{className:s.sectionTitle,children:[e.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("circle",{cx:"12",cy:"12",r:"10"}),e.jsx("path",{d:"M12 16v-4"}),e.jsx("path",{d:"M12 8h.01"})]}),"Key AI Decisions"]}),e.jsx("div",{className:s.decisionsList,children:c.map((t,o)=>e.jsx("div",{className:s.decisionItem,children:t.description},o))})]})]})]})]})}d.__docgenInfo={description:"",methods:[],displayName:"SessionOverview",props:{sessionSummary:{required:!0,tsType:{name:"string"},description:"High-level semantic summary of what the agent achieved"},duration:{required:!0,tsType:{name:"string"},description:"Total elapsed time of the agent session"},surfacesTouched:{required:!0,tsType:{name:"Array",elements:[{name:"SurfaceTouched"}],raw:"SurfaceTouched[]"},description:"Which digital surfaces the agent interacted with"},keyDecisions:{required:!1,tsType:{name:"Array",elements:[{name:"KeyDecision"}],raw:"KeyDecision[]"},description:"Significant decisions or path deviations made autonomously",defaultValue:{value:"[]",computed:!1}},className:{required:!1,tsType:{name:"string"},description:"Optional CSS class name",defaultValue:{value:"''",computed:!1}}}};const C={title:"ax-components-v2/SessionOverview",component:d,parameters:{layout:"padded"},tags:["autodocs"]},i={args:{sessionSummary:"Analyzed 3 recent log files and pushed an emergency patch to the auth service.",duration:"4m 12s",surfacesTouched:[{type:"system",label:"production-cluster-01",action:"read"},{type:"file",label:"auth/middleware.ts",action:"write"},{type:"api",label:"Deploy Service",action:"execute"}],keyDecisions:[{description:"Bypassed standard staging review due to the severe P0 classification."},{description:"Hardcoded the hotfix instead of rolling back the entire release train."}]}},a={args:{sessionSummary:"Extracted Q3 revenue data and compiled the weekly performance report.",duration:"1m 05s",surfacesTouched:[{type:"database",label:"analytics_warehouse",action:"read"},{type:"api",label:"Stripe Billing",action:"read"},{type:"file",label:"q3_report_draft.md",action:"write"}],keyDecisions:[]}},r={args:{sessionSummary:"Scraped 45 endpoints and aggregated user telemetry into the new schema.",duration:"45m 22s",surfacesTouched:[{type:"api",label:"telemetry/v1/*",action:"read"},{type:"database",label:"metrics_db (staging)",action:"write"},{type:"system",label:"cron-runner",action:"execute"}],keyDecisions:[{description:"Dropped 14 corrupted records that failed schema validation."},{description:"Automatically increased API rate limits after hitting 429 errors twice."}]}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    sessionSummary: 'Analyzed 3 recent log files and pushed an emergency patch to the auth service.',
    duration: '4m 12s',
    surfacesTouched: [{
      type: 'system',
      label: 'production-cluster-01',
      action: 'read'
    }, {
      type: 'file',
      label: 'auth/middleware.ts',
      action: 'write'
    }, {
      type: 'api',
      label: 'Deploy Service',
      action: 'execute'
    }],
    keyDecisions: [{
      description: 'Bypassed standard staging review due to the severe P0 classification.'
    }, {
      description: 'Hardcoded the hotfix instead of rolling back the entire release train.'
    }]
  }
}`,...i.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    sessionSummary: 'Extracted Q3 revenue data and compiled the weekly performance report.',
    duration: '1m 05s',
    surfacesTouched: [{
      type: 'database',
      label: 'analytics_warehouse',
      action: 'read'
    }, {
      type: 'api',
      label: 'Stripe Billing',
      action: 'read'
    }, {
      type: 'file',
      label: 'q3_report_draft.md',
      action: 'write'
    }],
    // Empty key decisions array should hide the section
    keyDecisions: []
  }
}`,...a.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    sessionSummary: 'Scraped 45 endpoints and aggregated user telemetry into the new schema.',
    duration: '45m 22s',
    surfacesTouched: [{
      type: 'api',
      label: 'telemetry/v1/*',
      action: 'read'
    }, {
      type: 'database',
      label: 'metrics_db (staging)',
      action: 'write'
    }, {
      type: 'system',
      label: 'cron-runner',
      action: 'execute'
    }],
    keyDecisions: [{
      description: 'Dropped 14 corrupted records that failed schema validation.'
    }, {
      description: 'Automatically increased API rate limits after hitting 429 errors twice.'
    }]
  }
}`,...r.parameters?.docs?.source}}};const W=["Default","RoutineDataExtraction","HighVelocityScraping"];export{i as Default,r as HighVelocityScraping,a as RoutineDataExtraction,W as __namedExportsOrder,C as default};
