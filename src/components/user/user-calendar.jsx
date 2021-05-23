import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import DateFormat from "dateformat";
import ReactTooltip from "react-tooltip";
import Card from "react-bootstrap/Card";

import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import "../../style.css";

export default function UserCalendar(p){
    const [dates, setDates] = useState([]);

    let startDate = new Date();
    startDate.setFullYear(startDate.getFullYear()-1);
    let endDate = new Date();

    useEffect(()=>{
        if (p.info.length > 0){
            (async () => {
                let collect = [{date:new Date("1000-01-01"), count:1}];
                for (let i in p.info){
                    if (p.info[i].created_at.toDate().getFullYear() == collect[collect.length-1].date.getFullYear() &&
                        p.info[i].created_at.toDate().getMonth() == collect[collect.length-1].date.getMonth() &&
                        p.info[i].created_at.toDate().getDate() == collect[collect.length-1].date.getDate()){
                        collect[collect.length-1].count++;
                    }else{
                        collect.push({date: p.info[i].created_at.toDate(), count:1});
                    }
                }
                setDates(collect);
            })();
        }
    },[p.info]);

    return (
        <>
        {dates.length > 0 &&
        <Card className="shadow my-2">
            <Card.Header>
                <h6 className="m-0">{dates.length-1} post{dates.length != 2 ? "s":""} in the past year</h6>
            </Card.Header>
            <Card.Body>
                <CalendarHeatmap 
                    startDate={startDate}
                    endDate={endDate}
                    // showWeekdayLabels={true}
                    // weekdayLabels={["","M","","W","","F",""]}
                    values={dates}
                    classForValue={(value)=>{
                        if (!value){
                            return "color-empty";
                        }
                        return `color-scale-${Math.min(value.count,4)}`;
                    }}
                    tooltipDataAttrs={(value)=>{
                        return {
                            "data-tip": `${value.count ? value.count : 0} post${value.count != 1 ? "s":""} on ${DateFormat(value.date,"longDate")}`
                        }
                    }}
                />
                <ReactTooltip />
            </Card.Body>
        </Card>
        }
        </>
    );
}