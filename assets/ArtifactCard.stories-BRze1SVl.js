import{j as e}from"./jsx-runtime-u17CrQMm.js";import{r as d}from"./iframe-DLl0a6ph.js";import{b as i}from"./mockData-DOQp8R7v.js";import"./preload-helper-PPVm8Dsz.js";const B="_artifactCard_d3p82_3",W="_header_d3p82_16",L="_typeIcon_d3p82_24",V="_headerContent_d3p82_36",H="_title_d3p82_41",Q="_typeBadge_d3p82_49",$="_previewContainer_d3p82_62",U="_preview_d3p82_62",q="_previewFade_d3p82_77",z="_showMore_d3p82_87",J="_metadata_d3p82_116",X="_metadataTable_d3p82_121",Y="_exportActions_d3p82_156",G="_exportLabel_d3p82_164",K="_exportBtn_d3p82_170",Z="_provenance_d3p82_201",n={artifactCard:B,header:W,typeIcon:L,headerContent:V,title:H,typeBadge:Q,previewContainer:$,preview:U,previewFade:q,showMore:z,metadata:J,metadataTable:X,exportActions:Y,exportLabel:G,exportBtn:K,provenance:Z},E=()=>e.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("path",{d:"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"}),e.jsx("polyline",{points:"14 2 14 8 20 8"}),e.jsx("line",{x1:"16",y1:"13",x2:"8",y2:"13"}),e.jsx("line",{x1:"16",y1:"17",x2:"8",y2:"17"}),e.jsx("polyline",{points:"10 9 9 9 8 9"})]}),P=()=>e.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("polyline",{points:"16 18 22 12 16 6"}),e.jsx("polyline",{points:"8 6 2 12 8 18"})]}),ee=()=>e.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("line",{x1:"18",y1:"20",x2:"18",y2:"10"}),e.jsx("line",{x1:"12",y1:"20",x2:"12",y2:"4"}),e.jsx("line",{x1:"6",y1:"20",x2:"6",y2:"14"})]}),b={markdown:e.jsx(E,{}),json:e.jsx(P,{}),csv:e.jsx(ee,{}),code:e.jsx(P,{}),other:e.jsx(E,{})},I={markdown:"MD",json:"JSON",csv:"CSV",pr:"PR"};function R(t,r=12){return t.length<=r?t:`${t.slice(0,r)}...`}function m({artifact:t,exportFormats:r,onExport:c,showPreview:l=!0,maxPreviewHeight:s="12rem",isStreaming:T=!1,className:p}){const[o,D]=d.useState(!1),O=()=>D(a=>!a),M=t.metadata&&Object.keys(t.metadata).length>0,N=t.sourceStepId||t.toolCallIds&&t.toolCallIds.length>0;return e.jsxs("article",{className:`${n.artifactCard} ${p??""}`,"aria-label":`Artifact: ${t.title}`,"data-streaming":T||void 0,children:[e.jsxs("div",{className:n.header,children:[e.jsx("span",{className:n.typeIcon,"aria-hidden":"true",children:b[t.type]??b.other}),e.jsxs("div",{className:n.headerContent,children:[e.jsx("h3",{className:n.title,children:t.title}),e.jsx("span",{className:n.typeBadge,children:t.type})]})]}),l&&t.content&&e.jsxs("div",{className:n.previewContainer,children:[e.jsx("div",{className:n.preview,style:{maxHeight:o?"none":s,overflow:o?"visible":"hidden"},children:t.content}),!o&&e.jsx("div",{className:n.previewFade}),e.jsx("button",{className:n.showMore,onClick:O,"aria-expanded":o,type:"button",children:o?"Show less":"Show more"})]}),M&&e.jsx("div",{className:n.metadata,children:e.jsx("table",{className:n.metadataTable,children:e.jsx("tbody",{children:Object.entries(t.metadata).map(([a,F])=>e.jsxs("tr",{children:[e.jsx("td",{children:a}),e.jsx("td",{children:F})]},a))})})}),r&&r.length>0&&e.jsxs("div",{className:n.exportActions,children:[e.jsx("span",{className:n.exportLabel,children:"Export:"}),r.map(a=>e.jsx("button",{className:n.exportBtn,onClick:()=>c?.(a),"aria-label":`Export as ${I[a]}`,type:"button",children:I[a]},a))]}),N&&e.jsxs("div",{className:n.provenance,children:[t.sourceStepId&&e.jsxs("span",{title:t.sourceStepId,children:["Step: ",R(t.sourceStepId)]}),t.toolCallIds&&t.toolCallIds.length>0&&e.jsxs("span",{children:["Tools:"," ",t.toolCallIds.map((a,F)=>e.jsxs("span",{title:a,children:[R(a),F<t.toolCallIds.length-1?", ":""]},a))]})]})]})}m.__docgenInfo={description:"",methods:[],displayName:"ArtifactCard",props:{artifact:{required:!0,tsType:{name:"Artifact"},description:"The artifact to display"},exportFormats:{required:!1,tsType:{name:"Array",elements:[{name:"union",raw:"'markdown' | 'json' | 'csv' | 'pr'",elements:[{name:"literal",value:"'markdown'"},{name:"literal",value:"'json'"},{name:"literal",value:"'csv'"},{name:"literal",value:"'pr'"}]}],raw:"ExportFormat[]"},description:"Available export formats"},onExport:{required:!1,tsType:{name:"signature",type:"function",raw:"(format: ExportFormat) => void",signature:{arguments:[{type:{name:"union",raw:"'markdown' | 'json' | 'csv' | 'pr'",elements:[{name:"literal",value:"'markdown'"},{name:"literal",value:"'json'"},{name:"literal",value:"'csv'"},{name:"literal",value:"'pr'"}]},name:"format"}],return:{name:"void"}}},description:"Called when an export button is clicked"},showPreview:{required:!1,tsType:{name:"boolean"},description:"Whether to show a content preview",defaultValue:{value:"true",computed:!1}},maxPreviewHeight:{required:!1,tsType:{name:"string"},description:"Maximum preview height before truncation",defaultValue:{value:"'12rem'",computed:!1}},isStreaming:{required:!1,tsType:{name:"boolean"},description:'When true, indicates that artifact content is still arriving from a\nstreaming backend. Exposes `data-streaming="true"` on the root element\nas a CSS hook — the consumer decides how to style the streaming state.',defaultValue:{value:"false",computed:!1}},className:{required:!1,tsType:{name:"string"},description:"Additional CSS class"}}};const se={title:"AX Components/ArtifactCard",component:m,tags:["autodocs"],argTypes:{showPreview:{control:"boolean"},maxPreviewHeight:{control:"text"},isStreaming:{control:"boolean"}}},u=["markdown","json","csv","pr"],x={args:{artifact:i({type:"markdown"}),exportFormats:u,showPreview:!0}},h={args:{artifact:i({type:"markdown",title:"Q4 Analysis Report"}),exportFormats:u,showPreview:!0,maxPreviewHeight:"10rem",onExport:t=>alert(`Exporting as ${t}`)}},y={name:"State: Streaming (content still arriving)",args:{artifact:{id:"art-stream",title:"Customer Churn Analysis",type:"markdown",content:`# Customer Churn Analysis

Analysing Q4 cohort data...`,timestamp:new Date().toISOString()},isStreaming:!0,showPreview:!0}},f={name:"Type: Markdown",args:{artifact:i({type:"markdown"}),exportFormats:["markdown","pr"],showPreview:!0}},g={name:"Type: JSON",args:{artifact:i({type:"json"}),exportFormats:["json"],showPreview:!0}},w={name:"Type: CSV",args:{artifact:i({type:"csv"}),exportFormats:["csv"],showPreview:!0}},v={name:"Type: Code",args:{artifact:i({type:"code"}),exportFormats:["markdown","json"],showPreview:!0}},S={name:"Quick Start: Prototype Artifact Display",render:()=>{const t=i({type:"markdown",title:"Analysis Report"}),[r,c]=d.useState(null);return e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"1rem",maxWidth:"480px"},children:[e.jsx(m,{artifact:t,exportFormats:u,showPreview:!0,onExport:l=>c(l)}),r&&e.jsxs("span",{style:{color:"#059669",fontSize:"0.875rem"},children:["Exported as ",r]})]})}},j={name:"Test Different Artifact Types",render:()=>{const t=["markdown","json","csv","code"],[r,c]=d.useState("markdown"),l=i({type:r});return e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"1rem",maxWidth:"480px"},children:[e.jsx("div",{style:{display:"flex",gap:"0.5rem",fontFamily:"sans-serif",fontSize:"0.75rem"},children:t.map(s=>e.jsx("button",{onClick:()=>c(s),style:{padding:"0.25rem 0.625rem",border:"1px solid #ccc",borderRadius:"4px",background:r===s?"#1d4ed8":"#fff",color:r===s?"#fff":"#333",cursor:"pointer"},children:s},s))}),e.jsx(m,{artifact:l,exportFormats:u,showPreview:!0})]})}},k={name:"Simulate Real-Time Updates — Export States",render:()=>{const t=i({type:"markdown",title:"Run Summary"}),[r,c]=d.useState(null),[l,s]=d.useState([]),T=p=>{c(p),setTimeout(()=>{c(null),s(o=>[...o,p])},1500)};return e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"1rem",maxWidth:"480px"},children:[e.jsx(m,{artifact:t,exportFormats:u,showPreview:!0,onExport:T}),e.jsxs("div",{style:{fontFamily:"sans-serif",fontSize:"0.75rem",color:"#6b7280",display:"flex",flexDirection:"column",gap:"0.25rem"},children:[r&&e.jsxs("span",{children:["Exporting as ",r,"..."]}),l.map((p,o)=>e.jsxs("span",{children:["Exported as ",p]},o))]})]})}},C={name:"Basic Usage",args:{artifact:{id:"art-001",title:"Customer Churn Analysis",type:"markdown",content:`# Customer Churn Analysis

The model identified 3 primary churn indicators across Q4 data.`,timestamp:new Date().toISOString()},showPreview:!0,exportFormats:["markdown","json"]}},_={name:"With Real API Data — Full Provenance",args:{artifact:{id:"art-002",title:"Refund Processing Summary",type:"json",content:JSON.stringify({processed:142,successful:139,failed:3,total_amount:"$12,847.50"},null,2),timestamp:new Date().toISOString(),metadata:{"Run ID":"run-88a1b",Duration:"4.2s",Model:"gemini-2.0-flash"},sourceStepId:"step-4",toolCallIds:["call-api-001","call-api-002"]},exportFormats:["json","csv"],showPreview:!0}},A={name:"Error Handling — No Content / No Exports",args:{artifact:{id:"art-err",title:"Failed Report",type:"other",content:"",timestamp:new Date().toISOString()},showPreview:!0,exportFormats:[]}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    artifact: generateMockArtifact({
      type: 'markdown'
    }),
    exportFormats: EXPORT_FORMATS,
    showPreview: true
  }
}`,...x.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    artifact: generateMockArtifact({
      type: 'markdown',
      title: 'Q4 Analysis Report'
    }),
    exportFormats: EXPORT_FORMATS,
    showPreview: true,
    maxPreviewHeight: '10rem',
    onExport: fmt => alert(\`Exporting as \${fmt}\`)
  }
}`,...h.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  name: 'State: Streaming (content still arriving)',
  args: {
    artifact: {
      id: 'art-stream',
      title: 'Customer Churn Analysis',
      type: 'markdown',
      content: '# Customer Churn Analysis\\n\\nAnalysing Q4 cohort data...',
      timestamp: new Date().toISOString()
    },
    isStreaming: true,
    showPreview: true
  }
}`,...y.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  name: 'Type: Markdown',
  args: {
    artifact: generateMockArtifact({
      type: 'markdown'
    }),
    exportFormats: ['markdown', 'pr'],
    showPreview: true
  }
}`,...f.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  name: 'Type: JSON',
  args: {
    artifact: generateMockArtifact({
      type: 'json'
    }),
    exportFormats: ['json'],
    showPreview: true
  }
}`,...g.parameters?.docs?.source}}};w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  name: 'Type: CSV',
  args: {
    artifact: generateMockArtifact({
      type: 'csv'
    }),
    exportFormats: ['csv'],
    showPreview: true
  }
}`,...w.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  name: 'Type: Code',
  args: {
    artifact: generateMockArtifact({
      type: 'code'
    }),
    exportFormats: ['markdown', 'json'],
    showPreview: true
  }
}`,...v.parameters?.docs?.source}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  name: 'Quick Start: Prototype Artifact Display',
  render: () => {
    const artifact = generateMockArtifact({
      type: 'markdown',
      title: 'Analysis Report'
    });
    const [exported, setExported] = useState<string | null>(null);
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      maxWidth: '480px'
    }}>
        <ArtifactCard artifact={artifact} exportFormats={EXPORT_FORMATS} showPreview onExport={fmt => setExported(fmt)} />
        {exported && <span style={{
        color: '#059669',
        fontSize: '0.875rem'
      }}>Exported as {exported}</span>}
      </div>;
  }
}`,...S.parameters?.docs?.source}}};j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  name: 'Test Different Artifact Types',
  render: () => {
    const types = ['markdown', 'json', 'csv', 'code'] as const;
    const [current, setCurrent] = useState<typeof types[number]>('markdown');
    const artifact = generateMockArtifact({
      type: current
    });
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      maxWidth: '480px'
    }}>
        <div style={{
        display: 'flex',
        gap: '0.5rem',
        fontFamily: 'sans-serif',
        fontSize: '0.75rem'
      }}>
          {types.map(t => <button key={t} onClick={() => setCurrent(t)} style={{
          padding: '0.25rem 0.625rem',
          border: '1px solid #ccc',
          borderRadius: '4px',
          background: current === t ? '#1d4ed8' : '#fff',
          color: current === t ? '#fff' : '#333',
          cursor: 'pointer'
        }}>
              {t}
            </button>)}
        </div>
        <ArtifactCard artifact={artifact} exportFormats={EXPORT_FORMATS} showPreview />
      </div>;
  }
}`,...j.parameters?.docs?.source}}};k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  name: 'Simulate Real-Time Updates — Export States',
  render: () => {
    const artifact = generateMockArtifact({
      type: 'markdown',
      title: 'Run Summary'
    });
    const [exportingFmt, setExportingFmt] = useState<ExportFormat | null>(null);
    const [done, setDone] = useState<ExportFormat[]>([]);
    const handleExport = (fmt: ExportFormat) => {
      setExportingFmt(fmt);
      setTimeout(() => {
        setExportingFmt(null);
        setDone(prev => [...prev, fmt]);
      }, 1500);
    };
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      maxWidth: '480px'
    }}>
        <ArtifactCard artifact={artifact} exportFormats={EXPORT_FORMATS} showPreview onExport={handleExport} />
        <div style={{
        fontFamily: 'sans-serif',
        fontSize: '0.75rem',
        color: '#6b7280',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.25rem'
      }}>
          {exportingFmt && <span>Exporting as {exportingFmt}...</span>}
          {done.map((f, i) => <span key={i}>Exported as {f}</span>)}
        </div>
      </div>;
  }
}`,...k.parameters?.docs?.source}}};C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  name: 'Basic Usage',
  args: {
    artifact: {
      id: 'art-001',
      title: 'Customer Churn Analysis',
      type: 'markdown',
      content: '# Customer Churn Analysis\\n\\nThe model identified 3 primary churn indicators across Q4 data.',
      timestamp: new Date().toISOString()
    },
    showPreview: true,
    exportFormats: ['markdown', 'json']
  }
}`,...C.parameters?.docs?.source}}};_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  name: 'With Real API Data — Full Provenance',
  args: {
    artifact: {
      id: 'art-002',
      title: 'Refund Processing Summary',
      type: 'json',
      content: JSON.stringify({
        processed: 142,
        successful: 139,
        failed: 3,
        total_amount: '$12,847.50'
      }, null, 2),
      timestamp: new Date().toISOString(),
      metadata: {
        'Run ID': 'run-88a1b',
        'Duration': '4.2s',
        'Model': 'gemini-2.0-flash'
      },
      sourceStepId: 'step-4',
      toolCallIds: ['call-api-001', 'call-api-002']
    },
    exportFormats: ['json', 'csv'],
    showPreview: true
  }
}`,..._.parameters?.docs?.source}}};A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  name: 'Error Handling — No Content / No Exports',
  args: {
    artifact: {
      id: 'art-err',
      title: 'Failed Report',
      type: 'other',
      content: '',
      timestamp: new Date().toISOString()
    },
    showPreview: true,
    exportFormats: []
  }
}`,...A.parameters?.docs?.source}}};const oe=["Default","AllFeatures","StateStreaming","TypeMarkdown","TypeJSON","TypeCSV","TypeCode","PrototypeQuickStart","TestVariations","SimulateRealTimeUpdates","BasicUsage","WithRealAPIData","ErrorHandling"];export{h as AllFeatures,C as BasicUsage,x as Default,A as ErrorHandling,S as PrototypeQuickStart,k as SimulateRealTimeUpdates,y as StateStreaming,j as TestVariations,w as TypeCSV,v as TypeCode,g as TypeJSON,f as TypeMarkdown,_ as WithRealAPIData,oe as __namedExportsOrder,se as default};
