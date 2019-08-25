import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activated: "",
      subredditName: "",
      subredditTopSelect: "",
      redditRssResult: ""
    };

    this.activateReddit = this.activateReddit.bind(this);
    this.activateNewsletter = this.activateNewsletter.bind(this);
    this.handleSubredditNameChange = this.handleSubredditNameChange.bind(this);
    this.handleSubredditTopWeek = this.handleSubredditTopWeek.bind(this);
    this.handleSubredditTopMonth = this.handleSubredditTopMonth.bind(this);
    this.handleSubredditTopYear = this.handleSubredditTopYear.bind(this);
    this.handleRedditSubmit = this.handleRedditSubmit.bind(this);
    this.showRedditRssResult = this.showRedditRssResult.bind(this);
    this.showRedditSubmitButton = this.showRedditSubmitButton.bind(this);
  }

  activateReddit() {
    this.setState({ activated: "reddit" });
  }

  activateNewsletter() {
    this.setState({ activated: "newsletter" });
  }

  handleSubredditNameChange(event) {
    this.setState({ subredditName: event.target.value });
  }

  handleSubredditTopWeek() {
    this.setState({ subredditTopSelect: "week" });
  }

  handleSubredditTopMonth() {
    this.setState({ subredditTopSelect: "month" });
  }

  handleSubredditTopYear() {
    this.setState({ subredditTopSelect: "year" });
  }

  handleRedditSubmit() {
    let subredditString = '';

    if(this.state.subredditName.includes('https://')) {
      // 
      subredditString = this.state.subredditName.split('/')[4];
    }else{
      subredditString = this.state.subredditName;
    }
    const redditRss = `https://www.reddit.com/r/${subredditString}/top.rss?t=${this.state.subredditTopSelect}`;
    this.setState({ redditRssResult: redditRss });
  }

  showRedditRssResult() {
    if (this.state.redditRssResult != "") {
      return <h3>{this.state.redditRssResult}</h3>;
    } else {
      return;
    }
  }

  showRedditSubmitButton() {
    if (this.state.subredditName != "" && this.state.subredditTopSelect != "") {
      return <button onClick={this.handleRedditSubmit}>Submit</button>;
    } else {
      return;
    }
  }

  shotAdvanced() {
    if (this.state.activated == "reddit") {
      return (
        <div>
          <div>
            <form>
              <label>
                Subreddit name:
                <input
                  type="text"
                  value={this.state.subredditName}
                  onChange={this.handleSubredditNameChange}
                />
              </label>
            </form>
            <h2>Top in:</h2>
            <button onClick={this.handleSubredditTopWeek}>week</button>
            <button onClick={this.handleSubredditTopMonth}>month</button>
            <button onClick={this.handleSubredditTopYear}>year</button>
          </div>
          {this.showRedditSubmitButton()}
          {this.showRedditRssResult()}
        </div>
      );
    } else if (this.state.activated == "newsletter") {
      return (
        <form>
          <label>
            Newsletter name:
            <input type="text" name="newsletterName" />
          </label>
        </form>
      );
    } else {
      return;
    }
  }

  render() {
    return (
      <div>
        <h1>Everything to RSS</h1>
        <button onClick={this.activateReddit}>Reddit</button>
        <button onClick={this.activateNewsletter}>Newsletter</button>
        {this.shotAdvanced()}
      </div>
    );
  }
}

export default App;
