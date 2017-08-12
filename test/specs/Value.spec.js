import Vue from 'vue';
import Value from '../components/Value.vue';
import VueFirebaseData from '../../src';
import firebaseConfig from '../firebase.json';

const firebase = require('firebase');
const chai = require('chai');
const dirtyChai = require('dirty-chai');

const expect = chai.expect;

chai.use(dirtyChai);

firebase.initializeApp(firebaseConfig);
Vue.use(VueFirebaseData);

describe('Values', function() {
    it('should render correct contents', function(done) {
        this.timeout(5000);

        const Constructor = Vue.extend(Value);
        const vm = new Constructor().$mount();

        expect(vm.$el.querySelector('span').textContent).to.equal('');

        vm.$watch('record', function() {
            Vue.nextTick(function() {
                expect(vm.$el.querySelector('span').textContent).to.equal('Site Hosting');
                done();
            });
        });
    });
});
