import noop from '@jswork/noop';
import classNames from 'classnames';
import React, { Component } from 'react';
import ReactList from '@jswork/react-list';
import ReactAntSelect from '@jswork/react-ant-select';

const CLASS_NAME = 'react-ant-select-cascader';
const remove = (items, fn) => {
  items.forEach((item, index) => {
    if (fn(item, index)) {
      items.splice(index, 1);
    }
  });
};

interface TemplateArgs {
  index: number;
  item: any;
  props: {
    items: any[];
    loading: boolean;
    value: any;
    onChange: Function;
  };
}

export type ReactAntSelectCascaderProps = {
  /**
   * The extended className for component.
   */
  className?: string;
  /**
   * Default value.
   */
  value?: any[];
  /**
   * The react list node name.
   */
  nodeName?: any;
  /**
   * The change handler.
   */
  onChange?: Function;
  /**
   * The api list.
   * @param args
   */
  query: Array<(args: any) => Promise<any>>;
  /**
   * The select item template.
   * @param args
   */
  template?: (args: TemplateArgs) => React.ReactNode;
};

const DEFAULT_TEMPLATE = ({ index, props }) => {
  return <ReactAntSelect key={index} {...props} />;
};

export default class ReactAntSelectCascader extends Component<ReactAntSelectCascaderProps, any> {
  static displayName = CLASS_NAME;
  static version = '__VERSION__';
  static defaultProps = {
    query: [],
    value: [],
    onChange: noop,
    template: DEFAULT_TEMPLATE
  };

  state = this.initialState;

  get initialState() {
    return {
      loadingList: this.props.query.map(() => false),
      value: this.props.value?.slice(0),
      itemsList: this.props.query.map(() => [])
    };
  }

  shouldComponentUpdate(nextProps: Readonly<any>): boolean {
    const { value } = nextProps;
    if (value !== this.state.value) {
      this.state.value = value.slice(0);
    }
    return true;
  }

  private doQuery = (inIndex: number, inData: any): Promise<any> => {
    const { query } = this.props;
    const { itemsList, loadingList } = this.state;
    const api = query[inIndex];
    if (!api) return Promise.resolve();
    loadingList[inIndex] = true;
    this.setState({ loadingList });

    return api(inData)
      .then(({ items }) => {
        itemsList[inIndex] = items;
        this.setState({ itemsList });
      })
      .finally(() => {
        loadingList[inIndex] = false;
        this.setState({ loadingList });
      });
  };

  componentDidMount() {
    this.doQuery(0, null);
  }

  handleTemplate = ({ item, index }) => {
    const { template } = this.props;
    const { value, loadingList } = this.state;
    const props = {
      items: item,
      loading: loadingList[index],
      value: value![index],
      onChange: this.handleItemChange.bind(this, index)
    };
    return template!({ item, index, props });
  };

  handleItemChange = (inIndex, inEvent) => {
    const { onChange } = this.props;
    const { value } = inEvent.target;
    const _value = this.state.value!;
    const target = { value: _value };
    remove(_value, (_, index) => index > inIndex);
    _value[inIndex] = value;
    remove(_value, (item) => typeof item === 'undefined');
    onChange!({ target });
    this.setState(target);
    this.doQuery(inIndex + 1, value);
  };

  render() {
    const { className, value, onChange, template, query, ...props } = this.props;
    const { itemsList } = this.state;

    return (
      <ReactList
        nodeName="div"
        data-component={CLASS_NAME}
        items={itemsList}
        template={this.handleTemplate}
        className={classNames(CLASS_NAME, className)}
        {...props}
      />
    );
  }
}
