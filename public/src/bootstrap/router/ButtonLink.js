import React from 'react';

import Button from '../Button';
import LinkMixin from './LinkMixin';

const ButtonLink = React.createClass({
  mixins: [
    LinkMixin
  ],

  render() {
    return (
      <Button {...this.getLinkProps()} ref='button'>
        {this.props.children}
      </Button>
    );
  }
});

export default ButtonLink;
