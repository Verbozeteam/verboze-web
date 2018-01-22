/* @flow */

import * as React from 'react';
import PropTypes from 'prop-types';

type PropsType = {
    width: number,
    height: number,
    slopeX: number,
    image: string,
    backgroundColor?: string,
    children?: Array<any>
};

type StateType = {
    width: number,
    height: number,
};

class FeatureStack extends React.Component<PropsType, StateType> {
    canvas: ?Object = undefined;
    ctx: any = undefined;
    image: any = undefined;

    _marginLeft: number = 10;
    _marginTop: number = 30;

    static defaultProps: {
        backgroundColor: '#1d1d1d',
    };

    state: StateType = {
        width: -1,
        height: -1,
    };

    componentWillReceiveProps(newProps: PropsType) {
        var stateUpdate = {};
        if (newProps.width !== this.state.width || newProps.height !== this.state.height)
            stateUpdate = {...stateUpdate, ...{width: newProps.width, height: newProps.height}};

        if (Object.keys(stateUpdate).length > 0)
            this.setState(stateUpdate);
    }

    componentDidMount() {
        if (this.canvas && !this.ctx)
            this.ctx = this.canvas.getContext('2d');
        this.updateCanvas();
    }

    updateCanvas() {
        const { width, height } = this.state;
        const { slopeX, image } = this.props;
        if (this.canvas && this.image && width > 0 && height > 0) {
            this.ctx.beginPath();
            this.ctx.moveTo(slopeX, 0);
            this.ctx.lineTo(width, 0);
            this.ctx.lineTo(width-slopeX, height);
            this.ctx.lineTo(0, height);
            this.ctx.lineTo(slopeX, 0);
            this.ctx.closePath();
            this.ctx.clip();

            this.ctx.drawImage(this.image,
                width / 2 - this.image.width / 2,
                height / 2 - this.image.height / 2,
                this.image.width,
                this.image.height);
        }
    }

    wrapChild(child: any, index: number) {
        var { slopeX, height, children } = this.props;
        var curHeight = this._marginTop;
        if (children && index > 0) {
            for (var i = 0; i < index; i++) {
                console.log(index, i, children[i])
                curHeight += children[i].props.style.height +
                            (children[i].props.style.marginTop || 0) +
                            (children[i].props.style.paddingTop || 0);
            }
        }
        return (
            <div key={"child-"+index} style={{
                marginTop: (index === 0 ? this._marginTop : 0) + (child.props.style.marginTop||0),
                marginLeft: this._marginLeft + slopeX * (1 - curHeight / height),
            }}>
                {child}
            </div>
        );
    }

    render() {
        var { width, height, slopeX, image, backgroundColor, children } = this.props;

        this.updateCanvas();

        if (children) {
            if (!children.map)
                children = this.wrapChild(children, 0);
            else
                children = children.map(this.wrapChild.bind(this));
        }

        return (
            <div style={{...styles.container, minWidth: width, height, marginLeft: -slopeX, ...{backgroundColor: backgroundColor}}}>
                <canvas width={width} height={height} style={{width, height,  ...styles.canvas}} ref={c => this.canvas = c} />
                <img ref={c => this.image = c} src={image} onLoad={this.updateCanvas.bind(this)} style={{display: 'none'}} />
                <div style={styles.canvas}>
                    {children}
                </div>
            </div>
        );
    }
}

const styles = {
    container: {
        position: 'relative',
    },
    canvas: {
        position: 'absolute',
    }
};

export { FeatureStack };
