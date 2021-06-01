import React from "react";
import {v4 as uuid} from "uuid";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import ListGroup from "react-bootstrap/ListGroup";

export default function HomeTopic(){
    const tags = {informatics: ["Artificial Intelligence", "Web Development", "Cyber Security", "Competitive Programming"],
                  physics: ["Classical Mechanics", "Special Relativity", "Electricity & Magnetism", "Quantum Theory"],
                  mathematics: ["Statistics", "Calculus", "Graph Theory", "Proof", "Linear Algebra"],
                  chemistry: ["Thermochemistry", "Stoichiometry", "Atomic Theory", "Reaction Kinetics"],
                  biology: ["Genetic Engineering", "Ecology", "Zoology", "Astrobiology"],
                }

    return (
        <Card className="shadow my-2">
            <Card.Header>
                <h6 className="m-0">Topics</h6>
            </Card.Header>
            <Card.Body className="pt-0">
                <ListGroup>
                    <Accordion>
                        {(()=>{
                            let fields = [];
                            for (let field in tags){
                                fields.push(
                                <div key={uuid()}>
                                    <Accordion.Toggle as={ListGroup.Item} className="border-0 px-0 pb-0 pt-3" style={{cursor:"pointer"}} eventKey={field}>
                                        <div className="border-bottom px-3">
                                            {field[0].toUpperCase() + field.substring(1)}
                                        </div>
                                    </Accordion.Toggle>
                                    <Accordion.Collapse eventKey={field}>
                                        <ListGroup.Item className="border-0 pb-0 pt-2 pr-0">
                                            <div className="border-bottom px-3 pb-2">
                                                {tags[field].map((tag)=>
                                                    (<span key={uuid()}>
                                                        <Badge pill variant="info">{tag}</Badge>{" "}
                                                    </span>))}
                                            </div>
                                        </ListGroup.Item>
                                    </Accordion.Collapse>
                                </div>);
                            }
                            return (<>{fields}</>);
                        })()}
                    </Accordion>
                </ListGroup>
            </Card.Body>
        </Card>
    );
}