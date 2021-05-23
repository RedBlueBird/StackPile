import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import Card from "react-bootstrap/Card";
import InputGroup from "react-bootstrap/InputGroup";

import {AiOutlineLink, AiFillTags, AiOutlineSend} from "react-icons/ai";
import {IoMdSend} from "react-icons/io";
import {GiCurlyWing} from "react-icons/gi";

import pfp_placeholder from "../../images/pfp-placeholder.png";

export default function HomeCreate(){
    return (
        <Card className="shadow my-2">
            <Card.Body className="p-3">
                <div className="d-flex align-items-center">
                    <Link to="/user/admin">
                        <img className="rounded-circle mr-2" height="40" src={pfp_placeholder} alt="logo placeholder"/>
                    </Link>
                    <Link to="/home" className="flex-fill" style={{textDecoration:"none"}}> 
                        <InputGroup>
                            <div className="form-control text-muted">Got anything to humble flex with?</div>
                            <InputGroup.Append>
                                <span className="btn btn-outline-info border"><AiOutlineLink/></span>
                                <span className="btn btn-outline-info border"><AiFillTags /></span>
                                <span className="btn btn-outline-info border"><GiCurlyWing /></span>
                            </InputGroup.Append>
                        </InputGroup>
                    </Link>
                </div>
            </Card.Body>
        </Card>
    );
}