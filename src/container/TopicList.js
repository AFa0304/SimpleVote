import React, { Component } from 'react'
import styled from 'styled-components'
import { Animated } from 'react-animated-css'
import { firestore } from 'firebase'
import { Link } from 'react-router-dom'
import { RiPencilLine, RiFileList3Line } from 'react-icons/ri'
import { AiTwotoneDelete } from 'react-icons/ai'

export default class TopicList extends Component {
    state = {
        topicList: [],
        addTopicName: "",
        tab: 1
    }
    componentDidMount() {
        this.topic_collection = firestore().collection("topic")
        this.topic_collection.orderBy("title").onSnapshot(querySnapshot => {
            let _topicList = []
            querySnapshot.forEach(doc => {
                _topicList.push({
                    id: doc.id,
                    title: doc.data().title
                })
                this.setState({
                    topicList: _topicList
                })
            });
        })
    }
    createTopic = () => {
        this.topic_collection.add({ title: this.state.addTopicName }).then(() => {
            this.setState({
                addTopicName: "",
                tab: 1
            })
        })
    }
    removeTopic = (topicID) => {
        this.topic_collection.doc(topicID).delete()
    }
    render() {
        const { topicList, addTopicName, tab } = this.state
        return (
            <TopicContainer className="translate-50">
                <Animated animationIn="fadeIn">
                    <div className="d-flex">
                        <div className={"content-tag " + (tab === 1 ? "active" : "")} onClick={() => this.setState({ tab: 1 })}><RiFileList3Line size={25} /></div>
                        <div className={"content-tag " + (tab === 2 ? "active" : "")} onClick={() => this.setState({ tab: 2 })}><RiPencilLine size={25} /></div>
                    </div>
                    <div className="list-content">
                        {
                            tab === 1 &&
                            topicList.map((topic) => {
                                return (
                                    <div className="topic d-flex justify-content-between align-items-center" key={topic.id}>
                                        <Animated animationIn="fadeInRight" >
                                            <Link to={"/vote/" + topic.id}>
                                                {topic.title}
                                            </Link>
                                        </Animated>
                                        <Animated animationIn="fadeIn" animationInDelay={800}>
                                            <button className="delete-button" onClick={() => this.removeTopic(topic.id)}><AiTwotoneDelete size={20}/></button>
                                        </Animated>
                                    </div>
                                )
                            })
                        }
                        {
                            tab === 2 &&
                            <Animated className="d-flex flex-column justify-content-center align-items-center" animationIn="fadeIn">
                                <div className="d-flex align-items-center pt-4 pb-4">
                                    <div className="mr-2"><h3>標題</h3></div>
                                    <div>
                                        <input className="w-100" type="text" value={addTopicName} placeholder="請輸入標題"
                                            onChange={(e) => { this.setState({ addTopicName: e.target.value }) }} />
                                    </div>
                                </div>
                                <div className="mt-4 pt-4">
                                    <button className="add-button" onClick={this.createTopic}>新增</button>
                                </div>
                            </Animated>
                        }
                    </div>
                </Animated>
            </TopicContainer>
        )
    }
}

const TopicContainer = styled.div`
    width:90%;
    position:fixed;
    top:50%;
    left:50%;
    .list-content{
        .topic{
            padding:8px 0;
            a{
                font-size:18px;
                font-weight:bold;
                color:#000;
            }
        }
        h3{
            font-size:24px;
            font-weight:bold;
            margin:0;
            white-space:nowrap;
        }
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
    }
`;