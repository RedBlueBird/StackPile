import React, {useState} from "react";
import {Link} from "react-router-dom";
import Card from "react-bootstrap/Card";
import InputGroup from "react-bootstrap/InputGroup";

import {AiFillTags} from "react-icons/ai";
import {GiCurlyWing} from "react-icons/gi";

import Create from "../create";

export default function HomeCreate(p){
    const [showCreate, setShowCreate] = useState(false);

    const handleShowCreate = () => setShowCreate(true);
    const handleHideCreate = () => setShowCreate(false);

    return (
      <>
      {p.author && 
      <>
        <Card className="shadow my-2">
            <Card.Body className="p-3">
                <div className="d-flex align-items-center">
                    <Link to={`/user/${p.author.username}`}>
                        <img className="rounded-circle mr-2" src={p.author.pfp_url} alt="" style={{width:"2.5em", height:"2.5em"}}/>
                    </Link>
                    <div onClick={handleShowCreate} className="flex-fill" >
                        <InputGroup>
                            <div className="form-control text-muted">Got anything to humble flex with?</div>
                            <InputGroup.Append>
                                {/* <span className="btn btn-outline-info border"><AiOutlineLink/></span> */}
                                <span className="btn btn-outline-info border"><AiFillTags /></span>
                                <span className="btn btn-outline-info border"><GiCurlyWing /></span>
                            </InputGroup.Append>
                        </InputGroup>
                    </div>
                </div>
            </Card.Body>
        </Card>
        <Create show={showCreate} handleShow={handleShowCreate} handleHide={handleHideCreate} author={p.author} />
      </>
      }
      </>
    );
}