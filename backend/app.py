from playwright.sync_api import sync_playwright
from flask import Flask, jsonify

app = Flask(__name__)

def scrape_website(url):
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.goto(url)
        
        # Currently only looking fpr <p> elements 
        paragraphs = page.eval_on_selector_all('p', 'elements => elements.map(el => el.textContent)')
        
        browser.close()
        return paragraphs

@app.route('/api/scrape', methods=['GET'])
def get_scraped_data():
    url = "https://books.toscrape.com/"
    scraped_data = scrape_website(url)
    return jsonify(scraped_data)

if __name__ == '__main__':
    app.run(port=5000, debug=True)