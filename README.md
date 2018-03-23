# vue-csv-downloader
A Vue.js button component to download a CSV file of client-side data

# Install

`npm install vue-csv-downloader --save-dev`

# Use

Example:

```
<template>
    <vue-csv-downloader
        :items="items"
        :fields="fields"
    >
    </vue-csv-downloader>
</template>

<script>
import VueCsvDownloader from 'vue-csv-downloader';

export default {
    data() {
        return {
            items: [
                {id: 1, fruit: 'Apple', price: 4.50, unit: 'lb'},
                {id: 2, fruit: 'Blueberry', price: 3.00, unit: 'lb'},
                {id: 3, fruit: 'Pine apple', price: 5.15, unit: 'each'},
            ],
            fields: ['fruit', 'price', 'unit'],
        };
    },
};
</script>
```

# Attributes

* `items` - Array of objects, Required. This is the data.
* `fields` - Array of strings, Required. These are the headers. They should match keys of the objects in items.
* `download-name` - String, Optional. The filename to download under.

