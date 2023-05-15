import clsx from 'clsx';
import React from 'react';

export type SliderProps = {
	className?: string;
	disabled?: boolean;
	total?: number;
	defaultValue?: number;
	onChange?: (value: number) => void;
	showTooltipValue?: boolean;
	autoHide?: boolean;
};

const Slider = (props: SliderProps) => {
	const {
		className,
		disabled,
		total = 10,
		defaultValue = 0,
		autoHide = true,
		onChange,
		showTooltipValue,
	} = props;
	const controlRef = React.useRef<HTMLDivElement>(null);
	const sliderRef = React.useRef<HTMLDivElement>(null);
	const tooltipRef = React.useRef<HTMLDivElement>(null);
	const shouldHideAfterHold = React.useRef(false);
	const perRef = React.useRef(defaultValue / total);
	const holdRef = React.useRef(false);

	const updateControlWidth = (percentage: number) => {
		if (controlRef.current) {
			controlRef.current.style.width = `${percentage * 100}%`;
			onChange?.(total * percentage);
			if (tooltipRef.current) {
				tooltipRef.current.textContent = Math.trunc(total * percentage) + '';
			}
		}
	};

	const onMouseMove = (e: MouseEvent) => {
		if (holdRef.current && sliderRef.current) {
			let offset = e.clientX - sliderRef.current.getBoundingClientRect().left;
			offset = Math.max(Math.min(offset, sliderRef.current.clientWidth), 0);
			const per = offset / sliderRef.current.clientWidth;
			if (perRef.current !== per) {
				perRef.current = per;
				updateControlWidth(offset / sliderRef.current.clientWidth);
			}
		}
	};

	const onMouseUp = () => {
		holdRef.current = false;
		if (shouldHideAfterHold.current) {
			sliderRef.current?.classList.remove('show');
			shouldHideAfterHold.current = false;
		}
		cleanupEvent();
	};

	const onMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		if (disabled) {
			return;
		}
		if (sliderRef.current) {
			holdRef.current = true;
			let per = e.clientX / sliderRef.current.clientWidth - 0.02;
			per = Math.max(Math.min(per, 1), 0);
			perRef.current = per;
			updateControlWidth(per);

			// Handler for move
			window.addEventListener('mousemove', onMouseMove);
			window.addEventListener('mouseup', onMouseUp);
		}
	};

	const onHover = () => {
		if (sliderRef.current) {
			sliderRef.current.classList.add('show');
			shouldHideAfterHold.current = false;
		}
	};

	const onUnHover = () => {
		if (sliderRef.current) {
			if (holdRef.current) {
				shouldHideAfterHold.current = true;
				return;
			}
			sliderRef.current.classList.remove('show');
		}
	};

	const cleanupEvent = () => {
		window.removeEventListener('mousemove', onMouseMove);
		window.removeEventListener('mouseup', onMouseUp);
	};

	React.useEffect(() => {
		return () => {
			cleanupEvent();
		};
	}, []);

	return (
		<div
			onMouseDown={onMouseDown}
			onMouseEnter={onHover}
			onMouseLeave={onUnHover}
			ref={sliderRef}
			className={clsx('t-slider', disabled && 'disabled', !autoHide && 'show', className)}>
			<div
				ref={controlRef}
				style={{ width: `${(defaultValue / total) * 100}%` }}
				className="t-slider-control">
				<div className="t-slider-dragger" />
				{showTooltipValue && (
					<div ref={tooltipRef} className="t-slider-tooltip">
						{Math.trunc(perRef.current * total)}
					</div>
				)}
			</div>
		</div>
	);
};

export default React.memo(Slider);
