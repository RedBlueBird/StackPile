import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import {useDocumentDataOnce} from "react-firebase-hooks/firestore";
import firebase from "../modules/firebase";

import UserBio from "../components/user/user-bio";
import UserDetail from "../components/user/user-detail";
import UserStat from "../components/user/user-stat";
import UserCalendar from "../components/user/user-calendar";
import UserPost from "../components/user/user-post";

export default function User(){
    const {userid} = useParams();
    const [authorRef] = useDocumentDataOnce(firebase.firestore().collection("usernames").doc(userid));
    const [author, setAuthor] = useState();
    const [user, setUser] = useState();
    const [dates, setDates] = useState([]);

    useEffect(()=>{
        if (authorRef){
            authorRef.user_ref.get()
            .then((doc)=>{
                if (doc.exists){
                    setAuthor(doc.data());
                }else{
                    console.log("No user exists");
                }
            }).catch((error)=>{
                console.log(error, " occurred when trying to load a user profile page");
            });
        }
    },[authorRef]);

    useEffect(()=>{
        if (firebase.auth().currentUser && author){
            if (firebase.auth().currentUser.uid === author.uid){
                setUser(author);
            }
            firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid).get()
            .then((doc)=>{
                if (doc.exists){
                    setUser(doc.data());
                }else{
                    console.log("User is not signed in!");
                }
            }).catch((error)=>{
                console.log(error, " occurred when trying to get current user's doc data!");
            });
        }
    }, [author, firebase.auth().currentUser])

    useEffect(() => {
        (async () => {
            let collect;
            if (author){
                collect = await Promise.all(author.post.map(ref => {
                    let res = ref.get()
                    .then((doc) => {
                        if (doc.exists){
                            return doc.data();
                        }else{
                            console.log("No doc exist!");
                        }
                    }).catch((error)=>{
                        console.log(error, " occurred at loading User posts!");
                    });
                    if (res){
                        return res;
                    }
                }));
                collect.sort((a,b)=>b.created_at.toDate()-a.created_at.toDate());
            }else{
                collect = [];
            }
            setDates(collect);
        })();
    },[author]);

    return (
        <>
        {author && user &&
            <Row className="justify-content-center">
                <Col sm={8} lg={4}>
                    <UserBio author={author} />
                    <UserDetail info={author.detail} uid={author.uid} />
                    <UserStat />
                </Col>
                <Col sm={12} lg={7}>
                    <UserCalendar info={dates}/>
                    <UserPost info={dates} author={author} user={user} />
                </Col>
            </Row>
        }
        </>
    );
}