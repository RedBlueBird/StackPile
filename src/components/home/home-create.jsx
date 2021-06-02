import React, {useEffect, useState} from "react";
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

    const createPrompts = [
        "Got anything to humble flex with today?",
        "Can blind people see their dreams?",
        "If roses are red, why are violets blue?",
        "What if everyone jumped at once?",
        "How high can we build?",
        "Where's the most dangerous place on earth?",
        "Does numbers beyond infinity exist?",
        "Can a computer keep the same data forever?",
        "How old can we get?",
        "What is the Earth worth?",
        "What is the greatest honor?",
        "How to create secure passwords?",
        "How much does the internet weigh?",
        "What is the resolution of our eyes?",
        "Can the chicken fly over the road?",
        "Can plants ever replace meat?"
    ];
    const [prompt, setPrompt] = useState("");
    useEffect(()=>{
        setPrompt(createPrompts[Math.floor(Math.random() * createPrompts.length)]);
    },[]);

    return (
      <>
      {Object.keys(p.author).length != 0 && 
      <>
        <Card className="shadow my-2">
            <Card.Body className="p-3">
                <div className="d-flex align-items-center">
                    <Link to={`/user/${p.author.username}`}>
                        <img className="rounded-circle mr-2" src={p.author.pfp_url} alt="" style={{width:"2.5em", height:"2.5em"}}/>
                    </Link>
                    <div onClick={handleShowCreate} className="flex-fill" >
                        <InputGroup>
                            <div className="form-control text-muted">{prompt}</div>
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