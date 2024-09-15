import React from 'react';

import Color from 'color';

interface IconProps {
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    color?: string;
    iconProps?: React.SVGProps<SVGSVGElement>;
    divProps?: React.HTMLAttributes<HTMLDivElement>;
}

export const CardIcon: React.FC<IconProps> = ({ icon: Icon, color = '#fff', iconProps, divProps }) => {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                backgroundColor: Color(color).alpha(0.07).toString(),
                borderRadius: '50%',
                padding: '14px',
                marginLeft: 12,
                marginRight: 10
            }}
            {...divProps}
        >
            <Icon color={color} width={28} height={28}  {...iconProps} />
        </div>
    );
}
