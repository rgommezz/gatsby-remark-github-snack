# gatsby-remark-github-snack

Compatible with Gatsby `v5.x.x`. It's not tested with previous versions

```bash
$ npm install gatsby-remark-github-snack
```
## Features

### Converts remote videos hosted on GitHub (or elsewhere)

It automatically converts remote videos hosted on GitHub from your markdown files, or other type of remote URLs pointing to videos ending on `mp4` or `mov`, into HTML videos

For instance:

```
https://user-images.githubusercontent.com/example_video.mov

// Gets transformed into ↓

<video width="400" controls style="margin-bottom: 16px">
    <source src="https://user-images.githubusercontent.com/example_video.mov" type="video/mp4">
</video>

```

### Replaces remote snack URLs with an embedded playground in your websites.

[https://snack.expo.dev/@rgommezz/layoutanimation](https://snack.expo.dev/@rgommezz/layoutanimation) => Any apperance of a link like this in your markdown gets replaced with the playground shown in the screenshot below

![image](https://user-images.githubusercontent.com/4982414/218871612-97904eff-d682-4718-9c59-f24732b3740b.png)

## Usage with Mdx

In your `gatsby-config` file:

```js
const config = {
  plugins: [
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        gatsbyRemarkPlugins: [
          "gatsby-remark-github-snack",
          // Other remark plugins here
        ],
      },
    },
    // Other Gatsby plugins here
  ],
};

```

## Usage without Mdx

```js
const config = {
  plugins: [
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          "gatsby-remark-github-snack",
          // Other remark plugins here
        ],
      },
    },
    // Other Gatsby plugins here
  ],
};
```

 
