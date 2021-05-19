import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {GiRainbowStar} from "react-icons/gi";
import {BsPersonLinesFill, BsPeopleFill} from "react-icons/bs";
import {FaGithub, FaGoogle} from "react-icons/fa";
import {RiEditBoxLine} from "react-icons/ri";

import pfp_placeholder from "../../images/pfp-placeholder.png";

export default function UserBio(){
    return (
        <div className="card shadow my-2">
            <div className="card-header">
                <div className="d-flex justify-content-between align-items-center">
                    <h6 className="m-0">Profile</h6>
                    <RiEditBoxLine size={"1.2em"} style={{color:"Gray"}} />
                </div>
            </div>
            <div className="card-body">
                <div className="row">
                    <div className="col-4">
                        <img className="rounded-circle" src={pfp_placeholder} alt="profile picture placeholder" 
                            style={{width: "100%", height: "auto"}}/>
                    </div>
                    <div className="col-8">
                        <h4>{"BlueBirdy"}</h4>
                        <div className="d-flex justify-content-between align-items-center">
                            <p className="m-0">
                                <GiRainbowStar style={{color:"Gray"}}/> Clout
                            </p>
                            <span className="badge badge-pill badge-info">{10}</span>    
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                            <p className="m-0">
                                <BsPersonLinesFill style={{color:"Gray"}}/> Following
                            </p>
                            <span className="badge badge-pill badge-info">{3}</span>    
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                            <p className="m-0">
                                <BsPeopleFill style={{color:"Gray"}}/> Followers
                            </p>
                            <span className="badge badge-pill badge-info">{472}</span>    
                        </div>
                    </div>
                </div>
                <div className="px-2 my-2">
                    <FaGithub size={"1.8em"} style={{color:"DimGray"}}/>
                    <FaGoogle size={"1.8em"} style={{color:"DimGray"}}/>
                </div>
                <div>
                    <p>
                        {"This user left a blank bio!"}
                    </p>
                </div>
                <button type="button" class="btn btn-primary btn-block">{"Follow"}</button>
            </div>
        </div>
    );
}