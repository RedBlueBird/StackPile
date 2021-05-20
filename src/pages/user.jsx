import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import {useDocumentDataOnce} from "react-firebase-hooks/firestore";
import firebase from "../modules/firebase";

import UserBio from "../components/user/user-bio";
import UserDetail from "../components/user/user-detail";
import UserStat from "../components/user/user-stat";
import UserCalendar from "../components/user/user-calendar";

export default function User(){
    // const {userid} = useParams();
    // let userRef = firebase.firestore.collection("users").doc(userid);
    // const [value, loading, error] = useDocumentDataOnce(userRef);

    // useEffect(()=>{
    //     console.log(value);
    // },[value]);

    return (
        <Row className="justify-content-center">
            <Col sm={8} lg={4}>
                <UserBio />
                <UserDetail />
                <UserStat />
            </Col>
            <Col sm={12} lg={7}>
                <UserCalendar />
            </Col>
        </Row>
    )
}