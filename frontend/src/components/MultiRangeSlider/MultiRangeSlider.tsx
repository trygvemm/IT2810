//Komponent Hentet fra https://dev.to/sandra_lewis/building-a-multi-range-slider-in-react-from-scratch-4dl1

import { ChangeEvent, FC, useCallback, useEffect, useState, useRef } from "react";
import classnames from "classnames";
import "./MultiRangeSlider.css";
import { ReactiveVar, useQuery } from "@apollo/client";
import { GET_CURRENT_FILTERS, GET_HASMORE, GET_REFETCH } from "../../App";
import BookFilters from "../types/BookFilters";
import refetchType from "../types/refetchType";
import setHasmoreType from "../types/setHasmore";

interface MultiRangeSliderProps {
	min: number;
	max: number;
	onChange: Function;
}

const MultiRangeSlider: FC<MultiRangeSliderProps> = ({ min, max, onChange }) => {
	const [minVal, setMinVal] = useState(min);
	const [maxVal, setMaxVal] = useState(max);
	const minValRef = useRef<HTMLInputElement>(null);
	const maxValRef = useRef<HTMLInputElement>(null);
	const range = useRef<HTMLDivElement>(null);
	const { data: refetchResult } = useQuery<refetchType>(GET_REFETCH);
	const { data: hasMoreResult } = useQuery<setHasmoreType>(GET_HASMORE);
	const { data: currentFiltersResult } = useQuery<{
		currentFiltersFunction: ReactiveVar<BookFilters>;
	}>(GET_CURRENT_FILTERS);

	function updateMin(min: number) {
		if (refetchResult && hasMoreResult && currentFiltersResult) {
			//Updating the current filters by first retreiving the old filters then inserting the new filters in the function provided by apollo for updating reactive variables.
			const oldFilters = currentFiltersResult.currentFiltersFunction();
			currentFiltersResult.currentFiltersFunction({
				...oldFilters,
				minYear: min,
			});
			refetchResult.refetchFunction({
				filters: currentFiltersResult.currentFiltersFunction(),
			});
			hasMoreResult.hasMoreFunction(true);
		}
	}

	function updateMax(max: number) {
		if (refetchResult && hasMoreResult && currentFiltersResult) {
			//Updating the current filters by first retreiving the old filters then inserting the new filters in the function provided by apollo for updating reactive variables.
			const oldFilters = currentFiltersResult.currentFiltersFunction();
			currentFiltersResult.currentFiltersFunction({
				...oldFilters,
				maxYear: max,
			});
			refetchResult.refetchFunction({
				filters: currentFiltersResult.currentFiltersFunction(),
			});
			hasMoreResult.hasMoreFunction(true);
		}
	}

	// Convert to percentage
	const getPercent = useCallback(
		(value: number) => Math.round(((value - min) / (max - min)) * 100),
		[min, max]
	);

	// Set width of the range to decrease from the left side
	useEffect(() => {
		if (maxValRef.current) {
			const minPercent = getPercent(minVal);
			const maxPercent = getPercent(+maxValRef.current.value); // Precede with '+' to convert the value from type string to type number

			if (range.current) {
				range.current.style.left = `${minPercent}%`;
				range.current.style.width = `${maxPercent - minPercent}%`;
			}
		}
	}, [minVal, getPercent]);

	// Set width of the range to decrease from the right side
	useEffect(() => {
		if (minValRef.current) {
			const minPercent = getPercent(+minValRef.current.value);
			const maxPercent = getPercent(maxVal);

			if (range.current) {
				range.current.style.width = `${maxPercent - minPercent}%`;
			}
		}
	}, [maxVal, getPercent]);

	// Get min and max values when their state changes
	useEffect(() => {
		onChange({ min: minVal, max: maxVal });
	}, [minVal, maxVal, onChange]);

	return (
		<div id="multiSlider">
			<input
				type="range"
				title="slider"
				aria-label="minimum slider for year range"
				min={min}
				max={max}
				value={minVal}
				ref={minValRef}
				onChange={(event: ChangeEvent<HTMLInputElement>) => {
					const value = Math.min(+event.target.value, maxVal - 1);
					setMinVal(value);
					(document.getElementById("minInput") as HTMLInputElement).value = value.toString();
				}}
				onMouseUp={() => updateMin(minVal)} //Oppdater query her når man slippe musen
				onKeyDown={e => {
					if (e.key === "Enter") {
						updateMin(minVal);
					}
				}}
				className={classnames("thumb thumb--zindex-3", {
					"thumb--zindex-5": minVal > max - 100,
				})}
			/>
			<input
				type="range"
				title="Slider"
				aria-label="maximum slider for year range"
				min={min}
				max={max}
				value={maxVal}
				ref={maxValRef}
				onChange={(event: ChangeEvent<HTMLInputElement>) => {
					const value = Math.max(+event.target.value, minVal + 1);
					setMaxVal(value);
					event.target.value = value.toString();
					(document.getElementById("maxInput") as HTMLInputElement).value = value.toString();
				}}
				onMouseUp={() => updateMax(maxVal)} //Oppdater query her når man slippe musen
				onKeyDown={e => {
					if (e.key === "Enter") {
						updateMax(maxVal);
					}
				}}
				className="thumb thumb--zindex-4"
			/>

			<div className="slider">
				<div className="slider__track"></div>
				<div ref={range} className="slider__range"></div>
				<input
					tabIndex={3}
					id="minInput"
					type="number"
					aria-label="min input for year range"
					className="text-sm bg-white mt-6 p-1 w-13 inline text-black text-center rounded focus:outline-accent-focus"
					max={2022}
					min={-2022}
					defaultValue={minVal}
					onChange={(event: ChangeEvent<HTMLInputElement>) => {
						if (+event.target.value < -2022) {
							event.target.value = "-2022";
						}
						if (+event.target.value > 2022) {
							event.target.value = "2022";
						}
						const value = Math.min(+event.target.value, maxVal - 1);
						setMinVal(value);
					}}
					onKeyDown={e => {
						if (e.key === "Enter") {
							updateMin(minVal);
						}
					}}
				></input>
				<input
					tabIndex={4}
					id="maxInput"
					type="number"
					aria-label="max input for year range"
					className="text-sm bg-white text-black rounded mt-6 w-13 inline float-right text-center p-1 focus:outline-accent-focus"
					max={2022}
					min={-2022}
					defaultValue={maxVal}
					onChange={(event: ChangeEvent<HTMLInputElement>) => {
						if (+event.target.value > 2022) {
							event.target.value = "2022";
						}
						if (+event.target.value < -2022) {
							event.target.value = "-2022";
						}
						const value = Math.max(+event.target.value, minVal + 1);
						setMaxVal(value);
					}}
					onKeyDown={e => {
						if (e.key === "Enter") {
							updateMax(maxVal);
						}
					}}
				></input>
			</div>
		</div>
	);
};

export default MultiRangeSlider;
