/* @flow */

import * as React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

import { LightsStack } from './LightsStack';
import { CurtainsStack } from './CurtainsStack';
import { CentralACStack } from './CentralACStack';
import { RoomServiceStack } from './RoomServiceStack';
import { RoomStacksCanvas } from './RoomStacksCanvas';

type PropsType = {
    width: number,
    height: number,
};

type StateType = {
    currentStack: number,
    isSelected: boolean,
    targetWidth: number,
    currentWidths: Array<number>,
    currentSlope: number,
};

class RoomStacks extends React.Component<PropsType, StateType> {

    state: StateType = {
        isSelected: false,
        currentStack: -1,
        targetWidth: 0,
        currentWidths: [],
        currentSlope: 75,
    };

    _slopeX: number = 75;
    _numStacks: number = 4;
    _extraStacksWidth: number = this._slopeX/2;
    _container_ref: Object;

    computeStackWidth(stack: number) {
        if (stack === 0)
            return this._extraStacksWidth;
        return this.props.width / this._numStacks + this._slopeX;
    }

    getMouseCoordinatesFromEvent(e: Object) {
        var element = ReactDOM.findDOMNode(this._container_ref);
        var bounds = element.getBoundingClientRect();
        return {
            x: e.clientX - bounds.left,
            y: e.clientY - bounds.top,
        };
    }

    onClick(e: Object) {
        const { width, height } = this.props;
        const { currentStack, isSelected } = this.state;

        if (currentStack > 0 && !isSelected) {
            e.preventDefault();
            this.setState({
                currentStack: currentStack,
                isSelected: true,
                targetWidth: width,
            });
        }
    }

    onMove(e: Object) {
        const { width, height } = this.props;
        const { isSelected, currentStack, currentWidths, currentSlope } = this.state;

        if (isSelected === false) {
            e.preventDefault();
            var { x, y } = this.getMouseCoordinatesFromEvent(e);
            var curX = currentSlope;
            var selected = 0;
            for (selected = 0; selected < this._numStacks + 2; selected++) {
                curX += currentWidths[selected] - currentSlope;
                if (x < curX - (y/height) * this._slopeX)
                    break;
            }

            if (selected < this._numStacks + 2 && currentStack !== selected)
                this.setState({
                    currentStack: selected,
                    isSelected: false,
                    targetWidth:  this.computeStackWidth(selected) + 30,
                });
        }
    }

    onLeave(e: Object) {
        const { isSelected } = this.state;
        if (!isSelected)
            this.setState({currentStack: -1});
    }

    getDefaultWidths() {
        var defaultWidths = [];
        for (var i = 0; i < this._numStacks + 2; i++)
            defaultWidths.push(this.computeStackWidth(i));
        return defaultWidths;
    }

    animateWidth() {
        const { width } = this.props;
        var { currentStack, targetWidth, isSelected, currentWidths, currentSlope } = this.state;

        if (currentWidths.length === 0)
            currentWidths = this.getDefaultWidths();
        var defaultWidths = this.getDefaultWidths();
        var slope = this._slopeX;
        var targetWidths = this.getDefaultWidths();

        if (currentStack !== -1) {
            targetWidths[currentStack] = targetWidth;
            // compute the extra width that will be taken by this stack
            var widthTaken = targetWidth - defaultWidths[currentStack];
            // take it from the other stacks (each proportionate to its own size)
            for (var i = 0; i < this._numStacks + 2; i++) {
                if (i !== currentStack) {
                    if (isSelected)
                        targetWidths[i] = 0;
                    else
                        targetWidths[i] -= 30/(this._numStacks+1);
                }
            }
        }

        var newWidths = JSON.parse(JSON.stringify(currentWidths));
        for (var i = 0; i < newWidths.length; i++) {
            var diff = targetWidths[i] - currentWidths[i];
            if (Math.abs(diff) < 1)
                newWidths[i] = targetWidths[i];
            else
                newWidths[i] += diff * 0.1;
        }

        if (isSelected)
            slope *= 1 - (currentWidths[currentStack]-defaultWidths[currentStack])/(targetWidth-defaultWidths[currentStack]);

        if (slope !== currentSlope || JSON.stringify(this.state.currentWidths) !== JSON.stringify(newWidths)) {
            this.setState({
                currentWidths: newWidths,
                currentSlope: slope,
            });
        }
    }

    render() {
        const { width, height } = this.props;
        var { currentStack, targetWidth, isSelected, currentWidths, currentSlope } = this.state;

        requestAnimationFrame(this.animateWidth.bind(this));

        if (currentWidths.length === 0)
            currentWidths = this.getDefaultWidths();

        return (
            <div    style={styles.container}
                    onClick={this.onClick.bind(this)}
                    onMouseMove={this.onMove.bind(this)}
                    onMouseLeave={this.onLeave.bind(this)}
                    ref={r => this._container_ref = r}>

                <RoomStacksCanvas
                    tabletWidth={width}
                    tabletHeight={height}
                    stackWidths={currentWidths}
                    slopeX={currentSlope} />

                <div style={styles.dataContainer}>
                    <div style={{minWidth: currentWidths[0]}} />
                    <LightsStack width={currentWidths[1]} height={height} slopeX={currentSlope} isFullscreen={currentStack === 1 && isSelected} />
                    <CurtainsStack width={currentWidths[2]} height={height} slopeX={currentSlope} isFullscreen={currentStack === 2 && isSelected} />
                    <CentralACStack width={currentWidths[3]} height={height} slopeX={currentSlope} isFullscreen={currentStack === 3 && isSelected} />
                    <RoomServiceStack width={currentWidths[4]} height={height} slopeX={currentSlope} isFullscreen={currentStack === 4 && isSelected} />
                </div>

            </div>
        );
    }
}

const styles = {
    container: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'row',
        overflowX: 'hidden',
        overflowY: 'hidden',
    },
    dataContainer: {
        position: 'absolute',
        display: 'flex',
        flexDirection: 'row',
        overflowX: 'hidden',
        overflowY: 'hidden',
    }
};

export { RoomStacks };
