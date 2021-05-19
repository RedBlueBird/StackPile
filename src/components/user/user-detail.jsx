import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {RiEditBoxLine} from "react-icons/ri";
import {FaTransgender, FaBook} from "react-icons/fa";
import {MdLocationOn, MdSchool, MdCake} from "react-icons/md";

export default function UserDetail(){
    return (
        <div className="card shadow my-2">
            <div className="card-header">
                <div className="d-flex justify-content-between align-items-center">
                    <h6 className="m-0">Detail</h6>
                    <RiEditBoxLine size={"1.2em"} style={{color:"Gray"}} />
                </div>
            </div>
            <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                    <p className="m-0">
                        <FaBook style={{color:"Gray"}}/> Created At
                    </p>
                    <span className="badge badge-pill badge-secondary">{"2021-05-17"}</span>    
                </div>
                <div className="d-flex justify-content-between align-items-center">
                    <p className="m-0">
                        <MdCake style={{color:"Gray"}}/> Birthday
                    </p>
                    <span className="badge badge-pill badge-secondary">{"2021-05-17"}</span>    
                </div>
                <div className="d-flex justify-content-between align-items-center">
                    <p className="m-0">
                        <FaTransgender style={{color:"Gray"}}/> Gender
                    </p>
                    <span className="badge badge-pill badge-secondary">{"M"}</span>    
                </div>
                <div className="d-flex justify-content-between align-items-center">
                    <p className="m-0">
                        <MdLocationOn style={{color:"Gray"}}/> Location
                    </p>
                    <span className="badge badge-pill badge-secondary">{"US CA"}</span>    
                </div>
                <div className="d-flex justify-content-between align-items-center">
                    <p className="m-0">
                        <MdSchool style={{color:"Gray"}}/> School
                    </p>
                    <span className="badge badge-pill badge-secondary">{"MSJHS"}</span>    
                </div>
            </div>
        </div>
        
        
    );
}