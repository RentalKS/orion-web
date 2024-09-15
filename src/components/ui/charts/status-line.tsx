import { Tooltip } from "antd";
import { COLORS } from "./colors";

export interface Segment {
    title: string;
    value: number;
    color?: string;
}

export interface StatusLineProps {
    segments: Segment[];
}

export const StatusLine: React.FC<StatusLineProps> = ({ segments }) => {
    const total = segments.reduce((acc, { value }) => acc + value, 0);

    segments = segments.map((segment, index) => ({
        ...segment,
        color: segment.color || COLORS[index % COLORS.length],
    }));

    if (total === 0) {
        return <div className="multi-color-line" style={{ backgroundColor: "#d3d3d3" }} />;
    }

    return (
        <div className="multi-color-line">
            {segments.map((segment, index) => {
                const segmentWidth = Math.round((segment.value / total) * 100);
                return (
                    <Tooltip title={`${segment.title} - ${segmentWidth}%`} color={"blue"} key={index}>
                        <div
                            key={index}
                            className="line-segment"
                            style={{ backgroundColor: segment.color, width: `${segmentWidth}%` }}
                        />
                    </Tooltip>
                );
            })}
        </div>
    );
};