import { Ref, ref } from 'vue';
import { KeyboardAction } from '../types/SoftKeyboardAction';

const isElementInView = (el: Element) => {
	const rect = el.getBoundingClientRect();
	const container = el.parentElement?.getBoundingClientRect();

	if (!container) {
		return false;
	}

	return (
		rect.top >= container.top &&
		rect.bottom <= container.bottom &&
		rect.left >= container.left &&
		rect.right <= container.right
	);
};

interface UseSoftDropdownKeyboardParams {
	isMenuOpen: Ref<boolean>;
	optionsRefs: Ref<HTMLElement | null>;
	optionsLength: number;
}

interface UseSoftDropdownKeyboardReturn {
	activeIndex: Ref<number>;
	getActionFromKey: (event: KeyboardEvent) => KeyboardAction;
	updateActiveIndex: (currentIndex: number, action: KeyboardAction) => void;
}

const ARROW_DOWN_KEY = 'ArrowDown';
const ARROW_UP_KEY = 'ArrowUp';
const ENTER_KEY = 'Enter';
const SPACE_KEY = ' ';

export function useSoftDropdownKeyboard({
	isMenuOpen,
	optionsRefs,
	optionsLength,
}: UseSoftDropdownKeyboardParams): UseSoftDropdownKeyboardReturn {
	const activeIndex = ref(0);

	const getActionFromKey = ({ key, altKey }: KeyboardEvent): KeyboardAction => {
		const openKeys = [ARROW_DOWN_KEY, ARROW_UP_KEY, ENTER_KEY, SPACE_KEY];

		if (!isMenuOpen.value && openKeys.includes(key)) {
			return KeyboardAction.Open;
		}

		if (isMenuOpen.value) {
			if (key === 'ArrowUp' && altKey) {
				return KeyboardAction.SelectAndClose;
			}
			if (key === 'ArrowDown' && !altKey) {
				return KeyboardAction.Next;
			}
			if (key === 'ArrowUp') {
				return KeyboardAction.Previous;
			}
			if (key === 'Escape') {
				return KeyboardAction.Close;
			}
			if (key === 'Enter' || key === ' ') {
				return KeyboardAction.SelectAndClose;
			}
		}

		return KeyboardAction.None;
	};

	const scrollToActiveOption = () => {
		const activeOptionElement = optionsRefs.value?.children[activeIndex.value];

		if (activeOptionElement && !isElementInView(activeOptionElement)) {
			activeOptionElement.scrollIntoView({
				behavior: 'smooth',
				block: 'nearest',
			});
		}
	};

	const updateActiveIndex = (currentIndex: number, action: KeyboardAction) => {
		const maxIndex = optionsLength - 1;

		const getUpdatedIndex = () => {
			if (action === KeyboardAction.Previous) {
				return Math.max(0, currentIndex - 1);
			}
			if (action === KeyboardAction.Next) {
				return Math.min(maxIndex, currentIndex + 1);
			}

			return currentIndex;
		};

		activeIndex.value = getUpdatedIndex();

		scrollToActiveOption();
	};

	return {
		getActionFromKey,
		activeIndex,
		updateActiveIndex,
	};
}
