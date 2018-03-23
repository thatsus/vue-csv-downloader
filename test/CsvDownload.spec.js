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
        assert.equal(theDownloader.$el.href, "data:text/csv,%22name%22%2C%22objectiveQuality%22%0A%22Dave%22%2C%22Medium%22%0A%22Dan%22%2C%22High%22");
        assert.equal(theDownloader.$el.download, "export.csv");
    });

    it('should change when field list changes', function (done) {
        vm.fields = ['name', 'office'];
        vm.$nextTick()
            .then(() => {
                assert.equal(theDownloader.$el.href, "data:text/csv,%22name%22%2C%22office%22%0A%22Dave%22%2C304%0A%22Dan%22%2C189");
                assert.equal(theDownloader.$el.download, "export.csv");
            })
            .then(done, done);
    });

    it('should change when data changes', function (done) {
        vm.items[0].name = 'Randy';
        vm.items[1].name = 'Daryl';
        vm.$nextTick()
            .then(() => {
                assert.equal(theDownloader.$el.href, "data:text/csv,%22name%22%2C%22objectiveQuality%22%0A%22Randy%22%2C%22Medium%22%0A%22Daryl%22%2C%22High%22");
                assert.equal(theDownloader.$el.download, "export.csv");
            })
            .then(done, done);
    });
});

describe('CsvDownload', function () {

    let vm, theDownloader;

    beforeEach('setup the Vue instance', function (done) {

        vm = new Vue({
            template: `
                <csv-download 
                    :fields="fields"
                    :data="items"
                    :download-name="downloadName"
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
                        {spirit: 'Avarice', dangerFactor: 40},
                        {spirit: 'Gluttony', dangerFactor: 70},
                    ],
                    fields: [
                        'spirit',
                        'dangerFactor',
                    ],
                    downloadName: 'somefile.csv',
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

    it('should have generated a link with new filename', function () {
        assert.equal(theDownloader.$el.href, "data:text/csv,%22spirit%22%2C%22dangerFactor%22%0A%22Avarice%22%2C40%0A%22Gluttony%22%2C70");
        assert.equal(theDownloader.$el.download, "somefile.csv");
    });

    it('should change the filename', function (done) {
        vm.downloadName = 'someotherfile.csv';
        vm.$nextTick()
            .then(() => {
                assert.equal(theDownloader.$el.href, "data:text/csv,%22spirit%22%2C%22dangerFactor%22%0A%22Avarice%22%2C40%0A%22Gluttony%22%2C70");
                assert.equal(theDownloader.$el.download, "someotherfile.csv");
            })
            .then(done, done);
    });
});

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
                    <span v-if="useSlot">Ohai, Download</span>
                </csv-download>
            `,
            components: {
                CsvDownload
            },
            data() {
                return {
                    items: [
                        {category: 'rabbit', count: 23},
                        {category: 'chimp', count: 7},
                    ],
                    fields: [
                        'category',
                        'count',
                    ],
                    useSlot: true,
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

    it('should have Ohai message', function () {
        assert.equal(theDownloader.$el.innerText.trim(), 'Ohai, Download');
    });

    it('should go back to default message', function (done) {
        vm.useSlot = false;
        vm.$nextTick()
            .then(() => {
                assert.equal(theDownloader.$el.innerText.trim(), '');
                assert.equal($(theDownloader.$el).find('i').length, 1);
            })
            .then(done, done);
    });
});
