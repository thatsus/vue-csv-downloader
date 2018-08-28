# vue-csv-downloader
A Vue.js link component to download a CSV file of client-side data

The contents are a Font Awesome CSV icon by default, but they can be replaced.

# Install

`npm install vue-csv-downloader --save-dev`

# Use

Example:

```
<template>
    <vue-csv-downloader
        :data="data"
        :fields="fields"
    >
    </vue-csv-downloader>
</template>

<script>
import VueCsvDownloader from 'vue-csv-downloader';

export default {
    components: {
        VueCsvDownloader,
    },
    data() {
        return {
            data: [
                {id: 1, fruit: 'Apple', price: 4.50, unit: 'lb'},
                {id: 2, fruit: 'Blueberry', price: 3.00, unit: 'lb'},
                {id: 3, fruit: 'Pineapple', price: 5.15, unit: 'each'},
            ],
            fields: ['fruit', 'price', 'unit'],
        };
    },
};
</script>
```

# Attributes

* `data` - Array of objects, Required. This is the data.
* `fields` - Array of strings, Required. These are the headers. They should match keys of the objects in items.
* `download-name` - String, Optional. The filename to download under.

# Customization

HTML content within the downloader element will be shown within the link instead of the default Font Awesome CSV icon.

Styles and classes on the element will be used on the link.

# Contribution

If you find a bug or want to contribute to the code or documentation, you can help by submitting an [issue](https://github.com/thatsus/vue-csv-downloader/issues) or a [pull request](https://github.com/thatsus/vue-csv-downloader/pulls).

# License

[MIT](http://opensource.org/licenses/MIT)
