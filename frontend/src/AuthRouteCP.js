import { Route,Redirect } from "react-router-dom";

export default function AuthRouteCP({ component: C, name, ...rest }) {
    console.log(name)
    return (
      <Route
        {...rest}
        render={props =>
          name === 'Administrator'
            ? <C {...props} />
            : <Redirect
                to={'/'}
              />}
      />
    );
  }