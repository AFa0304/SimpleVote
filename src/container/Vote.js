import React, { Component } from 'react'
import styled from 'styled-components'
import { Animated } from 'react-animated-css'
import { Link } from 'react-router-dom'
import { firestore } from 'firebase'
import { Rate } from 'antd'
import { FcLeft } from 'react-icons/fc'
import { FaVoteYea, FaChartBar } from 'react-icons/fa'
import { RiEraserLine, RiPencilLine, RiFileList3Line, RiArrowGoBackFill } from 'react-icons/ri'
import { AiTwotoneDelete } from 'react-icons/ai'
import { Bar } from '@ant-design/charts'

export default class Vote extends Component {
    constructor(props) {
        super(props)
        this.topicID = props.match.params.topicID
        this.topicDoc = firestore().collection("topic").doc(this.topicID)
        this.optionsCollection = this.topicDoc.collection("options")
        this.state = {
            topicTitle: "",
            options: [],
            starScore: 5,
            showResult: false,
            addOpitionName: "",
            tab: 1
        }
    }

    componentDidMount() {
        this.topicDoc.get().then(response => {
            this.setState({
                topicTitle: response.data().title
            })
        })
        this.optionsCollection.orderBy("optionName").onSnapshot(options => {
            let _options = []
            options.forEach(option => {
                _options.push({
                    id: option.id,
                    optionDatas: option.data(),
                    starScore: 5
                })
            })
            this.setState({
                options: _options
            })
        })
    }

    handleStarChange = (optionID, value) => {
        let _options = JSON.parse(JSON.stringify(this.state.options))
        _options.find(x => x.id === optionID)["starScore"] = value
        this.setState({
            options: _options
        })
    }

    submitScore = () => {
        const _options = JSON.parse(JSON.stringify(this.state.options))
        this.optionsCollection.get().then(options => {
            options.forEach(option => {
                const optionDatas = option.data()
                const matchOption = _options.find(x => x.id === option.id)
                let _score = optionDatas.score ? optionDatas.score : 0
                if (matchOption) {
                    _score += matchOption.starScore
                    this.optionsCollection.doc(option.id).set({
                        score: _score
                    }, { merge: true }).then(() => {
                        this.setState({
                            showResult: true
                        })
                    })
                }
            })
        })
    }

    clearScore = () => {
        this.optionsCollection.get().then(options => {
            options.forEach(option => {
                this.optionsCollection.doc(option.id).update({
                    score: 0
                }).then(() => {
                    this.setState({
                        tab: 1
                    })
                })
            })
        })
    }
    createOption = (e) => {
        e.preventDefault()
        if (this.state.addOpitionName.length) {
            this.optionsCollection.add({
                optionName: this.state.addOpitionName,
                score: 0
            }).then(() => {
                this.setState({
                    addOpitionName: ""
                })
            })
        }
    }
    removeOption = (optionID) => {
        this.optionsCollection.get().then(options => {
            options.forEach(option => {
                if (option.id === optionID) {
                    this.optionsCollection.doc(option.id).delete()
                }
            })
        })
    }
    getChartDatas = () => {
        let data = []
        this.state.options.map(option => {
            const name = option.optionDatas.optionName
            const score = option.optionDatas.score
            return data.push({
                type: name,
                score: score
            })
        })
        console.log(data)
        return {
            data: data,
            xField: 'score',
            yField: 'type',
            seriesField: 'type',
            color: "#5B8FF9",
            legend: false,
            label: {
                position: 'middle',
            },
            meta: {
                type: { alias: '選項' },
                score: { alias: '得分' },
            },
            // color: function color(_ref) {
            //     var type = _ref.type;
            //     return type === '吃吃' ? '#FAAD14' : '#5B8FF9';
            // },
        }
    }

    render() {
        const { topicTitle, options, showResult, addOpitionName, tab } = this.state
        console.log()
        return (
            <React.Fragment>
                <Animated className="vote-topbar d-flex justify-content-between align-items-center" animationIn="bounceInDown">
                    <div className="back-arrow">
                        <Link to="/">
                            <FcLeft size={45} />
                        </Link>
                    </div>
                </Animated>
                <VoteContainer>
                    <Animated animationIn="fadeIn">
                        <div className="text-center mt-3"><h1 className="title">{topicTitle}</h1></div>
                        <div className="d-flex align-items-center">
                            <div className={"content-tag pencil-line " + (tab === 1 ? "active" : "")} onClick={() => this.setState({ tab: 1 })}>
                                <div><RiFileList3Line size={25} /></div>
                            </div>
                            <div className={"content-tag pencil-line " + (tab === 2 ? "active" : "")} onClick={() => this.setState({ tab: 2 })}>
                                <div><RiPencilLine size={25} /></div>
                            </div>
                            <div className={"content-tag clear-record " + (tab === 3 ? "active" : "")} onClick={() => this.setState({ tab: 3 })}>
                                <div><RiEraserLine size={25} /></div>
                            </div>
                        </div>
                        <div className={"list-content " + (tab === 1 ? "no-scroll" : "")}>
                            {
                                tab === 1 &&
                                <Animated className="h-100" animationIn="fadeIn">
                                    {
                                        showResult ?
                                            <div className="vote-content">
                                                <div className="flex-grow-1">
                                                    <Bar className="pt-3 pb-3" {...this.getChartDatas()} />
                                                </div>
                                                <div className="d-flex justify-content-end">
                                                    <div className="mt-4">
                                                        <button className="back-button" onClick={() => this.setState({ showResult: false })}><RiArrowGoBackFill size={25} /></button>
                                                    </div>
                                                </div>
                                            </div>
                                            :
                                            <div className="vote-content">
                                                <Animated className="vote-options" animationIn="fadeIn">
                                                    {
                                                        options.map(option => {
                                                            return (
                                                                <div key={option.id}>
                                                                    <div>{option.optionDatas.optionName}</div>
                                                                    <div>
                                                                        <Rate allowHalf value={option.starScore} count={10}
                                                                            onChange={(value) => this.handleStarChange(option.id, value)} />
                                                                    </div>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </Animated>
                                                <div>
                                                    <div className="d-flex justify-content-center">
                                                        <div className="vote-button" onClick={this.submitScore}><FaVoteYea size={20} /></div>
                                                    </div>
                                                    <div className="d-flex justify-content-end mt-2 mb-2">
                                                        <div className="vote-button result-button" onClick={() => this.setState({ showResult: true })}><FaChartBar size={20} /></div>
                                                    </div>
                                                </div>
                                            </div>
                                    }
                                </Animated>
                            }
                            {
                                tab === 2 &&
                                <Animated animationIn="fadeIn">
                                    <div className="d-flex justify-content-center align-items-center mt-4">
                                        <form className="d-flex justify-content-center align-items-center" onSubmit={this.createOption}>
                                            <input className="option-input" type="text" value={addOpitionName} placeholder="輸入選項名稱"
                                                onChange={(e) => { this.setState({ addOpitionName: e.target.value }) }} />
                                            <input className="add-button option-submit" type="submit" value="新增" onClick={this.createOption} />
                                        </form>
                                    </div>
                                    <div className="mt-3">
                                        {
                                            options.map(option => {
                                                return (
                                                    <div className="mb-3" key={option.id}>
                                                        <div className="d-flex justify-content-between align-items-center">
                                                            <div>{option.optionDatas.optionName}</div>
                                                            <div><button className="delete-button" onClick={() => this.removeOption(option.id)}><AiTwotoneDelete size={20} /></button></div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </Animated>
                            }
                            {
                                tab === 3 &&
                                <Animated className="clear-record-button text-center" animationIn="fadeIn">
                                    <div className="mt-4 pt-2"><h3>真ㄉ要清除投票紀錄ㄇ</h3></div>
                                    <div className="mt-4 pt-4">
                                        <button className="delete-button" onClick={this.clearScore}>清除</button>
                                    </div>
                                </Animated>
                            }
                        </div>
                    </Animated>
                </VoteContainer>
            </React.Fragment >
        )
    }
}

const VoteContainer = styled.div`
    width:90%;
    margin:0 auto;
    input[type="text"]{
        border:none;
        border-bottom:1.2px solid rgba(0, 0, 0, 0.75);
        background-color:transparent;
        padding:0.3rem;
        &:focus{
            outline:none;
            border-bottom:1.8px solid rgba(0, 0, 0, 1);
        }
    }
    .option-input{
        width:80%;
    }
    .add-button{
        font-size:14px;
        padding:5px 15px;
        margin-left:10px;
    }
    .clear-record-button .delete-button{
        font-size: 20px;
        font-weight: bold;
        padding: 5px 25px;
    }
    .vote-content{
        height:100%;
        display:flex;
        flex-flow:column;
        justify-content:space-between;
        .vote-options{
            overflow-y:auto;
            margin:16px 0;
        }
    }
`