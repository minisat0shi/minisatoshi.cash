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
    print(f"Fetching RSS feed: {RSS_FEED_URL}")
    feed = feedparser.parse(RSS_FEED_URL)
    if not feed.entries:
        print("No entries found in RSS feed.")
        return None
    current_time = datetime.utcnow()
    lookback_time = current_time - timedelta(days=LOOKBACK_DAYS)
    print(f"Current UTC time: {current_time}")
    print(f"Looking for articles after: {lookback_time}")

    for entry in feed.entries:
        try:
            # Log raw entry data for debugging
            raw_title = entry.get('title', 'No title')
            print(f"Raw title: {raw_title}")
            # Parse publication date
            pub_date = datetime(*entry.published_parsed[:6])
            print(f"Checking article: '{raw_title}' (Published: {pub_date})")
            # Case-insensitive match for "weekly news"
            if pub_date >= lookback_time:
                print(f"Article is recent (within {LOOKBACK_DAYS} days)")
                if "weekly news" in raw_title.lower():
                    print(f"Match found: '{raw_title}'")
                    return {
                        "title": raw_title,
                        "link": entry.link,
                        "published": pub_date
                    }
                else:
                    print(f"No 'weekly news' in title: '{raw_title}'")
            else:
                print(f"Article too old: {pub_date} < {lookback_time}")
        except (AttributeError, TypeError) as e:
            print(f"Skipping article with error: {entry.get('title', 'Unknown')} (Error: {e})")
    print("No matching articles found.")
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
    print(f"Creating issue at: {url}")
    print(f"Issue data: {data}")
    response = requests.post(url, json=data, headers=headers)
    if response.status_code == 201:
        print(f"Issue created: {response.json()['html_url']}")
    else:
        print(f"Failed to create issue: {response.status_code} {response.text}")

def main():
    if not TOKEN:
        print("Error: GITHUB_TOKEN is not set.")
        return
    if not REPO:
        print("Error: GITHUB_REPOSITORY is not set.")
        return
    article = get_latest_article