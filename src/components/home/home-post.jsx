import React from "react";
import {v4 as uuid} from "uuid";

import Post from "../post";


export default function HomePost(p){
    return (
        <>
        {p.posts.length !== 0 &&
            (()=>{
                let fields = [];
                let limit = 100;
                let count = 0;
                for (let post in p.posts){
                    fields.push(<Post info={p.posts[post]} author={{}} key={uuid()} />);
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