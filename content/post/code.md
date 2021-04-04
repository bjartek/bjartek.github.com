+++
title = "Blogging with code"
date = 2021-03-30T21:15:23+02:00
tags = ["hugo", "chroma", "code"]
categories =  ["blogging"]
+++

When writing a technical blog you often want to include code snippts inside your blog posts, however you do not want to have to do tedious copy and paste between your actual code and the blog posts. Also you want to ensure that your code actually compiles. There is nothing more annoying then code samples that does not compile.


In order to cope with this I have crated a `shortcode` [code](https://raw.githubusercontent.com/bjartek/bjartek.github.com/main/layouts/shortcodes/code.html#) for hugo that allows me to

 - read a file with a given `file` from the filsystem
 - optional only read from `start` to `end`
 - highlight is as the extension of the file, or optionaly as `language`
 - show line numbers
 - optionaly highlight some `hl_lines` line numbers
 - works with chroma build in styling (not highlightjs)

The shortcode`s code is as follows: (using the shortcode to show itself)
{{% code file="/layouts/shortcodes/code.html" hl_lines="8" language="go" %}}

