//this is react code
import React from "react";
import { NavigationEvents } from "react-navigation";

class AppNavigationEvents extends React.Component {
        render() {
            const { onDidFocus } = this.props;
            return ( < NavigationEvents {...this.props }
                />);
            }
        }

        export default AppNavigationEvents;