import { memo, forwardRef } from 'react';
import ReactChart from 'react-apexcharts';

const Chart = memo(forwardRef((props, chartRef) => (
  <ReactChart
    ref={chartRef}
    {...props}
  />
)));

Chart.displayName = 'Chart';

export default Chart;
