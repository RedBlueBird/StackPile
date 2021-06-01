import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {v4 as uuid} from "uuid";
import Moment from "react-moment";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";
import Card from "react-bootstrap/Card";

import {GiRainbowStar} from "react-icons/gi";
import {BsFillCaretUpFill, BsFillCaretDownFill} from "react-icons/bs";
import {AiFillTags} from "react-icons/ai";

import ReactMarkdown from "react-markdown";

export default function Post(p){
    const [author, setAuthor] = useState(p.author);

    useEffect(()=>{
        if (!p.author && p.info){
            p.info.author.get()
            .then((doc) => {
                if (doc.exists){
                    setAuthor(doc.data());
                }else{
                    console.log("The fetched post doc data does not exist!");
                }
            }).catch((error)=>{
                console.log(error, " happened when trying to fetch a post's author!");
            });
        }
    },[p.info]);

    return (
        <>
        {author &&
        <Card className="shadow mt-3 flex-row">
            <Card.Header className="border-0 px-1 d-flex flex-column align-items-center">
                <BsFillCaretUpFill size={"1.4em"} style={{color:"DimGray", cursor:"pointer"}}/>
                    <h6 className="m-0">{p.info.upvote-p.info.downvote}</h6>
                <BsFillCaretDownFill size={"1.4em"} style={{color:"DimGray", cursor:"pointer"}}/>
            </Card.Header>
            <div className="flex-row ml-2 my-2">
                <Link to={`/user/${author.username}`}>
                    <img className="rounded-circle" src={author.pfp_url} alt="" style={{width:"2.5em", height:"2.5em"}} />
                </Link>
            </div>
            <Col>
                <Row className="justify-content-between px-2 pt-2 pb-1">
                    <Row className="align-items-center ml-0">
                        <Link to={`/user/${author.username}`}>
                            <Badge variant="primary" className="px-2 py-1">{author.username}</Badge>
                        </Link>
                        <Badge pill className="d-flex justify-content-between align-items-center">
                            <p className="m-0 pr-1"><GiRainbowStar style={{color:"Gray"}}/></p>
                            <p className="m-0">{author.clout}</p>
                        </Badge>
                    </Row>
                    <div className="text-muted my-1" style={{fontSize:"0.8em"}}>
                        <Moment date={p.info.created_at.toDate()} fromNow/>
                    </div>
                </Row>
                <Row className="pb-2">
                    <Col className="pl-2">
                        <ReactMarkdown>
                            {p.info.message}
                        </ReactMarkdown>
                        {/* {p.info.source.length && 
                            <Card.Text className="mb-0">
                                <AiOutlineLink />{" "}
                                {(()=>{
                                    let badges = [];
                                    for (let link in p.info.source){
                                        badges.push(<Badge pill variant="info" key={uuid()}>{(new URL(p.info.source[link])).hostname}</Badge>);
                                        badges.push(" ");
                                    }
                                    return (<>{badges}</>);
                                })()}
                            </Card.Text>
                        } */}
                        <Card.Text>
                            <AiFillTags />{" "}
                            {(()=>{
                                let badges = [];
                                for (let tag in p.info.tag){
                                    badges.push(<Badge pill className="mr-1" variant="info" key={uuid()}>{p.info.tag[tag]["topic"]}</Badge>);
                                }
                                return (<>{badges}</>);
                            })()}
                        </Card.Text>
                    </Col>
                </Row>
            
            </Col>
            
        </Card>
        
        }
        </>
    );
}