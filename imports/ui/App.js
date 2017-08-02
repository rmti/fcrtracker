import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import FCRAppBar from './MyAppBar';
import {deepPurple900,
  grey100, grey300, grey400, grey500,
  white, darkBlack, fullBlack} from 'material-ui/styles/colors';

  const muiTheme = getMuiTheme({
    palette: {
    primary1Color: deepPurple900
  },
    appBar: {
      height:100
    }
  });
export default class App extends React.Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <FCRAppBar {...this.state}/>
          <div className="contents">
            {this.props.children}
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
};
