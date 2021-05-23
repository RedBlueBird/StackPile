import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {v4 as uuid} from "uuid";
import Card from "react-bootstrap/Card";

import Post from "../post";

export default function UserPost(p){

    useEffect(()=>{
        console.log(p.author);
        console.log(p.info);
    },[p]);

    return (
        <>
        <Card className="shadow mt-3">
            <Card.Header>
                <h6 className="m-0">Recent Posts</h6>
            </Card.Header>
        </Card>
        {p.info.length == 0 &&
            <Card className="shadow mt-2">
                <Card.Body>
                    <p className="m-0">Such empty...</p>
                </Card.Body>
            </Card>
        }
        {p.info.length != 0 &&
            (()=>{
                let fields = [];
                let limit = 10;
                let count = 0;
                for (let post in p.info){
                    fields.push(<Post info={p.info[post]} author={p.author} key={uuid()} />);
                    count++;
                    if (count == limit){
                        break;
                    }
                }
                return (<>{fields}</>);
            })()
        }
        </>
    );
}