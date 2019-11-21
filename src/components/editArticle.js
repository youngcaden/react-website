
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Layout, Input, Menu, Icon, Form, Radio, Button, message } from 'antd'

import axios from 'axios'

import BraftEditor from 'braft-editor'   // editor for react
import 'braft-editor/dist/index.css'
import '../css/editArticle.css'

const { Sider, Content } = Layout
const { SubMenu } = Menu


class EditArticle extends Component{
    constructor(props){
        super(props)
    }
    state = {
        author: window.sessionStorage.getItem("login_user"),
        articleTitle: '',
        articleType: '',
        editorState: BraftEditor.createEditorState('<p>Hello <b>welcome here !</b></p>'), // 设置编辑器初始内容
        outputHTML: '<p></p>'
    }
    componentDidMount () {
        this.isLivinig = true
        setTimeout(this.setEditorContentAsync, 3000)
    }
    componentWillUnmount () {
        this.isLivinig = false
    }

    handleChange = (editorState) => {     // the article content you inputted.
        this.setState({
            editorState: editorState,
            outputHTML: editorState.toHTML()
        })
    }
    articleTitle = (e) => {
        this.setState({
            articleTitle: e.target.value
        })
    }
    articleType = (e) => {
        // console.log('radio checked', e.target.value)
        this.setState({
            articleType: e.target.value
        })
    }
    setEditorContentAsync = () => {
        this.isLivinig && this.setState({
            editorState: BraftEditor.createEditorState('<p>主人，<b>在此处开始编辑你的内容吧!</b><p>')
        })
    }
    handleSubmit = e => {               // click last click the button to submit the article to the server database.
        if((!this.state.articleTitle) || (!this.state.articleType) || (!this.state.author) || (!this.state.outputHTML)){
            message.error('输入信息不完整，请检查！ ')
            console.log("非法提交")
        }else{
            axios.post('http://localhost:8088/add_article',{
                articleTitle: this.state.articleTitle, 
                articleType: this.state.articleType, 
                content: this.state.outputHTML,
                author: this.state.author,
                createDate: new Date(),
                starsNum: 0,
                views:0
            }).then(res => {
                console.log(res.data.status)
               if(res.data.status == 'true'){
                    this.props.history.push("/commit_successful")
                }
            }).catch(err => {
                console.log(err)
            })
            console.log("submit the content to the databases")

            // this.props.history.psh("commitSuccess")
        }
      
        e.preventDefault()
    }

    render(){
        const formItemLayout = {
            labelCol: {
              xs: { span: 24 },
              sm: { span: 2 },
            },
            wrapperCol: {
              xs: { span: 24 },
              sm: { span: 20 },
            },
          }
        const tailFormItemLayout = {
            wrapperCol: {
              xs: {
                span: 24,
                offset: 0,
              },
              sm: {
                span: 16,
                offset: 1,
              },
            },
          }
        const { editorState } = this.state
        return(
            <Layout>
                <Sider className="article_sider" width="18%" theme="light">
                    <Menu onClick={this.handleClick} defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']}  mode="inline" >
                        <SubMenu key="sub1"  title={ <span> <Icon type="mail" /><span>ARTICLE MANAGEMENT</span> </span>}>
                            <Menu.Item key="1">新建文章</Menu.Item>
                            <Menu.Item key="2">文章总览</Menu.Item>
                            <Menu.Item key="3">Option 3</Menu.Item>
                            <Menu.Item key="4">Option 4</Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub2" title={<span> <Icon type="appstore" /><span>Navigation Two</span> </span>}>
                        <Menu.Item key="5">Option 5</Menu.Item>
                        <Menu.Item key="6">Option 6</Menu.Item>
                        <SubMenu key="sub3" title="Submenu">
                            <Menu.Item key="7">Option 7</Menu.Item>
                            <Menu.Item key="8">Option 8</Menu.Item>
                        </SubMenu>
                        </SubMenu>
                    </Menu>
                </Sider>
                <Content className="article_content">
                     <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                        <Form.Item label="title"><Input placeholder="input the article title ..." onChange={this.articleTitle} value={this.state.articleTitle} style={{width:400}}/></Form.Item>
                        <Form.Item label="category"> <Input placeholder="select the article type ..." value={this.state.articleType} style={{width:200}}/>
                        <Radio.Group buttonStyle="outline" onChange={this.articleType} value={this.state.articleType}>
                            <Radio value="CSS">Css</Radio>
                            <Radio value="Javascript">Javascript</Radio>
                            <Radio value="Typescript">Typescript</Radio>
                            <Radio value="React">React</Radio>
                            <Radio value="Vuejs">Vuejs</Radio>
                            <Radio value= "Angular">Angular</Radio>
                            <Radio value="Nodejs">Nodejs</Radio>
                            <Radio value="Flutter">Flutter</Radio>
                            <Radio value="Database">Database</Radio>
                            <Radio value="Python">Python</Radio>
                            <Radio value="PhP">Php</Radio>
                            <Radio value="Java">Java</Radio>
                        </Radio.Group>
                        </Form.Item>
                        <Form.Item label=" ">
                                <BraftEditor
                                    value={editorState}
                                    onChange={this.handleChange}
                                    height={200}
                                />
                        </Form.Item>
                        <Form.Item {...tailFormItemLayout}><Button type="primary" htmlType="submit"> submit this article </Button> </Form.Item>
                        {/* <h5>输出内容</h5> */}
                        {/* <div className="output-content">{this.state.articleTitle + this.state.articleType + outputHTML}</div> */}
                    </Form>
                </Content>
                
            </Layout>
       )
    }
}

export default withRouter(EditArticle)