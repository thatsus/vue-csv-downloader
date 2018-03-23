import $ from 'jquery';
import _ from 'lodash';
import assert from 'assert';
import json2csv from 'json2csv';
import CsvDownload from '../src/CsvDownload.vue';
import Vue from 'vue';

describe('CsvDownload', function () {

    let vm, theDownloader;

    beforeEach('setup the Vue instance', function (done) {

        vm = new Vue({
            template: `
                <csv-download 
                    :fields="fields"
                    :data="items"
                    ref="theDownloader"
                >
                </csv-download>
            `,
            components: {
                CsvDownload
            },
            data() {
                return {
                    items: [
                        {name: 'Dave', objectiveQuality: 'Medium'},
                        {name: 'Dan', objectiveQuality: 'High'},
                    ],
                    fields: [
                        'name',
                        'objectiveQuality',
                    ],
                };
            },
        });

        vm.$mount();

        theDownloader = vm.$refs.theDownloader;

        Vue.waitTicks(3)
            .then(done);
    });

    it('should have loaded', function () {
        assert(theDownloader, "theDownloader didn't load")
    });
});
