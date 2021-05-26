import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import {useDocumentDataOnce} from "react-firebase-hooks/firestore";
import firebase from "../modules/firebase";

import Navibar from "../components/navibar.jsx";
import UserBio from "../components/user/user-bio";
import UserDetail from "../components/user/user-detail";
import UserStat from "../components/user/user-stat";
import UserCalendar from "../components/user/user-calendar";
import UserPost from "../components/user/user-post";

export default function User(){
    const {userid} = useParams();
    let userRef = firebase.firestore.collection("users").doc(userid);
    const [value, loading, error] = useDocumentDataOnce(userRef);

    const [dates, setDates] = useState([]);

    useEffect(()=>{
        if (value){
            (async () => {
                let collect = await Promise.all(value.post.map(ref => {
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
                collect.sort((a,b)=>b-a);
                setDates(collect);
            })();
        }
    },[value]);

    return (
        <>
        {(()=>{
            if (value){
                return (
                    <Row className="justify-content-center">
                        <Col sm={8} lg={4}>
                            <UserBio info={value} />
                            <UserDetail info={value.detail} username={value.username} />
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