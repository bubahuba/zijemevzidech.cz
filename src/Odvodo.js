import React, { Component } from "react";
import Mapa, { defaultColor } from "./components/Mapa";
import { useLocation, useNavigate, useParams } from "react-router";

class Odvodo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entries: [],
      lists: [],
      list: "...",
    };
  }
  UNSAFE_componentWillReceiveProps = (nextprops) => {
    const { list } = nextprops.router.params;
    const renderList = list ? list : this.state.lists[0];
    this.setState({ list: renderList });
    const API =
      "https://sheets.googleapis.com/v4/spreadsheets/1ssjYdrST5QnaIeFizr-D2P3lHDgXHYpENLi_LMw4Amw/values/" +
      encodeURIComponent(renderList) +
      "!A2:Z1000?key=AIzaSyATJtmaYHWXJ3zXaYCexj4mfn_sjVIuJtk";

    this.setState({ entries: [] });
    fetch(API)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ entries: data.values });
      })
      .catch(function (ex) {
        console.log("parsing failed", ex);
      });
  };
  componentDidMount = () => {
    const { list } = this.props.router.params;
    const API_lists =
      "https://sheets.googleapis.com/v4/spreadsheets/1ssjYdrST5QnaIeFizr-D2P3lHDgXHYpENLi_LMw4Amw?key=AIzaSyATJtmaYHWXJ3zXaYCexj4mfn_sjVIuJtk";

    fetch(API_lists)
      .then((response) => response.json())
      .then((data) => {
        const lists = [];
        data.sheets.map(({ properties }) => lists.push(properties.title));
        this.setState(
          { lists, list: list ? list : lists[0]  }
        );

        const renderList = list ? list : lists[0];
        const API =
          "https://sheets.googleapis.com/v4/spreadsheets/1ssjYdrST5QnaIeFizr-D2P3lHDgXHYpENLi_LMw4Amw/values/" +
          encodeURIComponent(renderList) +
          "!A2:Z1000?key=AIzaSyATJtmaYHWXJ3zXaYCexj4mfn_sjVIuJtk";
        fetch(API)
          .then((response) => response.json())
          .then((data) => {
            this.setState({ entries: data.values });
          })
          .catch(function (ex) {
            console.log("parsing failed", ex);
          });
      })
      .catch(function (ex) {
        console.log("parsing failed", ex);
      });
  };
  render() {
    return (
      <div className="App" style={{ backgroundColor: defaultColor }}>
        <Mapa
          entries={this.state.entries}
          list={this.state.list}
          lists={this.state.lists}
        />
      </div>
    );
  }
}
export function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams();

    return <Component {...props} router={{ location, navigate, params }} />;
  }

  return ComponentWithRouterProp;
}
export default withRouter(Odvodo);
