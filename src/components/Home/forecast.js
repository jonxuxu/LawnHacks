import React from 'react';
import { FlexibleXYPlot, XAxis, YAxis, HorizontalGridLines, LineSeries } from 'react-vis';

function Forecast() {

    return (
        <FlexibleXYPlot>
            <HorizontalGridLines />
            <LineSeries
                data={[
                    { x: 1, y: 10 },
                    { x: 2, y: 5 },
                    { x: 3, y: 15 }
                ]} />
            <XAxis />
            <YAxis />
        </FlexibleXYPlot>
    );
}

export default Forecast;