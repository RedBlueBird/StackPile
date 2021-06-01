import React, {useState} from "react";
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
import Resizer from "react-image-file-resizer";

export default function UserBio(p){
    const [mode, setMode] = useState("display");
    const [about, setAbout] = useState(p.info.about_self);
    const [aboutDraft, setAboutDraft] = useState(p.info.about_self);
    const aboutCharLimit = 250;
    const [pfpFile, setPfpFile] = useState();
    const [pfpDataUrl, setPfpDataUrl] = useState("");
    const [pfpMsg, setPfpMsg] = useState("");

    function getBase64(file) {
        return new Promise(function(resolve) {
          var reader = new FileReader();
          reader.onloadend = function() {
            resolve(reader.result)
          }
          reader.readAsDataURL(file);
        })
    }

    async function processPfp(e){
        let file = e.target.files[0];
        if (!file){
            return;
        }
        if (file.type !== "image/png" && file.type !== "image/jpeg"){
            setPfpMsg("Invalid image type");
            return;
        }
        if (file.size > 1048576){
            setPfpMsg("File size exceeds 1 MiB");
        }
        try {
            Resizer.imageFileResizer(
                file,
                200,
                200,
                "png",
                100,
                0,
                (uri) => {
                    getBase64(uri)
                    .then((base64)=>setPfpDataUrl(base64));
                    let blob = uri.slice(0, uri.size, "image/png");
                    let newFile = new File([blob], "pfp.png", {type:"image/png", lastModified:new Date().getTime()})
                    setPfpFile(newFile);
                },
                "file"
            );
            setPfpMsg("");
        } catch (error) {
            setPfpMsg("Unknown error occurred")
            console.log(error, " happened when trying to upload image!")
        }
    }

    function bioUpdate(){
        if (aboutDraft.length < aboutCharLimit && pfpMsg === ""){
            firebase.firestore().collection("users").doc(p.info.uid).set({
                about_self: aboutDraft
            },{merge: true})
            .then(() => {
                setAbout(aboutDraft);
                setMode("display");
                //TODO: Only set mode to display if both pfp and about updates are successful
            })
            .catch((error)=>{
                console.log(error, " happened when trying to edit User Detail!");
            });
            if (pfpFile){
                console.log(pfpFile.size);
                let filePath = `users/${p.info.uid}/${pfpFile.name}`;
                let task = firebase.storage().ref(filePath).put(pfpFile);
                task.on("state_changed",
                    (snapshot)=>{

                    },
                    (error)=>{
                        console.log(error, " happened when trying to upload profile picture!");
                    },
                    () => {
                        task.snapshot.ref.getDownloadURL()
                        .then((url) => {
                            console.log(url);
                            firebase.firestore().collection("users").doc(p.info.uid).set({
                                pfp_url: url
                            },{merge: true})
                            .then(() => {
                                setPfpFile();
                                setMode("display");
                                window.location.reload();
                                //The navibar and post components will still display old pfp without the refresh
                            })
                            .catch((error)=>{
                                console.log(error, " happened when trying to edit User Detail!");
                            });
                        });
                    }
                );
            }
        }
    } 

    return (
        <>
        {mode === "display" &&
        <Card className="shadow my-2">
            <Card.Header>
                <div className="d-flex justify-content-between align-items-center">
                    <h6 className="m-0">Profile</h6>
                    {firebase.auth().currentUser && firebase.auth().currentUser.uid === p.info.uid &&
                        <AiOutlineEdit size={"1.2em"} style={{color:"Gray", cursor: "pointer"}} onClick={()=>setMode("edit")} />
                    }
                </div>
            </Card.Header>
            <Card.Body>
                <Row>
                    <Col xs={4}>
                        <img className="rounded-circle" src={pfpDataUrl ? pfpDataUrl : p.info.pfp_url}
                            alt="" style={{width: "6em", height: "6em"}}/>
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
                        <ReactMarkdown children={about} components={{img: props => <img alt="parse disabled in profile" /> }} />
                    }
                </div>
                {firebase.auth().currentUser && firebase.auth().currentUser.uid !== p.info.uid &&
                    <Button variant="primary" block>
                        {"Follow"}
                    </Button>
                }
            </Card.Body>
        </Card>
        }
        {mode === "edit" &&
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
                        <input type="file" id="pfpChange" accept="image/jpeg, image/png" onChange={processPfp} hidden />
                        <label htmlFor="pfpChange" style={{cursor:"pointer"}} >
                           <img className="rounded-circle" src={pfpDataUrl ? pfpDataUrl : p.info.pfp_url}
                            alt="" style={{width: "6em", height: "6em"}}/> 
                            <small className="text-danger">{pfpMsg}</small>
                        </label>
                        
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
                    <Button variant="info" onClick={()=>bioUpdate()}>
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