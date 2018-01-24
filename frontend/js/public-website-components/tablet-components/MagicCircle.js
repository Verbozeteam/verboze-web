/* @flow */

import * as React from 'react';
import PropTypes from 'prop-types';

type PropsType = {
    width: number,
    height: number,
    glowColor?: string,
    offColor?: string,
    isOn?: boolean,
    text?: string,
    textColor?: string,
    onClick?: () => null,
    extraStyle?: Object,
    sideText?: string,
    sideTextStyle?: Object,
};

type StateType = {
    hover: boolean,
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
        extraStyle: {},
        sideTextStyle: {},
    };

    state: StateType = {
        hover: false,
    };

    onMouseEnter(e: Object) {
        this.setState({hover: true});
    }

    onMouseLeave(e: Object) {
        this.setState({hover: false});
    }

    render() {
        const {
            width,
            height,
            glowColor,
            offColor,
            isOn,
            text,
            textColor,
            onClick,
            extraStyle,
            sideText,
            sideTextStyle
        } = this.props;
        const { hover } = this.state;

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
        };

        if (isOn || hover) {
            style.boxShadow = '0 0 16px 1px' + glowColor;
            style.backgroundColor = glowColor;
        } else {
            style.border = '2px solid ' + offColor;
        }

        var sideTextView = null;
        if (sideText) {
            sideTextView = <div style={sideTextStyle}>{sideText}</div>
        }

        return (
            <div style={{display: 'flex', flexDirection: 'row', ...extraStyle}}
                 onClick={onClick}
                 onMouseEnter={this.onMouseEnter.bind(this)}
                 onMouseLeave={this.onMouseLeave.bind(this)}
                 ref={r => this._container_ref = r}>
                <div style={style}>
                    {text}
                </div>
                {sideTextView}
            </div>
        );
    }
}

export { MagicCircle };
