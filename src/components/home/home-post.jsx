import React, {useEffect, useState} from "react";
import {v4 as uuid} from "uuid";

import firebase from "../../modules/firebase";

import Post from "../post";


export default function HomePost(p){
    const [upvoted, setUpvoted] = useState([]);
    const [downvoted, setDownvoted] = useState([]);

    useEffect(()=>{
        if (p.author){
            setUpvoted(p.author.upvoted_post);
            setDownvoted(p.author.downvoted_post);
        }
    },[p.author]);

    let isUpvoted = (postid, index=false) => {
        let ref = firebase.firestore().collection("posts").doc(postid);
        for (let i = 0; i < upvoted.length; i++){
            if (ref.isEqual(upvoted[i])){
                if (index){
                    return i;
                }
                return true;
            }
        }
        if (index){
            return -1;
        }
        return false;
    }

    let isDownvoted = (postid, index=false) => {
        let ref = firebase.firestore().collection("posts").doc(postid);
        for (let i = 0; i < downvoted.length; i++){
            if (ref.isEqual(downvoted[i])){
                if (index){
                    return i;
                }
                return true;
            }
        }
        if (index){
            return -1;
        }
        return false;
    }

    // useEffect(()=>{
    //     if (upvoted){
    //         firebase.firestore().collection("users").doc(p.author.uid).set({
    //             upvoted_post: upvoted,
    //         }, {merge: true})
    //         .then(()=>{
    //             console.log("Upvoted/downvoted a post successfully!");
    //         }).catch((error) =>{
    //             console.log(error, " happened, when trying to upvote/downvote a post!");
    //         });
    //     }
    //     if (downvoted){
    //         firebase.firestore().collection("users").doc(p.author.uid).set({
    //             downvoted_post: downvoted,
    //         }, {merge:true})
    //         .then(()=>{
    //             console.log("Upvoted/downvoted a post successfully!");
    //         }).catch((error) =>{
    //             console.log(error, " happened, when trying to upvote/downvote a post!");
    //         });
    //     }
    // },[upvoted, downvoted]);

    let upvote = (postid) => {
        let ref = firebase.firestore().collection("posts").doc(postid);
        if (!isUpvoted(postid)){
            setUpvoted([...upvoted, ref]);
        }
        let index = isDownvoted(postid, true);
        if (index != -1){
            let copy = downvoted;
            copy.splice(index, 1);
            setDownvoted(copy);
        }
    }

    let downvote = (postid) => {
        let ref = firebase.firestore().collection("posts").doc(postid);
        if (!isDownvoted(postid)){
            console.log(downvoted);
            setDownvoted([...downvoted, ref]);
        }
        let index = isUpvoted(postid, true);
        if (index != -1){
            let copy = upvoted;
            copy.splice(index, 1);
            setUpvoted(copy);
        }
    }

    return (
        <>
        {p.posts.length !== 0 && p.author && upvoted && downvoted && 
            (()=>{
                let fields = [];
                let limit = 100;
                let count = 0;
                for (let post in p.posts){
                    let isUpvotedNest = () => isUpvoted(p.posts[post].uid);
                    let isDownvotedNest = () => isDownvoted(p.posts[post].uid);
                    let upvoteNest = () => upvote(p.posts[post].uid);
                    let downvoteNest = () => downvote(p.posts[post].uid);
                    fields.push(
                    <Post
                        info={p.posts[post]}
                        author={{}}
                        userid={p.author.uid}
                        isUpvoted={isUpvotedNest}
                        isDownvoted={isDownvotedNest}
                        upvote={upvoteNest}
                        downvote={downvoteNest}
                        key={uuid()}
                    />);
                    count++;
                    if (count === limit){
                        break;
                    }
                }
                return (<>{fields}</>);
            })()
        }
        </>
    );
}