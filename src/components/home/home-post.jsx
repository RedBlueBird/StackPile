import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import Moment from "react-moment";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";
import Card from "react-bootstrap/Card";

import {GiRainbowStar} from "react-icons/gi";
import {BsFillCaretUpFill, BsFillCaretDownFill} from "react-icons/bs";
import {AiOutlineLink, AiFillTags} from "react-icons/ai";

import pfp_placeholder from "../../images/pfp-placeholder.png";

export default function HomePost(){
    const curr = new Date();

    return (
        <>
        <Card className="shadow mt-3 flex-row">
            <Card.Header className="border-0 px-1 d-flex flex-column align-items-center">
                <BsFillCaretUpFill size={"1.4em"} style={{color:"DimGray"}}/>
                    <h6 className="m-0">{"7.2K"}</h6>
                <BsFillCaretDownFill size={"1.4em"} style={{color:"DimGray"}}/>
            </Card.Header>
            <div className="flex-row ml-2 my-2">
                <Link to={"/user/admin"}>
                    <img className="rounded-circle" src={pfp_placeholder} alt="logo placeholder" style={{width:"2.5em", height:"2.5em"}}/>
                </Link>
            </div>
            <div className="col">
                <div className="row justify-content-between px-2 pt-2 pb-1">
                    <div className="row align-items-center ml-0">
                        <Badge variant="primary" className="px-2 py-1">{"BlueBirdy"}</Badge>
                        <Badge pill className="d-flex justify-content-between align-items-center">
                            <p className="m-0"><GiRainbowStar style={{color:"Gray"}}/></p>
                            <p className="m-0">{10}</p>
                        </Badge>
                    </div>
                    <div className="text-muted my-1" style={{fontSize:"0.8em"}}>
                        <Moment date={curr} fromNow/>
                    </div>
                </div>
                <div className="row pb-2">
                    <div className="col pl-2">
                        <Card.Text>
                            I felt like I am just straight copying reddit now.
                        </Card.Text>
                        <Card.Text className="mb-0">
                            <AiOutlineLink />{" "}
                            <Badge pill variant="info">{"stackpile.me"}</Badge>
                        </Card.Text>
                        <Card.Text>
                            <AiFillTags />{" "}
                            <Badge pill variant="info">{"Web Development"}</Badge>
                        </Card.Text>
                    </div>
                </div>
            </div>
                
        </Card>
        
        </>
    );
}