import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import {useDocumentDataOnce} from "react-firebase-hooks/firestore";
import firebase from "../modules/firebase";

import HomeTopic from "../components/home/home-topic";
import HomeCreate from "../components/home/home-create";
import HomePost from "../components/home/home-post";

export default function User(){
    // const {userid} = useParams();
    // let userRef = firebase.firestore.collection("users").doc(userid);
    // const [value, loading, error] = useDocumentDataOnce(userRef);

    // useEffect(()=>{
    //     console.log(value);
    // },[value]);

    return (
        <Row className="justify-content-center">
            <Col sm={12} lg={3}>
                <HomeTopic />
            </Col>
            <Col sm={12} lg={6}>
                <HomeCreate />
                <HomePost />
            </Col>
            <Col sm={12} lg={3}>

            </Col>
        </Row>
    )
}