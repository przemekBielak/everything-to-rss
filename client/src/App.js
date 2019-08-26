import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activated: "",
      subredditName: "",
      subredditTopSelect: "",
      redditRssResult: "",
      newslettertName: ""
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
    this.handleNewsletterNameChange = this.handleNewsletterNameChange.bind(this);
    this.handleNewsletterSubmit = this.handleNewsletterSubmit.bind(this);
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

  handleNewsletterNameChange(event) {
    this.setState({ newslettertName: event.target.value });
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

    if (this.state.subredditName.includes('https://')) {
      // 
      const split = this.state.subredditName.split('/')
      const index = split.indexOf('r') + 1;
      subredditString = split[index];
    } else {
      subredditString = this.state.subredditName;
    }
    const redditRss = `https://www.reddit.com/r/${subredditString}/top.rss?t=${this.state.subredditTopSelect}`;
    this.setState({ redditRssResult: redditRss });
  }

  handleNewsletterSubmit() {
    (async () => {
      const rawResponse = await fetch('/rss', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ newsletterName: this.state.newslettertName })
      });
      const content = await rawResponse.json();

      console.log(content);
    })();
  }

  showRedditRssResult() {
    if (this.state.redditRssResult !== "") {
      return <h3>{this.state.redditRssResult}</h3>;
    } else {
      return;
    }
  }

  showRedditSubmitButton() {
    if (this.state.subredditName !== "" && this.state.subredditTopSelect !== "") {
      return <button onClick={this.handleRedditSubmit}>Submit</button>;
    } else {
      return;
    }
  }

  shotAdvanced() {
    if (this.state.activated === "reddit") {
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
    } else if (this.state.activated === "newsletter") {
      return (
        <div>
          <form>
            <label>
              Newsletter name:
              <input
                type="text"
                value={this.state.newslettertName}
                onChange={this.handleNewsletterNameChange}
              />
            </label>
          </form>
          <button onClick={this.handleNewsletterSubmit}>Submit</button>
        </div>
      );
    } else {
      return;
    }
  }

  render() {
    return (
      <div className='App'>
        <h1>Everything to RSS</h1>
        <button onClick={this.activateReddit}>Reddit</button>
        <button onClick={this.activateNewsletter}>Newsletter</button>
        {this.shotAdvanced()}
      </div>
    );
  }
}

export default App;
