/* @flow */

import * as React from 'react';
import PropTypes from 'prop-types';

type PropsType = {
    width: number,
    height: number,
    glowColor?: string,
    offColor?: string,
    opacity?: number,
    isOn?: boolean,
    text?: string,
    textColor?: string,
    onClick?: () => null,
};

type StateType = {
};

class MagicCircle extends React.Component<PropsType, StateType> {
    static defaultProps = {
        glowColor: '#ffffff',
        offColor: '#999999',
        opacity: 1,
        isOn: false,
        text: "",
        textColor: '#000000',
        onClick: () => null,
    };

    render() {
        const { width, height, glowColor, offColor, opacity, isOn, text, textColor, onClick } = this.props;

        var style = {
            borderRadius: 100000,
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            color: textColor,
            fontWeight: 'lighter',
            lineHeight: height + 'px',
            width,
            height,
            opacity,
        };

        if (isOn) {
            style.boxShadow = '0 0 8px 2px' + glowColor;
            style.backgroundColor = glowColor;
        } else {
            style.border = '2px solid ' + offColor;
        }

        return (
            <div style={style} onClick={onClick}>
                {text}
            </div>
        );
    }
}

export { MagicCircle };
