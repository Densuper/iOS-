const STORAGE_KEY = 'simple-counter-value';

function coerceValue(value) {
  const parsed = Number.parseInt(value, 10);
  if (Number.isNaN(parsed) || parsed < 0) {
    return 0;
  }
  return parsed;
}

function createCounterState(initialValue) {
  let current = coerceValue(initialValue);

  return {
    increment() {
      current += 1;
      return current;
    },
    decrement() {
      current = Math.max(0, current - 1);
      return current;
    },
    reset() {
      current = 0;
      return current;
    },
    get value() {
      return current;
    },
    set value(next) {
      current = coerceValue(next);
    }
  };
}

function persist(value) {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(STORAGE_KEY, String(value));
    }
  } catch (error) {
    // Swallow storage errors (e.g., Safari private mode) to keep the UI responsive.
    console.warn('Unable to persist counter value', error);
  }
}

function loadInitialValue() {
  if (typeof window === 'undefined') {
    return 0;
  }

  try {
    return coerceValue(window.localStorage.getItem(STORAGE_KEY));
  } catch (error) {
    console.warn('Unable to read persisted counter value', error);
    return 0;
  }
}

export function initializeCounter(rootDocument = document) {
  const valueElement = rootDocument.querySelector('[data-counter-value]');
  const incrementButton = rootDocument.querySelector('[data-action="increment"]');
  const decrementButton = rootDocument.querySelector('[data-action="decrement"]');
  const resetButton = rootDocument.querySelector('[data-action="reset"]');

  if (!valueElement || !incrementButton || !decrementButton || !resetButton) {
    return { getValue: () => 0 };
  }

  const state = createCounterState(loadInitialValue());

  const updateUI = () => {
    valueElement.textContent = state.value.toString();
    persist(state.value);
  };

  updateUI();

  incrementButton.addEventListener('click', () => {
    state.increment();
    updateUI();
  });

  decrementButton.addEventListener('click', () => {
    state.decrement();
    updateUI();
  });

  resetButton.addEventListener('click', () => {
    state.reset();
    updateUI();
  });

  return {
    getValue: () => state.value
  };
}

if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  initializeCounter();

  if (typeof navigator !== 'undefined' && 'serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('./service-worker.js')
        .catch((error) => console.warn('Service worker registration failed', error));
    });
  }
}
