import React from 'react';

import PageItem from '../PageItem';
import LinkMixin from './LinkMixin';

const PageItemLink = React.createClass({
  mixins: [
    LinkMixin
  ],

  render() {
    return (
      <PageItem {...this.getLinkProps()} ref='pageItem'>
        {this.props.children}
      </PageItem>
    );
  }
});

export default PageItemLink;
