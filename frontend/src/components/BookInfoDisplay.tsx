function BookInfoDisplay(props: {
	year: number;
	pages: number;
	language: string;
	country: string;
}) {
	const { year, pages, language, country } = props;
	return (
		<>
			<section className="text-white stats shadow min-w-[60vw] flex flex-col sm:flex-row">
				<div className="stat place-items-center">
					<figure className="stat-figure text-secondary w-[32px] h-[32px]">
						<img
							src={process.env.PUBLIC_URL + "/year.svg"}
							className="object-scale-down"
							alt="icon of a calendar"
						/>
					</figure>
					<h2 className="stat-title">Year</h2>
					<p className="stat-value">{year}</p>
					<small className="stat-desc">
						{year < 1900 ? "Oldie but goodie" : "A modern piece of literature"}
					</small>
				</div>
				<div className="stat place-items-center">
					<figure className="stat-figure text-secondary  w-[32px] h-[32px]">
						<img
							src={process.env.PUBLIC_URL + "/pages.svg"}
							className="object-scale-down"
							alt="icon of pages"
						/>
					</figure>
					<h2 className="stat-title">Pages</h2>
					<p className="stat-value">{pages}</p>
					<small className="stat-desc">
						{pages > 500 ? "That's hella many pages!" : "A light read!"}
					</small>
				</div>
				<div className="stat place-items-center">
					<figure className="stat-figure text-secondary  w-[32px] h-[32px]">
						<img
							src={process.env.PUBLIC_URL + "/language.svg"}
							className="object-scale-down"
							alt="icon of speech bubbles"
						/>
					</figure>
					<h2 className="stat-title">Language</h2>
					<p className="stat-value">{language}</p>
				</div>
				<div className="stat place-items-center">
					<figure className="stat-figure text-secondary  w-[32px] h-[32px]">
						<img
							src={process.env.PUBLIC_URL + "/country.svg"}
							className="object-scale-down"
							alt="icon of a globe"
						/>
					</figure>
					<h2 className="stat-title">Country</h2>
					<p className="stat-value">{country}</p>
				</div>
			</section>
		</>
	);
}
export default BookInfoDisplay;
