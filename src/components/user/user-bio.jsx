import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";

import {GiRainbowStar} from "react-icons/gi";
import {BsPersonLinesFill, BsPeopleFill} from "react-icons/bs";
import {FaGithub, FaGoogle} from "react-icons/fa";
import {RiEditBoxLine} from "react-icons/ri";

import pfp_placeholder from "../../images/pfp-placeholder.png";

export default function UserBio(){
    return (
        <Card className="shadow my-2">
            <Card.Header>
                <div className="d-flex justify-content-between align-items-center">
                    <h6 className="m-0">Profile</h6>
                    <RiEditBoxLine size={"1.2em"} style={{color:"Gray"}} />
                </div>
            </Card.Header>
            <Card.Body>
                <Row>
                    <Col xs={4}>
                        <img className="rounded-circle" src={pfp_placeholder} alt="profile picture placeholder" 
                            style={{width: "100%", height: "auto"}}/>
                    </Col>
                    <Col xs={8}>
                        <h4>{"BlueBirdy"}</h4>
                        <div className="d-flex justify-content-between align-items-center">
                            <p className="m-0">
                                <GiRainbowStar style={{color:"Gray"}}/> Clout
                            </p>
                            <Badge pill variant="info">{10}</Badge>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                            <p className="m-0">
                                <BsPersonLinesFill style={{color:"Gray"}}/> Following
                            </p>
                            <Badge pill variant="info">{3}</Badge>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                            <p className="m-0">
                                <BsPeopleFill style={{color:"Gray"}}/> Followers
                            </p>
                            <Badge pill variant="info">{472}</Badge>
                        </div>
                    </Col>
                </Row>
                <div className="px-2 my-2">
                    <FaGithub size={"1.8em"} style={{color:"DimGray"}}/>
                    <FaGoogle size={"1.8em"} style={{color:"DimGray"}}/>
                </div>
                <div>
                    <p>
                        {"This user left a blank bio!"}
                    </p>
                </div>
                <Button variant="primary" block>
                    {"Follow"}
                </Button>
            </Card.Body>
        </Card>
    );
}