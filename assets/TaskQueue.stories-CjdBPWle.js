import{j as t,r as w}from"./iframe-B9939OLV.js";import{n as o}from"./mockData-DOQp8R7v.js";import"./preload-helper-PPVm8Dsz.js";const f="_base_dtbnu_3",x="_header_dtbnu_13",P="_title_dtbnu_22",A="_totalBadge_dtbnu_28",j="_empty_dtbnu_36",I="_body_dtbnu_43",N="_section_dtbnu_52",Q="_sectionHeader_dtbnu_62",v="_sectionLabel_dtbnu_71",S="_sectionCount_dtbnu_79",M="_taskRow_dtbnu_85",L="_row_in_progress_dtbnu_103",R="_row_assigned_dtbnu_104",B="_row_pending_dtbnu_105",H="_priorityChip_dtbnu_108",D="_priorityCritical_dtbnu_119",E="_priorityHigh_dtbnu_120",W="_priorityMedium_dtbnu_121",$="_priorityLow_dtbnu_122",q="_taskContent_dtbnu_125",O="_taskTitle_dtbnu_133",U="_taskDesc_dtbnu_139",z="_taskMeta_dtbnu_144",F="_metaItem_dtbnu_150",Y="_actions_dtbnu_156",V="_btnPromote_dtbnu_168",X="_btnAssign_dtbnu_169",G="_btnCancel_dtbnu_170",e={base:f,header:x,title:P,totalBadge:A,empty:j,body:I,section:N,sectionHeader:Q,sectionLabel:v,sectionCount:S,taskRow:M,row_in_progress:L,row_assigned:R,row_pending:B,priorityChip:H,priorityCritical:D,priorityHigh:E,priorityMedium:W,priorityLow:$,taskContent:q,taskTitle:O,taskDesc:U,taskMeta:z,metaItem:F,actions:Y,btnPromote:V,btnAssign:X,btnCancel:G},J={critical:e.priorityCritical,high:e.priorityHigh,medium:e.priorityMedium,low:e.priorityLow},K={critical:"Critical",high:"High",medium:"Med",low:"Low"};function Z({task:s,onTaskAction:n}){return t.jsxs("div",{className:`${e.taskRow} ${e[`row_${s.status}`]??""}`,children:[t.jsx("span",{className:`${e.priorityChip} ${J[s.priority]??""}`,children:K[s.priority]}),t.jsxs("div",{className:e.taskContent,children:[t.jsx("span",{className:e.taskTitle,children:s.title}),s.description&&t.jsx("span",{className:e.taskDesc,children:s.description}),t.jsxs("div",{className:e.taskMeta,children:[s.assignedTo&&t.jsxs("span",{className:e.metaItem,children:["→ ",s.assignedTo]}),s.estimatedTokens!=null&&t.jsxs("span",{className:e.metaItem,children:["~",s.estimatedTokens.toLocaleString()," tok"]})]})]}),n&&t.jsxs("div",{className:e.actions,children:[s.status==="pending"&&t.jsx("button",{className:e.btnPromote,onClick:()=>n(s.id,"promote"),title:"Promote to top",children:"↑"}),s.status!=="in_progress"&&t.jsx("button",{className:e.btnAssign,onClick:()=>n(s.id,"assign"),title:"Assign to agent",children:"⊕"}),t.jsx("button",{className:e.btnCancel,onClick:()=>n(s.id,"cancel"),title:"Cancel task",children:"✕"})]})]})}const b=({className:s,tasks:n=[],onTaskAction:y})=>{const c=n.filter(i=>i.status==="pending"),r=n.filter(i=>i.status==="assigned"),d=n.filter(i=>i.status==="in_progress"),a=(i,h,C)=>h.length>0&&t.jsxs("div",{className:e.section,children:[t.jsxs("div",{className:e.sectionHeader,children:[t.jsx("span",{className:e.sectionLabel,children:i}),t.jsx("span",{className:e.sectionCount,children:C})]}),h.map(T=>t.jsx(Z,{task:T,onTaskAction:y},T.id))]});return t.jsxs("div",{className:`${e.base} ${s||""}`,role:"region","aria-label":"Task Queue",children:[t.jsxs("div",{className:e.header,children:[t.jsx("span",{className:e.title,children:"Task Queue"}),t.jsxs("span",{className:e.totalBadge,children:[n.length," tasks"]})]}),n.length===0?t.jsx("div",{className:e.empty,children:"Queue is empty."}):t.jsxs("div",{className:e.body,children:[a("In Progress",d,d.length),a("Assigned",r,r.length),a("Pending",c,c.length)]})]})};b.__docgenInfo={description:"TaskQueue renders the backlog of pending tasks awaiting assignment to available workers.",methods:[],displayName:"TaskQueue",props:{className:{required:!1,tsType:{name:"string"},description:"The root layout class name"},tasks:{required:!1,tsType:{name:"Array",elements:[{name:"TaskQueueItem"}],raw:"TaskQueueItem[]"},description:"List of tasks in the backlog queue",defaultValue:{value:"[]",computed:!1}},onTaskAction:{required:!1,tsType:{name:"signature",type:"function",raw:"(id: string, action: 'promote' | 'assign' | 'cancel') => void",signature:{arguments:[{type:{name:"string"},name:"id"},{type:{name:"union",raw:"'promote' | 'assign' | 'cancel'",elements:[{name:"literal",value:"'promote'"},{name:"literal",value:"'assign'"},{name:"literal",value:"'cancel'"}]},name:"action"}],return:{name:"void"}}},description:"Callback when a user acts on a task"}}};const ne={title:"AX Components v1/TaskQueue",component:b,tags:["autodocs"]},l={args:{tasks:o(8)}},u={name:"State: All Pending",args:{tasks:o(5).map(s=>({...s,status:"pending",assignedTo:void 0}))}},m={name:"State: All In Progress",args:{tasks:o(4).map(s=>({...s,status:"in_progress",assignedTo:"Code-Writer-1"}))}},p={name:"State: Critical Priority Tasks",args:{tasks:o(6).map((s,n)=>({...s,priority:n<2?"critical":s.priority}))}},g={name:"State: Empty Queue",args:{tasks:[]}},_={name:"Prototype: Assign + Promote Tasks",render:()=>{const[s,n]=w.useState(o(7)),y=(c,r)=>{n(d=>d.map(a=>a.id!==c?a:r==="assign"?{...a,status:"assigned",assignedTo:"Code-Writer-1"}:r==="promote"?{...a,status:"in_progress"}:a))};return t.jsx(b,{tasks:s,onTaskAction:y})}},k={name:"Basic Usage",args:{tasks:[{id:"t1",title:"Refactor auth middleware",priority:"critical",status:"in_progress",assignedTo:"Code-Writer-1",estimatedTokens:6e3},{id:"t2",title:"Write integration tests for billing",priority:"high",status:"assigned",assignedTo:"QA-Inspector",estimatedTokens:4200},{id:"t3",title:"Document new API endpoints",priority:"medium",status:"pending",estimatedTokens:2100},{id:"t4",title:"Optimize database query performance",priority:"low",status:"pending",estimatedTokens:3500}]}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    tasks: generateMockTaskQueue(8)
  }
}`,...l.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  name: 'State: All Pending',
  args: {
    tasks: generateMockTaskQueue(5).map(t => ({
      ...t,
      status: 'pending' as const,
      assignedTo: undefined
    }))
  }
}`,...u.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  name: 'State: All In Progress',
  args: {
    tasks: generateMockTaskQueue(4).map(t => ({
      ...t,
      status: 'in_progress' as const,
      assignedTo: 'Code-Writer-1'
    }))
  }
}`,...m.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  name: 'State: Critical Priority Tasks',
  args: {
    tasks: generateMockTaskQueue(6).map((t, i) => ({
      ...t,
      priority: i < 2 ? 'critical' as const : t.priority
    }))
  }
}`,...p.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
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
}`,..._.parameters?.docs?.source}}};k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
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
}`,...k.parameters?.docs?.source}}};const ae=["Default","AllPending","AllInProgress","CriticalFirst","EmptyQueue","PrototypeInteractive","BasicUsage"];export{m as AllInProgress,u as AllPending,k as BasicUsage,p as CriticalFirst,l as Default,g as EmptyQueue,_ as PrototypeInteractive,ae as __namedExportsOrder,ne as default};
