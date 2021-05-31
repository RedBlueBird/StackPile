import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import Col from "react-bootstrap/Col";
import Navbar from "react-bootstrap/Navbar";
import Badge from "react-bootstrap/Badge";
import Dropdown from "react-bootstrap/Dropdown";

import firebase from "../modules/firebase";
import {useAuthState} from "react-firebase-hooks/auth";

import {GiRainbowStar} from "react-icons/gi";
import {FaBell} from "react-icons/fa";
import {MdAddCircle} from "react-icons/md";
import {HiChevronDown} from "react-icons/hi";

import { ReactComponent as Logo } from "../images/stackpile-logo.svg"; 
import Create from "./create";

export default function Navibar(p){
    const [user] = useAuthState(firebase.auth());
    const [userInfo, setUserInfo] = useState({});
    const [showCreate, setShowCreate] = useState(false);

    let defaultFields = {
        username: "username",
        pfp_url: "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png",
        about_self: "",
        clout: 0,
        detail: {birthday: null,
                created_at: new Date(),
                education: "",
                gender: "",
                location: ""},
        post_count: 0,
        post: [],
        following_count: 0,
        following: [],
        follower_count: 0,
        follower: [],
        uid: "",
    }

    function userSetUp(){
        let displayName = user.displayName.split(" ").join("_");
        firebase.firestore().collection("usernames").doc(displayName)
        .set({
            user_ref: firebase.firestore().doc(`users/${user.uid}`)
        })
        .then(()=>{
            console.log("Username successfully registered!");
        }).catch((error) => {
            console.log(error, " happened when trying to register user's username!");
        });
        defaultFields.username = displayName;
        defaultFields.uid = user.uid;
        firebase.firestore().collection("users").doc(user.uid)
        .set(defaultFields)
        .then(() => {
            console.log("User account setup successfully completed!");
        }).catch((error) => {
            console.log(error, " happened when a user is trying to register!");
        });
        firebase.auth().currentUser.updateProfile({
            displayName: displayName
        }).then(()=>{
            console.log("DisplayName successfully changed!");
        }).catch((error)=>{
            console.log(error, " happened when trying to change user's display name!")
        });
    }

    useEffect(()=>{
        console.log(user);
        if (user){
            let userRef = firebase.firestore().collection("users").doc(user.uid);
            userRef.get()
            .then((doc)=>{
                if (doc.exists){
                    setUserInfo(doc.data());
                }else{
                    userSetUp();
                    setUserInfo(defaultFields);
                }
            }).catch((error)=>{
                console.log(error, " occured when trying to get user account data!")
            });
        }
    },[user]);

    function SignIn(){
        const signInWithGoogle = () => {
          const provider = new firebase.firebase.auth.GoogleAuthProvider();
          firebase.auth().signInWithPopup(provider);
        }
      
        return !firebase.auth().currentUser && (
            <button onClick={signInWithGoogle} className="btn btn-primary">Sign In</button>
        )
    }

    const UserInfoToggle = React.forwardRef(({ children, onClick }, ref) => (
        <div
          ref={ref}
          onClick={(e) => {
            e.preventDefault();
            onClick(e);
          }}
          style={{cursor: "pointer"}}
        >
          {children}
        </div>
    ));
      
    const handleShowCreate = () => setShowCreate(true);
    const handleHideCreate = () => setShowCreate(false);

    return (
        <Navbar bg="light" sticky="top" className="d-flex justify-content-center p-0">
            <div className="d-flex justify-content-between align-items-center" style={{width:"95%"}}>
                <div className="d-flex flex-row align-items-center">
                    <Navbar.Brand>
                        <Link to="/">
                            <Logo style={{width:"2em", height:"2em"}} />
                            {/* <SiReddit size={"2em"} style={{color:"#FF5700"}}/> */}
                        </Link>
                    </Navbar.Brand>
                    {/* <div className="rounded flex-fill p-2 m-1" style={{backgroundColor:"white"}}>
                        <p className="block-quote m-0">{"Search placeholder"}</p>
                    </div> */}
                </div>
                <SignIn />
                {firebase.auth().currentUser &&
                <div className="d-flex flex-row-reverse align-items-center">
                    {userInfo &&
                    <Dropdown>
                        <Dropdown.Toggle as={UserInfoToggle}>
                            <div className="d-flex flex-row-reverse rounded align-items-center px-1 m-1" style={{backgroundColor:"white"}}>
                                <HiChevronDown style={{color:"Gray"}} />
                                <div className="pr-1">
                                    <img className="rounded-circle" src={userInfo.pfp_url} style={{width:"2.5em",height:"2.5em"}} />
                                </div>
                                <Col className="px-2">
                                    <Badge variant="primary" className="m-0 mb-1 px-2 py-1">{userInfo.username}</Badge>
                                    <Badge pill className="d-flex justify-content-between align-items-center">
                                        <p className="m-0"><GiRainbowStar style={{color:"Gray"}}/></p>
                                        <p className="m-0">{10}</p>
                                    </Badge>
                                </Col>
                            </div>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item as={Link} to={`/user/${userInfo.username}`}>
                                Profile
                            </Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item className="text-danger" onClick={() => {firebase.auth().signOut(); window.location.reload();}}>
                                Sign Out
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown> 
                    }
                    <div className="rounded-circle p-2 m-1" style={{backgroundColor:"white", cursor:"pointer"}}>
                        <FaBell size={"1.8em"} style={{color:"dimGray"}}/>
                    </div>
                    <div className="rounded-circle p-2 m-1" onClick={handleShowCreate} style={{backgroundColor:"white", cursor:"pointer"}}>
                        <MdAddCircle size={"2em"} style={{color:"dimGray"}}/>
                    </div>
                    <Create show={showCreate} handleShow={handleShowCreate} handleHide={handleHideCreate} author={userInfo} />
                </div>
                }   
            </div>
        </Navbar>
    )
}