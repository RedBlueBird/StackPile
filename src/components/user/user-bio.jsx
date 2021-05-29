import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";

import firebase from "../../modules/firebase";

import {AiOutlineEdit} from "react-icons/ai";
import {BsBoxArrowUpRight} from "react-icons/bs";
import {GiRainbowStar} from "react-icons/gi";
import {BsPersonLinesFill, BsPeopleFill} from "react-icons/bs";
import {FaGithub, FaGoogle} from "react-icons/fa";

import TextareaAutosize from "react-textarea-autosize";
import ReactMarkdown from "react-markdown";

export default function UserBio(p){
    const [mode, setMode] = useState("display");
    const [about, setAbout] = useState(p.info.about_self);
    const [aboutDraft, setAboutDraft] = useState(p.info.about_self);
    const aboutCharLimit = 250;

    function detailUpdate(){
        if (aboutDraft.length < aboutCharLimit){
            firebase.firestore.collection("users").doc(p.username).set({
                about_self: aboutDraft
            },{merge: true})
            .then(() => {
                setAbout(aboutDraft);
                setMode("display");
            })
            .catch((error)=>{
                console.log(error, " happened when trying to edit User Detail!");
            });
        }
    } 

    return (
        <>
        {mode == "display" &&
        <Card className="shadow my-2">
            <Card.Header>
                <div className="d-flex justify-content-between align-items-center">
                    <h6 className="m-0">Profile</h6>
                    <AiOutlineEdit size={"1.2em"} style={{color:"Gray", cursor: "pointer"}} onClick={()=>setMode("edit")} />
                </div>
            </Card.Header>
            <Card.Body>
                <Row>
                    <Col xs={4}>
                        <img className="rounded-circle" src={p.info.pfp_url}
                            style={{width: "100%", height: "auto"}}/>
                    </Col>
                    <Col xs={8}>
                        <h4>{p.info.username}</h4>
                        <div className="d-flex justify-content-between align-items-center">
                            <p className="m-0">
                                <GiRainbowStar style={{color:"Gray"}}/> Clout
                            </p>
                            <Badge pill variant="info">{p.info.clout}</Badge>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                            <p className="m-0">
                                <BsPersonLinesFill style={{color:"Gray"}}/> Following
                            </p>
                            <Badge pill variant="info">{p.info.following_count}</Badge>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                            <p className="m-0">
                                <BsPeopleFill style={{color:"Gray"}}/> Followers
                            </p>
                            <Badge pill variant="info">{p.info.follower_count}</Badge>
                        </div>
                    </Col>
                </Row>
                {/* <div className="px-2 mt-1">
                    <FaGithub size={"1.8em"} style={{color:"DimGray"}}/>
                    <FaGoogle size={"1.8em"} style={{color:"DimGray"}}/>
                </div> */}
                <div className="my-3">
                    {!about ? "This user left a blank bio!" :
                        <ReactMarkdown children={about} components={{img: props => <img alt="profile image parse disabled" /> }} />
                    }
                </div>
                <Button variant="primary" block>
                    {"Follow"}
                </Button>
            </Card.Body>
        </Card>
        }
        {mode == "edit" &&
        <Card className="shadow my-2">
            <Card.Header>
                <div className="d-flex justify-content-between align-items-center">
                    <h6 className="m-0">Profile</h6>
                    <BsBoxArrowUpRight size={"1.2em"} style={{color:"Gray", cursor: "pointer"}} onClick={()=>{setAboutDraft(about);setMode("display");}} />
                </div>
            </Card.Header>
            <Card.Body>
                <Row>
                    <Col xs={4}>
                        <img className="rounded-circle" src={p.info.pfp_url}
                            style={{width: "100%", height: "auto"}}/>
                    </Col>
                    <Col xs={8}>
                        <h4>{p.info.username}</h4>
                        <div className="d-flex justify-content-between align-items-center">
                            <p className="m-0">
                                <GiRainbowStar style={{color:"Gray"}}/> Clout
                            </p>
                            <Badge pill variant="info">{p.info.clout}</Badge>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                            <p className="m-0">
                                <BsPersonLinesFill style={{color:"Gray"}}/> Following
                            </p>
                            <Badge pill variant="info">{p.info.following_count}</Badge>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                            <p className="m-0">
                                <BsPeopleFill style={{color:"Gray"}}/> Followers
                            </p>
                            <Badge pill variant="info">{p.info.follower_count}</Badge>
                        </div>
                    </Col>
                </Row>
                {/* <div className="px-2 mt-1">
                    <FaGithub size={"1.8em"} style={{color:"DimGray"}}/>
                    <FaGoogle size={"1.8em"} style={{color:"DimGray"}}/>
                </div> */}
                <div className="my-3">
                    <TextareaAutosize className="form-control" minRows={3} maxRows={6} style={{resize:"none"}} value={aboutDraft} onChange={e => setAboutDraft(e.target.value)} placeholder={"Interests, hobbies, experiences, etc\nMarkdown supported!"} />
                    <div className={about.length > aboutCharLimit ? "text-danger" : "text-muted"}>
                        <small className="form-text text-right">{aboutDraft.length}/{aboutCharLimit}</small>
                    </div>
                </div>
                <div className="d-flex justify-content-around align-items-center mt-2">
                    <Button variant="info" onClick={()=>detailUpdate()}>
                        Confirm
                    </Button>
                    <Button variant="outline-secondary" onClick={()=> {setAboutDraft(about);setMode("display");}}>
                        Cancel
                    </Button>
                </div>
            </Card.Body>
        </Card>
        }
        </>
    );
}