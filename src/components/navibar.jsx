import React from "react";
import {Link} from "react-router-dom";
import Col from "react-bootstrap/Col";
import Navbar from "react-bootstrap/Navbar";
import Badge from "react-bootstrap/Badge";

import {GiRainbowStar} from "react-icons/gi";
import {FaBell} from "react-icons/fa";
import {MdAddCircle} from "react-icons/md";
import {SiReddit} from "react-icons/si";

import pfp_placeholder from "../images/pfp-placeholder.png";

export default function Navibar(){
    return (
        <Navbar bg="light" sticky="top" className="d-flex justify-content-center p-0">
            <div className="d-flex justify-content-between align-items-center" style={{width:"95%"}}>
                <div className="d-flex flex-row align-items-center">
                    <Navbar.Brand>
                        <Link to="/">
                            <SiReddit size={"2em"} style={{color:"#FF5700"}}/>
                            {/* <img height="50" src={logo_placeholder} alt="logo placeholder"/> */}
                        </Link>
                    </Navbar.Brand>
                    <div className="rounded flex-fill p-2 m-1" style={{backgroundColor:"white"}}>
                        <p className="block-quote m-0">{"Search placeholder"}</p>
                    </div>
                </div>
                <div className="d-flex flex-row-reverse align-items-center">
                    <div className="d-flex flex-row-reverse rounded px-1 m-1" style={{backgroundColor:"white"}}>
                        <div className="pr-1">
                            <Link to={"/user/admin"}>
                                <img className="rounded-circle" height="50" src={pfp_placeholder} alt="logo placeholder"/>
                            </Link>
                        </div>
                        <Col className="px-2">
                            <Badge variant="primary" className="m-0 mb-1 px-2 py-1">{"BlueBirdy"}</Badge>
                            <Badge pill className="d-flex justify-content-between align-items-center">
                                <p className="m-0"><GiRainbowStar style={{color:"Gray"}}/></p>
                                <p className="m-0">{10}</p>
                            </Badge>
                        </Col>
                    </div>
                    <div className="rounded-circle p-2 m-1" style={{backgroundColor:"white"}}>
                        <FaBell size={"1.8em"} style={{color:"dimGray"}}/>
                    </div>
                    <div className="rounded-circle p-2 m-1" style={{backgroundColor:"white"}}>
                        <MdAddCircle size={"2em"} style={{color:"dimGray"}}/>
                    </div>
                </div>
            </div>
        </Navbar>
    )
}