const fs = require("fs");

class StoryManager {
  static SITEMAP = "";
  constructor() {
    fs.readFile(__dirname+"/emailstories/storymap.json", "utf8", (err, data) => {
      if (err) {
        console.error("Error reading file:", err);
        return;
      }
      const json = JSON.parse(data);
      console.log(data);
      console.log("File contents:", data);
    });
  }
}

const dd = new StoryManager();
