import{j as e}from"./jsx-runtime-u17CrQMm.js";import{r as s}from"./iframe-B_jp5fYY.js";import{a as A,V as $}from"./a11y-C_IPrr1r.js";import{o as O,p as E}from"./mockData-DOQp8R7v.js";import"./preload-helper-PPVm8Dsz.js";const B="_toolTrace_1qw16_3",P="_scrollContainer_1qw16_11",M="_timeline_1qw16_19",L="_entry_1qw16_41",W="_entryClickable_1qw16_54",U="_dot_1qw16_68",V="_dotPending_1qw16_82",z="_dotRunning_1qw16_86",Q="_dotCompleted_1qw16_91",J="_dotFailed_1qw16_97",X="_entryContent_1qw16_107",K="_entryHeader_1qw16_112",G="_toolName_1qw16_118",Y="_duration_1qw16_125",Z="_errorMessage_1qw16_131",ee="_expandToggle_1qw16_141",te="_chevron_1qw16_165",ne="_chevronOpen_1qw16_170",ae="_expandedContent_1qw16_174",re="_jsonBlock_1qw16_178",se="_jsonLabel_1qw16_192",oe="_policyFlags_1qw16_205",le="_policyBadge_1qw16_211",ie="_emptyState_1qw16_227",n={toolTrace:B,scrollContainer:P,timeline:M,entry:L,entryClickable:W,dot:U,dotPending:V,dotRunning:z,dotCompleted:Q,dotFailed:J,entryContent:X,entryHeader:K,toolName:G,duration:Y,errorMessage:Z,expandToggle:ee,chevron:te,chevronOpen:ne,expandedContent:ae,jsonBlock:re,jsonLabel:se,policyFlags:oe,policyBadge:le,emptyState:ie},ce=()=>e.jsx("svg",{width:"10",height:"10",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"3",strokeLinecap:"round",strokeLinejoin:"round",children:e.jsx("polyline",{points:"20 6 9 17 4 12"})}),de=()=>e.jsxs("svg",{width:"10",height:"10",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"3",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),e.jsx("line",{x1:"6",y1:"6",x2:"18",y2:"18"})]}),ue={pending:null,running:null,completed:e.jsx(ce,{}),failed:e.jsx(de,{})},me={pending:n.dotPending,running:n.dotRunning,completed:n.dotCompleted,failed:n.dotFailed};function R(a){return a<1e3?`${a}ms`:`${(a/1e3).toFixed(1)}s`}function _({calls:a,autoScroll:l=!0,maxHeight:u="24rem",onEntryClick:r,expandable:c=!0,className:m}){const[p,S]=s.useState(()=>new Set),o=s.useRef(null),[d,x]=A(),g=s.useRef(a.length);s.useEffect(()=>{!l||!o.current||(a.length>g.current&&(o.current.scrollTop=o.current.scrollHeight),g.current=a.length)},[a.length,l]),s.useEffect(()=>{if(a.length>0){const t=a[a.length-1];t.status==="completed"?d(`${t.name} completed${t.duration?` in ${R(t.duration)}`:""}`):t.status==="failed"?d(`${t.name} failed: ${t.error??"unknown error"}`):t.status==="running"&&d(`${t.name} started`)}},[a,d]);const N=s.useCallback(t=>{S(f=>{const i=new Set(f);return i.has(t)?i.delete(t):i.add(t),i})},[]);return a.length===0?e.jsxs("div",{className:`${n.toolTrace} ${m??""}`,role:"log","aria-label":"Tool trace",children:[e.jsx("div",{className:n.emptyState,children:"No tool calls yet"}),e.jsx(x,{})]}):e.jsxs("div",{className:`${n.toolTrace} ${m??""}`,role:"log","aria-label":"Tool trace",children:[e.jsx("div",{ref:o,className:n.scrollContainer,style:{maxHeight:u},children:e.jsx("ol",{className:n.timeline,"aria-label":"Tool call timeline",children:a.map(t=>{const f=p.has(t.id),i=!!r,H=c&&(t.input||t.output);return e.jsxs("li",{className:`${n.entry} ${i?n.entryClickable:""}`,onClick:i?()=>r(t):void 0,tabIndex:i?0:void 0,onKeyDown:i?y=>{(y.key==="Enter"||y.key===" ")&&(y.preventDefault(),r(t))}:void 0,children:[e.jsx("span",{className:`${n.dot} ${me[t.status]}`,"aria-hidden":"true",children:ue[t.status]}),e.jsxs("div",{className:n.entryContent,children:[e.jsxs("div",{className:n.entryHeader,children:[e.jsx("span",{className:n.toolName,children:t.name}),t.duration!=null&&e.jsx("span",{className:n.duration,children:R(t.duration)})]}),t.error&&e.jsx("div",{className:n.errorMessage,children:t.error}),t.policyFlags&&e.jsxs("div",{className:n.policyFlags,children:[t.policyFlags.requiresApproval&&e.jsx("span",{className:n.policyBadge,children:"approval"}),t.policyFlags.writesState&&e.jsx("span",{className:n.policyBadge,children:"writes"}),t.policyFlags.externalAction&&e.jsx("span",{className:n.policyBadge,children:"external"})]}),H&&e.jsxs(e.Fragment,{children:[e.jsxs("button",{className:n.expandToggle,onClick:y=>{y.stopPropagation(),N(t.id)},"aria-expanded":f,type:"button",children:[e.jsx("span",{className:`${n.chevron} ${f?n.chevronOpen:""}`,"aria-hidden":"true",children:"▶"}),"Details"]}),f&&e.jsxs("div",{className:n.expandedContent,children:[t.input&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:n.jsonLabel,children:"Input"}),e.jsx("pre",{className:n.jsonBlock,children:JSON.stringify(t.input,null,2)})]}),t.output&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:n.jsonLabel,children:"Output"}),e.jsx("pre",{className:n.jsonBlock,children:JSON.stringify(t.output,null,2)})]})]})]})]})]},t.id)})})}),e.jsx($,{children:e.jsx(x,{})})]})}_.__docgenInfo={description:"",methods:[],displayName:"ToolTrace",props:{calls:{required:!0,tsType:{name:"Array",elements:[{name:"ToolCall"}],raw:"ToolCall[]"},description:"Array of tool calls to display"},autoScroll:{required:!1,tsType:{name:"boolean"},description:"Whether to auto-scroll to latest entry",defaultValue:{value:"true",computed:!1}},maxHeight:{required:!1,tsType:{name:"string"},description:"Maximum height before scrolling",defaultValue:{value:"'24rem'",computed:!1}},onEntryClick:{required:!1,tsType:{name:"signature",type:"function",raw:"(call: ToolCall) => void",signature:{arguments:[{type:{name:"ToolCall"},name:"call"}],return:{name:"void"}}},description:"Called when a tool call entry is clicked"},expandable:{required:!1,tsType:{name:"boolean"},description:"Whether entries are expandable to show input/output",defaultValue:{value:"true",computed:!1}},className:{required:!1,tsType:{name:"string"},description:"Additional CSS class"}}};const ye={title:"AX Components/ToolTrace",component:_,tags:["autodocs"],argTypes:{autoScroll:{control:"boolean"},expandable:{control:"boolean"},maxHeight:{control:"text"}}},h={args:{calls:O(4),expandable:!0}},C={args:{calls:O(5),expandable:!0,autoScroll:!0,maxHeight:"20rem",onEntryClick:a=>console.log("Entry clicked:",a)}},b={name:"State: Empty",args:{calls:[]}},w={name:"State: Streaming (running entry)",args:{calls:[...O(3),{id:"running-1",name:"execute_code",status:"running",timestamp:new Date().toISOString()}],expandable:!0}},T={name:"State: With Failures",args:{calls:[{id:"1",name:"search_knowledge_base",status:"completed",duration:320,timestamp:new Date().toISOString(),input:{query:"agent trust patterns"},output:{results:[{id:"doc-1",score:.91}]}},{id:"2",name:"call_api",status:"failed",duration:5001,timestamp:new Date().toISOString(),error:"Connection timeout after 5000ms"},{id:"3",name:"generate_report",status:"completed",duration:820,timestamp:new Date().toISOString()}],expandable:!0}},v={name:"State: With Policy Flags",args:{calls:[{id:"1",name:"read_file",status:"completed",duration:45,timestamp:new Date().toISOString()},{id:"2",name:"send_email",status:"completed",duration:280,timestamp:new Date().toISOString(),policyFlags:{requiresApproval:!0,externalAction:!0}},{id:"3",name:"update_record",status:"completed",duration:190,timestamp:new Date().toISOString(),policyFlags:{writesState:!0}}],expandable:!0}},j={name:"Quick Start: Prototype Live Tool Stream",render:()=>{const[a,l]=s.useState([]),u=s.useCallback(o=>{l(d=>{const x=d.findIndex(g=>g.id===o.id);return x>=0?d.map((g,N)=>N===x?o:g):[...d,o]})},[]),[r,c]=s.useState(!1),[m,p]=s.useState(null),S=()=>{l([]),c(!0);const{cancel:o}=E({onCall:u,count:6,intervalMs:1e3});p(()=>o)};return e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"1rem"},children:[e.jsxs("div",{style:{display:"flex",gap:"0.5rem"},children:[e.jsx("button",{onClick:S,style:{padding:"0.375rem 0.875rem",border:"1px solid #d1d5db",borderRadius:"4px",cursor:"pointer",fontFamily:"sans-serif",fontSize:"0.875rem"},children:"▶ Start stream"}),r&&e.jsx("button",{onClick:()=>{m?.(),c(!1)},style:{padding:"0.375rem 0.875rem",border:"1px solid #fca5a5",borderRadius:"4px",cursor:"pointer",fontFamily:"sans-serif",fontSize:"0.875rem",background:"#fef2f2"},children:"⏹ Stop"})]}),e.jsx(_,{calls:a,expandable:!0,autoScroll:!0,maxHeight:"24rem"})]})}},k={name:"Test Different Call Counts",render:()=>{const[a,l]=s.useState(4),u=O(a);return e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"1rem"},children:[e.jsx("div",{style:{display:"flex",gap:"0.5rem",fontFamily:"sans-serif",fontSize:"0.75rem"},children:[2,4,6,10].map(r=>e.jsxs("button",{onClick:()=>l(r),style:{padding:"0.25rem 0.625rem",border:"1px solid #ccc",borderRadius:"4px",background:a===r?"#1d4ed8":"#fff",color:a===r?"#fff":"#333",cursor:"pointer"},children:[r," calls"]},r))}),e.jsx(_,{calls:u,expandable:!0,maxHeight:"20rem"})]})}},D={name:"Simulate Real-Time Updates — Steady Stream",render:()=>{const[a,l]=s.useState([]),u=s.useCallback(r=>{l(c=>{const m=c.findIndex(p=>p.id===r.id);return m>=0?c.map((p,S)=>S===m?r:p):[...c,r]})},[]);return s.useState(()=>{E({onCall:u,count:8,intervalMs:1500})}),e.jsx(_,{calls:a,expandable:!0,autoScroll:!0,maxHeight:"22rem"})}},F={name:"Basic Usage",args:{calls:[{id:"1",name:"search_knowledge_base",status:"completed",duration:320,timestamp:new Date().toISOString()},{id:"2",name:"generate_report",status:"completed",duration:1240,timestamp:new Date().toISOString()}]}},I={name:"With Real API Data",args:{calls:[{id:"1",name:"fetch_document",status:"completed",duration:180,timestamp:new Date().toISOString(),input:{url:"https://api.example.com/docs/q4-report"},output:{pages:12,wordCount:4821}},{id:"2",name:"run_query",status:"completed",duration:420,timestamp:new Date().toISOString(),input:{query:"SELECT revenue, quarter FROM reports WHERE year = 2025"},output:{rows:4}},{id:"3",name:"generate_report",status:"running",timestamp:new Date().toISOString()}],expandable:!0,autoScroll:!0}},q={name:"Error Handling — Tool Failure",args:{calls:[{id:"1",name:"validate_schema",status:"completed",duration:55,timestamp:new Date().toISOString()},{id:"2",name:"call_api",status:"failed",duration:5e3,timestamp:new Date().toISOString(),error:"Rate limit exceeded. Retry after 60s.",input:{endpoint:"/v1/customers"}}],expandable:!0}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    calls: generateMockToolCalls(4),
    expandable: true
  }
}`,...h.parameters?.docs?.source}}};C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  args: {
    calls: generateMockToolCalls(5),
    expandable: true,
    autoScroll: true,
    maxHeight: '20rem',
    onEntryClick: call => console.log('Entry clicked:', call)
  }
}`,...C.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  name: 'State: Empty',
  args: {
    calls: []
  }
}`,...b.parameters?.docs?.source}}};w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  name: 'State: Streaming (running entry)',
  args: {
    calls: [...generateMockToolCalls(3), {
      id: 'running-1',
      name: 'execute_code',
      status: 'running',
      timestamp: new Date().toISOString()
    }],
    expandable: true
  }
}`,...w.parameters?.docs?.source}}};T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  name: 'State: With Failures',
  args: {
    calls: [{
      id: '1',
      name: 'search_knowledge_base',
      status: 'completed',
      duration: 320,
      timestamp: new Date().toISOString(),
      input: {
        query: 'agent trust patterns'
      },
      output: {
        results: [{
          id: 'doc-1',
          score: 0.91
        }]
      }
    }, {
      id: '2',
      name: 'call_api',
      status: 'failed',
      duration: 5001,
      timestamp: new Date().toISOString(),
      error: 'Connection timeout after 5000ms'
    }, {
      id: '3',
      name: 'generate_report',
      status: 'completed',
      duration: 820,
      timestamp: new Date().toISOString()
    }],
    expandable: true
  }
}`,...T.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  name: 'State: With Policy Flags',
  args: {
    calls: [{
      id: '1',
      name: 'read_file',
      status: 'completed',
      duration: 45,
      timestamp: new Date().toISOString()
    }, {
      id: '2',
      name: 'send_email',
      status: 'completed',
      duration: 280,
      timestamp: new Date().toISOString(),
      policyFlags: {
        requiresApproval: true,
        externalAction: true
      }
    }, {
      id: '3',
      name: 'update_record',
      status: 'completed',
      duration: 190,
      timestamp: new Date().toISOString(),
      policyFlags: {
        writesState: true
      }
    }],
    expandable: true
  }
}`,...v.parameters?.docs?.source}}};j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  name: 'Quick Start: Prototype Live Tool Stream',
  render: () => {
    const [calls, setCalls] = useState<ToolCall[]>([]);
    const mergeCalls = useCallback((incoming: ToolCall) => {
      setCalls(prev => {
        const idx = prev.findIndex(c => c.id === incoming.id);
        return idx >= 0 ? prev.map((c, i) => i === idx ? incoming : c) : [...prev, incoming];
      });
    }, []);
    const [started, setStarted] = useState(false);
    const [cancelFn, setCancelFn] = useState<(() => void) | null>(null);
    const start = () => {
      setCalls([]);
      setStarted(true);
      const {
        cancel
      } = simulateToolStream({
        onCall: mergeCalls,
        count: 6,
        intervalMs: 1000
      });
      setCancelFn(() => cancel);
    };
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem'
    }}>
        <div style={{
        display: 'flex',
        gap: '0.5rem'
      }}>
          <button onClick={start} style={{
          padding: '0.375rem 0.875rem',
          border: '1px solid #d1d5db',
          borderRadius: '4px',
          cursor: 'pointer',
          fontFamily: 'sans-serif',
          fontSize: '0.875rem'
        }}>
            ▶ Start stream
          </button>
          {started && <button onClick={() => {
          cancelFn?.();
          setStarted(false);
        }} style={{
          padding: '0.375rem 0.875rem',
          border: '1px solid #fca5a5',
          borderRadius: '4px',
          cursor: 'pointer',
          fontFamily: 'sans-serif',
          fontSize: '0.875rem',
          background: '#fef2f2'
        }}>
              ⏹ Stop
            </button>}
        </div>
        <ToolTrace calls={calls} expandable autoScroll maxHeight="24rem" />
      </div>;
  }
}`,...j.parameters?.docs?.source}}};k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  name: 'Test Different Call Counts',
  render: () => {
    const [count, setCount] = useState(4);
    const calls = generateMockToolCalls(count);
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem'
    }}>
        <div style={{
        display: 'flex',
        gap: '0.5rem',
        fontFamily: 'sans-serif',
        fontSize: '0.75rem'
      }}>
          {[2, 4, 6, 10].map(n => <button key={n} onClick={() => setCount(n)} style={{
          padding: '0.25rem 0.625rem',
          border: '1px solid #ccc',
          borderRadius: '4px',
          background: count === n ? '#1d4ed8' : '#fff',
          color: count === n ? '#fff' : '#333',
          cursor: 'pointer'
        }}>
              {n} calls
            </button>)}
        </div>
        <ToolTrace calls={calls} expandable maxHeight="20rem" />
      </div>;
  }
}`,...k.parameters?.docs?.source}}};D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  name: 'Simulate Real-Time Updates — Steady Stream',
  render: () => {
    const [calls, setCalls] = useState<ToolCall[]>([]);
    const mergeCalls = useCallback((incoming: ToolCall) => {
      setCalls(prev => {
        const idx = prev.findIndex(c => c.id === incoming.id);
        return idx >= 0 ? prev.map((c, i) => i === idx ? incoming : c) : [...prev, incoming];
      });
    }, []);
    useState(() => {
      simulateToolStream({
        onCall: mergeCalls,
        count: 8,
        intervalMs: 1500
      });
    });
    return <ToolTrace calls={calls} expandable autoScroll maxHeight="22rem" />;
  }
}`,...D.parameters?.docs?.source}}};F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  name: 'Basic Usage',
  args: {
    calls: [{
      id: '1',
      name: 'search_knowledge_base',
      status: 'completed',
      duration: 320,
      timestamp: new Date().toISOString()
    }, {
      id: '2',
      name: 'generate_report',
      status: 'completed',
      duration: 1240,
      timestamp: new Date().toISOString()
    }]
  }
}`,...F.parameters?.docs?.source}}};I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  name: 'With Real API Data',
  args: {
    calls: [{
      id: '1',
      name: 'fetch_document',
      status: 'completed',
      duration: 180,
      timestamp: new Date().toISOString(),
      input: {
        url: 'https://api.example.com/docs/q4-report'
      },
      output: {
        pages: 12,
        wordCount: 4821
      }
    }, {
      id: '2',
      name: 'run_query',
      status: 'completed',
      duration: 420,
      timestamp: new Date().toISOString(),
      input: {
        query: 'SELECT revenue, quarter FROM reports WHERE year = 2025'
      },
      output: {
        rows: 4
      }
    }, {
      id: '3',
      name: 'generate_report',
      status: 'running',
      timestamp: new Date().toISOString()
    }],
    expandable: true,
    autoScroll: true
  }
}`,...I.parameters?.docs?.source}}};q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`{
  name: 'Error Handling — Tool Failure',
  args: {
    calls: [{
      id: '1',
      name: 'validate_schema',
      status: 'completed',
      duration: 55,
      timestamp: new Date().toISOString()
    }, {
      id: '2',
      name: 'call_api',
      status: 'failed',
      duration: 5000,
      timestamp: new Date().toISOString(),
      error: 'Rate limit exceeded. Retry after 60s.',
      input: {
        endpoint: '/v1/customers'
      }
    }],
    expandable: true
  }
}`,...q.parameters?.docs?.source}}};const _e=["Default","AllFeatures","EmptyState","StreamingState","FailedEntries","PolicyFlags","PrototypeQuickStart","TestVariations","SimulateRealTimeUpdates","BasicUsage","WithRealAPIData","ErrorHandling"];export{C as AllFeatures,F as BasicUsage,h as Default,b as EmptyState,q as ErrorHandling,T as FailedEntries,v as PolicyFlags,j as PrototypeQuickStart,D as SimulateRealTimeUpdates,w as StreamingState,k as TestVariations,I as WithRealAPIData,_e as __namedExportsOrder,ye as default};
