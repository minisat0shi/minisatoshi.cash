import feedparser
import requests
import os
from datetime import datetime, timedelta, timezone

# Config
RSS_FEED_URL = "https://medium.com/@BCHF_ORG/feed"
REPO = os.getenv("GITHUB_REPOSITORY")
TOKEN = os.getenv("GITHUB_TOKEN")

def get_latest_article():
    # Fetch RSS feed and check for recent articles
    feed = feedparser.parse(RSS_FEED_URL)
    lookback_time = datetime.utcnow().replace(tzinfo=timezone.utc) - timedelta(days=7)
    for entry in feed.entries:
        try:
            pub_date = datetime(*entry.published_parsed[:6]).replace(tzinfo=timezone.utc)
            if pub_date >= lookback_time:
                return {"title": entry.title, "link": entry.link, "published": pub_date}
        except AttributeError:
            pass
    return None

def create_github_issue(article):
    # Create GitHub issue with article details
    url = f"https://api.github.com/repos/{REPO}/issues"
    headers = {"Authorization": f"token {TOKEN}", "Accept": "application/vnd.github.v3+json"}
    data = {
        "title": f"[BCHF NEWS] {article['title']} - {article['published'].strftime('%Y-%m-%d')}",
        "body": f"New BCHF article: [{article['title']}]({article['link']})",
        "labels": ["bch-news"]
    }
    response = requests.post(url, json=data, headers=headers)
    print("Issue created" if response.status_code == 201 else f"Failed: {response.status_code}")

# Main: Check for article and create issue
article = get_latest_article()
if article and TOKEN and REPO:
    create_github_issue(article)