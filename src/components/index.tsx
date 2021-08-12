import noop from '@jswork/noop';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import filterProps from '@jswork/filter-react-props';

export type Props = { className?: string; value?: object; onChange?: Function };

const CLASS_NAME = 'react-ant-select-cascader';

export default class ReactAntSelectCascader extends Component<Props> {
  static displayName = CLASS_NAME;
  static version = '__VERSION__';
  static propTypes = {
    /**
     * The extended className for component.
     */
    className: PropTypes.string,
    /**
     * Default value.
     */
    value: PropTypes.object,
    /**
     * The change handler.
     */
    onChange: PropTypes.func
  };

  static defaultProps = {
    value: null,
    onChange: noop
  };

  handleClick = () => {
    console.log('click me!');
  };

  render() {
    const { className, value, onChange, ...props } = this.props;
    const theProps = filterProps(props);

    return (
      <div data-component={CLASS_NAME} className={classNames(CLASS_NAME, className)} {...theProps}>
        <p>
          <button
            style={{ padding: 20, width: '100%' }}
            onClick={this.handleClick}
            className="icon-play">
            Enjoy coding.
          </button>
        </p>
      </div>
    );
  }
}
