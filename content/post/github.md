---
title: "Blogging with gh-pages and and Github Actions"
date: 2021-04-04T21:58:02+02:00
tags : ["github", "gh-pages", "github-aciton"]
categories :  ["blogging"]
---

In order to host my blog I looked no further then gh-pages. Since my sourcecode is on github and they offer free gh-pages and ci with github actions I see no reason why this simple blog should be hosted anywhere else.


Git github action script is pretty straight forward

On any push to master it will
 - fetch the site with submodules (to get the theme)
 - generate png file from all the puml files in /static
 - setup hugo version 0.82
 - generate minified version
 - publish to gh-pages branch

Note that in order to get it to work with a custom domain you need a CNAME file in static. 


{{% code file=".github/workflows/gh-pages.yml" %}}

