import{j as e}from"./jsx-runtime-u17CrQMm.js";import{r as b}from"./iframe-C-UiW1EA.js";import{n as o}from"./mockData-DOQp8R7v.js";import"./preload-helper-PPVm8Dsz.js";const w="_base_1d7ay_3",f="_header_1d7ay_13",j="_title_1d7ay_22",P="_totalBadge_1d7ay_28",A="_empty_1d7ay_36",v="_body_1d7ay_43",I="_section_1d7ay_52",N="_sectionHeader_1d7ay_62",Q="_sectionLabel_1d7ay_71",S="_sectionCount_1d7ay_79",L="_taskRow_1d7ay_85",M="_row_in_progress_1d7ay_103",R="_row_assigned_1d7ay_104",B="_row_pending_1d7ay_105",H="_priorityChip_1d7ay_108",W="_priorityCritical_1d7ay_119",D="_priorityHigh_1d7ay_120",E="_priorityMedium_1d7ay_121",$="_priorityLow_1d7ay_122",q="_taskContent_1d7ay_125",O="_taskTitle_1d7ay_133",U="_taskDesc_1d7ay_139",z="_taskMeta_1d7ay_144",F="_metaItem_1d7ay_150",Y="_actions_1d7ay_156",V="_btnPromote_1d7ay_168",X="_btnAssign_1d7ay_169",G="_btnCancel_1d7ay_170",s={base:w,header:f,title:j,totalBadge:P,empty:A,body:v,section:I,sectionHeader:N,sectionLabel:Q,sectionCount:S,taskRow:L,row_in_progress:M,row_assigned:R,row_pending:B,priorityChip:H,priorityCritical:W,priorityHigh:D,priorityMedium:E,priorityLow:$,taskContent:q,taskTitle:O,taskDesc:U,taskMeta:z,metaItem:F,actions:Y,btnPromote:V,btnAssign:X,btnCancel:G},J={critical:s.priorityCritical,high:s.priorityHigh,medium:s.priorityMedium,low:s.priorityLow},K={critical:"Critical",high:"High",medium:"Med",low:"Low"};function Z({task:t,onTaskAction:n}){return e.jsxs("div",{className:`${s.taskRow} ${s[`row_${t.status}`]??""}`,children:[e.jsx("span",{className:`${s.priorityChip} ${J[t.priority]??""}`,children:K[t.priority]}),e.jsxs("div",{className:s.taskContent,children:[e.jsx("span",{className:s.taskTitle,children:t.title}),t.description&&e.jsx("span",{className:s.taskDesc,children:t.description}),e.jsxs("div",{className:s.taskMeta,children:[t.assignedTo&&e.jsxs("span",{className:s.metaItem,children:["→ ",t.assignedTo]}),t.estimatedTokens!=null&&e.jsxs("span",{className:s.metaItem,children:["~",t.estimatedTokens.toLocaleString()," tok"]})]})]}),n&&e.jsxs("div",{className:s.actions,children:[t.status==="pending"&&e.jsx("button",{className:s.btnPromote,onClick:()=>n(t.id,"promote"),title:"Promote to top",children:"↑"}),t.status!=="in_progress"&&e.jsx("button",{className:s.btnAssign,onClick:()=>n(t.id,"assign"),title:"Assign to agent",children:"⊕"}),e.jsx("button",{className:s.btnCancel,onClick:()=>n(t.id,"cancel"),title:"Cancel task",children:e.jsxs("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),e.jsx("line",{x1:"6",y1:"6",x2:"18",y2:"18"})]})})]})]})}const h=({className:t,tasks:n=[],onTaskAction:k})=>{const c=n.filter(i=>i.status==="pending"),r=n.filter(i=>i.status==="assigned"),d=n.filter(i=>i.status==="in_progress"),a=(i,T,x)=>T.length>0&&e.jsxs("div",{className:s.section,children:[e.jsxs("div",{className:s.sectionHeader,children:[e.jsx("span",{className:s.sectionLabel,children:i}),e.jsx("span",{className:s.sectionCount,children:x})]}),T.map(C=>e.jsx(Z,{task:C,onTaskAction:k},C.id))]});return e.jsxs("div",{className:`${s.base} ${t||""}`,role:"region","aria-label":"Task Queue",children:[e.jsxs("div",{className:s.header,children:[e.jsx("span",{className:s.title,children:"Task Queue"}),e.jsxs("span",{className:s.totalBadge,children:[n.length," tasks"]})]}),n.length===0?e.jsx("div",{className:s.empty,children:"Queue is empty."}):e.jsxs("div",{className:s.body,children:[a("In Progress",d,d.length),a("Assigned",r,r.length),a("Pending",c,c.length)]})]})};h.__docgenInfo={description:"TaskQueue renders the backlog of pending tasks awaiting assignment to available workers.",methods:[],displayName:"TaskQueue",props:{className:{required:!1,tsType:{name:"string"},description:"The root layout class name"},tasks:{required:!1,tsType:{name:"Array",elements:[{name:"TaskQueueItem"}],raw:"TaskQueueItem[]"},description:"List of tasks in the backlog queue",defaultValue:{value:"[]",computed:!1}},onTaskAction:{required:!1,tsType:{name:"signature",type:"function",raw:"(id: string, action: 'promote' | 'assign' | 'cancel') => void",signature:{arguments:[{type:{name:"string"},name:"id"},{type:{name:"union",raw:"'promote' | 'assign' | 'cancel'",elements:[{name:"literal",value:"'promote'"},{name:"literal",value:"'assign'"},{name:"literal",value:"'cancel'"}]},name:"action"}],return:{name:"void"}}},description:"Callback when a user acts on a task"}}};const ae={title:"AX Components v1/TaskQueue",component:h,tags:["autodocs"]},l={args:{tasks:o(8)}},m={name:"State: All Pending",args:{tasks:o(5).map(t=>({...t,status:"pending",assignedTo:void 0}))}},p={name:"State: All In Progress",args:{tasks:o(4).map(t=>({...t,status:"in_progress",assignedTo:"Code-Writer-1"}))}},u={name:"State: Critical Priority Tasks",args:{tasks:o(6).map((t,n)=>({...t,priority:n<2?"critical":t.priority}))}},g={name:"State: Empty Queue",args:{tasks:[]}},_={name:"Prototype: Assign + Promote Tasks",render:()=>{const[t,n]=b.useState(o(7)),k=(c,r)=>{n(d=>d.map(a=>a.id!==c?a:r==="assign"?{...a,status:"assigned",assignedTo:"Code-Writer-1"}:r==="promote"?{...a,status:"in_progress"}:a))};return e.jsx(h,{tasks:t,onTaskAction:k})}},y={name:"Basic Usage",args:{tasks:[{id:"t1",title:"Refactor auth middleware",priority:"critical",status:"in_progress",assignedTo:"Code-Writer-1",estimatedTokens:6e3},{id:"t2",title:"Write integration tests for billing",priority:"high",status:"assigned",assignedTo:"QA-Inspector",estimatedTokens:4200},{id:"t3",title:"Document new API endpoints",priority:"medium",status:"pending",estimatedTokens:2100},{id:"t4",title:"Optimize database query performance",priority:"low",status:"pending",estimatedTokens:3500}]}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    tasks: generateMockTaskQueue(8)
  }
}`,...l.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  name: 'State: All Pending',
  args: {
    tasks: generateMockTaskQueue(5).map(t => ({
      ...t,
      status: 'pending' as const,
      assignedTo: undefined
    }))
  }
}`,...m.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  name: 'State: All In Progress',
  args: {
    tasks: generateMockTaskQueue(4).map(t => ({
      ...t,
      status: 'in_progress' as const,
      assignedTo: 'Code-Writer-1'
    }))
  }
}`,...p.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  name: 'State: Critical Priority Tasks',
  args: {
    tasks: generateMockTaskQueue(6).map((t, i) => ({
      ...t,
      priority: i < 2 ? 'critical' as const : t.priority
    }))
  }
}`,...u.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  name: 'State: Empty Queue',
  args: {
    tasks: []
  }
}`,...g.parameters?.docs?.source}}};_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  name: 'Prototype: Assign + Promote Tasks',
  render: () => {
    const [tasks, setTasks] = useState<TaskQueueItem[]>(generateMockTaskQueue(7));
    const handleAction = (id: string, action: 'promote' | 'assign' | 'cancel') => {
      setTasks(prev => prev.map(t => {
        if (t.id !== id) return t;
        if (action === 'assign') return {
          ...t,
          status: 'assigned' as const,
          assignedTo: 'Code-Writer-1'
        };
        if (action === 'promote') return {
          ...t,
          status: 'in_progress' as const
        };
        return t;
      }));
    };
    return <TaskQueue tasks={tasks} onTaskAction={handleAction} />;
  }
}`,..._.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  name: 'Basic Usage',
  args: {
    tasks: [{
      id: 't1',
      title: 'Refactor auth middleware',
      priority: 'critical',
      status: 'in_progress',
      assignedTo: 'Code-Writer-1',
      estimatedTokens: 6000
    }, {
      id: 't2',
      title: 'Write integration tests for billing',
      priority: 'high',
      status: 'assigned',
      assignedTo: 'QA-Inspector',
      estimatedTokens: 4200
    }, {
      id: 't3',
      title: 'Document new API endpoints',
      priority: 'medium',
      status: 'pending',
      estimatedTokens: 2100
    }, {
      id: 't4',
      title: 'Optimize database query performance',
      priority: 'low',
      status: 'pending',
      estimatedTokens: 3500
    }] satisfies TaskQueueItem[]
  }
}`,...y.parameters?.docs?.source}}};const ie=["Default","AllPending","AllInProgress","CriticalFirst","EmptyQueue","PrototypeInteractive","BasicUsage"];export{p as AllInProgress,m as AllPending,y as BasicUsage,u as CriticalFirst,l as Default,g as EmptyQueue,_ as PrototypeInteractive,ie as __namedExportsOrder,ae as default};
