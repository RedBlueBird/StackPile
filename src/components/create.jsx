import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {v4 as uuid} from "uuid";
import Moment from "react-moment";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import {GiRainbowStar} from "react-icons/gi";
import {BsFillCaretUpFill, BsFillCaretDownFill} from "react-icons/bs";
import {AiOutlineLink, AiFillTags} from "react-icons/ai";

export default function Post(p){
    const [show, setShow] = useState(false);
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Create Post</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Button variant="secondary" onClick={handleClose}>
                    Discard
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    Post
                </Button>
            </Modal.Body>
        </Modal>
    );
}