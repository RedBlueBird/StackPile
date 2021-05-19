import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";

import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";

export default function UserCalendar(){
    let startDate = new Date();
    startDate.setFullYear(startDate.getFullYear()-1);
    let endDate = new Date();

    return (
        <div className="card shadow my-2">
            <div className="card-header">
                <h6 className="m-0">{0} posts in the past year</h6>
            </div>
            <div className="card-body">
                <CalendarHeatmap 
                    startDate={startDate}
                    endDate={endDate}
                    values={[]}/>
            </div>
        </div>
        
        
    );
}