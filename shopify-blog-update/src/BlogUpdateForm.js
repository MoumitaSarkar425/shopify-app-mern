import React, { useState,useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText,Container, Row, Col, Card, CardBody,CardTitle,Table} from 'reactstrap';
import {
    CircularProgress,
  } from "@mui/material";
  import axios from 'axios';


export default function BlogUpdateForm() {
  
const [loader,setLoader] = useState(false);
const[FormData,setFormData]=useState({
    store : '',
    accessToken :'',
    apiVersion : '',
    currentBlogId:'',
    updateBlogId:'',
    articlesHandel:'',
    urlPrefix:'',
    
});
const [submitting, setSubmitting] = useState(false);

const[errors,setErrors]=useState({
    store : '',
    accessToken :'',
    apiVersion : '',
    currentBlogId:'',
    updateBlogId:'',
    articlesHandel:'',
    urlPrefix:'',
    
});


const [articleId, setArticleId] = useState('');
const [articlelist, setArticlelist] = useState([]);
const [notfetchedarticleList, setNotfetchedarticleList] = useState([]);
const [loadingindices, setloadingindices] = useState(new Set());

const handelInput = (e)=>{
    setFormData({ ...FormData, [e.target.name]: e.target.value })
}

const validateValues = (FormData) => {
    let errors = {};
    console.log(FormData.store)
    if (FormData.store =='') {
      var storeErr = "Store name is required";
    }
    setErrors({...errors, store:storeErr })
    return errors;
  };

const submitEditForm = async(e)=>{
    e.preventDefault();
    
    let valError = true;
    var storeErr = '';
    if (FormData.store =='') {
        var storeErr = "Store name is required";
        valError = false
    }
    setLoader(false)
    setErrors({...errors, store:storeErr })
    if(valError){
        setLoader(true)
        var articleUrl = FormData.articlesHandel;
        var urlWithPrefix = articleUrl.split('\n');
        const articleSlugs = urlWithPrefix.map(function(url){
            return FormData.urlPrefix ? url.replace(FormData.urlPrefix,"") : url
        })
            

            var store = FormData.store;
            var apiVersion = FormData.apiVersion;
            var currentBlogId = FormData.currentBlogId;
            var accessToken = FormData.accessToken;
            var updateBlogId = FormData.updateBlogId;

            const url = `${process.env.REACT_APP_AXIOS_BASE_URL}/getArticleDetailsByHandel`
            const data = {
                store : store,
                apiVersion : apiVersion,
                currentBlogId: currentBlogId,
                handel  : articleSlugs.join()
            }

            axios({
                method:'post',
                url,
                headers: {
                "Content-Type": "application/json",
                },
                data: data
            }).then((result) => {
                setLoader(false)
                setArticlelist(result.data.articles)
                
                // setArticleId(result.data.articles.articles[0].id);
                // return result.data.articles.articles[0].id;
            }).catch(error => {
                setLoader(false)
                console.log(error)
            });

        
        
        articlelist.map(async(article)=>{
            const notFetched = articleSlugs.indexOf(article.handle);
            if (notFetched !== -1) articleSlugs.splice(notFetched, 1);
            
        })
        setNotfetchedarticleList(articleSlugs);
        console.log(articlelist);
    }
    
}


const updateBlog = async(currentArticleId,selectedindex)=>{


    var store = FormData.store;
    var apiVersion = FormData.apiVersion;
    var currentBlogId = FormData.currentBlogId;
    var accessToken = FormData.accessToken;
    var updateBlogId = FormData.updateBlogId;

    setloadingindices((prev) => new Set([...prev, selectedindex]));

    const url_update = `${process.env.REACT_APP_AXIOS_BASE_URL}/updateBlogUrl`
    const dataUpdate = {
        store : store,
        apiVersion : apiVersion,
        currentBlogId: currentBlogId,
        articleId  : currentArticleId,
        updatedBlogId : updateBlogId
    }

    axios({
        method:'post',
        url: url_update,
        headers: {
        "Content-Type": "application/json",
        },
        data: dataUpdate
    }).then((result) => {
        setloadingindices((prev) => {
            const updated = new Set(prev);
            updated.delete(selectedindex);
            return updated;
        });
        console.log(result);
    }).catch(error => {
        setloadingindices((prev) => {
            const updated = new Set(prev);
            updated.delete(selectedindex);
            return updated;
        });
        console.log(error)
    });

}


//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
//2023-10

  return (

    <>
    <Container className='App'>
        <Card className='mt-5'>
            <CardBody>
                <CardTitle tag="h5">
                Change Blog of an Article
                </CardTitle>
                <hr />
                <Form onSubmit={submitEditForm}>
                    <Row className='form-row'>
                        <Col sm="12" xs="12" md="4">
                            <FormGroup>
                                <Label for="exampleEmail">
                                Store: <span className="text-danger">*</span>
                                </Label>
                                <Input
                                id="exampleEmail"
                                name="store"
                                placeholder="Your Store (without .myshopify.com) "
                                type="text"
                                onChange={handelInput}
                                />
                                {errors.store ? (
                                    <small className="text-danger">
                                        {errors.store}
                                    </small>
                                ) : null}
                            </FormGroup>
                        </Col>
                        <Col sm="12" xs="12" md="4">
                            <FormGroup>
                                <Label for="exampleEmail">
                                Access Token <span className="text-danger">*</span>
                                </Label>
                                <Input
                                id="exampleEmail"
                                name="accessToken"
                                placeholder="Store Access Token"
                                type="text"
                                onChange={handelInput}
                                />
                            </FormGroup>
                        </Col>
                        <Col sm="12" xs="12" md="4">
                            <FormGroup>
                                <Label for="exampleEmail">
                                API Version <span className="text-danger">*</span>
                                </Label>
                                <Input
                                id="exampleEmail"
                                name="apiVersion"
                                placeholder="YYYY-MM"
                                type="text"
                                onChange={handelInput}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <hr/>
                    <Row className='mt-3 form-row'>
                        <Col  md="6">
                            <FormGroup>
                                <Label for="exampleEmail">
                               Current Blog Id <span className="text-danger">*</span>
                                </Label>
                                <Input
                                id="exampleEmail"
                                name="currentBlogId"
                                placeholder="Current blog id of Articles"
                                type="text"
                                onChange={handelInput}
                                />
                            </FormGroup>
                        </Col>
                        <Col  md="6">
                            <FormGroup>
                                <Label for="exampleEmail">
                                Update Blog Id With <span className="text-danger">*</span>
                                </Label>
                                <Input
                                id="exampleEmail"
                                name="updateBlogId"
                                placeholder="Where you need to update the Article"
                                type="text"
                                onChange={handelInput}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row className='mt-3 form-row'> 
                        <Col  md="12">
                            <FormGroup>
                                <Label for="exampleEmail">
                                Article Urls / Handles <span className="text-danger">*</span>
                                </Label>
                                <Input
                                id="exampleText"
                                name="articlesHandel"
                                type="textarea"
                                onChange={handelInput}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row className='mt-3 form-row'> 
                        <Col  md="12">
                            <FormGroup>
                                <Label for="exampleEmail">
                                URL Prefix<span className="text-danger">*</span>
                                </Label>
                                <Input
                                id="exampleText"
                                name="urlPrefix"
                                type="text"
                                onChange={handelInput}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row className='mt-3 form-row-right'>
                        <Col md="4">
                            <Button
                                color="primary"
                                outline
                            >
                               {loader ? <CircularProgress size={20} /> : ''} Update
                            </Button>
                        </Col>
                        
                    </Row>
                </Form>
            </CardBody>
        </Card>
    </Container>

    <Container>
        <Table>
            <thead>
                <tr>
                <th>#</th>
                <th>URL</th>
                <th>Article ID</th>
                <th>Current Blog ID</th>
                <th>Update Blog ID With</th>
                <th>Status</th>
                <th>Action</th>
                </tr>
            </thead>
            <tbody>
                
                { articlelist?.map((articleListData, i) => (
                        <tr key={i}>
                            <th scope="row">{i + 1}</th>
                            <td>{articleListData.handle}</td>
                            <td>{articleListData.id}</td>
                            <td>{articleListData.blog_id}</td>
                            <td>{FormData.updateBlogId}</td>
                            <td><span class="badge bg-info">Fetched</span></td>
                            <td><button class="btn btn-outline-success btn-sm update-articles-blog" onClick={()=>updateBlog(articleListData.id,i)}>{loadingindices.has(i) ?  <CircularProgress size={20} /> : ''}Update Blog</button></td>
                        </tr>
                    ))
                }

                { notfetchedarticleList?.map((data, j) => (
                        <tr key={j}>
                            <th scope="row">{j + 1}</th>
                            <td>{data}</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td><span class="badge bg-danger">Article Not Found</span></td>
                            <td></td>
                        </tr>
                    ))
                }
                
                
            </tbody>
        </Table>
        
    </Container>
    </>
  )
}

