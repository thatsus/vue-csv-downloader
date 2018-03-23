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
                        {name: 'Dave', objectiveQuality: 'Medium', office: 304},
                        {name: 'Dan', objectiveQuality: 'High', office: 189},
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

        Vue.waitTicks(3).then(done);
    });

    it('should have loaded', function () {
        assert(theDownloader, "theDownloader didn't load")
    });

    it('should have generated a link', function () {
        assert(theDownloader.$el.href, "data:text/csv,%22name%22%2C%22objectiveQuality%22%0A%22Dave%22%2C%22Medium%22%0A%22Dan%22%2C%22High%22");
    });

    it('should change when field list changes', function (done) {
        vm.fields = ['name', 'office'];
        vm.$nextTick()
            .then(() => {
                assert(theDownloader.$el.href, "data:text/csv,%22name%22%2C%office%22%0A%22Dave%22%2C%22304%22%0A%22Dan%22%2C%22189%22");
            })
            .then(done, done);
    });

    it('should change when data changes', function (done) {
        vm.items[0].name = 'Randy';
        vm.items[1].name = 'Daryl';
        vm.$nextTick()
            .then(() => {
                assert(theDownloader.$el.href, "data:text/csv,%22name%22%2C%office%22%0A%22Randy%22%2C%22304%22%0A%22Daryl%22%2C%22189%22");
            })
            .then(done, done);
    });
});
