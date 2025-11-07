import { strict as assert } from 'node:assert';
import { initializeCounter } from '../pwa/scripts/app.js';

class MockElement {
  constructor(label) {
    this.label = label;
    this.textContent = '';
    this._listeners = new Map();
  }

  addEventListener(type, handler) {
    this._listeners.set(type, handler);
  }

  click() {
    const handler = this._listeners.get('click');
    if (handler) {
      handler({ preventDefault() {} });
    }
  }
}

class MockDocument {
  constructor(elements) {
    this._elements = elements;
  }

  querySelector(selector) {
    return this._elements[selector] ?? null;
  }
}

function createLocalStorage() {
  const storage = new Map();
  return {
    getItem(key) {
      return storage.has(key) ? storage.get(key) : null;
    },
    setItem(key, value) {
      storage.set(key, String(value));
    },
    removeItem(key) {
      storage.delete(key);
    },
    clear() {
      storage.clear();
    }
  };
}

function setupEnvironment() {
  const valueEl = new MockElement('value');
  const incrementBtn = new MockElement('increment');
  const decrementBtn = new MockElement('decrement');
  const resetBtn = new MockElement('reset');

  const mockDocument = new MockDocument({
    '[data-counter-value]': valueEl,
    '[data-action="increment"]': incrementBtn,
    '[data-action="decrement"]': decrementBtn,
    '[data-action="reset"]': resetBtn
  });

  const localStorage = createLocalStorage();
  global.window = { localStorage };

  return { valueEl, incrementBtn, decrementBtn, resetBtn, mockDocument };
}

function run() {
  const { valueEl, incrementBtn, decrementBtn, resetBtn, mockDocument } = setupEnvironment();

  initializeCounter(mockDocument);

  assert.equal(valueEl.textContent, '0', 'Initial value should be 0');

  incrementBtn.click();
  assert.equal(valueEl.textContent, '1', 'Increment should increase value to 1');

  decrementBtn.click();
  assert.equal(valueEl.textContent, '0', 'Decrement should reduce value to 0');

  decrementBtn.click();
  assert.equal(valueEl.textContent, '0', 'Counter should not go below 0');

  incrementBtn.click();
  incrementBtn.click();
  assert.equal(valueEl.textContent, '2', 'Multiple increments should accumulate');

  resetBtn.click();
  assert.equal(valueEl.textContent, '0', 'Reset should return the counter to 0');

  console.log('All counter interaction tests passed');
}

run();
