import React from "react";
import { Chart } from "react-charts";
function Charts() {
  const data = React.useMemo(
    () => [
      {
        label: " ",
        data: [
          ["Januari", 10250000],
          ["Februari", 12150000],
          ["Maret", 13200000],
          ["April", 9150000],
          ["Mei", 6150000],
        ],
      },
    ],
    []
  );

  const axes = React.useMemo(
    () => [
      { primary: true, type: "ordinal", position: "bottom" },
      { type: "linear", position: "left" },
    ],
    []
  );
  return (
    <div style={{ width: "100%", height: "400px" }}>
      <Chart data={data} axes={axes} tooltip />
    </div>
  );
}

export default Charts;
