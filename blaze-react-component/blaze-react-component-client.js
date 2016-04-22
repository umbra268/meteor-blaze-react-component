import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Blaze } from 'meteor/blaze';
import { ReactiveVar } from 'meteor/reactive-var';

class BlazeComponent extends Component {

  componentDidMount() {
    this._blazeData = new ReactiveVar(_.omit(this.props, 'blaze', 'ele', 'eleProps'));

    this._blazeView = Blaze.renderWithData(
      Blaze.Template[this.props.blaze],
      () => this._blazeData.get(),
      ReactDOM.findDOMNode(this._blazeRef)
    );
  }

  componentWillReceiveProps(nextProps) {
    this._blazeData.set(_.omit(nextProps, 'blaze', 'ele', 'eleProps'));
  }

  shouldComponentUpdate() {
    // Never call render() again; Blaze will do what's necessary.
    return false;
  }

  componentWillUnmount() {
    Blaze.remove(this._blazeView);
  }

  render() {
    return ( <this.props.ele {...this.props.eleProps} ref={(c) => this._blazeRef = c} /> );
  }

}

BlazeComponent.defaultProps = { ele: 'span', eleProps: {} };

blazeToReact = function(template) {
  return (props) => <BlazeComponent {...props} blaze={template} />;
}

export { blazeToReact };
export default BlazeComponent;
