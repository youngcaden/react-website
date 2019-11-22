import React, { Component } from 'react'
import axios from 'axios'

import { Typography, Col, Row, Button, Divider, Layout } from 'antd'
import 'antd/dist/antd.css'
import '../css/articleContent.css'

import CommentPanel from './comment'

import FooterNamePlate from './Footer'

const { Text, Title} = Typography
const { Sider,Content } = Layout



class ArticleContent extends Component{
    constructor(props){
        super(props)
        this.state = {
            _id: props.match.params.index,
            views: this.props.location.state.views,
            article: {},
            top: 650,
            loading_footer: false
        }
    }
    componentDidMount(){
        // console.log(this.props.match.params.index)
        // console.log(this.state._id)
        axios.get('http://localhost:8088/getOneArticle/'+this.props.match.params.index,{params:{views: this.state.views}}).then(res => {
        console.log(res.data)    
        console.log(res.data.article)
            this.setState({
                article: res.data.article,
                loading_footer: true
            })
        }).catch(err => {
            console.log(err)
        })
    }
    back(){
        console.log("hello")
        this.props.history.goBack(-1)
    }
    render(){
        const { articleTitle,articleType,content,author,createDate,starsNum,views } = this.state.article
        return(
        <Layout>
        <Sider></Sider>
        <Layout>
            <Content style={{ marginRight: '50px', marginLeft: '2%', background: '#fff', marginTop: '2rem',minHeight: 380 }}>
            <div className="article_warpper">
            {/* {this.props.match.params.index} {this.props.location.state.views} */}
                <Row>
                    <Col span={22} offset={1}>
                            <Title style={{paddingTop:'3rem',paddingBottom:'2rem'}} level={2}>{ articleTitle }</Title>
                            <Divider dashed orientation="left">
                            <Text style={{marginLeft:'1rem',fontSize:'0.7rem'}}>Publisher: {author}</Text>
                            <Text style={{marginLeft:'0.5rem',fontSize:'0.7rem'}}>Date: {createDate}</Text>
                            <Text style={{marginLeft:'1rem',fontSize:'0.7rem'}}>Views: {views || 0}</Text>
                            </Divider>
                            <Divider></Divider>
                            <div className="article_content" dangerouslySetInnerHTML = {{ __html: content}}>
                            </div> 
                            <Divider></Divider>
                            <CommentPanel />
                            <Divider></Divider>
                           
                    </Col> 
                </Row>
            </div>
            </Content>
            { this.state.loading_footer && <FooterNamePlate />}
        </Layout>
        </Layout>
        )
    }

}

export default ArticleContent