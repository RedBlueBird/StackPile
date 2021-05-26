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

export default function Navibar(p){
    const [user] = useAuthState(firebase.auth);
    const [userInfo, setUserInfo] = useState({});

    useEffect(()=>{
        console.log(user);
        if (user){
            let userRef = firebase.firestore.collection("users").doc(user.displayName);
            userRef.get()
            .then((doc)=>{
                if (doc.exists){
                    setUserInfo(doc.data());
                }else{
                    console.log("User account data is empty!")
                }
            }).catch((error)=>{
                console.log(error, " occured when trying to get user account data!")
            });
        }
    },[user]);

    function SignIn(){
        const signInWithGoogle = () => {
          const provider = new firebase.firebase.auth.GoogleAuthProvider();
          firebase.auth.signInWithPopup(provider);
        }
      
        return !firebase.auth.currentUser && (
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
                    <div className="rounded flex-fill p-2 m-1" style={{backgroundColor:"white"}}>
                        <p className="block-quote m-0">{"Search placeholder"}</p>
                    </div>
                </div>
                <SignIn />
                {firebase.auth.currentUser &&
                <div className="d-flex flex-row-reverse align-items-center">
                    {userInfo &&
                    <Dropdown>
                        <Dropdown.Toggle as={UserInfoToggle}>
                            <div className="d-flex flex-row-reverse rounded align-items-center px-1 m-1" style={{backgroundColor:"white"}}>
                                <HiChevronDown style={{color:"Gray"}} />
                                <div className="pr-1">
                                    <img className="rounded-circle" height="50" src={userInfo.pfp_url} />
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
                            <Dropdown.Item className="text-danger" onClick={() => firebase.auth.signOut()}>
                                Sign Out
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown> 
                    }
                    <div className="rounded-circle p-2 m-1" style={{backgroundColor:"white"}}>
                        <FaBell size={"1.8em"} style={{color:"dimGray"}}/>
                    </div>
                    <div className="rounded-circle p-2 m-1" style={{backgroundColor:"white"}}>
                        <MdAddCircle size={"2em"} style={{color:"dimGray"}}/>
                    </div>
                </div>
                }   
            </div>
        </Navbar>
    )
}