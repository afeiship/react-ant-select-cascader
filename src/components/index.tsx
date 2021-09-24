import noop from '@jswork/noop';
import classNames from 'classnames';
import React, { Component } from 'react';
import filterProps from '@jswork/filter-react-props';
import ReactList from '@jswork/react-list';
import ReactAntSelect from '@jswork/react-ant-select';
import { Simulate } from 'react-dom/test-utils';
import load = Simulate.load;

const CLASS_NAME = 'react-ant-select-cascader';

// export type ReactAntSelectCascaderProps = {
//   /**
//    * The extended className for component.
//    */
//   className?: string;
//   /**
//    * Default value.
//    */
//   value?: object;
//   /**
//    * The change handler.
//    */
//   onChange?: Function;
// };

export default class ReactAntSelectCascader extends Component<any> {
  static displayName = CLASS_NAME;
  static version = '__VERSION__';
  static defaultProps = {
    query: [],
    value: [],
    onChange: noop
  };

  state = {
    loading: this.props.query.map(() => false),
    value: this.props.value,
    options: this.props.query.map(() => [])
  };

  shouldComponentUpdate(nextProps: Readonly<any>): boolean {
    const { value } = nextProps;
    if (value !== this.state.value) {
      this.setState({ value });
    }
    return true;
  }

  componentDidMount() {
    const { query } = this.props;
    const { options, loading } = this.state;
    loading[0] = true;
    this.setState({ loading });
    query[0](null)
      .then(({ items }) => {
        options[0] = items;
        this.setState({ options });
      })
      .finally(() => {
        loading[0] = false;
        this.setState({ loading });
      });
  }

  handleTemplate = ({ item, index }) => {
    const { value, loading } = this.state;
    return (
      <ReactAntSelect
        key={index}
        items={item}
        loading={loading[index]}
        value={value[index]}
        onChange={this.handleItemChange.bind(this, index)}
        style={{ width: 200 }}
      />
    );
  };

  handleItemChange = (inIndex, inEvent) => {
    const { query, onChange } = this.props;
    const { options, loading } = this.state;
    const { value } = inEvent.target;
    const api = query[inIndex + 1];
    const _value = this.state.value;
    _value.forEach((_, index) => index > inIndex && _value.splice(index, 1));
    _value[inIndex] = value;

    api && (loading[inIndex] = true);
    const target = { value: _value };

    this.setState({ ...target, loading });
    onChange({ target });

    if (api) {
      api(value)
        .then(({ items }) => {
          options[inIndex + 1] = items;
          this.setState({ options });
        })
        .finally(() => {
          loading[inIndex] = false;
          this.setState({ loading });
        });
    }
  };

  render() {
    const { className, value, onChange, ...props } = this.props;
    const { options } = this.state;

    return (
      <ReactList
        nodeName="div"
        data-component={CLASS_NAME}
        items={options}
        template={this.handleTemplate}
        className={classNames(CLASS_NAME, className)}
        {...props}
      />
    );
  }
}
