import React from 'react';

import Color from 'color';

interface IconProps {
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    color?: string;
    iconProps?: React.SVGProps<SVGSVGElement>;
    divProps?: React.HTMLAttributes<HTMLDivElement>;
}

function CardIcon({ icon: Icon, color = '#FFF', iconProps, divProps }: IconProps) {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                backgroundColor: Color(color).alpha(0.07).toString(),
                borderRadius: '50%',
                padding: '16px',
                marginLeft: 12,
                marginRight: 10
            }}
            {...divProps}
        >
            <Icon color={color} width={32} height={32}  {...iconProps} />
        </div>
    );
}

export default CardIcon;
