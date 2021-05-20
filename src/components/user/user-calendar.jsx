import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import Card from "react-bootstrap/Card";

import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";

export default function UserCalendar(){
    let startDate = new Date();
    startDate.setFullYear(startDate.getFullYear()-1);
    let endDate = new Date();

    return (
        <Card className="shadow my-2">
            <Card.Header>
                <h6 className="m-0">{0} posts in the past year</h6>
            </Card.Header>
            <Card.Body>
                <CalendarHeatmap 
                    startDate={startDate}
                    endDate={endDate}
                    values={[]}/>
            </Card.Body>
        </Card>
    );
}