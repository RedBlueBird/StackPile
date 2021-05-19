import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";

import {Radar} from "react-chartjs-2";

export default function UserStat(){
    const data = {
        labels: ["Physics", "Mathematics", "Chemistry", "Biology", "Informatics"],
        datasets: [{
            label: "Fields of Interest",
            data: [60, 40, 10, 0, 80],
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgb(54, 162, 235)',
            pointBackgroundColor: 'rgb(54, 162, 235)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(54, 162, 235)'
        }]
    };
    const options = {
        elements: {
            line: {
                tension: 0.2
            }
        },
        scale: {
            r: {
                suggestedMin: 0,
                suggestedMax: 100
            }
        }
    }

    return (
        <div className="card shadow my-2">
            <div className="card-header">
                <h6 className="m-0">Statistics</h6>
            </div>
            <div className="card-body">
                <Radar data={data} options={options} />
            </div>
        </div>
    );
}