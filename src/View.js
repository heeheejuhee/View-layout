import React, {Component} from 'react';
import './App.css';

class  View extends Component {

  render(){

    var {className, children, viewName, activeView} = this.props;
    // It means...
    // var className = this.props.className;
    // var children = this.props.children;

    var newClassName = 'view '+className;

    return (viewName == activeView) ? (
    
        <div className={newClassName}>
          {children}
        </div>
        
    ) : null
  }  
}

export default View;
