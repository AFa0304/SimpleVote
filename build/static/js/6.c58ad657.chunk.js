(this.webpackJsonpvote=this.webpackJsonpvote||[]).push([[6],{1264:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return S}));var a=n(103),o=(n(1257),n(1256)),i=n(154),c=n(155),l=n(157),r=n(156),s=n(1),m=n.n(s),d=n(104),u=n(695),p=n(106),f=n(158),v=n(1246),E=n(1254),b=n(707),h=n(708),N=n(1255);function g(){var e=Object(a.a)(['\n    width:90%;\n    margin:0 auto;\n    input[type="text"]{\n        border:none;\n        border-bottom:1.2px solid rgba(0, 0, 0, 0.75);\n        background-color:transparent;\n        padding:0.3rem;\n        &:focus{\n            outline:none;\n            border-bottom:1.8px solid rgba(0, 0, 0, 1);\n        }\n    }\n    .add-button{\n        font-size:14px;\n        padding:5px 15px;\n        margin-left:10px;\n    }\n    .clear-record-button .delete-button{\n        font-size: 20px;\n        font-weight: bold;\n        padding: 5px 25px;\n    }\n    .vote-content{\n        height:100%;\n        display:flex;\n        flex-flow:column;\n        justify-content:space-between;\n        .vote-options{\n            overflow-y:auto;\n            margin:16px 0;\n        }\n    }\n']);return g=function(){return e},e}var S=function(e){Object(l.a)(n,e);var t=Object(r.a)(n);function n(e){var a;return Object(i.a)(this,n),(a=t.call(this,e)).handleStarChange=function(e,t){var n=JSON.parse(JSON.stringify(a.state.options));n.find((function(t){return t.id===e})).starScore=t,a.setState({options:n})},a.submitScore=function(){var e=JSON.parse(JSON.stringify(a.state.options));a.optionsCollection.get().then((function(t){t.forEach((function(t){var n=t.data(),o=e.find((function(e){return e.id===t.id})),i=n.score?n.score:0;o&&(i+=o.starScore,a.optionsCollection.doc(t.id).set({score:i},{merge:!0}).then((function(){a.setState({showResult:!0})})))}))}))},a.clearScore=function(){a.optionsCollection.get().then((function(e){e.forEach((function(e){a.optionsCollection.doc(e.id).update({score:0}).then((function(){a.setState({tab:1})}))}))}))},a.createOption=function(e){e.preventDefault(),a.state.addOpitionName.length&&a.optionsCollection.add({optionName:a.state.addOpitionName,score:0}).then((function(){a.setState({addOpitionName:""})}))},a.removeOption=function(e){a.optionsCollection.get().then((function(t){t.forEach((function(t){t.id===e&&a.optionsCollection.doc(t.id).delete()}))}))},a.getChartDatas=function(){var e=[];return a.state.options.map((function(t){var n=t.optionDatas.optionName,a=t.optionDatas.score;e.push({type:n,score:a})})),console.log(e),{data:e,xField:"score",yField:"type",seriesField:"type",color:"#5B8FF9",legend:!1,label:{position:"middle"},meta:{type:{alias:"\u9078\u9805"},score:{alias:"\u5f97\u5206"}}}},a.topicID=e.match.params.topicID,a.topicDoc=Object(f.firestore)().collection("topic").doc(a.topicID),a.optionsCollection=a.topicDoc.collection("options"),a.state={topicTitle:"",options:[],starScore:5,showResult:!1,addOpitionName:"",tab:1},a}return Object(c.a)(n,[{key:"componentDidMount",value:function(){var e=this;this.topicDoc.get().then((function(t){e.setState({topicTitle:t.data().title})})),this.optionsCollection.orderBy("optionName").onSnapshot((function(t){var n=[];t.forEach((function(e){n.push({id:e.id,optionDatas:e.data(),starScore:5})})),e.setState({options:n})}))}},{key:"render",value:function(){var e=this,t=this.state,n=t.topicTitle,a=t.options,i=t.showResult,c=t.addOpitionName,l=t.tab;return console.log(),m.a.createElement(m.a.Fragment,null,m.a.createElement(u.Animated,{className:"vote-topbar d-flex justify-content-between align-items-center",animationIn:"bounceInDown"},m.a.createElement("div",{className:"back-arrow"},m.a.createElement(p.b,{to:"/"},m.a.createElement(v.a,{size:45})))),m.a.createElement(x,null,m.a.createElement(u.Animated,{animationIn:"fadeIn"},m.a.createElement("div",{className:"text-center mt-3"},m.a.createElement("h1",{className:"title"},n)),m.a.createElement("div",{className:"d-flex align-items-center"},m.a.createElement("div",{className:"content-tag pencil-line "+(1===l?"active":""),onClick:function(){return e.setState({tab:1})}},m.a.createElement("div",null,m.a.createElement(b.c,{size:25}))),m.a.createElement("div",{className:"content-tag pencil-line "+(2===l?"active":""),onClick:function(){return e.setState({tab:2})}},m.a.createElement("div",null,m.a.createElement(b.d,{size:25}))),m.a.createElement("div",{className:"content-tag clear-record "+(3===l?"active":""),onClick:function(){return e.setState({tab:3})}},m.a.createElement("div",null,m.a.createElement(b.b,{size:25})))),m.a.createElement("div",{className:"list-content "+(1===l?"no-scroll":"")},1===l&&m.a.createElement(u.Animated,{className:"h-100",animationIn:"fadeIn"},i?m.a.createElement("div",{className:"vote-content"},m.a.createElement("div",{className:"flex-grow-1 pt-3 pb-3"},m.a.createElement(N.a,this.getChartDatas())),m.a.createElement("div",{className:"d-flex justify-content-end mt-4"},m.a.createElement("button",{className:"back-button",onClick:function(){return e.setState({showResult:!1})}},m.a.createElement(b.a,{size:25})))):m.a.createElement("div",{className:"vote-content"},m.a.createElement(u.Animated,{className:"vote-options",animationIn:"fadeIn"},a.map((function(t){return m.a.createElement("div",{key:t.id},m.a.createElement("div",null,t.optionDatas.optionName),m.a.createElement("div",null,m.a.createElement(o.a,{allowHalf:!0,value:t.starScore,count:10,onChange:function(n){return e.handleStarChange(t.id,n)}})))}))),m.a.createElement("div",null,m.a.createElement("div",{className:"d-flex justify-content-center"},m.a.createElement("div",{className:"vote-button",onClick:this.submitScore},m.a.createElement(E.b,{size:20}))),m.a.createElement("div",{className:"d-flex justify-content-end mt-2 mb-2"},m.a.createElement("div",{className:"vote-button result-button",onClick:function(){return e.setState({showResult:!0})}},m.a.createElement(E.a,{size:20})))))),2===l&&m.a.createElement(u.Animated,{animationIn:"fadeIn"},m.a.createElement("div",{className:"d-flex justify-content-center align-items-center mt-4"},m.a.createElement("form",{onSubmit:this.createOption},m.a.createElement("input",{type:"text",value:c,placeholder:"\u8f38\u5165\u9078\u9805\u540d\u7a31",onChange:function(t){e.setState({addOpitionName:t.target.value})}}),m.a.createElement("input",{type:"submit",className:"add-button",value:"\u65b0\u589e",onClick:this.createOption}))),m.a.createElement("div",{className:"mt-3"},a.map((function(t){return m.a.createElement("div",{className:"mb-3",key:t.id},m.a.createElement("div",{className:"d-flex justify-content-between align-items-center"},m.a.createElement("div",null,t.optionDatas.optionName),m.a.createElement("div",null,m.a.createElement("button",{className:"delete-button",onClick:function(){return e.removeOption(t.id)}},m.a.createElement(h.a,{size:20})))))})))),3===l&&m.a.createElement(u.Animated,{className:"clear-record-button text-center",animationIn:"fadeIn"},m.a.createElement("div",{className:"mt-2"},m.a.createElement("h3",null,"\u771f\u3109\u8981\u6e05\u9664\u6295\u7968\u7d00\u9304\u3107")),m.a.createElement("div",{className:"mt-4 pt-4"},m.a.createElement("button",{className:"delete-button",onClick:this.clearScore},"\u6e05\u9664")))))))}}]),n}(s.Component),x=d.a.div(g())}}]);