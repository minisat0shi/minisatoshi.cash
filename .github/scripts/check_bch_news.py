import feedparser
import requests
import os
from datetime import datetime, timedelta

# Configuration
RSS_FEED_URL = "https://medium.com/@BCHF_ORG/feed"
REPO = os.getenv("GITHUB_REPOSITORY")  # e.g., "owner/repo"
TOKEN = os.getenv("GITHUB_TOKEN")
ISSUE_TITLE = "[BCHF NEWS CHECK] Bitcoin Cash Foundation Weekly News"
LOOKBACK_DAYS = 7  # Check articles from the last 7 days

def get_latest_article():
    feed = feedparser.parse(RSS_FEED_URL)
    current_time = datetime.utcnow()
    lookback_time = current_time - timedelta(days=LOOKBACK_DAYS)

    for entry in feed.entries:
        # Parse article publication date
        pub_date = datetime(*entry.published_parsed[:6])
        # Check if the article is recent and contains "Weekly News" in the title
        if pub_date >= lookback_time and "Weekly News" in entry.title:
            return {
                "title": entry.title,
                "link": entry.link,
                "published": pub_date
            }
    return None

def create_github_issue(article):
    url = f"https://api.github.com/repos/{REPO}/issues"
    headers = {
        "Authorization": f"token {TOKEN}",
        "Accept": "application/vnd.github.v3+json"
    }
    body = f"Latest Bitcoin Cash Foundation Weekly News article:\n\n[{article['title']}]({article['link']})"
    data = {
        "title": f"{ISSUE_TITLE} - {article['published'].strftime('%Y-%m-%d')}",
        "body": body,
        "labels": ["bch-weekly-news"]
    }
    response = requests.post(url, json=data, headers=headers)
    if response.status_code == 201:
        print(f"Issue created: {response.json()['html_url']}")
    else:
        print(f"Failed to create issue: {response.status_code} {response.text}")

def main():
    article = get_latest_article()
    if article:
        print(f"Found article: {article['title']}")
        create_github_issue(article)
    else:
        print("No recent Weekly News article found.")

if __name__ == "__main__":
    main()