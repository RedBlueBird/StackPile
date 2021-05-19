import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {useDocumentDataOnce} from "react-firebase-hooks/firestore";

import firebase from "../modules/firebase";

export default function User(){
    // const {userid} = useParams();
    // let userRef = firebase.firestore.collection("users").doc(userid);
    // const [value, loading, error] = useDocumentDataOnce(userRef);

    // useEffect(()=>{
    //     console.log(value);
    // },[value]);

    return (
        <div className="row justify-content-center">
            <div className="col-sm-12 col-lg-3">
            </div>
            <div className="col-sm-12 col-lg-6">
            </div>
            <div className="col-sm-12 col-lg-3">
            </div>
        </div>
    )
}