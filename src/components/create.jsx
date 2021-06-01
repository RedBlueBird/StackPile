import React, {useState} from "react";
import {v4 as uuid} from "uuid";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import {useDocumentDataOnce} from "react-firebase-hooks/firestore";
import firebase from "../modules/firebase";

import {AiFillTags, AiOutlinePlus} from "react-icons/ai";
import {MdCancel} from "react-icons/md";

import TextareaAutosize from "react-textarea-autosize";
import ReactMarkdown from "react-markdown";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";

export default function Create(p){
    const [message, setMessage] = useState("");
    const messageCharLimit = 250;
    const [tags, setTags] = useState([]);
    const [currField, setCurrField] = useState("");
    const [currTag, setCurrTag] = useState("");
    const [tagMsg, setTagMsg] = useState("");

    const [allTags] = useDocumentDataOnce(firebase.firestore().collection("globals").doc("tags"));

    const fields = [{label:"Informatics", value:"Informatics"},
                    {label:"Physics", value:"Physics"},
                    {label:"Mathematics", value:"Mathematics"},
                    {label:"Chemistry", value:"Chemistry"},
                    {label:"Biology", value:"Biology"}];
                    
    function addTag(){
        if (currField && currTag){
            for (let i in tags){
                if (tags[i].field === currField && tags[i].topic === currTag){
                    return;
                }
            }
            setTags([...tags, {field:currField, topic:currTag}]);
            // setCurrField("");
            // setCurrTag("");
            //TODO: reset select value
        }
    }

    function sharePost(){
        if (message.length === 0){
            setTagMsg("Post cannot be left blank");
            return;
        }
        if (tags.length === 0){
            setTagMsg("Need at least one tag");
            return ;
        }
        let postRef;
        firebase.firestore().collection("posts")
        .add({
            author: firebase.firestore().collection("users").doc(p.author.uid),
            message: message,
            created_at: new Date(),
            downvote: 0,
            upvote: 0,
            tag: tags
        })
        .then((docRef) => {
            console.log("New post successfully shared!");
            setMessage("");
            setTags([]);
            setTagMsg("");
            postRef = docRef.id;
            p.handleHide();

            firebase.firestore().collection("users").doc(p.author.uid).set({
                post_count: p.author.post_count+1,
                post: [...p.author.post, firebase.firestore().collection("posts").doc(postRef)]
            },{merge: true})
            .then(() => {
                window.location.href = "/home";
            })
            .catch((error)=>{
                console.log(error, " happened when trying to edit User Detail!");
            });

        }).catch((error) => {
            console.log(error, " happened when a post is trying to be shared!");
        });
        
    }
    
    return (
        <Modal show={p.show} onHide={p.handleHide} backdrop="static" >
            <Modal.Header closeButton>
                <Modal.Title>Create Post</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <TextareaAutosize
                    className="form-control"
                    minRows={4}
                    maxRows={6}
                    style={{resize:"none"}}
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    placeholder={"Share it away! \nEx: ![](https://tinyurl.com/StackpileExample) to share a image"}
                    />
                <div className={message.length > messageCharLimit ? "text-danger" : "text-muted"}>
                    <small className="form-text text-right">{message.length}/{messageCharLimit}</small>
                </div>
                <div className="border shadow-sm p-2">
                    <ReactMarkdown
                        className={message ? "" : "text-muted"}
                        children={message ? message : "Preview markdown"}
                        components={{img: props => <img src={props.src} alt="" style={{width:"100%"}} /> }}
                    />
                </div>
                <Row className="d-flex align-items-start px-3 mt-3" >
                    <Col xs={3} >
                        <AiFillTags className="mr-1" style={{color:"Gray"}} />
                        Tags
                    </Col>
                    <Col xs={9} className="" >
                        {tags.map((tag, index)=>(
                            <div className="d-flex justify-content-between align-items-center mb-1" key={uuid()}>
                                <Badge variant="primary" className="px-2 py-1">{tag.topic}</Badge>
                                <MdCancel style={{color:"gray", cursor:"pointer"}} onClick={()=>{
                                    let newTags = [...tags];
                                    newTags.splice(index, 1);
                                    setTags(newTags);
                                    console.log(tags);
                                }} />
                            </div>
                        ))}
                        {tags.length <= 5 &&
                        <div className="d-flex flex-row">
                            <Col xs={5} className="p-0">
                                <Select className="flex-grow-1" options={fields} isClearable={true} onChange={e => setCurrField(e ? e.value : "")} placeholder="field" />
                            </Col>
                            <Col xs={5} className="p-0">
                                <CreatableSelect className="flex-grow-1" options={currField ? allTags.tags[currField] : []} isClearable={true} onChange={e => setCurrTag(e ? e.value : "")} placeholder="topic" />
                            </Col>
                            <Col xs={2}>
                                <div className="btn btn-outline-info" onClick={addTag} >
                                    <AiOutlinePlus />
                                </div>
                            </Col>
                        </div>
                        }
                        {tagMsg && 
                        <div className="d-flex justify-content-end">
                            <small className="text-danger">{tagMsg}</small>
                        </div>
                        }
                    </Col>
                </Row>
                <div className="d-flex justify-content-around align-items-center mt-3">
                    <Button variant="info" onClick={sharePost}>
                        Share
                    </Button>
                    <Button variant="outline-secondary" onClick={p.handleHide}>
                        Cancel
                    </Button>
                </div>
            </Modal.Body>
        </Modal>
    );
}