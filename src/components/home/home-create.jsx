import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import Card from "react-bootstrap/Card";
import InputGroup from "react-bootstrap/InputGroup";

import {AiOutlineLink, AiFillTags, AiOutlineSend} from "react-icons/ai";
import {IoMdSend} from "react-icons/io";
import {GiCurlyWing} from "react-icons/gi";

import pfp_placeholder from "../../images/pfp-placeholder.png";

import Create from "../create";

export default function HomeCreate(p){
    const [showCreate, setShowCreate] = useState(false);

    const handleShowCreate = () => setShowCreate(true);
    const handleHideCreate = () => setShowCreate(false);

    return (
        <Card className="shadow my-2">
            <Card.Body className="p-3">
                <div className="d-flex align-items-center">
                    <Link to={`/user/${p.author.username}`}>
                        <img className="rounded-circle mr-2" src={pfp_placeholder} alt="logo placeholder" style={{width:"2.5em", height:"2.5em"}}/>
                    </Link>
                    <div onClick={handleShowCreate}>
                        <InputGroup>
                            <div className="form-control text-muted">Got anything to humble flex with?</div>
                            <InputGroup.Append>
                                <span className="btn btn-outline-info border"><AiOutlineLink/></span>
                                <span className="btn btn-outline-info border"><AiFillTags /></span>
                                <span className="btn btn-outline-info border"><GiCurlyWing /></span>
                            </InputGroup.Append>
                        </InputGroup>
                    </div>
                    <Create show={showCreate} handleShow={handleShowCreate} handleHide={handleHideCreate} author={p.author} />
                </div>
            </Card.Body>
        </Card>
    );
}