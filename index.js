const visit = require("unist-util-visit");
const toString = require("mdast-util-to-string");

/* eslint-disable no-param-reassign */

/**
 * Transforms Github video urls into embedded videos and
 * Snack links into embedded snacks
 * @param markdownAST
 * @returns {*}
 */
module.exports = ({ markdownAST }) => {
  // Github videos dragged into .md files are set as paragraphs by remark
  visit(markdownAST, "paragraph", (node) => {
    // Grab the innerText of the paragraph node
    const text = toString(node);
    // Check if the innerText is a link to a github video
    if (
      text.toLowerCase().endsWith(".mp4") ||
      text.toLowerCase().endsWith(".mov")
    ) {
      // Replace the paragraph node with a custom video node
      const html = `
        <video width="400" controls style="margin-bottom: 16px">
            <source src="${text}" type="video/mp4">
        </video>
      `;

      node.type = "html";
      node.children = undefined;
      node.value = html;

      return;
    }

    if (Array.isArray(node.children)) {
      const link = node.children.find((child) => child.type === "link");
      if (link?.url?.toLowerCase?.()?.startsWith("https://snack.expo.dev")) {
        // eslint-disable-next-line no-unused-vars
        const [_, ...rest] = link.url.split("@");
        const snackId = `@${rest.join("")}`;
        const html = `
          <!-- Embed saved Snack -->
          <div
            data-snack-id="${snackId}"
            data-snack-platform="web"
            data-snack-preview="true"
            data-snack-theme="light"
            data-snack-loading="lazy"
            style="overflow:hidden;background:#fafafa;border:1px solid rgba(0,0,0,.08);border-radius:4px;height:800px;width:100%;margin-bottom:32px;margin-top:32px">
          </div>
        `;

        node.type = "html";
        node.children = undefined;
        node.value = html;
      }
    }
  });

  return markdownAST;
};
