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
    const [userRef] = useDocumentDataOnce(firebase.firestore().collection("usernames").doc(userid));
    const [value, setValue] = useState();
    const [dates, setDates] = useState([]);

    useEffect(()=>{
        if (userRef){
            userRef.user_ref.get()
            .then((doc)=>{
                if (doc.exists){
                    setValue(doc.data());
                }else{
                    console.log("No user exists");
                }
            }).catch((error)=>{
                console.log(error, " occurred when tyring to load a user profile page");
            });
        }
    },[userRef]);

    useEffect(() => {
        (async () => {
            let collect;
            if (value){
                collect = await Promise.all(value.post.map(ref => {
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
    },[value]);

    return (
        <>
        {(()=>{
            if (value){
                return (
                    <Row className="justify-content-center">
                        <Col sm={8} lg={4}>
                            <UserBio info={value} />
                            <UserDetail info={value.detail} uid={value.uid} />
                            <UserStat />
                        </Col>
                        <Col sm={12} lg={7}>
                            <UserCalendar info={dates}/>
                            <UserPost info={dates} author={value} />
                        </Col>
                    </Row>
                );
            }
        })()}
        </>
    );
}