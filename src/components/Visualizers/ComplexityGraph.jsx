import React, { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import AnimatedCard from "../Common/AnimatedCard";
import useVisualizerStore from "../../store/useVisualizerStore";
import ComplexityAnalyzer from "../../engine/complexityAnalyzer";

const ComplexityGraph = () => {
  const { complexityData, selectedPreset } = useVisualizerStore();

  const chartData = useMemo(() => {
    if (complexityData.length === 0) return [];

    const maxSteps = complexityData.length;
    const n = selectedPreset ? 10 : maxSteps;
    const theoretical = ComplexityAnalyzer.generateTheoreticalCurves(
      n,
      maxSteps,
    );

    return complexityData.map((point, i) => ({
      step: point.step,
      "Your Code": point.operations,
      "O(n)": theoretical[i] ? theoretical[i]["O(n)"] : 0,
      "O(n log n)": theoretical[i] ? theoretical[i]["O(n log n)"] : 0,
      "O(n²)": theoretical[i] ? theoretical[i]["O(n²)"] : 0,
    }));
  }, [complexityData, selectedPreset]);

  return (
    <AnimatedCard
      title="Time Complexity"
      icon="📊"
      glowColor="var(--accent-yellow)"
      delay={0.4}
    >
      {chartData.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "20px",
            color: "var(--text-secondary)",
            fontSize: "13px",
          }}
        >
          <div style={{ fontSize: "30px", marginBottom: "8px" }}>📈</div>
          Execute code to see complexity graph
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={160}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
            <XAxis
              dataKey="step"
              tick={{ fill: "var(--text-secondary)", fontSize: 10 }}
              stroke="var(--border-color)"
            />
            <YAxis
              tick={{ fill: "var(--text-secondary)", fontSize: 10 }}
              stroke="var(--border-color)"
            />
            <Tooltip
              contentStyle={{
                background: "var(--bg-card)",
                border: "1px solid var(--border-color)",
                borderRadius: "8px",
                fontSize: "11px",
              }}
            />
            <Legend wrapperStyle={{ fontSize: "10px" }} />
            <Line
              type="monotone"
              dataKey="Your Code"
              stroke="var(--accent-purple)"
              strokeWidth={3}
              dot={false}
              isAnimationActive={true}
            />
            <Line
              type="monotone"
              dataKey="O(n)"
              stroke="var(--accent-green)"
              strokeWidth={1}
              strokeDasharray="5 5"
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="O(n log n)"
              stroke="var(--accent-yellow)"
              strokeWidth={1}
              strokeDasharray="5 5"
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="O(n²)"
              strokes="var(--accent-red)"
              strokeWidth={1}
              strokeDasharray="5 5"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </AnimatedCard>
  );
};

export default ComplexityGraph;
