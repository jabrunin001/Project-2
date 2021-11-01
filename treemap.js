// Treemap.js
import * as d3 from 'd3';
import React, { useRef, useEffect } from 'react';

function Treemap({ width, height, data }){
    const ref = useRef();

    useEffect(() => {
        const svg = d3.select(ref.current)
            .attr("width", width)
            .attr("height", height)
            .style("border", "1px solid black")
    }, []);

    useEffect(() => {
        draw();
    }, [data]);

    const draw = () => {
        
    }


    return (
        <div className="chart">
            <svg ref={ref}>
            </svg>
        </div>
        
    )

}

export default Treemap;