import { createSelectors } from 'shared/zustand';
import { create } from 'zustand';

// Функция для получения значения из localStorage
const getFromLocalStorage = (key, defaultValue) => {
	const saved = localStorage.getItem(key);
	try {
		return saved !== null ? JSON.parse(saved) : defaultValue;
	} catch (_e) {
		return defaultValue;
	}
};

// Функция для сохранения значения в localStorage
const saveToLocalStorage = (key, value) => {
	localStorage.setItem(key, JSON.stringify(value));
};

const useAsideBase = create((set) => ({
	// Инициализация состояния из localStorage или использование значения по умолчанию
	collapse: getFromLocalStorage('aside-collapse', false),

	// Действие для переключения состояния
	toggleCollapse: () =>
		set((state) => {
			const newState = !state.collapse;
			saveToLocalStorage('aside-collapse', newState); // Сохраняем новое состояние в localStorage
			return { collapse: newState };
		}),
}));

// Создаем селекторы для удобства использования
const useAside = createSelectors(useAsideBase);

export default useAside;
