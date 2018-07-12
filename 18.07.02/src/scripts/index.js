import React from 'react';
import ReactDOM from 'react-dom';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: 0,
            show: true
        };
        this.dom = {};
    }

    reset() {
        console.log(this.state.status)
        this.setState({
            status: this.state.status + 1,
            show: true
        });
    }

    alert() {
        this.setState({
            show: !this.state.show
        });
    }

    render() {
        const {status, show} = this.state;
        if (!show) {
            this.dom.innerHTML='消失';
        }
        console.log(status);
        return (
            <div>
                <button onClick={() => this.alert()}>alert</button>
                <button onClick={() => this.reset()}>reset</button>
                <div className={'ttt'} ref={dom => this.dom = dom}>
                    <h1>展示： {status}</h1>
                </div>
            </div>
        )
    }
}

const render = () => ReactDOM.render(
    <App/>, document.getElementById('app')
);

render();

// hot-reload
if (module.hot) {
    module.hot.accept();
}
