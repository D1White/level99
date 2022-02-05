import { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import axios from 'axios';
import { Theme } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';

import serverDelay from 'utils/serverDelay';

import { IChartData } from 'types/Chart';

const Chart = () => {
  const matches = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));

  const [data, setData] = useState<IChartData[]>();

  useEffect(() => {
    axios.get<IChartData[]>('/api/chart').then((res) => {
      serverDelay(res.data).then((chartData) => {
        setData(chartData);
      });
    });
  }, []);

  return (
    <ResponsiveContainer width={matches ? '50%' : '100%'} height="45%">
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="value" stroke="#8884d8" isAnimationActive={false} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Chart;
