import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {v4 as uuid} from "uuid";
import Moment from "react-moment";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";
import Card from "react-bootstrap/Card";

import firebase from "../modules/firebase";

import {GiRainbowStar} from "react-icons/gi";
import {BsFillCaretUpFill, BsFillCaretDownFill} from "react-icons/bs";
import {AiFillTags} from "react-icons/ai";

import ReactMarkdown from "react-markdown";

export default function Post(p){
    const [author, setAuthor] = useState(p.author);
    const [vote, setVote] = useState(0);
    const [upvotes, setUpvotes] = useState(0);
    const [downvotes, setDownvotes] = useState(0);

    useEffect(()=>{
        if (Object.keys(p.author).length == 0 && p.info){
            p.info.author.get()
            .then((doc) => {
                if (doc.exists){
                    setAuthor(doc.data());
                }else{
                    console.log("The fetched post doc data does not exist!");
                }
            }).catch((error)=>{
                console.log(error, " happened when trying to fetch a post's author!");
            });
        }
    },[p.info]);

    let isUpvoted = (index=false) => {
        let ref = firebase.firestore().collection("posts").doc(p.info.uid);
        for (let i = 0; i < p.user.upvoted_post.length; i++){
            if (ref.isEqual(p.user.upvoted_post[i])){
                if (index){
                    return i;
                }
                return true;
            }
        }
        if (index){
            return -1;
        }
        return false;
    }

    let isDownvoted = (index=false) => {
        let ref = firebase.firestore().collection("posts").doc(p.info.uid);
        for (let i = 0; i < p.user.downvoted_post.length; i++){
            if (ref.isEqual(p.user.downvoted_post[i])){
                if (index){
                    return i;
                }
                return true;
            }
        }
        if (index){
            return -1;
        }
        return false;
    }

    useEffect(()=>{
        if (p.user.upvoted_post && p.user.downvoted_post){
            if (isUpvoted()){
                setVote(1);
                setUpvotes(1);
            }else if (isDownvoted()){
                setVote(-1);
                setDownvotes(1);
            }else{
                setVote(0);
            }
        }
    }, [p.user.upvoted_post, p.user.downvoted_post]);

    let upvote = () => {
        if (vote === 1) return;
        setVote(1);
        let ref = firebase.firestore().collection("posts").doc(p.info.uid);
        let newUpvoted = p.user.upvoted_post;
        let newDownvoted = p.user.downvoted_post;
        if (!isUpvoted()){
            newUpvoted.push(ref);
        }
        let index = isDownvoted(true);
        if (index != -1){
            newDownvoted.splice(index, 1);
        }
        firebase.firestore().collection("users").doc(p.user.uid).set({
            upvoted_post: newUpvoted,
            downvoted_post: newDownvoted,
        }, {merge: true})
        .then(()=>{
            console.log("Upvoted a post successfully!");
        }).catch((error) =>{
            console.log(error, " happened, when trying to upvote a post!");
        });
        firebase.firestore().collection("posts").doc(p.info.uid).set({
            upvote: p.info.upvote + (upvotes == 0 ? 1 : 0),
            downvote: p.info.downvote + (downvotes == 0 ? 0 : -1),
        },{merge:true})
        .then(()=>{
            console.log("Upvote updated!");
        }).catch((error)=>{
            console.log(error, " happeend, when trying to upvote update!");
        })
    }

    let downvote = (postid) => {
        if (vote === -1) return;
        setVote(-1);
        let ref = firebase.firestore().collection("posts").doc(p.info.uid);
        let newUpvoted = p.user.upvoted_post;
        let newDownvoted = p.user.downvoted_post;
        if (!isDownvoted()){
            newDownvoted.push(ref);
        }
        let index = isUpvoted(true);
        if (index != -1){
            newUpvoted.splice(index, 1);
        }
        firebase.firestore().collection("users").doc(p.user.uid).set({
            upvoted_post: newUpvoted,
            downvoted_post: newDownvoted,
        }, {merge: true})
        .then(()=>{
            console.log("Downvoted a post successfully!");
        }).catch((error) =>{
            console.log(error, " happened, when trying to downvote a post!");
        });
        firebase.firestore().collection("posts").doc(p.info.uid).set({
            upvote: p.info.upvote + (upvotes == 0 ? 0 : -1),
            downvote: p.info.downvote + (downvotes == 0 ? 1 : 0),
        },{merge:true})
        .then(()=>{
            console.log("Downvote updated!");
        }).catch((error)=>{
            console.log(error, " happeend, when trying to downvote update!");
        })
    }

    return (
        <>
        {author && p.user.upvoted_post && p.user.downvoted_post && 
        <Card className="shadow mt-3 flex-row">
            <Card.Header className="border-0 px-1 d-flex flex-column align-items-center">
                <BsFillCaretUpFill
                    size={"1.4em"}
                    style={{color: vote === 1 ? "DeepSkyBlue" : "DimGray",
                            cursor:"pointer"}}
                    onClick={upvote}
                />
                    <h6 className="m-0">{(()=>{
                        let base = p.info.upvote-p.info.downvote;
                        if (vote === 1){
                            base += vote-upvotes+downvotes;
                        }else if (vote === -1){
                            base += vote+downvotes-upvotes;
                        }
                        return base;
                    })()}</h6>
                <BsFillCaretDownFill
                    size={"1.4em"}
                    style={{color: vote === -1 ? "DeepSkyBlue" : "DimGray",
                            cursor:"pointer"}}
                    onClick={downvote}
                />
            </Card.Header>
            <div className="flex-row ml-2 my-2">
                <Link to={`/user/${author.username}`}>
                    <img className="rounded-circle" src={author.pfp_url} alt="" style={{width:"2.5em", height:"2.5em"}} />
                </Link>
            </div>
            <Col>
                <Row className="justify-content-between px-2 pt-2 pb-1">
                    <Row className="align-items-center ml-0">
                        <Link to={`/user/${author.username}`}>
                            <Badge variant="primary" className="px-2 py-1">{author.username}</Badge>
                        </Link>
                        <Badge pill className="d-flex justify-content-between align-items-center">
                            <p className="m-0 pr-1"><GiRainbowStar style={{color:"Gray"}}/></p>
                            <p className="m-0">{author.clout}</p>
                        </Badge>
                    </Row>
                    <div className="text-muted my-1" style={{fontSize:"0.8em"}}>
                        <Moment date={p.info.created_at.toDate()} fromNow/>
                    </div>
                </Row>
                <Row className="pb-2">
                    <Col className="pl-2">
                        <ReactMarkdown>
                            {p.info.message}
                        </ReactMarkdown>
                        {/* {p.info.source.length && 
                            <Card.Text className="mb-0">
                                <AiOutlineLink />{" "}
                                {(()=>{
                                    let badges = [];
                                    for (let link in p.info.source){
                                        badges.push(<Badge pill variant="info" key={uuid()}>{(new URL(p.info.source[link])).hostname}</Badge>);
                                        badges.push(" ");
                                    }
                                    return (<>{badges}</>);
                                })()}
                            </Card.Text>
                        } */}
                        <Card.Text>
                            <AiFillTags />{" "}
                            {(()=>{
                                let badges = [];
                                for (let tag in p.info.tag){
                                    badges.push(<Badge pill className="mr-1" variant="info" key={uuid()}>{p.info.tag[tag]["topic"]}</Badge>);
                                }
                                return (<>{badges}</>);
                            })()}
                        </Card.Text>
                    </Col>
                </Row>
            
            </Col>
            
        </Card>
        
        }
        <div></div>
        </>
    );
}