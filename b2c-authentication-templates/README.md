# CSS
`index.css` is for adding necessary css which later on is exported into `output.css`

# How to export CSS
Go to main path and run `npx tailwindcss -i b2c-authentication-templates/index.css -o b2c-authentication-templates/output.css --watch`

# Local development
`development` folder is for local development of custom pages. HTML files from development folder contains a link to `output.css`

# Templates
`templates` folder is for HTML files which are deployed as custom page templates. When CSS is read you need to minify it.
Go to `https://www.toptal.com/developers/cssminifier`, paste the content of `output.css` then take the minified css and add in template files between `<style>here</style>` tags.

# JavaScript code
Some of the files need to use JavaScript. In case it is so, proceed in the same way as with CSS. For JavaScript minification, please use the following tool: `https://www.toptal.com/developers/javascript-minifier`.
Another important point to mention. It is suggested to put two scripts. The one is in the root directory called `dom-controller.js`. This is a very tiny library that helps us to control DOM elements in our scripts. And another script is related to the page where we want to use scripts which is put in the scripts folder. So, your result in the page you want to use script, can look like this:
`<script>minified dom controller JS</script>
<script>minified specific script file</script>`

# Deploy
Run github action to deploy templates

# B2C
## B2C user flow language template
B2C user flow language template available in azure.
B2C tenant -> User flows -> Select on of user flow -> Languages -> LANG -> Page-level resource files.