'use strict';

describe('gauge', function() {
	var expect = require('chai').expect;
	var Gauge = require('../lib/gauge');
	var sinon = require('sinon');
	var instance;
	beforeEach(function() {
		instance = new Gauge({ name: 'gauge_test', help: 'help'});
		instance.set(10);
	});

	it('should set a gauge to provided value', function() {
		expectValue(10);
	});

	it('should reset a gauge', function() {
		instance.reset();
		expectValue(0);
	});

	it('should increase with 1 if no param provided', function() {
		instance.inc();
		expectValue(11);
	});

	it('should increase with param value if provided', function() {
		instance.inc(5);
		expectValue(15);
	});

	it('should decrease with 1 if no param provided', function() {
		instance.dec();
		expectValue(9);
	});

	it('should decrease with param if provided', function() {
		instance.dec(5);
		expectValue(5);
	});

	it('should start a timer and set a gauge to elapsed in seconds', function() {
		var clock = sinon.useFakeTimers();
		var doneFn = instance.startTimer();
		clock.tick(500);
		doneFn();
		expectValue(0.5);
		clock.restore();
	});

	it('should set to current time', function() {
		var clock = sinon.useFakeTimers();
		instance.setToCurrentTime();
		expectValue(new Date().getTime());
	});

	it('should not allow non numbers', function() {
		var fn = function() {
			instance.set('asd');
		};
		expect(fn).to.throw(Error);
	});

	function expectValue(val) {
		expect(instance.get().values[0].value).to.equal(val);
	}
});