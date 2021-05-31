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
    let userRef = firebase.firestore().collection("users").doc("QgZwKXU8YWZaClcGnIKjOC1Qj6g1");
    const [value, loading, error] = useDocumentDataOnce(userRef);

    // const [pfpUrl, setPfpUrl] = useState("");

    // useEffect(()=>{
    //     if (value){
    //         let pfpUrlPath = `users/${value.username}/${value.pfp_url}`;
    //         firebase.storage().ref(pfpUrlPath).getDownloadURL()
    //         .then((url)=>{
    //             setPfpUrl(url);
    //         })
    //         .catch((error)=>{
    //             console.log(error, "occurred at loading Profile picture url!");
    //         });
    //     }
    // },[value]);

    return (
        <>
        {value &&
        <Row className="justify-content-center">
            <Col sm={12} lg={3}>
                <HomeTopic />
            </Col>
            <Col sm={12} lg={6}>
                <HomeCreate author={value} />
                <HomePost />
            </Col>
            <Col sm={12} lg={3}>

            </Col>
        </Row>
        }
        </>
    )
}