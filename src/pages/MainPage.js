import React from "react";
import ConfigList from '../components/ConfigLists/ConfigList'
import FileViewer from '../components/FileViewer/FileViewer'


class MainPage extends React.Component {
    render() {
        return (
            <div className="main">
                <ConfigList />
                <FileViewer />
            </div>
        )
    }
}

export default MainPage;
