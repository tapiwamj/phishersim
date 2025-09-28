const fs = require("fs").promises;
const path = require("path");
const sanitizeHtml = require("sanitize-html");

class StoryManager {
  static SITEMAP = "";
  static STORY_DIR = path.join(__dirname, "emailstories", "mainstory");
  constructor() {}
  setRecepient() {}
  async fetchStoryMap() {
    try {
      console.log(StoryManager.STORY_DIR);
      const storypath = path.join(StoryManager.STORY_DIR, "storymap.json");
      const data = await fs.readFile(storypath, "utf8"); // now this works
      StoryManager.SITEMAP = JSON.parse(data);
    } catch (err) {
      console.error("Error reading file:", err);
    }
  }
  cleanHTML(html) {
    return sanitizeHtml(html, {
      allowedTags: [
        "p",
        "ul",
        "li",
        "strong",
        "em",
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "br",
      ],
      allowedAttributes: {},
      allowedSchemes: ["http", "https", "mailto"], // only safe URL schemes
    });
  }
  async getEmail(emailIndex) {
    const emailDetails = StoryManager.SITEMAP.emails[emailIndex];
    let body = await this.fetchEmailBody(emailDetails.path);
    body = body.replace(/\[\/recepient\/\]/g, recipientName);
    body = body.replace(/\[\/sendername\/\]/g, emailDetails.name);
    body = body.replace(/\[\/senderemail\/\]/g, emailDetails.email);
    body = this.cleanHTML(body);
    return {
      email: emailDetails.email,
      name: emailDetails.name,
      subject: emailDetails.subject,
      actions: emailDetails.actions,
      body: body,
    };
  }
  async fetchEmailBody(htmlpath) {
    let html;
    try {
      const storypath = path.join(StoryManager.STORY_DIR, htmlpath);
      html = await fs.readFile(storypath, "utf8"); // now this works
    } catch (err) {
      console.error("Error reading file:", err);
    }
    return html;
  }
}

module.exports = new StoryManager();

// const dd = new StoryManager();
// async function run() {
//   await dd.fetchStoryMap();
//   const hello = await dd.getEmail();
//   console.log(hello);

// }
// run();
