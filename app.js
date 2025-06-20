class PomodoroTimer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            time: 25 * 60, // 25分を秒に変換
            isRunning: false,
            timer: null,
            isBreak: false,
            characterState: 'stand'
        };
    }

    formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    }

    startTimer = () => {
        if (!this.state.isRunning) {
            this.setState({ isRunning: true });
            const timer = setInterval(() => {
                const newTime = this.state.time - 1;
                if (newTime >= 0) {
                    this.setState({ time: newTime });
                } else {
                    clearInterval(timer);
                    this.setState({
                        isRunning: false,
                        time: this.state.isBreak ? 25 * 60 : 5 * 60,
                        isBreak: !this.state.isBreak
                    });
                }
            }, 1000);
            this.setState({ timer });
        }
    }

    pauseTimer = () => {
        if (this.state.isRunning) {
            clearInterval(this.state.timer);
            this.setState({ isRunning: false });
        }
    }

    resetTimer = () => {
        clearInterval(this.state.timer);
        this.setState({
            time: 25 * 60,
            isRunning: false,
            isBreak: false
        });
    }

    render() {
        return (
            <div className="container">
                <h1>ポモドーロタイマー</h1>
                <div className="timer">{this.formatTime(this.state.time)}</div>
                <div className="buttons">
                    <button 
                        className="start"
                        onClick={this.startTimer}
                        disabled={this.state.isRunning}
                    >
                        スタート
                    </button>
                    <button 
                        className="pause"
                        onClick={this.pauseTimer}
                        disabled={!this.state.isRunning}
                    >
                        一時停止
                    </button>
                    <button 
                        className="reset"
                        onClick={this.resetTimer}
                    >
                        リセット
                    </button>
                </div>
                <div className="character">
                    <div className="character-image">
                        {this.state.isRunning ? 
                            (this.state.isBreak ? 
                                <img src="sakuya.walk.gif" alt="歩行アニメーション" /> :
                                <img src="sakuya.run.gif" alt="走行アニメーション" />) :
                            <img src="sakuya.stand.png" alt="立ち姿" />
                        }
                    </div>
                </div>
                <div className="controls">
                    <button className="control-btn" onClick={() => {
                        this.setState({ 
                            time: 25 * 60, 
                            isBreak: false,
                            characterState: 'walk'
                        });
                    }}>
                        作業時間 (25分)
                    </button>
                    <button className="control-btn" onClick={() => {
                        this.setState({ 
                            time: 5 * 60, 
                            isBreak: true,
                            characterState: 'stand'
                        });
                    }}>
                        休憩時間 (5分)
                    </button>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<PomodoroTimer />, document.getElementById('root'));
