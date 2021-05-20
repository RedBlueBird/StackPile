import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";

import {RiEditBoxLine} from "react-icons/ri";
import {FaTransgender, FaBook} from "react-icons/fa";
import {MdLocationOn, MdSchool, MdCake} from "react-icons/md";

export default function UserDetail(){
    return (
        <Card className="shadow my-2">
            <Card.Header>
                <div className="d-flex justify-content-between align-items-center">
                    <h6 className="m-0">Detail</h6>
                    <RiEditBoxLine size={"1.2em"} style={{color:"Gray"}} />
                </div>
            </Card.Header>
            <Card.Body>
                <div className="d-flex justify-content-between align-items-center">
                    <p className="m-0">
                        <FaBook style={{color:"Gray"}}/> Created At
                    </p>
                    <Badge pill variant="secondary">{"2021-05-17"}</Badge>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                    <p className="m-0">
                        <MdCake style={{color:"Gray"}}/> Birthday
                    </p>
                    <Badge pill variant="secondary">{"2021-05-17"}</Badge>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                    <p className="m-0">
                        <FaTransgender style={{color:"Gray"}}/> Gender
                    </p>
                    <Badge pill variant="secondary">{"M"}</Badge>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                    <p className="m-0">
                        <MdLocationOn style={{color:"Gray"}}/> Location
                    </p>
                    <Badge pill variant="secondary">{"US CA"}</Badge>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                    <p className="m-0">
                        <MdSchool style={{color:"Gray"}}/> School
                    </p>
                    <Badge pill variant="secondary">{"MSJHS"}</Badge>
                </div>
            </Card.Body>
        </Card>
    );
}