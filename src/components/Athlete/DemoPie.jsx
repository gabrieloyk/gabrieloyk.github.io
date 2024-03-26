import React from 'react';
import { Pie } from '@ant-design/plots';

export const DemoPie = ({stats, enableAnnotations}) => {
  const totalTime = stats.all_ride_totals.elapsed_time + stats.all_run_totals.elapsed_time + stats.all_swim_totals.elapsed_time
  const config = {
    data: [
      { type: 'Cycle', value: stats.all_ride_totals.distance, time: stats.all_ride_totals.elapsed_time },
      { type: 'Run', value: stats.all_run_totals.distance, time:stats.all_run_totals.elapsed_time},
      { type: 'Swim', value: stats.all_swim_totals.distance, time: stats.all_swim_totals.elapsed_time },
    ],
    angleField: 'time',
    colorField: 'type',
    paddingLeft: 80,
    paddingRight: 80,
    innerRadius: 0.6,
    label: {
      text: (d) => {
        return `${d.type}\n ${Math.round(d.value / 1000)} km \n ${Math.round(d.time / (60 * 60))} h`;
      },
      style: {
        fontWeight: 'bold',
      },
      position: 'spider'
    },
    legend: false,
    annotations: enableAnnotations ? [
      {
        tooltip: false,
        type: 'text',
        style: {
          text: 'time split',
          x: '50%',
          y: '50%',
          textAlign: 'center',
          fontSize: 30,
          fontFamily: "Montserrat",
        },
      },
    ] : false,
  };
  return <Pie {...config} />;
};
