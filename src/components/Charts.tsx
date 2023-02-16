import { red } from "@mui/material/colors";
import { useState } from "react";
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  XAxis,
  Bar,
} from "recharts";

export interface IData {
  name: string;
  value: number | undefined;
}

const COLORS = ["#0088FE", "#FF8042"];

const renderActiveShape = (props: any) => {
  const {
    cx,
    cy,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
  } = props;

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>

      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={red[200]}
      />
    </g>
  );
};

function YTPortalPieChart({ data }: { data: IData[] | undefined }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };
  const onPieLeave = (_: any, index: number) => {
    setActiveIndex(-1);
  };
  return (
    <PieChart width={180} height={180}>
      <Pie
        activeIndex={activeIndex}
        activeShape={renderActiveShape}
        data={data}
        cx="50%"
        cy="50%"
        innerRadius={60}
        outerRadius={80}
        dataKey="value"
        onMouseEnter={onPieEnter}
        onMouseLeave={onPieLeave}
        paddingAngle={5}
      >
        {data &&
          data.map((entry: any, index: number) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
      </Pie>
    </PieChart>
  );
}

function YTPortalBarChart({ data }: { data: IData[] | undefined }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <XAxis dataKey="name" axisLine={false} tickLine={false} />
        <Tooltip cursor={{ fill: "none" }} />
        <Bar dataKey="value" fill={COLORS[0]} background={{ fill: "#eee" }} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export { YTPortalPieChart, YTPortalBarChart };
