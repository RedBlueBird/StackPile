import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
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
        <div className="row justify-content-center">
            <div className="col-sm-8 col-lg-4">
                <UserBio />
                <UserDetail />
                <UserStat />
            </div>
            <div className="col-sm-12 col-lg-7">
                <UserCalendar />
            </div>
        </div>
    )
}