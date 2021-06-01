import React, {useEffect, useState} from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import firebase from "../modules/firebase";

import HomeTopic from "../components/home/home-topic";
import HomeCreate from "../components/home/home-create";
import HomePost from "../components/home/home-post";

export default function User(){
    const [user, setUser] = useState({});
    const [posts, setPosts] = useState([]);

    useEffect(()=>{
        (async ()=>{
            let snapshot = await firebase.firestore().collection("posts").get();
            let collect = snapshot.docs.map(doc => doc.data());
            collect.sort((a,b)=>b.created_at.toDate()-a.created_at.toDate());
            setPosts(collect);
        })();
    },[]);

    useEffect(()=>{
        if (firebase.auth().currentUser){
            firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid).get()
            .then((doc) => {
                setUser(doc.data());
            }).catch((error)=>{
                console.log(error, " happened when trying to get current logged in user!");
            });
        }
    },[firebase.auth().currentUser]);

    return (
        <>
        {user &&
        <Row className="justify-content-center">
            <Col sm={12} lg={3}>
                <HomeTopic />
            </Col>
            <Col sm={12} lg={6}>
                <HomeCreate author={user} />
                <HomePost posts={posts} />
            </Col>
            <Col sm={12} lg={3}>

            </Col>
        </Row>
        }
        </>
    )
}