import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import DateFormat from "dateformat";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";

import firebase from "../../modules/firebase";

import {AiOutlineEdit} from "react-icons/ai";
import {BsBoxArrowUpRight, BsInfoCircle} from "react-icons/bs";
import {FaTransgender, FaBook} from "react-icons/fa";
import {MdLocationOn, MdSchool, MdCake} from "react-icons/md";

import Select from "react-select";
import DatePicker from "react-datepicker";
import detail from "../../modules/detail";
import 'react-datepicker/dist/react-datepicker.css';

export default function UserDetail(p){
    const [mode, setMode] = useState("display");
    const [birthday, setBirthday] = useState(p.info["birthday"] ? p.info["birthday"].toDate() : "");
    const [gender, setGender] = useState(p.info["gender"]);
    const [location, setLocation] = useState(p.info["location"]);
    const [education, setEducation] = useState(p.info["education"]);

    function detailUpdate(){
        firebase.firestore().collection("users").doc(p.uid).set({
            detail: {created_at: p.info["created_at"],
                     birthday, gender, location, education}
        },{merge: true})
        .then(() => {
            setMode("display");
        })
        .catch((error)=>{
            console.log(error, " happened when trying to edit User Detail!");
        });
    }  

    return (
        <>
        {mode == "display" &&
        <Card className="shadow my-2">
            <Card.Header>
                <div className="d-flex justify-content-between align-items-center">
                    <h6 className="m-0">Detail</h6>
                    {firebase.auth().currentUser && firebase.auth().currentUser.uid == p.uid &&
                        <AiOutlineEdit size={"1.2em"} style={{color:"Gray", cursor: "pointer"}} onClick={()=>setMode("edit")} />
                    }
                </div>
            </Card.Header>
            <Card.Body>
                <div className="d-flex justify-content-between align-items-center">
                    <p className="m-0">
                        <FaBook style={{color:"Gray"}}/> Created At
                    </p>
                    <Badge pill variant="secondary">
                        {DateFormat(p.info["created_at"].toDate(), "longDate")}
                    </Badge>
                </div>
                {birthday &&
                    <div className="d-flex justify-content-between align-items-center">
                        <p className="m-0">
                            <MdCake style={{color:"Gray"}}/> Birthday
                        </p>
                        <Badge pill variant="secondary">
                            {DateFormat(birthday, "longDate")}
                        </Badge>
                    </div> 
                }
                {gender &&
                    <div className="d-flex justify-content-between align-items-center">
                        <p className="m-0">
                            <FaTransgender style={{color:"Gray"}}/> Gender
                        </p>
                        <Badge pill variant="secondary">{gender}</Badge>
                    </div>
                }
                {location && 
                    <div className="d-flex justify-content-between align-items-center">
                        <p className="m-0">
                            <MdLocationOn style={{color:"Gray"}}/> Location
                        </p>
                        <Badge pill variant="secondary">{location}</Badge>
                    </div>
                }
                {education && 
                    <div className="d-flex justify-content-between align-items-center">
                        <p className="m-0">
                            <MdSchool style={{color:"Gray"}}/> Education
                        </p>
                        <Badge pill variant="secondary">{education}</Badge>
                    </div>
                }
            </Card.Body>
        </Card>
        }
        {mode == "edit" &&
        <Card className="shadow my-2">
            <Card.Header>
                <div className="d-flex justify-content-between align-items-center">
                    <h6 className="m-0">Detail</h6>
                    <BsBoxArrowUpRight size={"1.2em"} style={{color:"Gray", cursor: "pointer"}} onClick={()=>setMode("display")} />
                </div>
            </Card.Header>
            <Card.Body>
                {/* <div className="p-1 alert alert-info border border-info d-flex align-items-center">
                    <BsInfoCircle className="m-1" />
                    Leave fields blank to hide!
                </div> */}
                <div className="d-flex justify-content-between align-items-center">
                    <p className="m-0">
                        <FaBook style={{color:"Gray"}}/> Created At
                    </p>
                    <input className="form-control" type="text" placeholder={DateFormat(p.info["created_at"].toDate(), "longDate")} style={{width:"10em"}} readOnly />
                </div>
                <div className="d-flex justify-content-between align-items-center mt-2">
                    <p className="m-0">
                        <MdCake style={{color:"Gray"}}/> Birthday
                    </p>
                    <div style={{width:"10.8em"}}>
                        <DatePicker selected={birthday} onChange={date => setBirthday(date)} />
                    </div>
                </div> 
                <div className="d-flex justify-content-between align-items-center mt-2">
                    <p className="m-0">
                        <FaTransgender style={{color:"Gray"}}/> Gender
                    </p>
                    <div style={{width:"10em"}}>
                        <Select options={detail.gender} isClearable={true} defaultInputValue={gender} onChange={e => setGender(e ? e.value : "")} />
                    </div>
                </div>
                <div className="d-flex justify-content-between align-items-center mt-2">
                    <p className="m-0">
                        <MdLocationOn style={{color:"Gray"}}/> Location
                    </p>
                    <div style={{width:"10em"}}>
                        <Select options={detail.country} isClearable={true} defaultInputValue={location} onChange={e => setLocation(e ? e.value : "")} />
                    </div>
                </div>
                <div className="d-flex justify-content-between align-items-center mt-2">
                    <p className="m-0">
                        <MdSchool style={{color:"Gray"}}/> Education
                    </p>
                    <div style={{width:"10em"}}>
                        <Select options={detail.education} isClearable={true} defaultInputValue={education} onChange={e => setEducation(e ? e.value : "")} />
                    </div>
                </div>
                <div className="d-flex justify-content-around align-items-center mt-2">
                    <Button variant="info" onClick={()=>detailUpdate()}>
                        Confirm
                    </Button>
                    <Button variant="outline-secondary" onClick={()=>setMode("display")}>
                        Cancel
                    </Button>
                </div>
            </Card.Body>
        </Card>  
        }
        </>
    );
}